from engine.query_service import AttributionQueryService


def test_scanner_event_history_contains_overdue_calibration():
    service = AttributionQueryService()
    result = service.equipment_events(tool_id="SCN-01", day=11, window=3)
    assert any(e["event_type"] == "CALIBRATION" and e["status"] == "OVERDUE" for e in result["events"])


def test_metrology_event_history_is_queryable():
    service = AttributionQueryService()
    result = service.equipment_events(tool_id="CDSEM-B", day=36, window=5)
    assert any(e["component"] == "CD Scale" for e in result["events"])
