---
phase: group_round3_v3_tactics
group: L
status: partial_source_limited
created_at: 2026-06-27T00:00:00+08:00
updated_at: 2026-06-27T00:00:00+08:00
owner: worldcup-tactics-coach
scope: L组第三轮v3预测战术因子包；不含比分、胜平负概率或投注建议
---

# L组第三轮 v3 战术线程输出

## 读取与缺口

已读取项目规范、`worldcup-tactics-coach`、`worldcup-quant-prediction-system`、`data/templates/match-prediction-standard-template-v3.md`、现有 L 组第三轮预测 Markdown/JSON、L 组前两轮复盘、四队 tactics packet 与 player_state。

未发现本地 `l-group-round3-v3` 数据采集包，当前产物状态为 `partial_source_limited`。T-75 官方首发、最终伤停/停赛、累计黄牌、核心球员分钟限制、加纳门将选择、英格兰与克罗地亚老将/核心轮换仍需临场刷新。

## v3 固定口径

后续 L 组第三轮预测文档必须在因子评分前写入：

- 预计首发状态：`probable_not_official`
- 预计阵型与阵型替代方案
- 11名预计首发、角色说明、轮换候选和触发条件
- 首发变化对 xG、节奏、定位球、转换和对位因子的影响
- T-75 官方首发后必须重跑的条件

## 克罗地亚 vs 加纳

### 预计首发战术影响

克罗地亚预计 `4-3-3`，备选 `4-2-3-1 / 3-4-2-1`。核心角色是 Modric/Kovacic 控节奏和抗压、Baturina 肋部连接、Stanisic/Perisic 提供宽度、Budimir 作为禁区支点、Kramaric 提供前场串联。Budimir 首发会提高传中和定位球价值；Gvardiol 若缺席或只替补，左侧出球和防转换要下修。

加纳预计 `4-2-3-1`，备选 `4-4-1-1 / 5-4-1`。核心角色是 Adjetey/Opoku/Partey 保护中路，Semenyo/Ayew/Inaki 提供转换和身体牵制。Asare 与 Ati-Zigi 的门将选择是硬变量；若加纳改 `5-4-1`，节奏更低、守平管理更强，但阵地推进进一步下降。

### 比赛状态

克罗地亚更需要主动拿结果，但其教练底色仍是控节奏、减少来回冲刺；加纳积分位置更适合低位纪律、守平管理和转换偷袭。前60分钟更像中场控制对低位防守，60分钟后会被另一场同步信息明显改变。

### 模型应编码

- 克罗地亚：`build_up_resistance_adjustment`、`central_control_advantage`、`third_round_motivation_tactical_shift` 为正；`transition_defense_risk` 和 `defensive_line_risk` 需保留尾部。
- 加纳：`draw_management_tendency`、`defensive_line_risk`、`transition_attack_adjustment` 为核心；`central_control_advantage` 为负但不应等同防守崩盘。
- 关键限幅：Modric/Kovacic 控制、build-up 与 central control 共线；Adjetey/Opoku/Partey 防守评分、低位纪律和守平管理共线。

### T-75 重跑条件

- 加纳门将在 Asare / Ati-Zigi 间切换，门线、出击和传中处理重跑。
- Gvardiol 缺席或克罗地亚改三中卫，左侧出球、宽度和防转换重跑。
- Budimir 不首发，克罗地亚禁区支点、定位球高点和传中转化下修。
- 加纳改 `5-4-1`，低事件地板上修，阵地推进和中路出球下修。

## 巴拿马 vs 英格兰

### 预计首发战术影响

巴拿马预计 `5-4-1`，备选 `4-4-2 / 3-4-2-1`。核心角色是 Mosquera 承压、Murillo 作为主要推进点、Cordoba/Ramos/Andrade 保护禁区、Barcenas/Diaz 作为边路出口、Fajardo 或 Waterman 承担支点。Carrasquilla 若确认首发，巴拿马中路推进、定位球和控节奏能力必须上修。

英格兰预计 `4-2-3-1`，备选 `4-3-3 / 3-4-2-1`。核心角色是 Rice 攻转守支点、Bellingham 十号位前插、Saka 右路一对一、Rashford/Gordon 左路纵深、Kane 回撤和禁区终结。英格兰最大变量不是实力，而是 Tuchel 是否管理 Kane、Bellingham、Saka、Rice 或后防核心分钟。

### 比赛状态

巴拿马更可能先低位切碎比赛，后段若第三名路径或荣誉战需要才提高直接性。英格兰有主动权和板凳优势，但第二轮已证明控球并不自动等于稳定破低位；若另一场信息有利，后段可能降低风险而不是继续提速。

### 模型应编码

- 巴拿马：`pressing_adjustment`、`build_up_resistance_adjustment`、`central_control_advantage` 为负；`late_game_information_risk`、`goal_difference_chase_risk` 为后段触发。
- 英格兰：`wide_channel_advantage`、`central_control_advantage`、`coach_substitution_risk` 为正；`rotation_shape_risk` 与 `draw_management_tendency` 需同时保留。
- 关键限幅：英格兰边路优势、Saka/Rashford/Kane 状态和攻击评分重复；巴拿马低位韧性和防守评分重复。

### T-75 重跑条件

- 英格兰在 Kane、Bellingham、Saka、Rice 中轮换两人以上，进攻、节奏、中场控制与定位球重跑。
- Reece James 不可用或被管理，英格兰右路宽度、传中和攻转守风险重跑。
- Carrasquilla 首发，巴拿马 build-up、central progression 与定位球重跑。
- 巴拿马改 `4-4-2`，低位地板下修，转换防守风险上修。

## 因子完整性

四队均已在 JSON 中写入 15 个战术因子：

`pressing_adjustment`、`build_up_resistance_adjustment`、`transition_attack_adjustment`、`transition_defense_risk`、`wide_channel_advantage`、`central_control_advantage`、`set_piece_advantage`、`defensive_line_risk`、`coach_substitution_risk`、`game_state_tendency`、`third_round_motivation_tactical_shift`、`rotation_shape_risk`、`draw_management_tendency`、`goal_difference_chase_risk`、`late_game_information_risk`。

## 双重计权警示

- 克罗地亚：Modric/Kovacic 控制、build-up resistance、central control 和 player_state 不可多次满额叠加。
- 加纳：Adjetey/Opoku/Partey 防守、低位纪律、draw floor 与 defensive-line risk 需合并限幅。
- 英格兰：wide channel、Saka/Rashford/Kane 状态、attack rating、替补强度和 favorite ceiling tail 需阶段化入模。
- 巴拿马：低位韧性、防守评分和低事件地板只保留一个主权重；Carrasquilla 可用性作为单一 T-75 开关处理。

## 给模型线程

克罗地亚-加纳按“中场控制/主动动机 vs 低位守平/转换尾部”编码；巴拿马-英格兰按“英格兰宽度与板凳优势 vs 低位破局不确定性和轮换风险”编码。所有因子只作为战术输入，不输出比分、胜平负概率或投注建议。
