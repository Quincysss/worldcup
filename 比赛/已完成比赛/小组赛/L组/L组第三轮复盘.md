# L组第三轮复盘

status: completed_with_partial_player_state_update  
updated_at: 2026-06-28T22:35:00+08:00  
role_threads: data_collector=completed_partial; tactics=completed_partial; modeler=completed; red_team=hold; betting_risk=postmatch_only

## 总结

L组第三轮整体比J/K更接近模型：克罗地亚 2-1 加纳方向命中但比分Top5未中，英格兰 2-0 巴拿马则方向、Top2比分、小球和BTTS-no均命中。核心教训是必须分清“方向层”和“结算层”：克罗地亚赢1球对应 -1 让平，英格兰赢2球对应巴拿马 +2 让平，不能把普通胜或大胜尾部混写。

## 两场回测

| 比赛 | 赛前主方向 | 实际 | 方向 | Top3/Top5比分 | 主要偏差 |
| --- | --- | --- | --- | --- | --- |
| 克罗地亚 vs 加纳 | 克罗地亚胜 | 2-1 | 命中 | 未中 | BTTS/over2.5、定位球和后段破局偏薄 |
| 巴拿马 vs 英格兰 | 英格兰胜 | 0-2 | 命中 | Top2命中 | 命中较好，需防止过度上修3+大胜 |

## 模型更新

1. `croatia_set_piece_second_phase_tail`：克罗地亚必须赢且有Modrić/高点时，2-1/2-0/一球胜簇小幅上调。
2. `favorite_two_goal_corridor_vs_low_block`：强队对低位/高压混合防守时，上调0-2、1-3、净胜两球通道，但不自动上调3+大胜。
3. `under_2_5_confidence_cap_when_must_win_and_btts_path`：热门方必须赢且对手有定位球/转换单事件时，under2.5置信度设上限。
4. `handicap_exact_margin_reporting`：第三轮报告必须并列输出普通胜平负与精确净胜球桶。

## 成员表状态

四队成员表和player_state已追加第三轮内部评分记录，但为 `partial_updated_official_full_minutes_and_external_ratings_missing`。后续仍需官方技术报告闭合完整分钟、外部评分、全部技术统计和伤情更新。

## 文件索引

- `比赛/已完成比赛/小组赛/L组/2026-06-28_克罗地亚_2-1_加纳_复盘.md`
- `比赛/已完成比赛/小组赛/L组/2026-06-28_巴拿马_0-2_英格兰_复盘.md`
- `data/outputs/match_predictions/l-group-round3-postmortem-20260628.json`
- `data/thread_outputs/jkl-round3-postmatch-20260628/l-group/data-collector.json`
