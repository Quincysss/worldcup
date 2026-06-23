---
name: worldcup-quant-prediction-system
description: Run the K:\worldcup project as a quantitative 2026 FIFA World Cup prediction system. Use for match predictions, round predictions, group qualification probabilities, knockout paths, post-match backtests, model calibration, odds-implied probability comparison, Poisson score matrices, and final probability reports. Do not use for single-team profile work unless the user explicitly asks to predict.
---

# World Cup Quant Prediction System

## Mission

Make every prediction in `K:\worldcup` follow one reproducible quantitative chain:

```text
data collection
-> factor input table
-> weighted scoring
-> expected goals
-> Poisson score matrix
-> 1X2 / totals / score probabilities
-> odds-implied probability calibration
-> red-team risk adjustment
-> final prediction output
-> post-match backtest, player-state update, and parameter update
```

This skill is the system-level contract for prediction, projection, and backtest work. It coordinates the specialist skills; it does not replace their boundaries.

## Use When

- The user asks for a match prediction, round prediction, group qualification projection, knockout path, or champion probability.
- The user asks to compare model probability with odds or market movement.
- The user asks to review a past prediction, backtest a round, tune parameters, or adjust the model after match results.
- The main thread needs a standard output schema for probability work.

## Do Not Use When

- The user only asks to build or repair a team profile, roster, member table, injury file, or tactical dossier.
- The current stage is `team_profile` and no prediction, projection, or model calibration was requested.
- Required facts are missing. Route first to `worldcup-data-collector`.

## Required Pipeline

1. Data collection package.
2. Factor input table.
3. Weighted scoring.
4. Expected goals.
5. Poisson score matrix.
6. 1X2, totals, and score probabilities.
7. Odds-implied probability calibration.
8. Red-team risk adjustment.
9. Final prediction output.
10. Post-match backtest, player-state update, and parameter update.

## Real Thread Participation Gate

For match prediction, round prediction, post-match review, betting analysis, or model calibration, the main thread must call the real project role threads instead of simulating them locally.

Required lanes:

- data collector: facts, lineups, injuries, odds snapshots, event logs, source gaps
- tactics coach: matchup, shape, pressing, transition, set-piece, substitution interpretation
- data modeler: factor table, xG/Poisson/probability math, backtest, parameter update
- red-team verifier: contradiction checks, market-risk checks, hold/revise verdict
- summary/commentator: final user-facing Markdown from accepted inputs

竞彩 or投注 tasks additionally require the betting-risk thread. Git sync is only used when the user asks for commit, push, sync, or migration work.

A task is not complete until `线程状态.md` records the dispatched thread IDs, output paths, validation results, and either `complete` or a documented `partial_thread_fallback`. Fallback is allowed only when thread tooling is unavailable or a thread is blocked; it must not be presented as a full multi-thread result.

## Standard Output Fields

Prediction, projection, and backtest JSON should include these fields when applicable:

- `factor_inputs`
- `factor_weights`
- `team_strength_score`
- `attack_score`
- `defense_score`
- `player_state_adjustment`
- `injury_adjustment`
- `tactical_matchup_adjustment`
- `schedule_environment_adjustment`
- `market_adjustment`
- `expected_goals`
- `poisson_score_matrix`
- `probabilities_1x2`
- `totals_probabilities`
- `odds_implied_probability`
- `model_market_delta`
- `red_team_status`
- `final_probabilities`
- `player_state_update_status`
- `player_state_updates`
- `postmatch_error`
- `parameter_updates`

If a field is not applicable, set it to `null` and explain why in `quality_notes` or `gaps_and_conflicts`. Do not silently omit core fields from a prediction file.

## Factor Guidance

Use stable, documented factors and keep weights visible. Typical factor groups:

- baseline strength: Elo/power rating, FIFA ranking, recent competitive performance, squad value
- attack: chance creation, xG, shot quality, finishing signal, set-piece threat
- defense: xGA, box protection, transition defense, goalkeeper signal, set-piece defense
- player state: `form_status_1_5` on a 1.0-5.0 scale with one decimal allowed, recent `internal_match_rating_1_5`, minutes load, key player availability, role continuity
- tactical matchup: press resistance, wide/central advantage, transition edge, defensive-line risk
- schedule/environment: rest days, travel, climate, altitude, venue, host or crowd context
- market: odds-implied probability, line movement, overround-adjusted market baseline

Avoid double counting. If a player absence is already reflected in attack score, do not also apply a full injury penalty without documenting the overlap.

## Poisson Requirements

- Convert expected goals into a score matrix from 0-0 to 5-5.
- Preserve tail probability for scores above 5.
- Derive 1X2 and totals from the matrix, not from a separate unsupported estimate.
- List the top five scorelines with probabilities.
- Explain any manual adjustment away from the raw matrix.

## Odds Boundary

Odds are calibration and risk signals, not betting instructions.

Before any executable betting language, all gates must be satisfied:

- T-75m official lineups.
- Latest injury, suspension, and minutes-risk check.
- Official竞彩 odds if竞彩 is discussed.
- Same-source 1X2, handicap, and totals snapshot with capture time.
- Red team verdict is not `hold` or `revise`.

Until then, output only `hold`, `discussion_only`, or risk observations. Never use wording such as `主推`, `稳胆`, `包赢`, `重注`, `梭哈`, or `必买`.

## File Discipline

- Create skeleton files before long calculations.
- Write long reports to Markdown/JSON, not chat.
- Validate JSON parse, probability sums, matrix totals, and encoding before reporting.
- After a match, append backtest results, player-state updates, per-player `internal_match_rating_1_5` logs, and parameter updates to local files and `线程状态.md`.
- A post-match review is not complete until it updates or explicitly blocks updates to `data/outputs/player_state/{team-slug}-player-state.json` and the team's `成员表.md`.
