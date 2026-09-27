"""검토 이력 저장소 — 이 프로젝트에서 처음으로 '쓰기'가 생기는 지점.

판정 결과(data.js)는 엔진이 결정론적으로 만들어내는 산출물이라 파일로 충분했다.
DB가 필요해지는 시점은 데이터가 커질 때가 아니라 **쓰기가 생길 때**다.
누가 언제 무엇을 승인했는지가 남지 않으면 자동화가 아니라 책임 공백이 된다.

읽기 전용 판정 데이터는 여전히 스냅샷에서 읽고, 여기서는 사람이 남기는
결정 이력만 다룬다. 두 경로를 섞지 않는 것이 이 설계의 요점이다.
"""
from __future__ import annotations

import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]

SCHEMA = """
CREATE TABLE IF NOT EXISTS reviews (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    lot_id      TEXT    NOT NULL,
    gate        TEXT    NOT NULL,   -- G1 / G2 / G3
    decision    TEXT    NOT NULL,   -- approve / reject / more / accept / signoff
    reviewer    TEXT    NOT NULL,
    comment     TEXT,
    verdict_at_review TEXT,         -- 결정 당시의 판정. 나중에 판정이 바뀌어도 기록은 남는다
    created_at  TEXT    NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_reviews_lot ON reviews(lot_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at);
"""

DECISIONS = {"approve", "reject", "more", "accept", "signoff"}
GATES = {"G1", "G2", "G3"}


class ReviewRepository:
    def __init__(self, path: Path | None = None):
        self.path = Path(path) if path else ROOT / "db" / "reviews.sqlite"
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self._conn() as c:
            c.executescript(SCHEMA)

    def _conn(self) -> sqlite3.Connection:
        c = sqlite3.connect(self.path)
        c.row_factory = sqlite3.Row
        return c

    def add(self, *, lot_id: str, gate: str, decision: str, reviewer: str,
            comment: str | None = None, verdict_at_review: str | None = None) -> dict[str, Any]:
        if gate not in GATES:
            raise ValueError(f"unknown gate: {gate}")
        if decision not in DECISIONS:
            raise ValueError(f"unknown decision: {decision}")
        if not reviewer.strip():
            raise ValueError("reviewer is required")   # 익명 승인은 받지 않는다
        row = {
            "lot_id": lot_id, "gate": gate, "decision": decision,
            "reviewer": reviewer.strip(), "comment": comment,
            "verdict_at_review": verdict_at_review,
            "created_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        }
        with self._conn() as c:
            cur = c.execute(
                "INSERT INTO reviews (lot_id, gate, decision, reviewer, comment,"
                " verdict_at_review, created_at) VALUES (?,?,?,?,?,?,?)",
                tuple(row[k] for k in
                      ("lot_id", "gate", "decision", "reviewer", "comment",
                       "verdict_at_review", "created_at")))
            row["id"] = cur.lastrowid
        return row

    def history(self, lot_id: str) -> list[dict[str, Any]]:
        with self._conn() as c:
            return [dict(r) for r in c.execute(
                "SELECT * FROM reviews WHERE lot_id=? ORDER BY id", (lot_id,))]

    def latest(self, lot_id: str) -> dict[str, Any] | None:
        h = self.history(lot_id)
        return h[-1] if h else None

    def summary(self) -> dict[str, Any]:
        """게이트별·결정별 집계. 검토가 실제로 이뤄지는지 보는 지표."""
        with self._conn() as c:
            by_gate = {r["gate"]: r["n"] for r in c.execute(
                "SELECT gate, COUNT(*) n FROM reviews GROUP BY gate")}
            by_dec = {r["decision"]: r["n"] for r in c.execute(
                "SELECT decision, COUNT(*) n FROM reviews GROUP BY decision")}
            total = c.execute("SELECT COUNT(*) n FROM reviews").fetchone()["n"]
            lots = c.execute("SELECT COUNT(DISTINCT lot_id) n FROM reviews").fetchone()["n"]
        return {"total": total, "reviewed_lots": lots, "by_gate": by_gate, "by_decision": by_dec}
