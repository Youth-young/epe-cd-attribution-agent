---
name: cause-attribution
description: cd-signature가 찾아낸 이탈 성분을 규칙 KB와 대조해 원인 모듈을 Litho·Etch·Metrology 중 하나로 귀속한다. 계측 장비 자체의 drift도 후보에 포함한다. 원인 분석, 챔버 편중 확인, 계측 정합성 의심, 설비 변경점 대조 요청에 사용한다.
---

# 2단계 · 원인 귀속

## Trigger
- `cd-signature`가 이탈 성분을 1개 이상 반환했을 때
- 특정 로트의 원인 모듈을 물어올 때
- 계측 장비 정합성이 의심될 때

## 책임 범위
**이탈 지문이 어느 모듈의 것인지까지만** 판정한다.
조치 문안 작성과 게이트 실행은 `disposition-report`의 책임이다.

## 절대 규칙
**숫자는 도구만 만든다.** 도구가 돌려주지 않은 수치는 쓰지 않는다.
**상관을 인과로 단정하지 않는다.** 설비 이벤트가 시점상 겹친다는 사실만으로는
원인이 확정되지 않는다. 공정 지식으로 설명되는 후보만 남긴다.

## 도구
```bash
python engine/tools.py rules --signature <SIG>            # 걸린 signature에 해당하는 규칙만
python engine/tools.py metrology --tool <TOOL> --day <D>  # monitor wafer drift 추이
python engine/tools.py tmu --tool <TOOL> --day <D>        # 계측 불확도가 공정 예산의 몇 %인지
python engine/tools.py chambers --day <D>                 # 챔버별 ΔCD 비교
python engine/tools.py events --tool <TOOL> --day <D>     # PM·calibration·부품교체 이력
```

## 판단 기준

**순서가 고정되어 있다.**

1. **되돌릴 수 있는 시점을 먼저 본다.**
   ADI 계열(레티클 → 트랙 반경 → dose)을 먼저 검사한다. rework window가 열려 있는 구간이다.
2. **ΔCD 계열에서는 계측을 가장 먼저 배제한다.**
   `metrology`와 `tmu`를 `chambers`보다 먼저 호출한다.
   자가 틀린 상태에서 공정을 조치하면 정상 설비를 건드리게 된다.
3. **TMU가 공정 허용 예산의 20%를 넘으면 그 장비 측정값을 근거로 공정을 조치하지 않는다.**
4. **규칙 KB는 걸린 signature에 해당하는 것만 읽는다.**
   `reference/attribution_rules.yaml` 전체를 열지 않는다.
5. **변경점 대조는 배제용으로도 쓴다.**
   이상 시작 시점과 일치하는 변경점이 없으면 그 후보를 제외할 근거가 된다.

**Etch vs Metrology를 가르는 기준**

| | Etch 챔버 | Metrology drift |
|---|---|---|
| 챔버 분포 | 특정 챔버에 몰림 | 모든 챔버에 균등 |
| 측정 장비 상관 | 없음 | 특정 장비에서만 |
| monitor wafer | 정상 | 같은 방향으로 이동 |
| 단면 taper | 함께 변함 | 변하지 않음 |

## DoD
- [ ] 원인 후보마다 근거 지표가 최소 1개 매핑되어 있다
- [ ] ΔCD 계열에서 `metrology`·`tmu`를 `chambers`보다 먼저 호출했다
- [ ] TMU 예산 초과 시 공정 원인으로 귀속하지 않았다
- [ ] 설비 이벤트를 단독 근거로 인과를 단정하지 않았다
- [ ] 근거가 부족하면 후보를 좁히지 않고 '판정 보류'로 남겼다

미충족이면 다음 단계로 넘기지 않고 필요한 도구를 다시 호출한다.

## 하지 않는 것
- 근거 없이 원인을 하나로 좁히지 않는다. **보류는 실패가 아니다**
- ACI가 측정되지 않은 로트에서 ΔCD 기반 원인을 추정하지 않는다
- 관리 한계를 임의로 조정하지 않는다
- `validation/ground_truth.csv`를 읽지 않는다. 판정의 의미가 사라진다

## 출력 형식
원인 후보 / 각 후보의 근거 지표 / 배제한 후보와 배제 근거.
