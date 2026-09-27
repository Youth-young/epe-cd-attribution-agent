# 데이터 저장 — DB는 언제 필요해지는가

## 결론부터

**데이터가 커져서가 아니라, 쓰기가 생겨서 필요해졌다.**

320 Lot의 판정 결과는 엔진이 결정론적으로 만들어내는 산출물이다. 같은 입력이면
같은 결과가 나오고, 아무도 고치지 않는다. 그런 데이터는 파일로 충분하다.
DB가 필요해진 시점은 **사람의 결정을 기록해야 할 때**였다.

## 두 개의 경로를 섞지 않는다

```
읽기 전용 (엔진 산출물)          쓰기 (사람의 결정)
generator → engine → data.js     POST /lots/{id}/review
              ↓                          ↓
    db/attribution.sqlite          db/reviews.sqlite
    (조회 편의를 위한 적재)          (원본이 여기에만 있음)
```

`attribution.sqlite`는 `data.js`를 옮겨 담은 것이라 언제든 다시 만들 수 있다.
`run.py`를 다시 돌리면 통째로 재생성된다. 반면 `reviews.sqlite`는 **재생성할 수 없다.**
누가 언제 무엇을 승인했는지는 계산으로 복원되지 않는다. 이 차이가 설계의 전부다.

## 스키마

### 읽기 전용 — `db/attribution.sqlite`

| 표 | 내용 | 행 수 |
|---|---|---|
| `lots` | 로트가 지나온 설비와 공정 컨텍스트 | 320 |
| `measurements` | 지표별 측정값·관리 한계·이탈 여부 | 2,720 |
| `dispositions` | 판정·위험도·게이트 통과·미충족 조건·재시도 | 320 |
| `tool_calls` | Agent가 호출한 도구 순서와 재시도 표시 | 1,399 |

이 구조로 파일에서는 어려웠던 질의가 가능해진다.

```sql
-- 이탈 지표가 3개 이상인 Lot
SELECT lot_id, COUNT(*) n FROM measurements WHERE is_ooc=1
GROUP BY lot_id HAVING n>=3 ORDER BY n DESC;

-- 재시도 후에도 사람에게 넘어간 Lot
SELECT lot_id, retries, escalation FROM dispositions WHERE escalation IS NOT NULL;
```

### 쓰기 — `db/reviews.sqlite`

```sql
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lot_id TEXT NOT NULL,
    gate TEXT NOT NULL,              -- G1 / G2 / G3
    decision TEXT NOT NULL,          -- approve / reject / more / accept / signoff
    reviewer TEXT NOT NULL,          -- 익명은 받지 않는다
    comment TEXT,
    verdict_at_review TEXT,          -- 결정 당시의 판정을 함께 얼려 둔다
    created_at TEXT NOT NULL
);
```

세 가지를 의도적으로 정했다.

- **덮어쓰지 않고 쌓는다.** 승인을 번복해도 앞의 결정이 지워지지 않는다. 번복 자체가 이력이다.
- **익명 승인을 받지 않는다.** `reviewer`가 비면 422로 거절한다. 책임자가 없는 승인은 승인이 아니다.
- **결정 당시의 판정을 함께 남긴다.** 나중에 규칙이 바뀌어 판정이 달라져도,
  그 사람이 무엇을 보고 승인했는지는 그대로 남아야 한다.

## API

| 메서드 | 경로 | 호출 주체 |
|---|---|---|
| `POST` | `/lots/{lot_id}/review` | **사람만** — Agent는 이 경로를 호출하지 않는다 |
| `GET` | `/lots/{lot_id}/reviews` | 조회 |
| `GET` | `/reviews/summary` | 게이트별·결정별 집계 |

Agent 도구 목록(`/agent/tools`)에 이 경로는 없다. 승인은 Agent가 스스로 만들어낼 수
있는 것이 아니어야 하므로, 도구 표면에서 아예 제외했다.

## 아직 하지 않은 것

- **동시 편집 제어** — 단일 사용자 데모라 락이 없다. 여러 명이 같은 Lot을 동시에
  결정하는 상황은 다루지 않았다.
- **인증** — `reviewer`를 문자열로 받는다. 실제라면 사내 계정과 묶여야 한다.
- **정적 배포본과의 연결** — Vercel에 올라간 콘솔은 서버가 없어 검토 기록이
  브라우저 `localStorage`에 남는다. DB 경로는 API를 띄웠을 때만 동작한다.
  화면에도 그렇게 적어 두었다.
