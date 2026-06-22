# C组第二轮预测汇总

phase: group_round_prediction  
group: C  
round: 2  
status: refreshed_after_c_roster_completion  
updated_at: 2026-06-20 00:00 +08:00  
owner: main-thread  
scope: C组第二轮比分预测、胜平负概率、风险边界和第二轮后形势推演；不是投注建议。

## 第一轮后积分

| 球队 | 积分 | 净胜球 | 第一轮 |
| --- | ---: | ---: | --- |
| 苏格兰 | 3 | +1 | 1-0 海地 |
| 巴西 | 1 | 0 | 1-1 摩洛哥 |
| 摩洛哥 | 1 | 0 | 1-1 巴西 |
| 海地 | 0 | -1 | 0-1 苏格兰 |

## 第二轮重算结论

| 比赛 | 预测比分 | 胜平负倾向 | 模型概率 | 置信度 |
| --- | --- | --- | --- | --- |
| 巴西 vs 海地 | 巴西 2-0 海地 | 巴西胜 | 巴西 82 / 平 13 / 海地 5 | 中高 |
| 苏格兰 vs 摩洛哥 | 苏格兰 0-1 摩洛哥 | 摩洛哥不败，客胜略优，重点防平 | 苏格兰 24 / 平 34 / 摩洛哥 42 | 中低 |

## 相对旧稿的变化

| 比赛 | 旧稿 | 新稿 | 变化原因 |
| --- | --- | --- | --- |
| 巴西 vs 海地 | 3-0，巴西 86% | 2-0，巴西 82% | Neymar 风险更明确；巴西首轮体系磨合和中场保护问题下调深盘穿透。 |
| 苏格兰 vs 摩洛哥 | 0-1，摩洛哥 45 / 平 31 | 0-1，摩洛哥 42 / 平 34 | 摩洛哥状态仍更好，但苏格兰已有3分、McGinn/Robertson状态明确，平局路径上调。 |

## 组内逻辑

巴西对海地是三分刚需局，但不是可以无脑写大胜的局。巴西实力和动机都明显占优，Vinicius 是最稳定爆点；不过 Neymar 缺阵/存疑、首轮进攻磨合、以及可能的轮换，会让 2-0 比 3-0 更像主线。

苏格兰对摩洛哥是 C 组第二轮真正的战略战。摩洛哥如果赢球，会和巴西一起进入主动区；苏格兰如果拿到一分，4 分在手也非常舒服。这个动机结构会把比赛压低，低比分和一球差是主旋律。

## 第二轮后推演

如果按本稿预测走：

| 球队 | 预计积分 | 形势 |
| --- | ---: | --- |
| 巴西 | 4 | 回到主动区，但末轮对苏格兰仍不能松。 |
| 摩洛哥 | 4 | 出线主动权明显提升，末轮对海地更从容。 |
| 苏格兰 | 3 | 仍有机会，但末轮对巴西压力很大。 |
| 海地 | 0 | 接近出局，需要末轮奇迹和其他结果配合。 |

## 竞彩/盘口边界

status: discussion_only / hold

当前没有 T-75m 官方首发、官方竞彩赔率、同源 1X2/让球/大小球快照，因此不输出可执行投注单。

- 巴西 vs 海地：胜负方向清楚，风险在让球和总进球；2球/3球为主区间。
- 苏格兰 vs 摩洛哥：摩洛哥方向更优，但平局权重很高；1球/2球权重高于大球。
- 全组策略：不使用“稳胆”“重注”“包赢”等表达；所有盘口只保留赛前讨论。

## 必须复核

- T-75m 官方首发。
- Neymar、McTominay、McKenna、Hakimi/Brahim/Bounou 的最新可用性。
- 官方竞彩胜平负、让球胜平负、总进球赔率。
- 是否已有终场结果；若比赛已结束，应切换为复盘而不是预测。

## 文件索引

- `比赛/未开始比赛/小组赛/C组/2026-06-19_巴西_vs_海地_预测.md`
- `比赛/未开始比赛/小组赛/C组/2026-06-19_苏格兰_vs_摩洛哥_预测.md`
- `data/outputs/match_predictions/c-group-round2-predictions.json`

## 参考源

- FIFA Match Schedule: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/match-schedule
- ESPN fixture page: https://www.espn.com/soccer/match/_/gameId/760444/haiti-brazil
- FourFourTwo Brazil squad: https://www.fourfourtwo.com/team/brazil-world-cup-2026-squad
- FourFourTwo Scotland squad: https://www.fourfourtwo.com/team/scotland-world-cup-2026-squad
- Sky Sports Scotland squad numbers: https://www.skysports.com/football/news/12017/13550179/world-cup-2026-scotland-squad-numbers-revealed-with-angus-gunn-handed-no-1-jersey-ahead-of-craig-gordon
