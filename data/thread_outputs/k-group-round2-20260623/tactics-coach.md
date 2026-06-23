# K组第二轮战术/教练输出 2026-06-23

- phase: round2_match_prediction
- group: K
- status: partial
- created_at: 2026-06-23T00:00:00+08:00
- updated_at: 2026-06-23T15:52:28+08:00
- owner: tactics-coach
- scope: 葡萄牙 vs 乌兹别克斯坦；哥伦比亚 vs 刚果金。仅输出战术主线、xG方向修正、爆冷路径、关键风险与confidence，不做比分预测或投注建议。

## missing_fields

- T-75 官方首发、伤停分钟限制、临场天气与同源实时盘口未并入，本稿只作为赛前战术 partial 版本。
- 个别正式球队档案与 tactics packet 对中卫可用性存在冲突，尤其葡萄牙中卫组合需赛前再核。

## source_log

- `K:\worldcup\data\packets\matchup_tactics\k-group-round2-tactical-refresh-20260622.json`
- `K:\worldcup\data\packets\tactics\portugal-tactics-packet.json`
- `K:\worldcup\data\packets\tactics\uzbekistan-tactics-packet.json`
- `K:\worldcup\data\packets\tactics\colombia-tactics-packet.json`
- `K:\worldcup\data\packets\tactics\dr-congo-tactics-packet.json`
- `K:\worldcup\队伍\葡萄牙\正式球队档案.md`
- `K:\worldcup\队伍\葡萄牙\成员表.md`
- `K:\worldcup\队伍\乌兹别克斯坦\正式球队档案.md`
- `K:\worldcup\队伍\乌兹别克斯坦\成员表.md`
- `K:\worldcup\队伍\哥伦比亚\正式球队档案.md`
- `K:\worldcup\队伍\哥伦比亚\成员表.md`
- `K:\worldcup\队伍\刚果金\正式球队档案.md`
- `K:\worldcup\队伍\刚果金\成员表.md`
- `K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_葡萄牙_1-1_刚果金_复盘.md`
- `K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md`
- `K:\worldcup\汇总\K组第二轮战术再校准_20260622.md`
- `K:\worldcup\比赛\未开始比赛\小组赛\K组\2026-06-23_葡萄牙_vs_乌兹别克斯坦_量化预测.md`
- `K:\worldcup\比赛\未开始比赛\小组赛\K组\2026-06-23_哥伦比亚_vs_刚果金_量化预测.md`
- `K:\worldcup\汇总\战术波动因子优化_20260622.md`
- `K:\worldcup\汇总\模型参数优化方案_20260622.md`
- `K:\worldcup\汇总\预测命中率回测_20260622.md`

## 葡萄牙 vs 乌兹别克斯坦

- 战术主线：葡萄牙更可能以 `4-3-3 / 4-2-3-1` 控中路节奏，再用边路宽度和肋部传递去拉扯乌兹别克斯坦的 `3-4-2-1 / 5-4-1`；这组对位的核心不是单点爆破，而是持续把乌方翼卫压回五后卫线，让其前场支点与二前腰脱节。`confidence: high`
- 战术主线：乌兹别克斯坦真正可复制的路径不是长时间阵地推进，而是先守住前 30 分钟，依靠绍穆罗多夫的第一点、法伊祖拉耶夫的第二落点和左侧半转换偷到出手机会；一旦被迫持续高位追分，结构会明显松。`confidence: high`
- xG方向修正：葡萄牙 xG 方向偏正，上修逻辑来自边路压制、控球耐心和定位球质量，但不宜对定位球再重复加权，因为首轮高空与二点威胁已在球员状态里有所体现。`confidence: medium`
- xG方向修正：乌兹别克斯坦的常规阵地 xG 应压低，但反击与二次进攻尾部不能砍掉，尤其葡萄牙首轮已经暴露出领先后未能继续拉开、且回防二点保护不够彻底的问题。`confidence: medium`
- 爆冷路径：乌兹别克斯坦若能把比赛拖成深五后卫、低节奏、传中堆积但禁区高质量触球不多的比赛，再利用定位球或一次葡萄牙边后卫身后空当制造高价值机会，就能把强弱差缩到一球波动区间。`confidence: medium`
- 关键风险：葡萄牙的风险点是热门方控场不等于扩大比分、前场压迫因中锋站位而减速、边后卫压上后身后空间、以及中卫可用性信息存在冲突；乌兹别克斯坦的风险点是受压出球不稳、翼卫身后、以及一旦扳平或落后后转入开放比赛会迅速掉出舒适区。`confidence: high`

## 哥伦比亚 vs 刚果金

- 战术主线：哥伦比亚最稳定的进攻主线仍是 `4-2-3-1` 下左路单挑加中路输送，路易斯-迪亚斯的带爆能力、J 罗的前场服务和右侧后插上形成不对称打击；这比葡萄牙那种慢速控场更容易直接拉扯刚果金的横向移动。`confidence: high`
- 战术主线：刚果金首轮对葡萄牙已经证明自己能在 `5-3-2 / 5后卫` 壳体内把比赛拖进身体对抗和二点球争夺，再靠维萨、巴坎布的直线冲击和定位球二次进攻制造威胁；他们不需要太多控球，也能保留得分尾部。`confidence: high`
- xG方向修正：哥伦比亚 xG 方向小幅偏正，但上修应克制，因为迪亚斯、J 罗、替补后手和边路优势在既有模型与首轮球员状态里已有重叠；更合理的是把进球质量向边路反击和替补后段倾斜，而不是简单继续抬总量。`confidence: medium`
- xG方向修正：刚果金 xG 不宜压得过低，首轮已验证其反击和定位球的可重复性；只要维萨、巴坎布、姆本巴的出场角色完整，他们的进球尾部应被保留。`confidence: medium`
- 爆冷路径：刚果金若能用五后卫和中路堆人限制 J 罗舒适出球，把比赛切成碎片化对抗，再针对哥伦比亚边后卫前压后的回防距离打身后，配合定位球二点，就有把比赛拖向低容错肉搏局的机会。`confidence: medium`
- 关键风险：哥伦比亚的风险是低位密集防守下过度依赖迪亚斯单点、J 罗体能与节奏下降后创造力变薄、以及边路压上后给对手反击通道；刚果金的风险是第一脚出球被压死、弱侧保护不足、以及持续应对哥伦比亚两翼宽度时体能和犯规数上升。`confidence: high`

## validation

- file_written: yes
- encoding_target: UTF-8
- json_validation: not_applicable_markdown
- next_refresh_trigger: 待 T-75 首发、伤停分钟限制和临场盘口到位后，可把 `status` 从 `partial` 升级到赛前终版。
