---
phase: postmatch_fact_collection
group: F
match:
  - japan-vs-sweden-2026-06-26
  - tunisia-vs-netherlands-2026-06-26
status: partial
created_at: 2026-06-26T10:26:54.1758559+08:00
updated_at: 2026-06-26T10:30:00.8455727+08:00
owner: worldcup-data-collector
scope: f-group-round3-postmatch-facts-only
missing_fields:
  - 官方xG与完整技术统计
  - 两场完整逐人评分
  - 日本 vs 瑞典 完整首发/阵型/换人链路
  - 突尼斯 vs 荷兰 荷兰完整首发与完整换人链路
  - 四队 canonical player_state/成员表 赛后回灌
source_log:
  - src-f-r3-001
  - src-f-r3-002
  - src-f-r3-003
  - src-f-r3-004
  - src-f-r3-005
notes:
  - Skeleton created first per anti-disconnect workflow.
  - This packet collects facts only and does not provide predictions or betting advice.
final_status: partial
factor_inputs_ready: true
---

# F组第三轮赛后事实包

## 概览

- 抓取时间：`2026-06-26T10:30:00.8455727+08:00`
- 结果汇总：
  - 日本 1比1 瑞典
  - 突尼斯 1比3 荷兰
- 晋级结果：
  - 荷兰 7分，F组第一
  - 日本 5分，F组第二
  - 瑞典 4分，F组三并晋级32强
  - 突尼斯 0分出局

## 比赛 1：日本 1比1 瑞典

- 比赛编号：`周四058`
- 开球时间：`2026-06-26 07:00`（北京时间）
- 场地：`Dallas Stadium`
- 半场：`0-0`
- 进球：
  - `56'` 前田大然，日本
  - `61'` 安东尼·埃兰加，瑞典
- 已核关键事件：
  - `90+3'` 伊萨克头球中楣，铃木彩艳关键扑救后托中横梁
- 首发/阵型：
  - `start_xi_status: partial_available_via_live_blog`
  - `formation_status: unverified`
- 换人/伤停：
  - 已确认双方存在赛中调整，但完整换人时间线未结构化
  - 未核到新增明确伤退通报
- 晋级：
  - 日本以F组第二晋级，32强对巴西
  - 瑞典以第三名身份晋级32强
- 赛前预测对照：
  - 本地量化预测头号比分即 `1-1`
  - 模型 1X2：日本胜 `0.4647`，平 `0.2554`，瑞典胜 `0.2798`
  - 普通胜平负市场：`1.60 / 3.57 / 4.45`
  - 对照结论：模型头号比分命中，但市场更偏日本胜
- 竞彩口径：
  - 普通胜平负结算：`平`
  - 让球胜平负：日本 `-1`，`3.00 / 3.70 / 1.91`
  - 让球结算：`负`

## 比赛 2：突尼斯 1比3 荷兰

- 比赛编号：`周四057`
- 开球时间：`2026-06-26 07:00`（北京时间）
- 场地：`Kansas City Stadium`
- 半场：`0-2`
- 进球：
  - `3'` 斯希里乌龙，荷兰
  - `7'` 布罗贝伊，助攻范戴克，荷兰
  - `54'` 马斯图里，突尼斯
  - `62'` 范赫克，荷兰
- 已核关键事件：
  - 赛前球场周边有暴雨与雷电预警，球迷区一度关闭，约开球前一小时解除
- 首发/阵型：
  - `start_xi_status: partial_available_via_live_blog`
  - `formation_status: unverified`
  - 已核到突尼斯首发文本；荷兰仅核到接近全主力与两名停赛缺席说明
- 换人/伤停：
  - 已核换人片段：
    - `77'` 德佩换下布罗贝伊
    - `84'` 诺阿·朗换下加克波
    - `90'` Tounekti 换下马斯图里
  - 荷兰赛前停赛缺席：米基·范德芬、克里森西奥·萨默维尔
  - 未核到赛后新增明确伤退通报
- 晋级：
  - 荷兰F组第一，32强对摩洛哥
  - 突尼斯出局
- 赛前预测对照：
  - 模型 1X2：突尼斯胜 `0.101`，平 `0.194`，荷兰胜 `0.7051`
  - 模型高频比分：`0-2`、`0-1`、`0-3`
  - 实际 `1-3`，方向与模型一致
- 竞彩口径：
  - 普通胜平负：赛前未开售
  - 让球胜平负：突尼斯 `+2`，`3.47 / 4.25 / 1.65`
  - 让球结算：`平`

## canonical 文件读取状态

- `K:\worldcup\data\outputs\player_state\japan-player-state.json`
  - 存在，可读；最后已知更新时间 `2026-06-21T18:30:00+08:00`
  - 尚未见 `2026-06-26` 赛后回灌
- `K:\worldcup\data\outputs\player_state\sweden-player-state.json`
  - 存在，可读；最后已知更新时间 `2026-06-21T18:35:00+08:00`
  - 尚未见 `2026-06-26` 赛后回灌
- `K:\worldcup\data\outputs\player_state\tunisia-player-state.json`
  - 存在，可读；最后已知更新时间 `2026-06-21T18:30:00+08:00`
  - 尚未见 `2026-06-26` 赛后回灌
- `K:\worldcup\data\outputs\player_state\netherlands-player-state.json`
  - 存在，可读；最后已知更新时间 `2026-06-21T18:35:00+08:00`
  - 尚未见 `2026-06-26` 赛后回灌
- `K:\worldcup\队伍\日本\成员表.md`
  - 存在，未见第三轮赛后更新
- `K:\worldcup\队伍\瑞典\成员表.md`
  - 存在，未见第三轮赛后更新
- `K:\worldcup\队伍\突尼斯\成员表.md`
  - 存在，未见第三轮赛后更新
- `K:\worldcup\队伍\荷兰\成员表.md`
  - 存在，未见第三轮赛后更新

## 数据缺口

- 官方 xG、完整技术统计未得
- 两场完整逐人评分未得
- 日本 vs 瑞典：完整首发、阵型、换人链路未结构化
- 突尼斯 vs 荷兰：荷兰完整首发与完整换人链路未结构化
- 四队 `player_state` 与 `成员表.md` 尚未回灌第三轮赛后状态

## 来源

- `src-f-r3-001` The Guardian match report
  - https://www.theguardian.com/football/2026/jun/26/japan-sweden-world-cup-2026-match-report
- `src-f-r3-002` The Guardian live blog
  - https://www.theguardian.com/football/live/2026/jun/25/japan-v-sweden-world-cup-2026-live
- `src-f-r3-003` The Guardian match report
  - https://www.theguardian.com/football/2026/jun/26/tunisia-netherlands-world-cup-2026-match-report
- `src-f-r3-004` The Guardian live blog
  - https://www.theguardian.com/football/live/2026/jun/25/tunisia-v-netherlands-world-cup-2026-live
- `src-f-r3-005` 本地赛前预测包
  - `K:\worldcup\data\outputs\match_predictions\f-group-round3-quant-prediction-20260625.json`
