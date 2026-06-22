---
phase: round2_postmortem_summary
group: E
round: 2
status: partial_source_limited
player_state_update_status: updated
updated_at: 2026-06-21T18:28:00+08:00
owner: worldcup-postmortem-validation
scope: E组第二轮汇总、预测对照、JSON合并与联动验收；不主写单场复盘，不做出线或竞彩。
---

# E组第二轮复盘汇总

## 赛果与预测对照

| 比赛 | 单场文件状态 | 实际 | 赛前模型代表比分 | 对照结论 |
| --- | --- | --- | --- | --- |
| 德国 2-1 科特迪瓦 | exists_but_review_body_incomplete | 2-1 | 德国 2-1 科特迪瓦 | 比分与胜负方向命中 |
| 厄瓜多尔 0-0 库拉索 | exists_partial | 0-0 | 厄瓜多尔 2-0 库拉索，3-0强备选 | 胜负方向和进球数明显偏差 |

## 模型偏差与参数建议

- 德国 2-1 科特迪瓦：小胜路径判断正确，但单场复盘正文仍需补完。参数建议：保留德国强队优势但限制首轮大胜外推；科特迪瓦反击进球路径被验证，弱队反击/定位球因子不应下调。
- 厄瓜多尔 0-0 库拉索：显著高估厄瓜多尔终结与破密集能力，低估库拉索止血/门将表现和0-0尾部。参数建议：提高热门低位破防不确定性权重；库拉索首轮惨败后的结构修复与门将状态应作为独立恢复因子；下调只看射门量的转化假设。

## 第二轮后球队状态变化

- 德国：结果验证第二轮韧性和后段进攻价值；player_state 已见本场26条内部评分记录。
- 科特迪瓦：先入球验证反击和中场冲击价值；失利不应简单下调防守地板。
- 厄瓜多尔：进攻效率和破低位能力需要下调；0-0比赛要求模型提高无进球尾部概率。
- 库拉索：首轮大败后防守和门将状态明显反弹，后续模型应加入惨败后保守修正路径。

## 成员表/player_state联动检查

| 球队 | player_state | match_internal_rating_log | 成员表逐场记录 | 状态 |
| --- | --- | --- | --- | --- |
| 德国 | parse_ok_26 | present_26_for_round2 | section_exists | updated |
| 科特迪瓦 | parse_ok_26 | present_26_for_round2 | section_exists | updated |
| 厄瓜多尔 | parse_ok_26 | present_26_for_round2 | section_exists | updated |
| 库拉索 | parse_ok_26 | present_26_for_round2 | section_exists | updated |

## 无法核验字段与回派建议

- 缺口：德国-科特迪瓦单场复盘正文仍未补完完整事实叙述，需单场线程回补。
- 缺口：厄瓜多尔-库拉索单场复盘仍为partial，完整官方逐人外部评分不可稳定取得。
- 回派：德国-科特迪瓦单场线程补完复盘正文；player_state联动验收已通过。
- 回派：厄瓜多尔-库拉索单场线程继续补完正文细节；player_state联动验收已通过。

## 来源缺口补齐验收

source_gap_backfill_status: partial_source_limited  
updated_at: 2026-06-21T18:28:00+08:00

| 比赛 | A-D本地状态 | 事件/分钟来源结论 | 外部评分结论 | 模型阻塞 |
| --- | --- | --- | --- | --- |
| 德国 2-1 科特迪瓦 | partial_source_limited | Guardian 可核验首发、进球、关键换人与伤情观察；FIFA/ESPN 已记录为访问但未稳定抽取全量逐人技术表、官方分钟和牌。 | 无可靠同场同源逐人评分，保留 external_rating=null、ating_source_status=coverage_incomplete。 | 否，内部评分与player_state已足够使用；外部评分降权。 |
| 厄瓜多尔 0-0 库拉索 | partial_source_limited | Guardian 可核验赛果、控球/射门/射正/角球、Eloy Room 15次扑救、关键机会、换人和补时黄牌；FIFA/ESPN 静态抽取受限。 | 无可靠同场同源逐人评分，保留缺失说明。 | 否，事件与内部评分可用；全量官方逐人表缺口继续保留。 |

### 8队联动验收

- 德国、科特迪瓦、厄瓜多尔、库拉索 player_state 均为 26/26。
- 四队本场 match_internal_rating_log 均为 26/26，internal_match_rating_1_5 与 orm_status_1_5 均在 1.0-5.0。
- 四队成员表均存在本场 逐场内部评分记录。
- 来源限制不阻塞模型，只要求模型端对外部评分和全量逐人技术表特征降权。