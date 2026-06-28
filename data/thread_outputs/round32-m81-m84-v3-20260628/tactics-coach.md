---
status: partial_source_limited
owner: worldcup-tactics-coach
phase: round_of_32_pre_match_tactical_packet
updated_at: 2026-06-28T22:48:00+08:00
scope: M81-M84 tactical matchup factors; no score prediction, no win-draw-loss probability, no betting advice
upstream_data_status: data_collector_available_partial_source_limited
data_collector: data/thread_outputs/round32-m81-m84-v3-20260628/data-collector.json
canonical_fixture_source: data/outputs/knockout/round-of-32-bracket-20260628.json
---

# 32强 M81-M84 v3 战术对位包

数据采集包已于 22:44:05 后落盘并解析通过，状态为 `partial_source_limited`。本战术包已改用数据包中的 canonical 对阵、预计阵型和 probable_not_official 首发口径；所有首发变化影响均需 T-75 官方首发后重跑。本文只做战术/教练/对位分析，不输出比分、胜平负概率或投注建议。

## M81 美国 vs 波黑

美国4-2-3-1/4-3-3的主场压迫、宽度和运动能力，对波黑4-2-3-1/4-4-2的Dzeko支点、Pjanic节奏和定位球形成主动压制与高线反击风险并存的对位。

### 美国
- 数据包预计阵型：4-2-3-1；首发状态：probable_not_official；置信度：medium。
- 预计 XI：Matt Freese, Alex Freeman, Chris Richards, Tim Ream, Antonee Robinson, Tyler Adams, Weston McKennie, Malik Tillman, Giovanni Reyna, Álex Zendejas, Folarin Balogun。
- 替补/轮换触发候选：Ricardo Pepi, Sergiño Dest, Haji Wright。
- 关键角色：Pulisic/Reyna负责肋部接应和最后一传；McKennie/Musah/Adams承担反压与二点；Dest/Robinson提供宽度和外侧推进；Balogun或Sargent负责纵深牵制。
- 替补触发：低位久攻不下时增加边锋或第二前锋；领先后补后腰保护边后卫身后；右路被打穿时降低Dest前插高度。
- 首发变化影响：数据包预计首发为 4-2-3-1：Matt Freese, Alex Freeman, Chris Richards, Tim Ream, Antonee Robinson, Tyler Adams, Weston McKennie, Malik Tillman, Giovanni Reyna, Álex Zendejas, Folarin Balogun。替补触发候选：Ricardo Pepi, Sergiño Dest, Haji Wright。Pulisic/Reyna同场会提高xG创造与节奏；Adams若无法首发，transition_defense_risk和central_control需重跑。
- 双重计权提醒：Pulisic/Reyna/McKennie状态可能已进入player_state，wide与transition需限幅。

### 波黑
- 数据包预计阵型：4-2-3-1；首发状态：probable_not_official；置信度：medium_low。
- 预计 XI：Nikola Vasilj, Amar Dedić, Emin Mahmić, Stjepan Radeljić, Sead Kolašinac, Amir Hadžiahmetović, Denis Huseinbašić, Ivan Bašić, Esmir Bajraktarević, Kerim Alajbegović, Luka Kulenović。
- 替补/轮换触发候选：Ermedin Demirović, Alen Halilović, Dario Šarić。
- 关键角色：Dzeko负责支点和禁区第一点；Pjanic负责节奏和长传释放；Krunić/后腰保护禁区前二点；Kolasinac/Demic一侧承担身体对抗和边路推进。
- 替补触发：落后时增加第二前锋和传中频率；领先或平局后段更可能收成低位保护禁区；中场被压制时补防守型中场。
- 首发变化影响：数据包预计首发为 4-2-3-1：Nikola Vasilj, Amar Dedić, Emin Mahmić, Stjepan Radeljić, Sead Kolašinac, Amir Hadžiahmetović, Denis Huseinbašić, Ivan Bašić, Esmir Bajraktarević, Kerim Alajbegović, Luka Kulenović。替补触发候选：Ermedin Demirović, Alen Halilović, Dario Šarić。Dzeko/Pjanic是否同时首发决定出球和定位球上限；若中卫速度不足，防线身后风险上升。
- 双重计权提醒：Dzeko/Pjanic的定位球与支点价值可能已在attack或player_state中体现。

| 队伍 | pressing | build_up | transition_attack | transition_defense | wide | central | set_piece | line_risk | sub_risk | game_state |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 美国 | +0.25 | +0.15 | +0.30 | -0.20 | +0.35 | +0.20 | +0.10 | -0.20 | +0.10 | +0.20 |
| 波黑 | -0.10 | -0.25 | +0.20 | -0.35 | -0.30 | -0.20 | +0.25 | -0.35 | -0.05 | +0.15 |

模型使用说明：每项因子的 evidence 已加入 data-collector 预计阵型/首发状态；模型需与 player_state、attack/defense、定位球模型做相关性限幅。

## M82 比利时 vs 塞内加尔

比利时4-2-3-1的De Bruyne/Lukaku/Doku纵深与塞内加尔4-2-3-1/4-3-3的身体压迫、边路速度和低位反击互相放大比赛波动。

### 比利时
- 数据包预计阵型：4-2-3-1；首发状态：probable_not_official；置信度：medium_low。
- 预计 XI：Thibaut Courtois, Timothy Castagne, Zeno Debast, Arthur Theate, Alexis Saelemaekers, Amadou Onana, Youri Tielemans, Kevin De Bruyne, Jeremy Doku, Leandro Trossard, Charles De Ketelaere。
- 替补/轮换触发候选：Dodi Lukebakio, Hans Vanaken, Nicolas Raskin。
- 关键角色：De Bruyne负责肋部最后一传和定位球；Lukaku负责支点与禁区压制；Doku/Bakayoko提供外侧突破；Onana/Tielemans保护二点。
- 替补触发：打不开低位时增加边锋一对一和禁区高点；领先后补中场保护转换防守；中卫被速度冲击时降低防线高度。
- 首发变化影响：数据包预计首发为 4-2-3-1：Thibaut Courtois, Timothy Castagne, Zeno Debast, Arthur Theate, Alexis Saelemaekers, Amadou Onana, Youri Tielemans, Kevin De Bruyne, Jeremy Doku, Leandro Trossard, Charles De Ketelaere。替补触发候选：Dodi Lukebakio, Hans Vanaken, Nicolas Raskin。De Bruyne和Lukaku同场抬高xG与定位球；若中卫组合偏慢，塞内加尔transition_attack需上调。
- 双重计权提醒：De Bruyne/Lukaku/Doku对attack、player_state、set_piece多项重叠，必须限幅。

### 塞内加尔
- 数据包预计阵型：4-3-3；首发状态：probable_not_official；置信度：medium_low。
- 预计 XI：Édouard Mendy, Krépin Diatta, Moussa Niakhaté, Abdoulaye Seck, El Hadji Malick Diouf, Idrissa Gueye, Lamine Camara, Pape Matar Sarr, Ibrahim Mbaye, Iliman Ndiaye, Nicolas Jackson。
- 替补/轮换触发候选：Ismaïla Sarr, Habib Diarra, Pape Gueye。
- 关键角色：Koulibaly/Niang或中卫负责禁区防空；Gueye/Camara控制二点和反压；Sarr/Diatta提供边路转换；Jackson/Dia负责纵深和禁区跑动。
- 替补触发：落后时增加前场速度和直接跑身后；领先后降低边后卫高度并保护中路；中场犯规压力大时提前换防守中场。
- 首发变化影响：数据包预计首发为 4-3-3：Édouard Mendy, Krépin Diatta, Moussa Niakhaté, Abdoulaye Seck, El Hadji Malick Diouf, Idrissa Gueye, Lamine Camara, Pape Matar Sarr, Ibrahim Mbaye, Iliman Ndiaye, Nicolas Jackson。替补触发候选：Ismaïla Sarr, Habib Diarra, Pape Gueye。若速度型边锋和Jackson/Dia同时首发，transition_attack上调；若Koulibaly缺席，set_piece_defense和line_risk下修。
- 双重计权提醒：塞内加尔速度反击和定位球已可能在attack/player_state中体现。

| 队伍 | pressing | build_up | transition_attack | transition_defense | wide | central | set_piece | line_risk | sub_risk | game_state |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 比利时 | +0.10 | +0.25 | +0.40 | -0.30 | +0.25 | +0.20 | +0.20 | -0.30 | +0.10 | +0.20 |
| 塞内加尔 | +0.15 | -0.10 | +0.35 | -0.25 | -0.10 | -0.20 | +0.20 | -0.25 | +0.00 | +0.25 |

模型使用说明：每项因子的 evidence 已加入 data-collector 预计阵型/首发状态；模型需与 player_state、attack/defense、定位球模型做相关性限幅。

## M83 葡萄牙 vs 克罗地亚

葡萄牙4-3-3的高质量边锋、Bruno/Bernardo肋部创造，对克罗地亚老将中场控节奏、定位球和低位防守形成技术型淘汰赛对位。

### 葡萄牙
- 数据包预计阵型：4-2-3-1；首发状态：probable_not_official；置信度：medium。
- 预计 XI：Diogo Costa, Diogo Dalot, Rúben Dias, Renato Veiga, João Cancelo, Rúben Neves, João Neves, Bruno Fernandes, Pedro Neto, Rafael Leão, Gonçalo Ramos。
- 替补/轮换触发候选：Bernardo Silva, João Félix, Francisco Conceição。
- 关键角色：Bruno Fernandes负责直塞和定位球；Bernardo Silva负责右肋控球；Leao/Conceicao/Neto提供边路一对一；Ruben Dias和Palhinha保护转换防守。
- 替补触发：打不开低位时增加Leao或第二前锋冲击；领先后补Palhinha类防守屏障；边路被反击时降低边后卫高度。
- 首发变化影响：数据包预计首发为 4-2-3-1：Diogo Costa, Diogo Dalot, Rúben Dias, Renato Veiga, João Cancelo, Rúben Neves, João Neves, Bruno Fernandes, Pedro Neto, Rafael Leão, Gonçalo Ramos。替补触发候选：Bernardo Silva, João Félix, Francisco Conceição。Bruno/Bernardo同场提高central_control和chance_creation；若Ronaldo首发，禁区xG和定位球提高但压迫连续性下降。
- 双重计权提醒：Bruno/Bernardo/Leao/Ronaldo状态会同时影响attack、wide和set_piece。

### 克罗地亚
- 数据包预计阵型：4-2-3-1；首发状态：probable_not_official；置信度：medium。
- 预计 XI：Dominik Livakovic, Josip Stanisic, Josip Sutalo, Josko Gvardiol, Ivan Perisic, Mateo Kovacic, Luka Modric, Nikola Vlasic, Petar Sucic, Martin Baturina, Ante Budimir。
- 替补/轮换触发候选：Mario Pasalic, Igor Matanovic, Andrej Kramaric。
- 关键角色：Modric/Kovacic负责控节奏和转移；Gvardiol负责左侧推进和防线覆盖；Kramaric/Budimir负责禁区支点；中卫高点负责定位球攻防。
- 替补触发：落后时增加中锋和传中；领先后补跑动型中场保护边肋；老将体能下降后降低压迫高度。
- 首发变化影响：数据包预计首发为 4-2-3-1：Dominik Livakovic, Josip Stanisic, Josip Sutalo, Josko Gvardiol, Ivan Perisic, Mateo Kovacic, Luka Modric, Nikola Vlasic, Petar Sucic, Martin Baturina, Ante Budimir。替补触发候选：Mario Pasalic, Igor Matanovic, Andrej Kramaric。Modric/Kovacic首发提高build_up_resistance和central_control；若老将体能受限，后60分钟抗压和边肋防守下修。
- 双重计权提醒：Modric/Kovacic控节奏和定位球优势可能已在经验/中场评分中体现。

| 队伍 | pressing | build_up | transition_attack | transition_defense | wide | central | set_piece | line_risk | sub_risk | game_state |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 葡萄牙 | +0.15 | +0.35 | +0.35 | -0.15 | +0.30 | +0.20 | +0.15 | -0.15 | +0.15 | +0.20 |
| 克罗地亚 | -0.05 | +0.20 | +0.15 | -0.30 | -0.25 | +0.00 | +0.25 | -0.30 | -0.05 | +0.15 |

模型使用说明：每项因子的 evidence 已加入 data-collector 预计阵型/首发状态；模型需与 player_state、attack/defense、定位球模型做相关性限幅。

## M84 西班牙 vs 奥地利

西班牙4-3-3的控球、反压和边路一对一，对奥地利4-2-3-1的Rangnick式高压、纵向冲刺和定位球形成压迫互相测试。

### 西班牙
- 数据包预计阵型：4-3-3；首发状态：probable_not_official；置信度：medium。
- 预计 XI：Unai Simón, Marcos Llorente, Pau Cubarsí, Aymeric Laporte, Marc Cucurella, Rodri, Martín Zubimendi, Pedri, Lamine Yamal, Nico Williams, Mikel Oyarzabal。
- 替补/轮换触发候选：Álex Baena, Mikel Merino, Borja Iglesias。
- 关键角色：Rodri/Zubimendi负责单后腰出球与反压；Pedri/Olmo负责肋部接应；Yamal/Nico Williams提供边路一对一；Morata或中锋负责禁区牵制。
- 替补触发：打不开高压时增加肋部接应和边路爆点；领先后补中场控球降低奥地利转换；被压迫失误增多时降低后场冒险。
- 首发变化影响：数据包预计首发为 4-3-3：Unai Simón, Marcos Llorente, Pau Cubarsí, Aymeric Laporte, Marc Cucurella, Rodri, Martín Zubimendi, Pedri, Lamine Yamal, Nico Williams, Mikel Oyarzabal。替补触发候选：Álex Baena, Mikel Merino, Borja Iglesias。Rodri/Pedri/Yamal首发会提高build_up和wide；若轮换中轴，抗奥地利高压需下修。
- 双重计权提醒：Rodri/Pedri/Yamal/Nico的影响会在attack、midfield和player_state中重复出现。

### 奥地利
- 数据包预计阵型：4-2-3-1；首发状态：probable_not_official；置信度：medium。
- 预计 XI：Alexander Schlager, Konrad Laimer, Kevin Danso, Philipp Lienhart, Phillipp Mwene, Nicolas Seiwald, Xaver Schlager, Marcel Sabitzer, Patrick Wimmer, Alexander Prass, Saša Kalajdžić。
- 替补/轮换触发候选：Marko Arnautović, Romano Schmid, David Alaba。
- 关键角色：Sabitzer/Laimer负责高压触发和二点冲刺；Baumgartner负责前腰压迫与禁区后插；Arnautovic/Gregoritsch提供支点和定位球高点；Alaba若可用影响左侧出球与定位球。
- 替补触发：落后时增加双前锋和传中；领先后降低压迫高度改中低位；高压被穿透时加第三中场保护中路。
- 首发变化影响：数据包预计首发为 4-2-3-1：Alexander Schlager, Konrad Laimer, Kevin Danso, Philipp Lienhart, Phillipp Mwene, Nicolas Seiwald, Xaver Schlager, Marcel Sabitzer, Patrick Wimmer, Alexander Prass, Saša Kalajdžić。替补触发候选：Marko Arnautović, Romano Schmid, David Alaba。Laimer/Sabitzer首发决定pressing和transition_attack；Alaba可用性影响build_up和set_piece。
- 双重计权提醒：奥地利高压、跑动和定位球可能已在team_style/player_state中体现。

| 队伍 | pressing | build_up | transition_attack | transition_defense | wide | central | set_piece | line_risk | sub_risk | game_state |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 西班牙 | +0.25 | +0.40 | +0.30 | -0.10 | +0.35 | +0.40 | +0.05 | -0.10 | +0.15 | +0.20 |
| 奥地利 | +0.25 | -0.20 | +0.25 | -0.35 | -0.30 | -0.35 | +0.20 | -0.35 | +0.00 | +0.15 |

模型使用说明：每项因子的 evidence 已加入 data-collector 预计阵型/首发状态；模型需与 player_state、attack/defense、定位球模型做相关性限幅。

## 数据缺口
- T-75 官方首发、实际阵型、最终伤停和分钟限制仍缺。
- 裁判尺度、天气草皮、官方技术报告和完整旅行/恢复细节仍待刷新。
- 部分球队第三轮逐分钟评分与官方外部评级仍为 partial_source_limited。

## 模型限幅
- transition_defense_risk 与 defensive_line_risk 高相关，建议合并或设上限。
- 核心球员状态与 transition_attack、wide_channel、central_control 可能重复计权。
- set_piece_advantage 只表达对位窗口，不重复叠加身高和定位球基础评分。
