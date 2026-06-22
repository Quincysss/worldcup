# 模型优化方案红队二次复核（2026-06-22）

status: second_review_complete  
verdict: revise  
model_parameter_file_status: available_reviewed  
tactical_volatility_file_status: available_reviewed  
betting_language_blocked: true  

## 结论

模型参数文件与战术波动因子包已经可审。方向可用，但仍不应 `pass`：参数 cap 比之前克制，`prediction_contract_v2` 也足够完整；不过 32 场样本仍太小，v2 尚未跑 12-20 场 shadow mode，且去重规则还停留在说明层，未变成每场预测里可验证的 fired-trigger / overlap ledger。

## 主要判断

- caps：单参数最大 0.06、组合最大 0.10，作为 shadow mode 可接受；不能直接升为默认。
- draw_floor：仍有过度抬平风险。必须要求一个低位/慢节奏战术触发器加一个积分动机触发器，并记录 no-apply 理由。
- event_volatility：概念上已和 xG 分离，也有 half-weight/cap 说明；但还需要机器可读 overlap group，避免与 tactics、player_state、伤停、门将、定位球重复。
- favorite_ceiling_tail：0.02-0.05、最大 0.06 的尾部迁移尚可，但必须有确认进攻阵容/替补深度和至少两个非市场触发器，不能用市场热度单独激活。
- prediction_contract_v2：字段合同基本足够阻止旧式 prose 预测，但必须做阻断式 schema validation，否则叙述文件仍可能绕过。
- 投注语言/竞彩闸门：继续 hold。官方首发、最终伤停/分钟、官方中国竞彩、同源 1X2/让球/大小球未齐前，任何投注面向输出都不能放行。

## required revisions before pass

- 修正模型参数文件里的战术包状态漂移：战术包已收口，不应继续按未填充处理。
- 未来 12-20 场保留 base probability 与 v2-adjusted probability 双轨，并回测 WDL、Brier、log-loss、top3/top5、draw-floor precision、favorite-tail precision。
- 每场预测必须输出 fired triggers、evidence source、overlap group、applied weight after cap、excluded duplicate factors。
- `prediction_contract_v2` 必须成为发布前阻断式 schema gate。
- market calibration 只有在来源、时间戳、overround、no-vig、同源 1X2/让球/大小球齐全时才能使用正常权重；投注面向输出仍需官方中国竞彩。
- 在 `revise/hold` 期间继续阻断购买框架措辞。

## pass 条件

- shadow mode 样本显示 v2 改善校准或尾部覆盖，且不显著损害胜平负方向。
- 每场 v2 输出都能追溯 base/adjusted、触发器、cap、去重和排除项。
- 市场信号具备同源与官方闸门，且不会把深热盘口当战术证据。
- prose-only 文件无法通过最终预测发布校验。

## handoff

- model：修正状态漂移，加入 trigger ledger / overlap ledger，执行 shadow mode。
- tactics：保持战术触发器为分布形状修正，不作为球队基础能力加分。
- main：优化合同维持 `revise`，达成 pass 条件前不要升级。
- market/betting-risk：继续执行官方竞彩与同源盘口闸门。
