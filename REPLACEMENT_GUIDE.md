# 교체 방법 — 가장 쉬운 방법

## 방법 A — 전체 폴더 교체 (권장)

1. 현재 GitHub 저장소 폴더를 별도로 백업하거나 현재 변경사항을 commit한다.
2. 이 ZIP의 압축을 푼다.
3. 기존 프로젝트의 `.git` 폴더는 유지하고, **그 외 파일/폴더를 새 버전으로 덮어쓴다.**
4. 터미널에서 프로젝트 루트로 이동한다.
5. 아래 명령을 실행한다.

```bash
pip install -r requirements.txt
python run.py
pytest -q
```

6. API 확인:

```bash
uvicorn api.main:app --reload
```

7. 브라우저에서 `http://127.0.0.1:8000/docs`를 연다.
8. 기존 정적 화면은 이전과 동일하게 `index.html` 또는 Vercel URL로 확인한다.

## 방법 B — 파일만 수동 교체

### 기존 파일에서 교체

```text
engine/analyze.py
engine/tools.py
run.py
requirements.txt
index.html
skills/epe-attribution/SKILL.md
skills/epe-attribution/reference/attribution_rules.yaml
```

### 새로 추가

```text
engine/__init__.py
engine/query_service.py
domain/__init__.py
domain/models.py
api/__init__.py
api/main.py
validation/evaluate.py
tests/test_architecture.py
tests/test_query_service.py
tests/test_api.py
.github/workflows/ci.yml
docs/02_agent_ready_refactor.md
```

`python run.py`를 실행하면 다음 파일은 자동 갱신된다.

```text
data.js
validation/evaluation.json
validation/validation.js
validation/blind_eval.md
```

## 절대 삭제하지 않을 것

```text
data/*.csv
validation/ground_truth.csv
generator/generate_data.py
config/config.yaml
.claude/skills/epe-attribution/
```

`ground_truth.csv`는 삭제하는 것이 아니라 **validation에서만 읽도록 격리**한 것이다.

## Git 권장 순서

기존 저장소에서 먼저:

```bash
git status
git add .
git commit -m "chore: checkpoint before agent-ready refactor"
git tag v0.1-static-console
```

새 파일을 덮어쓴 뒤:

```bash
git checkout -b refactor/agent-ready-core
python run.py
pytest -q
git add .
git commit -m "refactor: isolate evaluation and add shared API service"
```

그 후 GitHub에 push해서 Pull Request를 만들면 이번 변경이 첫 협업형 개발 이력으로 남는다.
