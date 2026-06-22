# 法国队数据摘要

## 基本信息

- 球队：法国队 / France
- FIFA code：`FRA`
- 小组：`I 组`
- 主教练：Didier Deschamps
- 数据抓取时间：`2026-06-10T17:17:42.6598363+08:00`
- 当前 phase：`team_profile`
- 当前状态：`partial`

## 赛程与基地营

- 2026-06-16 当地 15:00，法国 vs 塞内加尔，`New York New Jersey Stadium (MetLife Stadium)`，纽约/新泽西地区
- 2026-06-22 当地 15:00，法国 vs 伊拉克，`Philadelphia Stadium (Lincoln Financial Field)`，费城
- 2026-06-26 当地 15:00，挪威 vs 法国，`Boston Stadium (Gillette Stadium)`，波士顿地区

法国队官方世界杯基地营在美国波士顿。三场小组赛都在美国东海岸，跨城移动存在，但时区压力较低。第二场到第三场只有 3 天恢复时间，临赛负荷管理值得继续跟踪。

## 阵容与可用性

FFF 已确认法国队 26 人世界杯名单，当前可按 `confirmed` 处理为正式名单。

核心球员：

- Kylian Mbappe，前锋，Real Madrid
- Ousmane Dembele，前锋，Paris Saint-Germain
- Michael Olise，前锋，Bayern Munich
- Aurelien Tchouameni，中场，Real Madrid
- N'Golo Kante，中场，Al-Ittihad
- William Saliba，后卫，Arsenal
- Jules Kounde，后卫，Barcelona
- Mike Maignan，门将，AC Milan

当前伤停口径：

- 未见官方确认的世界杯名单外关键伤员。
- 未见官方停赛条目。
- 仍需继续跟踪的体能风险：
  - `William Saliba`：背部不适后已恢复训练，可记为 `probable fitness risk`
  - `Ousmane Dembele`：热身阶段有负荷管理痕迹，可记为 `probable fitness risk`
  - `Desire Doue`：热身阶段存在轮换与负荷管理迹象，可记为 `probable fitness risk`

结构性观察：

- 法国的门将、中卫、边锋与替补深度都非常充足。
- 最需要赛前确认的是边锋组合、9 号位使用方式，以及中场首发是以 Kante-Tchouameni-Rabiot 为主，还是更年轻的轮换组合。

## 近期表现

按当前已核到的最近 10 场正式/官方热身样本，法国为：

- 战绩：`8胜1平1负`
- 进球：`25`
- 失球：`9`

关键样本：

- 2025-09-05 乌克兰 0-2 法国
- 2025-11-13 法国 4-0 乌克兰
- 2026-03-26 巴西 1-2 法国
- 2026-03-29 哥伦比亚 1-3 法国
- 2026-06-04 法国 1-2 科特迪瓦
- 2026-06-08 法国 3-1 北爱尔兰

样本说明：

- 世预赛窗口里法国整体稳定，面对乌克兰、冰岛、阿塞拜疆拿分效率高。
- 2026 年 3 月连续击败巴西和哥伦比亚，说明其高强度对抗样本质量很高。
- 世界杯前最后两场热身赛呈现波动：先负科特迪瓦，再胜北爱尔兰，说明状态是强势但并非完全无波动。

## 强度指标

- FIFA 排名：`1`
- Elo：`2063`，世界第 `3`
- Opta power ranking：`暂未稳定拿到精确名次`
- Transfermarkt 阵容总身价：约 `€1.42bn`

这组指标说明法国仍处于世界杯最顶层竞争集团。

## 市场事实

以下只记录市场事实，不构成投注建议。

- FanDuel 夺冠价：`+500`，十进制 `6.00`，隐含概率 `16.67%`
- FanDuel 小组第一：`-195`，十进制 `1.5128`，隐含概率 `66.10%`
- FanDuel 小组出线 / 进淘汰赛：`-7000`，十进制 `1.0143`，隐含概率 `98.59%`

法国 vs 塞内加尔 的 1X2 快照：

- 法国：`-220`，十进制 `1.4545`，隐含概率 `68.75%`
- 平局：`+370`，十进制 `4.70`，隐含概率 `21.28%`
- 塞内加尔：`+650`，十进制 `7.50`，隐含概率 `13.33%`

市场补充：

- 现有市场快照显示法国在 I 组和全赛事期货里都处于最前列，但这里不延伸到任何预测结论。

## 数据质量

当前质量结论：`partial_live_verified`

已确认：

- 法国在 I 组
- 赛程、城市、球场、基地营、最终名单已有官方来源
- 最近 10 场样本、基础强度指标和第一版赔率市场快照已落盘

仍需赛前 24 小时复核：

- 法国 vs 塞内加尔训练名单与伤停通报
- Saliba、Dembele、Doue 的最终可用性
- 最新 1X2 / 让球 / 大小球
- 纽约/新泽西天气、湿度、体感温度

仍需 T-75m 复核：

- 官方首发与替补名单
- 边锋组合与中锋使用方式
- 中场首发三人组

## 文件位置

- 机器可读数据包：`K:\worldcup\data\packets\teams\france-team-packet.json`
- source log：`K:\worldcup\data\source_logs\france-team-source-log.json`
