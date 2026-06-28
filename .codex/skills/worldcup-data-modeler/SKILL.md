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
10. Derive 1X2, totals, top scorelines, and scoreline clusters from the matrix.
11. Run the scoreline diversity check: when team strength and xG are close, do not let `1-1` become the only useful score story by default. Separate `1-1` from low-event draws, open draws, one-goal edge wins, and volatility tails.
12. For knockout matches, run the big-score tail check: expose strong-favorite breakthrough, open shootout, weak-team collapse, and late-game chase tails when the matrix and tactical evidence justify them.
13. Integrate market signal if requested:
   - convert odds to implied probabilities
   - remove bookmaker margin when enough outcomes are available
   - compare market probabilities with model probabilities
   - explain disagreement without recommending bets
14. Generate probabilities and confidence bands using the schema in `references/output-schemas.md`.
15. Run sanity checks: probabilities sum correctly, score-matrix mass is accounted for, extreme outputs are explained, stale inputs are flagged, and upset paths remain visible.
16. For post-match reviews, check whether the data collector has updated the participating teams' player-state files and member tables.
17. Produce handoff notes for verifier and lead analyst.

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
- Treat the highest exact scoreline as a thin slice of the distribution, not as the match story. If close-strength teams repeatedly produce `1-1` as Top1, publish scoreline clusters and explain whether the match is actually low-event, open, one-goal-edge, or high-volatility.

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
- `raw_poisson_top_scorelines`: five highest exact scores directly from the Poisson matrix before any scoreline diversity treatment.
- `adjusted_top_scorelines`: final report ranking after scoreline diversity, 1X2 direction, xG gap, total-xG band, and tactical volatility are considered.
- `final_adjusted_top_scoreline`: the single scoreline used in the user-facing conclusion, with a reason and confidence label.
- `scoreline_clusters`: low-event draw, balanced one-goal, open draw, favorite-edge, underdog-edge, and volatility-tail clusters when relevant.
- `scoreline_diversity_layer`: trigger status, xG gap, total-xG band, tempo profile, 1-1 overconcentration flag, and redistribution note.
- `knockout_big_score_tail_layer`: knockout-only trigger status, tail visibility level, guardrails, and reason.
- `big_score_tail_paths`: strong-team breakthrough, open shootout, weak-team collapse, and late-game chase paths with raw matrix probabilities.
- `margin_bands`: one-goal, two-goal, three-plus margin, draw, total-goals 4+ and both-teams-2+ bands.
- `late_game_tail_note`: conditional explanation for 60-minute chase, early goal, red-card, set-piece, penalty, goalkeeper, and substitution-state tails.
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

## Scoreline Diversity Layer

Use this layer whenever:

- team strength gap is small, normally under 8 points on a 0-100 internal scale
- final xG gap is under 0.35
- raw Poisson places `1-1` first by less than 2.5 percentage points over nearby scores
- total xG is between 2.2 and 3.2
- tactical evidence does not clearly support a locked low-event match

Required treatment:

- Keep the raw Poisson probabilities visible.
- Do not manually remove `1-1`; mark it as the central draw slice.
- Do not leave the report's final Top5 locked to raw Poisson order when `1-1` is only a thin central slice. Preserve it in `raw_poisson_top_scorelines`, then generate `adjusted_top_scorelines` and `final_adjusted_top_scoreline`.
- If the aggregate 1X2 leader and xG direction point to a narrow win, and the `1-1` margin over an adjacent one-goal win is small, the final display should prefer the adjacent one-goal win while keeping `1-1` as the leading draw path.
- Add clusters:
  - `low_event_draw_cluster`: usually 0-0 and 1-1
  - `balanced_one_goal_cluster`: 1-0, 0-1, 2-1, 1-2
  - `open_draw_cluster`: 2-2 and sometimes 3-3
  - `favorite_edge_cluster`: favorite one-goal and two-goal wins
  - `underdog_edge_cluster`: underdog one-goal wins
  - `volatility_tail_cluster`: 3-2, 2-3, 3-1, 1-3 and higher tails when tactical volatility exists
- If `1-1` is Top1 but the 1X2 leader is a narrow win under 45-48%, label the match as dual-path rather than presenting one score as the clear prediction.
- If both teams have high transition or set-piece volatility, shift the narrative from `1-1 default` to `open balanced game`; raise 2-1/1-2/2-2 cluster visibility before changing 1X2 headline.

Use `references/output-schemas.md` for JSON-compatible shapes.

## Knockout Big-Score Tail Layer

Use this layer for knockout matches when the central scoreline looks too compressed but the matrix, tactical factors, or game-state logic support a visible upper tail.

Trigger candidates:

- favorite 1X2 probability is normally at least 55% and xG gap is at least 0.75
- favorite xG is at least 1.85 with a clear strength or matchup edge
- total xG is at least 2.90, over 2.5 is at least 56%, or BTTS/open-game signal is at least 56%
- tactical evidence shows high press break risk, transition depth, wide-channel mismatch, set-piece/penalty volatility, goalkeeper or centre-back error risk, or aggressive late substitutions
- knockout game-state creates a chase tail after roughly 60 minutes when the trailing team must open the match

Required treatment:

- Keep raw Poisson, xG, 1X2, totals, and `final_adjusted_top_scoreline` unchanged unless a full model rerun explicitly justifies changing them.
- Add `knockout_big_score_tail_layer` with `trigger_status`, `tail_visibility_level` (`high`, `medium`, `low`, or `not_triggered`), `reason`, and `red_team_guardrails`.
- Add `big_score_tail_paths`:
  - `strong_team_breakthrough_path`: 3-0, 3-1, 4-0, 4-1, and related favorite-score expansion
  - `open_shootout_path`: 2-2, 3-2, 2-3, 3-3, and transition-heavy scorelines
  - `weak_team_collapse_path`: three-plus margin favorite wins
  - `late_game_chase_tail`: scores created by late risk-taking after the first goal or trailing state
- Add `margin_bands` from the matrix where possible.
- High visibility may enter the Markdown conclusion as a tail-path table. Medium visibility belongs in sensitivity/risk sections. Low visibility should stay in JSON or a short quality note.
- Do not promote exact big scores into betting language or the main scoreline unless T-75 official lineups, fresh availability, market context, and red-team review all allow a full rerun.

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
