# I组第一轮赛后复盘索引

- phase: round_postmortem_index
- status: completed_revise
- group: I
- round: 1
- updated_at: 2026-06-23T18:30:00+08:00

## 单场复盘

| 比赛 | 赛前预测 | 实际 | 方向 | 主要误差 | 单场文件 |
|---|---|---|---|---|---|
| 法国 vs 塞内加尔 | 法国 2-1 | 法国 3-1 | 命中 | 低估法国末段扩分与替补冲击 | `2026-06-16_法国_3-1_塞内加尔_复盘.md` |
| 伊拉克 vs 挪威 | 挪威 2-0 | 挪威 4-1 | 命中 | 低估挪威高比分尾部，也低估伊拉克进球下限 | `2026-06-16_伊拉克_1-4_挪威_复盘.md` |

## 模型总修正

| 特征 | 修正 |
|---|---|
| 强队进攻尾部 | 法国小幅上修，挪威中幅上修 |
| 弱队进球下限 | 塞内加尔、伊拉克均小幅上修 |
| 零封概率 | 法国不明显上修，挪威小幅下修 |
| 单场权重 | 两场均为 `revise`，禁止用比分直接外推能力跃迁 |

## 成员表迭代文件

- `队伍/法国/成员表_赛后迭代_20260623.md`
- `队伍/塞内加尔/成员表_赛后迭代_20260623.md`
- `队伍/挪威/成员表_赛后迭代_20260623.md`
- `队伍/伊拉克/成员表_赛后迭代_20260623.md`
- 结构化补丁：`data/outputs/player_state/i-group-round1-state-iteration-20260623.json`
- 模型回测：`data/outputs/match_predictions/i-group-round1-postmortem.json`

## 红队声明

本轮两场复盘均按 `revise` 处理。赛果、比分、进球时间可以作为高置信事实使用；战术因果、球员内部评分、伤停纪律和补时事件归属必须保留置信度标记，不单独驱动投注或大幅模型参数调整。

## 来源

- FIFA 法国 vs 塞内加尔：https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/france-senegal-highlights-match-report
- ESPN 法国 vs 塞内加尔：https://www.espn.com/soccer/report/_/gameId/766713
- FIFA 伊拉克 vs 挪威：https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/iraq-norway-highlights-match-report
- FIFA 比赛中心：https://www.fifa.com/en/match-centre/match/17/285023/289273/400021488
- Guardian 伊拉克 vs 挪威：https://www.theguardian.com/football/live/2026/jun/16/iraq-v-norway-world-cup-2026-live
