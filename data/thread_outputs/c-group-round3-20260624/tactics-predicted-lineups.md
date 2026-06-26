# C组第三轮预测首发与战术影响

- phase: group_round3_predicted_lineups
- group: C
- status: partial
- created_at: 2026-06-24T18:03:14+08:00
- updated_at: 2026-06-24T18:17:00+08:00
- owner: tactics-coach
- scope: Scotland vs Brazil; Morocco vs Haiti
- predicted_lineup_status: estimated
- official_t_minus_75_lineups: unavailable
- missing_fields:
  - official_t_minus_75_lineups
  - latest_discipline_confirmation
  - latest_medical_confirmation
  - exact_round_of_32_path_confirmation
  - same_time_group_score_reaction
- source_log:
  - K:\worldcup\.codex\skills\worldcup-tactics-coach\SKILL.md
  - K:\worldcup\比赛\已完成比赛\小组赛\C组\C组第二轮复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\C组\2026-06-19_巴西_3-0_海地_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\C组\2026-06-19_苏格兰_0-1_摩洛哥_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\C组\2026-06-14_巴西_1-1_摩洛哥_复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\C组\2026-06-14_海地_0-1_苏格兰_复盘.md
  - K:\worldcup\data\packets\tactics\brazil-tactics-packet.json
  - K:\worldcup\data\packets\tactics\morocco-tactics-packet.json
  - K:\worldcup\data\packets\tactics\haiti-tactics-packet.json
  - K:\worldcup\data\packets\tactics\scotland-tactics-packet.json
  - K:\worldcup\data\outputs\player_state\brazil-player-state.json
  - K:\worldcup\data\outputs\player_state\morocco-player-state.json
  - K:\worldcup\data\outputs\player_state\haiti-player-state.json
  - K:\worldcup\data\outputs\player_state\scotland-player-state.json
  - K:\worldcup\data\outputs\team_reports\brazil-model-brief.json
  - K:\worldcup\data\outputs\team_reports\morocco-model-brief.json
  - K:\worldcup\data\outputs\team_reports\haiti-model-brief.json
  - K:\worldcup\data\outputs\team_reports\scotland-model-brief.json
- notes:
  - 官方 T-75 首发在赛前约 75 分钟才公布；以下只做预测首发与战术路径判断，不视为 confirmed。
  - 本稿只服务战术与模型校准，不输出最终比分或投注建议。
  - 同组同时开球意味着第 60 分钟后的换人和风险偏好可能受另一场实时比分影响。

## C组第三轮背景

- 当前积分参考：巴西 4 分，摩洛哥 4 分，苏格兰 3 分，海地 0 分。
- 巴西并非“打平即可无风险”情境；若摩洛哥取胜，巴西平局会把小组第一主动权交出，因此仍有较强争胜动力。
- 苏格兰处于高压争线情境，保平价值有限，比赛后段更可能主动提速。
- 海地已失去出线主动权，更接近荣誉战与搅局战脚本，阵型纪律和轮换稳定性都更低。

## 苏格兰 vs 巴西

### 比赛脚本总览

- 动机框架：苏格兰更接近“必须赢才真正掌控命运”，巴西更接近“必须争胜以免被另一场反超”。`confidence: high`
- 同开球依赖：若另一场摩洛哥领先，巴西和苏格兰都可能在下半场提前拉高风险；若另一场迟迟僵持，巴西更愿意先控节奏，苏格兰则更早进入追分式用人。`confidence: medium`
- 潜在32强路径影响：巴西有避免掉到更不利淘汰路径的动机，因此不太像会大幅轮换到失去压制力；苏格兰则更可能把体能和犯规风险让位于结果优先。`confidence: medium`

### 巴西预测首发

- predicted_formation: 4-3-3
- alternate_shapes:
  - 4-2-3-1
  - 4-4-2（追分时让前场双点更直接）
- estimated_xi:
  - GK: Alisson
  - RB: Danilo
  - RCB: Marquinhos
  - LCB: Gabriel Magalhaes
  - LB: Guilherme Arana
  - CM: Bruno Guimaraes
  - CM: Lucas Paqueta
  - CM: Joelinton
  - RW: Rodrygo
  - CF: Matheus Cunha
  - LW: Vinicius Junior
- key_bench_or_rotation_options:
  - Raphinha（有出场价值，但第二轮伤情提示使其更像受控使用而非稳态首发）
  - Neymar（复出预期存在，但更适合列为不确定替补资源，不能按 confirmed 首发处理）
  - Savinho
  - Endrick
- rotation_probability:
  - heavy_rotation: low
  - partial_rotation: medium
  - attacking_line_rotation: medium
- lineup_uncertainty:
  - Raphinha 在第二轮复盘中出现伤情监测信号，首发稳定性下降。
  - Neymar 在本地球员状态中仍偏向伤疑，不宜直接写入首发。
- tactical_impact:
  - Cunha 第二轮双响后，九号位更像“冲刺终结点 + 二点接应点”，有利于把 Vinicius 的推进和倒三角转成更高质量射门。
  - 若 Raphinha 不首发，巴西右路会少一点传统边锋的纵向反复冲击，更多依赖 Rodrygo 内收和右后卫套边。
  - 若比赛后段需要净胜球或必须拿下，Neymar/Raphinha 的受控登场会提升中路最后一传密度，但也会增加反抢保护风险。
- bench_trigger_points:
  - 60 分钟后仍未领先：优先增加创造型前场资源，提升中路脚下渗透。
  - 若另一场摩洛哥领先且本场仍平：更可能从 4-3-3 切到双前锋或更激进的 4-2-3-1。
  - 若本场已领先且另一场无威胁：优先保护高负荷边锋与核心中场。
- confidence: medium

### 苏格兰预测首发

- predicted_formation: 3-4-2-1
- alternate_shapes:
  - 3-4-1-2
  - 4-2-3-1（末段搏命时）
- estimated_xi:
  - GK: Angus Gunn
  - RCB: Jack Hendry
  - CB: Scott McKenna
  - LCB: Kieran Tierney
  - RWB: Aaron Hickey
  - LWB: Andy Robertson
  - CM: Callum McGregor
  - CM: Scott McTominay
  - RAM: John McGinn
  - LAM: Ryan Christie
  - ST: Che Adams
- key_bench_or_rotation_options:
  - Lyndon Dykes
  - Tommy Conway
  - Lewis Ferguson
  - Tyler Fletcher
- rotation_probability:
  - heavy_rotation: low
  - shape_adjustment: high
  - late_dual_striker_switch: high
- lineup_uncertainty:
  - Billy Gilmour 替换信息已进入球员状态，意味着苏格兰中场控球版首发不稳定。
  - McTominay 有负荷与状态波动提示，但在结果导向比赛里仍大概率首发。
- tactical_impact:
  - Robertson/Tierney 同侧推进仍是苏格兰最清晰的持球出口，但这也会把身后空间暴露给巴西右路反击。
  - McGinn 与 McTominay 的前插、二点争抢和定位球冲击，会让苏格兰在“制造混乱”层面强于纯阵地组织。
  - 若必须追胜，Dykes 与 Adams 共存的概率上升，意味着苏格兰会更早进入直接传中和第二落点争抢模式。
- bench_trigger_points:
  - 55 到 65 分钟若仍落后或另一场比分不利：优先上双前锋，牺牲部分中场细腻性。
  - 若巴西控球过稳：可能提前用更有对抗和直塞倾向的替补打破低事件节奏。
  - 若暂时领先但另一场结果仍不够：也未必会完全回收，存在继续追求第二球的冲动。
- confidence: medium

### 战术主线

- 巴西的最大优势仍是边路推进后把球送入 Cunha/Vinicius 的终结链条；苏格兰一旦边翼卫压得过高，回防速度会被直接点名。`confidence: high`
- 苏格兰如果只踢保守中低位，创造力不足的问题会被放大，因此更可能在部分时段用高位或中前场抢二点来制造乱战。`confidence: high`
- 巴西更担心的是右路人员不确定性和前场明星资源受控使用后，比赛前 60 分钟的破密集质量不够稳定。`confidence: medium`
- 苏格兰的可迁移路径不是长期控球，而是定位球、边路传中、McTominay 后点冲击和 McGinn 二线落点。`confidence: high`
- 若比赛进入最后 20 分钟且另一场比分推动两队都要争胜，本场节奏会明显失控，巴西的转换质量通常更占优。`confidence: medium`

### 模型提示

- xg_adjustment_hint:
  - Brazil_open_play_attack: +0.2 到 +0.4
  - Scotland_transition_attack: +0.1
  - Scotland_defensive_transition_risk: +0.3 到 +0.5
- tactical_risk_tags:
  - brazil_right_side_selection_uncertainty
  - scotland_must_chase_game_risk
  - late_game_scoreboard_dependency
  - set_piece_variance_up
  - caution_on_confirmed_lineup_absence

## 摩洛哥 vs 海地

### 比赛脚本总览

- 动机框架：摩洛哥存在明确争胜和争头名动机，海地更接近无退路但也无保平价值的搅局脚本。`confidence: high`
- 同开球依赖：若巴西迟迟不领先，摩洛哥会保留更强的进攻欲望；若巴西早早建立优势，摩洛哥后段更可能转入稳态控局而非持续冒险。`confidence: medium`
- 潜在32强路径影响：摩洛哥有理由重视名次排序，因此不太像会完全收着踢；但若另一场走势友好，领先后的风险偏好会明显下降。`confidence: medium`

### 摩洛哥预测首发

- predicted_formation: 4-1-4-1
- alternate_shapes:
  - 4-3-3
  - 4-2-3-1
- estimated_xi:
  - GK: Yassine Bounou
  - RB: Achraf Hakimi
  - RCB: Nayef Aguerd
  - LCB: Romain Saiss
  - LB: Noussair Mazraoui
  - DM: Sofyan Amrabat
  - RW: Hakim Ziyech
  - RCM: Ismael Saibari
  - LCM: Azzedine Ounahi
  - LW: Brahim Diaz
  - ST: Youssef En-Nesyri
- key_bench_or_rotation_options:
  - Abde Ezzalzouli
  - Bilal El Khannouss
  - Ayoub El Kaabi
  - Sofiane Boufal
- rotation_probability:
  - heavy_rotation: low
  - selective_load_management: medium
  - fullback_minutes_management: medium_high
- lineup_uncertainty:
  - Hakimi/Mazraoui 负荷与健康在本地事实包里仍是缺口，不排除其中一人被限制时长。
  - Bounou 与 Amrabat 的最新身体状态仍缺最终赛前确认。
- tactical_impact:
  - 摩洛哥最可持续的优势是右路由 Hakimi 带动推进，Brahim Diaz 与 Saibari 负责肋部接应，形成边中转换。
  - 若对巴西那场实时比分不利，摩洛哥会更早追求第二球，而不是满足于 1 比 0 控局。
  - 若巴西领先且本场已领先，摩洛哥的控球会更偏安全传导与反击等待，不必持续高压。
- bench_trigger_points:
  - 60 分钟前未领先：增加第二冲击点或把边路突破手更早换上。
  - 已领先且另一场巴西领先：优先保护 fullback 负荷和中场屏障。
  - 若海地反击制造连续纵深威胁：可能改成更稳的双后腰保护。
- confidence: medium

### 海地预测首发

- predicted_formation: 4-2-3-1
- alternate_shapes:
  - 4-4-1-1
  - 4-3-3
- estimated_xi:
  - GK: Johny Placide
  - RB: Carlens Arcus
  - RCB: Ricardo Ade
  - LCB: Jean-Kevin Duverne
  - LB: Martin Experience
  - CM: Danley Jean Jacques
  - CM: Bryan Alceus
  - RW: Louicius Deedson
  - AM: Derrick Etienne Jr.
  - LW: Duckens Nazon
  - ST: Frantzdy Pierrot
- key_bench_or_rotation_options:
  - Leverton Pierre replacement pool
  - Mondy Prunier
  - additional pace winger depending game state
- rotation_probability:
  - heavy_rotation: medium
  - attack_line_experimentation: medium_high
  - shape_discipline_variance: high
- lineup_uncertainty:
  - Leverton Pierre 的伤退与替补替换链仍有资料缺口。
  - Nazon、Etienne 的分钟分配并不稳定，更像比赛脚本驱动型选择。
- tactical_impact:
  - 海地最现实的得分路径仍是低位回收后用 Pierrot 作支点，把第二点送给 Nazon、Deedson 或 Etienne 的前插。
  - 在已无保平价值的前提下，海地后段可能放弃过度保守，导致比赛从低事件转成交换反击。
  - 若摩洛哥先入球，海地防线站位更容易被拉散，边后卫身后和禁区前二点都会暴露。
- bench_trigger_points:
  - 落后时更可能堆叠第二速度点，而不是慢慢控球组织。
  - 若上半场能守住平局，海地可能在 60 分钟后才真正加快推进频率。
  - 若另一场巴西领先、摩洛哥收节奏，海地会得到更多反击窗口。
- confidence: low_to_medium

### 战术主线

- 摩洛哥面对海地时不需要极高控球率也能制造机会，关键在于 Hakimi/Brahim/Saibari 的肋部联动是否持续形成半空间接应。`confidence: high`
- 海地的反击威胁真实存在，但更依赖比赛被拉长、被打乱，而不是可持续阵地进攻。`confidence: high`
- 摩洛哥若过早只想着控结果，可能给海地留出更直接的冲刺空间；因此领先后的节奏管理会直接影响防守稳定性。`confidence: medium`
- 若巴西那场比分让摩洛哥需要净胜球，本场后段的边后卫压上幅度和禁区堆人会更积极，但反击保护也同步走弱。`confidence: medium`

### 模型提示

- xg_adjustment_hint:
  - Morocco_attack: +0.2 到 +0.3
  - Haiti_counter_tail_risk: +0.1 到 +0.2
  - Morocco_clean_sheet_confidence: -0.1（仅因末段动机变化和轮换负荷不确定性）
- tactical_risk_tags:
  - morocco_fullback_load_management
  - haiti_spoiler_mode_variance
  - late_game_goal_difference_chase_risk
  - same_time_scoreboard_dependency
  - caution_on_goalkeeper_fitness_confirmation

## 第三轮动机字段

- third_round_motivation_tactical_shift:
  - Brazil: 争头名与避免被另一场反超，倾向保留强首发骨架，若实时比分不利会主动提速。
  - Scotland: 出线压力推动更早搏命，阵型与换人都更进攻化。
  - Morocco: 先以争胜为主，随后根据另一场比分在“继续追净胜球”和“保护结果”之间切换。
  - Haiti: 无保平包袱，后段更可能把比赛拖入高波动反击脚本。
- rotation_shape_risk:
  - Brazil: medium
  - Scotland: medium
  - Morocco: medium
  - Haiti: medium_high
- draw_management_tendency:
  - Brazil: low_to_medium
  - Scotland: low
  - Morocco: medium
  - Haiti: low
- goal_difference_chase_risk:
  - Brazil: medium
  - Scotland: medium_high
  - Morocco: medium
  - Haiti: low
- late_game_information_risk:
  - both_matches: high

## Double-counting 提醒

- 不要把“第三轮必须争胜”与“球队本身高压/高转换风格”重复计入同一方向的极端加成。
- 不要把 Neymar/Raphinha 的名气或预期复出直接转成首发强度提升，除非 T-75 官方首发确认。
- 不要把海地已出局简单等同于“必然大轮换”；当前更合适的处理是提高战术波动和换人不确定性，而不是直接判定实力大幅下修。
