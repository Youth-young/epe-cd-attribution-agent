"""
에이전트가 호출하는 도구 표면.

analyze.py가 계산을 끝내 data.js에 넣어두면, 여기서는 조회만 한다.
숫자를 새로 만들지 않는다 — 그게 이 파일의 존재 이유다.

  python engine/tools.py list --abnormal
  python engine/tools.py lot L0231
  python engine/tools.py decompose L0231
  python engine/tools.py metrology --tool CDSEM-B --day 36
  python engine/tools.py chambers --day 30
  python engine/tools.py rules --signature delta_bias
  python engine/tools.py verify L0231
"""

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = (ROOT / "data.js").read_text(encoding="utf-8")
D = json.loads(RAW[RAW.index("{"):RAW.rstrip().rstrip(";").rindex("}") + 1])
LOTS = {l["lot"]: l for l in D["lots"]}


def out(o):
    print(json.dumps(o, ensure_ascii=False, indent=2))


def need(lot):
    if lot not in LOTS:
        sys.exit(f"없는 로트: {lot}")
    return LOTS[lot]


def cmd_list(a):
    rows = [l for l in D["lots"]
            if (not a.abnormal or l["verdict"] != "NORMAL")
            and (not a.chamber or l["chamber"] == a.chamber)]
    out([dict(lot=l["lot"], date=l["date"], chamber=l["chamber"],
              verdict=l["verdict"], label=l["label"]) for l in rows[:a.n]])


def cmd_lot(a):
    l = need(a.lot)
    out({k: l[k] for k in ("lot", "date", "day", "scanner", "reticle", "chamber",
                           "adiTool", "aciTool", "rf", "adiMean", "aciMean", "m")})


def cmd_decompose(a):
    l = need(a.lot)
    out(dict(lot=l["lot"], metrics=l["m"], centers=D["centers"],
             limits=D["limits"], evidence=l["ev"]))


def cmd_metrology(a):
    rows = [m for m in D["monitor"]
            if (not a.tool or m["tool"] == a.tool)
            and (a.day is None or a.day - 14 <= m["day"] <= a.day)]
    out(dict(limit=D["limits"]["tool_drift"], series=rows,
             note="golden wafer 재측정. 공정이 건드리지 않은 웨이퍼이므로 여기서 움직였다면 계측 원인이다."))


def cmd_chambers(a):
    rows = [c for c in D["chamberSeries"] if a.day - a.window < c["day"] <= a.day]
    agg = {}
    for r in rows:
        s = agg.setdefault(r["chamber"], dict(n=0, sum=0.0))
        s["n"] += r["n"]; s["sum"] += r["dbias"] * r["n"]
    out(dict(window=[a.day - a.window + 1, a.day], limit=D["limits"]["chamber_dev"],
             chambers={k: round(v["sum"] / v["n"], 3) for k, v in sorted(agg.items())}))


def cmd_rules(a):
    """점진적 공개 — 걸린 signature에 해당하는 규칙만 돌려준다."""
    hit = [r for r in D["rules"]
           if not a.signature or a.signature in json.dumps(r, ensure_ascii=False)]
    out(hit if hit else D["rules"])


def cmd_verify(a):
    l = need(a.lot)
    fail = [g["c"] for g in l["gate"] if not g["ok"]]
    out(dict(lot=l["lot"], verdict=l["verdict"], gate=l["gate"],
             passed=not fail, unmet=fail,
             action=l["action"] if not fail else "근거 불충족 — 판정하지 않는다."))


P = argparse.ArgumentParser(description=__doc__)
sub = P.add_subparsers(dest="cmd", required=True)
p = sub.add_parser("list"); p.add_argument("--abnormal", action="store_true")
p.add_argument("--chamber"); p.add_argument("-n", type=int, default=40); p.set_defaults(f=cmd_list)
p = sub.add_parser("lot"); p.add_argument("lot"); p.set_defaults(f=cmd_lot)
p = sub.add_parser("decompose"); p.add_argument("lot"); p.set_defaults(f=cmd_decompose)
p = sub.add_parser("metrology"); p.add_argument("--tool"); p.add_argument("--day", type=int)
p.set_defaults(f=cmd_metrology)
p = sub.add_parser("chambers"); p.add_argument("--day", type=int, required=True)
p.add_argument("--window", type=int, default=5); p.set_defaults(f=cmd_chambers)
p = sub.add_parser("rules"); p.add_argument("--signature"); p.set_defaults(f=cmd_rules)
p = sub.add_parser("verify"); p.add_argument("lot"); p.set_defaults(f=cmd_verify)

if __name__ == "__main__":
    a = P.parse_args()
    a.f(a)
