# K组第二轮赛前数据采集

- phase: pre_match_data_collection
- group: K组
- status: partial
- created_at: 2026-06-23T15:52:41.6109771+08:00
- updated_at: 2026-06-23T15:52:41.6109771+08:00
- owner: worldcup-data-collector
- scope: 2026-06-23 K组第二轮赛前动态事实采样，仅供主线程预测前刷新

## 事实表

| 比赛 | 已核验赛程/场地 | 伤停/停赛 | 预计首发状态 | 天气/场地状态 | 赔率快照 |
| --- | --- | --- | --- | --- | --- |
| 葡萄牙 vs 乌兹别克斯坦 | 比赛日 2026-06-23；北京时间 2026-06-24 01:00；场地 Houston Stadium / NRG Stadium，休斯敦；本地既有数据包记录为 K组第二轮官方赛程上下文。captured_at=2026-06-23T15:52:41+08:00 | 葡萄牙首轮黄牌已知为 Bernardo Silva、Nelson Semedo、Tomas Araujo；乌兹别克斯坦首轮黄牌已知为 Abdukodir Khusanov；本轮未核到官方停赛公告。Ruben Dias 伤情在本地历史资料中仍为 conflicting，需赛前名单复核。source_status=partial | 官方 T-75m 首发未出。Roberto Martinez 于 2026-06-23 公开表示不会提前公布首发，Cristiano Ronaldo 是否继续首发为 uncertain。source_status=uncertain | 休斯敦当日外部天气为高温高湿、热浪背景；NRG Stadium 为可开合顶棚场地，比赛内场暴晒风险低于室外，但赛前通勤与训练仍受热湿影响。乌兹别克斯坦从墨西哥城转场休斯敦，旅途负荷高于葡萄牙。source_status=partial | market=1X2/AH/total；bookmaker=null；decimal_odds=null；implied_probability=null；capture_time=2026-06-23T15:52:41+08:00；source_status=missing_or_stale |
| 哥伦比亚 vs 刚果金 | 比赛日 2026-06-23；北京时间 2026-06-24 10:00；场地 Estadio Guadalajara / Estadio Akron，瓜达拉哈拉地区；本地既有数据包记录为 K组第二轮官方赛程上下文。captured_at=2026-06-23T15:52:41+08:00 | 哥伦比亚首轮黄牌已知为 Johan Mojica；刚果金首轮黄牌已知为 Chancel Mbemba；本轮未核到官方停赛公告，也未核到新的官方伤病公报。source_status=partial | 官方 T-75m 首发未出；本轮未找到稳定同源的权威预计首发清单。哥伦比亚保持首轮主力框架的概率较高，但此条仅为队内负荷延续判断，不作 confirmed。source_status=missing_or_stale | 瓜达拉哈拉比赛地存在高海拔城市背景；哥伦比亚由墨西哥城转场距离较短，刚果金由休斯敦转场距离更长；官方逐小时场地天气本轮未取到。source_status=partial | market=1X2/AH/total；bookmaker=null；decimal_odds=null；implied_probability=null；capture_time=2026-06-23T15:52:41+08:00；source_status=missing_or_stale |

## 四队 canonical 读取状态

| 队伍 | 成员表.md | 正式球队档案.md | player-state JSON | 备注 |
| --- | --- | --- | --- | --- |
| 葡萄牙 | exists_and_read | exists_and_read | partial_json_validation_failed | 已读取 canonical 文档；`portugal-player-state.json` 本轮解析失败 |
| 乌兹别克斯坦 | exists_and_read | exists_and_read | partial_json_validation_failed | 已读取 canonical 文档；`uzbekistan-player-state.json` 本轮解析失败 |
| 哥伦比亚 | exists_and_read | exists_and_read | partial_json_validation_failed | 已读取 canonical 文档；`colombia-player-state.json` 本轮解析失败 |
| 刚果金 | exists_and_read | exists_and_read | partial_json_validation_failed | 已读取 canonical 文档；`dr-congo-player-state.json` 本轮解析失败 |

## source_log / captured_at

- captured_at: 2026-06-23T15:52:41.6109771+08:00
- local_source:
  - `K:\worldcup\data\packets\matches\k-group-round2-data-refresh-20260622.json`
  - `K:\worldcup\比赛\未开始比赛\小组赛\K组\2026-06-23_葡萄牙_vs_乌兹别克斯坦_量化预测.md`
  - `K:\worldcup\比赛\未开始比赛\小组赛\K组\2026-06-23_哥伦比亚_vs_刚果金_量化预测.md`
  - `K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_葡萄牙_1-1_刚果金_复盘.md`
  - `K:\worldcup\比赛\已完成比赛\小组赛\K组\2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md`
  - `K:\worldcup\队伍\葡萄牙\成员表.md`
  - `K:\worldcup\队伍\乌兹别克斯坦\成员表.md`
  - `K:\worldcup\队伍\哥伦比亚\成员表.md`
  - `K:\worldcup\队伍\刚果金\成员表.md`
  - `K:\worldcup\队伍\葡萄牙\正式球队档案.md`

  - `K:\worldcup\队伍\乌兹别克斯坦\正式球队档案.md`
  - `K:\worldcup\队伍\哥伦比亚\正式球队档案.md`
  - `K:\worldcup\队伍\刚果金\正式球队档案.md`
- external_source:
  - source: Times of India
    url: https://timesofindia.indiatimes.com/sports/football/fifa-world-cup/fifa-world-cup-will-ronaldo-be-benched-against-uzbekistan-portugal-coach-keeps-starting-xi-under-wraps/articleshow/131925539.cms
    captured_at: 2026-06-23T15:52:41.6109771+08:00
    supports_fields: [葡萄牙预计首发不确定, Ronaldo首发口径, Martinez赛前发言]
    source_status: confirmed_for_quote_context
  - source: Houston Chronicle
    url: https://www.houstonchronicle.com/world-cup/article/portugal-uzbekistan-fanwalk-22314479.php
    captured_at: 2026-06-23T15:52:41.6109771+08:00
    supports_fields: [葡萄牙vs乌兹别克斯坦比赛地本地时间, 休斯敦比赛日背景]
    source_status: partial
  - source: Houston Chronicle weather
    url: https://www.houstonchronicle.com/news/houston-weather/forecast/article/houston-heat-dome-builds-22314041.php
    captured_at: 2026-06-23T15:52:41.6109771+08:00
    supports_fields: [休斯敦高温高湿, 热浪背景]
    source_status: partial
  - source: Chron weather
    url: https://www.chron.com/weather/article/texas-thunderstorms-heat-summer-22314149.php
    captured_at: 2026-06-23T15:52:41.6109771+08:00
    supports_fields: [休斯敦高温, 体感温度偏高]
    source_status: partial
  - source: Wikipedia venue reference
    url: https://en.wikipedia.org/wiki/NRG_Stadium
    captured_at: 2026-06-23T15:52:41.6109771+08:00
    supports_fields: [NRG Stadium可开合顶棚]
    source_status: low_confidence_context
  - source: Wikipedia venue reference
    url: https://en.wikipedia.org/wiki/Estadio_Akron
    captured_at: 2026-06-23T15:52:41.6109771+08:00
    supports_fields: [Estadio Akron地理位置与场地背景]
    source_status: low_confidence_context

## 数据缺口

- FIFA 官方比赛中心直链本轮未重新抓到，官方赛程/场地以本地既有赛程包与项目档案上下文落地，需主线程若有官方链接可补挂。
- 两场比赛的官方 T-75m 首发未发布，预计首发只能保留 uncertain 或 missing_or_stale。
- 两场比赛均未抓到稳定同源、可结构化落盘的 1X2 / 亚洲让球 / 大小球快照，因此赔率字段仅保留 market signal 占位。
- 葡萄牙 Ruben Dias 伤情口径仍冲突，需赛前名单或官方比赛中心复核。
- 哥伦比亚 vs 刚果金未核到新的官方伤病公报，只能沿用本地首轮后状态框架。
- 四队 `player-state` JSON 本轮均解析失败，状态暂记 `partial_json_validation_failed`，不适合直接作为严格机器输入。
- 官方逐小时场地天气未获取到，休斯敦与瓜达拉哈拉仅保留城市级天气/环境背景。

## 模型可用字段

- 已可用：比赛时间、比赛地、首轮后积分形势、休息天数框架、转场距离级别、场地环境背景、首轮黄牌背景、葡萄牙首发不确定性、四队 canonical 文档存在状态。
- 谨慎使用：Ruben Dias 伤情、Ronaldo 是否首发、哥伦比亚与刚果金预计首发、具体赔率数值。
- 暂不可用：两场官方首发、稳定同源赔率快照。四队 player-state JSON 的原线程失败记录已由下方主线程补充校验更正。

## 主线程一句状态摘要

K组第二轮赛前数据已先落一版 `partial`：赛程/场地、环境、伤停与预计首发不确定性已写入，赔率与首发仍是当前主要缺口；四队 player-state JSON 已在主线程补充校验中确认可解析。

## 主线程补充校验 2026-06-23

- correction_status: `validated_after_thread_output`
- 原记录：四队 `player-state` JSON 标记为 `partial_json_validation_failed`。
- 复核结果：主线程使用 Node `JSON.parse` 与 PowerShell `ConvertFrom-Json` 复核，以下四个文件均解析通过：
  - `data/outputs/player_state/portugal-player-state.json`
  - `data/outputs/player_state/uzbekistan-player-state.json`
  - `data/outputs/player_state/colombia-player-state.json`
  - `data/outputs/player_state/dr-congo-player-state.json`
- 判断：该失败记录不是当前文件损坏，更可能是子线程执行时读取链路/路径/临时状态导致的 false negative。
- 2026-06-23 当日量化预测 JSON：此前子线程执行时尚未存在；中断恢复后已由主线程补齐为 `data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json`，并已通过 JSON/schema 校验。
- 剩余限制：官方 T-75 首发、最终伤停、中国体彩同源即时赔率仍未补齐，因此预测仍保持 `discussion_only`，不升级为投注发布。
