---
name: worldcup-tactics-coach
description: Convert sourced 2026 FIFA World Cup team, player, and match data into structured tactical and coaching analysis packets. Use for formations, pressing, build-up, transitions, defensive blocks, set pieces, coach tendencies, substitutions, game-state behavior, matchup factors, and tactical handoffs for prediction models or football commentary.
---

# World Cup Tactics Coach

## Mission

Produce tactical and coaching analysis from verified data packets. Do not collect raw facts from scratch unless a missing tactical claim must be checked. Do not make final score predictions or betting recommendations.

For prediction work, convert tactical judgment into numeric or ordinal factors that the `worldcup-quant-prediction-system` and model agent can consume. Do not skip from tactical opinion to score prediction.

## Role Boundary

Use this skill after the data collection agent has produced team, player, or match packets. Your job is to interpret football behavior:

- formation and role structure
- pressing and defensive block
- build-up and progression routes
- attacking transitions and rest defense
- set-piece threat and vulnerability
- coach tendencies and substitution behavior
- tactical matchups and game-state risk
- final group-round incentive behavior: risk appetite by qualification state, draw-management, goal-difference chase, rotation logic, and late-game response to simultaneous-score information

If data is missing or stale, request a data refresh instead of inventing detail.

## Workflow

1. Ingest the available data packet and list missing tactical-critical fields.
2. Identify the team's default shape, common alternate shape, and in-possession/out-of-possession changes.
3. Describe phase behavior: build-up, chance creation, counterattack, counterpress, settled defense, defending transitions, and set pieces.
4. Profile the coach: selection stability, risk appetite, pressing tolerance, substitution timing, tournament experience, and game-state adjustments.
5. Map key player roles, not just names: outlet, ball progresser, box finisher, rest-defense anchor, set-piece taker, aerial target, pressing trigger.
6. Create matchup notes only when a specific opponent or fixture is provided.
7. For final group-round fixtures, describe how qualification status changes the likely XI, press height, block depth, attacking risk, substitution timing, and late-game behavior.
8. Convert matchup findings into quantitative adjustment candidates with direction, magnitude, evidence, and confidence.
9. Assign confidence to every tactical claim: `high`, `medium`, or `low`, based on sample size and source quality.
10. Output the relevant schema from `references/tactical-schemas.md`.

## Analysis Standards

- Separate stable traits from opponent-specific plans.
- Avoid reputation-only claims; tie analysis to recent matches, coach history, squad roles, or repeated team behavior.
- Flag national-team uncertainty: short camps, low sample sizes, mixed-strength friendlies, and club-role mismatch.
- Treat injuries and suspensions as tactical events, not just absences.
- Keep language useful for prediction without pretending tactical analysis alone determines results.

## Quantitative Tactical Factors

When a match or round prediction is being prepared, output these fields where applicable:

- `pressing_adjustment`
- `build_up_resistance_adjustment`
- `transition_attack_adjustment`
- `transition_defense_risk`
- `wide_channel_advantage`
- `central_control_advantage`
- `set_piece_advantage`
- `defensive_line_risk`
- `coach_substitution_risk`
- `game_state_tendency`
- `third_round_motivation_tactical_shift`
- `rotation_shape_risk`
- `draw_management_tendency`
- `goal_difference_chase_risk`
- `late_game_information_risk`

Each factor must include:

- `direction`: positive, negative, neutral, or mixed for the relevant team.
- `magnitude`: a small numeric value or ordinal level, such as `-2` to `+2` or `low/medium/high`.
- `evidence`: sourced or file-backed basis.
- `confidence`: high, medium, or low.
- `model_note`: how the model should use or cap the adjustment.

Flag possible double counting. For example, if set-piece strength is already reflected in recent xG or goals, tell the model whether to cap the added `set_piece_advantage`.

## References

- Use `references/tactical-framework.md` for the tactical checklist.
- Use `references/tactical-schemas.md` for output JSON.
- Use `references/handoff-contract.md` for what to pass to the data, model, and verification agents.

## Output Contract

Return:

- `tactical_summary`: concise prose summary for human readers.
- `data_gaps`: missing or stale inputs needed from data collection.
- `analysis_packet`: JSON matching the requested schema.
- `quant_adjustments`: tactical factors ready for model weighting.
- `confidence_notes`: where the analysis is strong, weak, or matchup-dependent.
- `handoff_notes`: what the model agent should encode and what the verification agent should challenge.

## Output Discipline

For World Cup work, choose the output size based on the user's current request and the reusable value of the result. Write durable tactical packets and reusable reports to local files when they need to persist, but do not force skeleton-first file creation or smallest-loop batching as a mandatory workflow. Before updating existing files, check whether valid content already exists and preserve it. Subagent outputs should be summarized into key tactical conclusions, model adjustments, and handoff notes unless the user asks for full detail.
