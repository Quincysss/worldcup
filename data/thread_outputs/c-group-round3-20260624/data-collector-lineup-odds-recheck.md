# C组第三轮数据采集：首发/赔率复核

```yaml
phase: group_round3_lineup_odds_recheck
group: C
status: partial_ready
created_at: 2026-06-24T18:10:00+08:00
updated_at: 2026-06-24T18:17:55+08:00
captured_at: 2026-06-24T18:17:55+08:00
owner: worldcup-data-collector
scope: C组第三轮苏格兰vs巴西、摩洛哥vs海地的事实/赔率/首发新闻复核
prediction_scope: none
betting_advice: none
missing_fields:
  - FIFA/官方比赛中心 T-75 正式首发尚未公布，需赛前约1小时复核。
  - FIFA/官方纪律与医疗通告未外部锁定；当前伤停主要来自本地成员表、player_state 与复盘资料。
  - 新浪、500彩票网、懂球帝等近同源页面本轮未抓到可用明细，暂以中国足彩网竞彩页为主。
  - 比分玩法只抓到页面可见聚合/展开入口，完整比分赔率网格未提取，不能作为完整模型输入。
  - Neymar、Raphinha、Scott McKenna、Bounou、Hakimi、Mazraoui、海地 Leverton Pierre/Garven Metusala 名单冲突需赛前复核。
notes:
  - 只做事实、赔率与首发新闻复核；不做比分预测、胜平负预测、小组出线预测、冠军预测或投注建议。
  - 竞彩页出现“因系统升级，该彩种暂停销售”提示，同时部分比赛/玩法仍显示赔率或未开售状态，按销售状态冲突记录。
```

## 1. 比赛与积分形势

### 1.1 C组当前积分

来源为本地赛后复盘文件：`比赛/已完成比赛/小组赛/C组/C组第一轮赛后汇总.md`、`比赛/已完成比赛/小组赛/C组/C组第二轮复盘.md`。外部官方积分榜未在本轮闭环内重新锁定，source_quality 标为 `local_post_match_verified / official_refresh_needed`。

| 排名 | 球队 | 场次 | 积分 | 进球 | 失球 | 净胜球 | 本地赛果依据 | 状态 |
|---:|---|---:|---:|---:|---:|---:|---|---|
| 1 | 巴西 | 2 | 4 | 4 | 1 | +3 | 1-1 摩洛哥；3-0 海地 | confirmed_local |
| 2 | 摩洛哥 | 2 | 4 | 2 | 1 | +1 | 1-1 巴西；1-0 苏格兰 | confirmed_local |
| 3 | 苏格兰 | 2 | 3 | 1 | 1 | 0 | 1-0 海地；0-1 摩洛哥 | confirmed_local |
| 4 | 海地 | 2 | 0 | 0 | 4 | -4 | 0-1 苏格兰；0-3 巴西 | confirmed_local |

### 1.2 第三轮赛程核验

| 竞彩编号 | 比赛 | 北京时间开球 | 同组同时开球 | 场地/城市 | 状态 |
|---|---|---|---|---|---|
| 周三051 | 苏格兰 vs 巴西 | 2026-06-25 06:00 | 是，与周三052同开 | 本轮未外部锁定 | probable_from_odds_page |
| 周三052 | 摩洛哥 vs 海地 | 2026-06-25 06:00 | 是，与周三051同开 | 本轮未外部锁定 | probable_from_odds_page |

### 1.3 资格情境事实

| 球队 | 当前形势 | 同开依赖 | 备注 |
|---|---|---|---|
| 巴西 | 4分且净胜球领先，末轮涉及争第一与锁定高排名 | 摩洛哥赛果会影响小组第一策略 | 不输出预测，仅记录动机结构。 |
| 摩洛哥 | 4分，仍有争第一空间 | 巴西赛果与自身比分同时影响排名 | 若比分领先，可能出现控制节奏/保护负荷的需求。 |
| 苏格兰 | 3分，末轮结果关系前二或第三名比较 | 需要关注摩洛哥 vs 海地实时比分 | 末段策略对另一场比分变化敏感。 |
| 海地 | 0分、净胜球-4，出线只剩理论或接近无实际路径 | 仍可能影响摩洛哥排名和净胜球 | 按本地复盘口径记录为荣誉战/理论情境，需官方排名规则复核。 |

## 2. 竞彩同源赔率快照

计算方式：`raw_implied_probability = 1 / decimal_odds`；`devig_probability = raw_implied_probability / sum(raw_implied_probability_same_market)`。百分比四舍五入到2位。中国足彩网页面系统时间为 `2026-06-24 17:50:18`，本地抓取时间为 `2026-06-24T18:17:55+08:00`。

### 2.1 普通胜平负 / 让球胜平负

| 竞彩编号 | 比赛 | 来源 | 销售状态 | 市场 | 让球 | 赔率 | 原始隐含概率 | 去水概率 | overround | source_quality |
|---|---|---|---|---|---:|---|---|---|---:|---|
| 周三051 | 苏格兰 vs 巴西 | 中国足彩网竞彩混合页 | 页面有暂停销售提示；该场赔率可见 | SPF | 0 | 9.60 / 5.40 / 1.19 | 10.42% / 18.52% / 84.03% | 9.22% / 16.39% / 74.39% | 112.97% | near_official_market |
| 周三051 | 苏格兰 vs 巴西 | 中国足彩网竞彩混合页 | 页面有暂停销售提示；该场赔率可见 | RQSPF | +1 | 3.60 / 3.75 / 1.71 | 27.78% / 26.67% / 58.48% | 24.60% / 23.61% / 51.79% | 112.92% | near_official_market |
| 周三052 | 摩洛哥 vs 海地 | 中国足彩网竞彩混合页 | SPF显示未开售 | SPF | 0 | 未开售 | n/a | n/a | n/a | near_official_market_partial |
| 周三052 | 摩洛哥 vs 海地 | 中国足彩网竞彩混合页 | 页面有暂停销售提示；该场让球赔率可见 | RQSPF | -2 | 2.19 / 3.85 / 2.42 | 45.66% / 25.97% / 41.32% | 40.42% / 22.99% / 36.58% | 112.96% | near_official_market |

### 2.2 总进球

| 竞彩编号 | 比赛 | 来源 | 市场 | 0球 | 1球 | 2球 | 3球 | 4球 | 5球 | 6球 | 7+ | 去水概率(0/1/2/3/4/5/6/7+) | overround |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|
| 周三051 | 苏格兰 vs 巴西 | 中国足彩网总进球页 | total_goals | 14.00 | 5.30 | 3.70 | 3.40 | 5.00 | 8.50 | 15.00 | 22.00 | 5.69% / 15.04% / 21.55% / 23.45% / 15.95% / 9.38% / 5.32% / 3.62% | 125.43% |
| 周三052 | 摩洛哥 vs 海地 | 中国足彩网总进球页 | total_goals | 21.00 | 6.80 | 4.40 | 3.45 | 4.30 | 7.10 | 10.50 | 13.50 | 3.80% / 11.72% / 18.12% / 23.10% / 18.54% / 11.23% / 7.59% / 5.90% | 125.45% |

### 2.3 比分玩法

中国足彩网比分页可见周三051、周三052比赛入口与聚合均值，但完整比分网格需要页面展开/动态内容，当前未完整提取。记录为 `partial_not_model_ready`，不纳入完整 odds_snapshot。

## 3. 首发与伤停新闻状态

官方 T-75 首发当前不可得；这不是预测阻塞项，应由模型使用预测首发，并在赛前约1小时用官方首发复核。以下仅记录预测首发依据、风险点和需要复核项。

| 球队 | 本地阵型/首发依据 | 伤停/停赛/体能风险 | 置信度 | 赛前复核 |
|---|---|---|---|---|
| 苏格兰 | 成员表记录 `4-4-2/3-4-2-1` 待官方首发图复核；R1 McGinn 打入制胜球；McGinn/McTominay 为关键中场角色。 | Billy Gilmour 伤缺后由 Tyler Fletcher 进入名单；Scott McKenna 有 fitness watch；未发现本地硬停赛确认。 | medium_local | T-75首发、McKenna状态、黄牌保护与中场轮换。 |
| 巴西 | 成员表记录 `4-2-3-1/4-3-3` 待官方首发图复核；Vinicius、Cunha 等进攻端状态来自本地复盘/成员表。 | Neymar 小腿伤导致首轮缺席，仍为分钟/可用性风险；Raphinha 在第二轮复盘中标记为上半场伤退风险；需官方医疗/训练确认。 | medium_local | Neymar、Raphinha、边锋替代方案、是否因争第一保持主力强度。 |
| 摩洛哥 | R1首发结构本地记录：Bounou；Hakimi、Diop、Riad、Mazraoui；El Aynaoui、Bouaddi；Brahim Diaz、Ounahi、El Khannouss；Saibari。 | Bounou minor knock watch/probable；Hakimi/Mazraoui 边后卫负荷；Saibari状态关键；Aguerd/Ezzalzouli 与 Saadane/Sbai 的名单/伤病替换存在冲突。 | medium_low_conflict | FRMF/FIFA名单更新、Bounou状态、双边后卫轮换、Saibari出场时间。 |
| 海地 | R1首发结构本地记录：Placide；Arcus、Adé、Delcroix、Expérience；Deedson、Jean Jacques、Bellegarde、Providence；Isidor、Pierrot。 | Bellegarde R1黄牌；Leverton Pierre/Garven Metusala 存在伤病替换冲突，本地口径为 Metusala 替代 Leverton Pierre 右内收肌伤；未发现本地硬停赛确认。 | medium_low_conflict | 官方名单、黄牌累计、是否大幅轮换与门将/后防稳定性。 |

## 4. source_quality 与冲突

| 项目 | 状态 | 影响 | 处理 |
|---|---|---|---|
| 竞彩销售状态 | conflicting | 页面整体提示暂停销售，但部分玩法赔率仍展示，周三052 SPF为未开售 | 保留冲突；模型端可使用赔率数值但需带 `sale_status_flag`。 |
| 二级近同源赔率 | missing | 新浪/500/懂球帝未提取到可核验明细 | 不硬补；后续刷新。 |
| 完整比分赔率 | partial | 比分页未完整展开，不能当完整比分市场 | 仅记录页面存在与聚合信息，不进入完整建模输入。 |
| 官方T-75首发 | unavailable_now | 预测首发需依赖成员表/复盘/伤停新闻 | 赛前约1小时刷新。 |
| 官方伤停/停赛 | partial | 多项来自本地材料，需官方交叉验证 | 风险字段保留 `needs_refresh`。 |
| C组官方积分/规则 | partial | 本地复盘可算积分；官方 tiebreaker/积分榜未本轮外部锁定 | 使用本地积分，标 `official_refresh_needed`。 |

## 5. source_log

| source_id | 类型 | 来源 | URL/路径 | captured_at | 支持字段 | 质量 |
|---|---|---|---|---|---|---|
| src_c_r3_001 | odds | 中国足彩网竞彩混合页 | https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini | 2026-06-24T18:17:55+08:00 | 周三051/052、SPF、RQSPF、开球时间、销售提示 | near_official_market |
| src_c_r3_002 | odds | 中国足彩网总进球页 | https://cp.zgzcw.com/lottery/jcplayvsForJsp.action?lotteryId=24 | 2026-06-24T18:17:55+08:00 | 周三051/052总进球赔率 | near_official_market |
| src_c_r3_003 | odds_partial | 中国足彩网比分页 | https://cp.zgzcw.com/lottery/jcplayvsForJsp.action?lotteryId=23 | 2026-06-24T18:17:55+08:00 | 周三051/052比分玩法入口与部分聚合信息 | partial |
| src_c_r3_004 | local_post_match | C组赛后复盘 | `比赛/已完成比赛/小组赛/C组/C组第一轮赛后汇总.md`; `比赛/已完成比赛/小组赛/C组/C组第二轮复盘.md` | 2026-06-24T18:17:55+08:00 | 当前积分、进失球、末轮情境 | local_verified |
| src_c_r3_005 | local_roster_state | 队伍成员表与 player_state | `队伍/苏格兰/成员表.md`; `队伍/巴西/成员表.md`; `队伍/摩洛哥/成员表.md`; `队伍/海地/成员表.md`; `data/outputs/player_state/*` | 2026-06-24T18:17:55+08:00 | 阵型依据、伤停/体能风险、名单冲突 | local_partial |
| src_c_r3_006 | odds_search | 新浪/500/懂球帝近同源检索 | web search attempted | 2026-06-24T18:17:55+08:00 | 未获得可用明细 | missing |

## 6. 可供建模输入

| match_id | fixture | kickoff_bj | group_context | spf_odds | spf_devig | rqspf | total_goals_odds | lineup_data_status | availability_flags | source_quality |
|---|---|---|---|---|---|---|---|---|---|---|
| C-R3-051 | 苏格兰 vs 巴西 | 2026-06-25 06:00 | 巴西4分+3争第一/锁高排名；苏格兰3分争前二或第三名比较；同开依赖摩洛哥赛果 | 9.60/5.40/1.19 | 9.22%/16.39%/74.39% | +1: 3.60/3.75/1.71；devig 24.60%/23.61%/51.79% | 14.00/5.30/3.70/3.40/5.00/8.50/15.00/22.00 | T-75 unavailable; predicted-lineup modeling required | SCO: Gilmour out/Fletcher in, McKenna watch; BRA: Neymar minutes risk, Raphinha injury risk | partial_ready |
| C-R3-052 | 摩洛哥 vs 海地 | 2026-06-25 06:00 | 摩洛哥4分+1争第一/锁高排名；海地0分-4理论或荣誉战；同开依赖巴西赛果 | SPF未开售 | n/a | -2: 2.19/3.85/2.42；devig 40.42%/22.99%/36.58% | 21.00/6.80/4.40/3.45/4.30/7.10/10.50/13.50 | T-75 unavailable; predicted-lineup modeling required | MAR: Bounou watch, Hakimi/Mazraoui load, Saibari role, roster conflict; HAI: Bellegarde yellow, Leverton/Metusala conflict | partial_ready |
