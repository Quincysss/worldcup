phase: match_data_collection
team/group/match: F组第三轮
status: partial
created_at: 2026-06-25T11:33:18.4112228+08:00
updated_at: 2026-06-25T11:39:48.4769690+08:00
owner: worldcup-data-collector
scope: F组第三轮预测输入事实采集，只做本地基线、积分、赛程、同时开球、资格标签、竞彩快照、动态缺口，不做比分预测或购彩建议
missing_fields:
- FIFA官方实时积分榜页面直连校验未完成
- 四队T-24h伤停与预计首发未做完整官方复核
- 累积黄牌停赛风险缺少官方比赛中心逐人确认
- 荷兰/日本/瑞典/突尼斯第三轮赛前发布会与轮换口径未完整抓取
- 突尼斯主教练口径存在公开来源冲突，待赛前官方名单页消解
source_log:
- local_project_files
- ChinaSportsLottery_zgzcw_2026-06-25
- Guardian_stadium_guide
- Guardian_Tunisia_vs_Japan_live_report
notes:
- skeleton_created_first
- no_prediction
- simultaneous_kickoff_confirmed
- market_snapshot_captured

# 本地基线

F组四队按本地项目资料确认：
- 荷兰
- 日本
- 瑞典
- 突尼斯

前两轮已完赛样本：
- 2026-06-14 瑞典 5-1 突尼斯
- 2026-06-14 荷兰 2-2 日本
- 2026-06-20 荷兰 5-1 瑞典
- 2026-06-21 突尼斯 0-4 日本

据本地已完成比赛文件推导的两轮后积分形势：

| 排名 | 球队 | 积分 | 进球 | 失球 | 净胜球 | source_status |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | 荷兰 | 4 | 7 | 3 | +4 | local_derived |
| 2 | 日本 | 4 | 6 | 2 | +4 | local_derived |
| 3 | 瑞典 | 3 | 6 | 6 | 0 | local_derived |
| 4 | 突尼斯 | 0 | 1 | 9 | -8 | local_derived |

官方排名规则按世界杯通用顺序写入模型输入：
1. 小组积分
2. 小组净胜球
3. 小组进球数
4. 相关球队相互战绩积分
5. 相关球队相互战绩净胜球
6. 相关球队相互战绩进球数
7. 公平竞赛分
8. 抽签

# 第三轮赛程与同时开球

第三轮两场比赛均为北京时间 2026-06-26 07:00 同时开球：

| 比赛 | 北京时间 | 场地 | source_status |
| --- | --- | --- | --- |
| 日本 vs 瑞典 | 2026-06-26 07:00 | Dallas Stadium | media_verified |
| 突尼斯 vs 荷兰 | 2026-06-26 07:00 | Kansas City Stadium | media_verified |

同时开球关系：
- 两场比赛互相影响晋级名次判断
- 荷兰与日本都处于小组第一竞争
- 瑞典需关注另一场比分变化
- 突尼斯基本失去直接出线主动权，本轮动机更偏止损/体面收官

# 资格标签

按当前已确认积分形势给出第三轮赛前资格状态标签：

| 球队 | 标签 | 说明 |
| --- | --- | --- |
| 荷兰 | draw_enough; first_place_race | 对突尼斯拿1分基本足够晋级，仍需争头名 |
| 日本 | draw_enough; first_place_race | 对瑞典拿1分基本足够晋级，仍需争头名 |
| 瑞典 | first_place_race; second_place_race; must_avoid_loss | 取胜最稳，平局高度依赖另一场与排名细则 |
| 突尼斯 | eliminated_or_theoretical_only | 公开赛报已将末轮描述为近似死局，但待FIFA官方积分榜页最终确认 |

32强路径影响：
- 公开赛报显示F组头名与次名潜在对手强度差异明显
- 媒体语境下，头名路径相对更优，次名可能遭遇更强对手
- 该项仅可作为动机辅助变量，source_status=probable_media_context

# 动态状态与轮换风险

本地 player_state 可直接沿用的动态线索：
- 荷兰：范戴克对瑞典战末段碰撞后需观察，source_status=probable_monitor
- 荷兰：范德芬已有1黄，累积风险需官方比赛中心复核
- 瑞典：古德蒙德松上轮有跛行离场迹象，需T-24h复核
- 瑞典：伊萨克第二轮后段被媒体描述为负荷需观察
- 突尼斯：主教练口径存在公开来源冲突，需赛前官方名单页或足协确认
- 日本：既有本地成员表显示部分关键球员此前缺阵背景，但第三轮最新可用性未完成官方刷新

当前未写死任何第三轮停赛结论，统一标记 needs_refresh。

# 竞彩快照

来源：
- 中国足彩网竞彩混合页
- URL: https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
- 抓取时间: 2026-06-25T11:39:48.4769690+08:00
- 页面状态: 系统升级/暂停销售提示存在，但仍展示部分彩种数据

| 编号 | 比赛 | 普通胜平负 | 让球胜平负 | 是否未开售 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 周四057 | 突尼斯 vs 荷兰 | 0 / 未开售 | +2: 3.10 / 4.00 / 1.80 | 是 | 页面另有 1.10 / 24.10 / 9.81 参考欧赔展示，不当作竞彩SP |
| 周四058 | 日本 vs 瑞典 | 0: 1.74 / 3.40 / 3.85 | -1: 3.10 / 3.75 / 1.85 | 否 | 页面另有 4.26 / 1.86 / 3.53 参考展示，不当作竞彩SP |

去水后隐含概率：
- 日本 vs 瑞典 普通胜平负：主胜 0.5092，平 0.2606，客胜 0.2302
- 日本 vs 瑞典 让球 -1：让胜 0.2855，让平 0.2360，让负 0.4785
- 突尼斯 vs 荷兰 让球 +2：让胜 0.2859，让平 0.2216，让负 0.4925
- 突尼斯 vs 荷兰 普通胜平负：未开售，无法计算

market_signal 边界：
- 可入模：竞彩SP、是否未开售、去水后隐含概率、同时开球市场方向
- 不可直接当作竞彩SP入模：页面欧赔/参考展示数值

# 数据缺口

- FIFA官方实时积分榜与第三轮赛程页未完成同轮抓取，当前积分表为本地赛果推导
- 四队第三轮预计首发与正式伤停名单未完成官方更新
- 逐人累计黄牌与停赛线未完成官方核对
- 日本第三轮可用性、荷兰末轮轮换程度、瑞典追分阵容倾向仍需T-24h发布会补票
- 突尼斯教练组状态存在来源冲突

# 模型可用字段

当前可入模字段：
- 小组积分榜快照
- 前两轮净胜球与进球数
- 同时开球关系
- 资格标签
- 基础路径动机变量
- 已知伤停/负荷观察项
- 中国足彩网竞彩SP快照与未开售状态

factor_inputs_ready: true

# 主要来源

1. 本地已完成比赛与成员表、player_state 文件
2. 中国足彩网竞彩混合页：https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
3. Guardian stadium guide：https://www.theguardian.com/football/2026/jun/01/world-cup-2026-stadium-guide
4. Guardian 突尼斯 vs 日本赛报：https://www.theguardian.com/football/live/2026/jun/21/fifa-world-cup-2026-live-tunisia-v-japan-updates-tun-vs-jpn-group-f-match-score-latest
