---
phase: l_group_round3_v3_quant_prediction
group: L
round: 3
status: completed_pre_red_team_pending_discussion_only
owner: worldcup-data-modeler
betting_gate_status: discussion_only_hold
red_team_status: pending
---

# L Group Round 3 V3 Quant Modeler

This output follows match-prediction-standard-template-v3. It is a probability model only and gives no betting advice. It rebuilds the chain from the 20260626 L round3 prediction JSON plus local thread summaries, postmatch reviews, player_state files and local odds snapshots.

## Summary

| Match | xG | 1X2 final | Top scorelines | Main gap |
| --- | --- | --- | --- | --- |
| Croatia vs Ghana | 1.28-0.78 | 50.4% / 29.0% / 20.6% | 1-0 16.3%; 0-0 12.7%; 1-1 12.7%; 2-0 10.4%; 0-1 9.9% | Official starting XI not published. |
| Panama vs England | 0.5-1.75 | 10.0% / 22.0% / 68.0% | 0-1 18.4%; 0-2 16.1%; 0-0 10.5%; 0-3 9.4%; 1-1 9.2% | Official starting XI not published. |

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

## Croatia vs Ghana

### Conclusion

| Result | Probability |
| --- | ---: |
| Croatia win | 50.4% |
| Draw | 29.0% |
| Ghana win | 20.6% |

Primary score cluster: 1-0, 0-0, 1-1, 2-0, 0-1. Final xG: 1.28-0.78. Red-team status: pending.

### Previous Two Rounds And Third-Round Context

Croatia on 3 points likely need a win for direct top-two control; Ghana on 4 points can value a draw strongly.

- simultaneous_match_dependency: Panama vs England score can alter Croatia/Ghana risk appetite after 60 minutes.
- strategic_tempo_adjustment: Raised draw floor and one-goal corridor; Croatia urgency rises if level late.
- rotation_risk: Medium-low for both due qualification stakes.

### Predicted Lineups Reference Status

- source_status: probable_not_official
- captured_at: 2026-06-27 00:00 Asia/Shanghai
- official_lineup_gate: T-75 official XI required before final model lock
- home formation: 4-2-3-1 / 3-4-2-1 hybrid; confidence medium_low
- away formation: 5-4-1 / 4-4-1-1 defensive; confidence medium_low

Home XI: GK Dominik Livakovic; RB Josip Stanisic; CB Josip Sutalo; CB Josko Gvardiol; LB Ivan Perisic; CM Luka Modric; CM Petar Sucic; RW Martin Baturina; AM Mario Pasalic; LW Andrej Kramaric; ST Ante Budimir.

Away XI: GK Benjamin Asare; RWB Caleb Yirenkyi; CB Jonas Adjetey; CB Jerome Opoku; CB Gideon Mensah; LWB Marvin Senaya; CM Thomas Partey; CM Elisha Owusu; RM Antoine Semenyo; LM Jordan Ayew; ST Inaki Williams.

Lineup rerun triggers: Official starting XI not published.; Lineup confidence is capped at medium before T-75.; More than two starter changes, keeper change, or formation flip requires xG/Poisson rerun.

### Factor Inputs

| factor | model input |
| --- | --- |
| baseline_strength | Croatia have experience and midfield control edge; Ghana have stronger defensive form than market may imply. |
| attack | Croatia rely on Modric tempo, Budimir/Kramaric box threat and second phase; Ghana rely on Semenyo/Jordan Ayew/Inaki Williams transition. |
| defense | Ghana have two clean sheets and strong CB form; Croatia conceded 4 vs England but controlled Panama to low output. |
| player_state | Croatia Modric/Budimir/Stanisic positive but veteran load watch; Ghana Adjetey/Opoku high, Ati-Zigi/Partey availability unresolved. |
| injury_suspension_minutes | Ati-Zigi and Partey need T-75 check; Croatia veteran minutes and possible rotation remain open. |
| tactical_matchup | Croatia controlled possession vs Ghana low block; Ghana draw-enough posture and physical counter threat keep draw/away tails. |
| schedule_environment | Simultaneous final match at Beijing 05:00; no clear venue/weather edge in local files. |
| market | SPF favors Croatia more than model; -1 handicap weakens strong-margin interpretation. |

### Scores And Adjustments

- team_strength_score: {"home":70,"away":64}
- attack_score: {"home":66,"away":58}
- defense_score: {"home":65,"away":70}
- player_state_adjustment: {"home":0.02,"away":0.05,"note":"Ghana defensive state upgraded after 0-0 vs England; Croatia small positive from controlled 1-0 vs Panama."}
- injury_adjustment: {"home":-0.02,"away":-0.04,"note":"Croatia veteran load and Ghana keeper/Partey uncertainty both remain; Ghana penalty slightly larger."}
- tactical_matchup_adjustment: {"home":0.04,"away":0.03,"note":"Croatia control and second phase edge, but Ghana low-block/counter path is real."}
- schedule_environment_adjustment: {"home":0,"away":0,"note":"Same kickoff, no confirmed environment edge."}
- market_adjustment: {"home":0.021,"draw":0,"away":-0.021,"note":"Ordinary SPF pulls Croatia slightly upward, but handicap market prevents large-margin expansion."}

### xG And Probability Chain

- expected_goals: {"pre_market":{"home":1.28,"away":0.78},"final":{"home":1.28,"away":0.78},"note":"v3 keeps the 20260626 red-team-calibrated xG baseline."}
- raw_poisson_1x2: {"home_win":0.482695,"draw":0.290218,"away_win":0.227087}
- final_probabilities: {"status":"pre_red_team_v3_equal_to_20260626_calibrated_baseline","home_win":0.503837,"draw":0.290208,"away_win":0.205955}
- totals_probabilities: {"over_2_5":0.339559,"under_2_5":0.660441,"over_3_5":0.153862,"under_3_5":0.846138,"btts_yes":0.391011,"btts_no":0.608989}
- confidence_interval: {"home_win":[0.43,0.57],"draw":[0.24,0.35],"away_win":[0.15,0.27],"home_xg":[1.02,1.55],"away_xg":[0.56,1.02]}

### Poisson Score Matrix 0-0 To 5-5

| H/A | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.127454 | 0.099414 | 0.038771 | 0.010081 | 0.001966 | 0.000307 |
| 1 | 0.163141 | 0.127250 | 0.049628 | 0.012903 | 0.002516 | 0.000393 |
| 2 | 0.104410 | 0.081440 | 0.031762 | 0.008258 | 0.001610 | 0.000251 |
| 3 | 0.044548 | 0.034748 | 0.013552 | 0.003523 | 0.000687 | 0.000107 |
| 4 | 0.014255 | 0.011119 | 0.004337 | 0.001127 | 0.000220 | 0.000034 |
| 5 | 0.003649 | 0.002847 | 0.001110 | 0.000289 | 0.000056 | 0.000009 |

- tail_probability: 0.002227
- matrix_sum_check: 1
- top_scorelines: 1-0 16.3%; 0-0 12.7%; 1-1 12.7%; 2-0 10.4%; 0-1 9.9%

### Odds Implied Probability And Delta

- odds_implied_probability: {"ordinary_spf":{"labels":["克罗地亚胜","平","加纳胜"],"odds":[1.6,3.05,5.65],"raw_implied":[0.625,0.327869,0.176991],"overround":1.12986,"normalized":[0.553166,0.290185,0.156649]},"handicap_spf":{"handicap":"克罗地亚 -1","labels":["让胜","让平","让负"],"odds":[2.92,3.35,2.05],"raw_implied":[0.342466,0.298507,0.487805],"overround":1.128778,"normalized":[0.303395,0.264452,0.432153]},"source":"中国足彩网竞彩混合页","captured_at":"2026-06-26T17:43:00+08:00","sale_status":"普通胜平负与让球胜平负均显示可售"}
- model_market_delta: {"home_win":-0.049329,"draw":0.000023,"away_win":0.049306}

### Risk And Backtest Placeholders

- red_team_status: pending
- postmatch_error: null
- parameter_updates: null
- quality_notes: Previous red-team stance was revise_for_probability / hold_for_betting; this v3 file keeps red_team_status pending by request.; Ghana draw incentive and low block are major sensitivity variables.; T-75 lineups, Ati-Zigi/Partey and Croatia veteran minutes can move xG.

## Panama vs England

### Conclusion

| Result | Probability |
| --- | ---: |
| Panama win | 10.0% |
| Draw | 22.0% |
| England win | 68.0% |

Primary score cluster: 0-1, 0-2, 0-0, 0-3, 1-1. Final xG: 0.5-1.75. Red-team status: pending.

### Previous Two Rounds And Third-Round Context

England on 4 points can protect top-two but may want first place; Panama on 0 points have only theoretical third-place motivation.

- simultaneous_match_dependency: Croatia-Ghana state can change England risk appetite and Panama urgency.
- strategic_tempo_adjustment: Low-event England control early; late Panama chase can open England transition chances.
- rotation_risk: Medium for England, medium for Panama shape/personnel.

### Predicted Lineups Reference Status

- source_status: probable_not_official
- captured_at: 2026-06-27 00:00 Asia/Shanghai
- official_lineup_gate: T-75 official XI required before final model lock
- home formation: 4-4-2 / 4-2-3-1 chase shape; confidence medium_low
- away formation: 4-2-3-1; confidence medium_low

Home XI: GK Orlando Mosquera; RB Amir Murillo; CB Jose Cordoba; CB Andres Andrade; LB Cesar Blackman; CM Cristian Martinez; CM Adalberto Carrasquilla; RW Yoel Barcenas; AM Carlos Harvey; LW Jose Luis Rodriguez; ST Jose Fajardo.

Away XI: GK Jordan Pickford; RB Reece James; CB Ezri Konsa; CB John Stones; LB Nico OReilly; CM Declan Rice; CM Elliot Anderson; RW Bukayo Saka; AM Jude Bellingham; LW Marcus Rashford; ST Harry Kane.

Lineup rerun triggers: Official starting XI not published.; Lineup confidence is capped at medium before T-75.; More than two starter changes, keeper change, or formation flip requires xG/Poisson rerun.

### Factor Inputs

| factor | model input |
| --- | --- |
| baseline_strength | England remain the strongest team in group; Panama have two 0-1 losses and limited top-two path. |
| attack | Panama crossing/set-piece routes and Murillo/Carrasquilla transitions; England Kane/Bellingham/Saka/Rashford/Kane finishing but Ghana 0-0 exposed low-block conversion risk. |
| defense | Panama defense has not collapsed, two one-goal losses; England conceded twice vs Croatia but then kept Ghana at 0. |
| player_state | England Kane/Bellingham/Rice/Saka paths strong but Reece James treatment and rotation watch; Panama Carrasquilla start uncertain and attack ceiling low. |
| injury_suspension_minutes | T-75 official lineup missing; England may rotate, Panama may alter shape due must-win/theoretical third-place chase. |
| tactical_matchup | England control vs Panama low/mid block; Panama must eventually open, raising England late transition tail. |
| schedule_environment | Simultaneous final round; England can value risk control while Panama need a result. |
| market | Ordinary SPF unavailable; +2 handicap suggests deep England margin is not automatic. |

### Scores And Adjustments

- team_strength_score: {"home":52,"away":82}
- attack_score: {"home":47,"away":80}
- defense_score: {"home":58,"away":75}
- player_state_adjustment: {"home":-0.03,"away":0.04,"note":"Panama attack state remains low; England still strong but Ghana draw reduces conversion optimism."}
- injury_adjustment: {"home":-0.02,"away":-0.04,"note":"Carrasquilla and England rotation/Reece James/Rice checks keep uncertainty."}
- tactical_matchup_adjustment: {"home":0,"away":0.07,"note":"England better suited to exploit Panama once match opens, but low-block phase caps early xG."}
- schedule_environment_adjustment: {"home":0.01,"away":-0.02,"note":"Third-round risk management slightly lowers England ceiling."}
- market_adjustment: {"home":0,"draw":0,"away":0,"note":"No ordinary SPF; handicap signal used only as margin warning, not 1X2 calibration."}

### xG And Probability Chain

- expected_goals: {"pre_market":{"home":0.5,"away":1.75},"final":{"home":0.5,"away":1.75},"note":"v3 keeps the 20260626 red-team-calibrated xG baseline."}
- raw_poisson_1x2: {"home_win":0.099919,"draw":0.21987,"away_win":0.680211}
- final_probabilities: {"status":"pre_red_team_v3_equal_to_20260626_calibrated_baseline","home_win":0.099919,"draw":0.21987,"away_win":0.680211}
- totals_probabilities: {"over_2_5":0.390661,"under_2_5":0.609339,"over_3_5":0.190567,"under_3_5":0.809433,"btts_yes":0.325095,"btts_no":0.674905}
- confidence_interval: {"home_win":[0.06,0.14],"draw":[0.17,0.28],"away_win":[0.61,0.75],"home_xg":[0.32,0.72],"away_xg":[1.38,2.08]}

### Poisson Score Matrix 0-0 To 5-5

| H/A | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 0.105399 | 0.184449 | 0.161393 | 0.094146 | 0.041189 | 0.014416 |
| 1 | 0.052700 | 0.092224 | 0.080696 | 0.047073 | 0.020594 | 0.007208 |
| 2 | 0.013175 | 0.023056 | 0.020174 | 0.011768 | 0.005149 | 0.001802 |
| 3 | 0.002196 | 0.003843 | 0.003362 | 0.001961 | 0.000858 | 0.000300 |
| 4 | 0.000274 | 0.000480 | 0.000420 | 0.000245 | 0.000107 | 0.000038 |
| 5 | 0.000027 | 0.000048 | 0.000042 | 0.000025 | 0.000011 | 0.000004 |

- tail_probability: 0.009148
- matrix_sum_check: 1
- top_scorelines: 0-1 18.4%; 0-2 16.1%; 0-0 10.5%; 0-3 9.4%; 1-1 9.2%

### Odds Implied Probability And Delta

- odds_implied_probability: {"ordinary_spf":null,"handicap_spf":{"handicap":"巴拿马 +2","labels":["让胜","让平","让负"],"odds":[2.48,3.9,2.13],"raw_implied":[0.403226,0.25641,0.469484],"overround":1.12912,"normalized":[0.357115,0.227089,0.415796]},"source":"中国足彩网竞彩混合页","captured_at":"2026-06-26T17:43:00+08:00","sale_status":"普通胜平负显示未开售；让球胜平负显示可售"}
- model_market_delta: {"home_win":null,"draw":null,"away_win":null,"note":"ordinary 1X2 unavailable; handicap market is not translated into direct 1X2 delta"}

### Risk And Backtest Placeholders

- red_team_status: pending
- postmatch_error: null
- parameter_updates: null
- quality_notes: Previous red-team stance was hold_for_betting and warned England are not automatic blowout.; Ordinary SPF missing, so model-market delta for 1X2 is null.; England lineup/rotation and Panama Carrasquilla availability can change attack ceiling.

## File Index

- modeler.json: data/thread_outputs/l-group-round3-v3-20260627/modeler.json
- prior baseline: data/outputs/match_predictions/l-group-round3-quant-prediction-20260626.json
- prior thread outputs: data/thread_outputs/l-group-round3-prediction-20260626/

No betting advice is included.
