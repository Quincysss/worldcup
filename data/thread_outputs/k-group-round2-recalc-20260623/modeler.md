# K组第二轮补充输入后复核重算 2026-06-23

- phase: match_prediction_recalc
- group: K
- status: partial_source_limited
- created_at: 2026-06-23T16:35:00+08:00
- updated_at: 2026-06-23T17:02:00+08:00
- owner: worldcup-data-modeler
- scope: K组第二轮补充输入后的模型复核重算建议；仅输出 xG、Poisson、1X2、大小球、Top scorelines 及相对上一版变化原因，不给投注建议
- missing_fields:
  - finalized_data_collector_recalc
  - finalized_tactics_recalc
  - T-75 official lineups
  - same-source live odds snapshot
- source_log:
  - data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json
  - data/outputs/player_state/portugal-player-state.json
  - data/outputs/player_state/uzbekistan-player-state.json
  - data/outputs/player_state/colombia-player-state.json
  - data/outputs/player_state/dr-congo-player-state.json
  - 比赛/已完成比赛/小组赛/K组/2026-06-17_葡萄牙_1-1_刚果金_复盘.md
  - 比赛/已完成比赛/小组赛/K组/2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md
  - data/thread_outputs/k-group-round2-recalc-20260623/data-collector.md
  - data/thread_outputs/k-group-round2-recalc-20260623/tactics-coach.md
- notes:
  - 本次为补充输入后的复核建议稿，不覆盖正式预测 JSON。
  - `data-collector.md` 与 `tactics-coach.md` 当前仍是 in_progress/skeleton 级输入，因此只做温和重算，不做大漂移。

## 上游状态判定

- `data/thread_outputs/k-group-round2-recalc-20260623/data-collector.md`: in_progress，仍是骨架级，缺最终首发/晚间伤停/赔率补录。
- `data/thread_outputs/k-group-round2-recalc-20260623/tactics-coach.md`: in_progress，仍是骨架级，未给新增战术结论。
- 四队 player-state:
  - 葡萄牙：`updated`
  - 乌兹别克斯坦：`partial`
  - 哥伦比亚：`updated`
  - 刚果金：`updated`

## 复核原则

- 以上一版 `k-group-round2-quant-prediction-20260623.json` 为基线。
- 若补充输入未形成新的硬伤停或明确战术反转，只允许小幅修正，不推翻主框架。
- 重点吸收的新增约束：
  - 葡萄牙：鲁本·迪亚斯 `conflicting/high minutes risk`，C罗 `medium minutes risk`
  - 乌兹别克斯坦：法伊祖拉耶夫、肖穆罗多夫路径继续成立，但 team player-state 仍 `partial`
  - 哥伦比亚：核心进攻/边路主将状态稳定，无新增强烈利好
  - 刚果金：首轮对葡萄牙的反击与防守韧性继续应保留，不应被上一轮比分样本压掉

## 比赛一：葡萄牙 vs 乌兹别克斯坦

### 建议值

| 项目 | 上一版 | 复核建议 | 变化 |
| --- | --- | --- | --- |
| xG | 1.92 - 0.72 | 1.90 - 0.74 | 主队 -0.02，客队 +0.02 |
| 1X2 | 0.6580 / 0.2098 / 0.1321 | 0.6487 / 0.2130 / 0.1383 | 主胜降温，平/客小升 |
| 大 2.5 | 0.4916 | 0.4916 | 基本持平 |
| 小 2.5 | 0.5084 | 0.5084 | 基本持平 |
| 大 3.5 | 0.2727 | 0.2727 | 基本持平 |
| 小 3.5 | 0.7273 | 0.7273 | 基本持平 |

### Poisson 摘要

- 0-5 矩阵尾部：0.0133
- Top scorelines:
  - 1-0 `0.1356`
  - 2-0 `0.1288`
  - 1-1 `0.1003`
  - 2-1 `0.0953`
  - 3-0 `0.0816`

### 变化原因

- 葡萄牙侧没有拿到新的正向可用性增量，鲁本·迪亚斯仍是冲突可用性，高分钟风险不支持把防守端再往上抬。
- C罗首轮打满 90 分钟但状态分未上扬，葡萄牙进攻上限不宜因名气继续外推。
- 乌兹别克斯坦的法伊祖拉耶夫、肖穆罗多夫反击路径被首轮复盘和 player-state 再次确认，因此客队尾部略抬。
- 但乌兹别克斯坦整体 player-state 仍 `partial`，所以只做 `+0.02` 级别微调，不做大幅升客队。

## 比赛二：哥伦比亚 vs 刚果金

### 建议值

| 项目 | 上一版 | 复核建议 | 变化 |
| --- | --- | --- | --- |
| xG | 1.58 - 1.02 | 1.56 - 1.02 | 主队 -0.02，客队不变 |
| 1X2 | 0.5036 / 0.2518 / 0.2447 | 0.4985 / 0.2537 / 0.2478 | 主胜轻降，平/客微升 |
| 大 2.5 | 0.4816 | 0.4765 | 小降 |
| 小 2.5 | 0.5184 | 0.5235 | 小升 |
| 大 3.5 | 0.2640 | 0.2597 | 小降 |
| 小 3.5 | 0.7360 | 0.7403 | 小升 |

### Poisson 摘要

- 0-5 矩阵尾部：0.0060
- Top scorelines:
  - 1-1 `0.1206`
  - 1-0 `0.1182`
  - 2-1 `0.0940`
  - 2-0 `0.0922`
  - 0-1 `0.0773`

### 变化原因

- 哥伦比亚 player-state 虽稳定，但补充输入没有提供新的首发确认或明显增益，不足以继续强化主胜端。
- 刚果金首轮对葡萄牙的身体对抗、反击和禁区防守表现已被 player-state 与复盘再次确认，平局与客队尾部应继续保留。
- 因此本场更适合做“主队轻微降温、总进球略向小分回摆”的复核，而不是改写基本方向。

## 结论

- 本轮补充输入后，两个对阵都不支持大幅改模，建议采取 **维持主框架 + 轻微降温热门侧** 的复核处理。
- 推荐作为主线程后续采用的复核建议值：
  - 葡萄牙 vs 乌兹别克斯坦：`xG 1.90 - 0.74`，`1X2 0.6487 / 0.2130 / 0.1383`
  - 哥伦比亚 vs 刚果金：`xG 1.56 - 1.02`，`1X2 0.4985 / 0.2537 / 0.2478`
- 由于上游补充线程仍未完结，本文件应按 `partial_source_limited` 使用。

## 体彩赔率校准重算 2026-06-23

### 校准原则

- 体彩赔率是 `market_signal`，不是结果真值，不直接覆盖模型底层强弱关系。
- 本次只做 `discussion_only/hold` 级别校准，不生成投注表达。
- 与主线程 JSON 兼容的字段口径：
  - `odds_implied_probability`
  - `market_adjustment`
  - `final_probabilities`
  - `expected_goals`
  - `top_scorelines`

### 比赛一：葡萄牙 vs 乌兹别克斯坦

- 体彩事实：
  - 周二045
  - 普通胜平负未开售
  - 让球胜平负 `-2`: `1.98 / 4.05 / 2.65`
  - 归一化隐含概率约：`44.72% / 21.86% / 33.41%`
- 校准解读：
  - 普通 SPF 未开，说明可直接用于 1X2 锚定的市场信息不足。
  - `-2` 盘面没有把葡萄牙大胜打成极强共识，模型应继续保留“赢球但未必穿深盘”的谨慎表达。
- 建议兼容字段：
  - `odds_implied_probability`:
    - `sporttery_spf`: `null`
    - `sporttery_handicap_minus_2_normalized`: `0.4472 / 0.2186 / 0.3341`
  - `market_adjustment`:
    - `home_win`: `-0.0032`
    - `draw`: `+0.0014`
    - `away_win`: `+0.0018`
    - `reason`: `普通SPF未开售，仅据-2让球盘对大胜预期做降温，不改葡萄牙胜方向`
  - `expected_goals`: `1.92 - 0.72`
  - `final_probabilities`: `0.655 / 0.212 / 0.133`
  - `top_scorelines`:
    - `1-0`
    - `2-0`
    - `1-1` 风险保留但不前置为主建议

### 比赛二：哥伦比亚 vs 民主刚果

- 体彩事实：
  - 周二048
  - 普通胜平负：`1.35 / 3.90 / 7.60`
  - 归一化隐含概率约：`65.63% / 22.72% / 11.66%`
  - 让球胜平负 `-1`: `2.22 / 3.35 / 2.63`
  - 归一化隐含概率约：`39.89% / 26.44% / 33.67%`
- 校准解读：
  - 普通 SPF 明确支持哥伦比亚取胜。
  - 但 `-1` 盘面对哥伦比亚赢两球以上并不激进，说明市场对其赢球方式仍偏谨慎。
  - 因此应把主胜抬到高于纯 Poisson 版本，但不能抬到普通 SPF 的 65% 附近。
- 建议兼容字段：
  - `odds_implied_probability`:
    - `sporttery_spf_normalized`: `0.6563 / 0.2272 / 0.1166`
    - `sporttery_handicap_minus_1_normalized`: `0.3989 / 0.2644 / 0.3367`
  - `market_adjustment`:
    - `home_win`: `+0.0715`
    - `draw`: `-0.0187`
    - `away_win`: `-0.0528`
    - `reason`: `普通SPF支持哥伦比亚胜，但-1让球盘抑制大胜预期，故只上修主胜、不把比分尾部推向大胜`
  - `expected_goals`: `1.72 - 0.94`
  - `final_probabilities`: `0.570 / 0.235 / 0.195`
  - `top_scorelines`:
    - `1-0`
    - `2-1`
    - `1-1` 风险必须保留

### 校准后结论

- 葡萄牙 vs 乌兹别克斯坦：
  - 保持葡萄牙胜方向
  - `final_probabilities` 建议为 `65.5% / 21.2% / 13.3%`
  - `xG` 回到 `1.92 - 0.72`
  - 比分表达以 `1-0 / 2-0` 为主
- 哥伦比亚 vs 民主刚果：
  - 主胜概率高于纯 Poisson 版，但仍保持 `discussion_only`
  - `final_probabilities` 建议为 `57.0% / 23.5% / 19.5%`
  - `xG` 调整为 `1.72 - 0.94`
  - 比分表达以 `1-0 / 2-1` 为主，并保留 `1-1` 风险

<!-- cp-jc-odds-20260623:start -->
## 体彩赔率校准重算 2026-06-23
- 葡萄牙：普通SPF未开售，xG 1.92-0.72，最终胜/平/负 65.5%/21.2%/13.3%，比分 1-0/2-0。
- 哥伦比亚：普通SPF去水位 65.63%/22.72%/11.66%，但-1让球去水位仅 39.89%/26.44%/33.67%；最终胜/平/负 57.0%/23.5%/19.5%，比分 1-0/2-1。
- 赔率只作为校准信号，不作为真值替代战术与球员状态。
<!-- cp-jc-odds-20260623:end -->
