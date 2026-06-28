---
phase: group_round3_v3_tactics
group: J
status: partial
created_at: 2026-06-27T00:00:00+08:00
updated_at: 2026-06-27T00:00:00+08:00
owner: worldcup-tactics-coach
scope: J组第三轮v3预测战术因子包；不含比分、胜平负概率或投注建议
---

# J组第三轮 v3 战术线程输出

## 读取与缺口

已读取项目规范、`worldcup-tactics-coach`、`worldcup-quant-prediction-system`、`data/templates/match-prediction-standard-template-v3.md`、现有 J 组第三轮预测 Markdown/JSON、J 组前两轮复盘、四队 tactics packet 与 player_state。

未发现本地 `j-group-round3-v3` 数据采集包，当前产物状态为 `partial`。T-75 官方首发、最终伤停/停赛、累计黄牌和核心球员分钟限制仍需临场刷新。

## v3 固定口径

后续 J 组第三轮预测文档必须在因子评分前写入：

- 预计首发状态：`probable_not_official`
- 预计阵型与阵型替代方案
- 11名预计首发、角色说明、轮换候选和触发条件
- 首发变化对 xG、节奏、定位球、转换和对位因子的影响
- T-75 官方首发后必须重跑的条件

## 阿尔及利亚 vs 奥地利

### 预计首发战术影响

阿尔及利亚预计 `4-3-3`，备选 `4-2-3-1 / 4-1-4-1`。核心角色是 Mahrez 右路内收和定位球、Ait-Nouri 左路推进、Gouiri 中锋/左肋连接、Bennacer/Bentaleb 中场抗压。Benbouali 是最关键后手，若首发或半场早换，会提高禁区支点和二点终结，但会让中场防守更薄。

奥地利预计 `4-2-3-1`，备选 `4-4-2 / 4-3-3`。核心角色是 Laimer/Seiwald/Sabitzer 高压和二点球、Alaba 出球和防线指挥、Baumgartner/Wimmer 纵向冲击、Gregoritsch 或 Arnautovic 中锋支点。Alaba 是否首发、Laimer踢右后卫还是中场，是本场最大结构变量。

### 比赛状态

奥地利平局价值更高，前60分钟可维持压迫和中场强度，但后段未必无条件冒险。阿尔及利亚净胜球处于劣势，若比赛持平或另一场信息不利，更可能主动提高边路投入和中锋人数。

### 模型应编码

- 阿尔及利亚：后段 `third_round_motivation_tactical_shift`、`coach_substitution_risk`、`transition_attack_adjustment` 上修。
- 奥地利：`pressing_adjustment`、`central_control_advantage` 为正，但 `draw_management_tendency` 也为正。
- 关键限幅：奥地利高压、二点球、转换进攻高度共线；阿尔及利亚 Mahrez/Gouiri/Benbouali 后段弹性也高度共线。

### T-75 重跑条件

- Alaba 缺席或替补，奥地利出球、防线指挥、定位球防守重跑。
- Mahrez、Ait-Nouri、Gouiri 任一缺席，阿尔及利亚边路创造和转换质量重跑。
- Benbouali 首发，阿尔及利亚禁区人数与节奏上修，中场防守下修。
- 奥地利改双前锋或阿尔及利亚改双后腰，xG、节奏、转换风险重跑。

## 约旦 vs 阿根廷

### 预计首发战术影响

约旦预计 `5-4-1`，备选 `3-4-3 / 4-2-3-1`。核心角色是 Al-Taamari 反击推进、Al-Rashdan 二点和后插、Olwan 第二反击点、Yazan Al-Arab/后卫组三中卫保护禁区。五后卫能提升前60分钟抗压，但常规阵地 xG 会被压低。

阿根廷预计 `4-4-2`，备选 `4-3-3 / 4-2-3-1`。核心角色是 Messi 自由接球和定位球、Lautaro 牵制、De Paul/Enzo/Mac Allister 控节奏、Molina/Medina 提供宽度和防反保护。最大变量是 Messi、De Paul、Enzo 等核心的分钟管理。

### 比赛状态

阿根廷6分在手，主要任务是控风险、保头名和管理健康，不应把强队标签自动转成全场追大比分。约旦0分但仍有理论第三名和荣誉战动机，前段大概率低位，后段若落后或另一场信息不利会转向更冒险的 `3-4-3`。

### 模型应编码

- 约旦：`low_block_0_0_floor` 和前60分钟低事件保留，但 `first_goal_collapse_risk`、`transition_defense_risk` 后段上修。
- 阿根廷：`central_control_advantage`、`build_up_resistance_adjustment`、`set_piece_advantage` 明显为正；`rotation_shape_risk` 与 `draw_management_tendency` 同时上修。
- 关键限幅：Messi 状态、定位球、低位破局和阿根廷中场控制不能重复满额叠加。

### T-75 重跑条件

- Messi 替补或轮休，阿根廷定位球、低位破局、最后一传和节奏全部重跑。
- 阿根廷中场核心轮换两人以上，pressing、build-up、central control 重跑。
- 约旦不使用五后卫，改 `3-4-3` 或 `4-2-3-1`，约旦进攻和防线风险同步重跑。
- Al-Taamari 缺席，约旦反击和单事件尾部明显下修。

## 因子完整性

四队均已在 JSON 中写入 15 个战术因子：

`pressing_adjustment`、`build_up_resistance_adjustment`、`transition_attack_adjustment`、`transition_defense_risk`、`wide_channel_advantage`、`central_control_advantage`、`set_piece_advantage`、`defensive_line_risk`、`coach_substitution_risk`、`game_state_tendency`、`third_round_motivation_tactical_shift`、`rotation_shape_risk`、`draw_management_tendency`、`goal_difference_chase_risk`、`late_game_information_risk`。

## 双重计权警示

- 阿根廷：Messi 状态、定位球、低位破局和中场控制合并限幅。
- 奥地利：高压、二点球、转换进攻是同一战术链，不可三次满额。
- 阿尔及利亚：Mahrez、Gouiri、Benbouali 与后段提速高度相关，建议阶段化入模。
- 约旦：Al-Taamari 反击、定位球和低位韧性只保留单事件尾部，不上修为稳定阵地战能力。
