# Round32 M77-M80 v3 Modeler Output

Updated: 2026-06-28T22:10:30+08:00

Status: completed_partial_source_limited_data_and_tactics_absorbed. Data collector predicted lineups and tactics-coach package are available and absorbed. Official T-75 lineups and complete same-source odds are still missing. This file is probability modeling only and contains no betting advice.

## Input Readiness

- data_collector_packet: available
- tactics_coach_packet: available
- predicted_lineups: data_collector_predicted_lineups_probable_not_official, 11/11 each team
- official_lineups: not_available_yet until T-75 gate
- odds_snapshot: complete same-source odds missing
- red_team_status: pending

## Probability Summary

| Match | xG | Team A win | Draw | Team B win | Over 2.5 | BTTS yes | Home 4+ goals | Top scorelines |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| M77 France vs Sweden | 2.10-1.03 | 61.9% | 20.3% | 17.7% | 60.5% | 56.4% | 16.1% | 2-1 9.9%; 2-0 9.6%; 1-1 9.5%; 1-0 9.2%; 3-1 7.0% |
| M78 Ivory Coast vs Norway | 1.39-1.62 | 32.9% | 24.1% | 43.0% | 57.9% | 60.2% | 5.3% | 1-1 11.1%; 1-2 9.0%; 0-1 8.0%; 2-1 7.7%; 1-0 6.9% |
| M79 Mexico vs Ecuador | 1.44-1.24 | 41.7% | 25.8% | 32.5% | 50.1% | 54.2% | 5.8% | 1-1 12.2%; 1-0 9.9%; 2-1 8.8%; 0-1 8.5%; 1-2 7.6% |
| M80 England vs DR Congo | 2.07-0.88 | 64.9% | 20.1% | 15.0% | 56.5% | 51.1% | 15.6% | 2-0 11.2%; 1-0 10.8%; 2-1 9.9%; 1-1 9.5%; 3-0 7.7% |

## Match Details

### M77 France vs Sweden

Date/venue: 2026-06-30, New York New Jersey Stadium, New Jersey / New York.

xG: 2.10-1.03. 1X2: France 61.9%, draw 20.3%, Sweden 17.7%.

Totals: over 2.5 60.5%, under 2.5 39.5%, BTTS yes 56.4%.

Top5 scorelines: 2-1 9.9%, 2-0 9.6%, 1-1 9.5%, 1-0 9.2%, 3-1 7.0%.

Lineups: data-collector probable_not_official. Counts: France 11/11, Sweden 11/11.

- France (4-3-3): Mike Maignan, Jules Koundé, William Saliba, Dayot Upamecano, Theo Hernández, Aurélien Tchouaméni, Adrien Rabiot, Rayan Cherki, Bradley Barcola, Kylian Mbappé, Michael Olise.
- Sweden (4-4-2): Viktor Johansson, Herman Johansson, Carl Starfelt, Hjalmar Ekdal, Daniel Svensson, Anthony Elanga, Lucas Bergvall, Yasin Ayari, Ken Sema, Alexander Isak, Viktor Gyökeres.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical adjustment: Tactics-coach package available and absorbed with conservative caps.

Tail shape: {"draw_floor_dynamic":{"triggered":false,"note":"France tactical and player-state edge prevents a high draw floor."},"event_volatility_layer":{"triggered":true,"note":"Sweden direct forward/set-piece branch keeps BTTS and upset tail alive."},"favorite_ceiling_tail":{"triggered":true,"note":"France 4-1 round-three signal and wide-transition edge lift favorite ceiling through xG only."}}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 4.4% | 4.5% | 2.3% | 0.8% | 0.2% | 0.0% |
| 1 | 9.2% | 9.5% | 4.9% | 1.7% | 0.4% | 0.1% |
| 2 | 9.6% | 9.9% | 5.1% | 1.8% | 0.4% | 0.1% |
| 3 | 6.8% | 7.0% | 3.6% | 1.2% | 0.3% | 0.1% |
| 4 | 3.5% | 3.6% | 1.9% | 0.7% | 0.2% | 0.0% |
| 5 | 1.5% | 1.5% | 0.8% | 0.3% | 0.1% | 0.0% |

Tail probability: 2.1%. Matrix plus tail check: 1.

Odds implied probability: missing_same_source_complete_snapshot; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.58,0.71],"draw":[0.16,0.24],"team_b_win":[0.12,0.22],"xg_a":[1.72,2.48],"xg_b":[0.76,1.35]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_data_absorption. Betting gate: discussion_only_hold.

### M78 Ivory Coast vs Norway

Date/venue: 2026-06-30, Dallas Stadium, Arlington / Dallas.

xG: 1.39-1.62. 1X2: Ivory Coast 32.9%, draw 24.1%, Norway 43.0%.

Totals: over 2.5 57.9%, under 2.5 42.1%, BTTS yes 60.2%.

Top5 scorelines: 1-1 11.1%, 1-2 9.0%, 0-1 8.0%, 2-1 7.7%, 1-0 6.9%.

Lineups: data-collector probable_not_official. Counts: Ivory Coast 11/11, Norway 11/11.

- Ivory Coast (4-3-3): Yahia Fofana, Guela Doue, Odilon Kossounou, Emmanuel Agbadou, Ghislain Konan, Franck Kessie, Ibrahim Sangare, Seko Fofana, Amad Diallo, Evann Guessand, Simon Adingra.
- Norway (4-2-3-1): Ørjan Nyland, Julian Ryerson, Leo Østigård, Kristoffer Ajer, David Møller Wolfe, Sander Berge, Fredrik Aursnes, Martin Ødegaard, Oscar Bobb, Antonio Nusa, Erling Haaland.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical adjustment: Tactics-coach package available and absorbed with conservative caps.

Tail shape: {"draw_floor_dynamic":{"triggered":true,"note":"Two-way physical/transition game plus Dallas conditions keep draw path live."},"event_volatility_layer":{"triggered":true,"note":"Ivory Coast wide counters and Norway Haaland/Odegaard route produce the highest BTTS branch in this packet."},"favorite_ceiling_tail":{"triggered":false,"note":"Norway edge is present but defensive fragility prevents a big favorite tail."}}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 4.9% | 8.0% | 6.5% | 3.5% | 1.4% | 0.5% |
| 1 | 6.9% | 11.1% | 9.0% | 4.9% | 2.0% | 0.6% |
| 2 | 4.8% | 7.7% | 6.3% | 3.4% | 1.4% | 0.4% |
| 3 | 2.2% | 3.6% | 2.9% | 1.6% | 0.6% | 0.2% |
| 4 | 0.8% | 1.2% | 1.0% | 0.5% | 0.2% | 0.1% |
| 5 | 0.2% | 0.4% | 0.3% | 0.1% | 0.1% | 0.0% |

Tail probability: 0.9%. Matrix plus tail check: 1.

Odds implied probability: missing_same_source_complete_snapshot; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.29,0.42],"draw":[0.21,0.29],"team_b_win":[0.36,0.5],"xg_a":[1.06,1.72],"xg_b":[1.22,1.98]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_data_absorption. Betting gate: discussion_only_hold.

### M79 Mexico vs Ecuador

Date/venue: 2026-06-30, Mexico City Stadium, Mexico City.

xG: 1.44-1.24. 1X2: Mexico 41.7%, draw 25.8%, Ecuador 32.5%.

Totals: over 2.5 50.1%, under 2.5 49.9%, BTTS yes 54.2%.

Top5 scorelines: 1-1 12.2%, 1-0 9.9%, 2-1 8.8%, 0-1 8.5%, 1-2 7.6%.

Lineups: data-collector probable_not_official. Counts: Mexico 11/11, Ecuador 11/11.

- Mexico (4-3-3): Raúl Rangel, Israel Reyes, Johan Vásquez, Edson Álvarez, Jesús Gallardo, Érik Lira, Álvaro Fidalgo, Luis Chávez, Roberto Alvarado, Raúl Jiménez, Julián Quiñones.
- Ecuador (4-2-3-1): Hernán Galíndez, Ángelo Preciado, Willian Pacho, Piero Hincapié, Pervis Estupiñán, Moisés Caicedo, Alan Franco, Pedro Vite, Gonzalo Plata, Nilson Angulo, Kevin Rodríguez.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical adjustment: Tactics-coach package available and absorbed with conservative caps.

Tail shape: {"draw_floor_dynamic":{"triggered":true,"note":"Comparable defensive floors and Mexico City control keep 1-1/0-0 visible."},"event_volatility_layer":{"triggered":true,"note":"Ecuador Germany-upset transition signal prevents a pure low-event host script."},"favorite_ceiling_tail":{"triggered":false,"note":"Mexico edge is venue/control, not blowout ceiling."}}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 6.9% | 8.5% | 5.3% | 2.2% | 0.7% | 0.2% |
| 1 | 9.9% | 12.2% | 7.6% | 3.1% | 1.0% | 0.2% |
| 2 | 7.1% | 8.8% | 5.5% | 2.3% | 0.7% | 0.2% |
| 3 | 3.4% | 4.2% | 2.6% | 1.1% | 0.3% | 0.1% |
| 4 | 1.2% | 1.5% | 0.9% | 0.4% | 0.1% | 0.0% |
| 5 | 0.4% | 0.4% | 0.3% | 0.1% | 0.0% | 0.0% |

Tail probability: 0.5%. Matrix plus tail check: 1.

Odds implied probability: missing_same_source_complete_snapshot; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.37,0.51],"draw":[0.23,0.31],"team_b_win":[0.23,0.36],"xg_a":[1.12,1.76],"xg_b":[0.92,1.56]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_data_absorption. Betting gate: discussion_only_hold.

### M80 England vs DR Congo

Date/venue: 2026-07-01, Atlanta Stadium, Atlanta.

xG: 2.07-0.88. 1X2: England 64.9%, draw 20.1%, DR Congo 15.0%.

Totals: over 2.5 56.5%, under 2.5 43.5%, BTTS yes 51.1%.

Top5 scorelines: 2-0 11.2%, 1-0 10.8%, 2-1 9.9%, 1-1 9.5%, 3-0 7.7%.

Lineups: data-collector probable_not_official. Counts: England 11/11, DR Congo 11/11.

- England (4-2-3-1): Jordan Pickford, Djed Spence, Ezri Konsa, Marc Guéhi, Nico O'Reilly, Declan Rice, Elliot Anderson, Jude Bellingham, Bukayo Saka, Marcus Rashford, Harry Kane.
- DR Congo (4-2-3-1): Dimitry Bertaud, Gedeon Kalulu, Chancel Mbemba, Dylan Batubinsika, Arthur Masuaku, Charles Pickel, Samuel Moutoussamy, Gael Kakuta, Meschak Elia, Yoane Wissa, Fiston Mayele.

Factor weights: baseline_strength 0.27, attack 0.15, defense 0.15, player_state 0.14, injury 0.09, tactical_matchup 0.12, schedule_environment 0.04, knockout_context 0.04, market 0.00.

Tactical adjustment: Tactics-coach package available and absorbed with conservative caps.

Tail shape: {"draw_floor_dynamic":{"triggered":false,"note":"DR Congo counter/set-piece branch exists but England central control limits draw floor."},"event_volatility_layer":{"triggered":true,"note":"England first goal can open DR Congo chase-state gaps, while DR Congo transition keeps BTTS tail non-zero."},"favorite_ceiling_tail":{"triggered":true,"note":"England two-goal corridor and late bench problem-solving retained, but right-back injuries cap blowout overreach."}}

Poisson matrix 0-0 to 5-5 plus tail:

| Goals | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 5.2% | 4.6% | 2.0% | 0.6% | 0.1% | 0.0% |
| 1 | 10.8% | 9.5% | 4.2% | 1.2% | 0.3% | 0.1% |
| 2 | 11.2% | 9.9% | 4.3% | 1.3% | 0.3% | 0.1% |
| 3 | 7.7% | 6.8% | 3.0% | 0.9% | 0.2% | 0.0% |
| 4 | 4.0% | 3.5% | 1.6% | 0.4% | 0.1% | 0.0% |
| 5 | 1.7% | 1.5% | 0.6% | 0.2% | 0.0% | 0.0% |

Tail probability: 1.9%. Matrix plus tail check: 1.

Odds implied probability: missing_same_source_complete_snapshot; model_market_delta: not_available_without_complete_same_source_odds.

Confidence interval: {"team_a_win":[0.61,0.75],"draw":[0.15,0.23],"team_b_win":[0.08,0.17],"xg_a":[1.7,2.46],"xg_b":[0.62,1.16]}

Red-team status: pending. Final probabilities status: pre_red_team_model_after_data_absorption. Betting gate: discussion_only_hold.

## Handoff

- Data collector probable XI has been retained for all eight teams, 11/11 each.
- Tactics-coach package has been absorbed.
- Re-run if official T-75 lineups differ by two or more starters, a key minutes cap appears, or same-source odds become available.
