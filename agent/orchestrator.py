"""First investigation orchestrator.

v0.3 deliberately keeps the *planner* deterministic. The important milestone
is that investigation steps are now explicit tool calls with an observable
trace. In v0.4 an LLM planner can choose from the same TOOL_REGISTRY while the
verification gate remains deterministic.
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


def investigate_lot(lot_id: str) -> dict[str, Any]:
    trace: list[dict[str, Any]] = []

    ctx = get_lot_context(lot_id)
    _step(trace, "get_lot_context", {"lot_id": lot_id}, ctx, "조사 대상 lot의 공정 경로와 장비를 먼저 고정한다.")

    dec = decompose_cd(lot_id)
    _step(trace, "decompose_cd", {"lot_id": lot_id}, dec, "CD 이상을 wafer/field/reticle/delta 좌표계로 분해한다.")

    day = int(ctx["day"])
    m = dec["metrics"]
    lim = dec["limits"]
    queried: set[str] = set()

    # Metrology is checked before acting on ACI/CD-derived evidence.
    aci_tool = ctx.get("aciTool")
    if aci_tool:
        mh = get_metrology_health(aci_tool, day)
        _step(trace, "get_metrology_health", {"tool_id": aci_tool, "day": day}, mh,
              "공정 조치 전에 계측 drift/TMU를 배제한다.")
        queried.add(aci_tool)

    # Photo scalar/dose branch.
    if abs(float(m.get("offset") or 0.0)) >= float(lim["adi_offset"]) or abs(float(ctx.get("doseGap") or 0.0)) >= float(lim["dose_gap_pct"]):
        scanner = ctx.get("scanner")
        if scanner:
            ev = get_equipment_events(scanner, day, 7)
            _step(trace, "get_equipment_events", {"tool_id": scanner, "day": day, "window": 7}, ev,
                  "ADI scalar shift 또는 Setting-Sensor gap과 시간적으로 겹치는 scanner event를 찾는다.")
            queried.add(scanner)

    # Track/radial branch.
    if abs(float(m.get("radial") or 0.0)) >= float(lim["adi_radial"]):
        ev = get_equipment_events("TRACK-01", day, 7)
        _step(trace, "get_equipment_events", {"tool_id": "TRACK-01", "day": day, "window": 7}, ev,
              "ADI radial signature와 PEB/track maintenance·calibration history를 대조한다.")
        queried.add("TRACK-01")

    # Reticle branch.
    if abs(float(m.get("reticle") or 0.0)) >= float(lim["adi_reticle"]):
        reticle = ctx.get("reticle")
        if reticle:
            ev = get_equipment_events(reticle, day, 7)
            _step(trace, "get_equipment_events", {"tool_id": reticle, "day": day, "window": 7}, ev,
                  "반복 site signature와 reticle inspection/qualification 이력을 대조한다.")
            queried.add(reticle)

    # Delta-CD/etch branch.
    if abs(float(m.get("dbias") or 0.0)) >= float(lim["delta_bias"]):
        comp = compare_chambers(day, 5)
        _step(trace, "compare_chambers", {"day": day, "window": 5}, comp,
              "Delta-CD 이상이 특정 chamber에 국한되는지 fleet fingerprint를 비교한다.")
        chamber = ctx.get("chamber")
        if chamber:
            ev = get_equipment_events(chamber, day, 10)
            _step(trace, "get_equipment_events", {"tool_id": chamber, "day": day, "window": 10}, ev,
                  "chamber PM/wet-clean/inspection 이력과 Delta-CD 변화 시점을 대조한다.")
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
                      "monitor drift가 커서 metrology calibration/alert 이력을 추가 조회한다.")

    gate = verify_disposition(lot_id)
    _step(trace, "verify_disposition", {"lot_id": lot_id}, gate,
          "마지막 결론은 LLM/플래너가 아니라 deterministic verification gate로 제한한다.")

    return {
        "lot": lot_id,
        "status": "DISPOSITION_READY" if gate["passed"] else "NEEDS_MORE_EVIDENCE",
        "verdict": gate["verdict"] if gate["passed"] else "INDETERMINATE",
        "action": gate["action"],
        "tool_calls": len(trace),
        "trace": trace,
    }
