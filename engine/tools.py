"""EPE-CD Attribution Agent CLI tool surface.

CLI와 FastAPI는 같은 AttributionQueryService를 사용한다.
향후 Agent tool-calling도 이 서비스의 메서드를 직접 감싸면 된다.

예:
  python engine/tools.py list --abnormal
  python engine/tools.py lot L0231
  python engine/tools.py decompose L0231
  python engine/tools.py metrology --tool CDSEM-B --day 36
  python engine/tools.py tmu --tool CDSEM-B --day 36
  python engine/tools.py chambers --day 30
  python engine/tools.py rules --signature delta_bias
  python engine/tools.py events --tool SCN-01 --day 11 --window 3
  python engine/tools.py investigate L0081
  python engine/tools.py verify L0231
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from engine.query_service import AttributionQueryService, LotNotFoundError
from agent.orchestrator import investigate_lot

SERVICE = AttributionQueryService()


def out(obj):
    print(json.dumps(obj, ensure_ascii=False, indent=2))


def safe(call):
    try:
        return call()
    except LotNotFoundError as exc:
        sys.exit(f"없는 로트: {exc.args[0]}")


def cmd_list(a):
    out(SERVICE.list_lots(abnormal=a.abnormal, chamber=a.chamber, limit=a.n))


def cmd_lot(a):
    out(safe(lambda: SERVICE.lot_context(a.lot)))


def cmd_decompose(a):
    out(safe(lambda: SERVICE.decompose(a.lot)))


def cmd_metrology(a):
    out(SERVICE.metrology(tool=a.tool, day=a.day))


def cmd_tmu(a):
    out(SERVICE.tmu(tool=a.tool, day=a.day))


def cmd_chambers(a):
    out(SERVICE.chambers(day=a.day, window=a.window))


def cmd_rules(a):
    out(SERVICE.rules(signature=a.signature))


def cmd_events(a):
    out(SERVICE.equipment_events(
        tool_id=a.tool, event_type=a.event_type, day=a.day, window=a.window, limit=a.n
    ))


def cmd_investigate(a):
    out(safe(lambda: investigate_lot(a.lot)))


def cmd_verify(a):
    out(safe(lambda: SERVICE.verify(a.lot)))


P = argparse.ArgumentParser(description=__doc__)
sub = P.add_subparsers(dest="cmd", required=True)
p = sub.add_parser("list"); p.add_argument("--abnormal", action="store_true")
p.add_argument("--chamber"); p.add_argument("-n", type=int, default=40); p.set_defaults(f=cmd_list)
p = sub.add_parser("lot"); p.add_argument("lot"); p.set_defaults(f=cmd_lot)
p = sub.add_parser("decompose"); p.add_argument("lot"); p.set_defaults(f=cmd_decompose)
p = sub.add_parser("metrology"); p.add_argument("--tool"); p.add_argument("--day", type=int); p.set_defaults(f=cmd_metrology)
p = sub.add_parser("tmu"); p.add_argument("--tool"); p.add_argument("--day", type=int); p.set_defaults(f=cmd_tmu)
p = sub.add_parser("chambers"); p.add_argument("--day", type=int, required=True)
p.add_argument("--window", type=int, default=5); p.set_defaults(f=cmd_chambers)
p = sub.add_parser("rules"); p.add_argument("--signature"); p.set_defaults(f=cmd_rules)
p = sub.add_parser("events"); p.add_argument("--tool"); p.add_argument("--event-type")
p.add_argument("--day", type=int); p.add_argument("--window", type=int, default=7)
p.add_argument("-n", type=int, default=100); p.set_defaults(f=cmd_events)
p = sub.add_parser("investigate"); p.add_argument("lot"); p.set_defaults(f=cmd_investigate)
p = sub.add_parser("verify"); p.add_argument("lot"); p.set_defaults(f=cmd_verify)

if __name__ == "__main__":
    args = P.parse_args()
    args.f(args)
