"""Structured equipment-event repository.

The first implementation uses CSV so the data is easy to inspect in GitHub.
The public methods are intentionally repository-shaped so CSV can later be
replaced by SQLite/PostgreSQL without changing API/Agent callers.
"""
from __future__ import annotations

from pathlib import Path
from typing import Any

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]


class EquipmentEventRepository:
    def __init__(self, path: Path | None = None):
        self.path = path or ROOT / "data" / "equipment_events.csv"
        self.reload()

    def reload(self) -> None:
        if self.path.exists():
            self.df = pd.read_csv(self.path)
        else:
            self.df = pd.DataFrame(
                columns=[
                    "event_id", "date", "day_index", "tool_id", "module",
                    "event_type", "component", "status", "description",
                    "before_value", "after_value", "unit", "source",
                ]
            )

    def list_events(
        self,
        *,
        tool_id: str | None = None,
        event_type: str | None = None,
        day_from: int | None = None,
        day_to: int | None = None,
        limit: int = 100,
    ) -> list[dict[str, Any]]:
        df = self.df
        if tool_id:
            df = df[df["tool_id"] == tool_id]
        if event_type:
            df = df[df["event_type"] == event_type]
        if day_from is not None:
            df = df[df["day_index"] >= day_from]
        if day_to is not None:
            df = df[df["day_index"] <= day_to]
        df = df.sort_values(["day_index", "event_id"], ascending=[False, False]).head(limit)
        clean = df.astype(object).where(pd.notna(df), None)
        return clean.to_dict("records")

    def around(self, *, tool_id: str, day: int, window: int = 7) -> list[dict[str, Any]]:
        return self.list_events(
            tool_id=tool_id,
            day_from=max(0, day - window),
            day_to=day + window,
            limit=100,
        )
