# H组第三轮战术与预测首发

- phase: group_round3_tactics_predicted_lineups
- group: H
- status: partial
- created_at: 2026-06-25T00:00:00+08:00
- updated_at: 2026-06-25T14:54:08.0259571+08:00
- owner: tactics-coach
- scope: H组第三轮两场比赛的战术判断、预测首发、轮换风险、黄牌/停赛风险、节奏因子
- predicted_lineup_status: estimated
- official_t_minus_75_lineups: unavailable
- model_entry_ready: yes_with_caution

## 小组上下文

- 已知积分形势：西班牙4分，乌拉圭2分，佛得角2分，沙特1分。
- 两场同时开球，末段策略会明显受另一场比分驱动，`late_game_information_risk` 不能忽略。
- 已核验样本指向：
  - 西班牙第二轮 4比0 沙特，说明其并非只能慢控，早破门后具备控节奏和管理比赛能力。
  - 佛得角连续逼平西班牙、乌拉圭，低位纪律、定位球与情绪韧性应视为真实强项。
  - 乌拉圭的高压迫和纵向冲击保留，但防线波动、门将稳定性和回防管理风险上升。
  - 沙特面对顶级压迫时的出球与禁区横移已被放大暴露。
- 黄牌/停赛风险说明：
  - 本地资料已见首轮黄牌：Pedri、Sidny Lopes、Abdulelah Al-Amri。
  - 但累计停赛阈值与第二轮新增牌面未在当前包中完全核验，所以这里只能作为“对抗强度管理风险”，不能写成确认停赛。

## 佛得角 vs 沙特

- confidence: medium
- 预测阵型：
  - 佛得角：4-2-3-1，退防时常收成5-4-1。
  - 沙特：5-4-2 或 5-4-1，若落后会更像3-4-2-1前压。
- 预测首发XI：
  - 佛得角：Vozinha；Steven Moreira，Pico，Diney，Sidny Lopes Cabral；Kevin Pina，Laros Duarte；Ryan Mendes，Jamiro Monteiro，Jovane Cabral；Dailon Livramento。
  - 沙特：Mohammed Al-Owais；Saud Abdulhamid，Hassan Tambakti，Abdulelah Al-Amri，Moteb Al-Harbi，Mohammed Abu Al-Shamat；Abdullah Al-Khaibari，Mohamed Kanno，Musab Al-Juwayr；Salem Al-Dawsari，Firas Al-Buraikan。
- 首发可信度：
  - 佛得角中等偏高，最大不确定点是 Logan Costa 是否回到首发。
  - 沙特中等，右路是 Saud Abdulhamid 继续站边翼卫还是与 Abu Al-Shamat分工调整。
- 关键替补与触发点：
  - 佛得角：Helio Varela、Willy Semedo、Nuno da Costa、Joao Paulo。若领先，优先补边路跑动和禁区保护；若落后，Helio Varela更可能提前上。
  - 沙特：Nasser Al-Dawsari、Saleh Al-Shehri、Ayman Yahya、Nawaf Boushal。若60分钟后仍未领先，前场会更早双前锋化，边翼卫压得更高。
- 关键对位：
  - Kevin Pina/定位球质量 vs 沙特禁区二点保护。
  - Ryan Mendes 的反击持球 vs Moteb Al-Harbi 身后空间。
  - Salem Al-Dawsari 内收接球 vs 佛得角右侧 Moreira/Pico 的协防。
- 战术主线：
  - 佛得角已用两场证明自己能把比赛拖进低事件区间，先守中路、再靠定位球和边路反击找一下机会，依然是最合理剧本。
  - 沙特平局价值很低，理论上更需要主动提速；这会直接提高其翼卫前压频率，也会把后场横向保护暴露出来。
  - 佛得角最适合打沙特的方式不是高压，而是中低位收缩后逼对手把球送到边路和二点，再利用 Kevin Pina 与 Ryan Mendes 的第一脚出球反击。
  - 沙特若不能早早把佛得角压回禁区，比赛越往后越容易变成自己阵型被拉长、被定位球或反击偷一下的局面。
- 轮换与风险：
  - 佛得角：Vozinha高龄连续高负荷、Sidny Lopes有已核验黄牌、Logan Costa若回归首发存在分钟和状态不确定性。
  - 沙特：Abdulelah Al-Amri有已核验首轮黄牌；第二轮惨败后中卫线心理和落点稳定性存在回摆风险。
- 节奏因子：
  - 前60分钟不宜把总节奏上修过头，佛得角有明显把比赛做“碎”的能力。
  - 如果另一场消息显示平局无意义，沙特后30分钟会显著提速，比赛尾部的对攻和定位球波动才会放大。
- xG方向修正建议：
  - 常规基线：维持偏低事件，不因佛得角两场拿分就机械上修其开放战攻击。
  - 若沙特半场后仍未领先：总xG尾部可上调约 `+0.20 ~ +0.35`，主要来自沙特压上与佛得角反击的双向增量。
  - 佛得角定位球xG可小幅上修 `+0.05 ~ +0.10`；沙特阵地战持续破低位能力不宜过度高估。
- double-counting 提醒：
  - 不要把“佛得角连续逼平强队”同时重复计入防守下限、门将超常、定位球和心理属性四次。
  - 不要把“沙特0比4负西班牙”直接线性外推为对任何中低位球队都失控；那场的压迫环境与佛得角完全不同。

## 乌拉圭 vs 西班牙

- confidence: medium
- 预测阵型：
  - 乌拉圭：4-2-3-1，可在高压阶段转成4-3-3。
  - 西班牙：4-3-3，必要时用 Olmo/Merino 增加肋部推进和二点高度。
- 预测首发XI：
  - 乌拉圭：Fernando Muslera；Guillermo Varela，Ronald Araujo，Jose Maria Gimenez，Mathias Olivera；Manuel Ugarte，Rodrigo Bentancur；Agustin Canobbio，Federico Valverde，Maximiliano Araujo；Darwin Nunez。
  - 西班牙：Unai Simon；Marcos Llorente，Pau Cubarsi，Aymeric Laporte，Marc Cucurella；Rodri，Pedri，Fabian Ruiz；Lamine Yamal，Mikel Oyarzabal，Nico Williams。
- 首发可信度：
  - 乌拉圭中等偏低，门将与中卫组合是最大不确定点；Rochet、Caceres、De la Cruz 都有进入首发的现实可能。
  - 西班牙中等偏高，最大变数在于 Yamal/Nico 是否继续管理分钟，以及 Olmo/Merino 是否替代一名边锋或中场首发。
- 关键替补与触发点：
  - 乌拉圭：Nicolas de la Cruz、Federico Vinas、Juan Manuel Sanabria、Brian Rodriguez。若需要更多控球，会提前上 De la Cruz；若必须追球，会更早双前锋或双边锋冲击。
  - 西班牙：Dani Olmo、Mikel Merino、Martin Zubimendi、Ferran Torres。若前场跑位被乌拉圭高压切断，Olmo 与 Merino 是最快改变禁区占位和二点争夺的手段。
- 关键对位：
  - Valverde/Ugarte 的前抢强度 vs Rodri/Pedri 第一脚摆脱。
  - Yamal 与 Nico 的边路一对一 vs 乌拉圭边后卫和回收边锋。
  - Darwin 的背身与身后冲击 vs Spain 双中卫转身速度。
  - 西班牙左后卫高位占位 vs Uruguay 右路反击通道。
- 战术主线：
  - 乌拉圭在积分上更需要主动压迫，Bielsa 大概率不会接受纯控场平局，前60分钟的逼抢线和第二落点争夺应更积极。
  - 西班牙不能因为4分在手就大幅轮换，否则会把比赛主动交给乌拉圭的强对抗节奏；更可能是“强首发 + 分钟管理”，而不是大面积保留。
  - 乌拉圭的最佳进攻路径仍是高压后的快速直塞、Valverde中路带球推进、以及 Darwin/Maxi Araujo 的身后冲击。
  - 西班牙的最佳路径则是顶住第一波压迫后迅速把球打到边路单挑和肋部第三人，迫使乌拉圭边后卫与中卫之间出现保护裂缝。
  - 若另一场实时比分让平局对其中一方失去价值，最后25分钟这场会明显转向高波动模式。
- 轮换与风险：
  - 乌拉圭：Darwin 首轮半场被换、Canobbio 有过大腿接触背景、Muslera 第二轮门线与高球稳定性被下修。
  - 西班牙：Yamal/Nico 存在已知管理分钟背景；Pedri 首轮已见黄牌，若累计阈值接近但未核实，末段对抗强度可能会收。
- 节奏因子：
  - 乌拉圭主观提速意愿更强，西班牙则更擅长在领先后把比赛拖回自己熟悉的球权管理。
  - 如果西班牙先入球，乌拉圭会把比赛迅速推向更直接、更不稳定的交换回合。
  - 如果长时间0比0，而另一场消息对西班牙有利，西班牙可能明显降低冒险传递，转为 draw management。
- xG方向修正建议：
  - 与第二轮相比，不要把西班牙 4比0 沙特的进攻兑现率完整迁移到本场；乌拉圭的压迫和身体对抗强度更高。
  - 若乌拉圭必须追分：总xG波动可上调 `+0.25 ~ +0.40`，主要来自转换进攻和二次进攻。
  - 若西班牙在另一场比分帮助下接受平局：西班牙开放战xG可小幅下调 `-0.10 ~ -0.20`，但防守端失误概率未必同步下降。
- double-counting 提醒：
  - 不要同时把“乌拉圭高压迫”重复记为进攻强度、比赛节奏、爆冷能力和总进球倾向四个独立满额利好。
  - 不要因为西班牙第二轮大胜就忽略其首轮对低位和强对抗切换时仍可能出现的节奏断层。

## source_log

- 本地复盘：`比赛/已完成比赛/小组赛/H组/H组第一轮复盘.md`
- 本地复盘：`比赛/已完成比赛/小组赛/H组/H组第二轮复盘.md`
- 本地复盘：`比赛/已完成比赛/小组赛/H组/2026-06-15_西班牙_0-0_佛得角_复盘.md`
- 本地复盘：`比赛/已完成比赛/小组赛/H组/2026-06-15_沙特_1-1_乌拉圭_复盘.md`
- 本地复盘：`比赛/已完成比赛/小组赛/H组/2026-06-21_乌拉圭_2-2_佛得角_复盘.md`
- 本地复盘：`比赛/已完成比赛/小组赛/H组/2026-06-21_西班牙_4-0_沙特_复盘.md`
- 量化回看：`data/outputs/match_predictions/h-group-round2-postmortem-20260622.json`
- 量化修订：`data/outputs/match_predictions/h-group-round2-quant-revision-20260621.json`
- 球队资料：`队伍/佛得角/成员表.md`
- 球队资料：`队伍/沙特/成员表.md`
- 球队资料：`队伍/乌拉圭/成员表.md`
- 球队资料：`队伍/西班牙/成员表.md`
- 球员状态：`data/outputs/player_state/cape-verde-player-state.json`
- 球员状态：`data/outputs/player_state/saudi-arabia-player-state.json`
- 球员状态：`data/outputs/player_state/uruguay-player-state.json`
- 球员状态：`data/outputs/player_state/spain-player-state.json`

## missing_fields

- T-75 官方首发仍不可得，当前全部为预测首发。
- 四队第二轮逐人完整分钟与同源牌面仍有局部缺口。
- 黄牌累计停赛阈值未在当前包里完成最终核验。
- 末轮同步开球后的 live-score 触发策略只能做情景分析，无法在赛前固化为单一路径。
