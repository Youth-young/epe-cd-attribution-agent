"""Prediction output과 ground truth를 분리해 평가한다.

중요: 이 파일만 validation/ground_truth.csv를 읽는다.
engine/analyze.py와 서비스/에이전트 경로는 정답 파일을 알지 못한다.
"""
from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
VERD_TO_SCEN = {
    "NORMAL": "S0",
    "PHOTO_DOSE": "S1",
    "PHOTO_TRACK_RADIAL": "S2",
    "RETICLE_CD_ERROR": "S3",
    "ETCH_CHAMBER": "S4",
    "METROLOGY_TOOL_DRIFT": "S5",
    "INDETERMINATE": "??",
}


def load_data_js() -> dict:
    raw = (ROOT / "data.js").read_text(encoding="utf-8")
    return json.loads(raw[raw.index("{") : raw.rstrip().rstrip(";").rindex("}") + 1])


def evaluate() -> dict:
    data = load_data_js()
    gt = pd.read_csv(ROOT / "validation" / "ground_truth.csv")
    truth = dict(zip(gt.lot_id, gt.scenario_id))

    conf: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    missing_gt: list[str] = []
    for lot in data["lots"]:
        lot_id = lot["lot"]
        actual = truth.get(lot_id)
        if actual is None:
            missing_gt.append(lot_id)
            continue
        pred = VERD_TO_SCEN[lot["verdict"]]
        conf[actual][pred] += 1

    confusion = {t: dict(v) for t, v in sorted(conf.items())}
    total = sum(sum(row.values()) for row in confusion.values())
    correct = sum(confusion.get(s, {}).get(s, 0) for s in ("S0", "S1", "S2", "S3", "S4", "S5"))
    abstain = sum(row.get("??", 0) for row in confusion.values())

    result = {
        "confusion": confusion,
        "summary": {
            "evaluated_lots": total,
            "exact_matches": correct,
            "abstentions": abstain,
            "missing_ground_truth": missing_gt,
        },
    }
    return result


def write_outputs(result: dict) -> None:
    (ROOT / "validation" / "evaluation.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (ROOT / "validation" / "validation.js").write_text(
        "const VALIDATION = " + json.dumps(result, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )

    conf = result["confusion"]
    allp = sorted({p for row in conf.values() for p in row})
    lines = [
        "# 블라인드 평가",
        "",
        "`engine/analyze.py`가 prediction을 완료한 뒤 이 평가 스크립트가 별도로 `ground_truth.csv`를 읽어 대조한다.",
        "",
        "| 실제 \\ 판정 | " + " | ".join(allp) + " |",
        "|" + "---|" * (len(allp) + 1),
    ]
    for actual in sorted(conf):
        lines.append(
            f"| {actual} | " + " | ".join(str(conf[actual].get(pred, 0)) for pred in allp) + " |"
        )
    s = result["summary"]
    lines += [
        "",
        f"- 평가 로트: {s['evaluated_lots']}",
        f"- 정확히 일치: {s['exact_matches']}",
        f"- 판정 보류: {s['abstentions']}",
    ]
    (ROOT / "validation" / "blind_eval.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    result = evaluate()
    write_outputs(result)
    print("검증 완료:", result["summary"])
    for actual, row in result["confusion"].items():
        print(" ", actual, row)
