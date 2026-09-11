# Agent-ready refactor — v0.2

이 문서는 기존 정적 EPE-CD Attribution Console을 버리지 않고, FastAPI/RAG/Agent로 확장하기 위해 이번 버전에서 바꾼 구조를 설명한다.

## 1. 이번에 해결한 문제

### Ground truth leakage 구조 제거
이전 `engine/analyze.py`는 판정에 정답 label을 사용하지는 않았지만 `validation/ground_truth.csv`를 읽어 dataframe에 merge했다. 문서의 “엔진 미열람” 주장과 코드가 일치하지 않았다.

v0.2에서는 prediction과 evaluation을 프로세스 수준에서 분리했다.

```text
generator/generate_data.py
        ↓
engine/analyze.py             ← ground truth를 모름
        ↓
      data.js                 ← prediction snapshot
        ↓
validation/evaluate.py  +  validation/ground_truth.csv
        ↓
validation/evaluation.json
validation/validation.js
validation/blind_eval.md
```

`index.html`의 검증 탭은 `data.js`가 아니라 `validation/validation.js`를 읽는다. 따라서 서비스/Agent가 읽는 판정 snapshot 안에 정답 label이 들어가지 않는다.

## 2. 공유 서비스 계층

이전에는 `engine/tools.py`가 직접 `data.js`를 파싱했다. FastAPI를 추가할 때 같은 로직을 복사하면 CLI/API/Agent가 서로 다른 행동을 하게 된다.

그래서 다음 계층을 추가했다.

```text
                       ┌─ engine/tools.py (CLI)
data.js → query_service├─ api/main.py      (FastAPI)
                       └─ future agent/tools.py
```

현재 `query_service.py`는 정적 snapshot repository 역할까지 겸한다. 다음 데이터 모델링 단계에서 SQLite/PostgreSQL repository로 교체하더라도 CLI와 API 인터페이스를 크게 바꿀 필요가 없다.

## 3. FastAPI

실행:

```bash
pip install -r requirements.txt
python run.py
uvicorn api.main:app --reload
```

브라우저:

```text
http://127.0.0.1:8000/docs
```

현재 endpoint:

```text
GET  /health
GET  /lots
GET  /lots/{lot_id}
GET  /lots/{lot_id}/decompose
GET  /metrology/monitor
GET  /metrology/tmu
GET  /chambers
GET  /rules
POST /lots/{lot_id}/verify
```

이 endpoint들을 HTTP로 다시 호출하는 것이 Agent의 최종 형태는 아니다. 같은 Python backend 안에서는 Agent tool이 `AttributionQueryService`를 직접 호출하는 편이 단순하고 빠르다. API는 React/외부 client용 인터페이스다.

## 4. 최소 데이터 계약

`domain/models.py`에 Pydantic model을 추가했다.

현재는 API 외부 계약이 분명한 `LotSummary`, `GateCheck`, `VerificationResult`, `HealthResponse`만 먼저 타입으로 고정했다. CSV 전체를 한 번에 ORM으로 옮기지 않은 이유는 schema를 실제 use case 없이 과설계하지 않기 위해서다.

다음 단계에서는 다음 entity부터 SQLite로 이동한다.

```text
lots
adi_measurements
aci_measurements
metrology_monitor
xsem_reference
equipment_events      ← 새로 추가
investigations        ← 새로 추가
investigation_steps   ← 새로 추가
```

특히 `equipment_events`에 PM / Inform / Calibration / Source replacement / Wet clean / Recipe change를 넣어야 Agent가 “무엇을 확인해야 한다”고 말하는 수준에서 “직접 조회해 원인을 좁히는” 수준으로 올라간다.

## 5. Test + CI

```bash
pytest -q
```

현재 확인하는 항목:

- prediction engine이 `ground_truth.csv`를 읽지 않는지
- 두 skill rule copy가 서로 drift하지 않는지
- query service가 320 lot을 정상 로드하는지
- lot decomposition / verification이 동작하는지
- FastAPI health/OpenAPI/404가 정상인지

`.github/workflows/ci.yml`은 push/PR마다 아래를 수행한다.

```text
install → python run.py → pytest
```

## 6. 아직 일부러 하지 않은 것

### SQLite migration
현재 UI와 분석 결과를 먼저 안정화하기 위해 이번 commit에서는 하지 않았다. 다음 sprint에서 repository 계층 아래에 넣는다.

### LLM Agent loop
아직 넣지 않았다. 지금 넣으면 기존 deterministic `if` logic을 LLM으로 다시 실행하는 형식적인 Agent가 되기 쉽다.

먼저 PM/Calibration 같은 “Agent가 추가로 선택해서 조회할 수 있는 데이터”를 만든 뒤 다음 구조로 간다.

```text
Observe lot
   ↓
Decompose CD
   ↓
Choose next evidence
   ├─ dose signature → scanner events / calibration
   ├─ radial signature → track events
   └─ ΔCD signature → metrology → chamber → XSEM
   ↓
Verification Gate
   ↓
Disposition / INDETERMINATE
```

### RAG
숫자형 fab table은 SQL/tool로 조회한다. RAG는 SOP, OCAP, troubleshooting guide, incident narrative 같은 비정형 지식에 붙인다.

## 7. 다음 Sprint

1. SQLite repository
2. `equipment_events.csv` 합성 데이터 생성
3. `get_equipment_events()` tool
4. `investigations` / `investigation_steps` 상태 저장
5. 첫 tool-calling Agent loop
6. tool trace / evidence log
7. SOP·OCAP RAG
8. React console
