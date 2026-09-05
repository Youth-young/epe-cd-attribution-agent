"""데이터 생성 → 분해·귀속 → data.js 갱신까지 한 번에.  실행: python run.py"""
import subprocess, sys
from pathlib import Path
R = Path(__file__).parent
for step in ["generator/generate_data.py", "engine/analyze.py"]:
    print(f"\n▶ {step}")
    if subprocess.run([sys.executable, str(R / step)]).returncode:
        sys.exit(1)
print("\n완료. index.html 을 열거나 이 폴더를 그대로 Vercel에 배포하세요.")
