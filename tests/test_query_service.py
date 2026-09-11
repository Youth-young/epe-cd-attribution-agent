from engine.query_service import AttributionQueryService, LotNotFoundError


def test_service_loads_all_lots():
    s = AttributionQueryService()
    assert s.health()["lots"] == 320


def test_known_lot_can_be_decomposed_and_verified():
    s = AttributionQueryService()
    lot_id = s.data["lots"][0]["lot"]
    d = s.decompose(lot_id)
    v = s.verify(lot_id)
    assert d["lot"] == lot_id
    assert "metrics" in d and "limits" in d and "evidence" in d
    assert v["lot"] == lot_id
    assert isinstance(v["passed"], bool)


def test_unknown_lot_raises_domain_error():
    s = AttributionQueryService()
    try:
        s.lot_context("NO_SUCH_LOT")
    except LotNotFoundError:
        pass
    else:
        raise AssertionError("LotNotFoundError was not raised")
