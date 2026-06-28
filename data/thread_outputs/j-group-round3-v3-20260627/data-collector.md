# J组第三轮 v3 数据采集包

phase: pre_match_data_collection  
status: partial_source_limited  
generated_at: 2026-06-27T14:50:19+08:00  
owner: worldcup-data-collector  
boundary: 只采事实，不给比分预测、不输出投注建议。

## 交付文件

- JSON: `data/thread_outputs/j-group-round3-v3-20260627/data-collector.json`
- Markdown: `data/thread_outputs/j-group-round3-v3-20260627/data-collector.md`

## 赛程与场地

| 编号 | 比赛 | 北京时间 | 场地 | 来源状态 |
| --- | --- | --- | --- | --- |
| 周六071 | 阿尔及利亚 vs 奥地利 | 2026-06-28 10:00 | Kansas City Stadium | 本地预测JSON + Guardian/FIFA赛程镜像；当地开球时间需match centre复核 |
| 周六072 | 约旦 vs 阿根廷 | 2026-06-28 10:00 | Dallas Stadium | 本地预测JSON + FIFA赛程镜像；当地开球时间需match centre复核 |

T-75官方首发预计检查窗口：2026-06-28 08:45 北京时间。当前官方首发状态：missing。

## 当前积分形势

| 排名 | 球队 | 场次 | 积分 | 进球 | 失球 | 净胜球 | 数据提醒 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | 阿根廷 | 2 | 6 | 5 | 0 | +5 | 已6分，第三轮存在轮换/负荷管理信号 |
| 2 | 奥地利 | 2 | 3 | 3 | 3 | 0 | 与阿尔及利亚直接排名竞争，净胜球领先 |
| 3 | 阿尔及利亚 | 2 | 3 | 2 | 4 | -2 | 与奥地利同分但净胜球落后 |
| 4 | 约旦 | 2 | 0 | 2 | 5 | -3 | 仍需官方小组第三规则与其他组赛果复核，不在本包给晋级判断 |

## 前两轮复盘输入

- 阿根廷 3-0 阿尔及利亚：阿根廷终结效率和零封信号上修；阿尔及利亚面对顶级控场队时转换兑现不足。
- 奥地利 3-1 约旦：奥地利高压和后程冲击可用；约旦有单点反击进球路径，但防守后段抗压下修。
- 阿根廷 2-0 奥地利：阿根廷4-4-2控场，Messi 38'、90+5'进球，9'点球未进；奥地利对强队落后后的进攻转化不足。
- 约旦 1-2 阿尔及利亚：Rashdan 36'、Benbouali 69'、Gouiri 82'；Al-Taamari助攻Rashdan，Mahrez助攻Benbouali；Zerrouki黄牌后半场被换下。

## 预计首发口径

状态：probable_not_official。  
闸门：T-75官方首发发布后必须重核；核心轮换超过2人或阵型变化时，模型应重跑。  
置信度上限：官方首发前不超过 medium，本包两场均为 medium_low。

### 阿尔及利亚 vs 奥地利

阿尔及利亚预计阵型：4-3-3  
预计11人：Luca Zidane；Rafik Belghali、Aissa Mandi、Ramy Bensebaini、Rayan Ait-Nouri；Nabil Bentaleb、Ibrahim Maza、Fares Chaibi；Riyad Mahrez、Amine Gouiri、Nadhir Benbouali。

轮换候选：Anis Hadj Moussa、Ramiz Zerrouki、Mohamed Amoura、Houssem Aouar。  
主要风险：Benbouali首发还是替补未锁定；Zerrouki有纪律/分钟风险；Mahrez是否首发需官方确认。

奥地利预计阵型：4-2-3-1  
预计11人：Alexander Schlager；Konrad Laimer、Stefan Posch、Kevin Danso、David Alaba；Nicolas Seiwald、Xaver Schlager；Romano Schmid、Marcel Sabitzer、Patrick Wimmer；Michael Gregoritsch。

轮换候选：Marko Arnautovic、Alexander Prass、Paul Wanner、Philipp Lienhart。  
主要风险：Gregoritsch/Arnautovic中锋竞争；Alaba具体位置未锁定；Posch黄牌后纪律风险上调。

### 约旦 vs 阿根廷

约旦预计阵型：3-4-3  
预计11人：Yazeed Abulaila；Ihsan Haddad、Yazan Al-Arab、Abdallah Nasib；Mohannad Abu Taha、Noor Al-Rawabdeh、Nizar Al-Rashdan、Husam Abu Dahab；Musa Al-Taamari、Ali Olwan、Mahmoud Al-Mardi。

轮换候选：Mohammad Abu Zrayq、Salim Obaid、Ali Azaizeh。  
主要风险：Abu Dahab第二轮黄牌后纪律风险上调；翼卫和中卫连续承压，体能风险中等。

阿根廷预计阵型：4-4-2 / 4-3-3 rotation  
预计11人：Geronimo Rulli；Gonzalo Montiel、Nicolas Otamendi、Facundo Medina、Nicolas Tagliafico；Leandro Paredes、Enzo Fernandez、Thiago Almada、Nico Gonzalez；Julian Alvarez、Lautaro Martinez。

轮换候选：Lionel Messi、Emiliano Martinez、Alexis Mac Allister、Rodrigo De Paul、Giuliano Simeone。  
主要风险：Times of India 报道 Scaloni 将让 Messi 替补并稍后登场；这是轮换信号，不是官方首发。若 Messi T-75显示首发，进攻、定位球和节奏输入需要重跑。

## 伤停、停赛与牌风险

| 球队 | 确认伤停/停赛 | 风险与待核 |
| --- | --- | --- |
| 阿尔及利亚 | 未在本轮来源中发现新增确认伤停或停赛 | Zerrouki黄牌/半场换下，纪律与分钟风险 |
| 奥地利 | 本地player_state记录Baumgartner伤退后由Dejan Ljubicic补入名单 | Posch黄牌；Alaba minutes_monitor；中锋首发未锁定 |
| 约旦 | 未在本轮来源中发现新增确认伤停或停赛 | Abu Dahab黄牌；后防/翼卫体能风险 |
| 阿根廷 | 未在本轮来源中发现新增确认伤停或停赛 | Messi负荷管理；Paredes、Medina黄牌累计需官方牌表复核；整体轮换风险高 |

## 赔率快照

赔率只记录事实，不构成投注建议。

| 比赛 | 普通胜平负 | 让球胜平负 | 来源 | 缺口 |
| --- | --- | --- | --- | --- |
| 阿尔及利亚 vs 奥地利 | 3.35 / 2.11 / 2.80 | 阿尔及利亚+1：1.31 / 4.35 / 7.35 | 中国足彩网竞彩混合页本地快照；500.com交叉快照，captured_at 2026-06-26 | 大小球同源盘口未取得；非终盘 |
| 约旦 vs 阿根廷 | 未开售/未抓到 | 约旦+2：2.28 / 3.85 / 2.32 | 中国足彩网竞彩混合页本地快照；500.com交叉快照，captured_at 2026-06-26 | 普通胜平负缺失；大小球同源盘口未取得；非终盘 |

betting_gate_status: discussion_only_hold。

## 来源日志

- 本地规范：`README.md`、`线程状态.md`、`工作流纪律.md`、`项目架构.md`
- 技能口径：`.codex/skills/worldcup-data-collector/SKILL.md`、`.codex/skills/worldcup-quant-prediction-system/SKILL.md`
- 上一版预测：`data/outputs/match_predictions/j-group-round3-quant-prediction-20260626.json`
- 本地复盘：`比赛/已完成比赛/小组赛/J组/*.md`
- 四队状态：`data/outputs/player_state/algeria-player-state.json`、`austria-player-state.json`、`jordan-player-state.json`、`argentina-player-state.json`
- Guardian 阿尔及利亚/奥地利赛前背景：https://www.theguardian.com/football/2026/jun/26/algeria-austria-1982-world-cup-shame-of-gijon-west-germany
- Times of India 阿根廷/约旦赛前轮换信号：https://timesofindia.indiatimes.com/sports/football/fifa-world-cup/fifa-world-cup-record-breaker-lionel-messi-rested-for-argentinas-group-finale-against-jordan/articleshow/132027044.cms
- FIFA赛程镜像/本地赛程上下文：https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_qualification

## 缺口与冲突

- official_lineups: missing。T-75前两场预计首发都不能当确认首发。
- Jordan vs Argentina ordinary_spf: missing。上一版只抓到约旦+2让球胜平负。
- totals_odds: missing。未取得同源大小球盘口。
- fixture_local_time: partial_source_limited。本地稳定为北京时间2026-06-28 10:00，需官方match centre临场复核当地时间。
- Argentina lineup conflict: Times of India称Messi替补；其他公开预测摘要仍强调其核心影响。本包按“替补轮换信号”处理，T-75强制复核。
- yellow_card_accumulation: uncertain。Posch、Paredes、Medina、Zerrouki、Abu Dahab的累计停赛风险需官方牌表复核。

## 主线程提示

本包可作为 v3 预测的事实输入，但不可作为最终锁盘输入。模型线程应读取 `predicted_lineups`，同时保持 `official_lineup_gate=missing`；投注相关内容只能维持 `discussion_only_hold`。
