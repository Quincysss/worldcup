---
phase: match_prediction_red_team_review
group: K组
status: complete_red_team_review_after_tactical_fill
created_at: 2026-06-22T21:53:12+08:00
updated_at: 2026-06-22T23:20:00+08:00
owner: worldcup-red-team-verifier
scope: K组第二轮完整量化链与战术收口后红队复审；只做反方审查，不生成主预测、不替代模型、不做投注建议。
inputs_expected:
  - data/outputs/match_predictions/k-group-round2-quant-prediction-20260622.json
  - data/packets/matches/k-group-round2-data-refresh-20260622.json
  - data/packets/matchup_tactics/k-group-round2-tactical-refresh-20260622.json
  - K组第一轮复盘
  - Portugal/DR Congo/Uzbekistan/Colombia player_state and roster files
missing_inputs:
  - T-75m official lineups
  - final injury, suspension and minutes-limit confirmation
  - official China Sports Lottery odds
  - same-book 1X2, handicap and totals snapshot
  - official hourly stadium weather forecast
source_log:
  - local project files listed in JSON source_log
notes:
  - Model and tactical packet are now filled enough for discussion-only review; hold remains because live gates and market data are missing.
---

# K组第二轮量化预测红队审查 20260622

status: complete_red_team_review

verdict: hold

当前阻断：量化模型已完整，战术包也已收口为 `partial_source_limited`。红队当前阻断理由已改为临场闸门与来源限制：T-75m 官方首发、最终伤停/分钟限制、官方中国竞彩、同源 1X2/让球/大小球、官方逐小时天气仍缺；同时数据和球员状态仍有 source-limited 缺口，概率需要折扣后才能进入发布层讨论。

## 总体 Top Concerns

| concern | category | severity | confidence | owner |
| --- | --- | --- | --- | --- |
| 临场首发、最终伤停/分钟限制、官方天气未确认 | availability | blocker | high | data |
| 官方竞彩和同源 1X2/让球/大小球快照缺失 | market | blocker | high | data/main |
| 战术包已收口但 source-limited，且多项战术因子与 player_state/attack_score 重叠 | tactical | high | high | tactics/model |
| 首轮单场样本容易过度影响第二轮判断 | data | high | high | model |

## 葡萄牙 vs 乌兹别克斯坦

verdict: `hold`

模型链摘要：

| 项目 | 数值 |
| --- | ---: |
| xG | 葡萄牙 1.90 / 乌兹别克斯坦 0.78 |
| 1X2 | 葡萄牙胜 63.85% / 平 21.46% / 乌兹别克斯坦胜 14.69% |
| 大小球 | over2.5 50.15% / under2.5 49.85% |
| top scores | 1-0、2-0、1-1、2-1、3-0 |

### 风险旗标

- 葡萄牙胜方向有模型基础，但 63.85% 不能发布成强信心。模型自身置信度为 `medium_low`，且官方首发、Ruben Dias 状态、Ronaldo/Ramos/Leao/Conceicao 角色未确认。
- 战术包已给出葡萄牙宽度、控球、定位球和乌兹别克 Shomurodov/Fayzullaev 转换路线，但包内明确要求不要线性叠加，要 cap 与 player_state、attack_score、首轮进球/失球的重叠。
- 乌兹别克斯坦首轮复盘和 player_state 仍有 `partial` 来源缺口，不能把 1-3 直接转化为稳定防线崩盘。
- over2.5 接近五五开，top scores 偏低比分/窄胜；发布层必须保留 1-1 和低事件尾部。
- 市场字段为空，无法判断葡萄牙热门税、深让陷阱或赔率是否已过热。

### 推荐概率修正口径

- 葡萄牙胜：从 63.85% 下调 3-6 个百分点。
- 平局：上调 2-4 个百分点。
- 乌兹别克斯坦胜/尾部：上调 1-2 个百分点。
- 若 Ronaldo/Ramos/Leao/Conceicao 角色或 Ruben Dias 状态不利，葡萄牙 xG 再做 0.10-0.20 的下压敏感性测试。

## 哥伦比亚 vs 刚果金

verdict: `hold`

模型链摘要：

| 项目 | 数值 |
| --- | ---: |
| xG | 哥伦比亚 1.58 / 刚果金 1.08 |
| 1X2 | 哥伦比亚胜 48.93% / 平 25.10% / 刚果金胜 25.97% |
| 大小球 | over2.5 49.65% / under2.5 50.35% |
| top scores | 1-1、1-0、2-1、2-0、0-1 |

### 风险旗标

- 哥伦比亚只是第一方向，不是强热门。模型给哥伦比亚胜低于 50%，平+刚果金胜合计 51.07%，且 1-1 是单一最高比分。
- 战术包已确认哥伦比亚 Luis Diaz/James/边路/替补冲击优势，也确认刚果金 Wissa/Bakambu/定位球二点和 5-3-2 紧凑防守路线；但这些因子与 player_state、首轮进球和 attack_score 高度重叠，不能线性叠加。
- 哥伦比亚 3-1 首轮的第三球是 90+9，不能把补时扩大比分当成稳定压制能力。
- 刚果金首轮通过角球二次进攻逼平葡萄牙，定位球、身体对抗、二点球和转换是实质爆冷路径。
- 市场字段为空，无法检查哥伦比亚首轮 3-1 后的热门追涨或刚果金不败叙事是否被价格过度吸收。

### 推荐概率修正口径

- 哥伦比亚胜：从 48.93% 下调 3-5 个百分点。
- 平局：上调 2-3 个百分点。
- 刚果金胜/尾部：上调 1-3 个百分点。
- 若 James/Luis Diaz/Duran 角色或分钟受限，哥伦比亚 xG 下压 0.10-0.18；若 Wissa/Bakambu/Mbemba 关键角色完整，刚果金 xG 应保持接近或高于 1.0。

## 回派 Owner

- data：补 T-75m 官方首发、最终伤停/停赛/分钟限制、官方逐小时天气、官方中国竞彩和同源盘口。
- tactics：战术包已收口；若首发变化，需要基于实际 XI 更新关键对位。
- model：基于战术包 cap rule 做折扣敏感性复算，分离首轮表现、球员状态、战术优势、伤停和市场校准，避免重复计权。
- main：红队 `hold` 解除前，禁止“主推”“稳胆”“可小注”等投注化表达。
