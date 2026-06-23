# L组第二轮战术复核 2026-06-23

- phase: round2_tactical_recalc
- group: L
- status: partial
- discussion_only: true
- created_at: 2026-06-23T17:05:00+08:00
- updated_at: 2026-06-23T17:22:00+08:00
- owner: tactics-coach
- scope: 英格兰 vs 加纳、巴拿马 vs 克罗地亚。仅输出战术摘要、量化调整、双重计数警告和比分/概率模型输入建议，不给最终预测，不给投注建议。

## data_gaps

- `data/thread_outputs/l-group-round2-recalc-20260623/data-collector.md` 仍是骨架，缺少同源赔率、最终首发、分钟限制和临场天气细化。
- 英格兰侧仍缺 Saka 是否替补、Rice/Rashford 分钟上限的最终确认。
- 加纳侧仍缺 Partey 实际可用分钟、Ati-Zigi 是否恢复首发的官方答案。
- 巴拿马侧仍缺 Carrasquilla 的临场可用性和首发顺位确认。
- 克罗地亚侧仍缺 Dalic 是否因必须争胜而提前年轻化或延长老将时间的官方信号。

## source_log

- `data/packets/matchup_tactics/l-group-round2-tactical-refresh-20260622.json`
- `data/packets/tactics/england-tactics-packet.json`
- `data/packets/tactics/ghana-tactics-packet.json`
- `data/packets/tactics/panama-tactics-packet.json`
- `data/packets/tactics/croatia-tactics-packet.json`
- `data/packets/teams/england-team-packet.json`
- `data/packets/teams/ghana-team-packet.json`
- `data/packets/teams/panama-team-packet.json`
- `data/packets/teams/croatia-team-packet.json`
- `data/outputs/player_state/england-player-state.json`
- `data/outputs/player_state/ghana-player-state.json`
- `data/outputs/player_state/panama-player-state.json`
- `data/outputs/player_state/croatia-player-state.json`
- `比赛/已完成比赛/小组赛/L组/2026-06-17_英格兰_4-2_克罗地亚_复盘.md`
- `比赛/已完成比赛/小组赛/L组/2026-06-17_加纳_1-0_巴拿马_复盘.md`

## 战术摘要

### 英格兰 vs 加纳

- 英格兰首战 4 比 2 的信息不应只解读成火力强，更重要的是 Tuchel 已经公开把第二轮重点转向防守结构、丢球后站位和球权管理。首轮下半场提速有效，但同场也被克罗地亚两次打到攻转守和二点保护。`confidence: high`
- 若 Saka 真从替补进入，英格兰右路的纯爆点可能从 Saka 的稳定一对一转成 Madueke 的直接突破，左路则在 Gordon/Rashford 之间决定是更高强度回追还是更强终结冲刺。这个变化更像“边路功能切换”，不是单纯火力下降。`confidence: medium_high`
- 加纳最合理的脚本仍是 Queiroz 式中低位、直塞反击和身体对抗。若 Partey 复出，第一传和二点保护会改善，能让加纳不只是一味大脚解围；但 Ati-Zigi 状态未定会直接影响其低位体系的稳定性。`confidence: medium`
- 英格兰对加纳的核心不是“能不能压住”，而是压上后能否把 Rice 与中卫、边后卫之间的保护距离维持住。如果丢球后第一时间站位散，Semenyo 一类的直线冲击依然有机会。`confidence: high`
- 模型应把本场理解为“英格兰仍有明显结构优势，但 Tuchel 的第二轮口径意味着比赛管理权重上升，大开大合尾部要收一点”。`confidence: high`

### 巴拿马 vs 克罗地亚

- 巴拿马首战证明自己能把节奏拖慢、把比赛切碎，但一旦 Carrasquilla 不能稳定推进，中前场就很容易只剩 Waterman 支点和边路传中，追分质量会明显下降。`confidence: high`
- 克罗地亚这场的战略前提是需要胜利，因此中场控节奏不会只是“保平式控球”，而更可能是先靠 Modric、Petar Sucic、Kovacic/Baturina 夺回中路主动，再找 Perisic 或弱侧传递去拆巴拿马低位。`confidence: high`
- 但克罗地亚的问题仍在后程。首战对英格兰已经暴露出边肋保护、换人后连接和老将负荷问题，对手虽然换成巴拿马，风险等级会下降，但不会消失。`confidence: medium_high`
- 巴拿马若守住前 60 分钟，比赛会自然向克罗地亚最不舒服的方向移动：需要持续提速、持续找第二个进球，同时管理老将体能。`confidence: medium_high`
- 模型应把这场理解为“克罗地亚中场控制与场面主导更强，但后程净胜放大能力并不稳定”；如果 Carrasquilla 临场缺阵，巴拿马的推进质量和反扑能力需要再下修。`confidence: high`

## 量化调整

量表说明：`-2` 到 `+2` 为战术修正，不是比分预测，不是胜平负建议。

### 英格兰 vs 加纳

| 因子 | 英格兰 | 加纳 | 说明 |
| --- | --- | --- | --- |
| pressing_adjustment | +1 | -1 | 英格兰可阶段性高压，但 Tuchel 本轮更强调丢球后结构；加纳更像场景化压迫。 |
| build_up_resistance_adjustment | +1 | -1 | 英格兰中路出球层次更稳；Partey 若高分钟复出，可把加纳从 `-1` 提到 `0`。 |
| transition_attack_adjustment | +1 | +1 | 英格兰边路和替补二次冲击强；加纳的主要破局也来自直线反击。 |
| transition_defense_risk | +1 | +2 | 英格兰仍有被直塞和二点打穿的风险；加纳面对英格兰边路换速更容易被拉开。 |
| wide_channel_advantage | +2 | -1 | 英格兰右路与替补边锋深度占优；加纳更适合利用反向空间，不占持续宽度优势。 |
| central_control_advantage | +1 | -1 | 英格兰中路控制更好；Partey 是唯一可能缩小这个差距的关键开关。 |
| set_piece_advantage | +1 | 0 | 英格兰脚法和点位更稳定；加纳保留身体对抗带来的方差。 |
| coach_substitution_risk | -1 | 0 | Tuchel 首轮 72 分钟后的换人质量高；Queiroz 后手有用，但深度不足以给明显正修。 |
| game_state_tendency | +1 | +1 | 英格兰偏后程提速后控场；加纳偏低位忍耐后直接冲击。 |

### 巴拿马 vs 克罗地亚

| 因子 | 巴拿马 | 克罗地亚 | 说明 |
| --- | --- | --- | --- |
| pressing_adjustment | -1 | 0 | 巴拿马更像低位抗压；克罗地亚只适合阶段性前压。 |
| build_up_resistance_adjustment | -1 | +1 | 巴拿马被压迫时更容易早找前场；克罗地亚中场第一脚更稳。 |
| transition_attack_adjustment | 0 | +1 | 巴拿马只保留小幅反击尾部；克罗地亚的经验型转换和二点处理更可靠。 |
| transition_defense_risk | +1 | +1 | 巴拿马翼卫身后风险明确；克罗地亚后程边肋保护也不是零风险。 |
| wide_channel_advantage | 0 | +1 | 巴拿马有宽度但最后一传弱；克罗地亚左路和弱侧调度更成熟。 |
| central_control_advantage | -2 | +2 | 这是本场最强结构差异，重点在中场控节奏与第一脚出球。 |
| set_piece_advantage | 0 | +1 | 巴拿马保留身体方差；克罗地亚脚法和点位更稳定。 |
| coach_substitution_risk | +1 | +1 | 巴拿马追分替补火力有限；克罗地亚若晚换或换后降强度，也有后程风险。 |
| game_state_tendency | 0 | +1 | 巴拿马想把比赛拖慢；克罗地亚更可能先控节奏再决定是否提速。 |

## 双重计数警告

- 英格兰 `transition_attack_adjustment` 与加纳 `transition_defense_risk` 指向同一通道，模型聚合时应半权重处理其一，避免把同一条边路冲击算两次。
- 英格兰首战进球、Saka 助攻、Rashford 替补破门、Kane 双球已经进入 `player_state`，这里只把它们当作战术证据，不应再额外抬升个人 form。
- 加纳 `Partey` 复出与否同时影响 `build_up_resistance_adjustment`、`central_control_advantage` 和比赛节奏脚本，模型应把他当单一开关变量，而不是三项独立利好。
- 巴拿马 `Carrasquilla` 的可用性同时影响推进、出球抗压和追分质量，不应把个人状态下修重复记入 `build_up_resistance` 与 `transition_attack`。
- 克罗地亚 `central_control_advantage` 已经覆盖 Modric、Kovacic、Sucic 一线的结构价值，不能再用控球率代理、球员评分和中场经验做三重加码。
- 克罗地亚老将后程风险已经体现在 `coach_substitution_risk` 和 `transition_defense_risk`，不要再单独用“必须争胜”叙事额外放大净胜预期。

## 比分/概率模型输入建议

- 这部分只给模型输入方向，不给最终预测。
- 英格兰 vs 加纳：保留英格兰 1X2 主方向优势，但把“大比分放大”尾部下调一级；若 Saka 替补且 Rice 分钟受限，再把英格兰进攻上沿收一档。
- 英格兰 vs 加纳：保留加纳“能靠反击或二点制造一次高质量机会”的尾部，不要把其低位解读成纯被动挨打。
- 巴拿马 vs 克罗地亚：保留克罗地亚场面与中场控制优势，但不要把这自动映射成稳定两球净胜；后程强度衰减要留在概率树里。
- 巴拿马 vs 克罗地亚：如果 Carrasquilla 缺阵或受限，巴拿马的持球推进、追分脚本和进球尾部都应同步下修半档到一档。
- 两场共通：如果主线程已经把首轮结果、player_state 评分和球队名气并入结果模型，本文件里的战术修正应只作为限幅器和脚本修正器，不应再独立驱动大幅概率跳变。

## validation

- file_written: yes
- status_note: partial_discussion_only_packet_written
- schema_check: markdown_sections_present

<!-- l-group-round2-cp-jc-20260623:start -->
## L组第二轮战术复核 2026-06-23
- 英格兰 vs 加纳：英格兰强在前场深度、定位球二次进攻和Bellingham/Kane轴线；弱点是首轮暴露的回收过早与丢球后结构。Ghana低位、直接反击、Partey回归让比赛更像低比分消耗战。
- 巴拿马 vs 克罗地亚：克罗地亚控球和中场质量明显占优，但首轮后程防守和转换保护要打折；Panama若Carrasquilla可用，推进和反击质量会上升。
- 双重计数警告：首轮比分不能同时重复进入近期状态、战术修正和赔率校准三层。
- 模型建议：英格兰场保留平局尾部；克罗地亚场上调胜面但不直接上调穿盘。
<!-- l-group-round2-cp-jc-20260623:end -->
