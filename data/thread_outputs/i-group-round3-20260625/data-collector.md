# Group I Round 3 Data Collector

- status: `partial`
- final_status: `partial_ready_for_model_with_known_gaps`
- created_at: `2026-06-25T15:20:00+08:00`
- updated_at: `2026-06-25T15:14:03.8549917+08:00`
- source_time: `2026-06-25T15:06:10+08:00`
- json_validated: `true`
- cross_check_status: `unavailable_or_partial`

## Sources

1. ZGZCW jcmini  
   <https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini>  
   source_system_time: `2026-06-25 14:57:23`

2. Wikipedia Group I  
   <https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_I>

3. Wikipedia 2026 World Cup rules  
   <https://en.wikipedia.org/wiki/2026_FIFA_World_Cup>

## Standings Snapshot

| Team | Pts | GD | Rank | Scenario |
| --- | ---: | ---: | ---: | --- |
| France | 6 | +5 | 1 | draw enough for first |
| Norway | 6 | +4 | 2 | win sends Norway to first |
| Senegal | 0 | -3 | 3 | top two eliminated, racing for third |
| Iraq | 0 | -6 | 4 | must win to move up to third |

## Fixture 061

- lottery_match_code: `周五061`
- local_label: `France vs Norway`
- external_label: `Norway vs France`
- conflict_status: `conflicting_home_away_order`
- kickoff_bjt: `2026-06-26 03:00`
- venue: `Gillette Stadium, Foxborough`
- SPF: `4.65 / 3.90 / 1.52`
- SPF devig: `0.1905 / 0.2270 / 0.5825`
- handicap SPF: `+1 -> 2.18 / 3.45 / 2.63`
- handicap devig: `0.4064 / 0.2568 / 0.3368`
- T-75 lineup status: `not_yet_released`
- gaps: `Saliba workload`, `Dembele workload`, `Doue workload`, `Julian Ryerson availability`, `Moller Wolfe recovery`, `Schjelderup clearance`, `Odegaard workload`

## Fixture 062

- lottery_match_code: `周五062`
- local_label: `Senegal vs Iraq`
- external_label: `Senegal vs Iraq`
- kickoff_bjt: `2026-06-26 03:00`
- venue: `BMO Field, Toronto`
- SPF: `not_on_sale`
- handicap SPF: `-2 -> 2.54 / 3.96 / 2.07`
- handicap devig: `0.3486 / 0.2236 / 0.4278`
- T-75 lineup status: `not_yet_released`
- gaps: `Edouard Mendy availability`, `goalkeeper depth if Mendy out`, `Aymen Hussein availability`, `CF replacement plan`, `official yellow-card bulletin`

## Risk Notes

- France: no new confirmed public absence captured; medium rotation risk.
- Norway: Ryerson pending review; low-to-medium rotation risk.
- Senegal: Mendy pending review; top-two route closed, third-place motivation remains.
- Iraq: Aymen Hussein pending review; one locally observed yellow for Zaid Tahseen; must-win pressure.

## Model-Usable Inputs

- points
- rank
- goal_difference
- qualification_tags
- simultaneous group dependency
- SPF and handicap SPF snapshots
- devig implied probabilities
- injury pending-review flags
- rotation risk
- yellow-card risk status
- T-75 lineup not released flag

## Key Gaps

1. official T-75 lineups not released
2. no official full yellow-card / suspension bulletin captured
3. Sina / Dongqiudi structured odds cross-check unavailable
4. weather packet not refreshed in this loop
