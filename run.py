"""합성 데이터 생성 → 결정론적 판정 → 분리된 검증까지 한 번에.

실행: python run.py

중요: engine/analyze.py는 ground_truth를 읽지 않는다.
정답 대조는 prediction이 끝난 뒤 validation/evaluate.py가 별도 수행한다.
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
STEPS = [
    "generator/generate_data.py",
    "engine/analyze.py",
    "validation/evaluate.py",
]

for step in STEPS:
    print(f"\n▶ {step}")
    if subprocess.run([sys.executable, str(ROOT / step)], cwd=ROOT).returncode:
        sys.exit(1)

print("\n완료.")
print("- 정적 뷰어: index.html")
print("- API: uvicorn api.main:app --reload")
print("- API 문서: http://127.0.0.1:8000/docs")
