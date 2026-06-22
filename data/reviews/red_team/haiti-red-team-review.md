phase: team_profile
team: 海地
group: C
status: partial
created_at: 2026-06-12T19:22:46+08:00
updated_at: 2026-06-12T19:33:19+08:00
owner: worldcup-red-team-verifier
scope: 球队分析审查；不做比分、胜平负、出线或投注建议。
blocked_by_missing_live_refresh: true
missing_fields:
  - T-24h injury/training refresh
  - T-75m official lineup
  - fresh odds and handicap movement
  - travel and training-base confirmation
  - final set-piece map
source_log: data/source_logs/haiti-team-source-log.json
notes:
  - deep_partial red-team review for C 组 team_profile 审查
  - blocked by live refresh before any downstream prediction use

# 海地红队审查

## Verdict

verdict：`hold_for_prediction`

海地是 C 组最弱基线，但“最弱”不等于每场没有路径。预测海地时最怕两个极端：一是完全写死，二是把资格赛韧性过度拔高。

## 关键断言核验

- `pass`：海地是 C 组最低基线球队，但并非“零路径球队”。
- `revise`：不能因为资格赛韧性就把海地的世界杯对抗强度写得过高。
- `revise`：也不能因为纸面最弱就把每场脚本直接写成失控崩盘。
- `hold`：门将、前锋组合、训练与旅途状态不清前，任何强结论都要降级。

## Top 8 Concerns

1. `data / high`：资格赛样本必须按对手质量重新折算，否则会高估韧性可复制性。
2. `tournament / high`：训练、旅途和外部 logistics 对体能和恢复的影响是真变量。
3. `tactical / high`：长时间受压时，后场出球、边路宽度和二点保护是主要漏洞。
4. `availability / blocker`：首发门将、前锋组合和核心健康未确认前，弱队模型误差会显著放大。
5. `model / medium_high`：早丢球后比分尾部会快速变厚，不能只看均值脚本。
6. `tactical / medium`：定位球可能是海地最真实的得分路径，不应被忽略。
7. `market / medium`：若市场极端看低，受让与总球市场会受公众情绪干扰。
8. `data / medium`：阵容深度、替补质量与后段体能仍缺更多样本。

## 五类风险地图

- `availability`：弱队对个别球员的依赖更强，门将和前锋的状态对整体脚本影响很大。
- `tactical`：一旦不能守住低位纪律，海地的比赛很容易从“低事件”变成“快速失控”。
- `data`：资格赛与世界杯环境差距大，是最大证据转换风险。
- `market`：市场会天然看低海地，但看低的幅度未必总是合理。
- `tournament`：旅途、训练与场外条件对弱势队的边际影响往往更大。

## overconfidence_flags

- 把“最弱”直接写成“没有任何抵抗路径”。
- 把“资格赛有韧性”直接写成“世界杯也能稳定守住”。
- 忽略旅途和训练变量，只按纸面实力写分层。
- 只用均值模型，不给早丢球后的厚尾留空间。

## upset_or_failure_scenarios

- 对苏格兰时靠低位+门将发挥把比赛拖进定位球与低比分窗口。
- 反击第一脚处理得当时，海地能靠单点前锋制造一到两次高价值机会。
- 若对手轮换或轻敌，海地的弱势脚本会被放大成真实威胁。
- 但一旦早丢球、被迫提线，比赛会迅速失控。

## 预测前 hold 条件

- 首发门将/前锋未确认。
- 训练与旅途状态不清。
- 对手是否轮换不清。
- T-24h 伤停没有最终刷新。
- 定位球主罚人与主要目标不清时，不应高估弱势破局概率。

## 回派

- data：补训练基地、旅途、伤停和官方首发。
- tactics：补低位防守宽度和定位球。
- model：为早丢球后崩盘尾部单独建模。
- summary：写海地时要同时保留“最低基线”和“低事件扰动能力”。
- main：禁止把海地写成一句话陪跑队。

## 可转述风险提示

- 海地不是那种你一句“最弱”就能讲完的队，他们真正的希望不在场面，而在把比赛拖进混乱和低事件。
- 这队最怕的是早丢球，一旦计划被打乱，弱势就会被成倍放大。
- 但如果门将状态好、前场第一脚能接上，海地也不是完全没有吓人的窗口。
- 最需要防的误判，是要么把海地写成零机会，要么把资格赛韧性直接吹成世界杯可复制。
