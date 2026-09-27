"""Investigation orchestrator.

두 개의 planner가 같은 TOOL_REGISTRY와 같은 검증 게이트를 공유한다.

    deterministic  지표 분기로 도구를 고른다. baseline이자 기본값.
    llm            LLM이 도구를 고르고 사유를 쓴다. 판정은 여전히 게이트가 한다.

deterministic 경로는 지우지 않는다. LLM planner를 평가하려면 비교 대상이 필요하고,
API 키가 없는 환경에서도 파이프라인이 그대로 돌아가야 하기 때문이다.
"""
from __future__ import annotations

from typing import Any

from agent.tools import (
    compare_chambers,
    decompose_cd,
    get_equipment_events,
    get_lot_context,
    get_metrology_health,
    verify_disposition,
)


def _step(trace: list[dict[str, Any]], tool: str, args: dict[str, Any], result: Any, reason: str) -> None:
    trace.append({"tool": tool, "args": args, "reason": reason, "result": result})




# ── 재시도 정책 ──────────────────────────────────────────────────────────────
# 게이트가 미충족 조건을 돌려주면, 조건마다 "다음에 무엇을 다르게 해볼지"를
# 미리 정해 둔다. 조회 범위를 넓히는 것이 전부이고, 판정 기준은 건드리지 않는다.
# 넓혀서 풀리지 않으면 원인을 지목하지 않고 사람에게 넘긴다(G2).
#
# tmu_within_budget 에는 재시도를 두지 않았다. 계측 불확도가 예산을 넘었다는 것은
# 그 장비의 측정값 자체를 믿을 수 없다는 뜻이라, 더 조회해도 해소되지 않는다.
RETRY_POLICY: dict[str, dict[str, Any]] = {
    "taper_not_contradicting": {
        "tool": "get_equipment_events", "widen": {"window": 21},
        "why": "X-SEM 표본이 희소해 단면 근거가 비어 있다. 챔버 이력 조회 범위를 넓혀 "
               "taper 변화를 설명할 변경점이 있는지 다시 본다.",
    },
    "metrology_evidence_fresh": {
        "tool": "get_metrology_health", "widen": {"day_back": 14},
        "why": "monitor wafer 감시 데이터가 오래됐다. 조회 구간을 뒤로 넓혀 "
               "더 이전 점검 기록이라도 확보한다.",
    },
    "chamber_specific": {
        "tool": "compare_chambers", "widen": {"window": 10},
        "why": "비교 구간이 좁아 챔버 편중이 드러나지 않았을 수 있다. 구간을 넓혀 다시 비교한다.",
    },
    "tmu_within_budget": {
        "tool": None, "widen": {},
        "why": "계측 불확도가 예산을 넘었다. 더 조회해도 해소되지 않으므로 재시도하지 않고 보류한다.",
    },
}


def _run_retries(trace: list[dict[str, Any]], lot_id: str, ctx: dict[str, Any],
                 unmet: list[str]) -> list[dict[str, Any]]:
    """미충족 조건마다 정책에 따라 한 번씩 다시 시도하고, 그 결과를 기록한다."""
    attempts: list[dict[str, Any]] = []
    day = int(ctx["day"])
    for cond in unmet:
        pol = RETRY_POLICY.get(cond)
        if pol is None:
            attempts.append({"condition": cond, "retried": False,
                             "why": "정의된 재시도 정책이 없다.", "resolved": False})
            continue
        if pol["tool"] is None:
            attempts.append({"condition": cond, "retried": False,
                             "why": pol["why"], "resolved": False})
            continue

        if pol["tool"] == "get_equipment_events":
            target = ctx.get("chamber") or ctx.get("scanner")
            args = {"tool_id": target, "day": day, "window": pol["widen"]["window"]}
            result = get_equipment_events(**args)
            found = len(result.get("events") or [])
        elif pol["tool"] == "get_metrology_health":
            target = ctx.get("aciTool") or ctx.get("adiTool")
            args = {"tool_id": target, "day": day}
            result = get_metrology_health(**args)
            found = len((result.get("monitor") or {}).get("series") or [])
        else:
            args = {"day": day, "window": pol["widen"]["window"]}
            result = compare_chambers(**args)
            found = len(result.get("chambers") or {})

        _step(trace, pol["tool"], args, result,
              f"[재시도] {cond} 미충족 — {pol['why']}")
        trace[-1]["retry_of"] = cond
        attempts.append({"condition": cond, "retried": True, "why": pol["why"],
                         "args": args, "found": found, "resolved": False})
    return attempts


def investigate_lot(lot_id: str, planner: str = "deterministic", client: Any = None) -> dict[str, Any]:
    """로트 하나를 조사한다.

    planner="deterministic" (기본) — 지표 분기 기반. 재현성이 보장된다.
    planner="llm"                  — LLM이 도구를 고른다. client가 필요하다.

    어느 쪽이든 최종 verdict는 verify_disposition()이 정한다.
    """
    if planner == "llm":
        from agent.planner import investigate_lot_llm

        if client is None:
            from agent.llm import build_client

            client = build_client("anthropic")
        return investigate_lot_llm(lot_id, client)
    if planner != "deterministic":
        raise ValueError(f"unknown planner: {planner}")
    return _investigate_deterministic(lot_id)


def _investigate_deterministic(lot_id: str) -> dict[str, Any]:
    trace: list[dict[str, Any]] = []

    ctx = get_lot_context(lot_id)
    _step(trace, "get_lot_context", {"lot_id": lot_id}, ctx, "Pin down the lot's process path and equipment first.")

    dec = decompose_cd(lot_id)
    _step(trace, "decompose_cd", {"lot_id": lot_id}, dec, "Decompose the CD excursion into wafer/field/reticle/delta coordinate systems.")

    day = int(ctx["day"])
    m = dec["metrics"]
    lim = dec["limits"]
    # 관리 한계는 기준선 구간의 '중심값 대비 잔차'에 대해 산출된 값이다.
    # 분기 조건도 같은 기준으로 비교해야 한다. 원값을 그대로 쓰면 중심값이 큰 성분
    # (레티클·반경)에서 조건이 항상 참이 되어 모든 로트가 같은 경로를 타게 된다.
    cen = dec.get("centers") or {}

    def resid(key: str, center_key: str) -> float:
        return abs(float(m.get(key) or 0.0) - float(cen.get(center_key) or 0.0))
    queried: set[str] = set()

    # Metrology is checked before acting on ACI/CD-derived evidence.
    aci_tool = ctx.get("aciTool")
    if aci_tool:
        mh = get_metrology_health(aci_tool, day)
        _step(trace, "get_metrology_health", {"tool_id": aci_tool, "day": day}, mh,
              "Rule out metrology drift/TMU before acting on process.")
        queried.add(aci_tool)

    # Photo scalar/dose branch.
    if resid("offset", "adi_offset") >= float(lim["adi_offset"]) \
            or abs(float(ctx.get("doseGap") or 0.0)) >= float(lim["dose_gap_pct"]):
        scanner = ctx.get("scanner")
        if scanner:
            ev = get_equipment_events(scanner, day, 7)
            _step(trace, "get_equipment_events", {"tool_id": scanner, "day": day, "window": 7}, ev,
                  "Look for a scanner event that overlaps in time with the ADI scalar shift or Setting-Sensor gap.")
            queried.add(scanner)

    # Track/radial branch.
    if resid("radial", "adi_radial") >= float(lim["adi_radial"]):
        ev = get_equipment_events("TRACK-01", day, 7)
        _step(trace, "get_equipment_events", {"tool_id": "TRACK-01", "day": day, "window": 7}, ev,
              "Cross-check the ADI radial signature against PEB/Track maintenance and calibration history.")
        queried.add("TRACK-01")

    # Reticle branch.
    if resid("reticle", "adi_reticle") >= float(lim["adi_reticle"]):
        reticle = ctx.get("reticle")
        if reticle:
            ev = get_equipment_events(reticle, day, 7)
            _step(trace, "get_equipment_events", {"tool_id": reticle, "day": day, "window": 7}, ev,
                  "Cross-check the repeating site signature against reticle inspection/qualification history.")
            queried.add(reticle)

    # Delta-CD/etch branch.
    if m.get("dbias") is not None and resid("dbias", "delta_bias") >= float(lim["delta_bias"]):
        comp = compare_chambers(day, 5)
        _step(trace, "compare_chambers", {"day": day, "window": 5}, comp,
              "Compare the fleet fingerprint to see whether the Delta-CD excursion is confined to one chamber.")
        chamber = ctx.get("chamber")
        if chamber:
            ev = get_equipment_events(chamber, day, 10)
            _step(trace, "get_equipment_events", {"tool_id": chamber, "day": day, "window": 10}, ev,
                  "Cross-check chamber PM/wet-clean/inspection history against the Delta-CD change timing.")
            queried.add(chamber)

    # If metrology itself is suspicious, collect its event history as additional evidence.
    if aci_tool and aci_tool not in queried:
        monitor_rows = trace[2]["result"]["monitor"]["series"] if len(trace) > 2 and trace[2]["tool"] == "get_metrology_health" else []
        if monitor_rows:
            # Any recent monitor movement above the configured limit is enough to inspect event history.
            vals = [float(r.get("drift", 0.0) or 0.0) for r in monitor_rows if "drift" in r]
            if vals and max(abs(v) for v in vals) >= float(lim["tool_drift"]):
                ev = get_equipment_events(aci_tool, day, 10)
                _step(trace, "get_equipment_events", {"tool_id": aci_tool, "day": day, "window": 10}, ev,
                      "Monitor drift is large enough to warrant pulling metrology calibration/alert history.")

    gate = verify_disposition(lot_id)
    _step(trace, "verify_disposition", {"lot_id": lot_id}, gate,
          "The final call is constrained by the deterministic Verification Gate, not the LLM/planner.")

    # 게이트가 막히면 정책대로 한 번 더 시도한다. 판정 기준은 그대로 두고 조회 범위만 넓힌다.
    retries: list[dict[str, Any]] = []
    if not gate["passed"]:
        retries = _run_retries(trace, lot_id, ctx, gate.get("unmet") or [])
        gate = verify_disposition(lot_id)
        _step(trace, "verify_disposition", {"lot_id": lot_id}, gate,
              "재시도 후 게이트 재확인. 해소되지 않으면 원인을 지목하지 않고 사람에게 넘긴다.")

    return {
        "lot": lot_id,
        "retries": retries,
        "escalation": "G2" if not gate["passed"] else None,
        "planner": "deterministic",
        "status": "DISPOSITION_READY" if gate["passed"] else "NEEDS_MORE_EVIDENCE",
        "verdict": gate["verdict"] if gate["passed"] else "INDETERMINATE",
        "action": gate["action"],
        "tool_calls": len(trace),
        "trace": trace,
    }
