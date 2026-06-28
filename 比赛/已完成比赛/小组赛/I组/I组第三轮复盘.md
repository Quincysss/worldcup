# I组第三轮复盘

## 总结

I组第三轮两场比赛结果：

- 挪威 1-4 法国
- 塞内加尔 5-0 伊拉克

这两场对模型的共同结论非常明确：胜平负方向都命中，但比分与总进球尾部严重低估。法国胜和塞内加尔胜都在赛前模型主方向或高概率方向内，但模型输出过度集中在低比分、小胜、平局保护区，没有充分展示第三轮的净胜球追逐、早球、轮换质量差、弱队崩盘和红牌状态变化。

## 小组最终形势

| 排名 | 球队 | 积分 | 净胜球 | 结论 |
|---:|---|---:|---:|---|
| 1 | 法国 | 9 | +8 | 小组第一出线 |
| 2 | 挪威 | 6 | +1 | 小组第二出线 |
| 3 | 塞内加尔 | 3 | +2 | 等待第三名横向比较 |
| 4 | 伊拉克 | 0 | -11 | 出局 |

## 单场回测

| 比赛 | 赛前主比分 | 实际比分 | 1X2 是否命中 | Top5 比分是否命中 | 实际比分赛前概率 | 核心问题 |
|---|---|---|---|---|---:|---|
| 挪威 vs 法国 | 1-1 | 1-4 | 是，法国胜为 42.0% | 否 | 约 1.43% | 低估法国领先后继续打穿空间；低估挪威轮换后的防守脆弱性。 |
| 塞内加尔 vs 伊拉克 | 1-0 | 5-0 | 是，塞内加尔胜为 51.3% | 否 | 约 0.59% | 低估早球+红牌+净胜球追逐的非线性放大。 |

## 线程协同结论

### 数据采集线程

确认本地 I 组第三轮赛前文件存在，但赛后复盘文件此前尚未落盘。外部源确认两场赛果、关键进球时间线和小组排名：

- 挪威 1-4 法国：登贝莱 7'、20'、32'，阿斯加德 21'，Doué 90+4'；Strand Larsen 点球被 Maignan 扑出。
- 塞内加尔 5-0 伊拉克：Habib Diarra 4'，Sulaka 13' 红牌，Sarr 56'/57'，Pape Gueye 59'、71'，Iliman Ndiaye 82'/83'。

阻塞项：仍缺官方完整阵容、替补分钟、全量牌面、伤停确认、统一 xG/技术统计口径和逐人评分。因此本轮只给成员表迭代建议，暂不直接覆盖 canonical 成员表。

### 战术线程

法国场的主要误差在于把“法国形势占优可能降速”理解得太机械。实际比赛中，法国开局就展现高威胁，挪威轮换防线与追分需求让法国的速度优势被放大。

塞内加尔场的主要误差在于把“塞内加尔小胜”作为常规模板。早球和红牌之后，比赛已经不再处于普通 11v11 小胜框架，而是净胜球追逐下的半场攻防。

### 模型线程

两场方向命中，但尾部失败：

- 挪威 1-4 法国：Brier 约 0.506，Log loss 约 0.867，实际比分概率约 1.43%。
- 塞内加尔 5-0 伊拉克：Brier 约 0.357，Log loss 约 0.668，实际比分概率约 0.59%。

这说明模型主方向并非完全错误，但比分矩阵和投注解释层需要增加尾部展示，而不是只把 Top5 当成用户可见结论。

### 红队线程

红队结论为 `revise / partial`。方向命中不能掩盖两个问题：

1. 第三轮强队/优势队在特定条件下不会自动收手。
2. 泊松模型对红牌、早球、追净胜球、弱队崩盘这类强相关状态事件天然偏薄，需要状态修正或尾部分层。

### 竞彩风控线程

本轮不输出新购彩建议，只做风险复盘。法国胜和塞内加尔胜方向命中，不等于小胜、让球、比分簇可直接命中。后续所有投注方案必须拆分：

- 胜平负方向
- 让球档位
- 总进球
- 比分集合
- 串关相关性

## 模型调整清单

| 参数/规则 | 调整方向 | 触发条件 |
|---|---|---|
| `favorite_transition_ceiling` | 上调 | 精英攻击线面对轮换或追分对手。 |
| `opponent_must_win_exposure_multiplier` | 上调 | 对手必须追分/争名次导致防线前压。 |
| `third_place_goal_difference_chase_adjustment` | 新增/上调 | 球队需净胜球争第三名晋级。 |
| `favorite_first_goal_state_shift` | 新增/上调 | 优势队早早领先后，比分簇从小胜迁移到 2+、3+。 |
| `weak_defense_collapse_risk` | 上调 | 弱队早丢球、少打一人或连续被压制。 |
| `low_attack_opponent_clean_sheet_boost` | 上调 | 弱攻击队落后且无法形成反击出口。 |
| `draw_enough_but_elite_attack_exception` | 新增 | 强队形势占优但攻击端状态热、对手防线弱或轮换大。 |
| `blowout_tail_probability_3plus/4plus/5plus` | 强制输出 | 所有第三轮预测必须展示。 |
| `margin_bucket_probability` | 强制输出 | 投注解释不得只看 1X2 和 Top5 比分。 |

## 成员表迭代计划

本轮暂不直接改八项 canonical 信息中的成员表字段，原因是还缺官方分钟与逐人赛后源。待数据采集线程补齐后，优先回灌：

- 法国：登贝莱、Doué、姆巴佩、Maignan 的状态与内部评分；法国前场轮换深度标签。
- 挪威：阿斯加德、Strand Larsen、轮换防线、哈兰德未首发/休息标签。
- 塞内加尔：Habib Diarra、Sarr、Pape Gueye、Iliman Ndiaye、Mané 的状态与内部评分。
- 伊拉克：Sulaka 红牌/停赛风险、Jalal Hassan mixed 评分、整体防线与进攻线下调。

## 输出文件

- `比赛/已完成比赛/小组赛/I组/2026-06-27_挪威_1-4_法国_复盘.md`
- `比赛/已完成比赛/小组赛/I组/2026-06-27_塞内加尔_5-0_伊拉克_复盘.md`
- `data/outputs/match_predictions/i-group-round3-postmortem-20260627.json`

## 来源

- Guardian 挪威 vs 法国：https://www.theguardian.com/football/live/2026/jun/26/norway-v-france-world-cup-2026-live-updates
- Guardian 挪威 vs 法国战报：https://www.theguardian.com/football/2026/jun/26/france-norway-world-cup-group-i-match-report
- FOX 挪威 vs 法国 boxscore：https://www.foxsports.com/soccer/fifa-world-cup-men-norway-vs-france-jun-26-2026-game-boxscore-647676?tab=boxscore
- Guardian 塞内加尔 vs 伊拉克：https://www.theguardian.com/football/live/2026/jun/26/senegal-v-iraq-world-cup-2026-live-updates
- FIFA 塞内加尔 vs 伊拉克战报：https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/senegal-iraq-match-report-highlights
- ESPN 塞内加尔 vs 伊拉克：https://www.espn.com.au/football/report/_/gameId/760474
- FOX 塞内加尔 vs 伊拉克 boxscore：https://www.foxsports.com/soccer/fifa-world-cup-men-senegal-vs-iraq-jun-26-2026-game-boxscore-647677?tab=boxscore
