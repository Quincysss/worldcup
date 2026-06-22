# 2026 世界杯数据采集执行方案（第一阶段）

## 1. 目标与边界

- 目标：建立可持续、可核验、可交接的数据采集框架，为后续球队、球员、赛程、赔率、伤病、环境与模型分析提供统一输入。
- 边界：本阶段仅定义采集方案、字段规范、来源优先级、更新频率、冲突处理和交接格式；不进行逐队实采，不做比赛预测，不输出投注建议。
- 时效性原则：所有动态字段必须附带 `captured_at`，并在数据包内保留原始来源链路。
- 项目总目标对齐：最终项目将预测每场比分、胜平负、小组出线情况与最终冠军；数据采集端负责提供事实底座与市场信号，不直接产出预测结论。
- 角色边界补充：即使最终汇总报告允许投注建议，数据采集端仍只输出市场事实、赔率信号、风险提示和数据质量说明，不直接给投注建议。
- 编码要求：后续所有落地文档、JSON、JSONL、CSV、日志与草稿统一使用 `UTF-8` 编码。

## 2. 建议目录结构

后续产物统一放在 `K:\worldcup` 下，建议使用以下结构：

```text
K:\worldcup\data\
  plans\
  source_logs\
  packets\
    teams\
    players\
    matches\
  drafts\
  snapshots\
    odds\
    weather\
    rankings\
K:\worldcup\队伍\
  {球队中文名}\
K:\worldcup\比赛\
  未开始比赛\
    小组赛\
      {A-L组}\
    32强\
    16强\
    8强\
    4强\
    冠亚季\
  已完成比赛\
```

目录用途约定：

- `K:\worldcup\data\packets\`：机器可读标准数据包
- `K:\worldcup\data\snapshots\`：赔率、天气、排名等时间序列快照
- `K:\worldcup\队伍\{球队中文名}\`：面向主线程汇总的球队可读报告素材
- `K:\worldcup\比赛\未开始比赛\...`：按赛段与分组组织的赛前比赛报告素材
- `K:\worldcup\比赛\已完成比赛\`：完赛后的复盘与赛后事实包

## 3. 采集对象与字段范围

### 3.1 Team Packet

基于 skill 的 `Team Packet`，采集以下字段：

- `team`
- `fifa_code`
- `group`
- `coach.name`
- `coach.appointed`
- `coach.source_status`
- `competition_context.fixtures`
- `competition_context.base_camp`
- `competition_context.travel_notes`
- `competition_context.rest_days`
- `strength_indicators.fifa_rank`
- `strength_indicators.elo_rating`
- `strength_indicators.opta_power_rank`
- `strength_indicators.squad_market_value_eur`
- `strength_indicators.data_timestamp`
- `recent_form.matches_window`
- `recent_form.record`
- `recent_form.goals_for`
- `recent_form.goals_against`
- `recent_form.xg_for`
- `recent_form.xg_against`
- `recent_form.opponent_quality_note`
- `squad_status.final_squad_announced`
- `squad_status.key_players`
- `squad_status.injuries`
- `squad_status.suspensions`
- `squad_status.fitness_risks`
- `squad_status.depth_notes`
- `source_log`

补充建议字段：

- `captured_at`
- `last_verified_at`
- `data_quality_status`
- `conflict_flags`

### 3.2 Player Packet

- `player`
- `team`
- `club`
- `position`
- `age`
- `role`
- `availability.status`
- `availability.issue`
- `availability.last_update`
- `availability.expected_return`
- `recent_usage.club_minutes_window`
- `recent_usage.national_team_minutes_window`
- `recent_usage.starts_recent`
- `recent_usage.load_note`
- `performance_snapshot.goals`
- `performance_snapshot.assists`
- `performance_snapshot.xg`
- `performance_snapshot.xa`
- `performance_snapshot.defensive_actions_note`
- `performance_snapshot.set_piece_role`
- `source_log`

补充建议字段：

- `captured_at`
- `last_verified_at`
- `likely_start_probability_band`（仅做分档：high/medium/low，不做数值预测）
- `availability_conflict_note`

### 3.3 Match Data Packet

- `match`
- `stage`
- `date_local`
- `kickoff_local`
- `venue`
- `city`
- `teams`
- `availability_summary.team_a_absences`
- `availability_summary.team_b_absences`
- `availability_summary.status_timestamp`
- `context.rest_days`
- `context.travel_distance_note`
- `context.weather_forecast`
- `context.altitude_m`
- `market_snapshot.capture_time`
- `market_snapshot.bookmakers`
- `market_snapshot.one_x_two`
- `market_snapshot.asian_handicap`
- `market_snapshot.totals`
- `market_snapshot.line_movement_note`
- `source_log`

补充建议字段：

- `captured_at`
- `last_verified_at`
- `timezone_offset`
- `pitch_note`
- `referee_assignment`（如进入淘汰赛后对模型有帮助，可后置）
- `market_snapshot.no_vig_probabilities`

### 3.4 Source Log Entry

每一条动态信息至少对应一条 `Source Log Entry`：

- `source`
- `url`
- `captured_at`
- `supports_fields`
- `reliability_tier`
- `notes`

补充建议字段：

- `source_type`（official/media/database/market/weather）
- `published_at`
- `access_method`

## 4. 来源优先级与字段映射

### 4.1 队伍与赛程基础信息

- 首选来源：
  - FIFA 官方赛程与比赛中心
  - 各足协官网
  - 官方球队公告
- 备选来源：
  - ESPN
  - BBC Sport
  - FotMob
  - SofaScore
- 覆盖字段：
  - 组别、比赛时间、场地、城市、主教练、官方名单、比赛状态

### 4.2 球员名单、伤病、停赛、可用性

- 首选来源：
  - 足协官方名单公告
  - FIFA 比赛名单/赛前官方文件
  - 俱乐部官方伤病公告
  - 国家队官方社媒/官网
- 备选来源：
  - Reuters
  - AP
  - BBC
  - ESPN
  - The Athletic
  - Transfermarkt
  - FotMob
- 覆盖字段：
  - 入选/落选、伤病类型、恢复时间、停赛轮次、出场限制、预计首发状态

### 4.3 实力与表现指标

- 首选来源：
  - FIFA Ranking
  - World Football Elo Ratings
  - Opta/The Analyst
  - FBref
- 备选来源：
  - Transfermarkt
  - WhoScored
  - SofaScore
- 覆盖字段：
  - FIFA 排名、Elo、近期战绩、进失球、xG/xGA、定位球角色、对手质量说明、市场身价

### 4.4 环境与赛地因素

- 首选来源：
  - FIFA 赛地信息
  - 球场/主办城市官方资料
  - 官方天气服务或可靠气象接口
- 备选来源：
  - Weather.com
  - AccuWeather
  - Timeanddate
- 覆盖字段：
  - 海拔、天气预报、温度、湿度、降水、时区、旅行距离、休息天数、球场备注

### 4.5 赔率与市场信号

- 首选来源：
  - 直接博彩公司页面
  - 官方或高可信赔率聚合页
- 备选来源：
  - OddsPortal
  - Flashscore
  - 交易所价格页面
- 覆盖字段：
  - `bookmaker`
  - `market`
  - `selection`
  - `line`
  - `price_type`
  - `odds_decimal`
  - `water`
  - `implied_probability`
  - `no_vig_probability`
  - `capture_time`
  - `line_movement`

## 5. 更新频率

按字段波动性定义更新节奏：

### 5.1 低频更新（每周 1 次，或有官方变动即更新）

- 主教练
- 基础队伍资料
- 基地营信息
- 长周期实力指标（如市场总身价）

### 5.2 中频更新（每 48 小时）

- FIFA 排名
- Elo
- 近期战绩窗口
- 球员俱乐部/国家队使用负荷

### 5.3 高频更新（每日 1 至 2 次）

- 伤病
- 停赛
- 训练情况
- 预计首发
- 赛地天气
- 比赛时间/场地调整

### 5.4 比赛临近更新（T-72h / T-24h / T-6h / T-75m）

- T-72h：初次赛前状态包
- T-24h：官方发布与媒体交叉核验
- T-6h：伤病、天气、赔率再校验
- T-75m：如可获取，核验官方首发、替补名单、最终停赛状态

### 5.5 实时快照

- 赔率：至少每次采集时记录精确 `capture_time`
- 天气：赛前 24 小时内至少滚动更新 2 次
- 官方名单/伤停：一旦官方源更新，立即覆盖并保留旧版本快照

## 6. 冲突来源处理规则

状态标签统一使用：

- `confirmed`：官方来源，或两家高可信来源独立一致
- `probable`：可信媒体明确报道，但无官方最终确认
- `uncertain`：单源、过时、表述含糊或缺乏二次验证
- `conflicting`：可靠来源之间存在明显冲突

处理规则：

1. 不自行消解冲突，不擅自取平均或选边。
2. 在对应对象内保留 `conflict_flags` 或 `availability_conflict_note`。
3. 在 `source_log` 中并列保留冲突来源及各自 `captured_at`。
4. 优先参考最新官方源，但如果非官方更新更晚且与官方不一致，状态仍标记为 `conflicting`，等待下一次官方核验。
5. 对每个冲突项添加再核验触发条件，例如：
   - “赛前 24 小时核验足协公告”
   - “赛前 75 分钟核验官方首发单”

## 7. 赔率字段记录方式

### 7.1 最小记录单元

建议对每个盘口条目记录：

```json
{
  "bookmaker": "",
  "market": "1x2/asian_handicap/totals/outright/group_winner/qualification",
  "selection": "",
  "line": null,
  "price_type": "closing/live/opening/instant",
  "odds_format": "decimal",
  "odds_decimal": null,
  "water": null,
  "implied_probability": null,
  "no_vig_probability": null,
  "capture_time": "",
  "source_url": "",
  "status": "confirmed/probable/uncertain/conflicting",
  "notes": ""
}
```

### 7.2 隐含概率计算

- 十进制赔率的原始隐含概率：`implied_probability = 1 / odds_decimal`
- 例如：
  - 主胜赔率 `2.50`
  - 原始隐含概率 `1 / 2.50 = 0.40`

### 7.3 多结果市场的归一化

对 1X2 等多结果盘口，可额外记录：

- `overround = sum(1 / decimal_odds_i)`
- `normalized_probability_i = (1 / decimal_odds_i) / overround`

说明：

- 原始隐含概率保留庄家水位影响
- 归一化概率用于建模时的市场基准输入
- 任何概率字段都只描述市场信号，不构成投注建议

### 7.4 水位与去水概率口径

- `water`：记录盘口对应水位/返还信息；若源站直接给出欧赔、水位或返还率，则按原字段落地，并在 `notes` 说明表示法。
- `no_vig_probability`：用于记录去除超额利润后的概率。
- 对 1X2、大小球、让球等同一市场的多选项盘口，优先按同一时点同一 `bookmaker` 的完整报价计算去水概率。
- 如源站仅提供部分选项，保留 `implied_probability`，`no_vig_probability` 可置 `null`，不得猜测补齐。
- 如不同赔率聚合页与博彩公司直连页报价不同，保留为不同快照，不做人工合并。

### 7.5 建议赔率快照层

建议在 `K:\worldcup\data\snapshots\odds\` 下按比赛与时间落地快照，便于后续分析盘口漂移：

- 文件格式：`JSON` 或 `JSONL`
- 必备字段：
  - `match`
  - `bookmaker`
  - `market`
  - `selection`
  - `line`
  - `odds_decimal`
  - `water`
  - `implied_probability`
  - `no_vig_probability`
  - `capture_time`
  - `source_url`
  - `status`

## 8. 对其他 agent 的交接格式

### 8.1 给战术 agent

交接目标：帮助识别阵容完整度、关键位置缺口、球员负荷与定位球角色。

建议格式：

- 以 `Team Packet + 关键球员 Player Packet` 组合交付
- 文件格式：`JSON`
- 每队一个文件，命名建议：
  - `K:\worldcup\data\packets\teams\<team>.json`
  - `K:\worldcup\data\packets\players\<team>__key_players.json`

重点字段：

- `squad_status`
- `availability`
- `recent_usage`
- `set_piece_role`
- `depth_notes`

可读报告素材落地建议：

- `K:\worldcup\队伍\{球队中文名}\team-brief.md`
- 编码统一为 `UTF-8`
- 风格保持事实型、结构化，供主线程后续改写为球迷评论风格

### 8.2 给模型 agent

交接目标：提供可结构化建模特征。

建议格式：

- `Match Data Packet`
- 附加 `Team Packet` 中的 `strength_indicators` 与 `recent_form`
- 文件格式：`JSON` 或 `JSONL`

重点字段：

- `strength_indicators`
- `recent_form`
- `availability_summary`
- `rest_days`
- `travel_distance_note`
- `weather_forecast`
- `market_snapshot`
- `market_snapshot.no_vig_probabilities`

建议额外导出一层扁平化特征表：

- 路径：`K:\worldcup\data\drafts\model_features\`
- 作用：供模型 agent 做特征拼接，不替代原始 packet

补充说明：

- 最终项目要覆盖比分、胜平负、出线与冠军预测，因此模型侧必须能同时读取基础实力、可用性、赛程环境与赔率市场信号。
- 数据采集端只负责把这些输入标准化，不负责定义最终预测权重。

### 8.3 给核验 agent

交接目标：复核数据新鲜度、冲突项与来源质量。

建议格式：

- 原始 `packet` + `source_log`
- 文件格式：`JSON`
- 每次更新同时写一份 `source_log` 聚合文件到：
  - `K:\worldcup\data\source_logs\YYYYMMDD_HHMM_source_log.json`

重点字段：

- `captured_at`
- `last_verified_at`
- `supports_fields`
- `reliability_tier`
- `conflict_flags`
- `data_quality_status`

### 8.4 给主线程/汇总线程

交接目标：支持最终面向业余球迷的评论式报告生成。

建议格式：

- 机器可读层：继续交付 `JSON/JSONL`
- 人类可读素材层：补充 `Markdown`

建议路径：

- 球队素材：`K:\worldcup\队伍\{球队中文名}\`
- 比赛素材：`K:\worldcup\比赛\未开始比赛\小组赛\{A-L组}\`、`32强`、`16强`、`8强`、`4强`、`冠亚季`
- 已完赛复盘：`K:\worldcup\比赛\已完成比赛\`

要求：

- 数据包保持专业结构化
- 文本素材可读但不做结论性预测
- 全部使用 `UTF-8`

## 9. 第一批建议采集范围

不建议一开始就平均铺开全部 48 队。建议采用“比赛驱动 + 重点队伍优先”的分批方案。

### 方案 A：按小组分批

- 优点：结构清晰，适合主线程按组分析
- 缺点：对跨组夺冠热门的深度追踪启动较慢

### 方案 B：按夺冠热门 + 东道主优先

- 第一批：
  - 东道主：美国、加拿大、墨西哥
  - 夺冠热门与高关注队：如巴西、阿根廷、法国、英格兰、西班牙、德国、葡萄牙
- 优点：尽快覆盖最可能进入淘汰赛深轮次的样本
- 缺点：小组全景完整度不足

### 方案 C：按比赛日驱动

- 先采集最近 3 至 5 个比赛日涉及球队与对阵
- 优点：时效性最强，适合动态预测流水线
- 缺点：全局静态画像建立较慢

### 推荐执行顺序

建议采用混合分层：

1. 先建全部 48 队的轻量 `Team Packet` 骨架
2. 优先深采东道主与夺冠热门
3. 按比赛日为即将开赛球队补齐 `Player Packet` 与 `Match Data Packet`
4. 进入淘汰赛后改为“对阵驱动”更新模式

理由：

- 能兼顾覆盖率、时效性和资源效率
- 主线程可尽早获得全局底图
- 动态采集压力集中在即将开赛和高影响比赛

## 10. 建议的数据质量门槛

只有满足以下条件的数据包才建议交付下游：

- 所有动态字段均有 `captured_at`
- 至少 1 个官方源或 2 个高可信非官方源支撑关键可用性信息
- 冲突项已明确标注状态，不存在无标签冲突
- 赔率字段包含 `bookmaker`、`market`、`odds_decimal`、`implied_probability`、`capture_time`，在可计算时补 `water` 与 `no_vig_probability`
- 每个 packet 均附 `source_log`
- 所有落地文件均使用 `UTF-8`

## 11. 第一阶段执行结论

第一阶段建议先完成“48 队骨架 + 重点队深采 + 比赛日前滚动更新”的采集体系，而不是立即逐队做全量深采。后续正式开采时，统一输出 `Team Packet`、`Player Packet`、`Match Data Packet` 和 `Source Log Entry`，并强制保留 `captured_at`、来源链接、状态标签与冲突说明。

结合主线程新增约束，后续实采还应同步建设赔率快照层、比赛目录层和球队可读素材层，但数据采集角色仍保持“只给事实与风险、不直接给投注建议”的边界。
