"""CLI, FastAPI, 향후 Agent tool이 함께 쓰는 조회 서비스 계층.

현재 v1 판정 결과는 engine/analyze.py가 생성한 data.js snapshot을 사용한다.
중요한 변화는 각 인터페이스가 data.js를 제각각 파싱하지 않고 이 계층을 공유한다는 점이다.
향후 SQLite/PostgreSQL repository로 바꿀 때 이 파일 아래 구현만 교체하면 된다.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]


class LotNotFoundError(KeyError):
    pass


class AttributionQueryService:
    def __init__(self, data_path: Path | None = None):
        self.data_path = data_path or ROOT / "data.js"
        self.reload()

    def reload(self) -> None:
        raw = self.data_path.read_text(encoding="utf-8")
        self.data = json.loads(raw[raw.index("{") : raw.rstrip().rstrip(";").rindex("}") + 1])
        self.lots = {lot["lot"]: lot for lot in self.data["lots"]}

    def _need(self, lot_id: str) -> dict[str, Any]:
        try:
            return self.lots[lot_id]
        except KeyError as exc:
            raise LotNotFoundError(lot_id) from exc

    def health(self) -> dict[str, Any]:
        return {"status": "ok", "lots": len(self.lots), "data_source": self.data_path.name}

    def list_lots(self, abnormal: bool = False, chamber: str | None = None, limit: int = 40) -> list[dict]:
        rows = [
            lot for lot in self.data["lots"]
            if (not abnormal or lot["verdict"] != "NORMAL")
            and (not chamber or lot["chamber"] == chamber)
        ]
        return [
            {
                "lot": lot["lot"], "date": lot["date"], "chamber": lot["chamber"],
                "verdict": lot["verdict"], "label": lot["label"],
            }
            for lot in rows[:limit]
        ]

    def lot_context(self, lot_id: str) -> dict[str, Any]:
        lot = self._need(lot_id)
        keys = (
            "lot", "date", "day", "scanner", "reticle", "chamber", "adiTool", "aciTool", "rf",
            "doseSet", "doseSensor", "doseGap", "focusSensor", "adiMean", "aciMean", "m",
        )
        return {k: lot.get(k) for k in keys}

    def decompose(self, lot_id: str) -> dict[str, Any]:
        lot = self._need(lot_id)
        return {
            "lot": lot["lot"], "metrics": lot["m"], "centers": self.data["centers"],
            "limits": self.data["limits"], "evidence": lot["ev"],
        }

    def metrology(self, tool: str | None = None, day: int | None = None) -> dict[str, Any]:
        rows = [
            m for m in self.data["monitor"]
            if (not tool or m["tool"] == tool)
            and (day is None or day - 14 <= m["day"] <= day)
        ]
        return {
            "limit": self.data["limits"]["tool_drift"],
            "series": rows,
            "note": "monitor wafer 재측정. 공정이 건드리지 않은 웨이퍼이므로 여기서 움직였다면 계측 원인 후보다.",
        }

    def tmu(self, tool: str | None = None, day: int | None = None) -> dict[str, Any]:
        rows = [
            t for t in self.data["tmu"]
            if (not tool or t["tool"] == tool) and (day is None or t["day"] <= day)
        ]
        if day is not None:
            rows = rows[-2:] if not tool else rows[-1:]
        return {
            "cd_tolerance_nm": self.data["meta"]["cdTol"],
            "budget_pct": self.data["meta"]["tmuBudget"],
            "series": rows,
            "note": (
                "TMU가 예산을 넘으면 그 장비의 측정값을 근거로 한 공정 조치는 보류한다. "
                "TIS 항은 오버레이 전용이라 CD-SEM TMU에서는 제외했다."
            ),
        }

    def chambers(self, day: int, window: int = 5) -> dict[str, Any]:
        rows = [c for c in self.data["chamberSeries"] if day - window < c["day"] <= day]
        agg: dict[str, dict[str, float]] = {}
        for row in rows:
            slot = agg.setdefault(row["chamber"], {"n": 0, "sum": 0.0})
            slot["n"] += row["n"]
            slot["sum"] += row["dbias"] * row["n"]
        return {
            "window": [day - window + 1, day],
            "limit": self.data["limits"]["chamber_dev"],
            "chambers": {k: round(v["sum"] / v["n"], 3) for k, v in sorted(agg.items()) if v["n"]},
        }

    def rules(self, signature: str | None = None) -> list[dict[str, Any]]:
        hit = [
            rule for rule in self.data["rules"]
            if not signature or signature in json.dumps(rule, ensure_ascii=False)
        ]
        return hit if hit else self.data["rules"]

    def verify(self, lot_id: str) -> dict[str, Any]:
        lot = self._need(lot_id)
        fail = [gate["c"] for gate in lot["gate"] if not gate["ok"]]
        return {
            "lot": lot["lot"], "verdict": lot["verdict"], "gate": lot["gate"],
            "passed": not fail, "unmet": fail,
            "action": lot["action"] if not fail else "근거 불충족 — 판정하지 않는다.",
        }
