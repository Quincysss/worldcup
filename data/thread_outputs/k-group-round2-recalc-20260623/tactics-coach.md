# K组第二轮补充输入后战术复核 2026-06-23

- phase: round2_recalc
- group: K
- status: partial
- created_at: 2026-06-23T16:00:00+08:00
- updated_at: 2026-06-23T16:18:00+08:00
- owner: tactics-coach
- scope: 葡萄牙 vs 乌兹别克斯坦；哥伦比亚 vs 刚果金。仅做球员状态补入后的战术复核、xG方向修正与胜平负方向是否变化，不做比分预测或投注建议。

## data_gaps

- `K:\worldcup\data\thread_outputs\k-group-round2-recalc-20260623\data-collector.md` 目前为空，未提供新增事实摘要。
- 待补：最终首发、分钟限制、赛前临场状态。
- 待补：若主线程后续补入同源首发与定位球执行顺序，需二次校正定位球 xG 分配。

## source_log

- `K:\worldcup\data\outputs\player_state\portugal-player-state.json`
- `K:\worldcup\data\outputs\player_state\uzbekistan-player-state.json`
- `K:\worldcup\data\outputs\player_state\colombia-player-state.json`
- `K:\worldcup\data\outputs\player_state\dr-congo-player-state.json`
- `K:\worldcup\data\packets\matchup_tactics\k-group-round2-tactical-refresh-20260622.json`
- `K:\worldcup\data\packets\matches\k-group-round2-data-refresh-20260622.json`
- `K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_葡萄牙_1-1_刚果金_复盘.md`
- `K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md`
- `K:\worldcup\队伍\葡萄牙\成员表.md`
- `K:\worldcup\队伍\乌兹别克斯坦\成员表.md`
- `K:\worldcup\队伍\哥伦比亚\成员表.md`
- `K:\worldcup\队伍\刚果金\成员表.md`

## 葡萄牙 vs 乌兹别克斯坦

- 战术主线：补入球员状态后，葡萄牙仍然拥有更清晰的控球推进与边路压制优势，尤其是若继续利用佩德罗-内托一侧的传中与肋部冲击，乌兹别克斯坦的边中协防仍偏被动。`confidence: high`
- 已核验事实：葡萄牙首轮真正状态上扬的并不是终结点，而是若昂-内维斯与佩德罗-内托；C罗首轮 90 分钟无直接产出，说明“名义火力”不应被直接换算成额外终结加成。这个补充会压低葡萄牙的大胜尾部，但不改主导面。`confidence: high`
- 战术推断：若葡萄牙继续把边后卫同时推高，乌兹别克斯坦的反击得分路径会比原始版本更值得保留，因为法伊祖拉耶夫、肖穆罗多夫、哈姆达莫夫的首轮状态共同强化了左路推进、二点球和反击串联。`confidence: medium`
- xG方向修正：葡萄牙总 xG 方向维持正向优势，但上修幅度不宜扩大；更合理的是“维持主优势、略降进攻上限”。乌兹别克斯坦的 xG 尾部可小幅上修，重点来自转换与二次进攻，而不是阵地战持续压制。`confidence: medium-high`
- 胜平负方向是否变化：不变化，仍保持葡萄牙为第一方向；但平局和小概率爆冷路径比仅看阵容名气时更真实，原因是乌兹别克斯坦的反击兑现点现在有了首轮状态支撑。`confidence: medium-high`
- 关键风险：葡萄牙若上半场迟迟不能通过边路传中或前场反抢建立领先，比赛会更容易进入乌兹别克斯坦愿意接受的低位防守加偷袭节奏。`confidence: medium`
- 关键风险：乌兹别克斯坦门将与后场首轮状态并未给出“出球稳定性改善”的证据，所以他们虽然更像“能进一球”的队，但还不像“能长时间稳住场面”的队。`confidence: high`

## 哥伦比亚 vs 刚果金

- 战术主线：补入球员状态后，哥伦比亚仍保留更好的边路爆点、后手换人和定位球服务质量，尤其是迪亚斯一侧的推进质量与替补端的坎帕斯、库乔冲击力，继续支持其主导比赛。`confidence: high`
- 已核验事实：哥伦比亚首轮状态最强的增益来自路易斯-迪亚斯与后手替补群，而不是全队面状抬升，因此模型不应对其总 xG 做二次过度放大，避免把首轮已体现的边路和转换优势重复计入。`confidence: high`
- 已核验事实：刚果金首轮并非只靠偶然扳平。维萨、巴坎布和五后卫体系下的二点球冲击，在球员状态补入后依然成立，说明他们的反击和定位球得分尾部应该继续保留。`confidence: high`
- 战术推断：若哥伦比亚继续压上边后卫并让中前场人数堆到左路，刚果金最现实的回应仍是 5-3-2 壳体下的直塞反击和第二落点争抢，这会让哥伦比亚的防守转换风险高于表面控球优势。`confidence: medium`
- xG方向修正：哥伦比亚 xG 质量可轻微上修，但总量不建议大幅上抬；刚果金的进球尾部不应下调，维持“存在实质性偷一个球路径”的判断更稳妥。`confidence: medium-high`
- 胜平负方向是否变化：不变化，仍保持哥伦比亚为第一方向；但刚果金的平局拖拽能力和一球摆动能力，在补入球员状态后比原始静态面板更强。`confidence: medium-high`
- 关键风险：哥伦比亚如果上半场只形成边路热闹、禁区内终结密度不足，比赛会拖入刚果金最舒服的身体对抗和定位球节奏。`confidence: medium`
- 关键风险：刚果金的主要问题仍是长时间低位后边翼卫回收深度过大，容易把二线持球点完全让给哥伦比亚；这限制了其持续压制能力，但不影响其反击爆点价值。`confidence: high`

## validation

- file_written: yes
- status_note: partial_recalc_written
- chat_handoff: 路径、状态、gaps 可直接回传主线程

## 体彩赔率后的战术复核 2026-06-23

- 依据说明：本段按 `K:\worldcup\data\thread_outputs\k-group-round2-recalc-20260623\data-collector.md` 的补充口径与主线程最新派发约束复核。若 `data-collector.md` 后续正文仍未同步到同一赔率表述，以本段所写体彩口径为当前回传版本。`confidence: medium`

### 葡萄牙 vs 乌兹别克斯坦

- 体彩复核重点：本场普通胜平负未开售，不能把 `1.14/8.24/19.04` 当作竞彩 SP 使用；当前更可用的中国侧信号是 `-2` 让球 `1.98/4.05/2.65`。这不是“葡萄牙必穿深盘”的一致定价，而是对两球以上净胜存在明显分歧。`confidence: high`
- 战术含义：这与现有战术判断一致。葡萄牙在控球、边路压制和前场持续推进上仍明显占优，但首轮显示其真正抬升的是推进与输送，不是稳定的禁区终结效率，因此不宜把优势直接外推成大比分兑现。`confidence: high`
- 战术含义：乌兹别克斯坦的真实生路仍是低位承压后靠法伊祖拉耶夫、肖穆罗多夫和二点球抢第二波，只要葡萄牙边后卫压得过高、前场久攻不下，比赛就可能停留在“葡萄牙优势明确但净胜受限”的区间。`confidence: medium-high`
- xG方向修正：维持葡萄牙总 xG 正向优势，但下调其大胜尾部；乌兹别克斯坦的进球尾部保留，不建议压到接近零。`confidence: medium-high`
- 胜平负方向修正：不改变“葡萄牙第一方向”，但要避免把深盘错读成普通胜平负的极端单边信号。`confidence: high`

### 哥伦比亚 vs 刚果金

- 体彩复核重点：普通胜平负 `1.35/3.90/7.60` 支持哥伦比亚胜面更高，但 `-1` 让球 `2.22/3.35/2.63` 明确提示穿盘并不稳，不能把“哥伦比亚优势”直接等价成“稳定净胜两球”。`confidence: high`
- 战术含义：这和比赛内容预期是匹配的。哥伦比亚仍有更好的左路爆点、定位球服务和后手换人强度，但刚果金的 5-3-2 壳体、维萨/巴坎布反击以及二点球争抢，足以把比赛拖进一球摆动区间。`confidence: high`
- 战术含义：如果哥伦比亚形成边路压制却迟迟不能在禁区内持续兑现，刚果金就会获得其最熟悉的防守反击与定位球节奏，所以 `1-1`、哥伦比亚小胜、以及刚果金靠反击制造尾部波动，都应继续保留。`confidence: medium-high`
- xG方向修正：维持哥伦比亚正向优势，但不追加过度乐观的净胜放大；刚果金反击与定位球带来的客队 xG 尾部继续保留。`confidence: medium-high`
- 胜平负方向修正：不改变“哥伦比亚第一方向”，但模型侧应同步下调其 `-1` 覆盖自信。`confidence: high`

### 模型引用的战术校准要点

- 葡萄牙 vs 乌兹别克斯坦：保留葡萄牙 `wide_channel_advantage`、`central_control_advantage` 为正，但新增 `blowout_confidence_cap`，不要把深盘误读为普通胜平负极强单边。
- 葡萄牙 vs 乌兹别克斯坦：保留乌兹别克斯坦 `transition_attack_adjustment` 小幅正向、`transition_defense_risk` 对葡萄牙为中等风险，支持“能偷一个”的尾部而非“能长期对攻”。
- 哥伦比亚 vs 刚果金：保留哥伦比亚 `transition_attack_adjustment`、`set_piece_advantage` 为正，但将 `handicap_cover_confidence` 下调一级，避免把胜面优势重复放大成穿盘优势。
- 哥伦比亚 vs 刚果金：保留刚果金 `set_piece_tail` 与 `counterattack_tail`，并在模型注释中明确“1-1 / 哥伦比亚一球胜 / 刚果金反击偷球”属于应保留的结果尾部。
- 双场共通：赔率补充没有改变 1X2 主方向，但都削弱了对“大胜、稳穿盘”的战术自信；若模型已从近况或名气端给出高净胜预期，需要加一道上限约束，避免双重加码。

<!-- cp-jc-odds-20260623:start -->
## 体彩赔率后的战术复核 2026-06-23
- 葡萄牙优势仍来自控球、边路压制和前场个人能力，但让球-2不支持把比赛写成轻松穿盘。
- 乌兹别克斯坦的现实路径是低位密集、二点球和定位球，比分预测应保留1-0与2-0并列。
- 哥伦比亚普通SPF强化胜面，但-1让球分歧要求保留刚果金反击和1-1。
- 发布边界：discussion_only / hold_for_betting，战术判断只能作为模型校准输入，不生成正式投注单。
<!-- cp-jc-odds-20260623:end -->
