# L Group Round 3 Model Backtest And Parameter Iteration

Status: `completed_model_backtest_partial_player_state`. Scope is only Croatia vs Ghana and Panama vs England. This is not betting advice.

## Result Hit Table

| Match | Pre-match xG | Actual score | Primary 1X2 hit | Actual bucket probability | Brier | Log loss | Top3 score | Top5 score | Totals direction | Handicap settlement |
|---|---:|---:|---|---:|---:|---:|---|---|---|---|
| Croatia vs Ghana | 1.28-0.78 | 2-1 | hit | 48.5% | 0.40235 | 0.723606 | miss | miss | U2.5 miss / U3.5 hit | handicap draw because Croatia won by exactly one goal |
| Panama vs England | 0.5-1.75 | 0-2 | hit | 64.5% | 0.19685 | 0.438505 | hit | hit | U2.5 hit / U3.5 hit | handicap draw because England won by exactly two goals |

## Match Diagnosis

### Croatia vs Ghana

- Actual score: 2-1. Pre-match primary direction: home_win. Actual outcome probability: 48.5%.
- Scoreline layer: actual-score matrix probability 8.1%, rank 6; Top3=miss, Top5=miss.
- xG error: home 0.72, away 0.22, total goals 0.94.
- Market calibration: Market was stronger than model on Croatia home win; actual direction supports market, while red-team discount was directionally conservative.; handicap/margin layer: The exact one-goal win bucket was the correct settlement layer; it must not be replaced by ordinary Croatia win probability..
- postmatch_error: Croatia win direction hit, but 2-1 was just outside Top5 and over 2.5 beat the low-total lean.
- factor_error: Market home-win lean helped; red-team discount correctly kept uncertainty but may have reduced Croatia direction too far. Croatia midfield/control and set-piece/second-phase pressure were enough for the one-goal win, while Ghana still retained one-goal transition/set-piece path. Croatia veteran control and Budimir/Kramaric-style penalty-box routes were slightly underweighted in the 2-1 branch.
- score_tail_error: low_medium; 2-1 was not Top5 but carried about 8.1% mass and ranked near the main cluster. This is not a heavy-tail miss; it is a one-goal win plus BTTS/over-2.5 branch that should be more visible.
- draw_floor_error: low; Draw floor was not the primary miss. The model already lifted draw after red-team, but actual match confirmed Croatia edge.
- third_round_context_error: medium_low; Third-round must-win pressure for Croatia was handled directionally, but the model kept the total-goal profile too low once Ghana had to chase and Croatia could still find a second.

### Panama vs England

- Actual score: 0-2. Pre-match primary direction: away_win. Actual outcome probability: 64.5%.
- Scoreline layer: actual-score matrix probability 16.1%, rank 2; Top3=hit, Top5=hit.
- xG error: home 0.5, away 0.25, total goals 0.25.
- Market calibration: Ordinary 1X2 was missing in the captured packet; England direction is evaluated by model only.; handicap/margin layer: The +2 draw bucket matched the final margin; the model had the exact two-goal corridor visible through 0-2 as Top2..
- postmatch_error: England win direction hit and 0-2 was Top2. The model captured a strong-team controlled win without forcing a 3+ blowout.
- factor_error: Ordinary 1X2 market was missing, but +2 handicap draw aligned with the exact two-goal corridor. England low-block breaking improved enough for 0-2, but Panama defensive resistance still prevented the blowout tail. England quality and bench/late-break edge were present, while rotation/minutes management kept the ceiling below a large win.
- score_tail_error: low; 0-2 was the second-most likely score and hit Top3/Top5. No score-tail miss; the lesson is to keep the two-goal favorite corridor separate from 3+ blowout.
- draw_floor_error: low; Draw floor was reasonably discounted; Panama 0-goal attack and England pressure removed the draw path.
- third_round_context_error: low_medium; Third-round context was mostly calibrated: England still pushed for group position and found two goals, but rotation/low-block resistance kept the match from becoming a big-margin tail.

## Parameter Updates

- `croatia_set_piece_second_phase_tail`: +0.02 to +0.04 into 2-1/2-0/1-goal-win branches when Croatia must win and fields Budimir/Kramaric/Modric or similar set-piece/control spine.; cap/scope: do not add more than +0.03 to home win directly; mostly redistribute score matrix.; reason: Croatia 2-1 Ghana was directionally correct but the BTTS one-goal-win score sat just outside Top5.
- `favorite_two_goal_corridor_vs_low_block`: +0.03 to +0.05 into 0-2/1-3/2-goal-margin branch for elite favorite versus low block when favorite still needs group position but may manage minutes.; cap/scope: keep 3+ blowout tail separate; do not automatically lift blowout probability.; reason: England 0-2 Panama shows late/controlled break without a large-margin explosion.
- `under_2_5_confidence_cap_when_must_win_and_btts_path`: cap under-2.5 confidence below 0.62 when favorite/control team must win and opponent has credible transition or set-piece one-goal route.; cap/scope: confidence cap only unless xG total is also revised.; reason: Croatia-Ghana over 2.5 emerged from a 2-1 branch despite low-total baseline.
- `handicap_exact_margin_reporting`: always publish exact one-goal/two-goal margin bucket beside ordinary 1X2 in third-round reports.; cap/scope: schema/reporting change; no direct probability shift.; reason: Croatia -1 draw and Panama +2 draw were both the actual handicap settlement layer.
- `red_team_favorite_discount_limit`: when market and model both prefer favorite and must-win context is strong, limit red-team favorite discount to -0.02 to -0.03 unless lineup/availability shock is confirmed.; cap/scope: single match pre-result shift <=0.03.; reason: Croatia home-win discount was directionally conservative but actual supported the favorite.
- `panama_attack_floor_against_elite`: keep Panama/low-creation underdog scoring floor suppressed unless official lineup shows multiple transition starters; no upward change after 0-2.; cap/scope: do not set BTTS floor above 0.32 in similar low-creation profile.; reason: Panama again failed to score; England clean-sheet path was correctly visible.

## Player-State Link

Status: `partial_not_checked_for_update_in_this_model_only_run`. The user requested model backtest output only; data-thread player-state normalization is not assumed complete here.
