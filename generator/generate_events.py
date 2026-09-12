"""Generate synthetic fab equipment history for agent investigations.

This file is part of the synthetic-data generator, not the inference path.
It creates realistic-but-fictitious PM/calibration/change records that an
Agent can query while troubleshooting a lot. Runtime Agent code never reads
validation/ground_truth.csv.
"""
from __future__ import annotations

from pathlib import Path

import pandas as pd
import yaml

ROOT = Path(__file__).resolve().parents[1]
CFG = yaml.safe_load(open(ROOT / "config" / "config.yaml", encoding="utf-8"))
OUT = ROOT / "data"


def date_for_day(day: int) -> str:
    # Same workday calendar used by generate_data.py.
    return (pd.Timestamp("2026-03-02") + pd.Timedelta(days=day + (day // 5) * 2)).strftime("%Y-%m-%d")


def add(rows, day, tool, module, event_type, component, status, description,
        before=None, after=None, unit=None, source="MES/EES"):
    rows.append({
        "event_id": f"EVT-{len(rows)+1:04d}",
        "date": date_for_day(day),
        "day_index": day,
        "tool_id": tool,
        "module": module,
        "event_type": event_type,
        "component": component,
        "status": status,
        "description": description,
        "before_value": before,
        "after_value": after,
        "unit": unit,
        "source": source,
    })


def build_events() -> pd.DataFrame:
    rows = []

    # Routine scanner history. SCN-01 intentionally has a calibration gap around day 10-13.
    for tool in CFG["fleet"]["scanners"]:
        add(rows, 2, tool, "PHOTO", "CALIBRATION", "Energy Sensor", "COMPLETED",
            "Scheduled energy sensor calibration", 0.42, 0.08, "%")
        add(rows, 8, tool, "PHOTO", "PM", "Laser Source", "COMPLETED",
            "Routine source module preventive maintenance")
    add(rows, 9, "SCN-01", "PHOTO", "COMPONENT_REPLACE", "Laser Source", "COMPLETED",
        "Laser source module replaced after PM inspection")
    add(rows, 9, "SCN-01", "PHOTO", "CALIBRATION", "Energy Sensor", "OVERDUE",
        "Post-source-replacement energy calibration not closed within planned window")
    add(rows, 14, "SCN-01", "PHOTO", "CALIBRATION", "Energy Sensor", "COMPLETED",
        "Energy sensor recalibration completed", 1.96, 0.11, "%")
    add(rows, 14, "SCN-01", "PHOTO", "QUALIFICATION", "Dose Mapper", "PASS",
        "Post-calibration dose qualification passed")

    # Track history: a PEB plate uniformity issue with maintenance/qualification evidence.
    add(rows, 14, "TRACK-01", "PHOTO", "PM", "PEB Hotplate", "COMPLETED",
        "Routine PEB hotplate PM")
    add(rows, 15, "TRACK-01", "PHOTO", "CALIBRATION", "PEB Hotplate", "CHECK_REQUIRED",
        "Across-wafer plate uniformity check requested after PM", 1.1, None, "degC")
    add(rows, 19, "TRACK-01", "PHOTO", "CALIBRATION", "PEB Hotplate", "COMPLETED",
        "PEB hotplate uniformity tuning completed", 1.1, 0.28, "degC")

    # Reticle handling/inspection records. These do not directly say the CD is bad.
    add(rows, 19, "RET-B", "RETICLE", "INSPECTION", "Pattern CD", "REVIEW",
        "Scheduled reticle inspection flagged two sites for engineering review")
    add(rows, 24, "RET-B", "RETICLE", "QUALIFICATION", "Pattern CD", "PASS",
        "Reticle requalification after review")

    # Etch chambers: CH-C accumulates RF hours and receives delayed PM.
    for ch in CFG["fleet"]["chambers"]:
        add(rows, 12, ch, "ETCH", "PM", "Chamber", "COMPLETED",
            "Routine chamber PM and wet clean")
    add(rows, 24, "CH-C", "ETCH", "PM", "Chamber", "DUE",
        "Preventive maintenance window opened based on RF-hour criterion")
    add(rows, 29, "CH-C", "ETCH", "INSPECTION", "Endpoint/OES", "REVIEW",
        "Endpoint trace shift sent for engineering review")
    add(rows, 33, "CH-C", "ETCH", "PM", "Chamber", "COMPLETED",
        "Wet clean and chamber PM completed")
    add(rows, 33, "CH-C", "ETCH", "QUALIFICATION", "Etch Bias", "PASS",
        "Post-PM etch-bias qualification passed")

    # Metrology: CDSEM-B calibration becomes stale and is recovered.
    for tool in CFG["fleet"]["cdsem"]:
        add(rows, 5, tool, "METROLOGY", "CALIBRATION", "CD Scale", "COMPLETED",
            "Routine CD scale calibration", 0.35, 0.12, "nm")
        add(rows, 20, tool, "METROLOGY", "QUALIFICATION", "Monitor Wafer", "PASS",
            "Periodic monitor wafer qualification")
    add(rows, 33, "CDSEM-B", "METROLOGY", "CALIBRATION", "CD Scale", "OVERDUE",
        "Scheduled CD scale calibration exceeded due date")
    add(rows, 37, "CDSEM-B", "METROLOGY", "MONITOR_ALERT", "Monitor Wafer", "REVIEW",
        "Monitor wafer mean shift exceeded engineering watch level")
    add(rows, 40, "CDSEM-B", "METROLOGY", "CALIBRATION", "CD Scale", "COMPLETED",
        "CD scale recalibration completed", 3.22, 0.18, "nm")

    return pd.DataFrame(rows)


if __name__ == "__main__":
    df = build_events()
    df.to_csv(OUT / "equipment_events.csv", index=False)
    print(f"equipment events : {len(df)}")
    print("event types      :", dict(df["event_type"].value_counts().sort_index()))
