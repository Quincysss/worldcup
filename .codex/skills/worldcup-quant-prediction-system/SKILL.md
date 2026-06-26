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
-> third-round tournament-context simulation when applicable
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
4. Third-round tournament-context simulation when the match is a final group-round fixture.
5. Expected goals.
6. Poisson score matrix.
7. 1X2, totals, and score probabilities.
8. Odds-implied probability calibration.
9. Red-team risk adjustment.
10. Final prediction output.
11. Post-match backtest, player-state update, and parameter update.

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
- `third_round_context`
- `group_table_snapshot`
- `qualification_scenarios`
- `motivation_profile`
- `bracket_path_expectation`
- `rotation_risk`
- `yellow_card_suspension_risk`
- `strategic_tempo_adjustment`
- `third_round_context_adjustment`
- `simulated_group_outcomes`
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

## Third-Round Prediction Layer

For final group-round matches, add a separate `third_round_context` layer before xG and Poisson. This layer must not replace base strength, player state, tactics, or market calibration; it explains how tournament incentives alter tempo, rotation, and risk appetite.

Required third-round checks:

- current group table: points, goal difference, goals scored, head-to-head or official tiebreakers, fair-play status when relevant
- qualification state: must-win, draw-enough, already-qualified, first-place race, second-place race, third-place/32-team-table dependency, theoretical-only, or eliminated
- simultaneous-match dependency: how the other group match can change late-game incentives
- bracket-path expectation: likely round-of-32 opponent strength by finishing position, rest/travel/venue effects, and uncertainty level
- rotation and minutes management: key-player rest risk, yellow-card suspension risk, injury protection, and coach tendency
- strategic tempo: draw-incentive, goal-difference chase, low-event mutual benefit, or late-game risk escalation
- market interaction: whether odds already price motivation or rotation; cap duplicate market and context adjustments

Default factor-weight guidance for third-round predictions:

- baseline strength: 22-28%
- attack/defense recent signal: 18-24%
- player state, injury, and rotation: 18-22%
- tactical matchup: 10-14%
- schedule/environment: 6-8%
- third-round tournament context: 12-18%
- market calibration: 8-12%

Move weight between buckets only with a short reason. Increase tournament context when qualification incentives are sharp; increase rotation weight when a team is already qualified or protecting suspended/injured starters.

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

## Betting Portfolio Standard

When the user asks for China Sports Lottery betting portfolio ideas, default to eight discussion-only plans:

- 2 conservative-tolerant plans.
- 3 balanced-combination plans.
- 3 aggressive-combination plans.

Use a single-plan budget of 100 RMB unless the user changes it. Keep the default split at 70 RMB main allocation and 30 RMB entertainment allocation. Report ticket cost, odds product, maximum theoretical payout, theoretical net return, breakpoints, and red-team risk for each plan.

Target odds-structure return bands:

- Conservative-tolerant: theoretical net return around 150 RMB.
- Balanced-combination: theoretical net return around 200 RMB.
- Aggressive-combination: theoretical net return around 300 RMB or above.

These targets are portfolio design constraints, not profit claims. If odds availability makes a band impossible without excessive variance, say so and lower confidence rather than forcing high-variance markets into the main allocation. Score, half/full-time, exact margin, 3-leg or larger parlays, 4x4, and 4x11 must be clearly marked as high variance and kept out of conservative main allocations.

### Correlation And Path-Coverage Gates

Before presenting any betting portfolio, build a path-coverage matrix for the core matches. For two core matches, explicitly check at least: A draw + B win, A win + B draw, A one-goal win + B two-plus-goal win, A two-plus-goal win + B one-goal win, both win, both draw, and each favorite failing to cover the handicap.

Portfolio limits:

- Any single match should not carry more than 30% of the total stake unless the output is marked `discussion_only` with a clear concentration warning.
- Any two core focus matches should not carry more than 45% of the total stake.
- Narrow paired-path tickets such as double draw, double one-goal win, or double two-plus-goal win should total no more than 10-15% of the stake.
- A handicap win and a draw may overlap logically; do not count them as independent heavy insurance without documenting the overlap.
- 3-leg or larger tickets must not add leverage to an already-heavy main narrative unless they provide independent hedge value.

Report maximum theoretical payout, scenario-compatible minimum return, blind spots, and the specific paths that make the portfolio shrink. Maximum payout must be calculated only from mutually compatible ticket outcomes. If a probability-relevant path can kill most of the main allocation, revise the portfolio before presenting it as anything stronger than `discussion_only`.

When the user flags correlation or overexposure, first acknowledge the risk, rebuild the portfolio tree, and recalculate payout coverage. Do not fix correlation risk by simply adding one more ticket or swapping to an equivalent leg.

### Prediction-Bet Alignment Gate

Before presenting any executable or discussion-only betting ticket, map every leg back to the model output that supports it:

- `model_direction`: the model's preferred 1X2, handicap, totals, score cluster, or margin band.
- `selected_bet`: the actual China Sports Lottery market and pick.
- `relationship`: `aligned`, `value_override`, `hedge`, or `conflict`.
- `reason`: why this leg belongs in the portfolio.

Main allocation legs must be `aligned` with the model's preferred direction or marked as a documented `value_override` where the model-market delta is positive after odds calibration. A leg that conflicts with the model direction can only be a small hedge; it must not be described as main, conservative, insurance, or banker.

Translate handicap markets into actual score conditions before using them. For example, `Uruguay (+1) win` means Uruguay win or draw in the real match; `Uruguay (+1) draw` means Spain win by exactly one goal; `Uruguay (+1) loss` means Spain win by two or more goals. If the model says Spain win/draw is the higher-probability direction, `Uruguay (+1) win` is not aligned and must be removed from the main allocation or clearly capped as an upset hedge.

Default stake caps for model-conflict hedges:

- one conflicting hedge ticket: no more than 8-10% of the portfolio
- all conflicting hedge tickets combined: no more than 15-20% of the portfolio
- no conflicting hedge ticket may be included in the return floor or described as safety coverage

Every portfolio table should include a short consistency column or note. If more than one core leg is marked `conflict`, the portfolio must be rebuilt before presentation.

## File Discipline

- Write reusable prediction, review, and backtest artifacts to Markdown/JSON when they need to persist beyond the chat.
- Do not force skeleton-first file creation, smallest-loop batching, or chat suppression as mandatory workflow steps.
- Validate JSON parse, probability sums, matrix totals, and encoding before reporting.
- After a match, append backtest results, player-state updates, per-player `internal_match_rating_1_5` logs, and parameter updates to local files and `线程状态.md`.
- A post-match review is not complete until it updates or explicitly blocks updates to `data/outputs/player_state/{team-slug}-player-state.json` and the team's `成员表.md`.
