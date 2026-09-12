"""서비스/API/Agent가 공유하는 최소 데이터 계약.

아직 SQLite migration 전 단계이므로 모든 fab entity를 억지로 모델링하지 않는다.
먼저 외부 인터페이스에서 반드시 지켜야 하는 타입부터 코드 계약으로 고정한다.
"""
from __future__ import annotations

from typing import Any
from pydantic import BaseModel, Field


class LotSummary(BaseModel):
    lot: str
    date: str
    chamber: str
    verdict: str
    label: str


class GateCheck(BaseModel):
    c: str = Field(description="검증에 필요한 조건 이름")
    ok: bool


class VerificationResult(BaseModel):
    lot: str
    verdict: str
    gate: list[GateCheck]
    passed: bool
    unmet: list[str]
    action: str


class HealthResponse(BaseModel):
    status: str = "ok"
    lots: int
    data_source: str


class JsonEnvelope(BaseModel):
    """스키마가 아직 안정화되지 않은 분석 응답을 위한 임시 envelope."""

    data: dict[str, Any]


class EquipmentEvent(BaseModel):
    event_id: str
    date: str
    day_index: int
    tool_id: str
    module: str
    event_type: str
    component: str
    status: str
    description: str
    before_value: float | None = None
    after_value: float | None = None
    unit: str | None = None
    source: str


class InvestigationStep(BaseModel):
    tool: str
    args: dict[str, Any]
    reason: str
    result: Any


class InvestigationResult(BaseModel):
    lot: str
    status: str
    verdict: str
    action: str
    tool_calls: int
    trace: list[InvestigationStep]
