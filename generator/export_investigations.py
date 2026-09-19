"""Export deterministic Agent investigation traces for the static frontend.

The browser cannot execute Python, so this build step runs the same
`investigate_lot()` orchestrator used by the CLI/API and serializes the results
as `investigations.js`. No new reasoning or fabricated evidence is introduced.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from agent.orchestrator import investigate_lot
from engine.query_service import AttributionQueryService



def main() -> None:
    service = AttributionQueryService()
    results = {}
    for lot in service.data["lots"]:
        lot_id = lot["lot"]
        results[lot_id] = investigate_lot(lot_id)

    out = ROOT / "investigations.js"
    payload = json.dumps(results, ensure_ascii=False, separators=(",", ":"))
    out.write_text(f"const INVESTIGATIONS = {payload};\n", encoding="utf-8")
    print(f"investigations.js {out.stat().st_size / 1024:.0f} KB · {len(results)} lots")


if __name__ == "__main__":
    main()
