---
phase: match_prediction_red_team_review
group: K
round: 3
status: complete_red_team_review_pending_model_chain
owner: worldcup-red-team-verifier
scope: Colombia vs Portugal; DR Congo vs Uzbekistan
created_at: 2026-06-27T00:00:00+08:00
updated_at: 2026-06-27T00:00:00+08:00
verdict: hold
publish_gate: hold_until_round3_quant_chain_and_live_gates
betting_language_blocked: true
source_log:
  - README.md
  - 线程状态.md
  - 工作流纪律.md
  - 项目架构.md
  - .codex/skills/worldcup-red-team-verifier/SKILL.md
  - .codex/skills/worldcup-quant-prediction-system/SKILL.md
  - data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json
  - data/outputs/postmatch/k-group-round2-portugal-uzbekistan-postmatch-20260624.json
  - data/outputs/postmatch/k-group-round2-colombia-drcongo-postmatch-20260624.json
  - data/thread_outputs/k-group-round2-recalc-20260623/red-team.md
  - data/thread_outputs/k-group-round2-portugal-uzbekistan-postmatch-20260624/red-team.md
  - data/thread_outputs/k-group-round2-colombia-drcongo-postmatch-20260624/red-team.md
  - four team packets, tactics packets, rosters, player_state files
missing_fields:
  - k_group_round3_quant_prediction
  - round3_data_collector_packet
  - round3_tactics_packet
  - official_t75_lineups
  - final_injury_suspension_minutes_check
  - official_card_accumulation_confirmation
  - same_source_1x2_handicap_totals_odds
  - weather_referee_pitch_snapshot
---

# K Group Round 3 Red-Team Review

## Overall Verdict

- verdict: `hold`
- red_team_status: `complete_red_team_review_pending_model_chain`
- publish gate: `hold_until_round3_quant_chain_and_live_gates`
- betting language: blocked

本轮本地未发现 K 组第三轮专用量化预测、第三轮数据刷新包或第三轮战术对位包。可读材料主要来自 K 组前两轮预测、第二轮赛后复盘、四队 team/tactics/player_state。红队可以给风险审查和概率校准方向，但不能把它升级成完整预测链审核。

## Group Context

按本地二轮赛后文件推导，K 组第三轮前大致形势为：哥伦比亚 6 分，葡萄牙 4 分，刚果金 1 分，乌兹别克斯坦 0 分。哥伦比亚对葡萄牙是头名/前二顺位管理战；刚果金对乌兹别克斯坦是组内第三名与最佳第三横向比较的低容错战。

第三轮同步比赛依赖必须入模：哥伦比亚若得知另一场刚果金无法大胜，控节奏动力更强；葡萄牙若争头名受阻，可能在后段接受前二安全；刚果金与乌兹别克斯坦会受哥伦比亚-葡萄牙比分影响其净胜球追逐强度。

## Colombia vs Portugal

- verdict: `hold`
- publish gate: `discussion_only_until_round3_model_and_live_gates`
- probability adjustment suggestion: 不替代模型概率；建议在官方首发前压低任一方单边高置信表达，保留较高平局底座。若模型把葡萄牙 5-0 后的攻击尾部直接迁移为大幅胜率上修，需折扣；若模型只因哥伦比亚 6 分和两连胜就把哥伦比亚胜率推高，同样需折扣。赛前建议审查区间：任一方胜率高于约 45% 应触发复核，平局不宜低于约 27%-31% 的讨论带，除非 T-75 首发和同源盘口给出明确相反证据。

### Top Concerns

1. 前两轮样本过小。哥伦比亚 3-1 乌兹别克斯坦、1-0 刚果金说明其边路和替补创造力可信，但不等于终结效率稳定上修；葡萄牙 5-0 乌兹别克斯坦说明大胜尾部曾被低估，但不能永久迁移到对哥伦比亚这种更高对抗强度的比赛。
2. 第三轮动机不是单向强攻。哥伦比亚平局大概率守住头名，葡萄牙争头名需要赢，但前二安全性较高；这会制造控节奏、轮换、后段接受结果的可能。
3. 因子重复计权风险高。葡萄牙的 5-0 可能同时进入 recent form、player_state、tactics、market calibration 和 favorite tail；哥伦比亚的 1-0 压制也可能被同时计入进攻强度、场面控制和市场热度。
4. 伤停/分钟/黄牌风险未闭环。葡萄牙核心老将、边路爆点、中后场负荷与哥伦比亚 James/Luis Diaz 等关键点的分钟管理，均不能用旧 player_state 直接当成确认首发。
5. 泊松会低估状态相关事件。若葡萄牙先入球，哥伦比亚压上会放大转换尾部；若长时间平局，双方可能显著降速。单一 xG 泊松对这两个脚本的相关性捕捉不足。
6. 市场过热风险双向存在。葡萄牙名气与 5-0 会带来热门税；哥伦比亚两连胜与主导小组的叙事也可能推高主队不败热度。缺少同源 1X2/让球/大小球快照时，不能判断市场是否已经过度定价。

### Failure Scenarios

- Colombia draw-management: 哥伦比亚主动压低节奏，葡萄牙控球但缺少持续高质量机会，比赛落入 0-0/1-1/1-0/0-1 的低事件区间。
- Portugal transition ceiling: 葡萄牙一旦先入球，哥伦比亚边后卫和中场站位前推，Leao/Bruno/Cancelo 一类转换链条放大比分尾部。
- Colombia set-piece/substitution path: 哥伦比亚替补创造力和定位球服务质量在 60 分钟后破局，赛果不跟随控球优势。
- Card/red-card state shift: 两队高对抗中场与边路一对一触发早牌或红牌，常规泊松矩阵失真。

### Missing Data

- 第三轮量化模型文件与 factor_inputs/weights/xG/Poisson/final_probabilities。
- T-75 官方首发与替补结构。
- 最新伤停、黄牌停赛、分钟限制。
- 官方中国竞彩或同源 1X2/让球/大小球快照。
- 裁判、天气、草皮、旅行/恢复最新确认。

## DR Congo vs Uzbekistan

- verdict: `hold`
- publish gate: `discussion_only_until_round3_model_and_live_gates`
- probability adjustment suggestion: 不替代模型概率；建议显著提高平局和尾部事件不确定性。刚果金不应仅因对葡萄牙 1-1 与对哥伦比亚 0-1 就被上修为稳健优势方；乌兹别克斯坦也不应因 0 分和 0-5 惨败被直接压到无反击能力。赛前建议审查区间：任一方胜率高于约 43%-45% 应触发复核，平局底座不宜低于约 28%-32%，除非临场首发和盘口同时支持开放战。

### Top Concerns

1. 第三名动机复杂。刚果金平局可守住组内第三，但最佳第三比较可能要求净胜球；乌兹别克斯坦必须赢才能反超，但若早段打不开，冒险会逐步增加。不能把“必须赢”简单转换成稳定进攻加成。
2. 乌兹别克斯坦 0-5 样本容易过拟合。那场包含早球、定位球、门将/中卫处理失误和强弱差滚雪球；不能线性外推为本场防线必崩。
3. 刚果金门将高光不可当整体防守升级。对哥伦比亚 1-0 失利中，射门和射正压力很大，低比分更多反映门将扑救与哥伦比亚终结效率，而不是刚果金整体压制风险消失。
4. 双方攻击链条都不稳定。刚果金依赖 Wissa/Bakambu/Silas 的转换与二点，乌兹别克斯坦依赖 Shomurodov/Fayzullaev 和定位球/二次进攻；这些路径都受首发、体能和早牌强烈影响。
5. 泊松低估尾部。若刚果金早进球，乌兹别克斯坦必须前压可能引出 2-0/2-1/3-1；若乌兹别克斯坦先入球，刚果金被迫从保三转为追分，比赛会从低事件变高事件。
6. 赔率缺口会放大误读。若只有单一 1X2 或让球快照，容易把“刚果金不败”误读为“刚果金胜”；必须拆开真实比分条件。

### Failure Scenarios

- Low-event draw: 刚果金优先不败，乌兹别克斯坦前 60 分钟谨慎，比赛长期 0-0/1-1。
- Uzbekistan first goal: 乌兹别克斯坦依靠定位球或二点先入球，刚果金被迫前压，赛前优势判断被反转。
- Congo transition win: 乌兹别克斯坦压上后边翼卫身后暴露，刚果金转换球连续打穿。
- Discipline collapse: 早牌、点球、红牌或门将失误改变比赛结构，常规 90 分钟均值预测失效。

### Missing Data

- 第三轮量化模型文件与对位战术包。
- T-75 官方首发，尤其双方中锋、门将、边翼卫和中卫组合。
- 最新黄牌停赛/红牌风险、伤停和分钟限制。
- 同源 1X2/让球/大小球市场快照。
- 官方天气、场地和裁判尺度。

## Quant Chain Flags

- `new_model_missing`: 本地未发现 K 组第三轮量化预测文件。
- `round3_data_packet_missing`: 本地未发现 K 组第三轮数据刷新包。
- `round3_tactics_packet_missing`: 本地未发现 K 组第三轮对位战术包。
- `sample_size_risk`: 前两轮样本极小，且比分形态差异大。
- `duplicate_counting_risk`: 首轮/二轮结果、player_state、战术因子、市场信号可能同向重复计权。
- `poisson_tail_risk`: 早球、红牌、点球、门将失误、追分压上和领先降速均为强相关事件，基础泊松会偏窄。
- `market_gate_missing`: 缺官方/同源 1X2、让球、大小球完整链路，不能消除热门税或盘口误读。

## Required Follow-Ups

- data: 补 K 组三轮当前积分、官方出线规则、同开赛程、T-75 首发、最终伤停/黄牌/分钟、天气裁判、同源赔率。
- tactics: 单独给 Colombia-Portugal 和 DR Congo-Uzbekistan 的第三轮动机脚本、轮换脚本、领先/落后后的换人和节奏分歧。
- model: 产出完整 factor_inputs、weights、xG、Poisson、1X2、totals、top scores、simulated group outcomes；显式标注如何处理 5-0 和 1-0 的样本外推。
- main: 在上述门槛前只允许 `discussion_only` 风险表达，不允许“主推”“稳胆”“可小注”等投注化语言。
