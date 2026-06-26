# A组第三轮预测修正 / 预测首发重算

- phase: match_prediction
- match: A组第三轮：捷克 vs 墨西哥；南非 vs 韩国
- status: partial_hold
- created_at: 2026-06-24T00:00:00+08:00
- updated_at: 2026-06-24T17:51:53+08:00
- owner: worldcup-data-modeler
- scope: 基于 predicted/estimated lineups 与赔率复核输入重算因子权重、xG、Poisson、1X2、大小球、赔率隐含概率、model_market_delta。

## source_log
- data/thread_outputs/a-group-round3-20260624/data-collector-lineup-odds-recheck.md: 已读；文件存在但仍为骨架，odds_snapshot/source_quality/lineup_data_status/conflicts 待填。
- data/thread_outputs/a-group-round3-20260624/tactics-predicted-lineups.md: 已读；文件存在但仍为骨架，predicted_lineup_status=estimated，具体 XI 待填。
- data/outputs/match_predictions/a-group-round3-quant-prediction-20260624.json: 已读；使用其中中国足彩网同源赔率、A组积分快照和上一版量化链作为本轮重算锚点。
- data/thread_outputs/a-group-round3-20260624/summary.md: 已读；用于核对上一版公开汇总方向。

## missing_fields
- pending_dependency: 预测首发文件未给出具体 XI、替补、阵型和球员级 xG 建议。
- pending_dependency: 赔率复核文件未填正式 odds_snapshot；本版沿用现有 JSON 中中国足彩网赔率锚点。
- official_t_minus_75_lineups: 未出，但不作为预测阻塞。
- final_discipline_confirmation: 黄牌/停赛/训练状态仍需确认。
- source_quality: 赔率页提示暂停销售，赔率只做市场概率锚点，不做投注建议。

## factor_weights
| factor | weight | note |
|---|---:|---|
| baseline_strength | 0.23 | 仍保留球队基本强弱，但第三轮不让强弱单独压倒动机/轮换。 |
| recent_attack_defense | 0.18 | 引入前两轮赛果和复盘参数。 |
| player_state_lineup_rotation | 0.20 | 因 predicted lineup 仅 estimated，权重上调并显式加入不确定性。 |
| tactical_matchup | 0.12 | 战术预测文件未填具体 XI，只做保守方向性调整。 |
| schedule_environment | 0.05 | 同组同时开球、节奏互相牵动。 |
| third_round_context | 0.14 | 出线动机、轮换、头名/第三名路径。 |
| market_calibration | 0.08 | 使用现有同源赔率去水概率；不把市场当事实。 |

## lineup_uncertainty_adjustment
- 不把 T-75 官方首发作为阻塞；但在具体 XI 未填前，不进行球员级大幅重算。
- 捷克 vs 墨西哥：墨西哥已出线和轮换风险仍压低热门侧，墨西哥 xG 从上一版 1.32 小降至 1.30；捷克因必须争胜和可能面对轮换防线，从 1.10 小升至 1.11。
- 南非 vs 韩国：韩国仍为基本面优势方，但 predicted XI 未填且第三轮控节奏风险存在，韩国 xG 从 1.45 小降至 1.43；南非维持 0.86。
- cap: 首发估计不确定性单队 xG 调整不超过 ±0.04；不与动机、市场热度、轮换重复计数。

## market_calibration
| match | market source | odds | de-vig implied | note |
|---|---|---|---|---|
| 捷克 vs 墨西哥 | 中国足彩网竞彩混合页，现有 JSON 锚点 | 3.63 / 3.50 / 1.76 | 24.39% / 25.30% / 50.31% | 页面提示暂停销售，只做概率锚点。 |
| 南非 vs 韩国 | 中国足彩网竞彩混合页，现有 JSON 锚点 | 5.55 / 3.78 / 1.46 | 15.95% / 23.42% / 60.63% | 页面提示暂停销售，只做概率锚点。 |

## recalculated_predictions
| match | xG | 1 | X | 2 | O2.5 | U2.5 | model_market_delta | top5 |
|---|---:|---:|---:|---:|---:|---:|---|---|
| 捷克 vs 墨西哥 | 1.11 - 1.30 | 31.69% | 27.44% | 40.87% | 43.29% | 56.71% | +7.30 / +2.14 / -9.44 pp | 1-1 12.96%, 0-1 11.68%, 1-0 9.97%, 0-0 8.98%, 1-2 8.42% |
| 南非 vs 韩国 | 0.86 - 1.43 | 22.61% | 26.97% | 50.41% | 40.13% | 59.87% | +6.66 / +3.55 / -10.22 pp | 0-1 14.48%, 1-1 12.45%, 0-2 10.35%, 0-0 10.13%, 1-2 8.90% |

## poisson_matrix_0_5_pct
### 捷克 vs 墨西哥
| CZE\MEX | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|---:|
| 0 | 8.98 | 11.68 | 7.59 | 3.29 | 1.07 | 0.28 |
| 1 | 9.97 | 12.96 | 8.42 | 3.65 | 1.19 | 0.31 |
| 2 | 5.53 | 7.19 | 4.68 | 2.03 | 0.66 | 0.17 |
| 3 | 2.05 | 2.66 | 1.73 | 0.75 | 0.24 | 0.06 |
| 4 | 0.57 | 0.74 | 0.48 | 0.21 | 0.07 | 0.02 |
| 5 | 0.13 | 0.16 | 0.11 | 0.05 | 0.02 | 0.00 |
- matrix_mass: 99.68%
- tail_probability: 0.32%

### 南非 vs 韩国
| RSA\KOR | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---:|---:|---:|---:|---:|---:|
| 0 | 10.13 | 14.48 | 10.35 | 4.94 | 1.76 | 0.50 |
| 1 | 8.71 | 12.45 | 8.90 | 4.24 | 1.52 | 0.43 |
| 2 | 3.74 | 5.36 | 3.83 | 1.83 | 0.65 | 0.19 |
| 3 | 1.07 | 1.54 | 1.10 | 0.52 | 0.19 | 0.05 |
| 4 | 0.23 | 0.33 | 0.24 | 0.11 | 0.04 | 0.01 |
| 5 | 0.04 | 0.06 | 0.04 | 0.02 | 0.01 | 0.00 |
- matrix_mass: 99.62%
- tail_probability: 0.38%

## key_conclusions_for_summary
- 两场仍是低到中低总进球结构，Under 2.5 分别为 56.71% 和 59.87%。
- 市场对墨西哥胜、韩国胜仍比模型更乐观；模型_market_delta 显示热门侧分别为 -9.44pp、-10.22pp。
- 预测首发尚未给具体 XI，因此本轮只做 estimated lineup uncertainty 小幅修正，不做球员级强烈改盘。
- 红队/投注状态仍应保持 hold 或 discussion_only；不可输出执行型投注建议。

## validation
- status: passed_for_markdown_recalc
- 1X2 probability sum: 100.00% for both matches.
- matrix_mass + tail: 100.00% for both matches.
- odds calibration: used de-vig implied probabilities from existing JSON; no new odds snapshot fabricated.
