# 2026 美加墨世界杯数据模型执行方案（第一阶段）

## 1. 目标与边界

### 1.1 本阶段目标

本阶段只定义模型执行方案，不对具体球队、具体比赛给出预测结论。输出目标是建立一套：

- 可解释：先有清晰基线，再有可追溯修正项
- 可校验：所有输入、假设、修正、输出都能回溯到字段和时间戳
- 可扩展：先支持单场，再自然扩展到小组赛、淘汰赛和冠军概率
- 可协作：便于数据采集 agent、战术 agent、核验 agent、主线程统一交接

### 1.2 模型边界

- 事实输入以数据采集 agent 的结构化数据包为准。
- 战术/教练 agent 的内容只作为修正项输入，必须标明其属于“分析”或“假设”，不能冒充事实。
- 赔率只作为市场信号与校准参照，不作为唯一真值来源。
- 输出必须是概率、期望值、分布和不确定性标签，不使用确定性语言。
- 对缺失、过期、冲突字段必须显式标注，不补脑、不隐式填平。

## 2. 建模目标分层

### 2.1 单场 90 分钟胜平负

目标：输出 `team_a_win / draw / team_b_win`。

方法：

- 先建立两队 90 分钟预期进球 `lambda_a`、`lambda_b`
- 再由比分分布矩阵求和得到胜平负概率
- 初版以独立 Poisson 为基线，后续可加入低比分相关性修正

### 2.2 单场预期进球

目标：输出 `expected_goals.team_a`、`expected_goals.team_b`。

方法：

- 由基线强度差 + 上下文修正得到进攻端和防守端综合强度
- 将强度映射到 `lambda_a`、`lambda_b`
- 明确区分“长期实力导致的均值”与“临场情境导致的偏移”

### 2.3 比分分布

目标：输出常见比分的概率质量，如 `0-0`、`1-0`、`1-1`、`2-1`。

方法：

- 基于 `lambda_a`、`lambda_b` 生成 0 到 6 球或更高截断的比分矩阵
- 保留主模态比分、累计尾部概率和大比分尾部警告

### 2.4 小组出线概率

目标：输出每队：

- 平均积分
- 小组第 1 到第 4 名概率
- 直接出线概率
- 视赛制需要的“最佳第三名”晋级概率

方法：

- 使用每场比赛的胜平负和比分分布进行 Monte Carlo 模拟
- 按官方积分和净胜球等 tie-break 规则排名

### 2.5 淘汰赛晋级概率

目标：输出每队进入各轮的概率，如：

- 32 强
- 16 强
- 8 强
- 4 强
- 决赛
- 冠军

方法：

- 将小组名次分布映射到淘汰赛路径
- 对每个潜在对阵复用单场模型
- 对平局后的加时和点球使用单独晋级转换层

### 2.6 冠军概率

目标：输出每队夺冠概率及路径敏感性。

方法：

- 在完整赛程路径上做全赛事 Monte Carlo
- 将小组赛路径、半区强度、休息差、潜在主客环境一起纳入

## 3. 输入字段合同

以下合同兼容 skill 中的 `Model Input Contract`，并补充模型落地所需字段层级。

### 3.1 必需字段

#### A. Match Packet 必需字段

- `match_id`
- `stage`
- `date_local`
- `kickoff_local`
- `venue`
- `city`
- `teams.team_a`
- `teams.team_b`
- `teams.team_a_coach`
- `teams.team_b_coach`
- `context.rest_days.team_a`
- `context.rest_days.team_b`
- `context.travel_note.team_a`
- `context.travel_note.team_b`
- `source_log`
- `captured_at`

#### B. Team Packet 必需字段

- `team`
- `group`
- `strength_indicators.elo_rating` 或同等级基线评分
- `strength_indicators.fifa_rank`
- `strength_indicators.opta_power_rank`（若无则标缺）
- `strength_indicators.squad_market_value_eur`（若无则标缺）
- `recent_form.matches_window`
- `recent_form.record`
- `recent_form.goals_for`
- `recent_form.goals_against`
- `recent_form.opponent_quality_note`
- `squad_status.injuries`
- `squad_status.suspensions`
- `squad_status.fitness_risks`
- `captured_at`
- `last_verified_at`
- `source_log`

#### C. Tournament Simulation 必需字段

- `groups`
- `full_fixture_list`
- `advancement_rules`
- `tiebreaker_rules`
- `knockout_bracket_rules`
- `baseline_team_ratings`

### 3.2 强烈建议字段

- `recent_form.xg_for`
- `recent_form.xg_against`
- `expected_lineup`
- `likely_starters`
- `goalkeeper_status`
- `set_piece_attack_note`
- `set_piece_defense_note`
- `climate.temperature_c`
- `climate.humidity_pct`
- `altitude_m`
- `pitch_note`
- `market_snapshot.one_x_two`
- `market_snapshot.asian_handicap`
- `market_snapshot.totals`
- `market_snapshot.outright`
- `market_snapshot.line_movement`
- `tactical_notes`

### 3.3 可选字段

- `referee_assignment`
- `training_status`
- `press_conference_notes`
- `crowd_mix_note`
- `penalty_taker_order_estimate`
- `extra_time_rotation_depth_note`

### 3.4 字段状态与新鲜度

每个动态字段需要同时输出：

- `status`: `confirmed / probable / uncertain / conflicting`
- `captured_at`
- `last_verified_at`
- `source_count`

模型读取层统一生成：

- `input_readiness`: `ready / partial / blocked`
- `missing_fields`
- `stale_fields`
- `conflict_flags`

判定原则：

- `ready`：必需字段齐全，波动字段在 freshness 规则内
- `partial`：可建模，但关键修正项缺失或过期
- `blocked`：基线评分、赛程身份、关键可用性或赛制规则缺失

## 4. 基线强度模型

### 4.1 设计原则

- 先做一层“长期实力”基线，避免被单条新闻或短期舆论带偏
- 使用多源强度而不是单指标
- 对缺失指标做权重重归一化，不强行补值
- 对近期表现只做有限增量，不允许盖过长期强度

### 4.2 基线强度因子

建议使用五类输入：

1. `Elo`
2. `FIFA 排名`
3. `Opta 或同类 power rating`
4. `近期表现`
5. `阵容身价`

### 4.3 标准化方式

各指标先转为统一方向的标准分：

- `z_elo`
- `z_fifa`：排名越小越强，因此需方向翻转
- `z_opta`
- `z_recent`
- `z_squad_value`

建议：

- 对身价取 `log(value)` 后再标准化
- 对近期表现做对手质量调整
- 对友谊赛赋较低权重

### 4.4 初版融合公式

定义球队长期强度：

```text
base_strength_team =
  w_elo * z_elo +
  w_fifa * z_fifa +
  w_opta * z_opta +
  w_recent * z_recent +
  w_squad * z_squad_value
```

初版建议权重：

- `w_elo = 0.35`
- `w_fifa = 0.10`
- `w_opta = 0.25`
- `w_recent = 0.20`
- `w_squad = 0.10`

规则：

- 缺失某项时，不补默认值，改为对剩余权重做归一化
- 如果 `xG/xGA` 缺失，`z_recent` 只用战绩和净胜球，但置信度下调
- FIFA 排名只保留小权重，避免名气与积分体系双重放大

### 4.5 从强度到单场优势

两队基线差：

```text
delta_base = base_strength_A - base_strength_B
```

然后转成 90 分钟层面的基础对抗差：

```text
match_edge_90 = beta_strength * delta_base
```

其中 `beta_strength` 由历史校准得到，初版不手工硬编码到最终模型结果，只在执行方案中保留为待校准参数。

## 5. 从强度到进球模型

### 5.1 初版进球框架

为保证可解释性，第一版采用“双边预期进球 + 比分矩阵”框架：

```text
log(lambda_a) = c0 + c1 * delta_base + adj_a
log(lambda_b) = c0 - c1 * delta_base + adj_b
```

其中：

- `c0`：赛事平均进球环境
- `c1`：强度差对进球均值的影响
- `adj_a / adj_b`：情境修正项总和

### 5.2 为什么先用这一版

- 它能同时支持胜平负、预期进球和比分分布
- 它比纯分类模型更利于后续小组赛 tie-break 模拟
- 它对伤病、天气、旅行这类修正项更容易落地

### 5.3 后续可升级方向

- 对低比分相关性加入 Dixon-Coles 式修正
- 对加时赛单独建模
- 对点球大战加入门将和罚点稳定性模块

## 6. 修正项设计

修正项不直接替代基线，只作为增量层进入 `adj_a / adj_b` 或 `match_edge_90`。

### 6.1 修正项总原则

- 先定义方向，再定义量级，再定义置信度
- 对每个修正项设置上限，避免单一叙事把模型拉穿
- 区分事实修正和分析修正

字段层面建议：

- `adjustment_type`
- `adjustment_target`
- `direction`
- `magnitude_band`
- `confidence`
- `basis`: `fact / analysis / assumption`

### 6.2 伤病与停赛

输入来源：

- 数据采集 agent 的 `injuries / suspensions / fitness_risks`
- 战术 agent 的位置替代成本分析

进入方式：

- 先给每个缺席球员一个“角色权重”而不是名气权重
- 再按位置组聚合成：
  - 中轴缺失修正
  - 门将修正
  - 后卫线稳定性修正
  - 终结点缺失修正

规则：

- 官方缺阵与媒体猜测分开
- `fitness_risk` 默认小于 `confirmed_out`
- 如果替补深度充足，净修正应明显收敛

### 6.3 球员负荷与轮换风险

输入：

- 近期俱乐部分钟数
- 国家队连续首发
- 恢复天数
- 战术 agent 的轮换预期

进入方式：

- 作为体能衰减修正，优先影响下半场强度和总进球环境
- 若仅存在轮换可能而非确认轮换，进入不确定性层而非强修正层

### 6.4 主场 / 半主场 / 东道主

输入：

- 举办国身份
- 场地地理位置
- 观众构成预估

进入方式：

- 不使用传统联赛主场优势的完整量级
- 设三档：
  - `host`
  - `semi_host`
  - `neutral`

说明：

- 美加墨三东道主应与一般中立场分开，但量级必须通过历史国际赛事校准

### 6.5 旅行与休息

输入：

- `rest_days`
- `travel_distance_note`
- 时区变化

进入方式：

- 休息差优先作为体能和节奏修正
- 长距离旅行和跨时区优先影响慢热、压迫持续性和比赛后段失球风险

建议特征：

- `rest_day_diff`
- `travel_band`
- `timezone_shift_hours`

### 6.6 气候、海拔、场地

输入：

- 温度
- 湿度
- 海拔
- 场地备注

进入方式：

- 主要调节总进球均值和体能衰减
- 对已知更适应该环境的球队，只做小幅相对修正

注意：

- 天气在 T-72h 以前只应低权重使用
- 高温高湿不等于单边受损，优先作为总量环境修正

### 6.7 赛程动机

适用场景：

- 小组末轮
- 已提前晋级或提前出局
- 可能“平局即可出线”

进入方式：

- 不直接根据叙事改 1X2
- 先影响首发强度和进球节奏，再通过 `lambda` 体现

规则：

- 没有可靠轮换或动机证据时，不做强修正
- 所有“战意”结论必须标注为 `analysis` 或 `assumption`

## 7. 赔率融合设计

### 7.1 赔率处理目标

- 提取市场共识概率
- 识别模型与市场分歧
- 作为校准参考或弱融合输入
- 不输出投注建议

### 7.2 隐含概率与去水

十进制赔率：

```text
raw_implied_probability = 1 / decimal_odds
overround = sum(raw_implied_probability_i)
fair_probability_i = raw_implied_probability_i / overround
```

要求：

- 至少完整记录同一时点的完整结果集
- 明确 `bookmaker`、`capture_time`、`market_type`

### 7.3 市场移动

记录：

- 开盘概率
- 当前概率
- 变动幅度
- 变动方向
- 采样时窗

用途：

- 判断市场是否因伤停、首发、天气或舆情发生重新定价
- 不将短时剧烈波动自动视为真实信息

### 7.4 与自建模型的关系

建议采取“两层使用”：

#### 层 1：默认对照，不直接融合

- 输出 `model_probability`
- 输出 `market_fair_probability`
- 输出 `model_minus_market`

适用：

- 早期版本
- 数据字段还不完整时
- 需要观察系统性偏差时

#### 层 2：弱融合校准

只在以下条件满足时启用：

- 自建模型已完成回测
- 市场样本覆盖稳定
- 能清楚解释融合权重

建议形式：

```text
final_logit = alpha * model_logit + (1 - alpha) * market_logit
```

其中：

- `alpha` 初版建议在 `0.70` 到 `0.85`
- 临近开赛且官方阵容已明确时，可适度降低 `alpha`
- 若市场来源少、过水高、波动异常，则不融合，只保留对照

### 7.5 避免赔率吞噬模型

- 市场只能是“信息汇聚器”，不能覆盖字段缺失提示
- 即使与市场融合，也保留原始模型输出和差异原因
- 如果模型与市场显著偏离，先排查数据新鲜度，再谈融合

## 8. 模拟方案

### 8.1 小组赛模拟

流程：

1. 为每场比赛生成 `lambda_a`、`lambda_b`
2. 抽样比分
3. 计算积分、净胜球、进球数
4. 应用官方 tie-break 规则
5. 重复 `N` 次得到名次分布

初版建议：

- `N = 50,000` 作为常规输出
- 关键组可升到 `100,000`

### 8.2 48 队到 32 强路径

若赛制存在“最佳第三名”或复杂映射，需单独编码：

- 每次模拟先确定所有小组名次
- 再按官方映射表生成 32 强对阵
- 不允许用静态 bracket 近似替代真实规则

### 8.3 淘汰赛模拟

每轮流程：

1. 先模拟 90 分钟比分
2. 若打平，进入“晋级层”
3. 晋级层可分为：
   - 加时赛附加进球模型
   - 点球大战胜率模型

初版简化建议：

- 第一版可先用“90 分钟打平后按相对强度映射晋级概率”的透明近似
- 一旦门将、罚点手、替补深度字段稳定，再拆分加时和点球层

### 8.4 冠军概率

流程：

- 从小组赛开始整条路径联动模拟
- 保留每队每轮到达概率
- 输出路径敏感性，如：
  - 小组名次变化对后续半区的影响
  - 对潜在强敌相遇概率的影响

## 9. 校准与反偏差

### 9.1 名气偏差

问题：

- FIFA 排名、媒体叙事、身价容易共同抬高传统强队

控制方式：

- FIFA 只给低权重
- 身价只作为补充，不主导
- 对所有强度源做历史回测后的 shrinkage

### 9.2 近期偏差

问题：

- 近期 3 到 5 场容易被赛程强弱和样本噪声放大

控制方式：

- 对近期窗口做对手质量修正
- 友谊赛降权
- 最近一场比赛不允许单独触发大幅跳变

### 9.3 赔率偏差

问题：

- 市场本身会受热门队流量、媒体事件和流动性影响

控制方式：

- 先去水再比较
- 只用高质量市场快照
- 保留多家书的分散度，避免把单家盘口当共识

### 9.4 样本过小

问题：

- 国家队比赛天然稀疏，阵容连续性也弱

控制方式：

- 基线用长期强度主导
- 临场修正做有界处理
- 输出置信度而不是过度精确的小数

### 9.5 模型过拟合

控制方式：

- 先上少量强解释特征
- 每新增一类修正项，都要求单独验证其边际贡献
- 如果某修正无法稳定提升校准，则降级为说明项而不是建模项

## 10. 输出格式

### 10.1 给主线程的标准 JSON

建议统一输出四层：

```json
{
  "model_scope": {
    "target": "",
    "coverage": [],
    "captured_at": "",
    "model_version": ""
  },
  "input_readiness": {
    "status": "ready",
    "available_inputs": [],
    "missing_inputs": [],
    "stale_inputs": [],
    "conflict_flags": [],
    "uncertainty_flags": []
  },
  "method": {
    "baseline_model": "",
    "baseline_inputs": [],
    "adjustments_used": [],
    "odds_treatment": "",
    "simulation_runs": null
  },
  "probabilities": {}
}
```

### 10.2 单场输出字段

兼容 skill 的 `Match Probability` schema，建议补充：

- `match_id`
- `baseline_edge`
- `adjustment_summary`
- `scoreline_tail_mass`
- `sensitivity.top_3`
- `source_dependencies`

### 10.3 小组输出字段

兼容 `Group Simulation` schema，建议补充：

- `group_rules_version`
- `best_third_place_probability`（若适用）
- `points_distribution`
- `goal_difference_distribution`

### 10.4 淘汰赛/冠军输出字段

兼容 `Tournament Path` schema，建议补充：

- `path_entropy`
- `most_common_path`
- `round_elimination_modes`
- `market_outright_comparison`

### 10.5 给核验 agent 的附加字段

- `source_dependencies`
- `feature_snapshot`
- `missing_fields`
- `stale_fields`
- `manual_override_flags`
- `assumption_log`

### 10.6 给评论整合层的简化字段

评论层只读以下内容，不直接读原始细粒度特征：

- `headline_probabilities`
- `main_drivers`
- `risk_flags`
- `confidence`
- `sensitivity_summary`

这样可以防止评论层把假设说成事实。

## 11. 第一批建议建模范围

### 11.1 不建议的起步方式

不建议一开始就对全部 48 队做完整高精度建模，因为：

- 动态字段维护成本高
- 伤停、首发、天气、赔率新鲜度难同步
- 初版更需要先验证框架而不是追求全覆盖精细度

### 11.2 建议起步顺序

建议采用“三层推进”：

1. 全部 48 队建立轻量基线强度层
2. 东道主 + 热门队建立完整修正层
3. 选取 2 到 4 个完整小组做端到端模拟验证

理由：

- 能快速获得全局强度地图
- 能优先覆盖主线程最关心的高影响样本
- 能尽早验证小组模拟、晋级规则和输出 schema

### 11.3 第一批执行优先级

第一批建议范围：

- `全部 48 队`：只做基线强度卡片
- `东道主`：美国、加拿大、墨西哥做完整模型输入准备
- `热门队样本池`：建立完整单场模板和淘汰赛模板
- `2 到 4 个完整小组`：跑小组 Monte Carlo，校验赛制与 tie-break 逻辑

## 12. 第一阶段交付清单

### 12.1 本阶段应产出

- 一份模型执行方案文档
- 一份输入字段合同清单
- 一份输出 JSON schema 扩展清单
- 一套基线权重与修正项字典
- 一套小组赛与淘汰赛模拟流程说明

### 12.2 下一阶段启动条件

只有在以下条件满足后，才进入具体比赛预测：

- 48 队基线强度字段至少达到 `partial`
- 首批重点队伍关键可用性字段达到 `ready`
- 赛制规则和 bracket 映射确认完成
- 赔率抓取链路能稳定输出去水概率
- 小组模拟流程已完成一次 dry run

## 13. 主线程可直接采用的执行结论

第一阶段建模应采取“全队轻基线 + 重点队完整修正 + 完整小组模拟验证”的分层路线，而不是立即对全部 48 队做同精度预测。模型主干建议采用：

- 多源强度融合生成 `base_strength`
- 通过 `lambda_a / lambda_b` 统一驱动胜平负、预期进球和比分分布
- 将伤病、休息、旅行、气候、主场与动机作为有界修正项
- 将赔率作为去水后的市场对照与弱融合校准输入
- 用 Monte Carlo 处理小组名次、淘汰赛路径和冠军概率

在没有具体比赛输入包之前，不进入逐场预测。
