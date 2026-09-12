# v0.3 Finder-safe replacement

이 패키지는 macOS Finder에서 같은 이름의 폴더를 **Replace**해도 기존 v0.2에 필요했던 파일이 사라지지 않도록,
v0.3에서 교체되는 각 폴더의 **완전한 내용**을 포함합니다.

프로젝트 루트에 이 패키지의 항목들을 덮어쓴 뒤 다음을 실행하세요.

```bash
python run.py
python -m pytest -q
```

정상 기대값: `16 passed`.

그 다음:

```bash
python engine/tools.py investigate L0081
```
