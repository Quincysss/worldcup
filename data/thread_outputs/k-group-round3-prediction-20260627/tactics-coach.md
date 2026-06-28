---
phase: group_round3_tactics
group: K
status: partial
created_at: 2026-06-27T00:00:00+08:00
updated_at: 2026-06-27T00:00:00+08:00
owner: worldcup-tactics-coach
scope: K组第三轮两场战术对位与模型可用因子，不含比分预测、胜平负概率或投注建议
---

# K组第三轮战术教练包

## 输入与缺口

已读取项目文档、`worldcup-tactics-coach` 与 `worldcup-quant-prediction-system` skill，并基于 K 组前两轮复盘、四队战术包、roster/player_state 与成员表方向做战术因子整理。

主要缺口：

- T-75 官方首发不可得，轮换、分钟管理和累计牌面仍需临场确认。
- 第三轮官方伤停、训练状态和最终停赛未闭环。
- 同步开球的实时比分触发只能做情景因子，不能赛前固化为单一路径。

## 小组语境

- 哥伦比亚与葡萄牙同积 4 分，第三轮是直接头名战。两队都有争第一动力，但出线主动较强，不能把动机机械翻译成全场高压。
- 刚果金 1 分、乌兹别克斯坦 0 分，均没有舒服的平局价值。更合理的模型路径是前段谨慎、后段随比分和横向第三名形势抬高风险。

## 哥伦比亚 vs 葡萄牙

### 战术主线

哥伦比亚最清晰的破局点是左路 Luis Diaz 吸包夹、Daniel Munoz 弱侧前插，以及 Quintero/Cordoba 在后段把传球改得更直接。第二轮对刚果金的 1-0 说明这条路径不是偶发，但也提醒模型：20射9正只进1球，强势普通胜不等于稳定穿透。

葡萄牙的上行信号更强。5-0 乌兹别克斯坦不是单纯 C罗双响，而是 Cancelo/Nuno Mendes 宽度、Bruno 二次组织、定位球设计和 Leao/Semedo 后段提速共同兑现。问题在于对手换成哥伦比亚后，不能把乌兹别克斯坦门将-中卫事故直接外推成同样大胜。

### 对位风险

- 哥伦比亚右后卫 Munoz 前插能攻击葡萄牙弱侧，但会暴露身后给 Leao/Neto/Cancelo 的转换。
- 葡萄牙定位球质量高，哥伦比亚需要避免禁区前犯规和角球二次落点失控。
- 哥伦比亚若用 James 控节奏，比赛更可能低速；若后段上 Quintero/Cordoba，直塞和9号位牵制会提升，但防转守风险也上升。
- 葡萄牙若强首发，宽度和中场抗压有优势；若轮换 Ronaldo/Bruno/Nuno/Cancelo 任一关键环节，压迫与定位球执行稳定性要下修。

### 核心因子摘要

| 球队 | 关键正因子 | 关键负因子 | 模型限幅 |
| --- | --- | --- | --- |
| 哥伦比亚 | Munoz弱侧前插、Diaz转换、Quintero/Cordoba后段破低位 | 边后卫身后、James分钟管理、中路控制不占优 | Diaz状态、Munoz前插和transition attack高度共线 |
| 葡萄牙 | 宽度、Bruno二次组织、定位球、Leao后段提速 | 边后卫身后、首轮领先后未杀死比赛、轮换风险 | 二轮5-0不可直接外推，需封顶大胜尾部 |

## 刚果金 vs 乌兹别克斯坦

### 战术主线

刚果金前两轮证明了五后卫低位、姆帕西门线状态和 Wissa/Bakambu 直接路线能拖住强队。问题也同样清楚：对哥伦比亚只有 7 射2正，前场第一落点和中场连续向前不足。末轮必须争胜会迫使它在后段加速度点和禁区人数，但那会把原本的防守密度拆开。

乌兹别克斯坦的问题更剧烈。首轮还能靠 Fayzullaev 与 Shomurodov 的连接扳平哥伦比亚，但二轮 0-5 暴露了边中协防、危险区域犯规、门将-中卫处理和先丢球后的崩盘尾部。它仍有 Fayzullaev 单点创造和 Shomurodov 支点，但稳定推进与防线抗压必须降权。

### 对位风险

- 刚果金可以用低位和高点把比赛拖入低事件，但平局价值有限，后30分钟会更容易打开。
- 乌兹别克斯坦若先守，能降低早段风险；若先丢球或另一场信息不利，边翼卫和中场前压会放大防转换问题。
- 刚果金定位球和二点球优于其阵地控球质量，是最现实的破局窗口。
- 乌兹别克斯坦定位球进攻可保留，但定位球防守与禁区前犯规是负面项。

### 核心因子摘要

| 球队 | 关键正因子 | 关键负因子 | 模型限幅 |
| --- | --- | --- | --- |
| 刚果金 | 姆帕西状态、五后卫低位、Wissa/Bakambu反击、定位球二点 | 阵地推进弱、必须赢后结构打开、前场供给不足 | 门将高光不能整体上调防线强度 |
| 乌兹别克斯坦 | Fayzullaev单点创造、Shomurodov支点、半场调整能力 | 出球抗压差、门将中卫链条下调、先丢球崩盘 | 二轮0-5不要三重惩罚，防线/轮换/player_state需合并限幅 |

## 模型字段建议

本轮 JSON 已对每队写入以下 15 个字段：`pressing_adjustment`、`build_up_resistance_adjustment`、`transition_attack_adjustment`、`transition_defense_risk`、`wide_channel_advantage`、`central_control_advantage`、`set_piece_advantage`、`defensive_line_risk`、`coach_substitution_risk`、`game_state_tendency`、`third_round_motivation_tactical_shift`、`rotation_shape_risk`、`draw_management_tendency`、`goal_difference_chase_risk`、`late_game_information_risk`。

额外建议模型线程关注：

- `favorite_transition_ceiling`：葡萄牙若面对哥伦比亚后段压上，可打开强队转换尾部，但需低于对乌兹别克斯坦二轮。
- `opponent_must_win_exposure`：刚果金、乌兹别克斯坦后30分钟风险上修。
- `first_goal_collapse_risk`：乌兹别克斯坦高，刚果金中等。
- `third_round_scoreboard_pressure`：刚果金 vs 乌兹别克斯坦高于哥伦比亚 vs 葡萄牙。
- `recognized_score_cluster_coverage`：后续若转给预测/投注线程，必须把战术识别到的低事件、后段开放和定位球尾部完整映射，避免只保留单一路径。

## 双重计权警示

- 葡萄牙：边路优势、C罗状态、Bruno状态、定位球和二轮5-0高度相关，应合成为限幅战术上修。
- 哥伦比亚：Diaz、Munoz、Quintero/Cordoba都指向同一套弱侧/直塞破局链，不能分别满额加到总攻击。
- 刚果金：姆帕西高扑救是门将状态，不是整体防线强度全面升级。
- 乌兹别克斯坦：0-5影响防线、心理和轮换，但不要在 player_state、defensive_line_risk、rotation_shape_risk 中三次重罚。
