# J/K/L Round 3 75 Yuan Discussion-Only Model Mapping

Status: completed_discussion_only_mapping. This artifact maps model probabilities to candidate bet-settlement conditions only; it does not create tickets, stake amounts, or execution advice.

Input readiness: J/K/L prediction JSON files available; optional combined data collector file available. Betting gate remains discussion_only_hold because official lineups and full same-source market set are not complete inside this artifact.

## Cross-Match Probability Snapshot

| Group | Match | xG | 1X2 after red team | O/U 2.5 | BTTS | Top score candidates |
|---|---|---:|---|---|---|---|
| J | Algeria vs Austria | 1.14-1.31 | H 31.5% / D 33.0% / A 35.5% | O2.5 44.3% / U2.5 55.7% | Yes 49.7% / No 50.3% | 1-1 12.9%; 0-1 11.3%; 1-0 9.8%; 0-0 8.6%; 1-2 8.4% |
| J | Jordan vs Argentina | 0.56-1.95 | H 12.0% / D 24.0% / A 64.0% | O2.5 45.9% / U2.5 54.1% | Yes 36.8% / No 63.2% | 0-1 15.8%; 0-2 15.4%; 0-3 10.0%; 1-1 8.9%; 1-2 8.6% |
| K | Colombia vs Portugal | 1.18-1.48 | H 27.8% / D 26.1% / A 46.1% | O2.5 49.6% / U2.5 50.3% | Yes 53.5% / No 46.5% | 1-1 12.2%; 0-1 10.3%; 1-2 9.0%; 1-0 8.3%; 0-2 7.7% |
| K | DR Congo vs Uzbekistan | 1.48-0.98 | H 50.0% / D 25.5% / A 24.5% | O2.5 44.6% / U2.5 55.4% | Yes 48.3% / No 51.7% | 1-0 12.6%; 1-1 12.4%; 2-0 9.4%; 2-1 9.2%; 0-0 8.5% |
| L | Croatia vs Ghana | 1.28-0.78 | H 50.4% / D 29.0% / A 20.6% | O2.5 34.0% / U2.5 66.0% | Yes 39.1% / No 60.9% | 1-0 16.3%; 0-0 12.8%; 1-1 12.7%; 2-0 10.4%; 0-1 9.9% |
| L | Panama vs England | 0.5-1.75 | H 10.0% / D 22.0% / A 68.0% | O2.5 39.1% / U2.5 60.9% | Yes 32.5% / No 67.5% | 0-1 18.4%; 0-2 16.1%; 0-0 10.5%; 0-3 9.4%; 1-1 9.2% |

## Candidate Mapping By Match

### Algeria vs Austria

- Red-team status: hold; betting gate: discussion_only_hold.
- xG: 1.14-1.31. 1X2: home 31.5%, draw 33.0%, away 35.5%.
- Totals: over 2.5 44.3%, under 2.5 55.7%. BTTS yes 49.7%, no 50.3%.

#### one_x_two

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Algeria win | 31.5% | 26.4% | positive_model_delta_discussion_only 5.1% | medium_high | hedge | entertainment_bucket_candidate | Algeria must win in 90-minute full time. |
| Draw | 33.0% | 42.0% | negative_model_delta -9.0% | medium_high | hedge | remove_candidate | Full-time result must be level after 90 minutes. |
| Austria win | 35.5% | 31.6% | positive_model_delta_discussion_only 3.9% | medium_high | aligned | wait_live_candidate | Austria must win in 90-minute full time. |

#### handicap_wdl

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Algeria +1 handicap win | 59.5% | 67.6% | negative_model_delta -8.1% | medium_low | aligned | remove_candidate | Algeria +1 win means Algeria real win/draw. |
| Algeria +1 handicap draw | 22.1% | 20.4% | no_clear_edge 1.8% | medium_high | hedge | entertainment_bucket_candidate | Algeria +1 draw means Austria wins by exactly 1 goal(s). |
| Algeria +1 handicap loss | 18.4% | 12.0% | positive_model_delta_discussion_only 6.3% | medium_high | conflict | remove_candidate | Algeria +1 loss means Austria wins by 2 or more goals. |

#### exact_score

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Algeria 1-1 Austria | 12.9% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 1-1. |
| Algeria 0-1 Austria | 11.3% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 0-1. |
| Algeria 1-0 Austria | 9.8% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-0. |
| Algeria 0-0 Austria | 8.6% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 0-0. |
| Algeria 1-2 Austria | 8.4% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-2. |

#### total_goals

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Under 2.5 goals | 55.7% | null | market_missing | medium | aligned | wait_live_candidate | Wins if total full-time goals are 0, 1, or 2. |
| Over 2.5 goals | 44.3% | null | market_missing | medium | hedge | wait_live_candidate | Wins if total full-time goals are 3 or more. |

#### half_full_time

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| HT Draw / FT Austria | 14.7% | null | market_missing | high | aligned | wait_live_candidate | Requires half-time result D and full-time result A; it is not the same as ordinary 1X2. |
| HT Austria / FT Austria | 23.7% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result A and full-time result A; it is not the same as ordinary 1X2. |
| HT Draw / FT Draw | 17.2% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result D and full-time result D; it is not the same as ordinary 1X2. |

Bucket summary: entertainment_bucket_candidate: Algeria win, Algeria +1 handicap draw | remove_candidate: Draw, Algeria +1 handicap win, Algeria +1 handicap loss | wait_live_candidate: Austria win, Algeria 1-1 Austria, Algeria 0-1 Austria, Algeria 1-0 Austria, Algeria 0-0 Austria, Algeria 1-2 Austria, Under 2.5 goals, Over 2.5 goals, HT Draw / FT Austria, HT Austria / FT Austria, HT Draw / FT Draw

### Jordan vs Argentina

- Red-team status: hold; betting gate: discussion_only_hold.
- xG: 0.56-1.95. 1X2: home 12.0%, draw 24.0%, away 64.0%.
- Totals: over 2.5 45.9%, under 2.5 54.1%. BTTS yes 36.8%, no 63.2%.

#### one_x_two

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Jordan win | 12.0% | null | market_missing | high | conflict | remove_candidate | Jordan must win in 90-minute full time. |
| Draw | 24.0% | null | market_missing | medium_high | hedge | wait_live_candidate | Full-time result must be level after 90 minutes. |
| Argentina win | 64.0% | null | market_missing | medium_low | aligned | wait_live_candidate | Argentina must win in 90-minute full time. |

#### handicap_wdl

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Jordan +2 handicap win | 55.7% | 38.8% | positive_model_delta_discussion_only 16.8% | medium | aligned | suitable_main_bucket_candidate | Jordan +2 win means Jordan real win/draw, or Argentina wins by fewer than 2 goals. |
| Jordan +2 handicap draw | 21.9% | 23.0% | no_clear_edge -1.1% | medium_high | hedge | entertainment_bucket_candidate | Jordan +2 draw means Argentina wins by exactly 2 goal(s). |
| Jordan +2 handicap loss | 22.4% | 38.2% | negative_model_delta -15.7% | medium_high | conflict | remove_candidate | Jordan +2 loss means Argentina wins by 3 or more goals. |

#### exact_score

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Jordan 0-1 Argentina | 15.8% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 0-1. |
| Jordan 0-2 Argentina | 15.4% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 0-2. |
| Jordan 0-3 Argentina | 10.0% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 0-3. |
| Jordan 1-1 Argentina | 8.9% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-1. |
| Jordan 1-2 Argentina | 8.6% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-2. |

#### total_goals

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Under 2.5 goals | 54.1% | null | market_missing | medium | aligned | wait_live_candidate | Wins if total full-time goals are 0, 1, or 2. |
| Over 2.5 goals | 45.9% | null | market_missing | medium | hedge | wait_live_candidate | Wins if total full-time goals are 3 or more. |

#### half_full_time

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| HT Draw / FT Argentina | 22.0% | null | market_missing | high | aligned | wait_live_candidate | Requires half-time result D and full-time result A; it is not the same as ordinary 1X2. |
| HT Argentina / FT Argentina | 46.3% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result A and full-time result A; it is not the same as ordinary 1X2. |
| HT Draw / FT Draw | 13.6% | null | market_missing | high | conflict | remove_candidate | Requires half-time result D and full-time result D; it is not the same as ordinary 1X2. |

Bucket summary: remove_candidate: Jordan win, Jordan +2 handicap loss, HT Draw / FT Draw | wait_live_candidate: Draw, Argentina win, Jordan 0-1 Argentina, Jordan 0-2 Argentina, Jordan 0-3 Argentina, Jordan 1-1 Argentina, Jordan 1-2 Argentina, Under 2.5 goals, Over 2.5 goals, HT Draw / FT Argentina, HT Argentina / FT Argentina | suitable_main_bucket_candidate: Jordan +2 handicap win | entertainment_bucket_candidate: Jordan +2 handicap draw

### Colombia vs Portugal

- Red-team status: hold; betting gate: discussion_only_hold.
- xG: 1.18-1.48. 1X2: home 27.8%, draw 26.1%, away 46.1%.
- Totals: over 2.5 49.6%, under 2.5 50.3%. BTTS yes 53.5%, no 46.5%.

#### one_x_two

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Colombia win | 27.8% | 20.9% | positive_model_delta_discussion_only 6.9% | medium_high | hedge | entertainment_bucket_candidate | Colombia must win in 90-minute full time. |
| Draw | 26.1% | 27.0% | no_clear_edge -0.9% | medium_high | hedge | entertainment_bucket_candidate | Full-time result must be level after 90 minutes. |
| Portugal win | 46.1% | 52.1% | negative_model_delta -6.0% | medium | aligned | remove_candidate | Portugal must win in 90-minute full time. |

#### handicap_wdl

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Colombia +1 handicap win | 55.9% | 46.6% | positive_model_delta_discussion_only 9.3% | medium | aligned | suitable_main_bucket_candidate | Colombia +1 win means Colombia real win/draw. |
| Colombia +1 handicap draw | 22.4% | 25.7% | negative_model_delta -3.2% | medium_high | hedge | remove_candidate | Colombia +1 draw means Portugal wins by exactly 1 goal(s). |
| Colombia +1 handicap loss | 21.6% | 27.7% | negative_model_delta -6.0% | medium_high | conflict | remove_candidate | Colombia +1 loss means Portugal wins by 2 or more goals. |

#### exact_score

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Colombia 1-1 Portugal | 12.2% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 1-1. |
| Colombia 0-1 Portugal | 10.3% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 0-1. |
| Colombia 1-2 Portugal | 9.0% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-2. |
| Colombia 1-0 Portugal | 8.3% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-0. |
| Colombia 0-2 Portugal | 7.7% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 0-2. |

#### total_goals

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Under 2.5 goals | 50.3% | null | market_missing | medium | aligned | wait_live_candidate | Wins if total full-time goals are 0, 1, or 2. |
| Over 2.5 goals | 49.6% | null | market_missing | medium | hedge | wait_live_candidate | Wins if total full-time goals are 3 or more. |

#### half_full_time

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| HT Draw / FT Portugal | 15.2% | null | market_missing | high | aligned | wait_live_candidate | Requires half-time result D and full-time result A; it is not the same as ordinary 1X2. |
| HT Portugal / FT Portugal | 26.4% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result A and full-time result A; it is not the same as ordinary 1X2. |
| HT Draw / FT Draw | 15.5% | null | market_missing | high | conflict | remove_candidate | Requires half-time result D and full-time result D; it is not the same as ordinary 1X2. |

Bucket summary: entertainment_bucket_candidate: Colombia win, Draw | remove_candidate: Portugal win, Colombia +1 handicap draw, Colombia +1 handicap loss, HT Draw / FT Draw | suitable_main_bucket_candidate: Colombia +1 handicap win | wait_live_candidate: Colombia 1-1 Portugal, Colombia 0-1 Portugal, Colombia 1-2 Portugal, Colombia 1-0 Portugal, Colombia 0-2 Portugal, Under 2.5 goals, Over 2.5 goals, HT Draw / FT Portugal, HT Portugal / FT Portugal

### DR Congo vs Uzbekistan

- Red-team status: hold; betting gate: discussion_only_hold.
- xG: 1.48-0.98. 1X2: home 50.0%, draw 25.5%, away 24.5%.
- Totals: over 2.5 44.6%, under 2.5 55.4%. BTTS yes 48.3%, no 51.7%.

#### one_x_two

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| DR Congo win | 50.0% | 53.0% | negative_model_delta -3.0% | medium | aligned | remove_candidate | DR Congo must win in 90-minute full time. |
| Draw | 25.5% | 23.2% | no_clear_edge 2.3% | medium_high | hedge | entertainment_bucket_candidate | Full-time result must be level after 90 minutes. |
| Uzbekistan win | 24.5% | 23.8% | no_clear_edge 0.7% | medium_high | hedge | entertainment_bucket_candidate | Uzbekistan must win in 90-minute full time. |

#### handicap_wdl

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| DR Congo -1 handicap win | 24.4% | 28.6% | negative_model_delta -4.2% | medium_high | conflict | remove_candidate | DR Congo -1 win means DR Congo wins by 2 or more goals. |
| DR Congo -1 handicap draw | 24.3% | 25.7% | no_clear_edge -1.4% | medium_high | hedge | entertainment_bucket_candidate | DR Congo -1 draw means DR Congo wins by exactly 1 goal(s). |
| DR Congo -1 handicap loss | 51.2% | 45.7% | positive_model_delta_discussion_only 5.5% | medium | aligned | suitable_main_bucket_candidate | DR Congo -1 loss means DR Congo does not cover: draw or Uzbekistan real win. |

#### exact_score

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| DR Congo 1-0 Uzbekistan | 12.6% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 1-0. |
| DR Congo 1-1 Uzbekistan | 12.4% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 1-1. |
| DR Congo 2-0 Uzbekistan | 9.4% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 2-0. |
| DR Congo 2-1 Uzbekistan | 9.2% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 2-1. |
| DR Congo 0-0 Uzbekistan | 8.5% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 0-0. |

#### total_goals

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Under 2.5 goals | 55.4% | null | market_missing | medium | aligned | wait_live_candidate | Wins if total full-time goals are 0, 1, or 2. |
| Over 2.5 goals | 44.6% | null | market_missing | medium | hedge | wait_live_candidate | Wins if total full-time goals are 3 or more. |

#### half_full_time

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| HT Draw / FT DR Congo | 17.0% | null | market_missing | high | aligned | wait_live_candidate | Requires half-time result D and full-time result H; it is not the same as ordinary 1X2. |
| HT DR Congo / FT DR Congo | 29.4% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result H and full-time result H; it is not the same as ordinary 1X2. |
| HT Draw / FT Draw | 16.7% | null | market_missing | high | conflict | remove_candidate | Requires half-time result D and full-time result D; it is not the same as ordinary 1X2. |

Bucket summary: remove_candidate: DR Congo win, DR Congo -1 handicap win, HT Draw / FT Draw | entertainment_bucket_candidate: Draw, Uzbekistan win, DR Congo -1 handicap draw | suitable_main_bucket_candidate: DR Congo -1 handicap loss | wait_live_candidate: DR Congo 1-0 Uzbekistan, DR Congo 1-1 Uzbekistan, DR Congo 2-0 Uzbekistan, DR Congo 2-1 Uzbekistan, DR Congo 0-0 Uzbekistan, Under 2.5 goals, Over 2.5 goals, HT Draw / FT DR Congo, HT DR Congo / FT DR Congo

### Croatia vs Ghana

- Red-team status: hold; betting gate: discussion_only_hold.
- xG: 1.28-0.78. 1X2: home 50.4%, draw 29.0%, away 20.6%.
- Totals: over 2.5 34.0%, under 2.5 66.0%. BTTS yes 39.1%, no 60.9%.

#### one_x_two

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Croatia win | 50.4% | 55.3% | negative_model_delta -4.9% | medium | aligned | remove_candidate | Croatia must win in 90-minute full time. |
| Draw | 29.0% | 29.0% | no_clear_edge 0.0% | medium_high | hedge | entertainment_bucket_candidate | Full-time result must be level after 90 minutes. |
| Ghana win | 20.6% | 15.7% | positive_model_delta_discussion_only 4.9% | medium_high | conflict | remove_candidate | Ghana must win in 90-minute full time. |

#### handicap_wdl

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Croatia -1 handicap win | 22.3% | 30.3% | negative_model_delta -8.0% | medium_high | conflict | remove_candidate | Croatia -1 win means Croatia wins by 2 or more goals. |
| Croatia -1 handicap draw | 25.9% | 26.5% | no_clear_edge -0.5% | medium_high | hedge | entertainment_bucket_candidate | Croatia -1 draw means Croatia wins by exactly 1 goal(s). |
| Croatia -1 handicap loss | 51.7% | 43.2% | positive_model_delta_discussion_only 8.5% | medium | aligned | suitable_main_bucket_candidate | Croatia -1 loss means Croatia does not cover: draw or Ghana real win. |

#### exact_score

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Croatia 1-0 Ghana | 16.3% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 1-0. |
| Croatia 0-0 Ghana | 12.8% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 0-0. |
| Croatia 1-1 Ghana | 12.7% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-1. |
| Croatia 2-0 Ghana | 10.4% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 2-0. |
| Croatia 0-1 Ghana | 9.9% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 0-1. |

#### total_goals

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Under 2.5 goals | 66.0% | null | market_missing | medium_low | aligned | wait_live_candidate | Wins if total full-time goals are 0, 1, or 2. |
| Over 2.5 goals | 34.0% | null | market_missing | medium_high | hedge | wait_live_candidate | Wins if total full-time goals are 3 or more. |

#### half_full_time

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| HT Draw / FT Croatia | 18.0% | null | market_missing | high | aligned | wait_live_candidate | Requires half-time result D and full-time result H; it is not the same as ordinary 1X2. |
| HT Croatia / FT Croatia | 28.5% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result H and full-time result H; it is not the same as ordinary 1X2. |
| HT Draw / FT Draw | 20.5% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result D and full-time result D; it is not the same as ordinary 1X2. |

Bucket summary: remove_candidate: Croatia win, Ghana win, Croatia -1 handicap win | entertainment_bucket_candidate: Draw, Croatia -1 handicap draw | suitable_main_bucket_candidate: Croatia -1 handicap loss | wait_live_candidate: Croatia 1-0 Ghana, Croatia 0-0 Ghana, Croatia 1-1 Ghana, Croatia 2-0 Ghana, Croatia 0-1 Ghana, Under 2.5 goals, Over 2.5 goals, HT Draw / FT Croatia, HT Croatia / FT Croatia, HT Draw / FT Draw

### Panama vs England

- Red-team status: hold; betting gate: discussion_only_hold.
- xG: 0.5-1.75. 1X2: home 10.0%, draw 22.0%, away 68.0%.
- Totals: over 2.5 39.1%, under 2.5 60.9%. BTTS yes 32.5%, no 67.5%.

#### one_x_two

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Panama win | 10.0% | null | market_missing | high | conflict | remove_candidate | Panama must win in 90-minute full time. |
| Draw | 22.0% | null | market_missing | medium_high | conflict | remove_candidate | Full-time result must be level after 90 minutes. |
| England win | 68.0% | null | market_missing | medium_low | aligned | wait_live_candidate | England must win in 90-minute full time. |

#### handicap_wdl

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Panama +2 handicap win | 59.8% | 35.7% | positive_model_delta_discussion_only 24.1% | medium_low | aligned | suitable_main_bucket_candidate | Panama +2 win means Panama real win/draw, or England wins by fewer than 2 goals. |
| Panama +2 handicap draw | 21.4% | 22.7% | no_clear_edge -1.3% | medium_high | hedge | entertainment_bucket_candidate | Panama +2 draw means England wins by exactly 2 goal(s). |
| Panama +2 handicap loss | 18.9% | 41.6% | negative_model_delta -22.7% | medium_high | conflict | remove_candidate | Panama +2 loss means England wins by 3 or more goals. |

#### exact_score

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Panama 0-1 England | 18.4% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 0-1. |
| Panama 0-2 England | 16.1% | null | market_missing | high | aligned | wait_live_candidate | Settles only if the exact full-time score is 0-2. |
| Panama 0-0 England | 10.5% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 0-0. |
| Panama 0-3 England | 9.4% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 0-3. |
| Panama 1-1 England | 9.2% | null | market_missing | high | hedge | wait_live_candidate | Settles only if the exact full-time score is 1-1. |

#### total_goals

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| Under 2.5 goals | 60.9% | null | market_missing | medium_low | aligned | wait_live_candidate | Wins if total full-time goals are 0, 1, or 2. |
| Over 2.5 goals | 39.1% | null | market_missing | medium | hedge | wait_live_candidate | Wins if total full-time goals are 3 or more. |

#### half_full_time

| Candidate | Model probability | Market implied | Edge/no edge | Variance | Relationship | Bucket | Settlement condition |
|---|---:|---:|---|---|---|---|---|
| HT Draw / FT England | 22.6% | null | market_missing | high | aligned | wait_live_candidate | Requires half-time result D and full-time result A; it is not the same as ordinary 1X2. |
| HT England / FT England | 43.6% | null | market_missing | high | hedge | wait_live_candidate | Requires half-time result A and full-time result A; it is not the same as ordinary 1X2. |
| HT Draw / FT Draw | 16.0% | null | market_missing | high | conflict | remove_candidate | Requires half-time result D and full-time result D; it is not the same as ordinary 1X2. |

Bucket summary: remove_candidate: Panama win, Draw, Panama +2 handicap loss, HT Draw / FT Draw | wait_live_candidate: England win, Panama 0-1 England, Panama 0-2 England, Panama 0-0 England, Panama 0-3 England, Panama 1-1 England, Under 2.5 goals, Over 2.5 goals, HT Draw / FT England, HT England / FT England | suitable_main_bucket_candidate: Panama +2 handicap win | entertainment_bucket_candidate: Panama +2 handicap draw

## Handoff Field List

- match_id, fixture, red_team_status, betting_gate_status, expected_goals, probabilities_1x2_after_red_team, totals_probabilities, btts_probabilities, top5_scorelines.
- candidate_mapping by one_x_two, handicap_wdl, exact_score, total_goals, half_full_time.
- Per candidate: model_probability, market_implied_probability, edge_or_no_edge, variance_level, settlement_condition, model_direction, selected_bet, relationship, bucket_label.
- Guard fields: no_final_tickets_or_amounts, discussion_only_hold, handicap_translation_guard, market_missing note.
