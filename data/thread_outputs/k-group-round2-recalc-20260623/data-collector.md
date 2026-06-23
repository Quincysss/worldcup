# K组第二轮补充输入后复核重算

- phase: pre_match_data_collection_recalc
- group: K组
- status: partial
- created_at: 2026-06-23T15:57:00+08:00
- updated_at: 2026-06-23T16:18:06.1454600+08:00
- owner: worldcup-data-collector
- scope: 2026-06-23 葡萄牙 vs 乌兹别克斯坦、哥伦比亚 vs 刚果金 赛前补充数据复核；仅采集事实，不做预测
- missing_fields:
  - 中国体彩同源即时赔率页面未取到
  - 稳定同源亚洲让球/大小球未取到
  - 官方 T-75m 首发未发布
  - 最新官方伤停/停赛公报不足
  - 四队 player-state JSON 当前均不可直接解析
- source_log:
  - source: local_match_packet
    url: K:\worldcup\data\packets\matches\k-group-round2-data-refresh-20260622.json
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [赛程, 场地, 首轮后积分形势, 旅行, 休息日, 环境背景, 本地已知伤停口径]
    source_status: confirmed_local_input
  - source: times_of_india_match_report
    url: https://timesofindia.indiatimes.com/sports/football/fifa-world-cup/fifa-world-cup-will-ronaldo-be-benched-against-uzbekistan-portugal-coach-keeps-starting-xi-under-wraps/articleshow/131925539.cms
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [葡萄牙预计首发不确定, Ronaldo首发口径, Martinez赛前发言]
    source_status: partial_current
  - source: houston_chronicle_matchday
    url: https://www.houstonchronicle.com/world-cup/article/portugal-uzbekistan-fanwalk-22314479.php
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [葡萄牙vs乌兹别克斯坦比赛日本地时间, 休斯敦比赛日背景]
    source_status: partial_current
  - source: houston_chronicle_weather
    url: https://www.houstonchronicle.com/news/houston-weather/forecast/article/houston-heat-dome-builds-22314041.php
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [休斯敦高温高湿, 热浪背景]
    source_status: partial_current
  - source: chron_weather
    url: https://www.chron.com/weather/article/texas-thunderstorms-heat-summer-22314149.php
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [休斯敦体感温度偏高]
    source_status: partial_current
  - source: china_odds_attempt_sporttery
    url: https://www.sporttery.cn/
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [中国体彩同源即时赔率尝试]
    source_status: missing_or_blocked
  - source: china_odds_attempt_sina_lottery
    url: https://lottery.sina.cn/
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [新浪彩票即时赔率尝试]
    source_status: missing_or_blocked
  - source: china_odds_attempt_dongqiudi
    url: https://www.dongqiudi.com/
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [懂球帝赔率/赛前页尝试]
    source_status: missing_or_blocked
  - source: china_odds_attempt_500
    url: https://www.500.com/
    captured_at: 2026-06-23T16:00:00+08:00
    supports_fields: [500彩票网即时赔率尝试]
    source_status: missing_or_blocked
- notes:
  - 按抗断流流程先落目标文件骨架，再逐项补充。
  - 本轮只做数据采集补充，不做预测。

## 赛前事实表

| 比赛 | 赛程/场地 | 最新伤停/停赛 | 预计首发状态 | 天气/场地状态 | 市场信号 |
| --- | --- | --- | --- | --- | --- |
| 葡萄牙 vs 乌兹别克斯坦 | 2026-06-23；北京时间 2026-06-24 01:00；Houston Stadium / NRG Stadium，休斯敦。captured_at=2026-06-23T16:00:00+08:00 | 葡萄牙本地已知首轮黄牌：Bernardo Silva、Nelson Semedo、Tomas Araujo；乌兹别克斯坦本地已知首轮黄牌：Abdukodir Khusanov。未核到本轮官方停赛名单。Ruben Dias 伤情仍为 conflicting。source_status=partial | 官方 T-75m 首发未发布。Martinez 赛前表示不会提前公开首发，Cristiano Ronaldo 是否继续首发仍为 uncertain。source_status=uncertain | 休斯敦外部环境为高温高湿热浪背景；NRG 为可开合顶棚场地，内场暴晒风险低于露天球场。葡萄牙为同城续驻，乌兹别克斯坦为墨西哥城转场。source_status=partial | 中国体彩/新浪彩票/懂球帝/500 可访问公开源未取到可结构化即时赔率。market=1X2/AH/total；source_status=missing_or_blocked |
| 哥伦比亚 vs 刚果金 | 2026-06-23；北京时间 2026-06-24 10:00；Estadio Guadalajara / Estadio Akron，瓜达拉哈拉地区。captured_at=2026-06-23T16:00:00+08:00 | 哥伦比亚本地已知首轮黄牌：Johan Mojica；刚果金本地已知首轮黄牌：Chancel Mbemba。未核到本轮官方停赛名单，也未核到新的官方伤病公报。source_status=partial | 官方 T-75m 首发未发布。本轮未找到稳定同源、可信的公开预计首发页；仅可保留哥伦比亚延续首轮主力框架的弱信号，不记 confirmed。source_status=missing_or_stale | 瓜达拉哈拉为高海拔城市背景；哥伦比亚从墨西哥城短转场，刚果金从休斯敦跨境转场，旅途负荷更高。官方逐小时场地天气未取到。source_status=partial | 中国体彩/新浪彩票/懂球帝/500 可访问公开源未取到可结构化即时赔率。market=1X2/AH/total；source_status=missing_or_blocked |

## 四队 canonical 读取与 player_state 状态

| 队伍 | canonical 成员表 | 正式球队档案 | player_state JSON | 读取结论 |
| --- | --- | --- | --- | --- |
| 葡萄牙 | 已读取 | 已读取 | `data/outputs/player_state/portugal-player-state.json` = PARSE_FAIL | canonical 文档可读；Ruben Dias 冲突、Ronaldo 分钟计划仍需赛前复核 |
| 乌兹别克斯坦 | 已读取 | 已读取 | `data/outputs/player_state/uzbekistan-player-state.json` = PARSE_FAIL | canonical 文档可读；Fayzullaev、Shomurodov、Khusanov 等首轮状态框架仍可从 Markdown 使用 |
| 哥伦比亚 | 已读取 | 已读取 | `data/outputs/player_state/colombia-player-state.json` = PARSE_FAIL | canonical 文档可读；Luis Diaz、James、Munoz、Mojica 的首轮状态线索可用 |
| 刚果金 | 已读取 | 已读取 | `data/outputs/player_state/dr-congo-player-state.json` = PARSE_FAIL | canonical 文档可读；Wissa、Mbemba、Masuaku 的首轮状态线索可用 |

## 本地读取到的关键赛前上下文

- 葡萄牙 canonical 文档已写明：首轮对刚果金使用 4-2-3-1，Cristiano Ronaldo 首发90分钟，Joao Neves 进球，Pedro Neto 助攻；Ruben Dias 赛前缺席口径与替补名单冲突。
- 乌兹别克斯坦 canonical 文档已写明：首轮对哥伦比亚首发 3-4-3/低位 5-4-1，Fayzullaev 进球，Shomurodov 助攻，Khusanov 吃黄牌。
- 哥伦比亚 canonical 文档已写明：Luis Diaz、Daniel Munoz、Jaminton Campaz 进球链路有效，Johan Mojica 首轮黄牌，James 为前场创造与定位球核心。
- 刚果金 canonical 文档已写明：Wissa 首轮扳平，Mbemba 为防线领袖，Masuaku 为左路推进/定位球重要点。

## 数据缺口与冲突

- 四份 `player-state JSON` 当前均不可解析，不能直接作为严格机器输入；如需重算，建议主线程优先回退到 canonical Markdown 与 roster/packet 中的已核验字段。
- 中国体彩同源即时赔率未取到；中国侧公开赔率替代源本轮也未返回可落盘的匹配页，因此统一标记 `missing_or_blocked`。
- 两场比赛官方 T-75m 首发均未发布；预计首发只能保留 `uncertain` 或 `missing_or_stale`。
- 葡萄牙 `Ruben Dias` 伤情口径仍冲突，需赛前正式名单或官方比赛中心复核。
- 哥伦比亚 vs 刚果金未核到新的官方伤病公报，仅能沿用首轮后状态框架。
- 休斯敦与瓜达拉哈拉逐小时官方场地天气未获取，仅保留城市级环境背景。

## 模型可用字段

- 可用：赛程、场地、休息天数框架、转场负荷、首轮黄牌、首轮关键球员事件、热湿/高海拔环境背景、四队 canonical 文档中的角色与状态线索。
- 谨慎使用：葡萄牙是否轮换 Ronaldo、Ruben Dias 是否回归、哥伦比亚与刚果金的预计首发。
- 暂不可用：四份可解析 player-state JSON、中国体彩同源即时赔率、官方 T-75m 首发。

## 一句状态摘要

已完成 K组第二轮“补充输入后的复核重算”数据落盘：四队 canonical 文档已读取，四份 player-state JSON 当前均解析失败；两场赛前事实已补充，赔率源尝试结果统一为 `missing_or_blocked`。

## 体彩同源赔率补充 2026-06-23

- source: 中国足彩网竞彩混合页
  - url: https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
  - source_system_time: 2026-06-23 15:54:38
  - captured_at: 2026-06-23T16:18:06.1454600+08:00
  - source_status: partial_current
- cross_check_source: 新浪可用抓取
  - source_status: fixture_verified_no_structured_odds_in_available_fetch
  - note: 本轮仅能交叉验证赛程，未稳定返回结构化竞彩赔率；不据此补写任何 SP 数值。

| 比赛编号 | 比赛 | 开赛时间 | 普通胜平负 | 让球胜平负 | 是否未开售 | SP 隐含概率 | 去水位隐含概率 | 可入模边界 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 周二045 | 葡萄牙 vs 乌兹别克斯坦 | 2026-06-24 01:00 | `0`（未开售） | `-2`：胜 1.98 / 平 4.05 / 负 2.65 | 普通胜平负未开售；让球胜平负已开 | 让胜 0.505051 / 让平 0.246914 / 让负 0.377358 | 让胜 0.447215 / 让平 0.218639 / 让负 0.334146 | 可入模：`竞彩让球胜平负(-2)` 的去水位概率与未开售状态；不可入模：页面欧赔/参考 `1.14/8.24/19.04`，因其不是竞彩 SP |
| 周二048 | 哥伦比亚 vs 民主刚果 | 2026-06-24 10:00 | 胜 1.35 / 平 3.90 / 负 7.60 | `-1`：胜 2.22 / 平 3.35 / 负 2.63 | 否 | 普通胜 0.740741 / 平 0.256410 / 负 0.131579；让胜 0.450450 / 让平 0.298507 / 让负 0.380228 | 普通胜 0.656260 / 平 0.227167 / 负 0.116573；让胜 0.398916 / 让平 0.264356 / 让负 0.336728 | 可入模：`竞彩普通胜平负` 与 `竞彩让球胜平负(-1)` 的去水位概率；不可入模：任何未抓到同源更新的欧赔/亚盘扩展字段 |

- derived_formula:
  - implied_probability_raw = `1 / SP`
  - implied_probability_devig = `(1 / SP) / Σ(1 / SP)`
  - decimal_odds_format = China_jingcai_SP_decimal
- modeling_boundary:
  - 可入模：
    - 中国足彩网同源页面已展示的竞彩 `SP` 数值
    - `是否未开售` 状态
    - 由竞彩 `SP` 直接换算的原始隐含概率与去水位隐含概率
  - 不可入模：
    - 同页“欧赔/参考”展示值 `1.14/8.24/19.04`，因为不是竞彩 `SP`
    - 新浪本轮未稳定返回的结构化赔率
    - 未抓到同源更新的大小球、亚洲盘、临场变动曲线

<!-- cp-jc-odds-20260623:start -->
## 体彩同源赔率补充 2026-06-23
## 体彩同源赔率复核
- 来源：中国足彩网竞彩混合页，source systemTime=2026-06-23 15:54:38，本地整合时间=2026-06-23T17:40:00+08:00。
- 周二045 葡萄牙 vs 乌兹别克斯坦：普通胜平负未开售；让球胜平负 -2 为 1.98/4.05/2.65，去水位约 44.72%/21.86%/33.41%。
- 周二048 哥伦比亚 vs 刚果金：普通胜平负 1.35/3.90/7.60，去水位约 65.63%/22.72%/11.66%；让球胜平负 -1 为 2.22/3.35/2.63，去水位约 39.89%/26.44%/33.67%。
- 新浪核验：当前可抓取页面只稳定验证到赛程，未稳定返回结构化竞彩赔率；不补写无法抓到的赔率。
- 红队边界：discussion_only / hold_for_betting，不能给正式投注单。

入模边界：周二048普通SPF可作为主胜市场信号；周二045普通SPF未开售，只允许使用让球-2作为深盘分歧信号。
<!-- cp-jc-odds-20260623:end -->
