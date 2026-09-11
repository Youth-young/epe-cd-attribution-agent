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
