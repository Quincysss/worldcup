# A组第三轮预测首发与战术影响 2026-06-24

- phase: group_round3_predicted_lineups
- group: A
- matches:
  - Czechia vs Mexico
  - South Africa vs South Korea
- status: ready
- created_at: 2026-06-24T00:45:00+08:00
- updated_at: 2026-06-24T18:18:00+08:00
- owner: tactics-coach
- scope: 第三轮预测首发XI、关键替补、轮换概率、阵型、战术影响、模型可用xG修正建议
- predicted_lineup_status: estimated
- official_t_minus_75_lineups: unavailable_before_matchday_window
- missing_fields:
  - official_lineups_t_minus_75
  - final_discipline_confirmation_south_africa
  - final_training_load_confirmation_for_rotation_cases
- source_log:
  - K:\worldcup\data\thread_outputs\a-group-round3-20260624\tactics-coach.md
  - K:\worldcup\比赛\已完成比赛\小组赛\A组\2026-06-11_墨西哥_2-0_南非_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\A组\2026-06-12_韩国_2-1_捷克_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\A组\2026-06-18_墨西哥_1-0_韩国_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\A组\2026-06-18_捷克_1-1_南非_复盘.md
  - K:\worldcup\data\packets\tactics\mexico-tactics-packet.json
  - K:\worldcup\data\packets\tactics\czechia-tactics-packet.json
  - K:\worldcup\data\packets\tactics\south-africa-tactics-packet.json
  - K:\worldcup\data\packets\tactics\south-korea-tactics-packet.json
  - K:\worldcup\data\outputs\player_state\mexico-player-state.json
  - K:\worldcup\data\outputs\player_state\czechia-player-state.json
  - K:\worldcup\data\outputs\player_state\south-africa-player-state.json
  - K:\worldcup\data\outputs\player_state\south-korea-player-state.json
- notes:
  - T-75官方首发通常在赛前约1小时公布；以下全部为 estimated，不得当作 confirmed 使用。
  - 第三轮动机已纳入：墨西哥已掌握主动权，捷克更接近必须争胜；韩国仍握主动权，南非更偏被动追分与荣誉战混合情境。

## data_gaps

- 南非中轴的停赛信息在 `player_state` 中有明确信号，但仍需赛前纪律名单二次确认，尤其是 Teboho Mokoena、Themba Zwane、Sphephelo Sithole。
- 墨西哥是否做前场和中前卫轮换，目前只能按“已出线后降低消耗”处理，不能提前视为大面积轮换已确认。
- 韩国左后卫与中锋的具体组合仍有弹性，Cho Gue-sung 与 Oh Hyeon-gyu 的先后手关系更像战术选择，不是伤停强制结果。
- 捷克后场三人组和二前腰位存在一到两处可调换点，赛前若需搏命，可能把更直接的高点或二点球点位提前。

## lineup_predictions

### 周三054 捷克 vs 墨西哥

#### 捷克

- predicted_formation: 3-4-2-1
- rotation_probability: low_to_medium
- confidence: medium
- estimated_xi:
  - GK: Jindrich Stanek
  - RCB: David Zima
  - CB: Tomas Holes
  - LCB: Ladislav Krejci
  - RWB: Vladimir Coufal
  - LWB: David Jurasek
  - CM: Tomas Soucek
  - CM: Antonin Barak
  - RAM: Vaclav Cerny
  - LAM: Lukas Provod
  - ST: Patrik Schick
- key_subs:
  - Tomas Chory
  - Pavel Sulc
  - Adam Hlozek
- tactical_impact:
  - 必须争胜会把捷克的边路传中、二点争抢和定位球堆叠推到更高权重，Schick 与 Soucek 的高空点位会比前两轮更集中。
  - 如果先发保持三中卫，真实意图更像“先保证肋部保护，再逐步把翼卫顶高”，不是一开场就无脑压满。
  - Chory 若较早登场，说明捷克已经把比赛导向双高点和二次落点冲击，后段波动会明显放大。
- lineup_risk:
  - 后场第三中卫与二前腰位并非完全锁死，若赛前风向偏搏命，Sulc 或另一名更直线型攻击手有机会提前进先发。

#### 墨西哥

- predicted_formation: 4-3-3
- rotation_probability: medium_to_high
- confidence: medium
- estimated_xi:
  - GK: Luis Malagon
  - RB: Jorge Sanchez
  - RCB: Cesar Montes
  - LCB: Johan Vasquez
  - LB: Jesus Gallardo
  - DM: Edson Alvarez
  - CM: Luis Chavez
  - CM: Orbelin Pineda
  - RW: Roberto Alvarado
  - ST: Raul Jimenez
  - LW: Hirving Lozano
- key_subs:
  - Santiago Gimenez
  - Julian Quinones
  - Erik Lira
- tactical_impact:
  - 墨西哥若保留 Edson Alvarez 和双中卫主轴，说明思路是“先稳结构，再看对手冒险后打反击”，不是追求高节奏压制。
  - Raul Jimenez 首发比 Santiago Gimenez 更像控节奏与背身串联取向，说明墨西哥更接受低比分和比赛降速。
  - Roberto Alvarado 若先发，右路更偏回撤接应和二传，不是纯爆点型边锋，符合已出线后降低对冲交换的逻辑。
- lineup_risk:
  - 墨西哥最可能的轮换点在中锋、右边锋和一名中前卫；若赛前确认轮换更深，前场冲刺与禁区终结会同步下修。

#### 对位结论

- matchup_summary:
  - 捷克需要把比赛推向更多传中、更多死球、更多二点球争夺，才能把结构性劣势压缩到可接受范围。
  - 墨西哥更可能接受控球不绝对占优，但要求中路保护和反击第一传质量在线。
  - 这场的首发差异核心不在“谁更强”，而在“谁更愿意承担第三轮的开放代价”。

### 周三053 南非 vs 韩国

#### 南非

- predicted_formation: 4-2-3-1
- rotation_probability: medium
- confidence: low_to_medium
- estimated_xi:
  - GK: Ronwen Williams
  - RB: Khuliso Mudau
  - RCB: Nkosinathi Sibisi
  - LCB: Grant Kekana
  - LB: Aubrey Modiba
  - CM: Jayden Adams
  - CM: Sphephelo Sithole
  - RW: Oswin Appollis
  - AM: Evidence Makgopa
  - LW: Iqraam Rayners
  - ST: Teboho Moremi
- key_subs:
  - Evidence Makgopa
  - Iqraam Rayners
  - 一名额外防守型中场替代方案
- tactical_impact:
  - 如果 Teboho Mokoena、Themba Zwane、Sphephelo Sithole 的停赛信号最终成立，南非中轴的推进、定位球脚法和二次组织会一起受损，球队会更依赖 Appollis 的边路推进和前场直给。
  - Ronwen Williams 与后场四人的守门区控制仍是基本盘，但南非若必须提速，回防质量和第二落点保护会明显恶化。
  - 先发若出现双前锋或伪双前锋站位，通常意味着南非准备更早压上抢第二点，而不是继续把比赛完全拖进低事件。
- lineup_risk:
  - 南非这场不是“主动轮换”风险，而是“纪律与可用人手迫使重排”的风险；中前场站位在赛前1小时最容易发生偏差。

#### 韩国

- predicted_formation: 4-2-3-1
- rotation_probability: low_to_medium
- confidence: medium
- estimated_xi:
  - GK: Jo Hyeon-woo
  - RB: Seol Young-woo
  - RCB: Lee Han-beom
  - LCB: Kim Min-jae
  - LB: Lee Myung-jae
  - CM: Park Yong-woo
  - CM: Hwang In-beom
  - RW: Lee Kang-in
  - AM: Lee Jae-sung
  - LW: Son Heung-min
  - ST: Cho Gue-sung
- key_subs:
  - Hwang Hee-chan
  - Oh Hyeon-gyu
  - Bae Jun-ho
- tactical_impact:
  - 韩国若保留 Kim Min-jae、Hwang In-beom、Son 的主轴，说明目标是先稳住出线主动权，再用后手速度和纵深点处理后半场。
  - Cho Gue-sung 首发更偏高点支撑与正面牵制；若改为 Oh Hyeon-gyu 或让 Hwang Hee-chan更早上，比赛会更偏冲击防线身后。
  - Lee Kang-in 与 Lee Jae-sung 同时先发，意味着韩国更愿意在低位对手面前用半空间和小配合解锁，而不是只靠 Son 的个人推进。
- lineup_risk:
  - 韩国最可能的变数在左边锋/中锋的出场次序与负荷管理；如果 Saka 式完全轮换那种极端情况没有本地证据，不应外推到韩国这场。

#### 对位结论

- matchup_summary:
  - 韩国更像“先控局、后提速”的首发逻辑，南非则更可能在比赛进程逼迫下逐步冒险。
  - 南非若中场停赛最终被确认，比赛对抗性仍在，但持续组织能力会更早见底。
  - 韩国最怕的不是总量压制不够，而是节奏过慢后把比赛拖进定位球和单次反击的不确定区。

## model_handoff

- predicted_lineup_status: estimated
- xg_adjustments:
  - match: Czechia vs Mexico
    - czechia_attack_adjustment: +0.10 to +0.18
    - mexico_attack_adjustment: -0.08 to -0.18
    - mexico_defensive_floor_adjustment: 0.00 to -0.05
    - note: 捷克的上调来自第三轮必须争胜带来的传中、定位球和后段压上，不应与其原有 set_piece_strength 重复累计过多。
  - match: South Africa vs South Korea
    - south_africa_attack_adjustment: -0.05 to -0.15
    - south_korea_attack_adjustment: +0.05 to +0.12
    - south_korea_control_adjustment: +0.10
    - note: 若南非中轴停赛确认，先下调其阵地战与定位球质量，再决定是否上调韩国进攻，不要双重放大。
- tactical_risk_flags:
  - 墨西哥若确认更深轮换，不能只下调进攻，还要同步上调比赛平局容忍度。
  - 捷克的第三轮动机应更多体现在 late-game variance，而不是赛前无上限抬高90分钟攻击质量。
  - 韩国对低位球队的优势更偏“稳定创造”而非“必然大胜”，模型不应把控局能力直接翻译成过高净胜预期。
  - 南非若中场可用人手进一步受限，需优先下调 build-up 和 set-piece quality，而不是简单下调全队跑动意愿。
- double_counting_warning:
  - 不要把“必须争胜”与“历史进攻能力”重复加总。
  - 不要把“已出线轮换风险”与“市场热度回撤”重复计入同一方向惩罚。
  - 南非停赛若已反映在 player_state 伤停权重中，战术层只补结构性影响，不重复大幅扣分。

## confidence_notes

- 墨西哥与韩国的中后场骨架判断相对更稳，confidence: medium。
- 捷克的前场辅助位与南非的中轴重排仍受赛前纪律确认影响，confidence: low_to_medium。
- 本稿最适合给模型做 T-24 到 T-6 的预估校正，不适合替代 T-75 官方首发核验。

## validation

- file_written: yes
- utf8_intended: yes
- predicted_lineup_status_present: yes
- contains_xg_adjustments: yes
- contains_rotation_probability: yes
- next_required_check: official_lineups_t_minus_75
