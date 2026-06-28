---
name: worldcup-data-modeler
description: Design, calibrate, and document 2026 FIFA World Cup prediction models using verified team data, player availability, recent performance, Elo/FIFA/Opta indicators, fixtures, travel/rest context, and betting-market odds. Use when building probability estimates for match outcomes, group qualification, knockout paths, simulations, confidence bands, model assumptions, or data handoff specifications for World Cup forecasting.
---

# World Cup Data Modeler

## Mission

Turn sourced World Cup data into transparent probability estimates. Produce model designs, assumptions, formulas, validation plans, and structured outputs. Do not present gambling advice.

Prediction work must follow the quantitative chain defined by `worldcup-quant-prediction-system`: factor inputs, weights, expected goals, Poisson matrix, probabilities, odds calibration, red-team status, final probabilities, and post-match backtest fields.

## Boundaries

- Use data packets from the data collection agent as the factual base.
- Use tactical-agent findings as adjustment inputs, not as unsourced facts.
- Use betting odds as market signal, not as ground truth.
- Keep predictions probabilistic. Avoid certainty language.
- Label every derived value with inputs, timestamp, and confidence.

## Workflow

1. Define prediction target: match 1X2, expected goals, scoreline distribution, group qualification, group winner, knockout advancement, or tournament winner.
2. Check data readiness with `references/model-input-contract.md`. Mark missing or stale fields before modeling.
3. Build a `factor_inputs` table from verified data: strength, attack, defense, player state, injury, tactics, schedule/environment, and market fields.
4. Assign visible `factor_weights`; document defaults, overrides, and any double-counting guard.
5. Establish baseline strength from Elo, FIFA ranking, Opta/power ratings when available, squad value, and recent performance.
6. Adjust for match context: rest days, travel, climate, venue, host advantage, injuries, suspensions, likely rotation, tactical matchup, and motivation.
7. For final group-round matches, run a tournament-context layer: group-table snapshot, qualification scenarios, bracket-path expectation, same-group simultaneous-match dependency, rotation/yellow-card risk, and strategic tempo adjustment.
8. Convert team scores into `expected_goals` for each team.
9. Generate a Poisson score matrix from 0-0 through 5-5 and preserve higher-score tail probability.
10. Derive 1X2, totals, and top scorelines from the matrix.
11. Integrate market signal if requested:
   - convert odds to implied probabilities
   - remove bookmaker margin when enough outcomes are available
   - compare market probabilities with model probabilities
   - explain disagreement without recommending bets
12. Generate probabilities and confidence bands using the schema in `references/output-schemas.md`.
13. Run sanity checks: probabilities sum correctly, score-matrix mass is accounted for, extreme outputs are explained, stale inputs are flagged, and upset paths remain visible.
14. For post-match reviews, check whether the data collector has updated the participating teams' player-state files and member tables.
15. Produce handoff notes for verifier and lead analyst.

## Modeling Principles

- Prefer simple, explainable baselines before complex simulations.
- Treat national-team data as sparse and noisy.
- Downweight friendlies and mismatched opponent quality.
- Keep player availability separate from player reputation.
- Treat `form_status_1_5` and `internal_match_rating_1_5` as internal model inputs on a 1.0-5.0 scale with one decimal allowed. They are dynamic and must be updated through post-match backtests, not treated as fixed reputation scores.
- Model tournament path effects separately from team strength.
- Use Monte Carlo simulation for group and knockout paths when bracket dependencies matter.
- Preserve uncertainty when lineups, injuries, or tactical plans are unknown.
- Never output only a subjective score. Every match prediction needs a visible numeric chain from inputs to final probabilities.
- Use Poisson as the default scoreline engine unless the task explicitly requires a different documented model.
- Use red-team output to discount, revise, or hold final probabilities rather than hiding concerns in prose.

## Required Prediction Outputs

For match and round predictions, include:

- `factor_inputs`: both teams' raw and normalized inputs.
- `factor_weights`: weights for baseline, attack, defense, player state, injury, tactics, schedule/environment, and market factors.
- `team_strength_score`, `attack_score`, `defense_score`.
- `player_state_adjustment`, `injury_adjustment`, `tactical_matchup_adjustment`, `schedule_environment_adjustment`, `market_adjustment`.
- `third_round_context` when applicable: group table, qualification state, bracket-path expectation, rotation/yellow-card risk, simultaneous-match dependency, strategic tempo adjustment, and simulated group outcomes.
- `expected_goals`: pre-market and final xG if market calibration changes it.
- `poisson_score_matrix`: 0-0 through 5-5 plus `tail_probability`.
- `probabilities_1x2`: team A win, draw, team B win.
- `totals_probabilities`: at minimum over/under 2.5 when relevant; add other totals if requested.
- `top_scorelines`: five most likely scores with probabilities.
- `odds_implied_probability` and `model_market_delta` when odds are included.
- `confidence_interval` or uncertainty band for 1X2 and xG.
- `red_team_status`: `pending`, `pass`, `revise`, or `hold`.
- `final_probabilities`: after red-team and market-risk treatment.
- `player_state_update_status`: `updated`, `partial`, or `blocked` for post-match/backtest work.
- `player_state_updates`: key player-state changes that materially affect the next model run, including per-player `internal_match_rating_1_5` and updated `form_status_1_5` where applicable.
- `postmatch_error` and `parameter_updates` in post-match/backtest files.

## Output Contract

Return:

- `model_scope`: prediction target and covered teams/matches.
- `input_readiness`: available inputs, stale inputs, missing inputs, and uncertainty flags.
- `method`: baseline model, adjustments, odds treatment, and formulas.
- `quantitative_chain`: factor inputs, weights, xG, Poisson matrix, derived probabilities, and market deltas.
- `probabilities`: structured probability outputs.
- `sensitivity`: which assumptions move the result most.
- `market_comparison`: if odds are included.
- `backtest_fields`: actual result, probability error, score error, and parameter updates when reviewing completed matches.
- `player_state_backtest_link`: whether match minutes, `form_status_1_5`, `internal_match_rating_1_5`, injuries, cards, and rating notes were pushed back into player_state/member-table files.
- `quality_notes`: calibration risks, sample-size warnings, and next checks.
- `handoff_notes`: what verifier or lead analyst should challenge.

Use `references/output-schemas.md` for JSON-compatible shapes.

## Betting-Plan Backtest Support

Do not give betting advice. When reviewing a previous betting discussion after real results are known, help the main thread separate football-model errors from ticket-construction errors.

Required diagnostic categories:

- `model_direction_error`: the predicted 1X2 direction or non-loss direction failed.
- `model_tail_error`: the direction was right but the margin, exact score, heavy-tail scoreline, red-card effect, rotation effect, or late substitution scoring tail was too low.
- `draw_floor_error`: the model underweighted a low-event or qualification-sufficient draw.
- `bet_translation_error`: the model identified a path such as 0-0 or 1-1, but the betting ticket omitted it.
- `portfolio_structure_error`: the leg was plausible in isolation but lost because it was bound into an overcorrelated or overleveraged parlay.

For scoreline and handicap-related backtests, report `covered_scorelines`, `uncovered_model_scorelines`, `tail_loss_paths`, and `ticket_settlement_probability_gap` whenever possible. Never claim the model was correct merely because the match winner was correct; ticket settlement is a separate layer.

## Output Discipline

For World Cup work, choose the output size based on the user's current request and the reusable value of the result. Write durable model packets, probability JSON, and reusable reports to local files when they need to persist, but do not force skeleton-first file creation or smallest-loop batching as a mandatory workflow. Before updating existing files, check whether valid content already exists and preserve it. Subagent outputs should be summarized into key conclusions, quantitative deltas, and handoff notes unless the user asks for full detail.
