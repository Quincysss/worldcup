# Output Schemas

Use JSON-compatible objects. Use decimal probabilities from 0 to 1.

## Match Probability

```json
{
  "match": "",
  "captured_at": "",
  "input_readiness": "ready/partial/blocked",
  "model_version": "",
  "probabilities": {
    "team_a_win": null,
    "draw": null,
    "team_b_win": null,
    "team_a_advance": null,
    "team_b_advance": null
  },
  "expected_goals": {
    "team_a": null,
    "team_b": null
  },
  "scoreline_modes": [],
  "confidence": "low/medium/high",
  "main_drivers": [],
  "risk_flags": [],
  "market_comparison": {
    "included": false,
    "bookmakers": [],
    "market_implied": {},
    "model_minus_market": {},
    "overround": null,
    "notes": ""
  },
  "source_dependencies": []
}
```

## Group Simulation

```json
{
  "group": "",
  "captured_at": "",
  "simulation_runs": null,
  "teams": [
    {
      "team": "",
      "avg_points": null,
      "finish_1st": null,
      "finish_2nd": null,
      "finish_3rd": null,
      "finish_4th": null,
      "advance_probability": null
    }
  ],
  "assumptions": [],
  "risk_flags": []
}
```

## Tournament Path

```json
{
  "captured_at": "",
  "simulation_runs": null,
  "teams": [
    {
      "team": "",
      "round_of_32": null,
      "round_of_16": null,
      "quarterfinal": null,
      "semifinal": null,
      "final": null,
      "champion": null
    }
  ],
  "path_notes": [],
  "sensitivity": []
}
```

## Odds Conversion Notes

For decimal odds:

```text
raw_implied_probability = 1 / decimal_odds
overround = sum(raw implied probabilities for complete outcome set)
normalized_probability = raw_implied_probability / overround
```

For American or fractional odds, convert to decimal first, then apply the same process.
