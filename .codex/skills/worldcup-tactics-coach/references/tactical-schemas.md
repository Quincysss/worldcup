# Tactical Schemas

Use JSON-compatible objects. Prefer `null` over guessed values.

## Team Tactical Packet

```json
{
  "team": "",
  "data_timestamp": "",
  "coach_profile": {
    "coach": "",
    "preferred_systems": [],
    "flexibility": "low/medium/high",
    "selection_stability": "low/medium/high",
    "substitution_tendency": {
      "typical_first_sub_minute": null,
      "common_sub_types": [],
      "trailing_adjustments": "",
      "leading_adjustments": ""
    },
    "tournament_notes": "",
    "confidence": "low/medium/high"
  },
  "team_shape": {
    "nominal_formations": [],
    "in_possession_shape": "",
    "out_of_possession_shape": "",
    "alternate_shapes": [],
    "role_dependencies": []
  },
  "phase_model": {
    "build_up": {
      "style": "",
      "progression_routes": [],
      "press_resistance_notes": "",
      "risk_flags": []
    },
    "chance_creation": {
      "primary_patterns": [],
      "shot_profile_note": "",
      "key_creators": []
    },
    "transition_attack": {
      "speed": "low/medium/high",
      "outlets": [],
      "runner_profile": "",
      "risk_flags": []
    },
    "pressing": {
      "height": "low/mid/high/variable",
      "triggers": [],
      "orientation": "zonal/man-oriented/hybrid/unknown",
      "bypass_risks": []
    },
    "settled_defense": {
      "block": "low/mid/high/variable",
      "compactness": "low/medium/high",
      "box_defending_note": "",
      "wide_defending_note": "",
      "risk_flags": []
    },
    "defensive_transition": {
      "counterpress": "low/medium/high",
      "rest_defense_shape": "",
      "recovery_risks": []
    },
    "set_pieces": {
      "attacking_strength": "low/medium/high/unknown",
      "defensive_strength": "low/medium/high/unknown",
      "primary_takers": [],
      "aerial_targets": [],
      "vulnerabilities": []
    }
  },
  "key_roles": [
    {
      "role": "",
      "players": [],
      "tactical_importance": "low/medium/high",
      "availability_dependency": ""
    }
  ],
  "confidence_notes": [],
  "source_references": []
}
```

## Matchup Tactical Packet

```json
{
  "match": "",
  "data_timestamp": "",
  "team_a": "",
  "team_b": "",
  "matchup_edges": [
    {
      "phase": "build_up/pressing/transition/set_piece/defensive_block",
      "edge_team": "",
      "description": "",
      "confidence": "low/medium/high",
      "depends_on": []
    }
  ],
  "coach_game_state_matrix": {
    "team_a_leading": "",
    "team_a_trailing": "",
    "team_b_leading": "",
    "team_b_trailing": ""
  },
  "tactical_risk_flags": [],
  "model_features_suggested": [],
  "verification_questions": []
}
```
