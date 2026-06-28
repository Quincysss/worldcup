# 32强 M73-M76 v3 赛前事实包｜数据采集线程

- owner: worldcup-data-collector
- phase: round_of_32_pre_match_fact_collection
- status: partial_source_limited
- captured_at: 2026-06-28T21:26:27+08:00
- boundary: 只采事实与来源；不输出比分预测、胜平负概率或投注建议。
- JSON: `data/thread_outputs/round32-m73-m76-v3-20260628/data-collector.json`

## 总体闸门

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 赛程/地点 | confirmed_current_public_schedule | 以 `round-of-32-bracket-20260628.json` 和公开赛程源为基线 |
| T-75 官方首发 | not_available_yet / not_captured_in_packet | 所有预计首发均为 `probable_not_official` |
| 中国竞彩/同源赔率链 | missing_same_source_complete_snapshot | 未核到 M73-M76 完整同源玩法链 |
| 天气/气候 | partial_source_limited | 城市/场地已落，天气工具本轮无可用返回 |
| betting_gate_status | hold_not_executable | 缺官方首发、最终伤停、完整同源赔率链 |

## M73 南非 vs 加拿大

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-06-28 12:00 host，Los Angeles Stadium，洛杉矶 |
| 槽位 | 2A vs 2B |
| 晋级来源 | 南非 A组第二；加拿大 B组第二 |
| 16强路径 | M73胜者 vs M75胜者 |

### 小组赛表现摘要

| 队伍 | 已知结果 | 趋势 |
| --- | --- | --- |
| 南非 | 墨西哥 2-0 南非；捷克 1-1 南非；南非 1-0 韩国 | 首轮受挫，第二轮靠 Mokoena 点球保命，公开队闻称末轮击败韩国晋级 |
| 加拿大 | 加拿大 1-1 波黑；加拿大 6-0 卡塔尔；瑞士 2-1 加拿大 | 第二轮大胜抬高攻击状态，第三轮负瑞士后列 B组第二 |

### 预计首发

| 队伍 | 阵型 | source_status | XI |
| --- | --- | --- | --- |
| 南非 | 3-4-2-1 | probable_not_official | Ronwen Williams；Nkosinathi Sibisi；Ime Okon；Mbekezeli Mbokazi；Khuliso Mudau；Aubrey Modiba；Teboho Mokoena；Jayden Adams；Oswin Appollis；Thalente Mbatha；Lyle Foster |
| 加拿大 | 3-4-2-1 | probable_not_official | Maxime Crépeau；Alistair Johnston；Moïse Bombito；Derek Cornelius；Tajon Buchanan；Alphonso Davies；Stephen Eustáquio；Nathan Saliba；Jonathan David；Cyle Larin；Promise David |

关键可用性：Davies、Bombito 为回归口径；Koné 严重伤情；Eustáquio 肌肉疲劳观察。南非 Mokoena 存在本地旧停赛标记与 Guardian 回归队闻冲突，T-75 必须复核。

## M74 德国 vs 巴拉圭

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-06-29 16:30 host，Boston Stadium，波士顿/福克斯堡 |
| 槽位 | 1E vs 3D |
| 晋级来源 | 德国 E组第一；巴拉圭 D组第三 |
| 16强路径 | M74胜者 vs M77胜者 |

### 小组赛表现摘要

| 队伍 | 已知结果 | 趋势 |
| --- | --- | --- |
| 德国 | 德国 7-1 库拉索；德国 2-1 科特迪瓦；厄瓜多尔 2-1 德国 | 前两轮攻击爆发，第三轮被复盘为已基本锁位后的节奏/轮换风险 |
| 巴拉圭 | 美国 4-1 巴拉圭；土耳其 0-1 巴拉圭；D组第三轮本地复盘缺失 | 首轮被打穿后防线风险上调，第二轮低比分防守与反击地板回升 |

### 预计首发

| 队伍 | 阵型 | source_status | XI |
| --- | --- | --- | --- |
| 德国 | 4-2-3-1 | probable_not_official_conflicting | Manuel Neuer；Joshua Kimmich；Jonathan Tah；Antonio Rüdiger；Nathaniel Brown；Felix Nmecha；Nadiem Amiri；Florian Wirtz；Jamal Musiala；Leroy Sané；Kai Havertz |
| 巴拉圭 | 4-4-2 | probable_not_official | Orlando Gill；Juan José Cáceres；Gustavo Gómez；Omar Alderete；Júnior Alonso；Miguel Almirón；Andrés Cubas；Matías Galarza；Diego Gómez；Isidro Pitta；Julio Enciso |

关键可用性：德国 Lennart Karl 伤缺背景已在本地 Germany player_state 中记录；Neuer/Baumann、Sané/Undav 是公开二级源争议，不是官方伤停。巴拉圭 Julio Enciso 已进入当前本地状态库，但 D组第三轮复盘仍缺。

## M75 荷兰 vs 摩洛哥

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-06-29 19:00 host，Estadio Monterrey，蒙特雷/瓜达卢佩 |
| 槽位 | 1F vs 2C |
| 晋级来源 | 荷兰 F组第一；摩洛哥 C组第二 |
| 16强路径 | M73胜者 vs M75胜者 |

### 小组赛表现摘要

| 队伍 | 已知结果 | 趋势 |
| --- | --- | --- |
| 荷兰 | 荷兰 2-2 日本；荷兰 5-1 瑞典；突尼斯 1-3 荷兰 | Brobbey/Gakpo/Summerville 多点爆发，领先后继续进球尾部要保留 |
| 摩洛哥 | 巴西 1-1 摩洛哥；苏格兰 0-1 摩洛哥；摩洛哥 4-2 海地 | 小组不败但列第二，第三轮 4-2 暴露开放度和 BTTS 尾部 |

### 预计首发

| 队伍 | 阵型 | source_status | XI |
| --- | --- | --- | --- |
| 荷兰 | 4-3-3 | probable_not_official | Bart Verbruggen；Denzel Dumfries；Virgil van Dijk；Jan Paul van Hecke；Micky van de Ven；Frenkie de Jong；Ryan Gravenberch；Tijjani Reijnders；Cody Gakpo；Brian Brobbey；Crysencio Summerville |
| 摩洛哥 | 4-2-3-1 | probable_not_official | Yassine Bounou；Achraf Hakimi；Chadi Riad；Issa Diop；Noussair Mazraoui；Azzedine Ounahi；Ayyoub Bouaddi；Ismael Saibari；Brahim Díaz；Bilal El Khannouss；Ayoub El Kaabi |

关键可用性：荷兰 Gakpo/Brobbey/Summerville 状态分高；摩洛哥 Bounou 在本地 player_state 有 minor_knock_watch，需官方赛前确认。

## M76 巴西 vs 日本

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-06-29 12:00 host，Houston Stadium，休斯敦 |
| 槽位 | 1C vs 2F |
| 晋级来源 | 巴西 C组第一；日本 F组第二 |
| 16强路径 | M76胜者 vs M78胜者 |

### 小组赛表现摘要

| 队伍 | 已知结果 | 趋势 |
| --- | --- | --- |
| 巴西 | 巴西 1-1 摩洛哥；巴西 3-0 海地；苏格兰 0-3 巴西 | C组第一，第三轮争头名高位尾部兑现 |
| 日本 | 荷兰 2-2 日本；突尼斯 0-4 日本；日本 1-1 瑞典 | 小组第二出线，上田绮世、伊东纯也、镰田大地等状态分突出 |

### 预计首发

| 队伍 | 阵型 | source_status | XI |
| --- | --- | --- | --- |
| 巴西 | 4-2-3-1 | probable_not_official | Alisson；Danilo Luiz；Marquinhos；Gabriel Magalhães；Wesley；Bruno Guimarães；Casemiro；Lucas Paquetá；Vinicius Junior；Raphinha；Matheus Cunha |
| 日本 | 3-4-2-1 | probable_not_official | Zion Suzuki；Takehiro Tomiyasu；Ko Itakura；Hiroki Ito；Yukinari Sugawara；Keito Nakamura；Kaishu Sano；Ao Tanaka；Daichi Kamada；Junya Ito；Ayase Ueda |

关键可用性：巴西本地 player_state 部分 position 字段为空，本包按名单常用角色标准化；日本第三轮复盘未完整回写官方分钟，需 T-75 前复核。

## 来源与缺口

主要来源：

- `data/outputs/knockout/round-of-32-bracket-20260628.json`
- Sky Sports 赛程页：`https://www.skysports.com/football/news/12098/13481245/world-cup-2026-fixture-schedule-and-uk-kick-off-times-day-by-day-breakdown-of-all-104-matches-including-england-scotland`
- Guardian 加拿大/南非队闻：`https://www.theguardian.com/football/2026/jun/28/alphonso-davies-returns-canada-world-cup-moment-of-destiny`
- Bavarian Football Works 德国首发讨论：`https://www.bavarianfootballworks.com/bayern-munich-coaches/222423/how-germany-should-lineup-against-paraguay`
- AP 32强上下文：`https://apnews.com/article/35a72baeef527fc815952f9b5997eb14`
- 本地 `player_state`、`roster`、成员表、小组赛复盘文件。

缺口：

- T-75 官方首发未落入本包，所有 XI 均需赛前重核。
- M73-M76 未核到完整同源中国竞彩/中国足彩网/500玩法链，不能执行投注闸门。
- 天气工具本轮无可用返回，天气字段只保留城市/场地，临场需刷新。
- A组/D组第三轮本地复盘不完整，南非/巴拉圭最终小组表现摘要部分依赖 bracket 与公开新闻。
- 多场第三轮复盘注明 player_state/member-table 仍缺官方完整分钟和同源外部评分。

