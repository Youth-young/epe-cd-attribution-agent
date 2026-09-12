"""Typed Agent tool surface.

These functions are thin adapters over the same service/repository layer used
by FastAPI. An LLM tool-calling runtime can expose these functions later
without duplicating domain logic.
"""
from __future__ import annotations

from typing import Any

from engine.query_service import AttributionQueryService

_service = AttributionQueryService()


def get_lot_context(lot_id: str) -> dict[str, Any]:
    """Return route, tool assignment and process context for one lot."""
    return _service.lot_context(lot_id)


def decompose_cd(lot_id: str) -> dict[str, Any]:
    """Return ADI/ACI CD decomposition metrics, limits and evidence."""
    return _service.decompose(lot_id)


def get_metrology_health(tool_id: str, day: int) -> dict[str, Any]:
    """Return monitor-wafer drift and TMU evidence for a measurement tool."""
    return {
        "monitor": _service.metrology(tool=tool_id, day=day),
        "tmu": _service.tmu(tool=tool_id, day=day),
    }


def compare_chambers(day: int, window: int = 5) -> dict[str, Any]:
    """Compare recent etch chamber delta-CD behavior."""
    return _service.chambers(day=day, window=window)


def get_equipment_events(tool_id: str, day: int, window: int = 7) -> dict[str, Any]:
    """Return PM/calibration/change history around a lot date."""
    return _service.equipment_events(tool_id=tool_id, day=day, window=window)


def verify_disposition(lot_id: str) -> dict[str, Any]:
    """Run the deterministic verification gate before any disposition."""
    return _service.verify(lot_id)


TOOL_REGISTRY = {
    "get_lot_context": get_lot_context,
    "decompose_cd": decompose_cd,
    "get_metrology_health": get_metrology_health,
    "compare_chambers": compare_chambers,
    "get_equipment_events": get_equipment_events,
    "verify_disposition": verify_disposition,
}


def tool_catalog() -> list[dict[str, Any]]:
    """Human-readable catalog for /agent/tools and future JSON-schema export."""
    return [
        {"name": "get_lot_context", "purpose": "lot route/tool context", "required": ["lot_id"]},
        {"name": "decompose_cd", "purpose": "CD coordinate decomposition", "required": ["lot_id"]},
        {"name": "get_metrology_health", "purpose": "monitor + TMU check", "required": ["tool_id", "day"]},
        {"name": "compare_chambers", "purpose": "etch chamber fingerprint", "required": ["day"]},
        {"name": "get_equipment_events", "purpose": "PM/calibration/change history", "required": ["tool_id", "day"]},
        {"name": "verify_disposition", "purpose": "deterministic evidence gate", "required": ["lot_id"]},
    ]
