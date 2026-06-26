---
phase: match_prediction
group: B
match:
  - 瑞士 vs 加拿大
  - 波黑 vs 卡塔尔
status: partial
created_at: 2026-06-24T18:00:56+08:00
updated_at: 2026-06-24T18:08:00+08:00
owner: red_team
scope: B组第三轮预测修正红队复核；聚焦T-75首发缺失处理、同源赔率溯源、第三轮动机、伤停停赛冲突与预测反例压力测试
missing_fields:
  - 官方T-75首发
  - 官方纪律公告与停赛确认
  - 最新官方伤停/训练可用性确认
  - 同一时间戳的可执行竞彩销售状态
  - 完整量化重算输出
source_log:
  - data/thread_outputs/b-group-round3-20260624/data-collector-lineup-odds-recheck.md
  - data/thread_outputs/b-group-round3-20260624/modeler-lineup-adjusted-recalc.md
  - data/thread_outputs/b-group-round3-20260624/tactics-predicted-lineups.md
  - data/thread_outputs/b-group-round3-20260624/summary-lineup-adjusted.md
  - data/outputs/match_predictions/b-group-round3-quant-prediction-20260624.json
  - data/outputs/player_state/canada-player-state.json
  - data/outputs/player_state/bosnia-herzegovina-player-state.json
  - data/outputs/player_state/qatar-player-state.json
notes:
  - skeleton_created_first_per_anti_disconnect_rule
  - upstream_data_collector_is_still_skeleton
  - quant_prediction_json_is_empty_at_review_time
---

# B组第三轮红队校验

## 总体结论

- 线程结论：`partial`
- 预测发布结论：`discussion_only`
- betting_gate：`hold`
- 红队判断：当前不能把“缺官方 T-75 首发”写成数据失败；正确口径应是“预测首发可用于讨论版预测，但投注门控必须保持 hold”。

## 分场 verdict

- 瑞士 vs 加拿大：`revise`
- 波黑 vs 卡塔尔：`hold`

## 核验主结论

- `T-75 首发缺失` 不是本次预测链路失败的充分条件。模型可基于预测首发做 discussion 级输出，但必须显式写入 `lineup_uncertainty_adjustment` 和 `betting_gate=hold`。
- 体彩同源赔率目前仅在本线程模型稿中有可追溯痕迹，尚未由完整数据线程成稿做时间戳和销售状态闭环，因此只能视为 `partial_traceable`。
- 第三轮动机判断基本方向可接受，但不能只写成叙事标签，必须和当前积分、净胜球、同组同时开球末段策略一起出现，避免把“必须赢球”重复计权成概率上调。
- 波黑/卡塔尔这场的关键纪律与可用性冲突尚未完成官方确认，当前不足以支撑稳定比分判断，更不足以支撑任何投注执行表达。

## 体彩赔率红队核验

- 周三049 瑞士 vs 加拿大：SPF `2.21 / 2.66 / 3.32`，RQ `-1` `4.70 / 3.86 / 1.52`
- 周三050 波黑 vs 卡塔尔：SPF `1.26 / 5.10 / 7.15`，RQ `-1` `1.89 / 3.60 / 3.10`
- 以上赔率目前仅能从用户派发约束和 `modeler-lineup-adjusted-recalc.md` 的 source log 侧获得，数据采集线程文件仍为骨架，未形成 `full market snapshot`。
- 因缺统一抓取时间、页面状态和是否仍可售的闭环证明，红队不接受把这些数字直接表述为“已验证竞彩执行赔率”。

## 第三轮动机核验

- 加拿大：基于本地前两轮赛果，平局即可维持第一的路径明显更优，不能把加拿大建模成必然高压抢胜。
- 瑞士：争第一的动机成立，但若另一场走势有利于自身晋级或排名，末段策略可能转向控平或风险压低，不能把“需胜”机械转化为全场高节奏。
- 波黑：赢球争最佳第三的逻辑成立，但“必须赢”同时也意味着更高前压、犯错和牌面失控风险，不应只当利多。
- 卡塔尔：同样是生存动机，但若关键停赛坐实，动机不能抵消结构性减员。

## 伤停/停赛冲突核验

- `Kone`：本地 player-state 仍指向 `injured_uncertain`，且第二轮对卡塔尔后存在严重伤情待复核，必须作为加拿大中场强度和转换质量的核心不确定项。
- `Davies`：本地记录为 `managed_return_uncertain`，最近两场分钟与首发链路未形成官方闭环，不能默认按满负荷主力处理。
- `Bombito`：当前本地证据更接近 `available_or_unreported`，不能为制造不确定性而把他误写成明确伤停；应写成“分钟与状态细节不足，需赛前再核”。
- `Muharemovic`：本地链路已出现第二轮红牌信号，但仍待官方纪律公告确认；在确认前应按 `suspended_or_high_risk` 处理。
- `Homam Ahmed`：本地复盘与 player-state 都已提示第二轮红牌/停赛风险，应视作高优先级 availability blocker。
- `Assim Madibo`：同样存在第二轮红牌后的停赛确认需求，且其缺阵对卡塔尔中场屏障影响大，不能轻描淡写。

## 反例压力测试

- 瑞士即便战意更强，也可能因为加拿大接受平局的节奏管理而被拖入低速比赛，导致热门侧优势兑现不足。
- 加拿大若缺少健康版 Davies 或 Kone，反击推进与边路爆点都可能下降，平局保第一会进一步放大保守取向。
- 波黑“必须赢”不等于更稳，反而可能因前压、急躁和纪律问题复制第二轮失控路径。
- 卡塔尔若 `Homam Ahmed` 和 `Assim Madibo` 的停赛坐实，左路和后腰屏障同时受损，“求胜动机”不足以弥补结构性缺口。
- 同组同时开球可能改变两场末段策略，任何固定 90 分钟恒定动机模型都存在过拟合风险。

## 必须改动项

- 必须把“缺 T-75 官方首发”从 `data failure` 改写为 `prediction allowed with estimated lineup, betting hold`。
- 必须在主线程摘要中写明：当前预测只能 `discussion_only`，不可包装成可执行投注口径。
- 必须补写官方积分表/tiebreaker 依据，至少说明当前动机判断依赖的积分与净胜球关系。
- 必须把 `周三049/050` 标成 `partial_traceable_same_source_odds`，并补充“未完成统一时间戳与销售状态核验”。
- 必须把加拿大与卡塔尔/波黑的关键可用性分级写清，避免把 `Bombito` 与 `Kone`、`Davies` 混成同等级不确定项。
- 必须在波黑 vs 卡塔尔的结论里加入“纪律确认未完成，因此比分与强弱边判断应降级”。
- 必须明确 `data/outputs/match_predictions/b-group-round3-quant-prediction-20260624.json` 在本次复核时为空，不能宣称完整量化重算已落地。

## Owner 回派

- `data`：补官方纪律公告、最新伤停、统一时间戳体彩同源赔率、可售状态。
- `model`：把 estimated lineup 风险折扣、第三轮动机去重、同时开球末段策略纳入不确定性项；在量化文件未落地前不得宣称 full recalc complete。
- `tactics`：分别补加拿大保平节奏管理、瑞士抢分但可能受另一场影响的末段策略，以及卡塔尔减员后的结构损失。
- `main`：统一口径为 `prediction discussion_only / betting hold`，禁止把动机和赔率变化重复写成双重利多。

## 可直接引用的红队声明

- 本轮缺 T-75 官方首发不构成预测链路直接失效，但只允许使用预测首发做讨论版判断，投注门控必须保持 hold。
- 当前体彩同源赔率仅完成部分可追溯，尚未形成统一时间戳和可售状态闭环，不能当作已验证执行盘口。
- 瑞士 vs 加拿大可继续修订后讨论；波黑 vs 卡塔尔因纪律与可用性冲突未闭环，红队建议 hold。
