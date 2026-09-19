from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_prediction_engine_does_not_read_ground_truth():
    source = (ROOT / "engine" / "analyze.py").read_text(encoding="utf-8")
    assert "validation/ground_truth.csv" not in source
    assert "pd.read_csv(ROOT / \"validation" not in source


SKILLS = ("cd-signature", "cause-attribution", "disposition-report")


def _tree(root):
    return {p.relative_to(root): p.read_bytes() for p in sorted(root.rglob("*")) if p.is_file()}


def test_skill_mirrors_are_identical():
    """.claude/skills 와 skills 는 어느 런타임에서 읽어도 같은 계약이어야 한다."""
    assert _tree(ROOT / ".claude" / "skills") == _tree(ROOT / "skills")


def test_skills_are_split_by_single_responsibility():
    """책임 단위 3분할이 유지되는지. 스킬을 늘리려면 분할 근거를 문서에 먼저 남긴다."""
    present = {p.name for p in (ROOT / ".claude" / "skills").iterdir() if p.is_dir()}
    assert present == set(SKILLS)


def test_every_skill_declares_trigger_tools_criteria_and_dod():
    """각 스킬은 Trigger / 도구 / 판단 기준 / DoD 를 프롬프트에 명시해야 한다."""
    for name in SKILLS:
        text = (ROOT / ".claude" / "skills" / name / "SKILL.md").read_text(encoding="utf-8")
        for block in ("## Trigger", "## 도구", "## 판단 기준", "## DoD"):
            assert block in text, f"{name}: {block} 누락"
        assert "- [ ]" in text, f"{name}: DoD 체크리스트 누락"


def test_rule_kb_lives_under_cause_attribution():
    """규칙 KB는 원인 귀속 스킬의 참조 자료다. 다른 스킬이 통째로 읽지 않게 한 곳에 둔다."""
    assert (ROOT / ".claude" / "skills" / "cause-attribution" / "reference"
            / "attribution_rules.yaml").exists()
