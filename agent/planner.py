"""LLM planner 루프.

경계가 이 파일의 전부다.

    LLM  | 다음에 어떤 도구를 부를지 선택하고, 왜 부르는지 서술한다
    코드 | 도구를 실행하고, 수치를 만들고, 검증 게이트로 최종 판정을 확정한다

LLM은 판정을 제안할 수는 있으나 확정하지 못한다. 제안은 trace에 기록만 되고,
verdict는 언제나 verify_disposition()이 돌려준 값이다.
"""
from __future__ import annotations

from typing import Any

from agent.llm import LLMClient, dumps
from agent.tools import TOOL_REGISTRY, tool_catalog, verify_disposition

MAX_STEPS = 10
_REQUIRED = {t["name"]: t["required"] for t in tool_catalog()}

SYSTEM = """You investigate CD excursions in semiconductor manufacturing.

Rules you must follow:
1. You never produce numbers. Every value must come from a tool result.
2. Start with get_lot_context, then decompose_cd.
3. If Delta-CD is out of limit, call get_metrology_health BEFORE compare_chambers.
   A drifting measurement tool must be ruled out before blaming the process.
4. Use get_equipment_events to check whether a maintenance change point lines up
   in time. A coincidence alone does not confirm a cause.
5. You may propose a cause candidate, but you do not decide the verdict.
   The deterministic verification gate decides it.
6. Stop as soon as you have enough evidence. Do not call tools you do not need.

Respond by calling one tool at a time. When you have enough evidence, stop calling
tools and state your cause candidate in plain text."""


PROPS = {
    "lot_id": {"type": "string", "description": "lot identifier, e.g. L0081"},
    "tool_id": {"type": "string", "description": "equipment identifier, e.g. SCN-01, CDSEM-B, CH-A"},
    "day": {"type": "integer", "description": "production day index"},
    "window": {"type": "integer", "description": "days to look around 'day'"},
}
OPTIONAL = {"compare_chambers": ["window"], "get_equipment_events": ["window"]}


def _schema(name: str, required: list[str]) -> dict[str, Any]:
    keys = list(required) + OPTIONAL.get(name, [])
    return {"type": "object",
            "properties": {k: PROPS[k] for k in keys},
            "required": required}


def tool_schemas() -> list[dict[str, Any]]:
    """tool_catalog()에 JSON Schema를 붙여 LLM tool-calling에 넘길 형태로 만든다."""
    return [{**t, "input_schema": _schema(t["name"], t["required"])} for t in tool_catalog()]


def investigate_lot_llm(lot_id: str, client: LLMClient, max_steps: int = MAX_STEPS) -> dict[str, Any]:
    trace: list[dict[str, Any]] = []
    rejected: list[dict[str, Any]] = []
    history: list[dict[str, Any]] = [
        {"role": "user", "content": f"Investigate lot {lot_id}. Decide which tool to call first."}
    ]
    tools = tool_schemas()
    proposal: dict[str, Any] | None = None

    for _ in range(max_steps):
        decision = client.plan(SYSTEM, history, tools)

        if "final" in decision:
            proposal = decision["final"]
            break

        name, args = decision.get("tool"), dict(decision.get("args") or {})
        if name not in TOOL_REGISTRY:
            # 레지스트리에 없는 도구는 실행하지 않는다. 기록만 남기고 다시 묻는다.
            rejected.append({"tool": name, "args": args, "why": "not in TOOL_REGISTRY"})
            history.append({"role": "user", "content":
                            f"Tool '{name}' does not exist. Available: {[t['name'] for t in tools]}"})
            continue

        # planner가 lot_id를 빠뜨려도 조사 대상 로트는 코드가 채운다
        if "lot_id" in _REQUIRED[name]:
            args.setdefault("lot_id", lot_id)
        try:
            result = TOOL_REGISTRY[name](**args)
        except TypeError as exc:
            rejected.append({"tool": name, "args": args, "why": f"bad arguments: {exc}"})
            history.append({"role": "user", "content": f"Call to '{name}' failed: {exc}. Fix the arguments."})
            continue

        trace.append({"tool": name, "args": args,
                      "reason": decision.get("reason") or "(planner gave no reason)",
                      "result": result, "planner": "llm"})
        history.append({"role": "assistant", "content": f"calling {name}({args})"})
        history.append({"role": "user", "content": f"Result of {name}: {dumps(result)}"})

    # 게이트는 planner가 부르든 말든 반드시 실행된다. 최종 판정은 여기서만 나온다.
    gate = verify_disposition(lot_id)
    if not trace or trace[-1]["tool"] != "verify_disposition":
        trace.append({"tool": "verify_disposition", "args": {"lot_id": lot_id},
                      "reason": "Gate is run by the orchestrator regardless of planner choice.",
                      "result": gate, "planner": "deterministic"})

    return {
        "lot": lot_id,
        "planner": "llm",
        "status": "DISPOSITION_READY" if gate["passed"] else "NEEDS_MORE_EVIDENCE",
        "verdict": gate["verdict"] if gate["passed"] else "INDETERMINATE",
        "action": gate["action"],
        "tool_calls": len(trace),
        "trace": trace,
        # LLM이 제안한 후보는 기록만 한다. 판정에 쓰이지 않는다.
        "planner_proposal": proposal,
        "rejected_calls": rejected,
    }
