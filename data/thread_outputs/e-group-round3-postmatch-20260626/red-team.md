phase: postmatch_review
group: E
matches:
  - 厄瓜多尔 2-1 德国
  - 库拉索 0-2 科特迪瓦
status: complete
created_at: 2026-06-26
updated_at: 2026-06-26
owner: red_team
scope: E组第三轮赛后复盘与购彩失误审查；只做核验/反方，不做新预测或投注建议
missing_fields:
  - 实际用户购票单据未提供，无法把失败精确映射到单一方案编号
  - 分钟级 player_state 回填仍 blocked
  - 官方统一赛后 xG 未落盘
  - 赛后复盘文件尚未纳入 betting-plan / betting red-team 作为正式来源
source_log:
  - K:\worldcup\data\outputs\match_predictions\e-group-round3-quant-prediction-20260625.json
  - K:\worldcup\data\outputs\match_predictions\e-group-round3-postmortem-20260626.json
  - K:\worldcup\比赛\已完成比赛\小组赛\E组\2026-06-25_厄瓜多尔_2-1_德国_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\E组\2026-06-25_库拉索_0-2_科特迪瓦_复盘.md
  - K:\worldcup\data\thread_outputs\e-group-round3-20260625\red-team.md
  - K:\worldcup\data\thread_outputs\def-round3-betting-20260625\betting-plan.md
  - K:\worldcup\data\thread_outputs\def-round3-betting-20260625\red-team.md
  - K:\worldcup\data\thread_outputs\def-round3-betting-20260625\expanded-return-red-team.md
notes:
  - 红队关注的是“赛前有没有真正拦住错误”，不是赛后把逻辑解释圆
  - 本文件结论可供主线程回写 postmortem/status/rulebook
verdict: revise
error_level: high
recommended_postmortem_status: partial

# E组第三轮赛后红队审查

## 总结判定

- `verdict`: `revise`
- `error_level`: `high`
- `recommended_postmortem_status`: `partial`

红队结论：现有 E 组第三轮复盘和购彩复盘，不适合继续维持“完整闭环已完成”的口径。问题不只在赛果判断失手，更在于：

1. 红队赛前已经把 `discussion_only / hold_for_betting` 说清楚，但主线程/投注线程仍把部分高波动玩法放进主仓。
2. 德国这场赛前虽然做了 revise，但修正幅度不够，仍把“已基本锁头名的强队低赔”留成串关锚点。
3. 库拉索 `+2` 盘口被错误地落成 `让胜` 主仓方向，实际赛果 `0-2` 正好打到 `让平`，属于让球结构理解不合格。
4. 赛后 postmortem 把模型方向和票型方向混写，容易形成“方向大致对，所以复盘 complete”的自我辩护。

## 关键问题

### 1. 红队门禁被下游绕过

- 赛前 D/E/F 红队文件明确写了 `hold_for_betting_discussion_only`，并禁止把德国低赔、科特迪瓦深让、3串1/4串11、精确净胜球玩法当主仓。
- 但主线程投注方案仍输出了：
  - `055 德国胜` 进入 A/B/C 主仓或串关锚点
  - `056 库拉索(+2)让胜` 进入 B 方案主仓
  - `3串1`、`4串11`、`4串4`
  - `060 +1让平`、`057 +2让平` 这类精确净胜球数玩法进入主仓
- 这不是“临场没执行所以无害”，而是规则门禁没有真正生效。

责任：
- `main`: high
- `betting`: high

### 2. 德国低赔陷阱拦截不够

- E组赛前红队已明确要求把德国胜率更多让回给平局，并警惕“已基本锁头名后的轮换/控节奏”。
- 最终量化虽然从更热版本下修到德国胜 `48.59%`，但投注方案仍继续把 `1.36` 的德国胜放进主仓与串关。
- 实际 `厄瓜多尔 2-1 德国` 说明：模型 revise 方向对，但 betting/main 没有把 revise 翻译成“禁止当低风险锚点”。

责任：
- `model`: high
- `betting`: high
- `main`: high

### 3. 库拉索 +2 盘口被误读

- 红队赛前已经把 `056` 的 `+2` 盘定义为“大胜尾部约束信号”，不是“可直接强化任一主仓方向”的证据。
- 投注方案却选了 `库拉索(+2)让胜`。这个选项要求库拉索至多输 1 球；而实际 `0-2` 恰好落在 `让平`。
- 这类错误不属于单纯赛果黑天鹅，而是让球玩法结构理解错误。

责任：
- `betting`: high
- `main`: medium

### 4. 复盘存在“方向对”替代“票型对”的自我辩护风险

- `库拉索 0-2 科特迪瓦` 单场复盘写“模型总体方向正确”，这在 1X2 层面成立。
- 但如果用户昨天实际踩中的错票是 `056 库拉索(+2)让胜`，那么“方向对”并不能替代“票型错”。
- 复盘文件和 group postmortem 目前没有把“模型方向命中”与“投注票型命中”严格拆开，容易让读者误以为执行层只是运气差。

责任：
- `main`: high
- `betting`: high
- `model`: medium

### 5. postmortem 状态写成 complete 过满

- `e-group-round3-postmortem-20260626.json` 当前 `status=complete`。
- 但同时存在：
  - `player_state_update_status=blocked`
  - 官方统一赛后 xG 未落盘
  - 没把 `betting-plan.md`、`expanded-return-red-team.md` 等投注链文件纳入正式来源
  - 不能确认用户“昨天那张没中”的具体票据映射
- 这更像“模型赛后复盘完成，但投注失误闭环未完成”，应降为 `partial`。

责任：
- `main`: high
- `data`: medium
- `model`: medium

## 责任归因

| owner | 等级 | 结论 |
| --- | --- | --- |
| `main` | high | 没把红队的 `discussion_only / hold_for_betting` 变成真实发布门禁；赛后复盘 status 也写得过满。 |
| `betting` | high | 主仓混入 3串1/4串11、精确净胜球数、德国低赔锚点、库拉索(+2)让胜等高波动或误读玩法。 |
| `model` | high | 德国第三轮动机/降速虽有修正但不够狠，未能把 revise 真正转成“禁止低赔稳胆化”。 |
| `data` | medium | player_state、统一赛后 xG、票据映射链缺口，导致 postmortem 不能称 full。 |
| `tactics` | low | 主要战术风险其实大体识别到了，问题更多出在落地权重和票型翻译。 |

## 必须改的规则

1. `red-team = hold_for_betting_discussion_only` 时，主线程不得再输出“主仓/执行型”玩法模板。
2. 已出线或基本锁位强队的低赔 `SPF`，禁止作为主仓锚点或 3 串以上核心腿。
3. `+1让平`、`+2让平`、以及需要精确净胜球数成立的玩法，一律归类为高方差娱乐项，不得进主仓。
4. 深受让盘若被当作“保护盘”，必须写清楚覆盖的是 `让胜 / 让平 / 让负` 哪一档，不能模糊表述成“+2方向”。
5. 赛后复盘必须把“模型方向是否命中”与“实际票型是否命中”拆开写，禁止用前者替代后者。
6. 只要 `player_state_update_status=blocked`、官方统一赛后 xG 未落盘、或投注链来源未纳入，就不得把 end-to-end postmortem 标成 `complete`。

## 是否建议把复盘 status 从 complete 改为 partial

建议：`是`

建议改动：
- `K:\worldcup\data\outputs\match_predictions\e-group-round3-postmortem-20260626.json`
  - `status: partial`
  - 新增说明：`model_postmortem_complete_but_betting_audit_incomplete`
- 两个单场复盘如继续承担“购彩失误解释”职责，也应从 `complete` 调整为 `partial`
  - 原因：都还缺分钟级 player_state、统一赛后 xG、以及与实际票据的映射

## 下一轮投注禁入项

1. 已基本锁位强队低赔 `SPF` 作为主仓锚点。
2. 任何 `3串1`、`4串4`、`4串11` 进入“保守/均衡”主仓。
3. `+1让平`、`+2让平`、净胜 1 球/2 球这类精确净胜球玩法进入主仓。
4. 未开售普通 `SPF` 的场次，被强行包装成可执行主仓票。
5. 比分、半全场、深让穿盘玩法，被用来弥补主仓回报目标。

## 给主线程的核验声明

- “本次 E 组第三轮赛后复盘只能视为 `partial` 闭环：模型误差解释基本完成，但投注失误审查仍存在票据映射、player_state 与统一赛后 xG 缺口。”
- “不得把‘模型方向大体正确’表述成‘购彩逻辑基本正确’；若票型落错，让球与串关结构错误必须单独追责。”
- “下一轮若红队 verdict 仍是 `hold_for_betting_discussion_only`，主线程不得再输出主仓执行模板。”
