# EPE-CD 원인 귀속 에이전트

## 이 저장소에서 지켜야 할 것
- **숫자는 `engine/` 코드만 만든다.** 어떤 값도 추정하거나 암산하지 않는다.
- `validation/ground_truth.csv` 는 평가 전용이다. 판정 경로에서 읽지 않는다.
- 관리 한계는 기준선 구간(생산일 0–9)에서 계산된 값만 쓴다. 손으로 조정하지 않는다.
- 데이터는 합성이다. 문서와 커밋 메시지에서 실제 fab 데이터인 것처럼 쓰지 않는다.

## planner
- 기본은 `deterministic`. `llm`은 명시적으로 지정할 때만 쓴다.
- LLM은 도구 선택과 사유 서술만 한다. **verdict는 언제나 `verify_disposition()`이 정한다.**
- `TOOL_REGISTRY`에 없는 도구는 실행하지 않는다. 거부 기록만 남긴다.

## 스킬
책임 단위로 3분할되어 있다. 호출 순서를 지킨다.
- `cd-signature` — 무엇이 어떤 모양으로 어긋났나. 원인은 지목하지 않는다.
- `cause-attribution` — 그 지문이 어느 모듈의 것인가. 규칙 KB는 여기에만 있다.
- `disposition-report` — 조치 가능한가. 게이트 불충족이면 원인을 지목하지 않는다.

분할 근거는 `docs/04_skill_decomposition.md`. 스킬을 늘리려면 테스트가 먼저 막는다.

## gstack
설치했다면 이 프로젝트에서는 아래 세 개만 쓴다.
- `/review` — GitHub에 올리기 전 코드 검토
- `/qa <배포 URL>` — 실제 브라우저로 배포된 페이지 확인
- `/document-release` — 코드 변경 후 README 동기화

나머지는 이 저장소 규모에 과하다. 컨텍스트만 차지한다.

## 실행
```bash
python run.py     # 데이터 생성 → 분해·귀속 → data.js 갱신
```
