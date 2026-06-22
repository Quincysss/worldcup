---
phase: round2_postmortem_summary
group: F
round: 2
status: partial_source_limited_completed
player_state_update_status: updated
updated_at: 2026-06-22T00:25:00+08:00
owner: worldcup-postmortem-validation
scope: F组第二轮深度复盘汇总、预测对照、JSON合并与成员表/player_state验收；不做出线或竞彩。
---

# F组第二轮复盘汇总

## 四场回派中的F组两场状态

| 比赛 | 单场复盘状态 | 赛果 | 深度复盘要素 | player_state_update_status | 来源状态 |
| --- | --- | --- | --- | --- | --- |
| 荷兰 5-1 瑞典 | partial_source_limited | 5-1 | 赛果、事件链、预测对照、战术复盘、模型误差、参数调整、红队风险均已具备 | updated | FOX/Guardian可核验核心事件；外部逐人评分不可稳定取得 |
| 突尼斯 0-4 日本 | partial_source_limited | 0-4 | 赛果、事件链、预测对照、战术复盘、模型误差、参数调整、红队风险均已具备 | updated | ESPN/FOX/Guardian可核验核心事件；外部逐人评分不可稳定取得 |

## 赛果与预测对照

| 比赛 | 赛前模型代表比分 | 实际 | 对照结论 |
| --- | --- | --- | --- |
| 荷兰 5-1 瑞典 | 荷兰 2-1 瑞典，1-1几乎同权重 | 5-1 | 胜负方向命中，但严重低估荷兰进攻上限和大比分尾部 |
| 突尼斯 0-4 日本 | 突尼斯 1-2 日本 | 0-4 | 日本胜方向命中，但低估净胜差和突尼斯崩盘风险 |

## 模型偏差与参数调整

- 荷兰：上修强队第二轮反弹上限、边路宽度与前场多点爆发；Brobbey、Gakpo、Summerville、Depay直接参与进球。
- 瑞典：下修首轮5-1后可迁移攻击热度和三中卫/翼卫体系抗压稳定性；保留Isak/Elanga转换威胁。
- 日本：上修无久保情境下的体系冗余、边路助攻链、压迫和领先后继续扩大比分能力。
- 突尼斯：下修防守地板、抗压稳定性和换帅短期修复收益；两轮大败仍需避免过度情绪化外推。

## 红队风险

- 荷兰场：荷兰大胜不应无条件外推到更高压强对手；Van Dijk、Gakpo、Summerville赛中碰撞/冰敷观察需后续复核。
- 瑞典场：1-5崩盘后仍存在Isak、Elanga等进攻出口，不宜简单归零进攻威胁。
- 日本场：日本大胜验证体系深度，但面对更强对手时控球与边路效率需重新估计。
- 突尼斯场：市场可能过度惩罚两连败，后续模型需区分真实防守地板与比赛状态崩塌。

## 成员表/player_state联动检查

| 球队 | player_state | 本场match_internal_rating_log | 成员表本场逐场记录 | 评分范围 | 外部评分缺失说明 |
| --- | --- | --- | --- | --- | --- |
| 荷兰 | parse_ok_26 | 26/26 | exists | 1.0-5.0 | 26/26 |
| 瑞典 | parse_ok_26 | 26/26 | exists | 1.0-5.0 | 26/26 |
| 突尼斯 | parse_ok_26 | 26/26 | exists | 1.0-5.0 | 26/26 |
| 日本 | parse_ok_26 | 26/26 | exists | 1.0-5.0 | 26/26 |

## 剩余缺口

- 不阻塞模型：FIFA动态页、ESPN验证限制和外部评分页不可稳定抽取；内部评分和事件链已满足模型回测。
- 后续数据采集：若官方PDF/静态match report或稳定评分页出现，可回补external_rating、官方全量逐人技术表；不得以内部分冒充外部评分。