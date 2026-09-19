"""LLM planner를 결정론 baseline과 비교 평가한다.

측정하는 것은 '어느 쪽이 정답인가'가 아니다.
결정론 경로가 이미 블라인드 평가를 통과했으므로, 여기서 묻는 것은 세 가지다.

  1) 일치율      LLM이 고른 도구 경로로 도달한 판정이 baseline과 얼마나 같은가
  2) 게이트 차단 불일치가 났을 때 검증 게이트가 그것을 잡아냈는가
  3) 재현성      같은 로트를 여러 번 돌렸을 때 판정이 흔들리지 않는가

로트 하나가 끝날 때마다 진행 파일에 바로 기록한다. 네트워크가 중간에 끊겨도
--resume으로 이어서 돌릴 수 있고, 이미 끝난 로트를 다시 호출해 비용을 낭비하지 않는다.

실행:
  python validation/planner_eval.py --lots 40                       # 실제 LLM
  python validation/planner_eval.py --lots 40 --resume               # 중단된 지점부터 이어서
  python validation/planner_eval.py --lots 40 --dry-run              # 네트워크 없이 하네스만 점검
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from agent.orchestrator import investigate_lot
from engine.query_service import AttributionQueryService

ROOT = Path(__file__).resolve().parents[1]
SERVICE = AttributionQueryService()
SENTINEL = {"REPLAY", "UNKNOWN", "STATED_IN_TEXT", None}


class ReplayClient:
    """--dry-run용. 결정론 경로가 실제로 밟은 도구 순서를 그대로 재생한다.

    LLM을 흉내 내지 않는다. 하네스가 도는지만 확인하는 용도이며,
    이 모드의 결과는 planner 성능 지표로 보고하지 않는다.
    """

    def __init__(self, lot_id: str):
        base = investigate_lot(lot_id)
        self._steps = [s for s in base["trace"] if s["tool"] != "verify_disposition"]

    def plan(self, system, history, tools):
        if not self._steps:
            return {"final": {"cause_candidate": "REPLAY", "reason": "replayed deterministic path"}}
        s = self._steps.pop(0)
        return {"tool": s["tool"], "args": s["args"], "reason": "[replay] " + s["reason"]}


def sample_lots(n: int) -> list[str]:
    """정상/이상이 섞이도록 verdict별로 고르게 뽑는다."""
    by: dict[str, list[str]] = {}
    for lot in SERVICE.data["lots"]:
        by.setdefault(lot["verdict"], []).append(lot["lot"])
    out: list[str] = []
    i = 0
    while len(out) < n and any(len(v) > i for v in by.values()):
        for key in sorted(by):
            if len(by[key]) > i and len(out) < n:
                out.append(by[key][i])
        i += 1
    return out


def _progress_path(out: str) -> Path:
    return ROOT / (out.rsplit(".", 1)[0] + "_progress.jsonl")


def _load_progress(path: Path) -> dict[str, dict]:
    if not path.exists():
        return {}
    rows = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.strip():
            row = json.loads(line)
            rows[row["lot"]] = row
    return rows


def _one_lot(lot_id: str, dry_run: bool, repeats: int) -> dict:
    base = investigate_lot(lot_id)

    def once():
        client = ReplayClient(lot_id) if dry_run else None
        kw = {"client": client} if client else {}
        return investigate_lot(lot_id, planner="llm", **kw)

    first = once()
    row = {
        "lot": lot_id,
        "baseline_verdict": base["verdict"],
        "llm_verdict": first["verdict"],
        "match": base["verdict"] == first["verdict"],
        "baseline_calls": base["tool_calls"],
        "llm_calls": first["tool_calls"],
        "rejected": len(first.get("rejected_calls", [])),
        "proposal": (first.get("planner_proposal") or {}).get("cause_candidate"),
        "gate_passed": first["status"] == "DISPOSITION_READY",
    }
    if repeats > 1:
        verdicts = {first["verdict"]} | {once()["verdict"] for _ in range(repeats - 1)}
        row["repro_stable"] = len(verdicts) == 1
        row["repro_verdicts"] = sorted(verdicts)
    return row


def run(lots: list[str], dry_run: bool, repeats: int, progress: Path | None = None, resume: bool = False) -> dict:
    if progress is None:
        progress = _progress_path("validation/planner_eval.json")
    done = _load_progress(progress) if resume else {}
    if done:
        print(f"  이어서 진행: {len(done)}개 로트는 이미 완료됨")

    with open(progress, "a", encoding="utf-8") as fh:
        for lot_id in lots:
            if lot_id in done:
                continue
            row = _one_lot(lot_id, dry_run, repeats)
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")
            fh.flush()
            mark = "match" if row["match"] else "MISMATCH"
            print(f"  {lot_id}: {row['baseline_verdict']} -> {row['llm_verdict']}  [{mark}]")
            done[lot_id] = row

    rows = [done[l] for l in lots if l in done]
    n = len(rows)
    matched = sum(r["match"] for r in rows)
    mism = [r for r in rows if not r["match"]]
    caught = [r for r in mism if not r["gate_passed"]]
    overridden = [r for r in rows if r["proposal"] not in SENTINEL and r["proposal"] != r["llm_verdict"]]
    repro_rows = [r for r in rows if "repro_stable" in r]

    return {
        "mode": "dry-run (replay)" if dry_run else "llm",
        "summary": {
            "lots": n,
            "verdict_match": matched,
            "verdict_match_pct": round(matched / n * 100, 1) if n else 0.0,
            "mismatches": len(mism),
            "mismatches_caught_by_gate": len(caught),
            "planner_proposals_overridden_by_gate": len(overridden),
            "rejected_tool_calls": sum(r["rejected"] for r in rows),
            "avg_tool_calls_baseline": round(sum(r["baseline_calls"] for r in rows) / n, 2) if n else 0,
            "avg_tool_calls_llm": round(sum(r["llm_calls"] for r in rows) / n, 2) if n else 0,
            "reproducibility_runs": repeats,
            "reproducible_lots": sum(r["repro_stable"] for r in repro_rows) if repro_rows else None,
        },
        "verdict_pairs": dict(Counter(f'{r["baseline_verdict"]} -> {r["llm_verdict"]}' for r in rows)),
        "mismatch_detail": mism,
        "reproducibility": [{"lot": r["lot"], "stable": r["repro_stable"], "verdicts": r["repro_verdicts"]}
                             for r in repro_rows],
    }


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--lots", type=int, default=40)
    ap.add_argument("--repeats", type=int, default=1, help="재현성 측정을 위한 반복 실행 수")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--resume", action="store_true", help="중단된 지점부터 이어서 진행")
    ap.add_argument("--out", default="validation/planner_eval.json")
    a = ap.parse_args()

    progress = _progress_path(a.out)
    if not a.resume and progress.exists():
        progress.unlink()  # 새로 시작하면 지난 진행 기록은 지운다

    result = run(sample_lots(a.lots), a.dry_run, a.repeats, progress, a.resume)
    Path(ROOT / a.out).write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
    s = result["summary"]
    print(f'\n[{result["mode"]}] {s["lots"]} lots')
    print(f'  판정 일치            {s["verdict_match"]}/{s["lots"]} ({s["verdict_match_pct"]}%)')
    print(f'  불일치               {s["mismatches"]} (게이트가 잡은 것 {s["mismatches_caught_by_gate"]})')
    print(f'  게이트가 기각한 제안 {s["planner_proposals_overridden_by_gate"]}')
    print(f'  거부된 도구 호출     {s["rejected_tool_calls"]}')
    print(f'  평균 도구 호출       baseline {s["avg_tool_calls_baseline"]} / llm {s["avg_tool_calls_llm"]}')
    if s["reproducible_lots"] is not None:
        print(f'  재현성               {s["reproducible_lots"]}/{s["lots"]} ({s["reproducibility_runs"]}회 반복)')
    print(f'  → {a.out}')
    print(f'  진행 기록 → {progress.relative_to(ROOT)} (성공하면 지우셔도 됩니다)')


if __name__ == "__main__":
    main()
