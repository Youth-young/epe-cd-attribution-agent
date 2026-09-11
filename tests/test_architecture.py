from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_prediction_engine_does_not_read_ground_truth():
    source = (ROOT / "engine" / "analyze.py").read_text(encoding="utf-8")
    assert "validation/ground_truth.csv" not in source
    assert "pd.read_csv(ROOT / \"validation" not in source


def test_skill_rule_mirrors_are_identical():
    a = ROOT / ".claude" / "skills" / "epe-attribution" / "reference" / "attribution_rules.yaml"
    b = ROOT / "skills" / "epe-attribution" / "reference" / "attribution_rules.yaml"
    assert a.read_bytes() == b.read_bytes()
