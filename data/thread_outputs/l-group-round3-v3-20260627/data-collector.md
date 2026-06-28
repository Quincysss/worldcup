# L组第三轮 v3 数据采集包

phase: pre_match_data_collection  
status: partial_source_limited  
generated_at: 2026-06-27T14:59:54+08:00  
owner: worldcup-data-collector  
boundary: 只采事实，不给比分预测、不输出胜平负结论、不提供投注建议。

## 交付文件

- JSON: `data/thread_outputs/l-group-round3-v3-20260627/data-collector.json`
- Markdown: `data/thread_outputs/l-group-round3-v3-20260627/data-collector.md`

## 赛程与场地

| 编号 | 比赛 | 北京时间 | 当地时间 | 场地 | 来源状态 |
| --- | --- | --- | --- | --- | --- |
| 周六067 | 克罗地亚 vs 加纳 | 2026-06-28 05:00 | 2026-06-27 17:00 ET | Philadelphia Stadium | 本地预测JSON + FIFA赛程镜像；赛前仍需match centre复核 |
| 周六068 | 巴拿马 vs 英格兰 | 2026-06-28 05:00 | 2026-06-27 17:00 ET | New York New Jersey Stadium | 本地预测JSON + Guardian/FIFA赛程镜像；赛前仍需match centre复核 |

T-75官方首发预计检查窗口：2026-06-28 03:45 北京时间。当前官方首发状态：missing。

## 当前积分形势

| 排名 | 球队 | 场次 | 积分 | 进球 | 失球 | 净胜球 | 数据提醒 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | 英格兰 | 2 | 4 | 4 | 2 | +2 | Guardian称已至少锁定32强，但仍争小组第一 |
| 2 | 加纳 | 2 | 4 | 1 | 0 | +1 | 两场零封，低位防守稳定性是核心输入 |
| 3 | 克罗地亚 | 2 | 3 | 3 | 4 | -1 | 第二轮1-0后保留竞争；老将负荷需监控 |
| 4 | 巴拿马 | 2 | 0 | 0 | 2 | -2 | 两场0-1，进攻上限不足；不在本包输出晋级判断 |

## 前两轮复盘输入

- 英格兰 4-2 克罗地亚：Kane 2球，Bellingham、Rashford进球；克罗地亚由Baturina、Musa进球。英格兰下半场强度和终结明显高于赛前预期。
- 加纳 1-0 巴拿马：Yirenkyi 90+5'制胜，Thomas-Asante助攻；Ati-Zigi在半场窗口被Asare换下，第三轮门将可用性需复核。
- 英格兰 0-0 加纳：英格兰控场但未破低位，加纳Opoku/Adjetey中卫线和二点保护质量高；James赛后治疗点已被后续Guardian更新为伤缺。
- 巴拿马 0-1 克罗地亚：Budimir 54'唯一进球，Kramaric/Budimir半场替补是胜负手；Barcenas吃黄牌，Panama中路渗透质量不足。

## 预计首发口径

状态：probable_not_official。  
闸门：T-75官方首发发布后必须重核；核心轮换超过2人或阵型变化时，模型应重跑。  
置信度上限：官方首发前不超过 medium，本包两场均为 medium_low。

### 克罗地亚 vs 加纳

克罗地亚预计阵型：3-4-2-1  
预计11人：Dominik Livakovic；Josip Sutalo、Luka Vuskovic、Josko Gvardiol；Josip Stanisic、Luka Modric、Mateo Kovacic、Ivan Perisic；Martin Baturina、Andrej Kramaric；Ante Budimir。

轮换候选：Petar Sucic、Mario Pasalic、Petar Musa、Marin Pongracic。  
主要风险：Modric连续高负荷；Budimir/Kramaric半场替补奏效后是否直接首发未有官方确认；三中卫/四后卫站位需T-75确认。

加纳预计阵型：4-4-1-1 / 4-2-3-1  
预计11人：Benjamin Asare；Caleb Yirenkyi、Jonas Adjetey、Jerome Opoku、Gideon Mensah；Antoine Semenyo、Thomas Partey、Elisha Owusu、Kamaldeen Sulemana；Jordan Ayew；Brandon Thomas-Asante。

轮换候选：Lawrence Ati-Zigi、Inaki Williams、Abdul Fatawu、Kwasi Sibo。  
主要风险：Ati-Zigi首轮被换下，Asare/Ati-Zigi门将位冲突；Partey可用性需赛前复核；Yirenkyi早段黄牌口径需官方牌表确认。

### 巴拿马 vs 英格兰

巴拿马预计阵型：5-4-1 / 4-4-2 low block  
预计11人：Orlando Mosquera；Cesar Blackman、Jose Cordoba、Jiovany Ramos、Andres Andrade、Amir Murillo；Cristian Martinez、Carlos Harvey、Jose Luis Rodriguez、Yoel Barcenas；Cecilio Waterman。

轮换候选：Jose Fajardo、Ismael Diaz、Anibal Godoy、Adalberto Carrasquilla。  
主要风险：Carrasquilla首发/出场不确定；Waterman/Fajardo中锋竞争；Blackman、Harvey、Barcenas黄牌累计需官方牌表复核。

英格兰预计阵型：4-2-3-1  
预计11人：Jordan Pickford；Ezri Konsa、John Stones、Marc Guehi、Nico O'Reilly；Kobbie Mainoo、Elliot Anderson；Bukayo Saka、Jude Bellingham、Marcus Rashford；Harry Kane。

轮换候选：Declan Rice、Noni Madueke、Morgan Rogers、Djed Spence、Ollie Watkins。  
主要风险：Guardian确认Reece James因腿筋问题缺席Panama和32强；Rice有fitness concern，Mainoo可替代；英格兰已至少出线但仍争第一，Kane/Bellingham休息幅度未锁定。

## 伤停、停赛与牌风险

| 球队 | 确认伤停/停赛 | 风险与待核 |
| --- | --- | --- |
| 克罗地亚 | 未见新增确认伤停或停赛 | Modric老将负荷；前场Budimir/Kramaric/Musa组合未锁 |
| 加纳 | 未见新增确认停赛 | Ati-Zigi可用性冲突；Partey赛前复核；Yirenkyi牌面需官方确认 |
| 巴拿马 | 未见新增确认伤停或停赛 | Blackman、Harvey、Barcenas黄牌风险；Carrasquilla首发/出场不确定 |
| 英格兰 | Reece James腿筋伤缺Panama和32强（Guardian） | Rice fitness concern；Konsa右后卫、Mainoo中场替代仍需T-75确认 |

## 赔率快照

赔率只记录事实，不构成投注建议。

| 比赛 | 普通胜平负 | 让球胜平负 | 来源 | 缺口 |
| --- | --- | --- | --- | --- |
| 克罗地亚 vs 加纳 | 1.60 / 3.05 / 5.65 | 克罗地亚-1：2.92 / 3.35 / 2.05 | 中国足彩网竞彩混合页，captured_at 2026-06-26T17:43:00+08:00 | 大小球同源盘口未取得；非终盘 |
| 巴拿马 vs 英格兰 | 未开售/未抓到 | 巴拿马+2：2.48 / 3.90 / 2.13 | 中国足彩网竞彩混合页，captured_at 2026-06-26T17:43:00+08:00 | 普通胜平负缺失；大小球同源盘口未取得；非终盘 |

betting_gate_status: discussion_only_hold。

## 来源日志

- 本地规范：`README.md`、`线程状态.md`、`工作流纪律.md`、`项目架构.md`
- 技能口径：`.codex/skills/worldcup-data-collector/SKILL.md`、`.codex/skills/worldcup-quant-prediction-system/SKILL.md`
- 模板：`data/templates/match-prediction-standard-template-v3.md`
- 上一版预测：`data/outputs/match_predictions/l-group-round3-quant-prediction-20260626.json`
- 本地复盘：`比赛/已完成比赛/小组赛/L组/*.md`
- 四队状态：`data/outputs/player_state/croatia-player-state.json`、`ghana-player-state.json`、`panama-player-state.json`、`england-player-state.json`
- Guardian 英格兰晋级/Reece James伤情：https://www.theguardian.com/football/2026/jun/27/england-through-to-last-32-of-the-world-cup-after-uruguay-exit-against-spain
- Guardian Tuchel/Panama赛前：https://www.theguardian.com/football/2026/jun/27/england-world-cup-thomas-tuchel-panama
- FIFA赛程镜像/本地赛程上下文：https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_qualification

## 缺口与冲突

- official_lineups: missing。T-75前两场预计首发都不能当确认首发。
- Panama vs England ordinary_spf: missing。上一版只抓到巴拿马+2让球胜平负。
- totals_odds: missing。未取得同源大小球盘口。
- Ghana goalkeeper: conflicting。Ati-Zigi首轮被换下，Asare预计首发仅为临时口径。
- England injuries: partial_source_limited。Guardian确认James伤缺、Rice有fitness concern，但仍需官方首发/队医最终确认。
- yellow_card_accumulation: uncertain。Blackman、Harvey、Barcenas、Yirenkyi等牌面需官方累计表复核。
- Panama training dispute: low_confidence_external_signal。搜索结果提示Waterman与Jose Luis Rodriguez训练冲突，但未稳定打开核验；只作低可信风险，不作首发硬结论。

## 主线程提示

本包可作为 v3 预测的事实输入，但不可作为最终锁盘输入。模型线程应读取 `predicted_lineups`，同时保持 `official_lineup_gate=missing`；投注相关内容只能维持 `discussion_only_hold`。
