import json
from pathlib import Path


ROOT = Path(r"K:\worldcup")
PREDICTION = ROOT / "data" / "outputs" / "match_predictions" / "f-group-round3-quant-prediction-20260625.json"
RED_TEAM = ROOT / "data" / "thread_outputs" / "f-group-round3-20260625" / "red-team.json"


def main() -> None:
    prediction = json.loads(PREDICTION.read_text(encoding="utf-8"))
    red_team = json.loads(RED_TEAM.read_text(encoding="utf-8"))

    adjustments = red_team.get("recommended_probability_adjustment", {})
    match_key_by_id = {
        "2026-06-26_F_R3_日本_vs_瑞典": "japan_vs_sweden",
        "2026-06-26_F_R3_突尼斯_vs_荷兰": "tunisia_vs_netherlands",
    }

    prediction["red_team_review"] = {
        "verdict": red_team.get("verdict"),
        "source": str(RED_TEAM),
        "status": "applied_as_uncertainty_range",
        "missing_data": red_team.get("missing_data", []),
        "top_concerns": red_team.get("top_concerns", [])[:3],
    }

    for match in prediction.get("matches", []):
        key = match_key_by_id.get(match.get("match_id"))
        match["red_team_status"] = red_team.get("verdict", "reviewed")
        if key and key in adjustments:
            match["red_team_probability_range"] = adjustments[key].get("suggested_range")
            match["red_team_adjustment_direction"] = adjustments[key].get("direction")

    notes = prediction.setdefault("quality_notes", [])
    note = (
        "Red-team verdict revise_for_uncertainty applied as probability ranges; "
        "model point estimates are retained for audit trail."
    )
    if note not in notes:
        notes.append(note)

    PREDICTION.write_text(
        json.dumps(prediction, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
