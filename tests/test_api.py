from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_health_endpoint():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["lots"] == 320


def test_openapi_exposes_agent_ready_tool_surface():
    r = client.get("/openapi.json")
    paths = r.json()["paths"]
    for path in ("/lots", "/lots/{lot_id}/decompose", "/metrology/tmu", "/chambers", "/lots/{lot_id}/verify"):
        assert path in paths


def test_unknown_lot_returns_404():
    r = client.get("/lots/NO_SUCH_LOT")
    assert r.status_code == 404


def test_equipment_events_endpoint():
    r = client.get("/equipment/events", params={"tool_id": "SCN-01", "day": 11, "window": 3})
    assert r.status_code == 200
    assert len(r.json()["events"]) >= 1


def test_agent_tools_endpoint():
    r = client.get("/agent/tools")
    assert r.status_code == 200
    assert any(t["name"] == "get_equipment_events" for t in r.json()["tools"])


def test_investigate_endpoint():
    r = client.post("/lots/L0081/investigate")
    assert r.status_code == 200
    body = r.json()
    assert body["trace"][-1]["tool"] == "verify_disposition"
