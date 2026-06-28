# Round32 M73-M76 v3 Modeler Output

Updated: 2026-06-28T23:59:55+08:00

Status: completed_partial_source_limited_data_and_tactics_absorbed. Data collector predicted lineups and tactics-coach ten-factor matchup package are absorbed. Official T-75 lineups and complete same-source odds are still missing. This file is probability modeling only and contains no betting advice.

## Input Readiness

- data_collector_json: available_partial_source_limited
- tactics_coach_json: available_partial_source_limited_ten_factor_matchups_absorbed
- predicted_lineups: data_collector_predicted_lineups_probable_not_official, 11/11 each team
- official_lineups: not_available_yet until T-75 gate
- odds_snapshot: complete same-source odds missing or incomplete
- red_team_status: pending

## Probability Summary

| Match | xG | Team A win | Draw | Team B win | Over 2.5 | BTTS yes | Home 4+ goals | Top scorelines |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| M73 South Africa vs Canada | 1.08-1.34 | 30.1% | 27.2% | 42.6% | 43.5% | 48.8% | 2.4% | 1-1 12.9%; 0-1 11.9%; 1-0 9.6%; 0-0 8.9%; 1-2 8.6% |
| M74 Germany vs Paraguay | 2.10-0.78 | 67.9% | 19.3% | 12.7% | 54.9% | 47.5% | 16.1% | 2-0 12.4%; 1-0 11.8%; 2-1 9.7%; 1-1 9.2%; 3-0 8.7% |
| M75 Netherlands vs Morocco | 1.48-1.12 | 45.5% | 25.9% | 28.7% | 48.2% | 52.0% | 6.3% | 1-1 12.3%; 1-0 11.0%; 2-1 9.1%; 0-1 8.3%; 2-0 8.1% |
| M76 Brazil vs Japan | 1.92-1.08 | 56.9% | 22.1% | 21.0% | 57.7% | 56.4% | 12.9% | 1-1 10.3%; 2-1 9.9%; 1-0 9.6%; 2-0 9.2%; 3-1 6.3% |

## Match Details

### M73 South Africa vs Canada

Date/venue: 2026-06-28, Los Angeles Stadium, Los Angeles.

xG: 1.08-1.34. 1X2: South Africa 30.1%, draw 27.2%, Canada 42.6%.

Totals: over 2.5 43.5%, under 2.5 56.5%, BTTS yes 48.8%.

Top5 scorelines: 1-1 12.9%, 0-1 11.9%, 1-0 9.6%, 0-0 8.9%, 1-2 8.6%.

Lineups: data-collector probable_not_official. Counts: South Africa 11/11, Canada 11/11.

- South Africa (3-4-2-1): Ronwen Williams, Nkosinathi Sibisi, Ime Okon, Mbekezeli Mbokazi, Khuliso Mudau, Aubrey Modiba, Teboho Mokoena, Jayden Adams, Oswin Appollis, Thalente Mbatha, Lyle Foster.
- Canada (3-4-2-1): Maxime Crépeau, Alistair Johnston, Moïse Bombito, Derek Cornelius, Tajon Buchanan, Alphonso Davies, Stephen Eustáquio, Nathan Saliba, Jonathan David, Cyle Larin, Promise David.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical ten-factor absorption: Tactics ten-factor layer raises South Africa low-event/set-piece and late-resilience branch while capping Canada transition upside for Davies/Eustaquio/Kone uncertainty.

Tail shape: {"draw_floor_dynamic":{"triggered":true,"probability_floor":0.27,"applied_note":"Low-event South Africa shell plus Canada availability cap supports a higher draw/one-goal-game floor through lower total xG and closer xG gap."},"event_volatility_layer":{"triggered":true,"tail_note":"Canada first-goal script can raise event volume, but base matrix keeps conservative low-event mass."},"favorite_ceiling_tail":{"triggered":false,"note":"No favorite-ceiling expansion; Canada edge is conditional."}}

Adjustments:

- player_state_adjustment: {"team_a_xg_delta":-0.02,"team_b_xg_delta":0.05,"note":"Derived from local player_state/model-brief fallback; capped for missing upstream."}
- injury_adjustment: {"team_a_xg_delta":0,"team_b_xg_delta":-0.04,"note":"No fresh data-thread injury packet; conservative unresolved-risk adjustment only."}
- tactical_matchup_adjustment: {"team_a_xg_delta":0.04,"team_b_xg_delta":-0.05,"note":"Tactics ten-factor layer raises South Africa low-event/set-piece and late-resilience branch while capping Canada transition upside for Davies/Eustaquio/Kone uncertainty.","tactics_packet_status":"partial_source_limited","ten_factor_source":"data\\thread_outputs\\round32-m73-m76-v3-20260628\\tactics-coach.json"}
- schedule_environment_adjustment: {"team_a_xg_delta":0.01,"team_b_xg_delta":0.01,"note":"Venue/kickoff environment applied conservatively from bracket file only."}
- market_adjustment: {"team_a_xg_delta":0,"team_b_xg_delta":0,"status":"missing_odds_no_market_shift"}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 8.9% | 11.9% | 8.0% | 3.6% | 1.2% | 0.3% |
| 1 | 9.6% | 12.9% | 8.6% | 3.9% | 1.3% | 0.4% |
| 2 | 5.2% | 7.0% | 4.7% | 2.1% | 0.7% | 0.2% |
| 3 | 1.9% | 2.5% | 1.7% | 0.8% | 0.3% | 0.1% |
| 4 | 0.5% | 0.7% | 0.4% | 0.2% | 0.1% | 0.0% |
| 5 | 0.1% | 0.1% | 0.1% | 0.0% | 0.0% | 0.0% |

Tail probability: 0.4%. Matrix plus tail check: 1. Home 4+ goal probability: 2.4%.

Odds implied probability: incomplete_external_only; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.24,0.37],"draw":[0.23,0.32],"team_b_win":[0.36,0.5],"xg_a":[0.82,1.34],"xg_b":[1.02,1.66]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_tactics_absorption. Betting gate: discussion_only_hold.

### M74 Germany vs Paraguay

Date/venue: 2026-06-29, Boston Stadium, Foxborough / Boston.

xG: 2.10-0.78. 1X2: Germany 67.9%, draw 19.3%, Paraguay 12.7%.

Totals: over 2.5 54.9%, under 2.5 45.1%, BTTS yes 47.5%.

Top5 scorelines: 2-0 12.4%, 1-0 11.8%, 2-1 9.7%, 1-1 9.2%, 3-0 8.7%.

Lineups: data-collector probable_not_official. Counts: Germany 11/11, Paraguay 11/11.

- Germany (4-2-3-1): Manuel Neuer, Joshua Kimmich, Jonathan Tah, Antonio Rüdiger, Nathaniel Brown, Felix Nmecha, Nadiem Amiri, Florian Wirtz, Jamal Musiala, Leroy Sané, Kai Havertz.
- Paraguay (4-4-2): Orlando Gill, Juan José Cáceres, Gustavo Gómez, Omar Alderete, Júnior Alonso, Miguel Almirón, Andrés Cubas, Matías Galarza, Diego Gómez, Isidro Pitta, Julio Enciso.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical ten-factor absorption: Germany central-control, pressing and build-up resistance edges are absorbed; Paraguay set-piece/transition keeps away xG from being crushed.

Tail shape: {"draw_floor_dynamic":{"triggered":false,"note":"Paraguay low block is noted but Germany central-control edge prevents a high draw floor."},"event_volatility_layer":{"triggered":true,"tail_note":"Germany first-goal and Paraguay collapse/state-change risk mildly thicken 3+ goal path via higher home xG."},"favorite_ceiling_tail":{"triggered":true,"four_plus_goal_tail_delta":"conservative_xg_based","note":"No manual probability injection; favorite tail is expanded through xG 2.10 and tactical note only."}}

Adjustments:

- player_state_adjustment: {"team_a_xg_delta":0.08,"team_b_xg_delta":-0.03,"note":"Derived from local player_state/model-brief fallback; capped for missing upstream."}
- injury_adjustment: {"team_a_xg_delta":-0.02,"team_b_xg_delta":-0.02,"note":"No fresh data-thread injury packet; conservative unresolved-risk adjustment only."}
- tactical_matchup_adjustment: {"team_a_xg_delta":0.1,"team_b_xg_delta":0.02,"note":"Germany central-control, pressing and build-up resistance edges are absorbed; Paraguay set-piece/transition keeps away xG from being crushed.","tactics_packet_status":"partial_source_limited","ten_factor_source":"data\\thread_outputs\\round32-m73-m76-v3-20260628\\tactics-coach.json"}
- schedule_environment_adjustment: {"team_a_xg_delta":0,"team_b_xg_delta":0,"note":"Venue/kickoff environment applied conservatively from bracket file only."}
- market_adjustment: {"team_a_xg_delta":0,"team_b_xg_delta":0,"status":"missing_odds_no_market_shift"}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 5.6% | 4.4% | 1.7% | 0.4% | 0.1% | 0.0% |
| 1 | 11.8% | 9.2% | 3.6% | 0.9% | 0.2% | 0.0% |
| 2 | 12.4% | 9.7% | 3.8% | 1.0% | 0.2% | 0.0% |
| 3 | 8.7% | 6.8% | 2.6% | 0.7% | 0.1% | 0.0% |
| 4 | 4.5% | 3.5% | 1.4% | 0.4% | 0.1% | 0.0% |
| 5 | 1.9% | 1.5% | 0.6% | 0.1% | 0.0% | 0.0% |

Tail probability: 2.1%. Matrix plus tail check: 1. Home 4+ goal probability: 16.1%.

Odds implied probability: missing_same_source_complete_snapshot; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.62,0.75],"draw":[0.15,0.23],"team_b_win":[0.08,0.17],"xg_a":[1.74,2.48],"xg_b":[0.54,1.04]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_tactics_absorption. Betting gate: discussion_only_hold.

### M75 Netherlands vs Morocco

Date/venue: 2026-06-29, Estadio Monterrey, Guadalupe / Monterrey.

xG: 1.48-1.12. 1X2: Netherlands 45.5%, draw 25.9%, Morocco 28.7%.

Totals: over 2.5 48.2%, under 2.5 51.8%, BTTS yes 52.0%.

Top5 scorelines: 1-1 12.3%, 1-0 11.0%, 2-1 9.1%, 0-1 8.3%, 2-0 8.1%.

Lineups: data-collector probable_not_official. Counts: Netherlands 11/11, Morocco 11/11.

- Netherlands (4-3-3): Bart Verbruggen, Denzel Dumfries, Virgil van Dijk, Jan Paul van Hecke, Micky van de Ven, Frenkie de Jong, Ryan Gravenberch, Tijjani Reijnders, Cody Gakpo, Brian Brobbey, Crysencio Summerville.
- Morocco (4-2-3-1): Yassine Bounou, Achraf Hakimi, Chadi Riad, Issa Diop, Noussair Mazraoui, Azzedine Ounahi, Ayyoub Bouaddi, Ismael Saibari, Brahim Díaz, Bilal El Khannouss, Ayoub El Kaabi.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical ten-factor absorption: Netherlands wide/set-piece and late-game scoring signal lift home xG; Morocco Hakimi/bench transition branch and Haiti 4-2 clean-sheet fragility lift away xG too.

Tail shape: {"draw_floor_dynamic":{"triggered":true,"probability_floor":0.25,"applied_note":"Morocco compact shell keeps draw floor alive even after Netherlands xG lift."},"event_volatility_layer":{"triggered":true,"tail_note":"Both teams have transition/late-bench branches, so BTTS and 3-goal tail are raised without removing 1-1 as key score."},"favorite_ceiling_tail":{"triggered":true,"four_plus_goal_tail_delta":"small_xg_based","note":"Netherlands three-goal branch retained, but Morocco transition prevents one-sided tail expansion."}}

Adjustments:

- player_state_adjustment: {"team_a_xg_delta":0.03,"team_b_xg_delta":0.04,"note":"Derived from local player_state/model-brief fallback; capped for missing upstream."}
- injury_adjustment: {"team_a_xg_delta":-0.01,"team_b_xg_delta":-0.01,"note":"No fresh data-thread injury packet; conservative unresolved-risk adjustment only."}
- tactical_matchup_adjustment: {"team_a_xg_delta":0.08,"team_b_xg_delta":0.04,"note":"Netherlands wide/set-piece and late-game scoring signal lift home xG; Morocco Hakimi/bench transition branch and Haiti 4-2 clean-sheet fragility lift away xG too.","tactics_packet_status":"partial_source_limited","ten_factor_source":"data\\thread_outputs\\round32-m73-m76-v3-20260628\\tactics-coach.json"}
- schedule_environment_adjustment: {"team_a_xg_delta":0,"team_b_xg_delta":0,"note":"Venue/kickoff environment applied conservatively from bracket file only."}
- market_adjustment: {"team_a_xg_delta":0,"team_b_xg_delta":0,"status":"missing_odds_no_market_shift"}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 7.4% | 8.3% | 4.7% | 1.7% | 0.5% | 0.1% |
| 1 | 11.0% | 12.3% | 6.9% | 2.6% | 0.7% | 0.2% |
| 2 | 8.1% | 9.1% | 5.1% | 1.9% | 0.5% | 0.1% |
| 3 | 4.0% | 4.5% | 2.5% | 0.9% | 0.3% | 0.1% |
| 4 | 1.5% | 1.7% | 0.9% | 0.4% | 0.1% | 0.0% |
| 5 | 0.4% | 0.5% | 0.3% | 0.1% | 0.0% | 0.0% |

Tail probability: 0.5%. Matrix plus tail check: 1. Home 4+ goal probability: 6.3%.

Odds implied probability: missing_same_source_complete_snapshot; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.38,0.52],"draw":[0.23,0.31],"team_b_win":[0.2,0.33],"xg_a":[1.14,1.8],"xg_b":[0.84,1.42]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_tactics_absorption. Betting gate: discussion_only_hold.

### M76 Brazil vs Japan

Date/venue: 2026-06-29, Houston Stadium, Houston.

xG: 1.92-1.08. 1X2: Brazil 56.9%, draw 22.1%, Japan 21.0%.

Totals: over 2.5 57.7%, under 2.5 42.3%, BTTS yes 56.4%.

Top5 scorelines: 1-1 10.3%, 2-1 9.9%, 1-0 9.6%, 2-0 9.2%, 3-1 6.3%.

Lineups: data-collector probable_not_official. Counts: Brazil 11/11, Japan 11/11.

- Brazil (4-2-3-1): Alisson, Danilo Luiz, Marquinhos, Gabriel Magalhães, Wesley, Bruno Guimarães, Casemiro, Lucas Paquetá, Vinicius Junior, Raphinha, Matheus Cunha.
- Japan (3-4-2-1): Zion Suzuki, Takehiro Tomiyasu, Ko Itakura, Hiroki Ito, Yukinari Sugawara, Keito Nakamura, Kaishu Sano, Ao Tanaka, Daichi Kamada, Junya Ito, Ayase Ueda.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical ten-factor absorption: Brazil Vinicius/Bruno wide-transition and set-piece edge raises home xG; Japan transition and draw-management quality keep away xG live.

Tail shape: {"draw_floor_dynamic":{"triggered":true,"probability_floor":0.22,"applied_note":"Japan low-event discipline and Suzuki form keep draw path visible, but Brazil wide-channel edge limits the floor."},"event_volatility_layer":{"triggered":true,"tail_note":"Brazil early-goal script and Japan counter branch increase over/BTTS paths."},"favorite_ceiling_tail":{"triggered":true,"four_plus_goal_tail_delta":"conservative_xg_based","note":"Brazil 4+ score tail is lifted through xG 1.92 plus set-piece/wide edge, not manual overfit."}}

Adjustments:

- player_state_adjustment: {"team_a_xg_delta":0.07,"team_b_xg_delta":0.03,"note":"Derived from local player_state/model-brief fallback; capped for missing upstream."}
- injury_adjustment: {"team_a_xg_delta":-0.02,"team_b_xg_delta":-0.04,"note":"No fresh data-thread injury packet; conservative unresolved-risk adjustment only."}
- tactical_matchup_adjustment: {"team_a_xg_delta":0.1,"team_b_xg_delta":0.02,"note":"Brazil Vinicius/Bruno wide-transition and set-piece edge raises home xG; Japan transition and draw-management quality keep away xG live.","tactics_packet_status":"partial_source_limited","ten_factor_source":"data\\thread_outputs\\round32-m73-m76-v3-20260628\\tactics-coach.json"}
- schedule_environment_adjustment: {"team_a_xg_delta":-0.03,"team_b_xg_delta":-0.02,"note":"Venue/kickoff environment applied conservatively from bracket file only."}
- market_adjustment: {"team_a_xg_delta":0,"team_b_xg_delta":0,"status":"missing_odds_no_market_shift"}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 5.0% | 5.4% | 2.9% | 1.1% | 0.3% | 0.1% |
| 1 | 9.6% | 10.3% | 5.6% | 2.0% | 0.5% | 0.1% |
| 2 | 9.2% | 9.9% | 5.3% | 1.9% | 0.5% | 0.1% |
| 3 | 5.9% | 6.3% | 3.4% | 1.2% | 0.3% | 0.1% |
| 4 | 2.8% | 3.0% | 1.6% | 0.6% | 0.2% | 0.0% |
| 5 | 1.1% | 1.2% | 0.6% | 0.2% | 0.1% | 0.0% |

Tail probability: 1.5%. Matrix plus tail check: 1. Home 4+ goal probability: 12.9%.

Odds implied probability: missing_same_source_complete_snapshot; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.52,0.66],"draw":[0.19,0.27],"team_b_win":[0.14,0.24],"xg_a":[1.54,2.28],"xg_b":[0.8,1.38]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_tactics_absorption. Betting gate: discussion_only_hold.

## Handoff

- Data collector probable XI has been retained for all eight teams, 11/11 each.
- Tactics-coach ten-factor package has been absorbed; previous empty-draft status is removed.
- Re-run if official T-75 lineups differ by two or more starters, a key minutes cap appears, or same-source odds become available.
- Red-team should challenge M73 Canada availability cap, M75 draw floor, M76 Japan transition path, and M74 favorite-ceiling tail before publication.
