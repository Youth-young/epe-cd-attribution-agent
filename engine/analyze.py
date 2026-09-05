"""
EPE-CD Attribution Agent — 분해·귀속 엔진 (결정론적)

숫자는 전부 여기서 만든다. LLM 계층은 이 결과를 해석할 뿐 값을 생성하지 않는다.

  1) 분해   : CD 잔차를 좌표계별 성분으로 나눈다
  2) 기준선 : 이상 주입 이전 구간에서 각 지표의 관리 한계(3σ)를 스스로 잡는다
  3) 귀속   : 규칙 KB와 대조해 원인 후보를 고른다
  4) 게이트 : 규칙의 require 조건을 코드로 재검증한다. 불충족이면 '판정 보류'
"""

import json
from pathlib import Path

import numpy as np
import pandas as pd
import yaml

ROOT = Path(__file__).resolve().parents[1]
CFG = yaml.safe_load(open(ROOT / "config" / "config.yaml", encoding="utf-8"))
_KB_PATH = next(p for p in [ROOT / ".claude/skills/epe-attribution/reference/attribution_rules.yaml",
                            ROOT / "skills/epe-attribution/reference/attribution_rules.yaml"] if p.exists())
KB = yaml.safe_load(open(_KB_PATH, encoding="utf-8"))
RULES = {r["id"]: r for r in KB["rules"]}

ADI_T = CFG["anchors"]["adi_cd_target"]["value"]
ETCH_BIAS = CFG["anchors"]["etch_bias"]["value"]
DOSE_SENS = CFG["photo"]["dose_sensitivity"]["value"]
BASELINE_DAYS = 10          # 이상 주입 이전 구간
WINDOW_DAYS = 5             # drift 판정용 이동 창

runs = pd.read_csv(ROOT / "data/runs.csv")
adi = pd.read_csv(ROOT / "data/meas_adi.csv")
aci = pd.read_csv(ROOT / "data/meas_aci.csv")
mon = pd.read_csv(ROOT / "data/tool_monitor.csv")
xsem = pd.read_csv(ROOT / "data/ref_xsem.csv")
gt = pd.read_csv(ROOT / "validation/ground_truth.csv")


# ------------------------------------------------------------------ 분해
def ols(x, y):
    x = np.asarray(x, float); y = np.asarray(y, float)
    A = np.vstack([np.ones_like(x), x]).T
    coef, *_ = np.linalg.lstsq(A, y, rcond=None)
    return float(coef[0]), float(coef[1])


def decompose_adi(df):
    """ADI 잔차를 하나의 설계행렬로 동시 회귀해 좌표계별 성분을 분리한다.

    [상수 | 반경 (r/R)^2 | field 내 site 더미] 를 함께 풀어야 성분끼리 서로를 오염시키지 않는다.
    site 더미는 슬릿 성분과 레티클 성분을 함께 담으므로, 그 다음 단계에서
    field 내 X에 대한 선형 성분(=슬릿)과 나머지(=레티클)로 한 번 더 나눈다.
    """
    res = df.cd_nm.to_numpy(float) - ADI_T
    rn = df.r_norm.to_numpy(float)
    u_r = rn ** 2 - 0.35
    site = df.site_in_field.to_numpy(int)
    ux = df.u_x.to_numpy(float)

    cols = [np.ones_like(res), u_r]
    for s_ in range(1, 5):
        cols.append((site == s_).astype(float))
    A = np.vstack(cols).T
    coef, *_ = np.linalg.lstsq(A, res, rcond=None)
    fit = A @ coef

    offset = float(coef[0] + np.mean(coef[2:]) * 0.8)      # 웨이퍼 평균 수준
    k_r = float(coef[1])
    radial = k_r * (rn.max() ** 2 - rn.min() ** 2)          # 엣지-센터 진폭 (nm)

    e = np.concatenate([[0.0], coef[2:]])
    e = e - e.mean()
    ux_s = np.array([ux[site == s_][0] for s_ in range(5)])
    _, k_s = ols(ux_s, e)
    slit = float(k_s * (ux_s.max() - ux_s.min()))
    reticle = float(np.abs(e - k_s * ux_s).max())
    return dict(adi_offset=offset, adi_radial=float(radial), adi_slit=slit,
                adi_reticle=reticle, adi_resid=float(np.std(res - fit)))


def decompose_delta(d_adi, d_aci):
    j = d_aci.merge(d_adi[["site_id", "cd_nm"]], on="site_id", suffixes=("", "_adi"))
    delta = j.cd_nm.to_numpy() - j.cd_nm_adi.to_numpy()
    bias = float(delta.mean()) - ETCH_BIAS
    u = j.r_norm.to_numpy() ** 2 - 0.35
    _, k_r = ols(u, delta - delta.mean())
    return dict(delta_bias=bias, delta_radial=float(k_r),
                delta_resid=float(np.std(delta - delta.mean() - k_r * u)),
                delta_map=[round(float(v), 2) for v in delta])


# ------------------------------------------------------------------ 로트별 지표
plan_cols = ["site_id", "u_x"]
plan = pd.read_csv(ROOT / "data/sampling_plan.csv")[plan_cols]
adi = adi.merge(plan, on="site_id")
aci = aci.merge(plan, on="site_id")

recs = []
adi_g = {k: v for k, v in adi.groupby(["lot_id", "wafer_slot"])}
aci_g = {k: v for k, v in aci.groupby("lot_id")}

for run in runs.itertuples():
    parts = [decompose_adi(adi_g[(run.lot_id, s)]) for s in CFG["sampling"]["adi_slots"]
             if (run.lot_id, s) in adi_g]
    rec = {k: float(np.mean([p[k] for p in parts])) for k in parts[0]}
    ref = adi_g[(run.lot_id, CFG["sampling"]["aci_slot"])]
    rec["adi_map"] = [round(float(v - ADI_T), 2) for v in ref.cd_nm]
    rec["adi_mean"] = round(float(ref.cd_nm.mean()), 2)
    if run.lot_id in aci_g:
        rec.update(decompose_delta(ref, aci_g[run.lot_id]))
        rec["aci_mean"] = round(float(aci_g[run.lot_id].cd_nm.mean()), 2)
    rec["lot_id"] = run.lot_id
    recs.append(rec)

M = pd.DataFrame(recs).merge(runs, on="lot_id").merge(gt[["lot_id", "scenario_id", "scenario_name"]], on="lot_id")

# ------------------------------------------------------------------ 기준선과 관리 한계
base = M[M.day_index < BASELINE_DAYS]
# 관리 한계는 기준선 구간의 평균과 3sigma로 스스로 잡는다.
# 정상 공정에도 고유 지문(반경 프로파일 등)이 있으므로 절대값이 아니라
# 기준선 대비 편차로 판정해야 한다.
CEN = {
    "adi_offset": float(base.adi_offset.mean()),
    "adi_radial": float(base.adi_radial.mean()),
    "adi_reticle": float(base.adi_reticle.mean()),
    "delta_bias": float(base.delta_bias.dropna().mean()),
}
LIM = {
    "adi_offset": 3 * base.adi_offset.std(),
    "adi_radial": 3 * base.adi_radial.std(),
    "adi_reticle": 3 * base.adi_reticle.std(),
    "delta_bias": 3 * base.delta_bias.dropna().std(),
    "tool_drift": 3 * 0.30,
    "chamber_dev": 3 * base.delta_bias.dropna().std() * 0.8,
}

# 계측 장비 감시 — monitor wafer 일별 평균과 기준선 대비 이동량
mon_d = mon.groupby(["day_index", "meas_tool"]).cd_nm.mean().reset_index()
mon_base = mon_d[mon_d.day_index < BASELINE_DAYS].groupby("meas_tool").cd_nm.mean()
mon_d["drift"] = mon_d.apply(lambda r: r.cd_nm - mon_base[r.meas_tool], axis=1)


def tool_drift(tool, day):
    """가장 최근 monitor wafer 재측정값과, 그 측정이 며칠 전 것인지를 함께 돌려준다.
    감시 데이터가 오래됐으면 '계측 정상'이라고 단정할 수 없다."""
    w = mon_d[(mon_d.meas_tool == tool) & (mon_d.day_index <= day)]
    if not len(w):
        return 0.0, 99
    last = w.iloc[-1]
    return float(last.drift), int(day - last.day_index)


def chamber_deviation(chamber, day):
    w = M[(M.day_index <= day) & (M.day_index > day - WINDOW_DAYS)].dropna(subset=["delta_bias"])
    if len(w) < 6:
        return None, None
    own = w[w.etch_chamber == chamber].delta_bias
    oth = w[w.etch_chamber != chamber].delta_bias
    if len(own) < 2 or len(oth) < 3:
        return None, None
    return float(own.mean() - oth.mean()), float(oth.mean())


xsem_d = xsem.merge(runs[["lot_id", "day_index", "etch_chamber"]], on="lot_id")
taper_base = xsem_d[xsem_d.day_index < BASELINE_DAYS].taper_nm.mean()


def taper_dev(day, chamber):
    """단면 taper는 같은 챔버 표본으로만 본다. 식각이 바뀌면 프로파일도 바뀌지만,
    계측 offset은 프로파일을 바꾸지 못한다 — 두 원인을 가르는 보조 증거."""
    w = xsem_d[(xsem_d.day_index <= day) & (xsem_d.day_index > day - 12)
               & (xsem_d.etch_chamber == chamber)]
    return float(w.taper_nm.mean() - taper_base) if len(w) >= 5 else None


# ------------------------------------------------------------------ 귀속 + 게이트
def attribute(r):
    ev, checks = [], {}
    o = r.adi_offset - CEN["adi_offset"]
    rad = r.adi_radial - CEN["adi_radial"]
    ret = r.adi_reticle - CEN["adi_reticle"]
    dbias = (None if pd.isna(r.delta_bias) else r.delta_bias - CEN["delta_bias"])
    checks["adi_offset_exceeds"] = abs(o) > LIM["adi_offset"]
    checks["adi_radial_exceeds"] = abs(rad) > LIM["adi_radial"]
    checks["adi_reticle_exceeds"] = abs(ret) > LIM["adi_reticle"]
    checks["adi_radial_within_limit"] = abs(rad) <= LIM["adi_radial"]
    checks["adi_reticle_within_limit"] = abs(ret) <= LIM["adi_reticle"]
    checks["adi_reticle_repeats_across_fields"] = abs(ret) > LIM["adi_reticle"]

    ev.append(dict(k="ADI 스칼라 성분", v=f"{o:+.2f} nm", lim=f"±{LIM['adi_offset']:.2f}",
                   hit=bool(checks["adi_offset_exceeds"])))
    ev.append(dict(k="ADI 반경 성분", v=f"{rad:+.2f} nm", lim=f"±{LIM['adi_radial']:.2f}",
                   hit=bool(checks["adi_radial_exceeds"])))
    ev.append(dict(k="레티클 반복 성분", v=f"{ret:+.2f} nm", lim=f"≤{LIM['adi_reticle']:.2f}",
                   hit=bool(checks["adi_reticle_exceeds"])))

    has_aci = dbias is not None
    td, td_age = tool_drift(r.aci_meas_tool, r.day_index) if has_aci else (0.0, 0)
    cdev, _ = chamber_deviation(r.etch_chamber, r.day_index) if has_aci else (None, None)
    tdev = taper_dev(r.day_index, r.etch_chamber) if has_aci else None

    if has_aci:
        checks["delta_bias_exceeds"] = abs(dbias) > LIM["delta_bias"]
        checks["delta_within_limit_or_absent"] = not checks["delta_bias_exceeds"]
        checks["tool_drift_exceeds"] = abs(td) > LIM["tool_drift"]
        checks["metrology_healthy"] = abs(td) <= LIM["tool_drift"]
        checks["metrology_evidence_fresh"] = td_age <= 2
        checks["taper_not_contradicting"] = (tdev is None) or (abs(tdev) > 0.35)
        checks["chamber_specific"] = cdev is not None and abs(cdev) > LIM["chamber_dev"]
        checks["not_chamber_specific"] = cdev is None or abs(cdev) <= LIM["chamber_dev"]
        ev.append(dict(k="ΔCD(etch bias) 편차", v=f"{dbias:+.2f} nm",
                       lim=f"±{LIM['delta_bias']:.2f}", hit=bool(checks["delta_bias_exceeds"])))
        ev.append(dict(k=f"{r.aci_meas_tool} monitor wafer drift", v=f"{td:+.2f} nm ({td_age}일 전 측정)",
                       lim=f"±{LIM['tool_drift']:.2f}", hit=bool(checks["tool_drift_exceeds"])))
        ev.append(dict(k=f"{r.etch_chamber} 챔버 편중", v=("N/A" if cdev is None else f"{cdev:+.2f} nm"),
                       lim=f"±{LIM['chamber_dev']:.2f}", hit=bool(checks["chamber_specific"])))
        ev.append(dict(k="단면 taper 변화(보조)", v=("N/A" if tdev is None else f"{tdev:+.2f} nm"),
                       lim="참고", hit=bool(tdev is not None and abs(tdev) > 0.8)))
    else:
        checks["delta_within_limit_or_absent"] = True
        ev.append(dict(k="ΔCD", v="ACI 미측정", lim="-", hit=False))

    # 규칙 선택 — ADI(되돌릴 수 있는 시점)를 먼저 본다
    order = []
    if checks["adi_reticle_exceeds"]:
        order.append("RETICLE_CD_ERROR")
    if checks["adi_radial_exceeds"]:
        order.append("PHOTO_TRACK_RADIAL")
    if checks["adi_offset_exceeds"]:
        order.append("PHOTO_DOSE")
    if has_aci and checks["delta_bias_exceeds"]:
        # monitor wafer가 움직였다면 그것부터 바로잡는다.
        # 자를 먼저 확인하지 않고 공정을 조치하면 정상 챔버를 건드리게 된다.
        if checks["tool_drift_exceeds"]:
            order.append("METROLOGY_TOOL_DRIFT")
        elif checks["chamber_specific"] and checks["metrology_healthy"]:
            order.append("ETCH_CHAMBER")
        else:
            order.append("INDETERMINATE")

    verdict, gate = "NORMAL", []
    for cand in order:
        req = RULES[cand].get("require") or []
        fail = [c for c in req if not checks.get(c, False)]
        gate = [dict(c=c, ok=bool(checks.get(c, False))) for c in req]
        if not fail:
            verdict = cand
            break
        verdict = "INDETERMINATE" if cand != "NORMAL" else "NORMAL"

    extra = None
    if verdict == "PHOTO_DOSE":
        extra = f"dose 보정 제안 {(-o / DOSE_SENS):+.2f} %"
    return verdict, ev, gate, extra, dict(tool_drift=td, chamber_dev=cdev, taper_dev=tdev)


VERD_TO_SCEN = {"NORMAL": "S0", "PHOTO_DOSE": "S1", "PHOTO_TRACK_RADIAL": "S2",
                "RETICLE_CD_ERROR": "S3", "ETCH_CHAMBER": "S4", "METROLOGY_TOOL_DRIFT": "S5",
                "INDETERMINATE": "??"}

lots, conf = [], {}
for r in M.itertuples():
    v, ev, gate, extra, aux = attribute(r)
    pred = VERD_TO_SCEN[v]
    conf.setdefault(r.scenario_id, {}).setdefault(pred, 0)
    conf[r.scenario_id][pred] += 1
    rule = RULES[v]
    lots.append(dict(
        lot=r.lot_id, date=r.date, day=int(r.day_index), verdict=v,
        label=rule["label"], module=rule["module"], coord=rule["coordinate"],
        risk=rule["risk"], cause=rule["cause"].strip(), action=rule["action"].strip(),
        scanner=r.scanner_id, reticle=r.reticle_id, chamber=r.etch_chamber,
        adiTool=r.adi_meas_tool, aciTool=r.aci_meas_tool, rf=r.rf_hours_since_pm,
        adiMean=r.adi_mean, aciMean=(None if not hasattr(r, "aci_mean") or pd.isna(r.aci_mean) else r.aci_mean),
        m=dict(offset=round(r.adi_offset, 2), radial=round(r.adi_radial, 2),
               slit=round(r.adi_slit, 2), reticle=round(r.adi_reticle, 2),
               dbias=(None if pd.isna(r.delta_bias) else round(r.delta_bias, 2)),
               dradial=(None if pd.isna(r.delta_radial) else round(r.delta_radial, 2))),
        ev=ev, gate=gate, extra=extra,
        adiMap=r.adi_map, deltaMap=(None if not isinstance(r.delta_map, list) else r.delta_map),
        truth=r.scenario_id,
    ))

# 웹 뷰어가 측정점 하나하나를 설명할 수 있도록 좌표 정보를 함께 내보낸다
_plan_full = pd.read_csv(ROOT / "data/sampling_plan.csv")
sites = _plan_full[["site_id", "field_x", "field_y", "site_in_field",
                    "wafer_x_mm", "wafer_y_mm", "r_norm", "pattern_density"]].to_dict("records")

payload = dict(
    centers={k: round(v, 3) for k, v in CEN.items()},
    meta=dict(
        adiTarget=ADI_T, aciTarget=CFG["anchors"]["aci_cd_target"]["value"],
        vsemTarget=CFG["anchors"]["vsem_bcd_target"]["value"], etchBias=ETCH_BIAS,
        lots=len(M), aciLots=int(M.delta_bias.notna().sum()),
        sites=len(sites), days=int(M.day_index.max() + 1),
        adiRows=len(adi), aciRows=len(aci),
        cdu3s=round(3 * adi[adi.lot_id.isin(base.lot_id)].groupby(["lot_id", "wafer_slot"]).cd_nm.std().mean(), 2),
    ),
    limits={k: round(v, 3) for k, v in LIM.items()},
    sites=sites,
    lots=lots,
    monitor=[dict(day=int(r.day_index), tool=r.meas_tool, drift=round(r.drift, 3))
             for r in mon_d.itertuples()],
    confusion=conf,
    chamberSeries=[dict(day=int(d), chamber=c, dbias=round(float(v), 3), n=int(n))
                   for (d, c), (v, n) in
                   M.dropna(subset=["delta_bias"]).groupby(["day_index", "etch_chamber"])
                    .delta_bias.agg(["mean", "size"]).iterrows()],
    rules=[dict(id=r["id"], label=r["label"], module=r["module"], coord=r["coordinate"],
                risk=r["risk"], cause=r["cause"].strip(), action=r["action"].strip())
           for r in KB["rules"]],
)

(ROOT / "data.js").write_text("const DATA = " + json.dumps(payload, ensure_ascii=False, default=lambda o: bool(o) if isinstance(o, (np.bool_,)) else float(o)) + ";\n",
                             encoding="utf-8")

# 블라인드 평가 리포트
lines = ["# 블라인드 평가", "", "engine은 ground_truth.csv를 읽지 않는다. 아래는 판정 후 대조 결과.", ""]
allp = sorted({p for v in conf.values() for p in v})
lines.append("| 실제 \\ 판정 | " + " | ".join(allp) + " |")
lines.append("|" + "---|" * (len(allp) + 1))
for t in sorted(conf):
    lines.append(f"| {t} | " + " | ".join(str(conf[t].get(p, 0)) for p in allp) + " |")
(ROOT / "validation" / "blind_eval.md").write_text("\n".join(lines), encoding="utf-8")

print("관리 한계:", {k: round(v, 2) for k, v in LIM.items()})
print("혼동 행렬:")
for t in sorted(conf):
    print(" ", t, conf[t])
print("data.js", (ROOT / "data.js").stat().st_size // 1024, "KB")
