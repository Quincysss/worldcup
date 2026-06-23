---
phase: betting_summary
group: K+L
match: Portugal vs Uzbekistan; Colombia vs DR Congo; England vs Ghana; Panama vs Croatia
status: partial
created_at: 2026-06-23T17:13:52+08:00
updated_at: 2026-06-23T17:55:00+08:00
owner: worldcup-red-team-verifier
scope: K组+L组第二轮竞彩购彩建议红队审查；仅核验发布门控、赔率有效性、伤停首发与投注表达风险，不给投注建议
missing_fields:
  - 投注线程 `data-collector.md` 正文缺失
  - 投注线程 `modeler.md` 正文缺失
  - 投注线程 `betting-risk.md` 正文缺失
  - 正式竞彩方案 Markdown/JSON 为空
  - 四场 T-75 官方首发未确认
  - 四场最新官方伤停/分钟限制未完全确认
  - K/L 四场同源稳定赔率链未完全补齐
source_log:
  - 赔率与投注/K-L组第二轮竞彩方案_20260623/summary.md
  - data/thread_outputs/k-group-round2-recalc-20260623/red-team.md
  - data/thread_outputs/l-group-round2-recalc-20260623/red-team.md
notes:
  - 当前投注目录除 `summary.md` 外，其余核心文件为空
  - 结论只能按 partial_thread_fallback + hold 输出
---

# K-L组第二轮竞彩方案红队审查

review_target: K组+L组第二轮四场竞彩方案
verdict: hold
publish_mode: discussion_only
betting_release: blocked

## top_concerns

- concern: 当前竞彩方案主文件、JSON、data/model/betting-risk 线程文件为空，不能宣称“购彩建议”已完成
  category: data
  severity: blocker
  confidence: high
  evidence: `K-L组第二轮竞彩方案_20260623.md`、`k-l-round2-jingcai-plan-20260623.json`、`data-collector.md`、`modeler.md`、`betting-risk.md` 长度为 0
  why_it_matters: 没有可核验的具体投注结构、玩法分层、赔率链和资金口径，任何放行都属于伪装完整
  follow_up_check: 先补齐线程正文，再做二次红队审查
  owner: main

- concern: 四场都仍受 T-75 首发、最终伤停、分钟限制和赛前体检约束
  category: availability
  severity: blocker
  confidence: high
  evidence: K组与L组红队稿均明确写明首发/伤停/分钟限制未锁定
  why_it_matters: 竞彩玩法尤其受首发门将、中场核心和边路爆点是否出场影响
  follow_up_check: 官方首发与最终队报落地后再复核
  owner: data

- concern: 官方/同源赔率存在未开售、暂停销售、结构不完整等问题
  category: market
  severity: blocker
  confidence: high
  evidence: 葡萄牙普通胜平负未开售；英格兰普通 SPF 未开售；中国足彩页面存在系统升级/暂停销售提示；新浪稳定结构化赔率链仍缺
  why_it_matters: 没有可执行市场，就不能生成可执行投注建议
  follow_up_check: 确认销售状态恢复、普通 SPF/让球/大小球链完整
  owner: data

- concern: 热门穿盘风险高于普通胜平负方向本身，尤其是哥伦比亚与克罗地亚，英格兰还存在深盘风险
  category: market
  severity: high
  confidence: high
  evidence: 哥伦比亚普通 SPF 强但 `-1` 让球 `2.22/3.35/2.63` 不支持强穿盘；克罗地亚普通 SPF `1.34` 但 `+1` `2.65/3.60/2.11` 仍保留巴拿马受让路径；英格兰只有 `-2`
  why_it_matters: 串关和让球玩法最容易在“热门看起来稳”时放大误判
  follow_up_check: 将让球与普通胜平负分开评估，不得混写为同一强信号
  owner: model

- concern: 串关相关性风险未被显式控制
  category: tournament
  severity: high
  confidence: medium_high
  evidence: 当前摘要没有任何串关去相关说明，且四场里三场都带热门方向与盘口不稳问题
  why_it_matters: 多场热门同向表达会叠加“热门税 + 首发未定 + 深盘不稳”风险
  follow_up_check: 若后续恢复购彩讨论，必须单列串关禁区和相关性折价
  owner: main

## market_flags

- 中国足彩网存在系统升级/暂停销售提示，当前不接受任何“可直接购买”措辞。
- 葡萄牙 vs 乌兹别克斯坦普通胜平负未开售，不能拿外部欧赔或旧概率替代中国竞彩 SP。
- 哥伦比亚 vs 刚果（金）普通 SPF 热，但 `-1` 让球不支持强穿盘，属于典型热门穿盘警报。
- 英格兰 vs 加纳普通 SPF 未开售，仅有 `-2` 让球 `2.20/3.80/2.43`，不能据此写成“大胜稳胆”。
- 巴拿马 vs 克罗地亚普通 SPF `6.90/4.20/1.34` 与 `+1` `2.65/3.60/2.11` 一起看，只能得出“克罗地亚方向占优但穿盘不稳”。
- K/L 两组目前都缺稳定新浪结构化赔率链，不能宣称市场校准完成。

## quant_chain_flags

- K组红队已判定 `hold_for_betting_discussion_only`，原因包括：K 组 recalc 上游仍为骨架、T-75 首发缺失、最终伤停未确认、模型 JSON 不可机读。
- L组红队已判定 `hold_for_betting_discussion_only`，原因包括：L 组 recalc 上游仍为骨架、英格兰和克罗地亚热门方向都存在盘口不共振与首发门控。
- 在这种前提下，任何 K/L 合并购彩方案如果仍给“主推、稳胆、可串、可冲让球”之类表述，都是跳过红队门控。
- 当前并不存在一个可核验的、完整的投注量化链，所以不能把四场比赛拼装成统一执行单。

## 诱导投注措辞禁区

- 禁用：`主推`、`稳胆`、`可小注`、`可博`、`稳穿`、`串关优先`、`可抄作业`
- 禁用：把“方向占优”改写成“适合下注”
- 禁用：把普通 SPF 热度外推成让球稳胆
- 禁用：把 discussion-only 风险提示藏在段尾，同时在标题或表格里给强下注暗示

## 分场 verdict

### 葡萄牙 vs 乌兹别克斯坦

- verdict: hold
- only_discussion_only:
  - 胜平负方向讨论
  - 比分倾向讨论
- blocked_plays:
  - 任何正式单场投注建议
  - 任何串关纳入
  - 任何让球/穿盘倾向
- reason:
  - 普通胜平负未开售
  - 页面暂停销售风险
  - T-75 首发与最终伤停未确认

### 哥伦比亚 vs 刚果（金）

- verdict: hold
- only_discussion_only:
  - 常规强弱面讨论
  - 普通主胜热度与让球不共振的风险提示
- blocked_plays:
  - `-1` 让球相关玩法
  - 串关主胆
  - 任何“主胜稳穿”表达
- reason:
  - 普通 SPF 与 `-1` 让球冲突
  - 首发/伤停未最终确认
  - 稳定同源赔率链未补齐

### 英格兰 vs 加纳

- verdict: hold
- only_discussion_only:
  - 英格兰方向占优但需降温的讨论
  - 深盘风险讨论
- blocked_plays:
  - `-2` 深盘玩法
  - 任何大胜比分串关
  - 任何把欧赔替代为竞彩 SP 的写法
- reason:
  - 普通 SPF 未开售
  - 只有 `-2` 深盘，热门税显著
  - Saka/Rice/Rashford、Ati-Zigi、Partey 等关键变量未锁定

### 巴拿马 vs 克罗地亚

- verdict: hold
- only_discussion_only:
  - 克罗地亚略占优讨论
  - 平局/一球胜尾部风险讨论
- blocked_plays:
  - 克罗地亚让球穿盘类玩法
  - 串关稳胆
  - 任何“轻松打穿”表述
- reason:
  - 普通 SPF 与 `+1` 让球不共振
  - Carrasquilla 与克罗地亚老将分钟未确认
  - 同源赔率链不完整

## 串关审查

- verdict: hold
- finding:
  - 当前四场里至少三场带有“热门方向存在盘口不共振或深盘风险”的共同问题，不适合做热门串关。
  - 若再叠加首发未定与销售状态不稳，串关属于放大不确定性，而不是分散风险。
- blocked_combo_types:
  - 四串一、三串一
  - 双热门让球串
  - 以哥伦比亚/英格兰/克罗地亚为主胆的串关

## handoff_notes

- `main`: 当前总 verdict 只能写 `hold`，且要明确“竞彩购彩建议未成稿，只能 discussion_only”
- `data`: 补销售状态、普通 SPF/让球/大小球可用性、T-75 首发、最终伤停
- `model`: 即使后续补齐，也要把热门穿盘与普通胜平负拆开，不得用一个强信号覆盖全部玩法

## final

- verdict: `hold`
- publish_mode: `discussion_only`
- betting_advice: blocked
