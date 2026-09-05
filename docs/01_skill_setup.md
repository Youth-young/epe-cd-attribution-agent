# 스킬 구성

## 무엇을 넣었고, 무엇을 넣지 않았나

이 프로젝트는 "에이전트가 얼마나 많은 도구를 갖고 있는가"가 아니라
**"판정에 필요한 것만 정확히 읽히는가"**를 보이려는 것이다.
그래서 스킬 선택 기준은 하나였다 — 4일짜리 작업에서 실제로 쓰는가.

### 넣은 것 1: 직접 만든 프로젝트 스킬
```
.claude/skills/epe-attribution/
├── SKILL.md                          절차 · 도구 목록 · 금지사항 (짧게)
└── reference/attribution_rules.yaml  규칙 6종 (필요할 때만)
```
`SKILL.md`에는 절차만 두고, 상세 판정 기준은 `reference/`에 뒀다.
에이전트는 `tools.py rules --signature <지표>`로 **걸린 signature에 해당하는 규칙만**
가져온다. 규칙 전체를 매번 컨텍스트에 밀어 넣지 않는다. 이것이 점진적 공개다.

도구는 실제로 실행 가능한 CLI다. 프롬프트가 아니라 프로세스다.
```bash
python engine/tools.py decompose L0283
python engine/tools.py metrology --tool CDSEM-B --day 36
python engine/tools.py verify L0283
```

### 넣은 것 2: gstack 중 세 개
YC 대표 Garry Tan이 공개한 Claude Code 워크플로 모음. 23개 도구가 들어 있다.
전부 쓰지 않고 세 개만 골랐다.

| 스킬 | 어디에 쓰나 | 왜 골랐나 |
|---|---|---|
| `/review` | Day 2·3, 커밋 전 | 저장소를 면접관이 읽는다. 코드 품질이 곧 인상 |
| `/qa <URL>` | Day 4, 배포 직후 | 실제 브라우저로 배포 페이지를 눌러본다. "웹은 어떻게 검증했나"에 대한 답 |
| `/document-release` | Day 4, 마무리 | 코드가 바뀌면 README가 어긋난다. 자동으로 맞춘다 |

### 넣지 않은 것과 그 이유
나머지 20개는 이 저장소 규모에 과하다. 특히 `/office-hours`, `/plan-ceo-review`,
`/design-shotgun`, `/cso`, iOS 계열은 제품 스타트업용이며 여기서는 컨텍스트만 차지한다.

**이건 취향 문제가 아니라 성능 문제다.** 스킬을 많이 깔면 세션 시작마다 모든
스킬 설명이 컨텍스트에 올라가고, 한도를 넘으면 일부가 조용히 누락된다.
gstack 자체도 이 문제를 인지하고 있어서, 설치된 스킬 트리가 토큰을 얼마나
먹는지 감사하는 `gstack-context-bill` 도구를 함께 제공한다.
넣을수록 좋아지는 구조가 아니라는 뜻이다.

에이전트를 만들면서 배운 것이 정확히 이것이다.
**컨텍스트를 통제하는 것이 곧 판정 품질이다.**

## 설치

### gstack (Claude Code에 붙여넣기)
> Install gstack: run `git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`

필요 조건: Claude Code, Git, Bun v1.0+ (Windows는 Node.js 추가).
설치 후 `/review`가 뜨는지만 확인하면 된다.

### 프로젝트 스킬
별도 설치 없음. `.claude/skills/` 는 저장소에 포함되어 있으므로,
이 폴더에서 Claude Code를 열면 자동으로 인식된다.

```bash
cd epe-cd-attribution-agent
claude
```
그리고 이렇게 부른다.
> L0283 로트 판정해줘

## 확인 방법
스킬이 제대로 물렸다면 에이전트는 `tools.py`를 호출하고, 그 출력만으로 답한다.
숫자를 지어내면 `SKILL.md`의 절대 규칙을 어긴 것이다 — 그 자체가 테스트다.
