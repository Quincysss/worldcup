---
phase: round2_postmortem_summary
group: F
round: 2
status: partial_source_limited
player_state_update_status: updated
updated_at: 2026-06-21T18:28:00+08:00
owner: worldcup-postmortem-validation
scope: F组第二轮汇总、预测对照、JSON合并与联动验收；不主写单场复盘，不做出线或竞彩。
---

# F组第二轮复盘汇总

## 赛果与预测对照

| 比赛 | 单场文件状态 | 实际 | 赛前模型代表比分 | 对照结论 |
| --- | --- | --- | --- | --- |
| 荷兰 5-1 瑞典 | exists_but_review_body_incomplete | 5-1 | 荷兰 2-1 瑞典，1-1几乎同权重 | 胜负方向命中，但严重低估荷兰进攻上限和大比分尾部 |
| 突尼斯 0-4 日本 | exists_partial | 0-4 | 突尼斯 1-2 日本 | 日本胜方向命中，但低估净胜和突尼斯崩盘风险 |

## 模型偏差与参数建议

- 荷兰 5-1 瑞典：过度保守处理荷兰进攻状态，瑞典首轮5-1后强度上调过多；未捕捉Brobbey/Gakpo/Summerville多点爆发。参数建议：提高强队二轮反弹上限尾部；降低瑞典首轮大胜后的可迁移攻击系数；提高荷兰前场多点进球相关性。
- 突尼斯 0-4 日本：过高估计突尼斯换帅/保守防守修复效果，低估日本无久保情境下的团队进攻冗余。参数建议：突尼斯防守地板继续下调；日本攻击深度与替代创造力上调；换帅短期纪律修复不自动提高防守强度，需事件验证。

## 第二轮后球队状态变化

- 荷兰：5-1显示前场多点爆发和强队反弹上限，应上调进攻天花板。
- 瑞典：1-5要求回撤首轮5-1带来的攻击热度，重点复核防线抗压和门将表现。
- 日本：4-0验证体系深度和主动进攻能力，不能只按“破低位一般”处理。
- 突尼斯：两连大败倾向显示防守地板和心理稳定性继续下调，需单场线程补停赛/伤停。

## 成员表/player_state联动检查

| 球队 | player_state | match_internal_rating_log | 成员表逐场记录 | 状态 |
| --- | --- | --- | --- | --- |
| 荷兰 | parse_ok_26 | present_26_for_round2 | section_exists | updated |
| 瑞典 | parse_ok_26 | present_26_for_round2 | section_exists | updated |
| 突尼斯 | parse_ok_26 | present_26_for_round2 | section_exists | updated |
| 日本 | parse_ok_26 | present_26_for_round2 | section_exists | updated |

## 无法核验字段与回派建议

- 缺口：荷兰-瑞典单场复盘正文仍未补完完整事实叙述，需单场线程回补。
- 缺口：突尼斯-日本单场复盘仍为partial，完整官方逐人外部评分不可稳定取得。
- 回派：荷兰-瑞典单场线程补完复盘正文；player_state联动验收已通过。
- 回派：突尼斯-日本单场线程补完复盘正文；player_state联动验收已通过。

## 来源缺口补齐验收

source_gap_backfill_status: partial_source_limited  
updated_at: 2026-06-21T18:28:00+08:00

| 比赛 | A-D本地状态 | 事件/分钟来源结论 | 外部评分结论 | 模型阻塞 |
| --- | --- | --- | --- | --- |
| 荷兰 5-1 瑞典 | partial_source_limited | FOX boxscore 可提取首发、换人、进球、助攻、黄牌与阵型；Guardian 交叉核验关键事件和伤情观察；FIFA/ESPN 仍有动态或验证限制。 | 无可靠同场同源逐人评分，保留 external_rating=null、ating_source_status=coverage_incomplete。 | 否，官方/可靠事件链与内部评分已足够使用。 |
| 突尼斯 0-4 日本 | partial_source_limited | ESPN/FOX/Guardian 可核验比分、阵型口径、进球、助攻、牌、统计、首发和换人；FIFA 动态页作为官方入口但未抽取完整静态文本。 | 无可靠同场同源逐人评分，保留缺失说明。 | 否，事件与内部评分可用；阵型口径冲突已保留。 |

### 8队联动验收

- 荷兰、瑞典、突尼斯、日本 player_state 均为 26/26。
- 四队本场 match_internal_rating_log 均为 26/26，internal_match_rating_1_5 与 orm_status_1_5 均在 1.0-5.0。
- 四队成员表均存在本场 逐场内部评分记录。
- 来源限制不阻塞模型，只要求模型端对外部评分和全量逐人技术表特征降权。