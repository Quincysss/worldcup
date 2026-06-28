# J/K/L组三轮 75元 discussion_only 方案数据采集包

- 采集身份：worldcup-data-collector
- 采集时间：2026-06-27T15:22:04+08:00
- 在线复核时间：2026-06-27T15:25:09+08:00
- 输出边界：只记录赛程、赔率可得性、来源冲突与数据闸门；不提供比分预测、胜平负结论、投注建议或金额分配。
- 全局执行闸门：`hold_not_executable`
- 讨论闸门：`discussion_only_hold`

## 全局闸门

| 闸门 | 状态 | 说明 |
|---|---|---|
| T-75官方首发 | missing | 六场均未取得官方首发，不能执行临场方案。 |
| 最新伤停/停赛/分钟限制 | partial_source_limited | 已读取预测与线程输出中的风险项，但缺最终官方确认。 |
| 官方中国竞彩完整链 | partial_local_snapshot | 有500本地快照与中国足彩网在线复核，但不是完整终盘链。 |
| 同源完整赔率 | incomplete | 普通胜平负/让球胜平负有部分赔率；比分、总进球、半全场只有active标记，未捕获具体赔率。 |
| 来源一致性 | conflicting | 中国足彩网在线复核与本地500快照在同市场赔率上存在数值差异。 |

## 赛程与市场可得性

| 编号 | 比赛 | 北京时间 | 场地 | 普通胜平负 | 让球胜平负 | 比分 | 总进球 | 半全场 | 市场闸门 |
|---|---|---:|---|---|---|---|---|---|---|
| 周六067 | 克罗地亚 vs 加纳 | 2026-06-28 05:00 | Philadelphia Stadium | 有赔率；500: 1.60/3.05/5.65；中国足彩网: 1.64/3.05/5.20 | 有赔率；500: -1 2.92/3.35/2.05；中国足彩网: -1 3.25/3.15/1.99 | active无赔率 | active无赔率 | active无赔率 | hold_not_executable |
| 周六068 | 巴拿马 vs 英格兰 | 2026-06-28 05:00 | New York New Jersey Stadium | 未开售/未抓到 | 有赔率；500: +2 2.48/3.90/2.13；中国足彩网: +2 2.60/4.00/2.02 | active无赔率 | active无赔率 | active无赔率 | hold_not_executable |
| 周六069 | 哥伦比亚 vs 葡萄牙 | 2026-06-28 07:30 | Hard Rock Stadium, Miami Gardens | 有赔率；500: 4.23/3.28/1.70；中国足彩网: 3.50/3.68/1.75 | 有赔率；500: +1 1.90/3.45/3.20；中国足彩网: +1 1.85/3.62/3.20 | active无赔率 | active无赔率 | active无赔率 | hold_not_executable |
| 周六070 | 刚果金 vs 乌兹别克斯坦 | 2026-06-28 07:30 | Mercedes-Benz Stadium, Atlanta | 有赔率；500: 1.67/3.82/3.72；中国足彩网: 1.50/3.96/4.75 | 有赔率；500: -1 3.10/3.45/1.94；中国足彩网: -1 2.71/3.25/2.21 | active无赔率 | active无赔率 | active无赔率 | hold_not_executable |
| 周六071 | 阿尔及利亚 vs 奥地利 | 2026-06-28 10:00 | Kansas City / Arrowhead Stadium | 有赔率；500: 3.35/2.11/2.80；中国足彩网: 3.54/2.07/2.75 | 有赔率；500: +1 1.31/4.35/7.35；中国足彩网: +1 1.33/4.30/6.90 | active无赔率 | active无赔率 | active无赔率 | hold_not_executable |
| 周六072 | 约旦 vs 阿根廷 | 2026-06-28 10:00 | Dallas / AT&T Stadium | 未开售/未抓到 | 有赔率；500: +2 2.28/3.85/2.32；中国足彩网: +2 2.52/3.90/2.10 | active无赔率 | active无赔率 | active无赔率 | hold_not_executable |

## market_availability

| 分类 | 玩法/场次 | 说明 |
|---|---|---|
| candidate_pool_with_odds | 普通胜平负：周六067、069、070、071 | 有具体赔率，但仍受T-75、最终伤停和同源终盘校验限制。 |
| candidate_pool_with_odds | 让球胜平负：周六067-072 | 六场均有具体让球赔率；本地500与中国足彩网存在数值差异。 |
| observe_only_active_no_odds | 比分、总进球、半全场：周六067-072 | 500快照显示active，但未捕获具体赔率，不能进入候选池。 |
| missing_or_not_open | 普通胜平负：周六068、072 | 本地500与中国足彩网均未给普通胜平负赔率。 |
| missing_or_not_open | 大小球/over-under dxq：周六067-072 | 500快照标记为0，未开售或不支持。 |

## T-75、伤停与轮换风险

| 比赛 | 官方首发闸门 | 伤停/停赛/轮换风险 |
|---|---|---|
| 克罗地亚 vs 加纳 | missing | 加纳 Ati-Zigi/Asare 门将口径冲突；Partey可用性待复核；克罗地亚 Modric负荷、Budimir/Kramaric/Musa前场组合未锁。 |
| 巴拿马 vs 英格兰 | missing | Reece James腿筋伤缺；Declan Rice fitness concern；英格兰晋级后仍争小组第一，Kane/Bellingham分钟不确定；Panama Carrasquilla不确定。 |
| 哥伦比亚 vs 葡萄牙 | missing | 葡萄牙前场轮换风险；哥伦比亚打平可锁第一的节奏管理；哥伦比亚 Suarez/Cordoba中锋口径冲突。 |
| 刚果金 vs 乌兹别克斯坦 | missing | 刚果金 5-3-2/4-3-3 阵型冲突；乌兹别克斯坦边翼卫和中场调整；防线连续失球后首发变化待确认。 |
| 阿尔及利亚 vs 奥地利 | missing | 阿尔及利亚前场组合未锁；Zerrouki纪律/分钟风险；奥地利 Gregoritsch/Arnautovic中锋竞争；Alaba minutes_monitor。 |
| 约旦 vs 阿根廷 | missing | Messi替补/轮换信号；Cristian Romero负荷/伤情疑问；阿根廷多位置轮换；约旦 Abu Dahab黄牌纪律风险。 |

## 来源冲突与缺口

- 500本地快照来源：`data/tmp_500_jczq_20260626.html`，来源URL `https://trade.500.com/jczq/?playid=269&g=2&date=2026-06-27`。
- 中国足彩网本地快照来源：`data/tmp_zgzcw_jcmini_20260626.html`，来源URL `https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini`。
- 中国足彩网在线复核可访问，但与本地500快照在普通胜平负/让球胜平负赔率上存在同市场数值差异，已保留为冲突。
- 六场均缺T-75官方首发。
- 六场缺最终官方伤停、停赛、黄牌累计与分钟限制闭合。
- 周六068、周六072普通胜平负未开售或未抓到。
- 比分、总进球、半全场只有active标记，没有同源具体赔率。
- 当前数据只能支持 discussion_only 事实讨论，不能支持执行型方案。

## 结论

本数据包已完成 J/K/L 三组第三轮六场的赛程、竞彩编号、开售状态、普通胜平负/让球胜平负赔率快照、玩法可得性、T-75闸门、伤停/轮换风险和来源冲突记录。由于官方首发缺失、赔率同源链不完整、比分/总进球/半全场缺具体赔率，整体保持 `gate=hold_not_executable`。
