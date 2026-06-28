# 32强 M81-M84 v3 赛前事实包｜数据采集线程

- owner: worldcup-data-collector
- phase: round_of_32_pre_match_fact_collection
- status: partial_source_limited
- captured_at: 2026-06-28T22:41:40+08:00
- canonical: `data/outputs/knockout/round-of-32-bracket-20260628.json`
- boundary: 只采事实与来源；不输出比分预测、胜平负概率或投注建议。
- JSON: `data/thread_outputs/round32-m81-m84-v3-20260628/data-collector.json`

## 总体闸门

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 32强对阵 | confirmed by 2026-06-28 canonical | M81-M84 全部使用赛果复核后的 canonical 表 |
| T-75 官方首发 | not_available_yet | 8队预计首发均为 `probable_not_official` |
| 同源赔率链 | missing_same_source_complete_snapshot | 未核到 M81-M84 中国竞彩/中国足彩网/500 完整同源玩法链 |
| 天气/气候 | partial_source_limited | 场地、城市、休息天数和旅行方向已写；实时天气缺口保留 |
| betting_gate_status | hold_not_executable | 缺官方首发、最终伤停、完整同源赔率 |

## M81 美国 vs 波黑

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-07-01 17:00 host，San Francisco Bay Area Stadium，圣克拉拉/旧金山湾区 |
| 槽位 | 1D vs 3B |
| 晋级来源 | 美国 D组第一；波黑 B组第三 |
| 16强路径 | M81胜者 vs M82胜者 |

小组表现：美国前两轮 4-1 巴拉圭、2-0 澳大利亚，公开源称末轮负土耳其但仍获 D组第一；波黑 1-1 加拿大、1-4 瑞士、3-1 卡塔尔，以 B组第三晋级。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 美国 | 4-2-3-1 | Matt Freese；Alex Freeman；Chris Richards；Tim Ream；Antonee Robinson；Tyler Adams；Weston McKennie；Malik Tillman；Giovanni Reyna；Álex Zendejas；Folarin Balogun |
| 波黑 | 4-2-3-1 | Nikola Vasilj；Amar Dedić；Emin Mahmić；Stjepan Radeljić；Sead Kolašinac；Amir Hadžiahmetović；Denis Huseinbašić；Ivan Bašić；Esmir Bajraktarević；Kerim Alajbegović；Luka Kulenović |

伤停/轮换：美国 D组第三轮完整本地复盘缺失，第三轮负荷需重核；波黑 player_state 为 core partial，第三轮逐人分钟和牌面需补。

## M82 比利时 vs 塞内加尔

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-07-01 13:00 host，Seattle Stadium，西雅图 |
| 槽位 | 1G vs 3I |
| 晋级来源 | 比利时 G组第一；塞内加尔 I组第三 |
| 16强路径 | M81胜者 vs M82胜者 |

小组表现：比利时第二轮 0-0 伊朗，第三轮 5-1 新西兰后列 G组第一；塞内加尔第三轮 5-0 伊拉克，以 I组第三晋级。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 比利时 | 4-2-3-1 | Thibaut Courtois；Timothy Castagne；Zeno Debast；Arthur Theate；Alexis Saelemaekers；Amadou Onana；Youri Tielemans；Kevin De Bruyne；Jeremy Doku；Leandro Trossard；Charles De Ketelaere |
| 塞内加尔 | 4-3-3 | Édouard Mendy；Krépin Diatta；Moussa Niakhaté；Abdoulaye Seck；El Hadji Malick Diouf；Idrissa Gueye；Lamine Camara；Pape Matar Sarr；Ibrahim Mbaye；Iliman Ndiaye；Nicolas Jackson |

伤停/轮换：比利时第三轮 5-1 后逐人状态未完全结构化；塞内加尔 5-0 伊拉克的逐人完整分钟和牌面未完全回写。

## M83 葡萄牙 vs 克罗地亚

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-07-02 19:00 host，Toronto Stadium，多伦多 |
| 槽位 | 2K vs 2L |
| 晋级来源 | 葡萄牙 K组第二；克罗地亚 L组第二 |
| 16强路径 | M83胜者 vs M84胜者 |

小组表现：葡萄牙 1-1 刚果金、第二轮资料需复核、0-0 哥伦比亚后列 K组第二；克罗地亚 2-4 英格兰、1-0 巴拿马、2-1 加纳后列 L组第二。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 葡萄牙 | 4-2-3-1 | Diogo Costa；Diogo Dalot；Rúben Dias；Renato Veiga；João Cancelo；Rúben Neves；João Neves；Bruno Fernandes；Pedro Neto；Rafael Leão；Gonçalo Ramos |
| 克罗地亚 | 4-2-3-1 | Dominik Livakovic；Josip Stanisic；Josip Sutalo；Josko Gvardiol；Ivan Perisic；Mateo Kovacic；Luka Modric；Nikola Vlasic；Petar Sucic；Martin Baturina；Ante Budimir |

伤停/轮换：葡萄牙第三轮 0-0 回灌为 partial，前场排序需 T-75；克罗地亚 Kovacic 末轮 80分钟下场，需确认是否负荷管理，Modric/Vlasic/Sucic 状态分高。

## M84 西班牙 vs 奥地利

| 字段 | 内容 |
| --- | --- |
| 时间/地点 | 2026-07-02 12:00 host，Los Angeles Stadium，洛杉矶 |
| 槽位 | 1H vs 2J |
| 晋级来源 | 西班牙 H组第一；奥地利 J组第二 |
| 16强路径 | M83胜者 vs M84胜者 |

小组表现：西班牙首轮 4-0 沙特，末轮 1-0 乌拉圭，以 H组第一晋级；奥地利末轮 3-3 阿尔及利亚，以 J组第二晋级。

预计首发状态：两队均 `probable_not_official`。

| 队伍 | 阵型 | XI |
| --- | --- | --- |
| 西班牙 | 4-3-3 | Unai Simón；Marcos Llorente；Pau Cubarsí；Aymeric Laporte；Marc Cucurella；Rodri；Martín Zubimendi；Pedri；Lamine Yamal；Nico Williams；Mikel Oyarzabal |
| 奥地利 | 4-2-3-1 | Alexander Schlager；Konrad Laimer；Kevin Danso；Philipp Lienhart；Phillipp Mwene；Nicolas Seiwald；Xaver Schlager；Marcel Sabitzer；Patrick Wimmer；Alexander Prass；Saša Kalajdžić |

伤停/轮换：西班牙 Yamal、Nico Williams 为 recent_muscle_issue_managed，不等于缺阵但需确认分钟限制；奥地利 Alaba、Arnautović 为 fitness watch，需赛前队闻复核。

## 主要缺口

- T-75 官方首发未捕获，所有预计首发必须赛前复核。
- 未核到 M81-M84 完整同源中国竞彩/中国足彩网/500 赔率链，市场字段保持 `missing_same_source_complete_snapshot`。
- 实时天气缺口保留；仅记录场地、城市、休息天数和旅行方向。
- 美国、比利时、塞内加尔、西班牙等队第三轮 player_state 对完整分钟/同源评分仍是 partial。
- M83 必须固定使用 2026-06-28 canonical 的葡萄牙 vs 克罗地亚，旧临时葡萄牙 vs 加纳已作废。

## 来源

- `data/outputs/knockout/round-of-32-bracket-20260628.json`
- `比赛/未开始比赛/32强/32强对阵落位_20260628.md`
- SB Nation Round of 32 schedule: `https://www.sbnation.com/soccer/1120771/world-cup-schedule-scores-round-32`
- SB Nation knockout tracker: `https://www.sbnation.com/fifa-world-cup/1120327/2026-world-cup-round-of-32-full-list-of-matches-potential-round-of-16-games`
- AP Round of 32 context: `https://apnews.com/article/35a72baeef527fc815952f9b5997eb14`
- 本地 `player_state`、`roster`、成员表、小组赛复盘与线程状态。

