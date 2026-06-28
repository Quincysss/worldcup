# M77-M80 v3 模型展示返工复核

## 结论

模型源 JSON 的 xG 并未缺失。`modeler.json` 与正式预测 JSON 中，四场比赛均有完整 `expected_goals.final.team_a / team_b`，正式 Markdown 出现 `missing` 是展示层读取了不存在的 `team_a_xg / team_b_xg` 路径导致。

已在不改变任何概率、xG 或比分矩阵的前提下，为两份 JSON 的 `expected_goals` 补充兼容字段：

| 比赛 | 正确 xG 路径 | 兼容字段 |
|---|---:|---|
| M77 法国 vs 瑞典 | `expected_goals.final.team_a=2.10`, `team_b=1.03`, `total=3.13` | `team_a_xg/team_b_xg/total_xg` 已补 |
| M78 科特迪瓦 vs 挪威 | `expected_goals.final.team_a=1.39`, `team_b=1.62`, `total=3.01` | `team_a_xg/team_b_xg/total_xg` 已补 |
| M79 墨西哥 vs 厄瓜多尔 | `expected_goals.final.team_a=1.44`, `team_b=1.24`, `total=2.68` | `team_a_xg/team_b_xg/total_xg` 已补 |
| M80 英格兰 vs 刚果金 | `expected_goals.final.team_a=2.07`, `team_b=0.88`, `total=2.95` | `team_a_xg/team_b_xg/total_xg` 已补 |

## 返工建议

1. xG 展示优先读取 `expected_goals.final.team_a / team_b` 与 `expected_goals.total`；兼容读取可使用 `expected_goals.team_a_xg / team_b_xg / total_xg`，但不要再读取比赛根对象下不存在的 `team_a_xg/team_b_xg`。
2. 正式 Markdown 不应直接输出 JSON 字符串或对象，应将 `factor_inputs`、`expected_goals`、`probabilities_1x2`、`totals_probabilities`、`top_scorelines` 渲染为中文短句或 Markdown 表格。
3. 对象字段如 `baseline_strength`、`player_state`、`injury_suspension_minutes`、`tactical_ten_factor_summary`、`model_market_delta` 应先抽取关键数值和说明，避免出现 `{...}`、`[object Object]` 或代码化长串。
4. 官方 Markdown 可从正式预测 JSON 重新生成，只改展示层文本，不改模型概率、泊松矩阵、Top5 比分或红队状态。

## 建议展示模板

| 项目 | 展示方式 |
|---|---|
| xG | `法国 2.10 - 1.03 瑞典，总 xG 3.13` |
| 1X2 | `主胜 xx.x%，平局 xx.x%，客胜 xx.x%` |
| 大小球 | `Over 2.5 xx.x%，Under 2.5 xx.x%，BTTS xx.x%` |
| Top5 比分 | 表格列出比分、概率、是否覆盖尾部 |
| 因子调整 | 表格列出强度、球员状态、伤停、战术、赛程、市场，每项一句中文解释 |

## 模型侧状态

- `input_readiness.data_collector_packet=available`
- `input_readiness.tactics_coach_packet=available`
- `red_team_status=pending`
- 本次仅补展示兼容字段，不改变原模型结论。
