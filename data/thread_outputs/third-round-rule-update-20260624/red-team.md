---
phase: rule_update
group: null
match: null
status: complete
created_at: 2026-06-24T00:00:00+08:00
updated_at: 2026-06-24T00:05:00+08:00
owner: worldcup-red-team-verifier
scope: 第三轮预测红队规则迭代确认；仅记录新增核验门槛，不启动具体小组预测
missing_fields: []
source_log:
  - .codex/skills/worldcup-red-team-verifier/SKILL.md
  - .codex/skills/worldcup-quant-prediction-system/SKILL.md
notes:
  - 已采用第三轮新增审查规则
  - 后续第三轮预测默认先查 tiebreaker、积分表、动机标签、同时开球依赖
---

# 第三轮红队规则确认

status: complete
verdict: adopted

## 新增必查项

- 官方 tiebreaker 与当前小组表快照是否明确落盘
- 每队 qualification state 是否写清：必须赢、打平即可、争第一、已出线可轮换、已淘汰荣誉战
- 是否纳入同组同时开球带来的末段策略变化
- 是否高估热门队、低估其轮换/低风险踢法
- 是否低估平局管理、低节奏默契、净胜球追赶、末段放手进攻
- 是否把动机、轮换、市场变化重复计数
- 是否显式写出“热门队动机低于弱队”的失败情景

## 第三轮优先 blocker

- `blocker`: 缺官方 tiebreaker 规则或当前小组表快照
- `blocker`: 缺每队 qualification-state label 与 reason
- `blocker`: 缺同时开球依赖说明，未写另场赛果如何改变末段策略
- `blocker`: 缺 T-75 官方首发、关键伤停、黄牌停赛/保护轮换确认
- `blocker`: 市场为未开售/暂停销售/不同源不可比，仍被写成可执行投注口径
- `blocker`: 未证明动机、轮换、赔率变化没有重复计数
- `blocker`: 未写“热门队动机低于弱队”的 downside scenario 却直接放行热门

## 执行口径

- 第三轮若以上任一 blocker 未解除，红队默认 `hold` 或 `hold_for_betting_discussion_only`
- 只允许 `discussion_only` 时，必须显式写明哪些玩法不能发布
- 预测线程若缺 `third_round_context`、`qualification_scenarios`、`motivation_profile`、`simulated_group_outcomes` 等核心字段，红队优先判 `revise/hold`
