# EPE-CD 원인 귀속 에이전트

> ACI CD 이탈의 원인이 **노광인지, 식각인지, 아니면 계측 자체인지**를
> 좌표계 성분 분해로 귀속하는 AI 에이전트.

**데모** — https://epe-cd-attribution-agent.vercel.app
**상세 보고서** — [`docs/REPORT.md`](docs/REPORT.md)

---

## 한 줄 요약

CD 잔차를 좌표계별 성분으로 분해해 조치 대상 모듈을 정하고,
근거가 부족하면 **판정하지 않는** 에이전트.

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
단면은 파괴적이라 주 3회 5점, 계측 장비 drift는 **golden wafer 재측정**으로 감시.

전체 근거와 등급(measured / literature / assumed)은 [`docs/00_data_basis.md`](docs/00_data_basis.md).

## 구조

```
generator/  물리 성분 합으로 합성 데이터 생성
engine/     분해 · 관리 한계 산출 · 귀속 · Verification Gate  ← 숫자는 전부 여기서
            tools.py — 에이전트가 호출하는 CLI 도구 표면
.claude/skills/epe-attribution/
            SKILL.md + reference/attribution_rules.yaml (점진적 공개)
index.html  판정 결과 뷰어 (순수 HTML/CSS/JS, 프레임워크 없음)
validation/ ground_truth.csv (엔진 미열람) · blind_eval.md
```

**LLM은 단 하나의 숫자도 생성하지 않는다.** 분해·회귀·통계 검정은 전부 결정론적 코드가
수행하고, LLM은 그 결과를 규칙 KB와 대조해 해석한다. 그리고 LLM이 낸 결론이 규칙의
`require` 조건을 만족하는지 코드가 다시 확인한다(Verification Gate).
불충족이면 원인을 지목하지 않고 **판정 보류**로 되돌린다.

## 결과 (블라인드 평가)

`validation/ground_truth.csv`를 읽지 않고 판정한 뒤 대조했다.

| 실제 | 판정 성공 | 비고 |
|---|---|---|
| 정상 204 | 204 | 오경보 0 |
| 노광 dose 16 | 16 | |
| 트랙 반경 32 | 32 | |
| 레티클 18 | 16 | 발생 초기 2건 미검출 |
| 식각 챔버 13* | 13 | *ACI 측정 로트 기준 |
| 계측 drift 11* | 8 | 3건 판정 보류, **식각으로 오귀속 0건** |

가장 중요한 숫자는 마지막 줄이다. **계측 drift를 공정 이상으로 오판해 정상 챔버를
조치하게 만든 사례가 없다.** 보류 3건은 golden wafer 재측정이 주 2회라 신호 발생 첫날
감시 데이터가 2일 이상 묵어 있었고, 그때 엔진이 "계측이 정상이라고 단정할 수 없다"며
판정을 거부한 결과다.

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
python engine/tools.py metrology --tool CDSEM-B --day 36
python engine/tools.py chambers --day 36
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
