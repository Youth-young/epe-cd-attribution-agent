"""
EPE-CD Attribution Agent — 데이터 생성기

계측 정합성 실습(3-way CD split)에서 구한 회귀 결과를 앵커로,
현업 계측 구조(성긴 샘플링 / ADI-ACI 비대칭 / monitor wafer 감시)를 본뜬 합성 데이터를 만든다.

CD는 난수가 아니라 성분의 합으로 만든다. 각 성분이 서로 다른 좌표계에 살기 때문에
분해가 가능하고, 그래야 원인 귀속이 성립한다.

    ADI CD = 목표 + dose(웨이퍼 스칼라) + focus(field) + slit(field 내 X)
                  + reticle(site 고정) + track(웨이퍼 반경) + 확률성분 + 계측노이즈
    ΔCD    = etch bias + loading(패턴밀도) + chamber(웨이퍼 반경) + PM drift(시간) + 노이즈
"""

import json
import math
import os
import random
from pathlib import Path

import numpy as np
import pandas as pd
import yaml

ROOT = Path(__file__).resolve().parents[1]
CFG = yaml.safe_load(open(ROOT / "config" / "config.yaml", encoding="utf-8"))
OUT = ROOT / "data"
OUT.mkdir(exist_ok=True)

rng = np.random.default_rng(CFG["seed"])
random.seed(CFG["seed"])

A = {k: v["value"] for k, v in CFG["anchors"].items()}
PH = {k: v["value"] for k, v in CFG["photo"].items()}
SMP = CFG["sampling"]
FLEET = CFG["fleet"]
MET = CFG["metrology"]
SCN = {k: v["value"] for k, v in CFG["scanner"].items()}
ET = CFG["etch"]

ADI_T = A["adi_cd_target"]
ACI_T = A["aci_cd_target"]
ETCH_BIAS = A["etch_bias"]
TAPER = CFG["profile"]["taper_bcd_tcd"]["value"]
MCD_OFF = CFG["profile"]["mcd_offset"]["value"]

S3 = 3.0  # 3-sigma -> sigma 환산


# ---------------------------------------------------------------- 샘플링 플랜
def build_sampling_plan():
    """9 field x 5 site. 현업 recipe와 같이 ADI/ACI가 동일 좌표를 공유한다."""
    fw, fh = SMP["field_size_mm"]
    R = SMP["wafer_radius_mm"]
    # 중심-중간-엣지가 모두 들어가도록 9 field를 웨이퍼 전면에 배치한다
    field_idx = [(0, 0), (2, 0), (-2, 0), (0, 2), (0, -2), (5, 0), (-5, 0), (2, -3), (-2, -3)]
    # field 내 5점: 중심 + 4모서리 (슬릿 방향 = X)
    in_field = [(0.0, 0.0), (-0.35, -0.35), (0.35, -0.35), (-0.35, 0.35), (0.35, 0.35)]
    rows = []
    sid = 0
    for fi, (fx, fy) in enumerate(field_idx):
        for si, (ux, uy) in enumerate(in_field):
            wx = fx * fw + ux * fw
            wy = fy * fh + uy * fh
            r = math.hypot(wx, wy)
            if r > R * 0.93:  # 웨이퍼 밖으로 나가는 점은 제외
                continue
            rows.append(dict(
                site_id=f"S{sid:02d}", field_x=fx, field_y=fy,
                site_in_field=si, u_x=ux, u_y=uy,
                wafer_x_mm=round(wx, 2), wafer_y_mm=round(wy, 2),
                r_norm=round(r / R, 4),
                pattern_density=round(0.42 + 0.16 * ((fi * 5 + si) % 7) / 6.0, 3),
            ))
            sid += 1
    return pd.DataFrame(rows)


PLAN = build_sampling_plan()
NSITE = len(PLAN)

# 레티클 지문: site에 고정되어 모든 field·모든 웨이퍼에서 동일하게 반복된다
RETICLE_FP = {
    ret: rng.normal(0, PH["reticle_sigma"], SMP["sites_per_field"])
    for ret in FLEET["reticles"]
}
# 스캐너 슬릿 지문: field 내 X좌표의 함수
SLIT_K = {"SCN-01": PH["slit_amplitude"], "SCN-02": -0.8 * PH["slit_amplitude"]}


# ---------------------------------------------------------------- 로트 스케줄
def build_runs():
    weeks, lpd = SMP["weeks"], SMP["lots_per_day"]
    ndays = weeks * 5
    scen = CFG["scenarios"]
    runs, gt = [], []
    rf_hours = {c: rng.uniform(50, 400) for c in FLEET["chambers"]}
    for d in range(ndays):
        date = pd.Timestamp("2026-03-02") + pd.Timedelta(days=d + (d // 5) * 2)
        for k in range(lpd):
            lot = f"L{d*lpd+k+1:04d}"
            # 설비 배정은 ACI 샘플링 주기와 상관되지 않도록 독립 추출한다
            scanner = FLEET["scanners"][int(rng.integers(0, 2))]
            reticle = FLEET["reticles"][int(rng.integers(0, 2))]
            chamber = FLEET["chambers"][int(rng.integers(0, 4))]
            adi_tool = FLEET["cdsem"][int(rng.integers(0, 2))]
            aci_tool = FLEET["cdsem"][int(rng.integers(0, 2))]

            rf_hours[chamber] += rng.uniform(1.5, 3.0)
            if rf_hours[chamber] > 600:  # PM 수행
                rf_hours[chamber] = rng.uniform(5, 20)

            active = [s for s in scen if s["day_from"] <= d <= s["day_to"]]
            inj = None
            for s in active:
                tgt = s["target"]
                hit = (tgt == "ALL" or tgt in (scanner, reticle, chamber, aci_tool))
                if hit:
                    prog = (d - s["day_from"] + 1) / (s["day_to"] - s["day_from"] + 1)
                    ramp = 0.5 + 0.5 * prog   # 이상은 어느 정도 자란 뒤 검출된다
                    inj = dict(id=s["id"], name=s["name"], target=tgt, ramp=round(ramp, 3),
                               mag=s.get("magnitude_nm", s.get("magnitude_pct")))
            # 실효 dose 편차 = 로트별 미세 변동 + (S1이면) sensor calibration 이탈분.
            # Setting값(recipe)은 32.0 mJ/cm2에 고정되어 있고 움직이지 않는다.
            # 현업 disposition의 첫 질문이 "Setting과 Sensor 실측값이 일치하는가"이므로
            # 이 두 값을 반드시 분리해서 기록한다.
            dose_dev = round(rng.normal(0, 0.25), 3)
            if inj and inj["id"] == "S1":
                dose_dev = round(dose_dev + inj["ramp"] * CFG["scenarios"][0]["magnitude_pct"], 3)
            runs.append(dict(
                lot_id=lot, date=date.strftime("%Y-%m-%d"), day_index=d,
                product="P-A1", layer="M1-LS",
                scanner_id=scanner, reticle_id=reticle,
                # Setting값은 recipe에 고정되어 있고, Sensor 실측값은 따로 움직인다.
                # 실효 dose는 Sensor 실측값이며 CD는 여기에 반응한다.
                dose_setting_mJcm2=SCN["dose_setting_mJcm2"],
                dose_dev_pct=dose_dev,
                focus_setting_nm=SCN["focus_setting_nm"],
                focus_sensor_nm=round(rng.normal(0, 12), 1),
                etch_chamber=chamber, rf_hours_since_pm=round(rf_hours[chamber], 1),
                adi_meas_tool=adi_tool, aci_meas_tool=aci_tool,
                aci_measured=bool((d * lpd + k) % 2 == 0),  # 짝수 로트만 ACI 측정 (성긴 샘플링)
            ))
            gt.append(dict(lot_id=lot, day_index=d,
                           scenario_id=(inj["id"] if inj else "S0"),
                           scenario_name=(inj["name"] if inj else "normal"),
                           injected_target=(inj["target"] if inj else "-"),
                           ramp=(inj["ramp"] if inj else 0.0)))
    return pd.DataFrame(runs), pd.DataFrame(gt)


RUNS, GT = build_runs()
SCEN = {r.lot_id: r for r in GT.itertuples()}


# ---------------------------------------------------------------- CD 생성
def adi_cd_wafer(run, slot):
    gt = SCEN[run.lot_id]
    n = NSITE
    cd = np.full(n, ADI_T, dtype=float)

    # 1) dose — 웨이퍼 전면에 균일하게 걸리는 성분 (wafer mean shift)
    #    S1은 Setting값을 건드리지 않고 Energy Sensor 실측값만 이동시킨다.
    #    실제 fab의 Dose Mapper Calibration 누락/열화 시나리오와 같은 구조다.
    cd += PH["dose_sensitivity"] * run.dose_dev_pct

    # 2) focus — field 단위 Bossung (여기서는 웨이퍼 단위로 근사)
    cd += PH["focus_bossung"] * (run.focus_sensor_nm ** 2)

    # 3) slit — field 내 X 좌표의 함수 (스캐너 지문)
    cd += SLIT_K[run.scanner_id] * (PLAN["u_x"].to_numpy() / 0.35)

    # 4) reticle — site에 고정, 모든 field에서 동일 반복
    fp = RETICLE_FP[run.reticle_id].copy()
    if gt.scenario_id == "S3":
        fp[1] += gt.ramp * CFG["scenarios"][2]["magnitude_nm"]
        fp[3] -= 0.6 * gt.ramp * CFG["scenarios"][2]["magnitude_nm"]
    cd += fp[PLAN["site_in_field"].to_numpy()]

    # 5) track/PEB — 웨이퍼 반경의 함수
    amp = PH["track_radial_amp"]
    if gt.scenario_id == "S2":
        amp += gt.ramp * CFG["scenarios"][1]["magnitude_nm"]
    rn = PLAN["r_norm"].to_numpy()
    cd += amp * (rn ** 2 - 0.35)

    # 6) 확률 성분 + 슬롯 미세차
    cd += rng.normal(0, PH["stochastic_sigma"], n)
    cd += (slot - 13) * 0.02
    return cd


def etch_delta(run, true_adi):
    gt = SCEN[run.lot_id]
    n = NSITE
    d = np.full(n, ETCH_BIAS, dtype=float)
    d += ET["loading_coeff"]["value"] * (PLAN["pattern_density"].to_numpy() - 0.5)
    d += ET["chamber_offset"][run.etch_chamber]
    rn = PLAN["r_norm"].to_numpy()
    d += ET["chamber_radial"][run.etch_chamber] * (rn ** 2 - 0.35) * 3.0
    d += ET["pm_drift"]["value"] * run.rf_hours_since_pm
    if gt.scenario_id == "S4":
        d -= gt.ramp * CFG["scenarios"][3]["magnitude_nm"] * (0.6 + 0.8 * rn ** 2)
    d += rng.normal(0, ET["noise_sigma"]["value"], n)
    return d


def measure(true_cd, tool, run, step):
    """계측 = 참값 + tool offset + precision noise. S5는 여기에만 개입한다."""
    gt = SCEN[run.lot_id]
    off = MET["tool_offset"][tool]
    if gt.scenario_id == "S5" and step == "ACI" and tool == gt.injected_target:
        off += gt.ramp * CFG["scenarios"][4]["magnitude_nm"]
    sigma = MET["cdsem_precision_3s"]["value"] / S3
    return true_cd + off + rng.normal(0, sigma, len(true_cd))


def build_measurements():
    adi_rows, aci_rows, xsem_rows = [], [], []
    base = PLAN.to_dict("records")
    for run in RUNS.itertuples():
        true_by_slot = {}
        for slot in SMP["adi_slots"]:
            t = adi_cd_wafer(run, slot)
            true_by_slot[slot] = t
            m = measure(t, run.adi_meas_tool, run, "ADI")
            for i, p in enumerate(base):
                adi_rows.append(dict(lot_id=run.lot_id, date=run.date, wafer_slot=slot,
                                     step="ADI", meas_tool=run.adi_meas_tool,
                                     site_id=p["site_id"], field_x=p["field_x"], field_y=p["field_y"],
                                     site_in_field=p["site_in_field"],
                                     wafer_x_mm=p["wafer_x_mm"], wafer_y_mm=p["wafer_y_mm"],
                                     r_norm=p["r_norm"], pattern_density=p["pattern_density"],
                                     cd_nm=round(float(m[i]), 3)))
        if run.aci_measured:
            slot = SMP["aci_slot"]
            t_adi = true_by_slot[slot]
            dlt = etch_delta(run, t_adi)
            t_aci = t_adi + dlt
            m = measure(t_aci, run.aci_meas_tool, run, "ACI")
            for i, p in enumerate(base):
                aci_rows.append(dict(lot_id=run.lot_id, date=run.date, wafer_slot=slot,
                                     step="ACI", meas_tool=run.aci_meas_tool,
                                     site_id=p["site_id"], field_x=p["field_x"], field_y=p["field_y"],
                                     site_in_field=p["site_in_field"],
                                     wafer_x_mm=p["wafer_x_mm"], wafer_y_mm=p["wafer_y_mm"],
                                     r_norm=p["r_norm"], pattern_density=p["pattern_density"],
                                     cd_nm=round(float(m[i]), 3)))
            # 단면 기준: 주 1회, 5 site만. 파괴 측정이므로 극소 샘플링.
            if run.day_index % 5 in (0, 2, 4) and int(run.lot_id[1:]) % 6 in (1, 2):
                idx = [0, 8, 17, 26, 35]
                idx = [i for i in idx if i < len(t_aci)][:5]
                xs = MET["xsem_precision_3s"]["value"] / S3
                # taper는 etch bias 변화에 비례해 함께 움직인다 (계측 drift는 taper를 바꾸지 못한다)
                dbias = float(np.mean(dlt)) - ETCH_BIAS
                taper = TAPER + ET["taper_per_bias"]["value"] * dbias
                for i in idx:
                    bcd = t_aci[i] + A["intercept_aci_vsem"]
                    xsem_rows.append(dict(
                        lot_id=run.lot_id, date=run.date, wafer_slot=slot, site_id=base[i]["site_id"],
                        bcd_nm=round(float(bcd + rng.normal(0, xs)), 3),
                        mcd_nm=round(float(bcd + MCD_OFF + rng.normal(0, xs)), 3),
                        tcd_nm=round(float(bcd - taper + rng.normal(0, xs)), 3),
                        taper_nm=round(float(taper + rng.normal(0, xs * 0.7)), 3)))
    return pd.DataFrame(adi_rows), pd.DataFrame(aci_rows), pd.DataFrame(xsem_rows)


def build_monitor():
    """monitor wafer 반복 측정 — 계측 장비의 stability와 tool-to-tool matching 감시.

    현업과 같이 (1) site마다 참값이 조금씩 다르고 (2) 같은 site를 여러 번 반복 측정한다.
    반복 측정은 dynamic precision을, 장비 간 site 평균 차이는 tool-to-tool match를 준다.
    이 둘이 TMU(Total Measurement Uncertainty)의 두 성분이다.
    """
    rows = []
    true_cd = MET["monitor_wafer_true"]["value"]
    nsite = 9
    # site별 참값은 웨이퍼에 고정되어 있다. 매 측정마다 같은 값을 재는 것이 전제.
    site_true = true_cd + rng.normal(0, MET["monitor_site_spread"]["value"], nsite)
    sigma = MET["cdsem_precision_3s"]["value"] / S3
    reps = int(MET["monitor_repeats"]["value"])
    s5 = CFG["scenarios"][4]
    for d in range(SMP["weeks"] * 5):
        if d % 5 not in (0, 3):
            continue
        date = (pd.Timestamp("2026-03-02") + pd.Timedelta(days=d + (d // 5) * 2)).strftime("%Y-%m-%d")
        for tool in FLEET["cdsem"]:
            off = MET["tool_offset"][tool]
            if tool == s5["target"] and s5["day_from"] <= d <= s5["day_to"]:
                ramp = (d - s5["day_from"] + 1) / (s5["day_to"] - s5["day_from"] + 1)
                off += ramp * s5["magnitude_nm"]
            for site in range(nsite):
                for rep in range(reps):
                    rows.append(dict(date=date, day_index=d, meas_tool=tool,
                                     site_id=f"G{site:02d}", repeat=rep + 1,
                                     cd_nm=round(float(site_true[site] + off
                                                       + rng.normal(0, sigma)), 3)))
    return pd.DataFrame(rows)


if __name__ == "__main__":
    adi, aci, xsem = build_measurements()
    mon = build_monitor()
    PLAN.to_csv(OUT / "sampling_plan.csv", index=False)
    R = RUNS.copy()
    # Energy Sensor 실측값(절대 노광량). Setting과의 괴리가 곧 실효 dose 오차다.
    _noise = rng.normal(0, SCN["dose_sensor_3s"] / S3, len(R))
    R["dose_sensor_mJcm2"] = (R.dose_setting_mJcm2 * (1 + R.dose_dev_pct / 100) + _noise).round(3)
    R["dose_setting_vs_sensor_pct"] = (
        (R.dose_sensor_mJcm2 - R.dose_setting_mJcm2) / R.dose_setting_mJcm2 * 100).round(3)
    R.to_csv(OUT / "runs.csv", index=False)
    adi.to_csv(OUT / "meas_adi.csv", index=False)
    aci.to_csv(OUT / "meas_aci.csv", index=False)
    xsem.to_csv(OUT / "ref_xsem.csv", index=False)
    mon.to_csv(OUT / "tool_monitor.csv", index=False)
    (ROOT / "validation").mkdir(exist_ok=True)
    GT.to_csv(ROOT / "validation" / "ground_truth.csv", index=False)

    print(f"sites/wafer      : {NSITE}")
    print(f"runs             : {len(RUNS)}  (ACI 측정 {int(RUNS.aci_measured.sum())} 로트)")
    print(f"ADI rows         : {len(adi):,}")
    print(f"ACI rows         : {len(aci):,}")
    print(f"XSEM rows        : {len(xsem):,}")
    print(f"monitor rows     : {len(mon):,}")
