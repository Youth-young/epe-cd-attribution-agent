---
name: epe-attribution
description: ADI/ACI CD 계측 데이터에서 CD 편차의 원인을 노광·식각·계측 중 하나로 귀속한다. ACI CD 이탈, etch bias drift, 웨이퍼 CD 산포 이상, 계측 장비 정합성 의심 상황에서 사용한다.
---

# EPE-CD 원인 귀속

## 언제 쓰나
ACI CD가 관리 한계를 벗어났거나 ΔCD(=ACI−ADI)가 흐를 때, 조치 대상 모듈을 정한다.

## 절대 규칙
숫자는 `engine/`의 도구만 만든다. 이 문서를 읽는 모델은 값을 추정하거나 보간하지 않는다.
도구가 돌려주지 않은 수치는 답변에 쓰지 않는다.

## 절차
1. `decompose_adi(lot)` — ADI 잔차를 스칼라/반경/슬릿/레티클로 분해
2. ACI가 있으면 `decompose_delta(lot)` — ΔCD의 평균과 반경 성분
3. 한계를 벗어난 지표가 있으면 `reference/attribution_rules.yaml`에서
   **해당 signature에 걸리는 규칙만** 읽는다 (전체를 읽지 않는다)
4. `check_metrology_health(tool, day)`와 `compare_chambers(chamber, day)`로 규칙의
   require 조건을 확인
5. 게이트 통과 시에만 원인을 지목한다. 하나라도 불충족이면 `INDETERMINATE`로
   보류하고 필요한 추가 측정을 요청한다

## 판정 순서
되돌릴 수 있는 시점을 먼저 본다 — ADI 계열(레티클 → 트랙 반경 → dose)을 먼저 검사하고,
그다음 ΔCD 계열을 본다. ΔCD 이상에서는 **golden wafer가 움직였는지를 가장 먼저** 확인한다.
자가 틀린 상태에서 공정을 조치하면 정상 설비를 건드리게 된다.

## 하지 않는 것
- 근거 없이 원인을 하나로 좁히지 않는다. 보류는 실패가 아니다.
- ACI가 측정되지 않은 로트에서 ΔCD를 추정하지 않는다.
- 관리 한계를 임의로 조정하지 않는다. 한계는 기준선 구간에서 계산된 값만 쓴다.
