---
phase: j_group_round3_v3_quant_prediction
group: J
round: 3
status: completed_pre_red_team_pending_discussion_only
owner: worldcup-data-modeler
betting_gate_status: discussion_only_hold
red_team_status: pending
---

# J Group Round 3 V3 Quant Modeler

This output follows match-prediction-standard-template-v3. It is a probability model only and gives no betting advice. It rebuilds the chain from the 20260626 J round3 prediction JSON plus local thread summaries, postmatch reviews, player_state files and local odds snapshots.

## Summary

| Match | xG | 1X2 final | Top scorelines | Main gap |
| --- | --- | --- | --- | --- |
| Algeria vs Austria | 1.14-1.31 | 31.5% / 31.0% / 37.5% | 1-1 12.9%; 0-1 11.3%; 1-0 9.8%; 0-0 8.6%; 1-2 8.4% | Official starting XI not published. |
| Jordan vs Argentina | 0.56-1.95 | 10.6% / 22.4% / 67.0% | 0-1 15.8%; 0-2 15.5%; 0-3 10.0%; 1-1 8.9%; 1-2 8.7% | Official starting XI not published. |

## Factor Weights

| factor | weight |
| --- | ---: |
| baseline_strength | 0.22 |
| attack | 0.14 |
| defense | 0.14 |
| player_state | 0.13 |
| injury_suspension_minutes | 0.08 |
| tactical_matchup | 0.12 |
| schedule_environment | 0.05 |
| third_round_context | 0.14 |
| market | 0.08 |

## Algeria vs Austria

### Conclusion

| Result | Probability |
| --- | ---: |
| Algeria win | 31.5% |
| Draw | 31.0% |
| Austria win | 37.5% |

Primary score cluster: 1-1, 0-1, 1-0, 0-0, 1-2. Final xG: 1.14-1.31. Red-team status: pending.

### Previous Two Rounds And Third-Round Context

Both on 3 points; Austria have better GD and higher draw value, Algeria likely need a win or strong third-place comparison.

- simultaneous_match_dependency: Jordan vs Argentina can alter third-place threshold psychologically, but both J matches kick off together.
- strategic_tempo_adjustment: Draw floor raised; if level after 60 minutes Algeria has stronger need to open game.
- rotation_risk: Medium-low; both still have meaningful qualification stakes.

### Predicted Lineups Reference Status

- source_status: probable_not_official
- captured_at: 2026-06-27 00:00 Asia/Shanghai
- official_lineup_gate: T-75 official XI required before final model lock
- home formation: 4-3-3; confidence medium_low
- away formation: 4-2-3-1; confidence medium

Home XI: GK Luca Zidane; RB Rafik Belghali; CB Aissa Mandi; CB Ramy Bensebaini; LB Rayan Ait-Nouri; DM Nabil Bentaleb; CM Ramiz Zerrouki; AM Ibrahim Maza; RW Riyad Mahrez; LW Fares Chaibi; ST Amine Gouiri.

Away XI: GK Alexander Schlager; RB Konrad Laimer; CB Kevin Danso; CB Philipp Lienhart; LB David Alaba; DM Nicolas Seiwald; CM Xaver Schlager; AM Marcel Sabitzer; RW Romano Schmid; LW Paul Wanner; ST Michael Gregoritsch.

Lineup rerun triggers: Official starting XI not published.; Lineup confidence is capped at medium before T-75.; More than two starter changes or any formation flip requires xG/Poisson rerun.

### Factor Inputs

| factor | model input |
| --- | --- |
| baseline_strength | Austria hold a small squad/structure edge; Algeria have comparable front-line individual quality but less stable defensive record. |
| attack | Algeria Mahrez/Gouiri/Maza/Chaibi route upgraded after Jordan comeback; Austria press, set pieces and Sabitzer creation remain active. |
| defense | Austria conceded 3 total after two rounds but held Algeria-level opponent structure better; Algeria conceded 4 and can be stressed by high press. |
| player_state | Algeria Gouiri/Mahrez up, Zerrouki/Boudaoui minutes/discipline mixed; Austria Sabitzer/Seiwald stable, Alaba minutes watch, striker conversion mixed. |
| injury_suspension_minutes | No final T-75 confirmation; Alaba and Algeria midfield choices remain minutes/role watch. |
| tactical_matchup | Austria high press and second balls vs Algeria first pass; Algeria late acceleration and wide individual quality vs Austria fullback space. |
| schedule_environment | Simultaneous final round at Beijing 10:00; no clear environment edge from local files. |
| market | Ordinary SPF market has unusually high draw no-vig around 42.0%, pushing model to keep draw floor. |

### Scores And Adjustments

- team_strength_score: {"home":66,"away":70}
- attack_score: {"home":67,"away":69}
- defense_score: {"home":61,"away":67}
- player_state_adjustment: {"home":0.04,"away":0.01,"note":"Algeria attacking state upgraded after second-round comeback; Austria process stable but finishing vs Argentina downgraded."}
- injury_adjustment: {"home":-0.01,"away":-0.02,"note":"No hard absence, but Austria Alaba/minutes and Algeria midfield discipline keep small risk penalty."}
- tactical_matchup_adjustment: {"home":0.02,"away":0.03,"note":"Austria process edge remains, Algeria late speed prevents over-discounting home win tail."}
- schedule_environment_adjustment: {"home":0,"away":0,"note":"Same kickoff and no local weather edge available."}
- market_adjustment: {"home":-0.008,"draw":0.038,"away":-0.03,"note":"Market draw signal and red-team revise reduce Austria raw Poisson edge."}

### xG And Probability Chain

- expected_goals: {"pre_market":{"home":1.14,"away":1.31},"final":{"home":1.14,"away":1.31},"note":"v3 keeps 20260626 red-team-calibrated xG baseline; market calibration affects final 1X2, not xG."}
- raw_poisson_1x2: {"home_win":0.323156,"draw":0.272054,"away_win":0.40479}
- final_probabilities: {"status":"pre_red_team_v3_equal_to_20260626_calibrated_baseline","home_win":0.315,"draw":0.31,"away_win":0.375}
- totals_probabilities: {"over_2_5":0.443299,"under_2_5":0.556701,"over_3_5":0.231791,"under_3_5":0.768209,"btts_yes":0.496655,"btts_no":0.503345}
- confidence_interval: {"home_win":[0.26,0.37],"draw":[0.25,0.36],"away_win":[0.31,0.44],"home_xg":[0.92,1.38],"away_xg":[1.05,1.58]}

### Poisson Score Matrix 0-0 To 5-5

| H/A | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.086294 | 0.113045 | 0.074044 | 0.032333 | 0.010589 | 0.002774 |
| 1 | 0.098375 | 0.128871 | 0.084410 | 0.036859 | 0.012071 | 0.003163 |
| 2 | 0.056074 | 0.073456 | 0.048114 | 0.021010 | 0.006881 | 0.001803 |
| 3 | 0.021308 | 0.027913 | 0.018283 | 0.007984 | 0.002615 | 0.000685 |
| 4 | 0.006073 | 0.007955 | 0.005211 | 0.002275 | 0.000745 | 0.000195 |
| 5 | 0.001385 | 0.001814 | 0.001188 | 0.000519 | 0.000170 | 0.000045 |

- tail_probability: 0.003473
- matrix_sum_check: 1
- top_scorelines: 1-1 12.9%; 0-1 11.3%; 1-0 9.8%; 0-0 8.6%; 1-2 8.4%

### Odds Implied Probability And Delta

- odds_implied_probability: {"ordinary_spf":{"odds":[3.35,2.11,2.8],"raw_implied":[0.298507,0.473934,0.357143],"overround":1.129584,"normalized":[0.264263,0.419565,0.316172]},"handicap_spf":{"handicap":"+1 Algeria","odds":[1.31,4.35,7.35],"raw_implied":[0.763359,0.229885,0.136054],"overround":1.129298,"normalized":[0.675959,0.203565,0.120477]},"source":"ZGZCW/500 local snapshots captured 2026-06-26; ordinary and handicap SPF available"}
- model_market_delta: {"home_win":0.050737,"draw":-0.109565,"away_win":0.058828}

### Risk And Backtest Placeholders

- red_team_status: pending
- postmatch_error: null
- parameter_updates: null
- quality_notes: Previous red-team stance was revise, but this v3 file is pre-red-team pending by request.; Draw market is much higher than raw Poisson; do not treat Austria as a stable-win script.; T-75 lineups and latest odds can move draw/home-tail materially.

## Jordan vs Argentina

### Conclusion

| Result | Probability |
| --- | ---: |
| Jordan win | 10.6% |
| Draw | 22.4% |
| Argentina win | 67.0% |

Primary score cluster: 0-1, 0-2, 0-3, 1-1, 1-2. Final xG: 0.56-1.95. Red-team status: pending.

### Previous Two Rounds And Third-Round Context

Argentina on 6 points and +5 GD are very likely first; Jordan on 0 points need a win and external third-place help.

- simultaneous_match_dependency: Algeria-Austria result can affect third-place threshold, but Jordan need a result regardless.
- strategic_tempo_adjustment: Argentina control-risk mode raises under/draw tails versus raw mismatch; Jordan late chase can reopen space.
- rotation_risk: Medium; Argentina may protect Messi or senior starters.

### Predicted Lineups Reference Status

- source_status: probable_not_official
- captured_at: 2026-06-27 00:00 Asia/Shanghai
- official_lineup_gate: T-75 official XI required before final model lock
- home formation: 5-4-1 / 3-4-3 defensive; confidence medium_low
- away formation: 4-4-2 / 4-3-3 hybrid; confidence medium_low

Home XI: GK Yazeed Abulaila; RWB Ihsan Haddad; CB Yazan Al-Arab; CB Abdallah Nasib; CB Mo Abualnadi; LWB Mohannad Abu Taha; CM Nizar Al-Rashdan; CM Noor Al-Rawabdeh; RW Musa Al-Taamari; LW Mahmoud Al-Mardi; ST Ali Olwan.

Away XI: GK Emiliano Martinez; RB Nahuel Molina; CB Cristian Romero; CB Lisandro Martinez; LB Facundo Medina; CM Rodrigo De Paul; CM Enzo Fernandez; CM Alexis Mac Allister; LW Thiago Almada; SS Lionel Messi; ST Lautaro Martinez.

Lineup rerun triggers: Official starting XI not published.; Lineup confidence is capped at medium before T-75.; More than two starter changes or any formation flip requires xG/Poisson rerun.

### Factor Inputs

| factor | model input |
| --- | --- |
| baseline_strength | Argentina have elite strength and a 6-point, +5 GD start; Jordan remain bottom but not zero-resistance. |
| attack | Argentina Messi/Lautaro/Almada/De Paul chain; Jordan Al-Taamari/Olwan counter route and set pieces. |
| defense | Argentina have two clean sheets; Jordan conceded 5 but showed first-half resistance vs Algeria. |
| player_state | Messi at top internal state but age/load risk; Jordan Al-Taamari/Al-Rashdan/Olwan are the main live paths. |
| injury_suspension_minutes | No official T-75 lineups. Messi/Argentina rotation and Romero minutes require recheck. |
| tactical_matchup | Argentina control and chance quality vs Jordan back five; Jordan low block can slow tempo and keep 0-1/0-2 corridor live. |
| schedule_environment | Same kickoff; Argentina likely manage health and first place rather than chase unnecessary margin. |
| market | Ordinary SPF unavailable; Jordan +2 handicap market warns against automatically expanding Argentina 3+ margin tail. |

### Scores And Adjustments

- team_strength_score: {"home":54,"away":84}
- attack_score: {"home":51,"away":85}
- defense_score: {"home":52,"away":84}
- player_state_adjustment: {"home":0,"away":0.07,"note":"Argentina state remains elite; Jordan counter players are live but defensive fatigue remains negative."}
- injury_adjustment: {"home":-0.01,"away":-0.05,"note":"Argentina rotation/Messi minutes are the key uncertainty; Jordan availability mostly probable but source quality partial."}
- tactical_matchup_adjustment: {"home":0.01,"away":0.07,"note":"Argentina control edge large, but low-block tempo cap keeps deep blowout tail moderated."}
- schedule_environment_adjustment: {"home":0.01,"away":-0.02,"note":"Third-round health/rotation management slightly suppresses Argentina ceiling."}
- market_adjustment: {"home":0.009,"draw":0.027,"away":-0.036,"note":"No ordinary SPF; red-team and +2 handicap signal cap Argentina 3+ margin tail and lower raw away win."}

### xG And Probability Chain

- expected_goals: {"pre_market":{"home":0.56,"away":1.95},"final":{"home":0.56,"away":1.95},"note":"v3 keeps 20260626 red-team-calibrated xG baseline; market calibration affects final 1X2, not xG."}
- raw_poisson_1x2: {"home_win":0.096944,"draw":0.19739,"away_win":0.705666}
- final_probabilities: {"status":"pre_red_team_v3_equal_to_20260626_calibrated_baseline","home_win":0.106,"draw":0.224,"away_win":0.67}
- totals_probabilities: {"over_2_5":0.458749,"under_2_5":0.541251,"over_3_5":0.244564,"under_3_5":0.755436,"btts_yes":0.367785,"btts_no":0.632215}
- confidence_interval: {"home_win":[0.07,0.15],"draw":[0.17,0.28],"away_win":[0.61,0.74],"home_xg":[0.38,0.78],"away_xg":[1.55,2.3]}

### Poisson Score Matrix 0-0 To 5-5

| H/A | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.081268 | 0.158473 | 0.154511 | 0.100432 | 0.048961 | 0.019095 |
| 1 | 0.045510 | 0.088745 | 0.086526 | 0.056242 | 0.027418 | 0.010693 |
| 2 | 0.012743 | 0.024849 | 0.024227 | 0.015748 | 0.007677 | 0.002994 |
| 3 | 0.002379 | 0.004638 | 0.004522 | 0.002940 | 0.001433 | 0.000559 |
| 4 | 0.000333 | 0.000649 | 0.000633 | 0.000412 | 0.000201 | 0.000078 |
| 5 | 0.000037 | 0.000073 | 0.000071 | 0.000046 | 0.000022 | 0.000009 |

- tail_probability: 0.014852
- matrix_sum_check: 1
- top_scorelines: 0-1 15.8%; 0-2 15.5%; 0-3 10.0%; 1-1 8.9%; 1-2 8.7%

### Odds Implied Probability And Delta

- odds_implied_probability: {"ordinary_spf":null,"handicap_spf":{"handicap":"+2 Jordan","odds":[2.28,3.85,2.32],"raw_implied":[0.438596,0.25974,0.431034],"overround":1.129371,"normalized":[0.388355,0.229987,0.381659]},"source":"ZGZCW/500 local snapshots captured 2026-06-26; ordinary SPF unavailable, handicap SPF only"}
- model_market_delta: {"home_win":null,"draw":null,"away_win":null,"note":"ordinary 1X2 not available; handicap market cannot be translated into direct 1X2 delta"}

### Risk And Backtest Placeholders

- red_team_status: pending
- postmatch_error: null
- parameter_updates: null
- quality_notes: Previous red-team stance was revise for blowout tail; v3 status remains pending by request.; Ordinary SPF missing; do not use +2 handicap as direct 1X2 market probability.; Messi/Argentina rotation can lower away xG and raise 0-1/0-2 corridor.

## File Index

- modeler.json: data/thread_outputs/j-group-round3-v3-20260627/modeler.json
- prior baseline: data/outputs/match_predictions/j-group-round3-quant-prediction-20260626.json
- prior thread outputs: data/thread_outputs/j-group-round3-prediction-20260626/

No betting advice is included.
