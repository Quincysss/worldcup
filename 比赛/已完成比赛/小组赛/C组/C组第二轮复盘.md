phase: round_review_summary
group: C
round: 2
status: complete_current_stage
updated_at: 2026-06-20T00:45:00+08:00
owner: main-thread
sources:
  - Guardian Brazil 3-0 Haiti: https://www.theguardian.com/football/live/2026/jun/20/fifa-world-cup-2026-live-brazil-v-haiti-updates-bra-vs-hai-group-c-match-score-latest
  - AP via WSLS Brazil 3-0 Haiti: https://www.wsls.com/sports/2026/06/20/matheus-cunha-scores-2-goals-as-brazil-eliminates-haiti-from-world-cup-with-3-0-win/
  - Guardian Scotland 0-1 Morocco: https://www.theguardian.com/football/live/2026/jun/19/scotland-v-morocco-world-cup-2026-live
  - ESPN UK Scotland 0-1 Morocco: https://www.espn.co.uk/football/match/_/gameId/760445/morocco-scotland

# C 组第二轮复盘

## 结果

| 比赛 | 赛前预测 | 实际 | 预测复盘 |
| --- | --- | --- | --- |
| 巴西 vs 海地 | 巴西 2-0 海地 | 巴西 3-0 海地 | 胜负和零封命中，低估巴西上半场转化与 Cunha 终结 |
| 苏格兰 vs 摩洛哥 | 苏格兰 0-1 摩洛哥 | 苏格兰 0-1 摩洛哥 | 精准命中 |

## 第二轮后积分

| 球队 | 积分 | 净胜球 | 形势 |
| --- | ---: | ---: | --- |
| 巴西 | 4 | +3 | 净胜球优势明显，末轮争小组第一 |
| 摩洛哥 | 4 | +1 | 非常接近出线，末轮对海地仍有争第一动机 |
| 苏格兰 | 3 | 0 | 末轮对巴西压力大，仍可争出线/第三名比较 |
| 海地 | 0 | -4 | 已被淘汰或接近无实际出线路径 |

## 模型命中与偏差

命中项：
- 两场胜负方向全部命中。
- 苏格兰 vs 摩洛哥比分精准命中。
- C 组第二轮低比分主线基本成立：两场合计 4 球，且都没有双方进球。

偏差项：
- 巴西实际 3-0，高于重算主线 2-0。我们低估了 Cunha 在无 Neymar 场景下的终结价值。
- 巴西比赛过程仍不完全流畅，这说明不能只看比分就全面上调巴西进攻体系。
- 苏格兰平局路径虽然没有兑现，但过程证明 34% 平局权重不是虚高。

## 后续模型调整

| 参数 | 调整 | 原因 |
| --- | --- | --- |
| `brazil_first_half_conversion_after_stalemate` | 上调 | 巴西首轮不顺后第二轮上半场快速转化 |
| `matheus_cunha_box_finishing_signal` | 新增/上调 | Cunha 两球，成为无 Neymar 时的核心终结点 |
| `brazil_style_cohesion_discount` | 保留 | 3-0 但过程仍有慢、断、靠身后球的问题 |
| `brazil_second_half_game_management_drag` | 上调 | 领先后降速影响继续扩大净胜球 |
| `raphinha_availability_risk_weight` | 上调 | 上半场伤退增加末轮不确定性 |
| `morocco_early_strike_probability` | 上调 | Saibari 70 秒左右进球，开场惩罚能力明确 |
| `morocco_lead_protection_floor` | 上调 | 领先后守住低比分优势 |
| `scotland_second_half_response_bonus` | 上调 | 落后后没有崩，末段有真实压力 |
| `scotland_open_play_creation_quality` | 下调 | 有身体和传中，但持续高质量机会不足 |
| `haiti_attacking_penetration` | 下调 | 两轮零进球，面对强压时出球和终结不足 |

## 第三轮关注点

- 巴西 vs 苏格兰：巴西争小组第一，苏格兰争出线/第三名比较，动机都强。
- 摩洛哥 vs 海地：摩洛哥有机会争第一，但可能考虑轮换；海地更多是荣誉战。
- Neymar 是否复出、Raphinha 伤情、McTominay 角色、Saibari 状态，是第三轮模型最关键的四个个体变量。

## 文件索引

- `比赛\已完成比赛\小组赛\C组\2026-06-19_巴西_3-0_海地_复盘.md`
- `比赛\已完成比赛\小组赛\C组\2026-06-19_苏格兰_0-1_摩洛哥_复盘.md`
- `data\outputs\match_predictions\c-group-round2-postmortem.json`
- `data\outputs\model_adjustments\c-group-round2-model-adjustments.json`
