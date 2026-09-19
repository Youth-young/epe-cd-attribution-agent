"""LLM planner 경계 테스트.

네트워크 없이 ScriptedClient로 루프 동작만 검증한다.
검증 대상은 '판정이 맞는가'가 아니라 'LLM이 넘을 수 없는 선이 지켜지는가'다.
"""
from agent.llm import ScriptedClient
from agent.orchestrator import investigate_lot
from agent.planner import investigate_lot_llm, tool_schemas

LOT = "L0081"


def _client(decisions):
    return ScriptedClient(decisions)


def test_tool_schemas_are_json_schema_shaped():
    for t in tool_schemas():
        s = t["input_schema"]
        assert s["type"] == "object"
        assert set(s["required"]) <= set(s["properties"])


def test_planner_selected_tools_are_executed_in_order():
    r = investigate_lot_llm(LOT, _client([
        {"tool": "get_lot_context", "args": {"lot_id": LOT}, "reason": "route first"},
        {"tool": "decompose_cd", "args": {"lot_id": LOT}, "reason": "decompose"},
        {"final": {"cause_candidate": "PHOTO_DOSE", "reason": "scalar shift"}},
    ]))
    assert [s["tool"] for s in r["trace"][:2]] == ["get_lot_context", "decompose_cd"]


def test_unknown_tool_is_rejected_and_never_executed():
    r = investigate_lot_llm(LOT, _client([
        {"tool": "drop_database", "args": {}, "reason": "should be refused"},
        {"final": {"cause_candidate": "X", "reason": "done"}},
    ]))
    assert r["rejected_calls"] and r["rejected_calls"][0]["tool"] == "drop_database"
    assert all(s["tool"] != "drop_database" for s in r["trace"])


def test_bad_arguments_do_not_crash_the_loop():
    r = investigate_lot_llm(LOT, _client([
        {"tool": "compare_chambers", "args": {"nonsense": 1}, "reason": "bad args"},
        {"final": {"cause_candidate": "X", "reason": "done"}},
    ]))
    assert r["rejected_calls"][0]["why"].startswith("bad arguments")


def test_gate_runs_even_when_planner_never_calls_it():
    r = investigate_lot_llm(LOT, _client([
        {"final": {"cause_candidate": "ETCH_CHAMBER", "reason": "guessing"}},
    ]))
    assert r["trace"][-1]["tool"] == "verify_disposition"
    assert r["trace"][-1]["planner"] == "deterministic"


def test_planner_proposal_cannot_override_the_gate_verdict():
    """LLM이 엉뚱한 원인을 제안해도 verdict는 게이트 값이어야 한다."""
    baseline = investigate_lot(LOT)
    r = investigate_lot_llm(LOT, _client([
        {"final": {"cause_candidate": "ETCH_CHAMBER", "reason": "deliberately wrong"}},
    ]))
    assert r["planner_proposal"]["cause_candidate"] == "ETCH_CHAMBER"
    assert r["verdict"] == baseline["verdict"] != "ETCH_CHAMBER"


def test_max_steps_is_enforced():
    loop = [{"tool": "get_lot_context", "args": {"lot_id": LOT}, "reason": "again"}] * 50
    r = investigate_lot_llm(LOT, _client(loop), max_steps=3)
    assert len([s for s in r["trace"] if s["planner"] == "llm"]) == 3


def test_numbers_in_trace_come_from_tools_not_from_the_planner():
    """planner가 서술한 문장은 reason에만 들어가고, result는 도구 출력 그대로다."""
    r = investigate_lot_llm(LOT, _client([
        {"tool": "decompose_cd", "args": {"lot_id": LOT}, "reason": "ADI offset is +99.9 nm"},
        {"final": {"cause_candidate": "X", "reason": "done"}},
    ]))
    step = r["trace"][0]
    assert "99.9" in step["reason"]
    assert step["result"]["metrics"] == investigate_lot(LOT)["trace"][1]["result"]["metrics"]


def test_orchestrator_default_planner_is_deterministic():
    assert investigate_lot(LOT)["planner"] == "deterministic"


def test_planner_eval_harness_runs_without_network():
    """평가 하네스가 도는지만 확인한다. dry-run 결과는 성능 지표로 쓰지 않는다."""
    import sys
    from pathlib import Path

    sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "validation"))
    from planner_eval import run, sample_lots

    lots = sample_lots(6)
    assert len(lots) == 6
    result = run(lots, dry_run=True, repeats=2)
    s = result["summary"]
    assert s["lots"] == 6
    assert s["reproducible_lots"] == 6            # 결정론 재생이므로 흔들리지 않아야 한다
    assert s["rejected_tool_calls"] == 0
