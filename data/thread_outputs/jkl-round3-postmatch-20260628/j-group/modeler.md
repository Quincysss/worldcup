# J Group Round 3 Model Backtest And Parameter Iteration

Status: `completed_model_backtest_partial_player_state`. Scope is only Algeria vs Austria and Jordan vs Argentina. This is a model backtest, not betting advice.

## Result Hit Table

| Match | Pre-match xG | Actual score | Primary 1X2 hit | Actual bucket probability | Brier | Log loss | Top3 score | Top5 score | Totals direction |
|---|---:|---:|---|---:|---:|---:|---|---|---|
| Algeria vs Austria | 1.14-1.31 | 3-3 | miss | 33.0% | 0.67415 | 1.108663 | miss | miss | U2.5 miss / U3.5 miss |
| Jordan vs Argentina | 0.56-1.95 | 1-3 | hit | 64.0% | 0.2016 | 0.446287 | miss | miss | U2.5 miss / U3.5 miss |

## Match Diagnosis

### Algeria vs Austria

- Actual score: 3-3. Pre-match primary direction: away_win. Actual outcome probability: 33.0%.
- Scoreline layer: actual-score matrix probability 0.8%, rank 18 inside the 0-0 to 5-5 matrix; Top3=miss, Top5=miss.
- xG error: home 1.86, away 1.69, total goals 3.55.
- Market calibration: market_draw_signal_helped; model underweighted draw relative to market by about 9.0 pp; handicap/margin layer: market priced Algeria +1 protection higher than model; actual landed inside that protection bucket.
- postmatch_error: The published probability kept draw at 33.0%, but the primary direction remained Austria by a narrow margin. Actual 3-3 exposed a correct draw warning with a badly missed event/score shape.
- factor_error: Market draw no-vig probability was about 42.0%, much higher than model draw 33.0%; market calibration should have carried more draw-floor weight. High press and transition danger were captured, but late set-piece/second-ball volatility was capped too tightly. Algeria attacking individual quality and Austria set-piece depth both mattered more in late-game chaos than the low-event base assumed.
- score_tail_error: high; 3-3 sat far outside Top5 and carried only about 0.8% matrix mass. The model underweighted six-goal mutual-qualification chaos and stoppage-time exchange paths.
- draw_floor_error: medium; Draw risk was identified but not enough to become the primary published direction despite market and qualification incentives. This is less a missing draw floor than an underweighted draw-floor plus high-event draw branch.
- third_round_context_error: high; The model treated draw incentives mostly as low-event control. In reality the same incentive coexisted with late group-table volatility, causing a high-event draw rather than a sterile draw.

### Jordan vs Argentina

- Actual score: 1-3. Pre-match primary direction: away_win. Actual outcome probability: 64.0%.
- Scoreline layer: actual-score matrix probability 5.6%, rank 7 inside the 0-0 to 5-5 matrix; Top3=miss, Top5=miss.
- xG error: home 0.44, away 1.05, total goals 1.49.
- Market calibration: ordinary 1X2 was missing in the released same-source packet, so 1X2 market calibration could not be tested; handicap/margin layer: handicap margin market was close to the model exact two-goal bucket and the actual result hit that bucket.
- postmatch_error: Argentina win direction hit clearly, but 1-3 missed Top5 and the model leaned too low on total goals and BTTS.
- factor_error: Ordinary 1X2 market was missing, but handicap +2 draw was close to model and actual margin; the margin layer was more informative than the totals layer. Jordan low block and Argentina rotation were recognized, but Argentina elite depth and set-piece/substitution ceiling were over-discounted. Jordan still had enough transition/set-piece quality for one goal, while Argentina rotation did not remove the third-goal ceiling.
- score_tail_error: medium; 1-3 carried about 5.6% matrix mass but fell outside Top5. The model had Argentina 0-3 in Top3 and 1-2 in Top5, but did not connect Jordan scoring with Argentina still reaching three.
- draw_floor_error: low; The draw floor was not the failure; if anything the red-team/rotation layer held draw at 24.0% while actual match confirmed Argentina superiority.
- third_round_context_error: medium; The model correctly reduced runaway blowout risk versus a fully motivated favorite, but over-applied rotation deceleration and underweighted elite bench/set-piece scoring.

## Parameter Updates

- `round3_mutual_qualification_draw_floor`: +0.02 to +0.04 draw probability when draw materially benefits both teams or market draw no-vig exceeds model by at least 0.07.; cap/scope: single parameter shift <= 0.04; do not force draw if one side must win by multi-goal margin.; reason: Algeria-Austria finished draw and market draw signal was materially higher than the model.
- `round3_late_event_volatility_tail`: +0.03 to +0.06 redistributed from 0-0/1-0/0-1/1-1 cluster into 3+ total and 4+ total tail when simultaneous table state can flip late.; cap/scope: combined pre-red-team shift <= 0.10 across context, totals, and tail layers.; reason: Algeria-Austria 3-3 showed late mutual-qualification chaos; Jordan-Argentina 1-3 also beat the under baseline.
- `elite_favorite_rotation_ceiling`: +0.04 to +0.08 to favorite scoring-tail only when squad-depth score >= 80 and elite substitutes/set-piece takers remain available.; cap/scope: do not raise base win probability by more than 0.03 from this parameter alone.; reason: Argentina rotation did not prevent a three-goal output; elite depth kept the ceiling alive.
- `underdog_live_goal_btts_floor`: +0.02 to +0.04 BTTS yes when underdog has transition/set-piece path and favorite rotation lowers defensive continuity.; cap/scope: BTTS yes floor normally <= 0.42 unless underdog xG >= 0.75.; reason: Jordan scored despite Argentina control; Algeria also exceeded its scoring mean strongly.
- `under_2_5_confidence_cap_final_round`: cap under_2_5 published confidence at 0.58 unless both teams have static draw incentive, low transition pace, and no late table dependency.; cap/scope: confidence cap, not direct probability inflation.; reason: Both J matches beat O2.5/O3.5 while model leaned under.
- `market_calibration_split_draw_vs_margin`: separate draw-floor calibration from exact-margin/handicap calibration; never let +2 or +1 handicap replace ordinary 1X2.; cap/scope: schema/algorithm change; no direct probability shift.; reason: Algeria-Austria market draw helped 1X2; Jordan-Argentina handicap +2 draw helped margin, while ordinary 1X2 was missing.

## Player-State Link

Status: `partial`. Data collector postmatch packet and 2026-06-28 player_state/member-table updates were not present at model runtime; four player_state files predate this matchday.

Missing inputs: official full lineups and minutes, substitutions, cards, event log, four-team internal_match_rating_1_5 entries, and member-table postmatch append rows.

Sources used: Guardian live reports for both matches, Times of India report for Algeria 3-3 Austria, and the local pre-match prediction JSON/Markdown.
