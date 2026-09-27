"""판정 스냅샷을 SQLite로 적재한다.

읽기 전용 판정 결과는 엔진이 만든 data.js가 단일 진실이다. 이 스크립트는 그것을
조회하기 좋은 형태로 옮겨 담을 뿐, 값을 새로 만들지 않는다.
쓰기가 일어나는 표는 reviews 하나뿐이고 그것만 별도 저장소가 관리한다.

실행:  python db/build_db.py
"""
from __future__ import annotations

import json
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

DB = ROOT / "db" / "attribution.sqlite"

SCHEMA = """
DROP TABLE IF EXISTS lots;
DROP TABLE IF EXISTS measurements;
DROP TABLE IF EXISTS dispositions;
DROP TABLE IF EXISTS tool_calls;

CREATE TABLE lots (
    lot_id TEXT PRIMARY KEY, date TEXT, day INTEGER,
    scanner TEXT, reticle TEXT, chamber TEXT,
    adi_tool TEXT, aei_tool TEXT, rf_hours REAL,
    dose_set REAL, dose_sensor REAL, dose_gap REAL
);
CREATE TABLE measurements (
    lot_id TEXT, metric TEXT, value TEXT, limit_text TEXT,
    is_ooc INTEGER, source TEXT,
    PRIMARY KEY (lot_id, metric)
);
CREATE TABLE dispositions (
    lot_id TEXT PRIMARY KEY, verdict TEXT, risk TEXT, module TEXT,
    gate_passed INTEGER, unmet TEXT, escalation TEXT, retries INTEGER
);
CREATE TABLE tool_calls (
    lot_id TEXT, seq INTEGER, tool TEXT, args TEXT,
    retry_of TEXT, PRIMARY KEY (lot_id, seq)
);
CREATE INDEX idx_meas_ooc ON measurements(is_ooc);
CREATE INDEX idx_disp_verdict ON dispositions(verdict);
"""


def _load(path: Path, prefix: str) -> dict:
    s = path.read_text(encoding="utf-8")
    if prefix:
        s = s[len(prefix):]
    return json.loads(s[s.index("{"): s.rstrip().rstrip(";").rindex("}") + 1])


def main() -> None:
    data = _load(ROOT / "data.js", "")
    inv = _load(ROOT / "investigations.js", "const INVESTIGATIONS = ")

    DB.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB)
    con.executescript(SCHEMA)

    for l in data["lots"]:
        con.execute(
            "INSERT INTO lots VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            (l["lot"], l["date"], l["day"], l["scanner"], l["reticle"], l["chamber"],
             l.get("adiTool"), l.get("aciTool"), l.get("rf"),
             l.get("doseSet"), l.get("doseSensor"), l.get("doseGap")))
        for e in l.get("ev", []):
            con.execute("INSERT OR REPLACE INTO measurements VALUES (?,?,?,?,?,?)",
                        (l["lot"], e["k"], e["v"], e["lim"], 1 if e["hit"] else 0, None))
        iv = inv.get(l["lot"], {})
        gate = iv.get("status") == "DISPOSITION_READY"
        unmet = [g["c"] for g in l.get("gate", []) if not g["ok"]]
        con.execute("INSERT INTO dispositions VALUES (?,?,?,?,?,?,?,?)",
                    (l["lot"], l["verdict"], l.get("risk"), l.get("module"),
                     1 if gate else 0, json.dumps(unmet, ensure_ascii=False),
                     iv.get("escalation"), len(iv.get("retries") or [])))
        for i, st in enumerate(iv.get("trace", [])):
            con.execute("INSERT OR REPLACE INTO tool_calls VALUES (?,?,?,?,?)",
                        (l["lot"], i, st["tool"], json.dumps(st.get("args"), ensure_ascii=False),
                         st.get("retry_of")))
    con.commit()

    n = {t: con.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
         for t in ("lots", "measurements", "dispositions", "tool_calls")}
    con.close()
    print(f"{DB.relative_to(ROOT)} · " + " · ".join(f"{k} {v}" for k, v in n.items()))


if __name__ == "__main__":
    main()
