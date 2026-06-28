---
phase: match_prediction_red_team_review
group: J
round: 3
version: v3
red_team_status: complete_red_team_review
verdict: hold
betting_language_blocked: true
created_at: 2026-06-27T15:10:00+08:00
---

# J组第三轮 v3 红队审查

## 总结论

`verdict: hold`。本次只能作为 v3 红队补审，不能放行发布层的投注化表达。主要阻断项是：T-75 官方首发未公布、最终伤停/停赛/分钟限制未闭环、v3 `predicted_lineups` 结构缺失、同源 1X2/让球/大小球赔率链不完整、约旦 vs 阿根廷普通胜平负未开售或未抓到，且旧量化 JSON 当前不可解析。

旧链路红队已给 `revise`，但 v3 标准下需要上调为 `hold`。两场都存在第三轮动机、同步比赛、轮换、黄牌/分钟风险和 Poisson 尾部低估问题；赔率只可用于讨论级市场校准，不可转换为执行口径。

## 阿尔及利亚 vs 奥地利

- `verdict`: `hold`
- 模型快照：xG 1.14-1.31；校准后阿尔及利亚胜 31.5% / 平 31.0% / 奥地利胜 37.5%；Top5 为 1-1、0-1、1-0、0-0、1-2。
- top_concerns:
  - 高严重度 / 高置信：v3 预计首发结构缺失，T-75 官方首发未公布，无法确认奥地利高压、阿尔及利亚前场持球点和后段提速路径。
  - 高严重度 / 高置信：第三轮动机分叉明显。奥地利 3 分且净胜球占优，平局价值高；阿尔及利亚净胜球落后，末段可能主动打开。
  - 中严重度 / 高置信：普通胜平负去水平局约 42.0%，明显高于模型平局 31.0%，必须解释市场差异。
  - 中严重度 / 中置信：奥地利实力、高压、二点球、定位球和前两轮表现可能被重复计权。
- recommended_probability_adjustment：T-75 和最终伤停前，不应提高奥地利胜 37.5%；建议把奥地利胜审查带压回约 34-36%，平局保持或上调到约 32-34%，并保留阿尔及利亚一球胜与末段转大尾部。
- missing_data：T-75 官方首发、v3 结构化预计首发、最终伤停/分钟限制、同源大小球、可解析 v3 量化 JSON。
- handoff_notes：数据线程补官方首发和最终 team news；战术线程补末段提速与同步比赛触发；模型线程修复 JSON 并检查 draw/late-chaos tail；市场线程补同源 odds chain。

## 约旦 vs 阿根廷

- `verdict`: `hold`
- 模型快照：xG 0.56-1.95；校准后约旦胜 10.6% / 平 22.4% / 阿根廷胜 67.0%；Top5 为 0-1、0-2、0-3、1-1、1-2。
- top_concerns:
  - 高严重度 / 高置信：普通 1X2 缺失，只有约旦 +2 让球快照；不能用让球盘替代胜平负市场校准。
  - 高严重度 / 高置信：阿根廷 6 分、净胜球 +5，目标更偏控风险、保头名和健康，轮换会直接影响胜率和深穿尾部。
  - 高严重度 / 高置信：v3 预计首发未结构化，阿根廷核心是否轮休、约旦是否五后卫低位、替补触发都需要 T-75 后重检。
  - 中严重度 / 中置信：强队标签、前两轮成绩、控场战术和市场信号可能重复推高阿根廷胜率。
- recommended_probability_adjustment：T-75、最终伤停和普通 1X2 未补齐前，阿根廷胜 67.0% 建议进入约 62-65% 审查带；上调平局/约旦守住小负尾部，同时保留约旦压出后的阿根廷反击大胜尾部，但不得把 3+ 尾部写成稳定路径。
- missing_data：普通 1X2、T-75 官方首发、v3 结构化预计首发、阿根廷轮换/分钟限制、约旦最终阵型、同源大小球、可解析 v3 量化 JSON。
- handoff_notes：数据线程补轮换和伤停；战术线程明确控节奏与低位触发；模型线程拆分阿根廷胜、净胜 2 球、净胜 3+ 与比分 Top5；市场线程补普通 1X2/让球/大小球同源快照。

## 全局阻断项

- T-75 official lineups: missing。
- final injuries / suspensions / minutes limits: not final。
- v3 predicted_lineups: reviewed baseline missing structured fields。
- same-source 1X2 / handicap / totals: incomplete。
- Jordan vs Argentina ordinary 1X2: unavailable in reviewed snapshot。
- baseline quant JSON: not parseable by `ConvertFrom-Json` in current local state。

## 红队发布口径

在以上阻断项解除前，主线程只能保留 `discussion_only_hold / hold_not_executable`。不得输出或暗示可执行投注建议；不得把方向概率、让球档位、比分 Top5 或强队标签互相背书；不得用“方向命中”掩盖让球、大小球、比分和串关层面的失败风险。
