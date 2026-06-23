---
phase: match_prediction
group: K
match: Portugal vs Uzbekistan; Colombia vs DR Congo
status: partial
created_at: 2026-06-23T00:00:00+08:00
updated_at: 2026-06-23T00:00:00+08:00
owner: worldcup-red-team-verifier
scope: K-group round-2 red-team check, partial fallback only
missing_fields:
  - 2026-06-23 quant prediction JSON missing
  - data-collector thread still partial or skeleton
  - modeler thread still partial or skeleton
  - T-75m official lineups missing
  - final injury and minutes-limit confirmation missing
  - official odds and same-source 1X2/handicap/totals snapshot missing
  - official hourly weather missing
source_log:
  - K:\worldcup\data\thread_outputs\k-group-round2-20260623\data-collector.md
  - K:\worldcup\data\thread_outputs\k-group-round2-20260623\tactics-coach.md
  - K:\worldcup\data\thread_outputs\k-group-round2-20260623\modeler.md
  - K:\worldcup\data\outputs\match_predictions\k-group-round2-quant-prediction-20260622.json
  - K:\worldcup\data\reviews\red_team\k-group-round2-prediction-red-team-20260622.md
  - K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_葡萄牙_1-1_刚果金_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md
notes:
  - fallback review accepted for internal workflow only
  - not full review
---

# K组第二轮红队校验

- verdict: `hold_for_betting`
- publish_mode: `discussion_only`
- release_label: `partial_publish_ok`
- scope_note: 允许主线程把本稿作为内部讨论材料引用，不允许包装成 full review，不允许写成强置信投注表达。

## 当前结论

- 两场都不满足投注发布门槛。
- 可以保留方向性讨论，但必须显式标注 `partial` 与 `discussion_only`。
- 若主线程外发，必须写清：盘口、首发、最终伤停、当日量化文件仍未齐。

## 数据新鲜度

- 2026-06-23 当日量化预测 JSON 缺失，当前只能回退到 2026-06-22 版 partial 模型。
- `data-collector.md` 与 `modeler.md` 未形成完整当日闭环，事实链和建模链都不能宣称 full。

## 重复计权

- 首轮赛果、player_state、attack/defense score、战术优劣之间存在重复加权风险。
- 若直接把“首轮表现好 + 球员状态升 + 战术对位优”线性叠加，会高估热门队并压低平局/爆冷尾部。

## 赔率缺口

- 当前缺官方中国体彩与同源 1X2 / 让球 / 大小球快照。
- 因此不能校验热门溢价、盘口一致性、市场追涨是否已透支。
- 任何“市场支持模型”的写法都不允许出现。

## 热门队偏误

- 葡萄牙存在品牌与阵容名气放大效应，容易掩盖首轮终结效率和中后场稳定性疑点。
- 哥伦比亚存在首轮 3比1 结果放大效应，但其比赛过程不应被直接解读为稳定碾压。

## 爆冷路径

- 乌兹别克斯坦仍保留 Fayzullaev / Shomurodov 的反击与二次进攻路径。
- 刚果金已在首轮证明其定位球、二点球、身体对抗和反击链条足以保留平局与冷门尾部。

## 比分过度自信

- 葡萄牙方向不能写成“轻松两球以上赢球”。
- 哥伦比亚方向不能写成“稳胆强热门”。
- 低比分、窄胜、1比1 这类结果必须保留讨论空间。

## 伤停与首发未知

- 葡萄牙：Ruben Dias 状态冲突未完全解除，前场角色分配仍需首发确认。
- 哥伦比亚：James、Luis Diaz、Duran 的角色与分钟数仍需确认。
- 刚果金：Wissa、Bakambu、Mbemba 的出场与功能位仍需确认。
- 乌兹别克斯坦：防线负荷、黄牌和轮换影响仍未完全锁定。

## 概率调整建议

### 葡萄牙 vs 乌兹别克斯坦

- 基线方向仍偏葡萄牙，但应降温。
- 建议：葡萄牙胜下调 3-6 个百分点，平局上调 2-4 个百分点，乌兹别克斯坦胜尾部上调 1-2 个百分点。

### 哥伦比亚 vs 刚果金

- 基线方向仅可保留为哥伦比亚第一方向，不能升格为强热门。
- 建议：哥伦比亚胜下调 3-5 个百分点，平局上调 2-3 个百分点，刚果金胜尾部上调 1-3 个百分点。

## 发布口径

- discussion_only 发布：`yes`
- betting 发布：`no`
- full review 宣称：`no`

## 主线程必须附带的声明

- 本稿为 `partial fallback` 红队校验，不是 full review。
- 当前 verdict 为 `hold_for_betting`；仅允许 `discussion_only` 使用。
- 在当日量化文件、首发、最终伤停、盘口未补齐前，不得把两场写成高置信预测或投注表达。
