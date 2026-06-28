# 32强 M77-M80 v3 赛前事实包｜数据采集线程

- owner: worldcup-data-collector
- phase: round_of_32_pre_match_fact_collection
- status: partial_source_limited
- captured_at: 2026-06-28T22:06:14+08:00
- canonical: `data/outputs/knockout/round-of-32-bracket-20260628.json`
- boundary: 只采事实与来源；不输出比分预测、胜平负概率或投注建议。
- JSON: `data/thread_outputs/round32-m77-m80-v3-20260628/data-collector.json`

## 总体闸门

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 32强对阵 | confirmed by 2026-06-28 canonical | M80 使用英格兰 vs 刚果金，不使用旧临时英格兰 vs 塞内加尔 |
| T-75 官方首发 | not_available_yet | 8队预计首发均为 `probable_not_official` |
| 同源赔率链 | missing_same_source_complete_snapshot | 未核到 M77-M80 中国竞彩/中国足彩网/500 完整同源玩法链 |
| 天气/气候 | partial_source_limited | 城市/场地/休息天数已写，实时天气缺口保留 |
| betting_gate_status | hold_not_executable | 缺官方首发、最终伤停、完整同源赔率 |

## M77 法国 vs 瑞典

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-06-30 17:00 host，New York New Jersey Stadium |
| 槽位 | 1I vs 3F |
| 晋级来源 | 法国 I组第一；瑞典 F组第三 |
| 16强路径 | M74胜者 vs M77胜者 |

小组表现：法国 I组 9分、净胜球 +8，小组第一；第三轮 4-1 挪威凸显前场上限。瑞典首轮 5-1 突尼斯、次轮 1-5 荷兰、末轮 1-1 日本，以 F组第三晋级。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 法国 | 4-3-3 | Mike Maignan；Jules Koundé；William Saliba；Dayot Upamecano；Theo Hernández；Aurélien Tchouaméni；Adrien Rabiot；Rayan Cherki；Bradley Barcola；Kylian Mbappé；Michael Olise |
| 瑞典 | 4-4-2 | Viktor Johansson；Herman Johansson；Carl Starfelt；Hjalmar Ekdal；Daniel Svensson；Anthony Elanga；Lucas Bergvall；Yasin Ayari；Ken Sema；Alexander Isak；Viktor Gyökeres |

伤停/轮换：法国核心状态分高，边锋和中场第三人需 T-75 复核；瑞典第三轮完整分钟未完全回写，门将和中场组合需官方确认。

## M78 科特迪瓦 vs 挪威

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-06-30 12:00 host，Dallas Stadium |
| 槽位 | 2E vs 2I |
| 晋级来源 | 科特迪瓦 E组第二；挪威 I组第二 |
| 16强路径 | M76胜者 vs M78胜者 |

小组表现：科特迪瓦 1-0 厄瓜多尔、1-2 德国、2-0 库拉索，以 E组第二晋级。挪威 I组 6分、净胜球 +1，末轮 1-4 法国但仍列第二。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 科特迪瓦 | 4-3-3 | Yahia Fofana；Guela Doue；Odilon Kossounou；Emmanuel Agbadou；Ghislain Konan；Franck Kessie；Ibrahim Sangare；Seko Fofana；Amad Diallo；Evann Guessand；Simon Adingra |
| 挪威 | 4-2-3-1 | Ørjan Nyland；Julian Ryerson；Leo Østigård；Kristoffer Ajer；David Møller Wolfe；Sander Berge；Fredrik Aursnes；Martin Ødegaard；Oscar Bobb；Antonio Nusa；Erling Haaland |

伤停/轮换：Haaland 据外部报道第三轮对法国休战但预计淘汰赛回归；Ødegaard 为 fitness monitoring；科特迪瓦 Kessié/Fofana 状态稳定但右边锋和中锋排序需 T-75。

## M79 墨西哥 vs 厄瓜多尔

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-06-30 19:00 host，Mexico City Stadium |
| 槽位 | 1A vs 3E |
| 晋级来源 | 墨西哥 A组第一；厄瓜多尔 E组第三 |
| 16强路径 | M79胜者 vs M80胜者 |

小组表现：墨西哥前两轮 2-0 南非、1-0 韩国，第三轮本地完整复盘缺口仍在，但 canonical 标为 A组第一。厄瓜多尔 0-1 科特迪瓦、0-0 库拉索、2-1 德国，以 E组第三晋级。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 墨西哥 | 4-3-3 | Raúl Rangel；Israel Reyes；Johan Vásquez；Edson Álvarez；Jesús Gallardo；Érik Lira；Álvaro Fidalgo；Luis Chávez；Roberto Alvarado；Raúl Jiménez；Julián Quiñones |
| 厄瓜多尔 | 4-2-3-1 | Hernán Galíndez；Ángelo Preciado；Willian Pacho；Piero Hincapié；Pervis Estupiñán；Moisés Caicedo；Alan Franco；Pedro Vite；Gonzalo Plata；Nilson Angulo；Kevin Rodríguez |

伤停/轮换：墨西哥第三轮轮换和状态变化需更新；厄瓜多尔 Plata 第三轮制胜但本地 form_status 可能未完全反映最新赛后表现。墨西哥城海拔/主场环境需模型线程单独处理。

## M80 英格兰 vs 刚果金

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-07-01 12:00 host，Atlanta Stadium |
| 槽位 | 1L vs 3K |
| 晋级来源 | 英格兰 L组第一；刚果金 K组第三 |
| 16强路径 | M79胜者 vs M80胜者 |

小组表现：英格兰 4-2 克罗地亚、0-0 加纳、2-0 巴拿马，以 L组第一晋级。刚果金 1-1 葡萄牙、第二轮资料需复核、3-1 乌兹别克斯坦，以 K组第三进入 32强；Guardian/Sky/SB Nation 与本地 canonical 均支持 M80 为英格兰 vs 刚果金。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 英格兰 | 4-2-3-1 | Jordan Pickford；Djed Spence；Ezri Konsa；Marc Guéhi；Nico O'Reilly；Declan Rice；Elliot Anderson；Jude Bellingham；Bukayo Saka；Marcus Rashford；Harry Kane |
| 刚果金 | 4-2-3-1 | Dimitry Bertaud；Gedeon Kalulu；Chancel Mbemba；Dylan Batubinsika；Arthur Masuaku；Charles Pickel；Samuel Moutoussamy；Gael Kakuta；Meschak Elia；Yoane Wissa；Fiston Mayele |

伤停/轮换：英格兰右后卫危机突出，Jarell Quansah 脚踝伤、Reece James 缺阵，Tino Livramento 也被公开报道为缺口；刚果金 Charles Pickel 有 card watch，K组第三轮为 partial fallback 回灌，完整分钟需补。

## 主要缺口

- T-75 官方首发未捕获，所有预计首发必须赛前复核。
- 未核到 M77-M80 完整同源中国竞彩/中国足彩网/500赔率链，市场字段保持 `missing_same_source_complete_snapshot`。
- 实时天气缺口保留；仅记录场地、城市、休息天数和旅行方向。
- A组/D组/E组/F组/I组部分第三轮 player_state 仍缺官方完整分钟和同源评分。
- M80 必须固定使用 2026-06-28 canonical 的英格兰 vs 刚果金，旧临时对阵已作废。

## 来源

- `data/outputs/knockout/round-of-32-bracket-20260628.json`
- `比赛/未开始比赛/32强/32强对阵落位_20260628.md`
- SB Nation knockout tracker: `https://www.sbnation.com/fifa-world-cup/1119051/world-cup-2026-knockout-bracket-who-qualified`
- Guardian England knockout team news: `https://www.theguardian.com/football/2026/jun/28/thomas-tuchel-england-world-cup-knockouts`
- The Sun England-DR Congo route report: `https://www.thesun.ie/sport/17194817/england-world-cup-opponents-dr-congo-win/`
- NY Post Norway/Haaland report: `https://nypost.com/2026/06/27/sports/channing-tatum-joins-norway-erling-haaland-lookalikes-at-world-cup/`
- 本地 `player_state`、`roster`、成员表、小组赛复盘与线程状态。

