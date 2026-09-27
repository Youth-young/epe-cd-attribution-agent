"""검토 이력 — 이 프로젝트에서 유일하게 '쓰기'가 일어나는 경로."""
import tempfile
from pathlib import Path

import pytest

from repositories.review_repository import ReviewRepository


@pytest.fixture()
def repo():
    return ReviewRepository(Path(tempfile.mkdtemp()) / "t.sqlite")


def test_review_is_appended_not_overwritten(repo):
    """결정은 덮어쓰지 않고 쌓인다. 번복도 기록으로 남아야 한다."""
    repo.add(lot_id="L0081", gate="G1", decision="approve", reviewer="A")
    repo.add(lot_id="L0081", gate="G1", decision="reject", reviewer="B")
    h = repo.history("L0081")
    assert [r["decision"] for r in h] == ["approve", "reject"]
    assert repo.latest("L0081")["reviewer"] == "B"


def test_anonymous_approval_is_refused(repo):
    with pytest.raises(ValueError):
        repo.add(lot_id="L0081", gate="G1", decision="approve", reviewer="   ")


def test_unknown_gate_or_decision_is_refused(repo):
    with pytest.raises(ValueError):
        repo.add(lot_id="L0081", gate="G9", decision="approve", reviewer="A")
    with pytest.raises(ValueError):
        repo.add(lot_id="L0081", gate="G1", decision="delete_everything", reviewer="A")


def test_verdict_at_review_is_frozen(repo):
    """결정 당시의 판정을 함께 남긴다. 나중에 판정이 바뀌어도 기록은 그대로다."""
    repo.add(lot_id="L0081", gate="G1", decision="approve", reviewer="A",
             verdict_at_review="PHOTO_DOSE")
    assert repo.latest("L0081")["verdict_at_review"] == "PHOTO_DOSE"


def test_summary_counts_by_gate_and_decision(repo):
    repo.add(lot_id="L1", gate="G1", decision="approve", reviewer="A")
    repo.add(lot_id="L2", gate="G3", decision="signoff", reviewer="B")
    s = repo.summary()
    assert s["total"] == 2 and s["reviewed_lots"] == 2
    assert s["by_gate"] == {"G1": 1, "G3": 1}
