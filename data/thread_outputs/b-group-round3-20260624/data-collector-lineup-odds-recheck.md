# B组第三轮数据采集：首发/赔率复核

```yaml
phase: group_round3_lineup_odds_recheck
group: B
status: partial_ready
created_at: 2026-06-24T18:00:58+08:00
updated_at: 2026-06-24T18:03:42+08:00
captured_at: 2026-06-24T18:03:13+08:00
owner: worldcup-data-collector
scope: B组第三轮瑞士vs加拿大、波黑vs卡塔尔的积分/赛程/赔率/伤停/首发数据复核
prediction_scope: none
betting_advice: none
notes:
  - 官方T-75首发未公布，不作为阻塞项；建模可使用预测首发，赛前约1小时再复核。
  - 中国足彩网页面显示“因系统升级，该彩种暂停销售”，赔率只作为市场事实快照。
missing_fields:
  - 中国体彩网/竞彩网官方信息发布平台未抓到可解析同场页面，需赛前刷新。
  - 乐彩、500彩票网、上海体彩网未抓到可解析同场核验页，当前以中国足彩网近同源页为主。
  - 比分玩法完整赔率网格未展开/未提取，仅确认比分页存在同场条目。
  - 官方纪律公告仍需复核停赛场次，尤其红牌自动停赛是否已有追加处罚。
  - 官方首发、替补、临场伤停需T-75/T-60复核。
```

## 比赛与积分

| 排名 | 球队 | 积分 | 净胜球 | 状态 |
| --- | --- | ---: | ---: | --- |
| 1 | 加拿大 | 4 | +6 | 用户/项目本地输入，需官方积分榜赛前复核 |
| 2 | 瑞士 | 4 | +3 | 用户/项目本地输入，需官方积分榜赛前复核 |
| 3 | 波黑 | 1 | -3 | 用户/项目本地输入，需官方积分榜赛前复核 |
| 4 | 卡塔尔 | 1 | -6 | 用户/项目本地输入，需官方积分榜赛前复核 |

| 场次 | 比赛 | 竞彩日 | 开球 | 同组同开 |
| --- | --- | --- | --- | --- |
| 周三049 | 瑞士 vs 加拿大 | 2026-06-24 | 2026-06-25 03:00 北京时间 | 是 |
| 周三050 | 波黑 vs 卡塔尔 | 2026-06-24 | 2026-06-25 03:00 北京时间 | 是 |

资格情境只记录事实条件，不做赛果预测：加拿大与瑞士同积4分，涉及小组第一/第二排序；波黑与卡塔尔同积1分，第三轮胜负会影响理论出线/排名情境。末段策略存在同开依赖，另一场比分变化会影响领先方轮换、保守程度和落后方压上强度。

## 竞彩同源赔率快照

来源：中国足彩网竞彩胜平负/让球页，页面系统时间显示 `2026-06-24 17:50:18`。页面同时提示“因系统升级，该彩种暂停销售”，销售状态记为 `suspended_notice_visible`。中国足彩网为近同源/聚合页，不等同中国体彩网官方销售入口；当前没有输出投注建议。

| 场次 | 市场 | 赔率 | 原始隐含概率 | 去水概率 | overround |
| --- | --- | --- | --- | --- | ---: |
| 周三049 瑞士 vs 加拿大 | 普通胜平负 | 2.21 / 2.66 / 3.32 | 45.25% / 37.59% / 30.12% | 40.06% / 33.28% / 26.66% | 112.96% |
| 周三049 瑞士 vs 加拿大 | 让球胜平负，瑞士 -1 | 4.70 / 3.86 / 1.52 | 21.28% / 25.91% / 65.79% | 18.83% / 22.93% / 58.23% | 112.97% |
| 周三050 波黑 vs 卡塔尔 | 普通胜平负 | 1.26 / 5.10 / 7.15 | 79.37% / 19.61% / 13.99% | 70.26% / 17.36% / 12.38% | 112.96% |
| 周三050 波黑 vs 卡塔尔 | 让球胜平负，波黑 -1 | 1.89 / 3.60 / 3.10 | 52.91% / 27.78% / 32.26% | 46.85% / 24.59% / 28.56% | 112.95% |

| 场次 | 总进球赔率，0/1/2/3/4/5/6/7+ | 去水概率，0/1/2/3/4/5/6/7+ | overround |
| --- | --- | --- | ---: |
| 周三049 瑞士 vs 加拿大 | 8.00 / 4.80 / 3.05 / 3.90 / 5.75 / 11.00 / 22.00 / 37.00 | 9.96% / 16.60% / 26.13% / 20.43% / 13.86% / 7.24% / 3.62% / 2.15% | 125.49% |
| 周三050 波黑 vs 卡塔尔 | 18.00 / 6.25 / 4.10 / 3.30 / 4.55 / 7.50 / 12.50 / 17.00 | 4.43% / 12.75% / 19.44% / 24.16% / 17.52% / 10.63% / 6.38% / 4.69% | 125.44% |

比分玩法：已打开中国足彩网比分页，但同场行仅可见“展开”和平均值列，完整比分网格未提取；状态记为 `score_market_grid_not_extracted`。

## 伤停与停赛

| 球队 | 人员 | 状态 | 证据/置信度 | 首发建模缺口 |
| --- | --- | --- | --- | --- |
| 加拿大 | Ismael Kone | 严重伤退/预计不可用 | 本地加拿大成员表记录第二轮伤情；卡塔尔 player_state 记录 Madibo 犯规导致Kone重伤。`confirmed_local; external_recheck_needed` | 需官方伤情/名单确认替代者 |
| 加拿大 | Alphonso Davies | 出场时间风险 | 本地成员表显示前两轮未首发/0分钟；原因需官方或赛前记者源复核。`minutes_risk; uncertain_reason` | 需T-75首发、赛前训练/新闻 |
| 加拿大 | Moise Bombito | 90分钟风险/体能不确定 | 本地成员表有第二轮出场相关记录但分钟缺口，不能硬判伤停。`uncertain` | 需官方首发和临场体能消息 |
| 波黑 | Tarik Muharemović | 红牌后停赛高概率/需官方纪律公告确认场次 | 本地波黑成员表和 player_state 均记录第二轮对瑞士第80分钟左右红牌。`confirmed_local_event; suspension_needs_official_bulletin` | 需确认替补中卫和阵型调整 |
| 波黑 | Edin Džeko | 体能管理风险 | 本地 player_state 记录第二轮首发、第62分钟被换下并吃黄牌。`probable_minutes_management` | 需T-75首发确认 |
| 卡塔尔 | Homam Ahmed | 红牌后停赛高概率/需官方纪律公告确认场次 | 本地卡塔尔成员表和 player_state 记录第二轮红牌。`confirmed_local_event; suspension_needs_official_bulletin` | 需左路替代人选 |
| 卡塔尔 | Assim Madibo | 红牌后停赛高概率/需官方纪律公告确认场次 | 本地卡塔尔成员表和 player_state 记录第二轮红牌。`confirmed_local_event; suspension_needs_official_bulletin` | 需中场拦截/对抗替代人选 |

## 来源质量与冲突

| 项目 | 结果 |
| --- | --- |
| 中国足彩网普通胜平负/让球 | 与用户给定快照一致；记录为 `near_same_source_verified` |
| 中国足彩网总进球 | 已抓取两场0到7+赔率；记录为 `near_same_source_verified` |
| 中国足彩网比分 | 页面可见同场但完整网格未提取；记录为 `partial_not_model_ready` |
| 中国体彩网/竞彩网官方入口 | 当前未抓到可解析同场数据；记录为 `official_source_missing` |
| 乐彩/500/上海体彩网 | 当前未抓到可解析同场核验页；记录为 `secondary_verification_missing` |
| T-75官方首发 | 未公布；记录为 `predicted_lineup_required; recheck_1h_before_kickoff` |
| 停赛公告 | 本地红牌事件明确，但官方纪律公告未完成复核；记录为 `event_confirmed_suspension_length_pending` |

## source_log

| id | source | url/path | captured_at | supports |
| --- | --- | --- | --- | --- |
| src_b_r3_001 | 中国足彩网竞彩胜平负/让球页 | https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini | 2026-06-24T18:03:13+08:00 | 周三049/050 SPF、RQSPF、开球时间、停售提示 |
| src_b_r3_002 | 中国足彩网竞彩总进球页 | https://cp.zgzcw.com/lottery/jcplayvsForJsp.action?lotteryId=24 | 2026-06-24T18:03:13+08:00 | 周三049/050 总进球赔率、停售提示 |
| src_b_r3_003 | 中国足彩网竞彩比分页 | https://cp.zgzcw.com/lottery/jcplayvsForJsp.action?lotteryId=23 | 2026-06-24T18:03:13+08:00 | 同场条目存在；完整比分网格未提取 |
| src_b_r3_004 | 本地加拿大成员表 | K:\worldcup\队伍\加拿大\成员表.md | 2026-06-24T18:03:13+08:00 | Kone伤情、Davies/Bombito分钟风险线索 |
| src_b_r3_005 | 本地波黑成员表/player_state | K:\worldcup\队伍\波黑\成员表.md; K:\worldcup\data\outputs\player_state\bosnia-herzegovina-player-state.json | 2026-06-24T18:03:13+08:00 | Muharemović红牌、Džeko体能管理 |
| src_b_r3_006 | 本地卡塔尔成员表/player_state | K:\worldcup\队伍\卡塔尔\成员表.md; K:\worldcup\data\outputs\player_state\qatar-player-state.json | 2026-06-24T18:03:13+08:00 | Homam Ahmed、Assim Madibo红牌/停赛风险 |

## 可供建模输入

| match_no | fixture | kickoff_bj | spf_odds | spf_devig_home_draw_away | rq | rq_odds | rq_devig_home_draw_away | lineup_data_status | availability_flags | source_quality |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 周三049 | 瑞士 vs 加拿大 | 2026-06-25 03:00 | 2.21 / 2.66 / 3.32 | 0.4006 / 0.3328 / 0.2666 | 瑞士 -1 | 4.70 / 3.86 / 1.52 | 0.1883 / 0.2293 / 0.5823 | official_lineup_unpublished_use_predicted_recheck_T60 | canada_kone_out_local_confirmed; davies_minutes_uncertain; bombito_minutes_uncertain | near_same_source_verified; official_missing |
| 周三050 | 波黑 vs 卡塔尔 | 2026-06-25 03:00 | 1.26 / 5.10 / 7.15 | 0.7026 / 0.1736 / 0.1238 | 波黑 -1 | 1.89 / 3.60 / 3.10 | 0.4685 / 0.2459 / 0.2856 | official_lineup_unpublished_use_predicted_recheck_T60 | bosnia_muharemovic_red_card_suspension_pending_bulletin; qatar_homam_red_card_suspension_pending_bulletin; qatar_madibo_red_card_suspension_pending_bulletin | near_same_source_verified; official_missing |
