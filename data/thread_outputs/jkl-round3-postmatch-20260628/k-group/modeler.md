# K Group Round 3 Model Backtest And Parameter Iteration

Status: `completed_model_backtest_partial_player_state`. Scope is only Colombia vs Portugal and DR Congo vs Uzbekistan. This is not betting advice.

## Result Hit Table

| Match | Pre-match xG | Actual score | Primary 1X2 hit | Actual bucket probability | Brier | Log loss | Top3 score | Top5 score | Totals direction |
|---|---:|---:|---|---:|---:|---:|---|---|---|
| Colombia vs Portugal | 1.18-1.48 | 0-0 | miss | 26.1% | 0.835926 | 1.343235 | miss | miss | U2.5 hit / U3.5 hit |
| DR Congo vs Uzbekistan | 1.48-0.98 | 3-1 | hit | 50.0% | 0.37505 | 0.693147 | miss | miss | U2.5 miss / U3.5 miss |

## Match Diagnosis

### Colombia vs Portugal

- Actual score: 0-0. Pre-match primary direction: away_win. Actual outcome probability: 26.1%.
- Scoreline layer: actual-score matrix probability 7.0%, rank 7; Top3=miss, Top5=miss.
- xG error: home 1.18, away 1.48, total goals 2.66.
- Market calibration: Market also made Portugal the favorite, but its draw probability was slightly above the model; favorite lean misled the primary direction while draw signal was usable.; handicap/margin layer: Handicap layer supported Colombia protection more than the ordinary 1X2 direction; actual landed inside the protected bucket..
- postmatch_error: The model and market leaned Portugal, while the actual 0-0 rewarded Colombia draw-enough control and low-event suppression.
- factor_error: Market favorite signal was absorbed more than the draw/control signal; draw no-vig was close to model but still not enough to offset Portugal direction. Colombia game-management, defensive compactness, and Portugal frustration against a draw-enough opponent were underweighted. Portugal attacking names were over-counted relative to actual chance conversion and Colombia defensive state.
- score_tail_error: medium_high; 0-0 was outside Top5 despite a 7.0% matrix probability. The low-event clean draw branch should have been more visible for a leader needing only a draw.
- draw_floor_error: high; This is a clean draw-floor miss: group context and market both supported draw risk, but primary direction stayed with Portugal.
- third_round_context_error: high; The model read Portugal must-win pressure as attacking edge, but did not sufficiently model Colombia slowing the game once a draw protected first place.

### DR Congo vs Uzbekistan

- Actual score: 3-1. Pre-match primary direction: home_win. Actual outcome probability: 50.0%.
- Scoreline layer: actual-score matrix probability 4.5%, rank 9; Top3=miss, Top5=miss.
- xG error: home 1.52, away 0.02, total goals 1.54.
- Market calibration: Market was slightly stronger than the model on DR Congo win and helped the direction layer.; handicap/margin layer: Market priced the two-plus margin higher than the model; actual confirmed that the model underweighted the cover tail..
- postmatch_error: DR Congo win direction hit, but 3-1, over 2.5, over 3.5, and -1 cover tail were underweighted.
- factor_error: Market was closer on DR Congo win and two-plus margin than the model, so market calibration helped but was not absorbed enough into margin/tail. Must-win aggression and Uzbekistan open-game vulnerability were capped too tightly after a low-event first-cluster baseline. Uzbekistan defensive fragility and DR Congo second-half attacking lift were underweighted; Uzbekistan still retained enough attack for one goal.
- score_tail_error: medium_high; 3-1 sat outside Top5 with about 4.5% mass. The model covered 2-1 but did not push enough probability into the must-win 3-goal home tail.
- draw_floor_error: low; Draw floor was not the miss; both teams needed wins and the actual game confirmed a lower draw relevance than the 25.5% published draw.
- third_round_context_error: medium_high; The model identified DR Congo must-win context, but did not sufficiently convert it into second-half acceleration, Uzbekistan collapse exposure, and two-plus margin probability.

## Parameter Updates

- `draw_enough_leader_control_bonus`: +0.03 to +0.05 draw probability and +0.02 to +0.04 0-0/1-1 cluster when a group leader secures first place with draw and has strong defensive control.; cap/scope: single shift <= 0.05; do not apply when opponent scores early or leader must improve goal difference.; reason: Colombia 0-0 Portugal was a clean draw-enough control outcome.
- `must_win_favorite_attack_discount_vs_control_opponent`: -0.05 to -0.10 favorite xG when must-win favorite faces an opponent whose draw is strategically sufficient and defensive score >= 75.; cap/scope: do not reduce favorite win probability by more than 0.04 from this parameter alone.; reason: Portugal pressure did not translate into enough chance quality against Colombia.
- `low_event_draw_floor_market_alignment`: +0.02 to +0.04 draw and low-score matrix mass when market draw probability is close to or above model draw and context supports low risk.; cap/scope: combined draw/context shift <= 0.08.; reason: Market draw signal in Colombia-Portugal was usable but underweighted.
- `must_win_second_half_acceleration_tail`: +0.04 to +0.06 into 3-0/3-1/4-1 tail when a stronger team must win for qualification and opponent is theoretical-only or structurally exposed.; cap/scope: tail redistribution, not more than +0.03 to 1X2 direction unless market agrees.; reason: DR Congo 3-1 Uzbekistan exposed a missing second-half tail.
- `weak_defense_late_collapse_risk`: +0.03 to +0.05 two-plus-margin bucket against teams with severe negative goal difference and prior multi-goal concessions.; cap/scope: only active after pre-match defensive fragility and game-state pressure both trigger.; reason: Uzbekistan entered with heavy defensive damage and conceded the two-goal margin.
- `btts_floor_when_trailing_underdog_must_attack`: +0.02 to +0.04 BTTS yes when underdog has a named striker/transition route and must chase after conceding.; cap/scope: BTTS floor normally <= 0.52 unless underdog xG >= 0.80.; reason: Uzbekistan still scored in a game where DR Congo cover tail hit.
- `market_calibration_split_1x2_vs_handicap`: schema/algorithm split: evaluate ordinary 1X2 favorite signal separately from handicap protection or cover signal.; cap/scope: no direct probability shift.; reason: Colombia +1 protection and DR Congo -1 cover signals were more informative than ordinary 1X2 alone.

## Player-State Link

Status: `partial_not_checked_for_update_in_this_model_only_run`. The user requested model backtest output only; data-thread player-state normalization is not assumed complete here.
