from agent.orchestrator import investigate_lot
from agent.tools import tool_catalog


def test_tool_catalog_has_core_investigation_tools():
    names = {x["name"] for x in tool_catalog()}
    assert {"get_lot_context", "decompose_cd", "get_equipment_events", "verify_disposition"} <= names


def test_photo_dose_investigation_uses_scanner_event_history():
    result = investigate_lot("L0081")
    calls = [s for s in result["trace"] if s["tool"] == "get_equipment_events"]
    assert any(s["args"].get("tool_id") == "SCN-01" for s in calls)
    assert result["tool_calls"] >= 4


def test_investigation_finishes_with_verification_gate():
    result = investigate_lot("L0081")
    assert result["trace"][-1]["tool"] == "verify_disposition"


def test_retry_policy_defines_a_next_attempt_for_each_gate_condition():
    """게이트 조건마다 '다음에 무엇을 다르게 해볼지'가 정의되어 있어야 한다."""
    from agent.orchestrator import RETRY_POLICY
    for cond, pol in RETRY_POLICY.items():
        assert pol["why"], f"{cond}: 재시도 근거 문구 누락"
        assert "tool" in pol


def test_tmu_breach_is_not_retried():
    """계측 불확도 초과는 더 조회해도 해소되지 않으므로 재시도 대상이 아니다."""
    from agent.orchestrator import RETRY_POLICY
    assert RETRY_POLICY["tmu_within_budget"]["tool"] is None


def test_gate_failure_triggers_one_retry_then_escalates():
    result = investigate_lot("L0273")
    assert result["status"] == "NEEDS_MORE_EVIDENCE"
    assert result["escalation"] == "G2"
    assert result["retries"] and result["retries"][0]["condition"] == "taper_not_contradicting"
    # 재시도 단계가 trace에 남고, 그 뒤 게이트를 다시 확인한다
    assert any(s.get("retry_of") == "taper_not_contradicting" for s in result["trace"])
    assert result["trace"][-1]["tool"] == "verify_disposition"


def test_passing_lots_are_not_retried():
    result = investigate_lot("L0001")
    assert result["retries"] == []
    assert result["escalation"] is None


def test_retry_does_not_change_the_verdict():
    """재시도는 조회 범위만 넓힌다. 판정 기준을 흔들면 안 된다."""
    from engine.query_service import AttributionQueryService
    svc = AttributionQueryService()
    for lot_id in ("L0273", "L0277"):
        assert investigate_lot(lot_id)["verdict"] == (
            svc.verify(lot_id)["verdict"] if svc.verify(lot_id)["passed"] else "INDETERMINATE")
