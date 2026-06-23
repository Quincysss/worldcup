# L组第二轮补充输入后模型重算 2026-06-23

- phase: match_prediction_recalc
- group: L
- status: partial_source_limited
- created_at: 2026-06-23T17:10:00+08:00
- updated_at: 2026-06-23T17:24:00+08:00
- owner: worldcup-data-modeler
- scope: L组第二轮英格兰 vs 加纳、巴拿马 vs 克罗地亚模型重算；仅输出 factor_weights、xG、Poisson 0-5、1X2、大小2.5、top scorelines、市场校准与最终概率建议，不给正式购彩单
- missing_fields:
  - data/thread_outputs/l-group-round2-recalc-20260623/data-collector.md 仍为 skeleton_created，缺少正式数据刷新结论
  - data/thread_outputs/l-group-round2-recalc-20260623/tactics-coach.md 仍为 skeleton_created，缺少正式战术修正结论
  - 英格兰 vs 加纳普通胜平负未开售，缺少同源 1X2 直接市场锚
  - 两场同源大小球盘口缺失
  - T-75 官方首发、最终伤停、临场天气与门将确认缺失
- source_log:
  - data/thread_outputs/l-group-round2-recalc-20260623/data-collector.md
  - data/thread_outputs/l-group-round2-recalc-20260623/tactics-coach.md
  - data/outputs/match_predictions/l-group-round2-quant-prediction-20260622.json
  - data/outputs/player_state/england-player-state.json
  - data/outputs/player_state/ghana-player-state.json
  - data/outputs/player_state/panama-player-state.json
  - data/outputs/player_state/croatia-player-state.json
  - 中国足彩网竞彩混合页快照事实（systemTime 2026-06-23 16:53:21，页面含暂停销售提示）
- notes:
  - Skeleton created first per anti-disconnect workflow.
  - 本版为 discussion_only / hold_for_betting；赔率只作风险校准，不作为真值覆盖模型。
  - 因上游刷新线程仍未完成，市场校准采用温和 blend，不做大幅参数漂移。

## 输入状态

- data_collector_recalc_status: skeleton_created
- tactics_recalc_status: skeleton_created
- old_prediction_json_status: loaded
- player_state_status:
  - England: complete / updated
  - Ghana: completed_core_partial_match_detail / updated
  - Panama: complete_current_stage / updated
  - Croatia: complete_current_stage / updated
- betting_gate: discussion_only
- execution_gate: hold_for_betting

## 因子权重

```yaml
factor_weights:
  base_strength: 0.28
  recent_round1_form: 0.22
  attack_defense_structure: 0.20
  player_availability: 0.10
  tactical_matchup: 0.12
  schedule_environment: 0.03
  market_calibration: 0.05
```

市场校准执行说明：
- 英格兰 vs 加纳：普通 SPF 未开售，仅可读取让球 `-2`，因此 `market_calibration` 只作为大胜尾部风险提示，不直接把 1X2 拉向深盘。
- 巴拿马 vs 克罗地亚：普通 SPF 与 `+1` 让球均可用，允许做轻度双锚校准，但仍保留 Panama 低事件拖平尾部。

## 英格兰 vs 加纳

### 关键增量输入

- 旧版基线：xG `2.05 - 0.86`，1X2 `64.98 / 20.21 / 14.80`
- England player_state：
  - Kane 2 球，form 高位，进攻主引擎不下修
  - Rice、Rashford、Saka 均带轻度可用性复核标记，压住了进一步上调空间
- Ghana player_state：
  - Ati-Zigi 状态 `uncertain/doubtful`，门将不确定性保留
  - Partey 记录仍带上下文不确定项，不直接给大幅个人加成

### 赔率校准事实

- 中国足彩网让球胜平负 `英格兰 -2`：`2.20 / 3.80 / 2.43`
- 去水归一化：`40.25% / 23.30% / 36.44%`
- 解读：市场对英格兰赢球方向并不弱，但没有普通 SPF 时，深盘更多反映“大胜是否穿盘”，不宜直接当作 1X2 真值。

### 重算建议

- pre_market_xg: `2.02 - 0.82`
- market_adjustment: `limited_tail_reweight_only`
- final_xg: `2.02 - 0.82`

```yaml
poisson_0_5:
  "0-0": 0.0584
  "0-1": 0.0479
  "0-2": 0.0196
  "0-3": 0.0054
  "0-4": 0.0011
  "0-5": 0.0002
  "1-0": 0.1180
  "1-1": 0.0968
  "1-2": 0.0397
  "1-3": 0.0108
  "1-4": 0.0022
  "1-5": 0.0004
  "2-0": 0.1192
  "2-1": 0.0977
  "2-2": 0.0401
  "2-3": 0.0110
  "2-4": 0.0022
  "2-5": 0.0004
  "3-0": 0.0803
  "3-1": 0.0658
  "3-2": 0.0270
  "3-3": 0.0074
  "3-4": 0.0015
  "3-5": 0.0002
  "4-0": 0.0405
  "4-1": 0.0332
  "4-2": 0.0136
  "4-3": 0.0037
  "4-4": 0.0008
  "4-5": 0.0001
  "5-0": 0.0164
  "5-1": 0.0134
  "5-2": 0.0055
  "5-3": 0.0015
  "5-4": 0.0003
  "5-5": 0.0001
  tail_probability: 0.0175
```

```yaml
raw_probabilities:
  home_win: 0.6536
  draw: 0.2035
  away_win: 0.1430
  over_2_5: 0.5400
  under_2_5: 0.4600
```

```yaml
top_scorelines:
  - score: "2-0"
    probability: 0.1192
  - score: "1-0"
    probability: 0.1180
  - score: "2-1"
    probability: 0.0977
  - score: "1-1"
    probability: 0.0968
  - score: "3-0"
    probability: 0.0803
```

```yaml
market_calibration:
  source: "中国足彩网竞彩混合页"
  captured_at: "2026-06-23 16:53:21"
  sale_status_note: "页面含暂停销售提示"
  usability: "partial_only"
  discussion_tag: "discussion_only"
  betting_tag: "hold_for_betting"
  adjustment_note: "仅用让球-2约束大胜尾部，不直接重写 1X2 主方向。"
```

```yaml
final_probability_suggestion:
  home_win: 0.6536
  draw: 0.2035
  away_win: 0.1430
  lean_note: "保留英格兰胜方向，但不把深盘理解为可无条件放大大胜信心。"
```

## 巴拿马 vs 克罗地亚

### 关键增量输入

- 旧版基线：xG `0.72 - 1.43`，1X2 `18.83 / 27.11 / 54.07`
- Panama player_state：
  - 后场与门将使用稳定，但进攻端没有明确高 form 爆点
  - 低位、防守、拖节奏脚本仍成立
- Croatia player_state：
  - Livakovic、Perisic、Baturina、Petar Sucic 信号偏正
  - 老将负荷与比赛后段管理风险仍保留，不支持把客胜硬抬到极高位

### 赔率校准事实

- 普通 SPF：`6.90 / 4.20 / 1.34`
- SPF 去水归一化：`12.83% / 21.08% / 66.08%`
- 让球胜平负 `巴拿马 +1`：`2.65 / 3.60 / 2.11`
- `+1` 去水归一化：`33.42% / 24.60% / 41.98%`
- 解读：普通 SPF 明显支持克罗地亚取胜，但 `+1` 没有给出“轻松穿盘”的强共识，因此应上调客胜、同时保留 `0-1 / 1-1 / 0-0` 这些低事件尾部。

### 重算建议

- pre_market_xg: `0.65 - 1.65`
- market_adjustment: `soft_blend_spf_and_plus1`
- final_xg: `0.65 - 1.65`

```yaml
poisson_0_5:
  "0-0": 0.1003
  "0-1": 0.1654
  "0-2": 0.1365
  "0-3": 0.0751
  "0-4": 0.0310
  "0-5": 0.0102
  "1-0": 0.0652
  "1-1": 0.1075
  "1-2": 0.0887
  "1-3": 0.0488
  "1-4": 0.0201
  "1-5": 0.0066
  "2-0": 0.0212
  "2-1": 0.0349
  "2-2": 0.0288
  "2-3": 0.0159
  "2-4": 0.0065
  "2-5": 0.0022
  "3-0": 0.0046
  "3-1": 0.0076
  "3-2": 0.0062
  "3-3": 0.0034
  "3-4": 0.0014
  "3-5": 0.0005
  "4-0": 0.0007
  "4-1": 0.0012
  "4-2": 0.0010
  "4-3": 0.0006
  "4-4": 0.0002
  "4-5": 0.0001
  "5-0": 0.0001
  "5-1": 0.0002
  "5-2": 0.0001
  "5-3": 0.0001
  "5-4": 0.0000
  "5-5": 0.0000
  tail_probability: 0.0070
```

```yaml
raw_probabilities:
  home_win: 0.1438
  draw: 0.2403
  away_win: 0.6159
  over_2_5: 0.4040
  under_2_5: 0.5960
```

```yaml
top_scorelines:
  - score: "0-1"
    probability: 0.1654
  - score: "0-2"
    probability: 0.1365
  - score: "1-1"
    probability: 0.1075
  - score: "0-0"
    probability: 0.1003
  - score: "1-2"
    probability: 0.0887
```

```yaml
market_calibration:
  source: "中国足彩网竞彩混合页"
  captured_at: "2026-06-23 16:53:21"
  sale_status_note: "页面含暂停销售提示"
  usability: "usable_but_not_final"
  discussion_tag: "discussion_only"
  betting_tag: "hold_for_betting"
  adjustment_note: "普通 SPF 推高克罗地亚胜率，+1 让球盘抑制过度大胜表达，最终取中。"
```

```yaml
final_probability_suggestion:
  home_win: 0.1480
  draw: 0.2380
  away_win: 0.6140
  lean_note: "较旧版上调克罗地亚胜方向，但继续保留巴拿马低事件拖平尾部。"
```

## 汇总结论

- England vs Ghana：
  - 建议 xG：`2.02 - 0.82`
  - 建议 1X2：`65.36 / 20.35 / 14.30`
  - 建议大小 2.5：`54.00 / 46.00`
- Panama vs Croatia：
  - 建议 xG：`0.65 - 1.65`
  - 建议 1X2：`14.80 / 23.80 / 61.40`
  - 建议大小 2.5：`40.40 / 59.60`

## 风险与待补

- 英格兰场没有普通 SPF，只能把 `-2` 深盘当作边界提醒，不能当主市场真值。
- 两个上游线程仍是骨架，所以战术修正与数据刷新未获得最终文本确认。
- Ghana 门将确认、England 三名轻度可用性复核、Croatia 老将轮换与 Panama 临场低位深度，都会明显影响比分尾部。
- 当前结论仅供模型讨论，标签固定为 `discussion_only / hold_for_betting`。

<!-- l-group-round2-cp-jc-20260623:start -->
## L组第二轮体彩赔率校准重算 2026-06-23
| 比赛 | 方向 | 胜/平/负 | xG | 主比分 | 竞彩赔率状态 |
|---|---|---:|---|---|---|
| 英格兰 vs 加纳 | 英格兰胜倾向 | 64.0% / 22.0% / 14.0% | 1.90-0.74 | 1-0 / 2-0 | 周二046：普通SPF未开售；让球-2为2.20/3.80/2.43 |
| 巴拿马 vs 克罗地亚 | 克罗地亚胜倾向 | 15.5% / 24.5% / 60.0% | 0.76-1.72 | 0-1 / 0-2 | 周二047：SPF 6.90/4.20/1.34；让球+1为2.65/3.60/2.11 |

## 校准说明
- 英格兰场普通SPF未开售，最终胜/平/负 64.0%/22.0%/14.0%，xG 1.90-0.74。
- 克罗地亚场普通SPF去水位约 12.83%/21.08%/66.09%，模型因+1让球和Croatia后程风险降温到 15.5%/24.5%/60.0%，xG 0.76-1.72。
- 赔率是校准层，不是单独真值层。
<!-- l-group-round2-cp-jc-20260623:end -->

<!-- POISSON-SUMMARY:START -->
## 泊松分布模型摘要
| 比赛 | xG | 泊松原始胜/平/负 | 校准后胜/平/负 | Top 3 比分 |
|---|---:|---:|---:|---|
| 英格兰 vs 加纳 | 1.90-0.74 | 64.87% / 21.30% / 13.83% | 64.00% / 22.00% / 14.00% | 1-0 13.56%；2-0 12.88%；1-1 10.03% |
| 巴拿马 vs 克罗地亚 | 0.76-1.72 | 16.21% / 23.46% / 60.32% | 15.50% / 24.50% / 60.00% | 0-1 14.40%；0-2 12.39%；1-1 10.95% |

说明：泊松层负责由 xG 生成比分分布；竞彩赔率只作为后续校准层，红队门控负责投注冻结，不替代泊松基线。
<!-- POISSON-SUMMARY:END -->
