# 32强 M73-M76 v3 竞彩/赔率风控包

- 范围：M73 南非 vs 加拿大；M74 德国 vs 巴拉圭；M75 荷兰 vs 摩洛哥；M76 巴西 vs 日本
- 角色：竞彩/投注风险线程
- 状态：`hold_not_executable`
- 本次刷新结论：数据采集和模型已齐；红队已基于新上游完成复核，`overall_verdict=hold`，按 `red_team_gate=complete_hold` 阻断
- 输出边界：只给赔率可用性、闸门和风险观察；不提供可执行购买建议

## 上游依赖状态

| 依赖 | 路径 | 状态 | 风控使用 |
| --- | --- | --- | --- |
| 数据采集 | `data/thread_outputs/round32-m73-m76-v3-20260628/data-collector.json` | available_partial_source_limited | 可用于讨论级队情和 market gap |
| 模型输出 | `data/thread_outputs/round32-m73-m76-v3-20260628/modeler.json` | available_completed_partial_source_limited | 可用于 observation_only 概率风险 |
| 红队审查 | `data/thread_outputs/round32-m73-m76-v3-20260628/red-team.json` | complete_red_team_review_after_data_tactics_model_fill / overall_verdict=hold | 阻断 |

红队说明：新版 red-team JSON 已完成新上游复核，但 `overall_verdict=hold` 且 `betting_gate=hold_not_executable`。竞彩风控侧必须继续阻断，不能把模型概率转成可执行票据。

## 全局 Gate

| Gate | 状态 | 结论 |
| --- | --- | --- |
| T-75 官方首发 | not_confirmed | 阻断 |
| 最新伤停、停赛、分钟限制 | partial_source_limited_not_final | 阻断 |
| 官方中国竞彩即时赔率 | not_captured | 阻断 |
| 同源 1X2/让球/大小球快照 | not_captured_complete | 阻断 |
| 比分/总进球/半全场同源赔率 | not_captured | 阻断 |
| 红队 gate | complete_hold / overall_verdict=hold | 阻断 |
| 模型概率包 | available_pre_red_team_discussion_only | 只能观察 |

整体 gate：四场均为 `hold_not_executable`。

## Market Availability

| 场次 | 比赛 | 官方竞彩 | 中国足彩网 | 500 | 1X2 | 让球 | 大小球 | 比分 | 总进球 | 半全场 | 赔率校准 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M73 | 南非 vs 加拿大 | not_captured | not_captured_complete | not_captured_complete | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |
| M74 | 德国 vs 巴拉圭 | not_captured | not_captured_complete | not_captured_complete | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |
| M75 | 荷兰 vs 摩洛哥 | not_captured | not_captured_complete | not_captured_complete | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |
| M76 | 巴西 vs 日本 | not_captured | not_captured_complete | not_captured_complete | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |

M73 数据采集里有第三方 Canada moneyline 片段，但它不是官方中国竞彩，也不是同源 1X2/让球/大小球链，不能用于赔率校准。

## 模型观察与风控

| 场次 | xG | 90分钟 1X2 | O/U 2.5 | Top5 比分 | 风控口径 |
| --- | --- | --- | --- | --- | --- |
| M73 | 南非 1.08 - 加拿大 1.34 | 30.12% / 27.24% / 42.65% | 大 43.55% / 小 56.45% | 1-1、0-1、1-0、0-0、1-2 | 加拿大有模型边，但平局底盘高，只能 observation_only |
| M74 | 德国 2.10 - 巴拉圭 0.78 | 67.93% / 19.33% / 12.74% | 大 54.94% / 小 45.06% | 2-0、1-0、2-1、1-1、3-0 | 德国优势明显，但缺赔率和红队新审，不得投注化 |
| M75 | 荷兰 1.48 - 摩洛哥 1.12 | 45.45% / 25.88% / 28.67% | 大 48.16% / 小 51.84% | 1-1、1-0、2-1、0-1、2-0 | 三项接近，不能删掉平局和摩洛哥尾部 |
| M76 | 巴西 1.92 - 日本 1.08 | 56.94% / 22.06% / 21.00% | 大 57.68% / 小 42.32% | 1-1、2-1、1-0、2-0、3-1 | 巴西聚合优势与 1-1 单比分并存，不能混同比分和 1X2 |

上述概率是赛前模型讨论材料，不是购买建议。红队 verdict=hold、官方赔率缺失时，不计算模型市场差，不给串关、不写金额。

## 分场 Gate

### M73 南非 vs 加拿大

- Gate：`hold_not_executable`
- 数据/模型：已齐，但仍为 partial_source_limited / pre-red-team。
- 红队：`complete_hold`，overall_verdict=`hold`。
- 赔率：官方竞彩、同源 1X2、让球、大小球、比分、总进球、半全场均未取得。
- 主要风险：加拿大模型边与 27.24% 平局底盘并存；Mokoena、Davies、Eustaquio 等状态和分钟需要临场确认。
- 删除项：任何 Canada-edge 价值判断、低比分票据构造、串关角色。
- 临场等待：T-75 首发、最终伤停/分钟、官方竞彩、同源盘口、红队 hold 后续解除。

### M74 德国 vs 巴拉圭

- Gate：`hold_not_executable`
- 数据/模型：已齐，但仍为 partial_source_limited / pre-red-team。
- 红队：`complete_hold`，overall_verdict=`hold`。
- 赔率：官方竞彩、同源 1X2、让球、大小球、比分、总进球、半全场均未取得。
- 主要风险：德国模型优势较高，但盘口深度和公众热度无法校准；德国首发争议会影响边路、九号位和中场结构。
- 删除项：强队自动投注化、让球覆盖表达、比分估值。
- 临场等待：T-75 首发、最终伤停/分钟、官方竞彩、同源盘口、红队 hold 后续解除。

### M75 荷兰 vs 摩洛哥

- Gate：`hold_not_executable`
- 数据/模型：已齐，但仍为 partial_source_limited / pre-red-team。
- 红队：`complete_hold`，overall_verdict=`hold`。
- 赔率：官方竞彩、同源 1X2、让球、大小球、比分、总进球、半全场均未取得。
- 主要风险：模型三项不够分离，1-1 是最高单比分；摩洛哥转换和低位路线不能被删除。
- 删除项：90 分钟确定表达、低比分票据构造、串关角色。
- 临场等待：T-75 首发、最终伤停/分钟、官方竞彩、同源盘口、红队 hold 后续解除。

### M76 巴西 vs 日本

- Gate：`hold_not_executable`
- 数据/模型：已齐，但仍为 partial_source_limited / pre-red-team。
- 红队：`complete_hold`，overall_verdict=`hold`。
- 赔率：官方竞彩、同源 1X2、让球、大小球、比分、总进球、半全场均未取得。
- 主要风险：巴西 90 分钟胜率领先，但平局+日本胜合计 43.06%；1-1 为最高单比分，不能用巴西聚合优势覆盖比分尾部。
- 删除项：品牌热度估值、让球覆盖表达、比分或总进球估值。
- 临场等待：T-75 首发、最终伤停/分钟、官方竞彩、同源盘口、红队 hold 后续解除。

## 收口

本次刷新后，M73-M76 不再是“数据/模型缺失”型阻断，也不再是“红队旧口径”阻断；当前阻断为红队已完成但 verdict=hold，加上临场 gate 未闭合。四场仍必须保持 `hold_not_executable`：T-75 官方首发未确认，最终伤停/停赛/分钟限制未闭合，官方中国竞彩和同源盘口缺失。所有模型概率只能作为 discussion_only 风险观察。

