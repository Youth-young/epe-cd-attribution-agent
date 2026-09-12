# EPE-CD 원인 귀속 에이전트

> ACI CD excursion의 원인이 **Litho인지, Etch인지, 아니면 Metrology인지**를
> 좌표계 성분 분해로 귀속하고, 계측 불확도가 공정 예산을 넘으면 조치를 차단하는 AI 에이전트.

**데모** — https://epe-cd-attribution-agent.vercel.app
**상세 보고서** — [`docs/REPORT.md`](docs/REPORT.md)

---

## 한 줄 요약

CD 잔차를 좌표계별 성분으로 분해해 조치 대상 모듈을 정하고,
근거가 부족하면 **판정하지 않는** 에이전트.

## 산업 지표 위에서의 위치

| 축 | 업계 지표 | 이 에이전트의 기여 |
|---|---|---|
| Accuracy | Overlay · Local CDU · EPE | on-product CD 오차를 **공정 기여와 계측 기여로 분해** |
| Patterning Yield | rework · cycle time | ADI 시점 판정으로 **rework window 확보** |
| 계측 신뢰성 | **TMU / 공정 예산** | 20% 초과 시 **그 장비 근거의 공정 조치를 차단** |

노광 장비에는 모니터 웨이퍼로 스캐너가 기준선에서 얼마나 벗어났는지 판단하는 안정성 모듈이 있다.
이 프로젝트는 **같은 논리를 계측 장비에 적용한다.** 감시 대상이 스캐너가 아니라 CD-SEM이고,
출력이 보정값이 아니라 원인 귀속과 조치 보류 판정이다.

계측 drift와 공정 drift를 가르는 개념 자체는 2000년대 초 특허에 이미 있다. 이 프로젝트가 더한 것은
**좌표계 성분 분해와의 결합**, **Setting값과 Sensor 실측값의 분리**,
**근거 부족 시 판정을 거부하는 게이트** 세 가지다.

## 왜 만들었나

미세화가 진행될수록 EPE(Edge Placement Error = Overlay + CD variation) 예산이 줄어
"조금 틀린 것"이 곧 fail이 된다. ADI(현상 후)는 rework가 가능하고 ACI(식각 후)는
불가역이므로 **원인 판정이 늦어지는 만큼 손실이 확정된다.**

계측 정합성 실습에서 ADI/ACI/단면 CD를 회귀로 이어 Target을 잡아보며, 같은 웨이퍼의
CD가 측정 단계마다 다르고 그 관계를 세워야 비로소 제어 가능한 숫자가 된다는 것을 알았다.
그렇다면 ACI가 흔들렸을 때 노광 탓인지 식각 탓인지는 누가 판정하는가 — 여기서 시작했다.

## 핵심 아이디어

CD 잔차는 성분의 합이고, **각 성분은 서로 다른 좌표계에 산다.**

| 성분 | 사는 좌표계 | 귀속 |
|---|---|---|
| dose | 웨이퍼 스칼라 | 노광 |
| PEB / 코팅 | 웨이퍼 반경 | 트랙 |
| 슬릿 지문 | field 내 X | 스캐너 |
| 마스크 오차 | site 고정 반복 | 레티클 |
| 플라즈마 균일도 | 웨이퍼 반경 + 챔버 | 식각 |
| 장비 offset | **좌표계 없음** | 계측 |

계측 기여는 업계 표준 지표 **TMU**(Total Measurement Uncertainty)로 정량화한다.
오버레이 정의는 TIS-mean, TIS-3σ, dynamic precision, tool-to-tool match의 RSS이지만,
TIS는 0°/180° 회전으로 정의되는 오버레이 전용 항이라 CD-SEM에는 해당되지 않는다.
그래서 여기서는 `TMU = RSS(dynamic precision 3σ, tool-to-tool match)` 두 항만 쓰고,
생략한 항은 한계로 명시한다. 판정 기준은 **공정 허용 반폭 ±6.0 nm의 20% 이내**다.

마지막 행이 이 프로젝트의 이유다. 계측 drift는 어느 좌표계에도 살지 않는다.
그래서 원시 데이터만 보면 식각 이상과 구분되지 않고, 잘못 판정하면
**정상 챔버의 recipe를 건드리는 오조치**가 발생한다.

## 데이터

실제 fab 데이터가 아니다. 계측 정합성 실습(3-way CD split)의 회귀 결과를 앵커로,
현업 계측 구조를 본떠 **성분 합으로 생성한 합성 데이터**다.

| 앵커 (실측) | 값 |
|---|---|
| ADI CD Target | 130 nm |
| ACI CD Target | 110 nm |
| 단면(VSEM) BCD Target | 90 nm |
| etch bias (ACI − ADI) | −20 nm |
| ADI→VSEM 회귀 | 기울기 1.0, 절편 −40 nm |
| ACI→VSEM 회귀 | 기울기 1.0, 절편 −20 nm |

현업 계측 구조를 반영한 부분 — 웨이퍼 전면 CD 맵은 존재하지 않으므로 9 field × 5 site
= **41점 샘플링**, ADI는 로트당 3장(slot 3/13/23)·**ACI는 절반의 로트만 1장**,
단면은 파괴적이라 제한적으로 측정하고, 계측 장비 drift는 **monitor wafer 재측정**으로 감시.

전체 근거와 등급(measured / literature / assumed)은 [`docs/00_data_basis.md`](docs/00_data_basis.md).

## 구조

```
generator/  물리 성분 합으로 합성 데이터 생성
engine/     분해 · 관리 한계 산출 · 귀속 · Verification Gate  ← 숫자는 전부 여기서
            tools.py — 에이전트가 호출하는 CLI 도구 표면
.claude/skills/epe-attribution/
            SKILL.md + reference/attribution_rules.yaml (점진적 공개)
index.html  판정 결과 뷰어 (순수 HTML/CSS/JS, 프레임워크 없음)
            개요·용어·로트 판정·추이와 감시·검증 5개 화면으로 분리
            전문 용어는 마우스를 올리면 그림과 함께 설명이 뜬다
validation/ ground_truth.csv (엔진 미열람) · evaluate.py · blind_eval.md
api/        FastAPI 서비스 인터페이스 (`/docs` 자동 문서)
domain/     Pydantic 기반 최소 데이터 계약
tests/      engine 격리 · service · API 회귀 테스트
```

**LLM은 단 하나의 숫자도 생성하지 않는다.** 분해·회귀·통계 검정은 전부 결정론적 코드가
수행하고, LLM은 그 결과를 규칙 KB와 대조해 해석한다. 그리고 LLM이 낸 결론이 규칙의
`require` 조건을 만족하는지 코드가 다시 확인한다(Verification Gate).
불충족이면 원인을 지목하지 않고 **판정 보류**로 되돌린다.

## 결과 (블라인드 평가)

`engine/analyze.py`는 `validation/ground_truth.csv`를 전혀 읽지 않는다. 판정 snapshot인 `data.js`가 생성된 뒤, 별도 `validation/evaluate.py`가 ground truth를 읽어 대조한다.

| 실제 | 판정 성공 | 비고 |
|---|---|---|
| 정상 204 | 204 | 오경보 0 |
| 노광 dose 16 | 16 | |
| 트랙 반경 32 | 32 | |
| 레티클 18 | 16 | 발생 초기 2건 미검출 |
| 식각 챔버 13* | 13 | *ACI 측정 로트 기준 |
| 계측 drift 11* | 8 | 3건 판정 보류, **식각으로 오귀속 0건** |

가장 중요한 숫자는 마지막 줄이다. **계측 drift를 공정 이상으로 오판해 정상 챔버를
조치하게 만든 사례가 없다.** 보류 3건은 monitor wafer 재측정이 주 2회라 신호 발생 첫날
감시 데이터가 2일 이상 묵어 있었고, 그때 엔진이 "계측이 정상이라고 단정할 수 없다"며
판정을 거부한 결과다.

## 계측 불확도(TMU)를 판정 대상으로

계측 기여를 업계 표준 지표로 정량화하고, 그 결과를 판정 게이트에 연결했다.

```
TMU = RSS(dynamic precision 3σ, tool-to-tool match)
소비율 = TMU / 공정 허용 반폭 T (±6.0 nm)     판정 기준 20% 이내
```

| 구간 | precision | match | TMU | 예산 소비율 |
|---|---|---|---|---|
| 기준선 (0–9일) | 0.8~1.1 nm | 0.3~0.4 nm | ≈1.0 nm | **14.7~19.1%** (초과 0일) |
| 계측 drift (34–39일) | 0.9 nm | 최대 3.3 nm | 최대 3.5 nm | **28.5~57.8%** |

`ETCH_CHAMBER` 규칙의 `require`에 `tmu_within_budget`이 들어 있다.
계측 불확도가 예산을 넘은 상태에서는 챔버 편중이 보여도 공정 원인으로 귀속하지 않는다.

정상 구간에서도 소비율이 15~19%로 예산 경계에 붙어 있다는 점이 이 데이터가 보여주는
구조적 사실이다. precision 항 하나만으로 예산의 약 4분의 3을 쓰기 때문이다.

## 산업적 위치

ASML Holistic Lithography의 가치 축(Resolution × Productivity × **Accuracy** ×
Patterning Yield) 중 **Accuracy 칸의 Local CDU / EPE-CD 성분**에 해당한다.
ASML 자신의 on-product 오버레이 error budget 목록에 `metrology accuracy`가
한 항목으로 들어 있다는 점이 이 프로젝트의 존재 근거다.

논리 구조상 가장 가까운 실물은 ASML **Baseliner**다. monitor wafer로 baseline drift를
판단하는 방식이 같고, 감시 대상만 다르다 — Baseliner는 스캐너를, 이 프로젝트는 계측 장비를 본다.

> **한 줄 포지셔닝** — On-product CD accuracy budget attribution:
> 오차 기여를 Litho / Etch / Metrology에 귀속하고, 계측 기여가 예산을 넘으면
> APC 보정을 차단하는 게이트.

자세한 근거는 [`docs/REPORT.md`](docs/REPORT.md) §6.5.

## 기존 제품 지형에서의 위치

원인 귀속 기능 자체는 상용 스택이 이미 덮고 있다. 새로운 발명이 아니다.

| 계층 | 대표 도구 | 용의선상 |
|---|---|---|
| 설계 · 개발 | PROLITH, LithoWare | — |
| 장비 감시 | FDC | 공정 장비 |
| 공정 제어 | APC · R2R | 공정 장비 |
| 수율 분석 | Klarity, Yield Mine | 공정 장비 |
| 패터닝 제어 | OVALiS | 스캐너 · 공정 |
| 스캐너 안정성 | Baseliner | 스캐너 |
| **이 프로젝트** | — | 공정 장비 **+ 계측 장비** |

PROLITH는 노광 **전**에 조건에서 CD를 예측해 process window를 정의하는 forward 시뮬레이터다.
이 프로젝트는 양산 데이터에서 CD로부터 원인을 역추적하는 inverse 문제다. 방향이 반대다.

남는 차이는 하나다. 위 도구들은 공정 장비를 용의선상에 올리고 **측정값은 참으로 둔다.**
여기서는 측정한 장비를 같은 선상에 올리고, TMU가 공정 예산의 20%를 넘으면
**공정 귀속을 차단한다.** 조치를 내리는 것이 아니라 막는 것이 출력에 포함된다.

자세한 근거는 [`docs/REPORT.md`](docs/REPORT.md) §6.6.

## 사용한 스킬

| 스킬 | 출처 | 어디에 |
|---|---|---|
| `epe-attribution` | 직접 작성 | 로트 판정 — SKILL.md + 규칙 KB + CLI 도구 6종 |
| `/review` | gstack | 커밋 전 코드 검토 |
| `/qa` | gstack | 배포 후 실제 브라우저 검증 |
| `/document-release` | gstack | 코드 변경 후 문서 동기화 |

gstack 23개 중 3개만 설치했다. 스킬을 많이 깔면 세션마다 모든 설명이 컨텍스트에 올라가
한도를 넘으면 일부가 조용히 누락된다. **컨텍스트를 통제하는 것이 곧 판정 품질이다.**
선택 근거는 [`docs/01_skill_setup.md`](docs/01_skill_setup.md).


## FastAPI 서비스 인터페이스

정적 뷰어와 별도로 동일한 판정 snapshot을 사용하는 API가 있다. CLI와 API가 `engine/query_service.py`를 공유하므로 향후 Agent tool도 같은 domain service를 재사용할 수 있다.

```bash
pip install -r requirements.txt
python run.py
uvicorn api.main:app --reload
```

브라우저에서 `http://127.0.0.1:8000/docs`를 열면 OpenAPI 문서와 현재 tool surface를 확인할 수 있다. 상세 구조는 [`docs/02_agent_ready_refactor.md`](docs/02_agent_ready_refactor.md).

## 배포 후 QA

`/qa`로 배포된 URL을 실제 브라우저에서 검증했다.

- **Health score 97 → 100**, 발견 3건 / 수정 1건 / 보류 2건
- **High**: 320개 로트 목록(앱의 핵심 조작부)이 키보드·스크린리더로 완전히 접근 불가능했다.
  `role="listbox"`/`"option"`, `tabindex="0"`, Enter/Space 활성화를 추가하고,
  리렌더링 후 포커스를 복원하되 **페이지 최초 로드 시의 자동 선택이 포커스를 가로채지 않도록**
  조건을 분리했다. 로컬 검증 후 push, 배포된 URL에서 동일 시나리오 재검증 완료 (`0802d41`).

전체 리포트: `.gstack/qa-reports/`

## 한계

1. **합성 데이터다.** 성분을 선형 가산으로 가정했고 dose–focus 상호작용 같은 결합항이 없다.
2. **단일 원인만 판정한다.** 복합 원인의 판정력은 이 데이터로 검증할 수 없다.
3. **원인 귀속까지이고 근본 원인은 아니다.** 식각으로 귀속돼도 챔버 컨디션인지 부품 열화인지는
   설비 센서 데이터가 필요하다.
4. **EPE 중 CD 성분만 다뤘다.** 프로파일 비대칭이 회절 기반 오버레이 측정에 주는 bias 같은
   상호작용은 범위 밖이다.
5. **가장 확신이 없는 것은 주입 신호의 크기다.** 현업 담당자의 검토를 받지 못했다.
6. **TMU에서 TIS 항을 생략했다.** CD-SEM에는 회전 기반 TIS가 정의되지 않아 제외했지만,
   실제 CD 측정에도 charging·shrink 같은 계통 오차가 있어 두 항만으로는 불완전하다.
7. **공정 허용 반폭 ±6.0 nm는 가정이다.** 웨이퍼 내 CDU 3σ에서 Cp≈1.43이 되도록 역산한 값이며,
   실제 스펙은 layer와 제품이 정한다.

## 이 데이터에서 나온 결론 하나

정상 구간에서도 TMU가 공정 예산의 15~19%를 소비한다. precision 항(3σ 0.9 nm) 하나만으로
예산의 약 4분의 3을 쓰고 있어 여유가 거의 없고, tool matching이 조금만 흔들리면 예산을 넘는다.
실제로 계측 drift 구간에서 match 항이 0.3 → 3.3 nm로 커지자 소비율이 58%까지 올랐다.
**계측 정밀도를 높이거나 공정 허용폭을 넓히지 않으면 이 구조는 반복된다.**

## 개선 방향

실측 로트로 잔차 구조를 재추정하고, 성분 기여도를 확률로 배분해 복합 원인을 다루는 것.
확장의 가장 큰 장벽은 알고리즘이 아니라 Photo·Etch·Metrology의 데이터 스키마가 다르다는
조직 문제라고 본다. 그래서 장비사 관점에서는 자사 장비 데이터부터 시작하는 것이 현실적이다.

## 실행

```bash
pip install -r requirements.txt
python run.py            # 데이터 생성 → 분해·귀속 → data.js 갱신
```

`index.html`을 열면 바로 뜬다. 이 폴더를 그대로 Vercel에 올리면 배포된다.

에이전트 도구를 직접 호출하려면:

```bash
python engine/tools.py list --abnormal
python engine/tools.py decompose L0283
python engine/tools.py metrology --tool CDSEM-B --day 36   # monitor wafer drift
python engine/tools.py tmu --tool CDSEM-B --day 36         # TMU / 공정 예산 소비율
python engine/tools.py chambers --day 36
python engine/tools.py tmu --day 36
python engine/tools.py verify L0283
```

Claude Code를 이 폴더에서 실행하면 `.claude/skills/epe-attribution`이 자동 인식된다.

```
L0283 로트 판정해줘
```

## 기술 스택

Python (numpy, pandas, PyYAML) · 순수 HTML/CSS/JavaScript · Vercel · Git

프레임워크를 쓰지 않았다. 웨이퍼 맵과 차트는 SVG를 직접 그린다.
설명할 수 없는 부분을 만들지 않기 위한 선택이다.

## 화면 구성

포트폴리오는 현직 엔지니어만 보는 것이 아니다. 그래서 뷰어는 **배경 지식이 없는 사람이
먼저 이해하고, 그다음 숫자를 볼 수 있도록** 구성했다.

- **한 화면에 한 가지만** — 개요 / 용어 / 로트 판정 / 추이와 감시 / 검증 결과를 화면으로 분리했다.
  긴 스크롤로 전부 늘어놓지 않는다.
- **용어 설명이 그 자리에 뜬다** — 노광·식각·CD·ADI·ACI 등 20개 용어에 점선 밑줄이 있고,
  마우스를 올리면(모바일은 탭) 한 문단 설명과 그림이 나온다. 용어 화면에 같은 내용이 사전 형태로도 있다.
- **로트를 고르면 그 로트만 보인다** — 목록에서 하나를 선택하면 상세 화면으로 전환되고,
  웨이퍼 지도·근거 숫자·게이트는 아코디언으로 한 번에 하나씩만 열린다.
- **웨이퍼 지도의 점을 누르면** 그 지점의 실측 선폭, 목표 대비 편차, 노광 영역 좌표,
  웨이퍼 중심으로부터의 거리가 나온다.
- **차트에 축과 단위가 있다** — 생산일(x)과 nm(y), 관리 한계를 회색 띠로 표시하고,
  점을 누르면 해당 로트 판정으로 이동한다.
- **모바일 대응** — 단일 열로 재배치되고 터치로 모든 설명을 열 수 있다.

## v0.3 Agent Investigation Tools

Agent가 단순히 “PM/Calibration을 확인하세요”라고 말하는 데서 끝나지 않도록 structured equipment history와 callable tool surface를 추가했다.

- `data/equipment_events.csv`: PM / calibration / component change / qualification / monitor alert
- `GET /equipment/events`: 장비 이력 조회
- `GET /agent/tools`: Agent tool catalog
- `POST /lots/{lot_id}/investigate`: tool-call trace를 포함한 첫 investigation orchestrator
- 최종 disposition은 기존 deterministic verification gate가 제한

상세 설계는 `docs/03_agent_investigation_v03.md` 참조.
