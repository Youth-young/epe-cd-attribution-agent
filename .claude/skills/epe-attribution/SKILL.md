---
name: epe-attribution
description: ADI/ACI CD 계측 데이터에서 CD 편차의 원인을 노광·식각·계측 중 하나로 귀속한다. ACI CD 이탈, etch bias drift, 웨이퍼 CD 산포 이상, 계측 장비 정합성 의심, 특정 로트의 원인 분석 요청에 사용한다.
---

# EPE-CD 원인 귀속

## 언제 쓰나
ACI CD가 관리 한계를 벗어났거나 ΔCD(=ACI−ADI)가 흐를 때, 조치 대상 모듈을 정한다.

## 절대 규칙
**숫자는 `engine/tools.py`만 만든다.** 이 문서를 읽는 모델은 값을 추정·보간·암산하지 않는다.
도구가 돌려주지 않은 수치는 답변에 쓰지 않는다. 도구 출력이 없으면 "확인 불가"라고 답한다.

## 도구
```bash
python engine/tools.py list --abnormal            # 이상 판정 로트 목록
python engine/tools.py lot <LOT>                  # 로트 컨텍스트 + 지표
python engine/tools.py decompose <LOT>            # 좌표계별 성분 분해와 관리 한계
python engine/tools.py metrology --tool <TOOL> --day <D>   # golden wafer drift 추이
python engine/tools.py chambers --day <D>         # 챔버별 ΔCD 비교
python engine/tools.py rules --signature <SIG>    # 걸린 signature에 해당하는 규칙만
python engine/tools.py verify <LOT>               # 게이트 통과 여부
```

## 절차
1. `decompose <LOT>` — 어떤 성분이 관리 한계를 벗어났는지 본다
2. 벗어난 지표 이름으로 `rules --signature <지표>` — **해당 규칙만** 읽는다.
   `reference/attribution_rules.yaml` 전체를 열지 않는다
3. 규칙의 `require` 조건을 도구로 확인한다
   - ΔCD 계열이면 **`metrology` 를 먼저** 부른다
   - 그다음 `chambers`
4. `verify <LOT>` — 게이트 결과를 확인한다
5. 게이트를 통과했을 때만 원인을 지목한다. 불충족이면 보류하고 필요한 추가 측정을 말한다

## 판정 순서
되돌릴 수 있는 시점을 먼저 본다 — ADI 계열(레티클 → 트랙 반경 → dose)을 먼저 검사하고,
그다음 ΔCD 계열을 본다. ΔCD 이상에서는 **golden wafer가 움직였는지를 가장 먼저** 확인한다.
자가 틀린 상태에서 공정을 조치하면 정상 설비를 건드리게 된다.

## 하지 않는 것
- 근거 없이 원인을 하나로 좁히지 않는다. 보류는 실패가 아니다
- ACI가 측정되지 않은 로트에서 ΔCD를 추정하지 않는다
- 관리 한계를 임의로 조정하지 않는다. 기준선 구간에서 계산된 값만 쓴다
- `validation/ground_truth.csv` 를 읽지 않는다. 판정의 의미가 사라진다

## 보고 형식
판정 / 조치 대상 모듈 / 근거 3줄 / 다음 확인 사항. 그 이상 길게 쓰지 않는다.
