"""FastAPI service surface for EPE-CD Attribution Agent.

실행:
    uvicorn api.main:app --reload
문서:
    http://127.0.0.1:8000/docs
"""
from __future__ import annotations

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from domain.models import HealthResponse, LotSummary, VerificationResult
from engine.query_service import AttributionQueryService, LotNotFoundError

app = FastAPI(
    title="EPE-CD Attribution API",
    version="0.2.0",
    description=(
        "Deterministic CD attribution engine의 서비스 인터페이스. "
        "향후 Agent tool-calling은 이 API와 동일한 service layer를 공유한다."
    ),
)

# React 개발 서버와의 연동을 위한 최소 CORS. 배포 시 실제 origin으로 제한한다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service = AttributionQueryService()


def not_found(exc: LotNotFoundError) -> HTTPException:
    return HTTPException(status_code=404, detail=f"없는 로트: {exc.args[0]}")


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health():
    return service.health()


@app.get("/lots", response_model=list[LotSummary], tags=["lots"])
def list_lots(
    abnormal: bool = False,
    chamber: str | None = None,
    limit: int = Query(default=40, ge=1, le=320),
):
    return service.list_lots(abnormal=abnormal, chamber=chamber, limit=limit)


@app.get("/lots/{lot_id}", tags=["lots"])
def lot_context(lot_id: str):
    try:
        return service.lot_context(lot_id)
    except LotNotFoundError as exc:
        raise not_found(exc) from exc


@app.get("/lots/{lot_id}/decompose", tags=["analysis"])
def decompose(lot_id: str):
    try:
        return service.decompose(lot_id)
    except LotNotFoundError as exc:
        raise not_found(exc) from exc


@app.get("/metrology/monitor", tags=["metrology"])
def metrology_monitor(tool: str | None = None, day: int | None = None):
    return service.metrology(tool=tool, day=day)


@app.get("/metrology/tmu", tags=["metrology"])
def metrology_tmu(tool: str | None = None, day: int | None = None):
    return service.tmu(tool=tool, day=day)


@app.get("/chambers", tags=["etch"])
def chambers(day: int, window: int = Query(default=5, ge=1, le=30)):
    return service.chambers(day=day, window=window)


@app.get("/rules", tags=["knowledge"])
def rules(signature: str | None = None):
    return service.rules(signature=signature)


@app.post("/lots/{lot_id}/verify", response_model=VerificationResult, tags=["verification"])
def verify(lot_id: str):
    try:
        return service.verify(lot_id)
    except LotNotFoundError as exc:
        raise not_found(exc) from exc
