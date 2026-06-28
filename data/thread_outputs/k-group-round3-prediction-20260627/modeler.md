---
phase: k_group_round3_quant_prediction
group: K
round: 3
status: completed_pre_red_team_discussion_only
owner: worldcup-data-modeler
created_at: 2026-06-27T00:00:00+08:00
betting_gate_status: discussion_only_hold
red_team_status: pending_red_team
---

# K Group Round 3 Quant Prediction - Modeler

This file provides reviewable probability chains only. It does not provide betting advice. Local round-one/round-two reviews and four player_state JSON files were read. Independent round-three data/tactics packets were not found locally. Odds use a local 500 snapshot only; T-75 lineups, final injury status and complete same-source odds chains are missing.

## factor_weights

| factor | weight |
| --- | ---: |
| baseline_strength | 0.24 |
| first_two_round_performance | 0.17 |
| player_state | 0.14 |
| injury_availability | 0.08 |
| tactical_matchup | 0.14 |
| schedule_environment | 0.07 |
| third_round_context | 0.1 |
| market_signal | 0.06 |

## Colombia vs Portugal

- xG: 1.12 - 1.38
- 1X2: 30.5% / 26.7% / 42.8%
- Totals: over2.5 45.6%, under2.5 54.4%; BTTS yes 50.4%
- Top5 scorelines: 1-1 12.7%; 0-1 11.3%; 1-0 9.2%; 1-2 8.8%; 0-0 8.2%
- Odds implied probability: 20.9% / 27.0% / 52.1%, overround 1.1295
- Model-market delta: 9.5% / -0.3% / -9.3%

### factor_inputs

- first_two_round_results: Colombia have 6 points and Portugal have 4. A draw secures Colombia first place and is highly useful for Portugal top-two protection; Portugal can take first with a win. Third-round context lowers unnecessary openness, but first-place incentive remains live.
- player_state_summary: Colombia Diaz-Munoz-Quintero/Cordoba chain remains positive; Portugal Ronaldo-Bruno-Nuno Mendes-Cancelo-Leao round-two state is upgraded.
- injury_availability: Colombia Lucumi/Lerma card-status check remains open; Portugal Ruben Dias availability still needs T-75 confirmation.
- tactical_matchup: Colombia weak-side fullback and left-side isolation can create events; Portugal control, set-piece and bench impact are stronger, but the Uzbekistan 5-0 tail is capped against Colombia.
- schedule_environment: Same final-round kickoff; no clear one-sided rest or environment edge from local files.
- market_snapshot: 500 local HTML snapshot data/tmp_500_jczq_20260626.html; processdate=2026-06-27; matchtime=2026-06-28 07:30

### scores_and_adjustments

- team_strength_score: {"home":74.5,"away":78.8}
- attack_score: {"home":76,"away":82}
- defense_score: {"home":75.5,"away":77}
- player_state_adjustment: {"home":0.04,"away":0.06,"note":"Colombia Diaz-Munoz-Quintero/Cordoba chain remains positive; Portugal Ronaldo-Bruno-Nuno Mendes-Cancelo-Leao round-two state is upgraded."}
- injury_adjustment: {"home":-0.02,"away":-0.03,"note":"Colombia Lucumi/Lerma card-status check remains open; Portugal Ruben Dias availability still needs T-75 confirmation."}
- tactical_matchup_adjustment: {"home":0.02,"away":0.03,"note":"Colombia weak-side fullback and left-side isolation can create events; Portugal control, set-piece and bench impact are stronger, but the Uzbekistan 5-0 tail is capped against Colombia."}
- schedule_environment_adjustment: {"home":0,"away":0,"note":"Same final-round kickoff; no clear one-sided rest or environment edge from local files."}
- market_adjustment: {"home":-0.01,"draw":0,"away":0.01,"note":"Local 500 1X2 snapshot strongly favors Portugal; model uses only a small direction calibration and does not treat market heat as fact."}
- third_round_context: Colombia have 6 points and Portugal have 4. A draw secures Colombia first place and is highly useful for Portugal top-two protection; Portugal can take first with a win. Third-round context lowers unnecessary openness, but first-place incentive remains live.

### poisson_score_matrix_0_to_5

| H\A | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.0821 | 0.1133 | 0.0782 | 0.0360 | 0.0124 | 0.0034 |
| 1 | 0.0919 | 0.1269 | 0.0875 | 0.0403 | 0.0139 | 0.0038 |
| 2 | 0.0515 | 0.0710 | 0.0490 | 0.0226 | 0.0078 | 0.0021 |
| 3 | 0.0192 | 0.0265 | 0.0183 | 0.0084 | 0.0029 | 0.0008 |
| 4 | 0.0054 | 0.0074 | 0.0051 | 0.0024 | 0.0008 | 0.0002 |
| 5 | 0.0012 | 0.0017 | 0.0011 | 0.0005 | 0.0002 | 0.0001 |

- tail: 0.004

### confidence_and_quality

- confidence_interval: {"home_win":[0.24,0.37],"draw":[0.22,0.32],"away_win":[0.36,0.5],"home_xg":[0.9,1.36],"away_xg":[1.1,1.64]}
- margin_bucket_probability: {"home_by_1":0.1838,"home_by_2_plus":0.1208,"draw":0.2673,"away_by_1":0.2265,"away_by_2_plus":0.2016}
- blowout_tail_probability: {"home_4plus_goals":0.0272,"away_4plus_goals":0.0515}
- uncertainty: T-75 official lineups missing: Portugal rotation/CB pairing and Colombia first-place risk posture are not locked.; Market odds are from a local 500 snapshot, not a complete same-source 1X2/handicap/totals chain.; Portugal 5-0 over Uzbekistan contains opponent-collapse noise and is not fully transferable to Colombia.
- red_team_status: pending_red_team
- final_probabilities: {"status":"pre_red_team_equal_to_model_probabilities","home_win":0.3046,"draw":0.2673,"away_win":0.4281}
- postmatch_error: null
- parameter_updates: {"status":"placeholder_pre_match","items":[]}

## DR Congo vs Uzbekistan

- xG: 1.55 - 1.03
- 1X2: 49.4% / 25.4% / 25.2%
- Totals: over2.5 47.6%, under2.5 52.3%; BTTS yes 50.6%
- Top5 scorelines: 1-1 12.1%; 1-0 11.7%; 2-1 9.4%; 2-0 9.1%; 0-1 7.8%
- Odds implied probability: 53.0% / 23.2% / 23.8%, overround 1.1294
- Model-market delta: -3.7% / 2.3% / 1.4%

### factor_inputs

- first_two_round_results: DR Congo have 1 point and Uzbekistan have 0. DR Congo need a win to reach 4 points and chase second/third-place control; Uzbekistan must win despite a heavy goal-difference deficit. Late-game openness is higher than a normal group match.
- player_state_summary: DR Congo Mpasi, five-back resistance and Wissa/Masuaku route remain live; Uzbekistan have conceded 8 and the goalkeeper/CB/DM chain is downgraded.
- injury_availability: No stable new official injuries found locally, but T-75 lineups, card status and minutes limits remain missing.
- tactical_matchup: DR Congo physical duels, second balls and counter routes fit Uzbekistan wing-back space; Uzbekistan Fayzullaev/Shomurodov transition route remains live.
- schedule_environment: Uzbekistan goal-difference pressure can force late risk-taking and raise DR Congo transition tail.
- market_snapshot: 500 local HTML snapshot data/tmp_500_jczq_20260626.html; processdate=2026-06-27; matchtime=2026-06-28 07:30

### scores_and_adjustments

- team_strength_score: {"home":67,"away":62}
- attack_score: {"home":65,"away":61.5}
- defense_score: {"home":69.5,"away":56}
- player_state_adjustment: {"home":0.02,"away":-0.06,"note":"DR Congo Mpasi, five-back resistance and Wissa/Masuaku route remain live; Uzbekistan have conceded 8 and the goalkeeper/CB/DM chain is downgraded."}
- injury_adjustment: {"home":-0.01,"away":-0.01,"note":"No stable new official injuries found locally, but T-75 lineups, card status and minutes limits remain missing."}
- tactical_matchup_adjustment: {"home":0.05,"away":-0.03,"note":"DR Congo physical duels, second balls and counter routes fit Uzbekistan wing-back space; Uzbekistan Fayzullaev/Shomurodov transition route remains live."}
- schedule_environment_adjustment: {"home":0,"away":-0.01,"note":"Uzbekistan goal-difference pressure can force late risk-taking and raise DR Congo transition tail."}
- market_adjustment: {"home":0.01,"draw":0,"away":-0.01,"note":"Local 500 1X2 snapshot clearly leans DR Congo; model absorbs the direction but keeps a discount for DR Congo settled-attack efficiency."}
- third_round_context: DR Congo have 1 point and Uzbekistan have 0. DR Congo need a win to reach 4 points and chase second/third-place control; Uzbekistan must win despite a heavy goal-difference deficit. Late-game openness is higher than a normal group match.

### poisson_score_matrix_0_to_5

| H\A | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.0758 | 0.0780 | 0.0402 | 0.0138 | 0.0036 | 0.0007 |
| 1 | 0.1174 | 0.1210 | 0.0623 | 0.0214 | 0.0055 | 0.0011 |
| 2 | 0.0910 | 0.0938 | 0.0483 | 0.0166 | 0.0043 | 0.0009 |
| 3 | 0.0470 | 0.0484 | 0.0249 | 0.0086 | 0.0022 | 0.0005 |
| 4 | 0.0182 | 0.0188 | 0.0097 | 0.0033 | 0.0009 | 0.0002 |
| 5 | 0.0056 | 0.0058 | 0.0030 | 0.0010 | 0.0003 | 0.0001 |

- tail: 0.0059

### confidence_and_quality

- confidence_interval: {"home_win":[0.42,0.57],"draw":[0.2,0.31],"away_win":[0.19,0.33],"home_xg":[1.25,1.86],"away_xg":[0.78,1.3]}
- margin_bucket_probability: {"home_by_1":0.2397,"home_by_2_plus":0.2538,"draw":0.2545,"away_by_1":0.1593,"away_by_2_plus":0.0926}
- blowout_tail_probability: {"home_4plus_goals":0.0721,"away_4plus_goals":0.0209}
- uncertainty: DR Congo attack sample is thin; if they fail to score first, draw/low-score tails rise.; Uzbekistan losses came against strong teams; an early transition goal keeps away-win tail non-zero.; Same-source totals and final odds timestamp are missing, limiting market calibration weight.
- red_team_status: pending_red_team
- final_probabilities: {"status":"pre_red_team_equal_to_model_probabilities","home_win":0.4936,"draw":0.2545,"away_win":0.2519}
- postmatch_error: null
- parameter_updates: {"status":"placeholder_pre_match","items":[]}

## handoff

- Colombia vs Portugal: Portugal is a small model favorite, but the market is more Portugal-heavy than the model. Main sensitivity variables are Portugal lineup/CB availability, Colombia's first-place risk posture, and whether an early goal breaks the low-risk third-round script.
- DR Congo vs Uzbekistan: DR Congo is the model favorite, but DR Congo settled-attack efficiency and Uzbekistan transition tail remain the main uncertainties. If the match is level late, event volatility rises.
- betting_gate_status: discussion_only_hold.
