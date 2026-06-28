# K组第三轮复盘

status: completed_with_partial_player_state_update  
updated_at: 2026-06-28T22:05:00+08:00  
role_threads: data_collector=fallback_after_systemError; tactics=completed_source_limited; modeler=completed; red_team=hold; betting_risk=postmatch_only

## 总结

K组第三轮给模型留下两个相反但同样重要的教训：哥伦比亚 0-0 葡萄牙说明“平局即可达成目标”的球队会主动压低事件量，必须给draw floor和0-0/1-1足够权重；刚果金 3-1 乌兹别克斯坦说明“必须赢且对手弱防线”的比赛不能只停在1-0/2-1中位数，要给后段加速、点球、补时球和两球以上穿盘尾部更大空间。

## 两场结果

| 比赛 | 赛前主方向 | 实际 | 方向 | Top3/Top5比分 | 主要误差 |
| --- | --- | --- | --- | --- | --- |
| 哥伦比亚 vs 葡萄牙 | 葡萄牙胜 | 0-0 | 未中 | 未中 | 平局地板、低事件0-0、热门税 |
| 刚果金 vs 乌兹别克斯坦 | 刚果金胜 | 3-1 | 命中 | 未中 | 两球以上尾部、over3.5、点球/晚段球 |

## 模型更新

1. `draw_enough_leader_control_bonus`：一方平局即可锁定目标时，平局概率和0-0/1-1簇上调，但单项不超过0.05。
2. `must_win_favorite_attack_discount_vs_control_opponent`：热门队面对控场对手时，必须赢球不能直接等价为xG增加。
3. `must_win_second_half_acceleration_tail`：必须赢方在后30分钟拥有非线性尾部，尤其对手防线此前已多球失守。
4. `weak_defense_late_collapse_risk`：连续大比分失守队伍，在被扳平或被迫压出时增加两球以上margin bucket。
5. `market_calibration_split_1x2_vs_handicap`：普通胜平负、让球保护、让球穿盘、总进球必须分层结算，不能互相替代。

## 竞彩/组合复盘口径

本文件不生成任何新投注建议，只做赛后结算复盘。哥伦比亚+1让胜命中是“让球保护”命中，不代表哥伦比亚普通胜命中；刚果金-1让胜命中说明大胜尾部有价值，刚果金-1让平和不穿盘路径均失效。

## 成员表状态

四队成员表和player_state已追加第三轮内部评分记录，但为 partial：缺官方完整逐人分钟、同源外部评分、全部换人/牌/技术统计。后续淘汰赛前必须用官方技术报告再闭合。

## 文件索引

- `比赛/已完成比赛/小组赛/K组/2026-06-28_哥伦比亚_0-0_葡萄牙_复盘.md`
- `比赛/已完成比赛/小组赛/K组/2026-06-28_刚果金_3-1_乌兹别克斯坦_复盘.md`
- `data/outputs/match_predictions/k-group-round3-postmortem-20260628.json`
- `data/thread_outputs/jkl-round3-postmatch-20260628/k-group/data-collector.json`
