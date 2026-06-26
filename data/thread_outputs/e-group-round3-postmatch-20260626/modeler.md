---
phase: post_match_backtest
group: E
round: 3
status: complete
created_at: 2026-06-26T10:07:44.1118358+08:00
updated_at: 2026-06-26T10:07:44.1118358+08:00
owner: worldcup-data-modeler
scope: E组第三轮两场正式模型回测；覆盖1X2、大小2.5、Top比分、竞彩结果、投注失败原因、参数校准与player_state写回状态
missing_fields:
  - 分钟级player_state安全回写未执行
  - 四队成员表未做赛后事件级补录
source_log:
  - K:\worldcup\data\outputs\match_predictions\e-group-round3-quant-prediction-20260625.json
  - K:\worldcup\data\outputs\match_predictions\e-group-round3-postmortem-20260626.json
  - K:\worldcup\比赛\已完成比赛\小组赛\E组\2026-06-25_厄瓜多尔_2-1_德国_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\E组\2026-06-25_库拉索_0-2_科特迪瓦_复盘.md
  - K:\worldcup\data\outputs\player_state\ecuador-player-state.json
  - K:\worldcup\data\outputs\player_state\germany-player-state.json
  - K:\worldcup\data\outputs\player_state\curacao-player-state.json
  - K:\worldcup\data\outputs\player_state\ivory-coast-player-state.json
  - K:\worldcup\队伍\厄瓜多尔\成员表.md
  - K:\worldcup\队伍\德国\成员表.md
  - K:\worldcup\队伍\库拉索\成员表.md
  - K:\worldcup\队伍\科特迪瓦\成员表.md
notes:
  - 本文件是模型线程正式回测包，不给投注执行建议
  - player_state仅核对更新时间，未做安全回写，因此相关状态不得标complete
---

# E组第三轮正式模型回测包

## 输入状态

| 输入项 | 状态 | 备注 |
| --- | --- | --- |
| 赛前量化预测 JSON | ready | 已读取 |
| 赛后 postmortem JSON | ready | 已读取 |
| 两场单场复盘 Markdown | ready | 已读取 |
| 四队 player_state 更新时间 | ready | 已核对到 2026-06-23 上午版本 |
| 四队成员表更新时间 | ready | 已核对到 2026-06-23 上午版本 |
| 分钟级 player_state 回写 | blocked | 本线程未执行安全写回 |

## player_state / 成员表更新时间

| 队伍 | player_state 更新时间 | 成员表更新时间 | 结论 |
| --- | --- | --- | --- |
| 厄瓜多尔 | 2026-06-23T10:10:40.8549389+08:00 | 2026-06-23T10:10:41.0694425+08:00 | 赛后未回写 |
| 德国 | 2026-06-23T10:10:40.8608300+08:00 | 2026-06-23T10:10:41.0749702+08:00 | 赛后未回写 |
| 库拉索 | 2026-06-23T10:10:40.8509206+08:00 | 2026-06-23T10:10:41.0749702+08:00 | 赛后未回写 |
| 科特迪瓦 | 2026-06-23T10:10:40.8648603+08:00 | 2026-06-23T10:10:41.0849396+08:00 | 赛后未回写 |

## 比赛一：厄瓜多尔 2 比 1 德国

| 项目 | 赛前模型 | 实际结果 | 回测 |
| --- | --- | --- | --- |
| 1X2 | 主胜 24.17% / 平 27.24% / 客胜 48.59% | 主胜 | 方向错误 |
| 大小2.5 | 大 40.40% / 小 59.60% | 大球 | 方向错误 |
| Top比分 | 0-1 / 1-1 / 0-0 / 0-2 / 1-0 | 2-1 | 未进 Top5 |
| 实际比分点概率 | 2-1 约 5.68% | 2-1 | 低估开放尾部 |
| 竞彩SPF | 4.36 / 4.05 / 1.53 | 主胜 | 市场偏热德国 |
| 竞彩让球(+1) | 2.14 / 3.45 / 2.69 | 让胜 | 深度高估德国压制力 |

### 投注失败原因

- 把德国基础实力和市场热度叠加得过重，第三轮“接近锁位后的节奏降档”修正不足。
- 低估厄瓜多尔在必须赢、且对手不是深低位时的推进空间兑现率。
- 小比分与德国不败路径权重过高，`0-1 / 1-1 / 0-0` 堆积过热，导致 `2-1` 这类开放尾部不足。
- 市场校准没有在第三轮语境冲突时进一步限幅，热门队名气仍被过度带入。

### 参数校准建议

- 泊松层：
  - 上调 `must_win_vs_non_low_block_space_bonus`
  - 下调 `under_bias_in_rotation_control_games`
  - 保留 `low_conversion_penalty_for_inefficient_attack`，但改成对手形态敏感
- 市场层：
  - 收紧 `market_heat_cap_when_context_conflicts`
  - 对“强队名气 + 前两轮结果”的市场热度设置更硬的上限
- 第三轮语境层：
  - 上调 `already_qualified_favorite_tempo_drag`
  - 对“先丢/被迅速扳平后是否继续高压”增加衰减系数

## 比赛二：库拉索 0 比 2 科特迪瓦

| 项目 | 赛前模型 | 实际结果 | 回测 |
| --- | --- | --- | --- |
| 1X2 | 主胜 12.11% / 平 20.44% / 客胜 67.45% | 客胜 | 方向正确 |
| 大小2.5 | 大 48.91% / 小 51.09% | 小球 | 方向正确 |
| Top比分 | 0-1 / 0-2 / 1-1 / 1-2 / 0-3 | 0-2 | 命中 Top2 |
| 实际比分点概率 | 0-2 13.70% | 0-2 | 控制型赢球路径命中 |
| 竞彩SPF | 未开售 | 无 | 市场普通盘缺口 |
| 竞彩让球(+2) | 2.40 / 3.85 / 2.21 | 让平 | 大胜尾部未打穿 |

### 投注失败原因

- 如果票面走“科特迪瓦大胜/深让穿盘”，那失败点不在胜平负，而在把赢球错误外推成大胜。
- 只看到强弱差，没有充分尊重第三轮“赢到安全线即可”的风险管理逻辑。
- 盘口只有 `+2` 让球时，本应把它当作大胜尾部约束信号，而不是继续追热热门队。

### 参数校准建议

- 泊松层：
  - 小幅上调 `favorite_second_goal_when_game_state_stable`
  - 小幅上调 `late_chasing_exposure_after_60`
  - 不上调大胜尾部参数
- 市场层：
  - 维持 `handicap_tail_guardrail`
  - 无普通SPF时，市场只用于抑制大胜想象，不额外推高热门胜率
- 第三轮语境层：
  - 维持 `draw_enough_control_bias`
  - 把“弱队前60分钟可咬住、后30分钟被迫抬线”的分段逻辑纳入时间切片

## 综合校准结论

1. 本轮最大误差不在静态强弱，而在第三轮语境层落地幅度。
2. 市场信号应继续保留，但在“强队已接近锁位”与“弱队必须赢”同时出现时，必须更严格防止重复计数。
3. 泊松层不应为单场赛果剧烈漂移：
   - 厄瓜多尔 vs 德国：以“上调语境修正、削弱热门热度、小幅提升开放尾部”为主。
   - 库拉索 vs 科特迪瓦：以“保持胜负方向、微调第二球概率、抑制大胜冲动”为主。

## player_state_update_status

- 状态：`blocked`
- 原因：
  - 本线程只核对了四队 `player_state` 与成员表更新时间，没有执行分钟级事件回写。
  - 项目规范要求只有在实际安全回写后才能把 `player_state_update_status` 标为 `complete`。
- 建议后续动作：
  - 由主线程或专门维护线程在核准首发、换人、伤停后再写回。
  - 写回前保留本次参数修正作为模型层校准，不直接覆盖球员层状态。
