---
status: partial_source_limited
owner: worldcup-tactics-coach
phase: round_of_32_pre_match_tactical_packet
updated_at: 2026-06-28T23:59:00+08:00
scope: M73-M76 tactical matchup factors; no score prediction, no win-draw-loss probability, no betting advice
upstream_data_status: partial_source_limited_data_collector_read
---

# 32强 M73-M76 v3 战术对位包

数据线程 `data-collector.json/.md` 已读取。该包确认四场赛程、预计阵型、probable-not-official 预计首发和关键可用性冲突，但 T-75 官方首发、最终伤停/分钟限制、完整同源中国竞彩链仍缺，因此本战术包状态为 `partial_source_limited`。

## 总体模型闸门

- 所有阵型和首发影响均以数据线程预计 XI 为基础，T-75 官方首发后必须重跑。
- 本包只输出战术/教练/对位因子，不给比分、胜平负概率或投注建议。
- 双重计权重点：加拿大 Davies/Eustaquio、德国首轮大胜、荷兰多点爆发、摩洛哥 4-2 的开放尾部、巴西 Vinicius/Bruno 状态、日本门将与纪律性，均可能已部分进入 player_state 或 attack/defense。

## M73 南非 vs 加拿大

核心对位：南非预计 3-4-2-1，防守可落 5-4-1；加拿大预计 3-4-2-1，依靠 Davies/Buchanan 宽度和 David/Larin/Promise David 前场冲击。南非要把比赛压成低事件和定位球/二点球局；加拿大要用边翼卫和前场压迫制造纵向转换。

关键角色：南非 Williams 稳定防线，Mokoena 是中场、点球和定位球核心，但本地旧停赛标记与 Guardian 回归口径冲突；加拿大 Davies、Bombito 为回归口径，Koné 严重伤情，Eustáquio 肌肉疲劳观察。

首发变化影响：若 Davies/Eustáquio 无法高强度出场，加拿大压迫和转换 xG 要降档；若 Mokoena 不首发，南非 set_piece_advantage、central_control 和低事件管理都要下修。

| 队伍 | 因子 | direction | magnitude | confidence | model_note |
| --- | --- | --- | ---: | --- | --- |
| 南非 | pressing_adjustment | negative | -0.20 | medium | 不是防守降级，而是主动降低压迫高度。 |
| 南非 | build_up_resistance_adjustment | mixed | -0.10 | medium | Canada 高压可卡第一传，Williams/Mokoena 可缓冲。 |
| 南非 | transition_attack_adjustment | positive | 0.25 | medium | 只加转换/二点球，不加阵地战总攻击。 |
| 南非 | transition_defense_risk | neutral | 0.00 | medium | 落后后才显著变坏。 |
| 南非 | wide_channel_advantage | negative | -0.25 | medium | 受 Davies 分钟限制强烈影响。 |
| 南非 | central_control_advantage | neutral | 0.00 | medium_low | T-75 中场组合决定方向。 |
| 南非 | set_piece_advantage | positive | 0.25 | medium | Mokoena 可用性是开关。 |
| 南非 | defensive_line_risk | positive | 0.20 | medium | 深位降低身后风险。 |
| 南非 | coach_substitution_risk | neutral | 0.00 | medium | Broos 稳态高，替补攻击上限有限。 |
| 南非 | game_state_tendency | positive | 0.35 | medium | 低事件、一球差韧性加权。 |
| 加拿大 | pressing_adjustment | positive | 0.35 | medium | Davies/Eustáquio/Koné 状态不全时折半。 |
| 加拿大 | build_up_resistance_adjustment | mixed | 0.05 | medium_low | 中场完整度不足时不要给大正向。 |
| 加拿大 | transition_attack_adjustment | positive | 0.45 | medium_high | 避免与 David/Buchanan/Davies 状态重复。 |
| 加拿大 | transition_defense_risk | negative | -0.35 | medium | 高压被破后身后风险上升。 |
| 加拿大 | wide_channel_advantage | positive | 0.35 | medium | Davies 可用性决定上限。 |
| 加拿大 | central_control_advantage | mixed | 0.00 | medium_low | Eustáquio/Koné 缺口抵消技术优势。 |
| 加拿大 | set_piece_advantage | neutral | 0.00 | medium_low | 不是主路径。 |
| 加拿大 | defensive_line_risk | negative | -0.30 | medium | 需和高压强度联动。 |
| 加拿大 | coach_substitution_risk | mixed | -0.05 | medium | 强度替补有用，伤情替补会破坏结构。 |
| 加拿大 | game_state_tendency | mixed | 0.20 | medium | 首球后事件波动上升。 |

## M74 德国 vs 巴拉圭

核心对位：德国预计 4-2-3-1，Kimmich/Tah/Rüdiger 后场，Wirtz、Musiala、Sané、Havertz 形成高技术前场；巴拉圭预计 4-4-2，Gustavo Gómez 统领低位，Almirón、Galarza、Enciso 负责反击和二点。

关键角色：德国 Neuer/Baumann、Sané/Undav 存在公开二级源争议，影响出球、压迫和禁区站位；巴拉圭 Enciso 已进入本地状态库，但 D 组第三轮复盘缺口仍在。

首发变化影响：德国若让 Kimmich 回中场或 Undav 首发，会改变中路控节奏和禁区 xG；巴拉圭若改 5-4-1，会降低节奏、提升定位球与低位防守权重。

| 队伍 | 因子 | direction | magnitude | confidence | model_note |
| --- | --- | --- | ---: | --- | --- |
| 德国 | pressing_adjustment | positive | 0.40 | medium_high | 不与 7-1 进攻表现重复计权。 |
| 德国 | build_up_resistance_adjustment | positive | 0.45 | medium_high | Kimmich/Wirtz/Musiala 是核心依据。 |
| 德国 | transition_attack_adjustment | positive | 0.35 | medium | Ecuador 2-1 暴露控制不足，需限幅。 |
| 德国 | transition_defense_risk | negative | -0.25 | medium | 高位边卫和领先后节奏管理风险。 |
| 德国 | wide_channel_advantage | positive | 0.25 | medium | 窄阵会削弱该项。 |
| 德国 | central_control_advantage | positive | 0.55 | medium_high | 只做推进/节奏优势，不直接转成进球。 |
| 德国 | set_piece_advantage | positive | 0.20 | medium_low | 巴拉圭也强，保持小幅。 |
| 德国 | defensive_line_risk | mixed | -0.15 | medium | 对巴拉圭直塞/长传保留尾部。 |
| 德国 | coach_substitution_risk | positive | 0.15 | medium | 替补深度小幅正向。 |
| 德国 | game_state_tendency | mixed | 0.10 | medium | 淘汰赛降低轮换拖拽，但不消除转换风险。 |
| 巴拉圭 | pressing_adjustment | negative | -0.25 | medium | 低位优先，不当作弱防守。 |
| 巴拉圭 | build_up_resistance_adjustment | negative | -0.25 | medium | 德国反抢可迫使长传。 |
| 巴拉圭 | transition_attack_adjustment | positive | 0.30 | medium | Almirón/Enciso/Galarza 可用性决定上限。 |
| 巴拉圭 | transition_defense_risk | negative | -0.35 | medium_high | 先丢球后结构散开风险高。 |
| 巴拉圭 | wide_channel_advantage | negative | -0.25 | medium | 4后卫时尤其明显。 |
| 巴拉圭 | central_control_advantage | negative | -0.45 | medium_high | 会丢中场领地，但不等于崩盘。 |
| 巴拉圭 | set_piece_advantage | positive | 0.30 | medium | 低比分破局支点，需限幅。 |
| 巴拉圭 | defensive_line_risk | mixed | -0.20 | medium | 低位减少身后，追分时翻负。 |
| 巴拉圭 | coach_substitution_risk | mixed | -0.10 | medium_low | Alfaro 稳，但追分换人会降保护。 |
| 巴拉圭 | game_state_tendency | mixed | 0.25 | medium_high | 低事件生存与先丢球崩盘双分支。 |

## M75 荷兰 vs 摩洛哥

核心对位：荷兰预计 4-3-3，De Jong 控节奏，Dumfries、Gakpo、Brobbey、Summerville 提供宽度和终结；摩洛哥预计 4-2-3-1，Hakimi 右路推进，Bounou 有 minor-knock watch，Saibari/Rahimi 是后程冲击。

关键角色：荷兰的多点终结与高点定位球，对上摩洛哥低位压缩和右路转换。摩洛哥 4-2 海地说明强队方向可以成立但零封假设脆弱，模型必须保留双方得分和后程开放尾部。

首发变化影响：若荷兰 De Jong 缺席，build_up_resistance 和 central_control 降档；若摩洛哥 Bounou 或 Hakimi 受限，防守地板和反击出口同时下修。

| 队伍 | 因子 | direction | magnitude | confidence | model_note |
| --- | --- | --- | ---: | --- | --- |
| 荷兰 | pressing_adjustment | positive | 0.25 | medium | 不是全场高压。 |
| 荷兰 | build_up_resistance_adjustment | positive | 0.35 | medium_high | De Jong 是核心开关。 |
| 荷兰 | transition_attack_adjustment | positive | 0.35 | medium_high | 与 Gakpo/Brobbey 状态分限幅。 |
| 荷兰 | transition_defense_risk | negative | -0.30 | medium | Hakimi/Brahim 反击通道保留。 |
| 荷兰 | wide_channel_advantage | positive | 0.20 | medium | Dumfries 可压制，但 Hakimi 抵消。 |
| 荷兰 | central_control_advantage | positive | 0.35 | medium | 摩洛哥压缩会降低 xG 转化。 |
| 荷兰 | set_piece_advantage | positive | 0.30 | medium | Van Dijk/高点小幅正向。 |
| 荷兰 | defensive_line_risk | mixed | -0.20 | medium | 中场身后空间仍是尾部。 |
| 荷兰 | coach_substitution_risk | positive | 0.15 | medium | 替补攻击小幅正向。 |
| 荷兰 | game_state_tendency | positive | 0.25 | medium_high | 领先后第三球尾部不能过早关掉。 |
| 摩洛哥 | pressing_adjustment | neutral | 0.00 | medium | 阶段跳压，不加全场压迫。 |
| 摩洛哥 | build_up_resistance_adjustment | mixed | 0.05 | medium | Hakimi/中场可出球，但荷兰能围抢。 |
| 摩洛哥 | transition_attack_adjustment | positive | 0.40 | medium_high | 对准荷兰转换防守风险。 |
| 摩洛哥 | transition_defense_risk | negative | -0.25 | medium | 追分推边卫时风险上升。 |
| 摩洛哥 | wide_channel_advantage | mixed | 0.15 | medium | 主要是右路非全场优势。 |
| 摩洛哥 | central_control_advantage | negative | -0.20 | medium | 防守中心强，但控球中心不占优。 |
| 摩洛哥 | set_piece_advantage | mixed | 0.00 | medium | 双方高点抵消。 |
| 摩洛哥 | defensive_line_risk | positive | 0.15 | medium | 基础低位保护身后。 |
| 摩洛哥 | coach_substitution_risk | positive | 0.20 | medium | Rahimi 等后程冲击可入模。 |
| 摩洛哥 | game_state_tendency | mixed | 0.20 | medium | 领先降速，落后明显打开。 |

## M76 巴西 vs 日本

核心对位：巴西预计 4-2-3-1，Vinicius 左路、Bruno Guimarães 组织、Casemiro 屏障；日本预计 3-4-2-1，Suzuki、Tomiyasu、Itakura 稳防线，Kamada/Ito/Ueda 打反击和二线。第一看点是 Vinicius 左路一对一如何被日本三中卫/翼卫协防处理，第二看点是日本定位球防守高点劣势。

关键角色：巴西 Vinicius 和 Bruno 的第三轮状态可能已进 player_state，战术包只给对位加权；日本 Ueda、Ito、Kamada、Suzuki 状态强，但第三轮完整分钟回写不足。

首发变化影响：巴西若改 4-3-3 或 Neymar 首发，会改变中路创造和防守平衡；日本若不用三中卫，wide_channel_risk 要上调。

| 队伍 | 因子 | direction | magnitude | confidence | model_note |
| --- | --- | --- | ---: | --- | --- |
| 巴西 | pressing_adjustment | positive | 0.25 | medium | 选择性高压，不做全场压迫加成。 |
| 巴西 | build_up_resistance_adjustment | positive | 0.30 | medium | 日本能压，但巴西中后场质量高。 |
| 巴西 | transition_attack_adjustment | positive | 0.50 | high | 与 Vinicius/Bruno 状态限幅。 |
| 巴西 | transition_defense_risk | negative | -0.25 | medium | 边卫前压给日本反击窗口。 |
| 巴西 | wide_channel_advantage | positive | 0.45 | high | Vinicius 通道是核心优势。 |
| 巴西 | central_control_advantage | positive | 0.25 | medium | 日本纪律抵消一部分。 |
| 巴西 | set_piece_advantage | positive | 0.25 | medium | 日本防高点风险单列。 |
| 巴西 | defensive_line_risk | mixed | -0.15 | medium | 防线强但前压有代价。 |
| 巴西 | coach_substitution_risk | positive | 0.15 | medium | 替补深度小幅正向。 |
| 巴西 | game_state_tendency | positive | 0.25 | medium_high | 早球后继续进攻尾部保留。 |
| 日本 | pressing_adjustment | positive | 0.25 | medium_high | 纪律性强，但巴西抗压上限高。 |
| 日本 | build_up_resistance_adjustment | positive | 0.15 | medium | 小幅正向即可。 |
| 日本 | transition_attack_adjustment | positive | 0.30 | medium | 主要利用巴西边卫身后。 |
| 日本 | transition_defense_risk | negative | -0.20 | medium | Vinicius/Raphinha 会拉扯回追。 |
| 日本 | wide_channel_advantage | negative | -0.35 | medium_high | 若三中卫协防有效则减半。 |
| 日本 | central_control_advantage | mixed | -0.05 | medium | 接近中性，取决于中场屏障。 |
| 日本 | set_piece_advantage | negative | -0.30 | medium_high | 防守高点劣势独立入模。 |
| 日本 | defensive_line_risk | mixed | -0.15 | medium | 阵型选择决定幅度。 |
| 日本 | coach_substitution_risk | positive | 0.10 | medium | Moriyasu 变阵能力小幅稳定。 |
| 日本 | game_state_tendency | positive | 0.20 | medium | 平局/低事件管理能力可入模，但不做结果判断。 |

## 模型与红队交接

- 模型应重点编码：Canada core-minute conditional press、Germany central-control with transition-tail cap、Netherlands third-goal tail but Morocco counter branch、Brazil wide transition ceiling vs Japan set-piece defense risk。
- 红队应挑战：Mokoena 与 Davies/Eustáquio 可用性、德国 Neuer/Baumann 与 Sané/Undav 选择、Bounou minor knock、Japan 是否真的三中卫抗 Vinicius。
- T-75 官方首发后必须重跑：任一核心缺席、阵型从数据线程预计口径切换、或两名以上前场/后场首发变化。
