# 赛后回测与球员状态回填清单 v2

每场赛后复盘必须检查以下项目。任一关键项未完成时，复盘状态只能是 `partial` 或 `blocked`。

## 预测回测

| 项目 | 要求 |
| --- | --- |
| 实际比分 | 写入结构化 JSON 与复盘 Markdown |
| 胜平负命中 | 按赛前最终 1X2 第一方向统计 |
| top3 / top5 比分命中 | 按赛前 `top_scorelines` 统计 |
| Brier score | 赛前有 1X2 概率时必算 |
| log loss | 赛前有 1X2 概率时必算，并对极小概率做截断保护 |
| xG error | 记录预测 xG 与实际进球差异 |
| total-goal error | 记录总进球误差 |
| 参数更新 | 至少写一条模型教训或说明无需调整 |

## 球员状态回填

| 项目 | 要求 |
| --- | --- |
| 首发/分钟 | 每名球员记录 started、minutes、换上/换下或 unused |
| 事件 | 进球、助攻、黄牌、红牌、点球、乌龙、关键失误 |
| 伤停/停赛 | 写入下一场可用性与分钟风险 |
| 内部评分 | 每名球员追加 `internal_match_rating_1_5`，1.0-5.0，可一位小数 |
| 状态值 | 更新 `form_status_1_5` 和原因 |
| 外部评分 | 同场同源可核验才写；否则写缺失说明 |
| 来源 | 每个时效字段保留 `source_log` 与 `captured_at` |

## 模型参数标签

复盘时如出现以下情况，必须打标签：

- `draw_tail_underweighted`
- `event_volatility_underweighted`
- `favorite_ceiling_tail_underweighted`
- `market_overcalibration`
- `player_state_overreaction`
- `lineup_minutes_misread`
- `set_piece_tail_missed`
- `goalkeeper_overperformance_missed`

这些标签会进入下一轮模型回测表。
