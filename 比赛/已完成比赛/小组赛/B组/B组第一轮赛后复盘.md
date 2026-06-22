# B组第一轮赛后复盘

phase: group_round_postmortem  
status: completed_match_review  
updated_at: 2026/06/17 11:05 +08:00  
group: B  
scope: B组第一轮两场赛后复盘。

## 赛果总览

| 比赛 | 赛前预测 | 实际比分 | 胜平负 | 精确比分 |
| --- | --- | --- | --- | --- |
| 加拿大 vs 波黑 | 1-1 | 1-1 | 命中 | 命中 |
| 卡塔尔 vs 瑞士 | 瑞士 2-0 | 1-1 | 未命中 | 未命中 |

## 复盘结论

B 组第一轮的关键词是“平局基线”。加拿大 vs 波黑被模型正确抓住了主场与 Davies 缺阵之间的抵消关系；卡塔尔 vs 瑞士则暴露出我们对瑞士控局能力的信任过度。

这里的核心教训不是“别看瑞士”，而是：控球稳定、结构成熟、经验丰富，不自动等于首轮胜利。卡塔尔这种有单点能力、又能接受低位守分的队，会显著抬高 1-1 路径。

## 模型修正

- B 组第二轮提高平局基线。
- 对瑞士，下调 `control_to_goal_conversion`。
- 对卡塔尔，上调 `low_block_and_single_star_variance`。
- 加拿大若 Davies 继续缺阵，维持左路推进折扣。
- 波黑的定位球、禁区支点和经验权重保持。

## 文件索引

- `比赛/已完成比赛/小组赛/B组/2026-06-12_加拿大_1-1_波黑_复盘.md`
- `比赛/已完成比赛/小组赛/B组/2026-06-13_卡塔尔_1-1_瑞士_复盘.md`
- `data/outputs/match_predictions/b-group-round1-postmortem.json`

## 参考源

- ESPN World Cup fixtures/results: https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket
- FIFA Match Schedule: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/match-schedule

