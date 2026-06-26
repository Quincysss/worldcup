---
phase: match_prediction
group:
  - F
match:
  - 日本 vs 瑞典
  - 突尼斯 vs 荷兰
status: complete
created_at: 2026-06-25T12:00:00+08:00
updated_at: 2026-06-25T19:08:00+08:00
owner: red_team
scope: F组第三轮预测红队校验，只做挑战、修正建议与verdict，不生成主预测或投注建议
missing_fields:
  - T-75官方首发
  - 最终伤停与黄牌累计确认
  - 突尼斯 vs 荷兰普通SPF快照
  - 同开球末段分支临场刷新
source_log:
  - K:\worldcup\data\outputs\match_predictions\f-group-round3-quant-prediction-20260625.json
  - K:\worldcup\data\thread_outputs\f-group-round3-20260625\data-collector.json
  - K:\worldcup\data\thread_outputs\f-group-round3-20260625\tactics-coach.json
  - K:\worldcup\data\thread_outputs\f-group-round3-20260625\modeler-draft.json
notes:
  - final_verdict_revise
  - publish_gate_discussion_only_pre_lineup
---

# F组第三轮预测红队校验

## Verdict

- `verdict`: `revise`
- `publish_gate`: `discussion_only_pre_lineup`

当前不是要推翻 F 组预测链，而是要把几个会误导主线程的过度自信点压回去。积分、净胜球、同开球、第三轮动机主框架基本成立，所以不需要 `hold`；但披露和校准仍不够干净，不能直接 `pass`。

## 必须修正项

1. 明确写出：第三名晋级概率、路径优劣和部分 tie-breaker 影响仍是 `heuristic`，不是全官方状态精算。
2. 不要把第三轮动机再手工加码一次。模型里已经有 `third_round_context`、`motivation_profile`、`strategic_tempo_adjustment`、`market_adjustment`，主线程文案不能再重复叠加。
3. 日本 vs 瑞典不能写成“日本稳控”。瑞典必须赢球的定位球、高空球、末段直塞冲击仍然活着。
4. 突尼斯 vs 荷兰必须写明普通 `SPF` 未开售；`+2` 让球盘只能约束大胜尾部，不能当完整市场背书。
5. `T-75` 首发、最终伤停、黄牌累计未锁之前，只能按赛前讨论稿口径发布。

## 分场红队意见

### 日本 vs 瑞典

- 当前量化：日本胜 `46.37%` / 平 `25.99%` / 瑞典胜 `27.63%`
- 红队口径：日本仍可保留优势，但不要再往上推；若要微调，应是小幅向平局或瑞典尾部让渡。
- 关键挑战：
  - 日本“平局可接受”与“争第一”并存，不能被写成纯保守，也不能被写成无视风险继续猛攻。
  - 瑞典的必须赢球脚本、定位球和高空点不应被第二轮惨败后过度贬值。
  - 市场普通 `1X2` 支持日本，但 `-1` 让球不支持轻松穿盘，说明日本优势更像结构优势，不像大热碾压。

### 突尼斯 vs 荷兰

- 当前量化：突尼斯胜 `11.48%` / 平 `20.95%` / 荷兰胜 `67.56%`
- 红队口径：荷兰仍是明确优势方，但胜率精度和大胜叙事都要收一档。
- 关键挑战：
  - 普通 `SPF` 未开售，市场校准链天然偏弱，不能把市场当成“荷兰稳”的额外证据。
  - 荷兰的头名动机真实存在，但若另一场走势有利，领先后主动降节奏和保护核心也同样真实。
  - 突尼斯不是“活着的晋级热门”，而是“理论路径几乎只剩名义存在”的 spoiler/honor script，表述必须降温。

## Top 3 Risks

1. 第三轮动机、同开球路径、轮换与市场信号已经写进模型，若主线程再手工叠加，会形成重复计权。
2. 日本优势与荷兰优势都存在，但两场都缺少最终首发/伤停锁定；荷兰场还缺普通 `SPF`，不适合写高精度确定性。
3. 泊松链对红牌、早球、末段追分和突尼斯再崩盘这类重尾情景仍偏平滑，比分口径要保守。
