---
phase: match_prediction
group:
  - A
  - B
  - C
match:
  - 南非 vs 韩国
  - 捷克 vs 墨西哥
  - 瑞士 vs 加拿大
  - 波黑 vs 卡塔尔
  - 苏格兰 vs 巴西
  - 摩洛哥 vs 海地
status: complete
created_at: 2026-06-24T18:25:28+08:00
updated_at: 2026-06-24T18:27:11+08:00
owner: red_team
scope: A/B/C组三第三轮中国体彩购彩建议红队校验；聚焦停售/未开售、T-75官方首发缺失、低赔强队串关过热、深让盘误判、第三轮动机与轮换冲突
missing_fields:
  - 最新官方T-75首发
  - 官方/同源可执行销售状态闭环
  - 最新官方伤停/停赛确认
source_log:
  - data/outputs/match_predictions/a-group-round3-quant-prediction-20260624.json
  - data/thread_outputs/a-group-round3-20260624/betting-risk-lineup-odds-recheck.md
  - data/thread_outputs/a-group-round3-20260624/red-team-lineup-odds-recheck.md
  - data/outputs/match_predictions/b-group-round3-quant-prediction-20260624.json
  - data/thread_outputs/b-group-round3-20260624/betting-risk.md
  - data/thread_outputs/b-group-round3-20260624/data-collector-lineup-odds-recheck.md
  - data/thread_outputs/b-group-round3-20260624/modeler-lineup-adjusted-recalc.md
  - data/thread_outputs/b-group-round3-20260624/red-team-lineup-odds-recheck.md
  - data/outputs/match_predictions/c-group-round3-quant-prediction-20260624.json
  - data/thread_outputs/c-group-round3-20260624/betting-risk.md
  - data/thread_outputs/c-group-round3-20260624/data-collector-lineup-odds-recheck.md
  - data/thread_outputs/c-group-round3-20260624/modeler-lineup-adjusted-recalc.md
  - data/thread_outputs/c-group-round3-20260624/red-team-lineup-odds-recheck.md
notes:
  - skeleton_created_first_per_anti_disconnect_rule
  - current_task_is_red_team_review_only
  - verdict_locked_as_hold_for_betting_discussion_only
---

# A/B/C组三第三轮体彩购彩建议红队校验

## 总结论

`verdict: hold_for_betting_discussion_only`

当前不允许把 A/B/C 组三第三轮任何一场写成可执行购彩建议，只允许保留赛前讨论口径。拦截原因不是单一数据点，而是三类门禁同时未过：`T-75 官方首发缺失`、`体彩/同源页面存在停售或未开售问题`、`第三轮动机与轮换冲突会放大低赔热门和深让盘误判`。

必须写入主线程的核验声明：

- 当前所有建议仅可标记为 `discussion_only`，不得写成“可直接执行”“稳胆”“可串关落地”。
- 任何暂停销售、普通 SPF 未开售、或仅能看到近同源非执行页赔率的场次，都不能升级为竞彩执行建议。
- 未拿到 T-75 官方首发、最终伤停/停赛确认前，不得把 `estimated lineup` 当作执行依据。

## 禁投/回避项

- 回避把 A 组韩国胜、墨西哥胜包装成低风险串关。两场都受到第三轮动机、轮换、同组同时开球末段策略影响，低赔不等于低风险。
- 回避把 B 组波黑“必须赢”直接外推成轻松穿盘。普通胜方向可讨论，但 `-1` 不能写成高把握执行项。
- 回避把 C 组巴西低赔胜、巴西 2 球以上、摩洛哥 `-2` 深盘写成可下单结论。巴西存在轮换和比赛管理风险，摩洛哥普通 SPF 未开售且 `-2` 对净胜球要求过高。
- 回避任何“暂停销售页可直接照抄赔率执行”的表述。A 组、B 组、C 组都存在销售状态异常或不可执行问题。
- 回避预算分配、组合搭配、娱乐比分下注额度等执行措辞；这会把 `discussion_only` 偷换成投注指令。

## 可讨论但需临场确认项

- A 组只可讨论“韩国方向强于南非、但市场偏热”“墨西哥方向占优、但已出线后的轮换与降节奏风险高”，不能提前升级为单关/串关执行。
- B 组只可讨论“瑞士 vs 加拿大平局管理风险高”“波黑胜面大于卡塔尔，但让球穿盘证据不足”，且需等待官方首发与停赛确认。
- C 组只可讨论“巴西方向仍强于苏格兰，但大胜叙事需要降级”“摩洛哥方向占优，但普通 SPF 未开售且 `-2` 深盘不能前置执行”。

## 分组红队结论

### A组

- `verdict: hold_for_betting_discussion_only`
- 市场对韩国、墨西哥两侧都有明显压热迹象，尤其不应把“更强一方”直接翻译成“适合串关的安全边”。
- 墨西哥已出线，第三轮存在轮换、控节奏、保黄牌与末段平局管理风险；韩国虽然动机更强，但低赔和 `+1` 让球结构一起提示其赢球不等于轻松拉开比分。

### B组

- `verdict: hold_for_betting_discussion_only`
- 瑞士 vs 加拿大是典型第三轮平局管理场景，市场和模型都不能忽略末段保结果倾向。
- 波黑 vs 卡塔尔可以讨论波黑方向，但“必须赢”已部分被赔率吸收，不能再叠加成强穿盘、重仓或串关加码逻辑。
- 现有 B 组竞彩风险稿里出现了组合、预算和“波黑胜优先”一类偏执行表述，红队要求全部降级为风险讨论语言。

### C组

- `verdict: hold_for_betting_discussion_only`
- 巴西低赔不应自动等于大胜。第三轮情境下，领先后的节奏管理、轮换、以及同组另一场实时比分都会改变净胜球追逐强度。
- 摩洛哥对海地虽然方向占优，但普通 SPF 未开售，只剩 `-2` 深盘观察值；在这种市场结构下，不能把净胜 3 球叙事写成可执行建议。
- C 组已有风险稿部分段落与最新量化状态不同步，引用时只能采纳与当前量化/复核文件一致的门禁结论，不得宣称 full-ready。

## 核心风险门禁

- `lineup_gate`: 四组热门侧都缺 T-75 官方首发，尤其影响墨西哥、巴西、摩洛哥、韩国这类轮换或强弱预期明显的场次。
- `market_gate`: A/C 组页面存在停售或暂停销售提示；C 组摩洛哥 vs 海地普通 SPF 未开售；B 组虽有近同源快照，但仍未形成可执行闭环。
- `motivation_gate`: 第三轮不能把“必须赢”“已出线”“争第一”“争最佳第三”机械化处理，动机与轮换、赔率变化若同时入模，容易重复计权。
- `parlay_gate`: 低赔热门跨场串关会把同类风险叠加，包括轮换误判、末段收节奏、同组联动和深盘穿盘失败。

## 建议给主线程的短口径

- 今日 A/B/C 组三第三轮中国体彩相关内容，红队只放行 `discussion_only`，不放行执行型购彩建议。
- 需要明确禁投/回避：韩国低赔串关、墨西哥低赔串关、波黑让球强穿、巴西大胜前置、摩洛哥 `-2` 前置。
- 只有在 `T-75 官方首发 + 官方/同源可执行销售状态 + 最新伤停停赛确认 + 红队复核通过` 同时补齐后，才允许从讨论稿升级到执行稿。
