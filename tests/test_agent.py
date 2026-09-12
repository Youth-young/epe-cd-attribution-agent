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
