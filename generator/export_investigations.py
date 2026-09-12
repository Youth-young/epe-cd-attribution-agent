"""정적 뷰어(index.html)를 위한 Agent investigation trace 내보내기.

읽기 전용이다. agent/engine 계층을 그대로 호출해 나온 결과를 그대로 직렬화할
뿐, 이 파일은 어떤 값도 계산하거나 추정하지 않는다. 판정 로직·수치는
engine/analyze.py가 만든 data.js에 이미 확정되어 있고, 여기서는 그 위에서
agent가 실제로 어떤 tool을 왜 호출했는지(trace)만 뽑아 investigations.js로
내보낸다.

run.py에서 engine/analyze.py 다음 단계로 실행된다(data.js가 먼저 있어야
AttributionQueryService가 읽을 수 있다).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from agent.orchestrator import investigate_lot  # noqa: E402
from engine.query_service import AttributionQueryService  # noqa: E402


def main() -> None:
    service = AttributionQueryService()
    lot_ids = [lot["lot"] for lot in service.data["lots"]]

    investigations = {lot_id: investigate_lot(lot_id) for lot_id in lot_ids}

    out_path = ROOT / "investigations.js"
    payload = json.dumps(investigations, ensure_ascii=False)
    out_path.write_text(f"const INVESTIGATIONS = {payload};\n", encoding="utf-8")
    print(f"{out_path.name}: {len(investigations)}개 로트의 investigation trace")


if __name__ == "__main__":
    main()
