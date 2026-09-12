# v0.3 — Investigation Tools: Agent가 실제로 조회할 근거 만들기

## 이번 버전의 목표

v0.2까지는 판정 엔진, FastAPI, 테스트/CI 구조를 만들었다. 하지만 “PM 이력을 확인하라”라고 말할 뿐 실제 PM/Calibration 이력을 Agent가 조회할 수 없었다.

v0.3의 목표는 **조사 가능한 structured evidence**와 **명시적인 tool-call trace**를 추가하는 것이다.

## 새 데이터

`data/equipment_events.csv`

- PM
- Calibration
- Component replacement
- Inspection
- Qualification
- Monitor alert

이 데이터는 합성 데이터이며 `generator/generate_events.py`가 재현 가능하게 생성한다. Runtime Agent는 `validation/ground_truth.csv`를 읽지 않는다.

## 새 계층

```text
CSV equipment history
        ↓
repositories/event_repository.py
        ↓
engine/query_service.py
      ↙             ↘
 FastAPI          Agent Tools
                    ↓
             Orchestrator Trace
                    ↓
            Verification Gate
```

## Agent tools

- `get_lot_context(lot_id)`
- `decompose_cd(lot_id)`
- `get_metrology_health(tool_id, day)`
- `compare_chambers(day, window)`
- `get_equipment_events(tool_id, day, window)`
- `verify_disposition(lot_id)`

## 왜 아직 LLM을 넣지 않았나

v0.3의 planner는 의도적으로 deterministic이다. 먼저 tool contract, evidence source, logging, gate가 맞는지 검증해야 한다. 다음 버전에서 LLM이 도구를 고르게 하더라도 **도구와 검증 게이트는 그대로 재사용**한다.

즉 v0.3은 “LLM을 넣기 위한 준비”가 아니라, Agent에서 더 중요한 **행동 가능한 도구와 관측 가능한 조사 경로**를 먼저 만든 버전이다.

## 실행

```bash
python run.py
python -m pytest -q
uvicorn api.main:app --reload
```

API 문서: `http://127.0.0.1:8000/docs`

추천 확인 순서:

1. `GET /agent/tools`
2. `GET /equipment/events?tool_id=SCN-01&day=11&window=3`
3. `POST /lots/L0081/investigate`

3번 응답의 `trace`에서 Agent가 어떤 도구를 왜 호출했는지 볼 수 있다.

## 다음 버전(v0.4)

- tool schema를 LLM tool-calling 형식으로 export
- planner interface 추가
- LLM planner와 deterministic fallback 분리
- token/tool-call budget
- trace persistence(SQLite)
- evidence citation IDs
