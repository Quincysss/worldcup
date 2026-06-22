# D组第一轮赛后复盘

phase: group_round_postmortem  
status: completed_match_review_no_pre_pick  
updated_at: 2026/06/17 11:15 +08:00  
group: D  
scope: D组第一轮赛后复盘；本组本地未找到第一轮赛前预测稿，因此不做命中率统计。

## 赛果总览

| 比赛 | 实际比分 | 本地赛前预测 |
| --- | --- | --- |
| 美国 vs 巴拉圭 | 美国 4-1 巴拉圭 | 未生成 |
| 澳大利亚 vs 土耳其 | 澳大利亚 2-0 土耳其 | 未生成 |

## 复盘结论

D 组第一轮是“强势开局组”。美国和澳大利亚都不是只拿结果，而是用较清晰的比赛方式拿结果。美国 4-1 这种比分说明它的主场能量、前场冲击和比赛状态转换非常强；澳大利亚 2-0 则更像成熟球队的效率胜利，身体对抗、防守纪律和定位球/边路推进都能支撑小组赛拿分。

巴拉圭的问题在于一旦被迫追分，防线距离和中场保护很难保持。土耳其则需要警惕“纸面技术不差，但被对抗和节奏压住”的风险。

## 模型补课

- 美国 `host_energy`、`transition_attack`、`front_line_conversion` 上调。
- 巴拉圭 `game_state_collapse_risk` 上调，尤其是先丢球后。
- 澳大利亚 `physical_floor` 和 `set_piece_floor` 上调。
- 土耳其 `duel_resistance` 和 `defensive_transition` 下调。

## 第二轮影响

美国会带着很强的小组主动权进入第二轮，但也要防热门升温后的盘口溢价。澳大利亚 2-0 开局很值钱，后续可以踢得更务实。巴拉圭和土耳其第二轮压力明显升高，尤其是防线稳定性要优先复核。

## 参考源

- ESPN World Cup fixtures/results: https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket
- FIFA Match Schedule: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/match-schedule

