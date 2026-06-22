# 2026 世界杯战术/教练分析执行方案（第一阶段）

## 1. 目标与边界

- 目标：把数据采集 agent 提供的球队、球员、比赛事实包，转换成可解释、可核验、可结构化的战术与教练分析产物。
- 边界：本阶段只定义执行方案、输入要求、分析框架、交接格式与优先级，不启动逐队战术结论，不直接做赛果预测，不直接输出投注建议。
- 原则：所有重要战术判断必须有事实包、比赛样本或可回溯来源支撑，并逐条标注 `confidence: high / medium / low`。
- 项目链路定位：最终项目会预测每场比分、胜平负、小组出线和冠军归属；战术 agent 不负责直接给出这些结论，但必须输出可供主线程和模型线程消费的战术因子。
- 编码要求：本项目后续所有战术中间产物、草稿、结构化 JSON 和说明文档统一使用 UTF-8 编码。

## 2. 建议目录与产物位置

后续战术相关产物统一放在 `K:\worldcup\data\` 下，建议使用：

```text
K:\worldcup\data\
  plans\
    phase1-tactics-coach-plan.md
  drafts\
    tactics\
  packets\
    tactics\
    matchup_tactics\
  source_logs\
    tactics\
```

- `plans`：流程方案与字段规范。
- `drafts\tactics`：阶段性战术草稿、待核验笔记。
- `packets\tactics`：单队战术包。
- `packets\matchup_tactics`：指定对阵的战术对位包。
- `source_logs\tactics`：战术判断对应的样本与来源索引。
- 最终给用户的可读球队/比赛报告不由本 agent 写入；由汇总线程写入 `K:\worldcup\队伍\` 与 `K:\worldcup\比赛\`。

## 3. 需要数据采集 agent 提供的输入字段

## 3.1 最低可开工输入

只要下列字段齐备，战术分析即可启动：

- `team`
- `coach.name`
- `coach.appointed`
- `squad_status.final_squad_announced`
- `squad_status.key_players`
- `squad_status.injuries`
- `squad_status.suspensions`
- `recent_form.matches_window`
- `recent_form.opponent_quality_note`
- `source_log`
- `captured_at`
- `last_verified_at`

但仅有以上字段，只能产出低分辨率战术轮廓，不能支撑高置信度结论。

## 3.2 战术分析强依赖字段

建议数据采集 agent 为每支球队补齐以下字段，优先写入 `Team Packet` 或其关联文件：

- `team`
- `fifa_code`
- `group`
- `coach.name`
- `coach.appointed`
- `coach.tenure_matches`
- `coach.previous_tournament_history`
- `likely_systems_recent`
- `recent_match_samples`
- `captured_at`
- `last_verified_at`
- `source_log`

其中 `recent_match_samples` 建议按比赛为单位提供：

```json
{
  "match_id": "",
  "date": "",
  "competition": "world_cup_qualifier/continental_tournament/friendly/nations_league/other",
  "opponent": "",
  "opponent_strength_band": "high/medium/low",
  "venue_type": "home/away/neutral",
  "coach": "",
  "starting_formation": "",
  "starting_xi": [],
  "substitutions": [
    {
      "minute": null,
      "player_off": "",
      "player_on": "",
      "role_effect_note": ""
    }
  ],
  "game_state_timeline_note": "",
  "set_piece_takers": [],
  "set_piece_targets": [],
  "availability_notes": [],
  "sample_quality": "high/medium/low",
  "sources": []
}
```

## 3.3 球员层面需要的战术字段

为避免只看阵型不看角色，关键球员需要补充：

- `player`
- `team`
- `club`
- `position`
- `national_team_role`
- `club_role_note`
- `likely_start_probability_band`
- `availability.status`
- `availability.issue`
- `recent_usage.national_team_minutes_window`
- `recent_usage.club_minutes_window`
- `performance_snapshot.set_piece_role`
- `performance_snapshot.defensive_actions_note`
- `performance_snapshot.progression_note`
- `performance_snapshot.aerial_note`
- `source_log`

## 3.4 指定对阵分析所需额外字段

如果后续进入某场比赛对位分析，数据采集 agent 还应补充：

- `match`
- `stage`
- `date_local`
- `venue`
- `city`
- `context.rest_days`
- `context.travel_distance_note`
- `context.weather_forecast`
- `context.altitude_m`
- `availability_summary.team_a_absences`
- `availability_summary.team_b_absences`
- `referee_assignment`（如可获得）

## 3.5 对数据采集 agent 的字段要求补充

除原始事实外，建议每条比赛样本额外标注：

- `sample_scope`: `competitive/friendly/mixed`
- `same_coach`: `true/false`
- `same_core_xi_count`
- `opponent_style_tag`
- `video_or_tactical_report_available`: `true/false`
- `source_reliability_tier`

这些字段将直接决定战术判断的置信度。

## 4. 战术拆解方法

我会把每支球队拆成“稳定结构”“对手特定部署”“临场波动”“伤病被迫调整”四层，避免把一次性现象误写成球队身份。

## 4.1 阵型与结构

输出内容：

- 名义阵型
- 持球阵型
- 无球阵型
- 常见替代阵型
- 明显不对称结构
- 关键角色依赖

判断方法：

- 以最近 8 到 12 场、且尽量属于同一主教练周期的比赛为主样本。
- 优先看正式比赛，再看高质量友谊赛，最后才参考低强度热身赛。
- 如果名义阵型不变但角色分工明显变化，优先记录“结构变化”而不是只写数字阵型。

## 4.2 控球与出球结构

关注：

- 门将是否参与第一线出球
- 中卫拉开宽度与后腰落位方式
- 边后卫是内收、套边还是保守站位
- 第一推进路线是中路、边路还是直接找前锋
- 面对高压时的出球容错

输出标签建议：

- `build_up_style`
- `preferred_progression_zones`
- `direct_play_frequency`
- `press_resistance_level`
- `first_outlet_dependency`

## 4.3 压迫方式

关注：

- 压迫高度是高位、中位、低位还是可变
- 触发条件是回传、边路停球、门将持球还是中场背身
- 人盯人倾向还是区域封锁
- 第一波压迫失败后的回撤速度
- 弱侧暴露与门将身后空间风险

输出标签建议：

- `press_height`
- `pressing_triggers`
- `press_orientation`
- `counterpress_level`
- `press_bypass_risk`

## 4.4 防守落位

关注：

- 防线高度
- 纵向紧凑度
- 14 区保护
- 边路传中处理
- 禁区二点与后点保护
- 高空球与定位球二次落点

输出标签建议：

- `defensive_block_height`
- `compactness`
- `zone14_protection`
- `wide_defending_note`
- `box_defending_note`
- `aerial_defending_note`

## 4.5 攻防转换

进攻转换关注：

- 第一个向前传球找谁
- 是否依赖个人推进
- 跑动人数与到位速度
- 转换完成前是否容易被拖慢

防守转换关注：

- 丢球后是否立即反抢
- 静态保护结构是否完整
- 中后场回追速度是否可靠
- 是否有战术犯规倾向

输出标签建议：

- `transition_attack_speed`
- `transition_outlets`
- `runner_profile`
- `rest_defense_shape`
- `recovery_risk`

## 4.6 定位球

进攻定位球关注：

- 主罚人稳定性
- 落点类型
- 第一争顶点
- 挡拆与掩护套路
- 二点保护

防守定位球关注：

- 盯人/区域/混合
- 门将出击控制
- 前点保护
- 后点漏人
- 二点失位与犯规风险

输出标签建议：

- `set_piece_attack_strength`
- `set_piece_defense_strength`
- `primary_takers`
- `aerial_targets`
- `set_piece_vulnerabilities`

## 5. 教练评估方法

## 5.1 选人稳定性

重点评估：

- 正式比赛首发重复度
- 核心中轴是否稳定
- 同位置轮换是否固定
- 大赛前是否频繁试人

结构化输出：

- `selection_stability`
- `core_xi_retention`
- `rotation_frequency`

## 5.2 换人倾向

重点评估：

- 第一换人平均时间带
- 是对位修正、体能换人还是结构换人
- 是否经常通过换人改变阵型
- 是否存在固定“比赛终结器”或“追分包”

结构化输出：

- `typical_first_sub_minute_band`
- `common_sub_types`
- `shape_change_after_sub`
- `late_game_risk_appetite`

## 5.3 领先/平局/落后时调整

重点评估：

- 领先后是继续压、退守反击还是控节奏
- 平局时是稳住结构还是主动提高风险
- 落后时是加前锋、提高边路传中、前压边后卫，还是只做对位换人

结构化输出：

- `leading_behavior`
- `drawing_behavior`
- `trailing_behavior`
- `state_change_speed`

## 5.4 淘汰赛保守程度

重点评估：

- 面对强队是否收缩
- 是否牺牲控球换取防守稳定
- 是否倾向早早保护比分
- 加时赛或淘汰赛历史中是否降低压迫风险

结构化输出：

- `knockout_pragmatism`
- `upset_prevention_bias`
- `risk_reduction_when_ahead`

## 6. 低样本与样本污染问题处理

## 6.1 国家队样本少

处理规则：

- 以“当前主教练周期 + 最近正式比赛”作为主样本。
- 样本不足时，不强行细分复杂标签，改用宽口径描述。
- 缺少重复证据的结论，只能给 `medium` 或 `low`。
- 对稳定特征与对手特定部署明确分栏，避免过拟合单场表现。

## 6.2 友谊赛参考价值低

处理规则：

- 友谊赛默认降权，不作为高置信度唯一依据。
- 如果友谊赛发生在大赛前且阵容接近主力，可作为补充证据，但必须单独标记。
- 若友谊赛与正式比赛结论冲突，优先正式比赛样本。

建议权重顺序：

- 世界杯正赛与洲际大赛淘汰赛
- 世界杯预选赛与洲际大赛小组赛
- 国家联赛等中高竞争样本
- 高质量友谊赛
- 普通友谊赛

## 6.3 球员俱乐部角色与国家队角色不一致

处理规则：

- 国家队角色优先于俱乐部角色。
- 俱乐部角色只用于解释球员能力边界，不直接等同于国家队任务。
- 如国家队中承担完全不同职责，必须显式写出 `club_role_note` 与 `national_team_role` 的偏差。
- 任何基于俱乐部推断国家队行为的结论，最高只给 `medium`，除非已有国家队样本验证。

## 6.4 伤病与缺阵导致的被迫调整

处理规则：

- 把伤病视为战术事件，不只是名单事件。
- 若关键角色缺阵会改变球队结构，需单独输出“原结构”和“缺阵后替代结构”。
- 如果替代人选未被稳定验证，必须追加 `data_gaps`。

## 7. 产出给模型 agent 的结构化特征格式

模型线程的最终任务包括比分、胜平负、小组出线和冠军预测，因此我的输出要特别强调那些可能改变进球分布、比赛节奏和强弱边界的战术变量，但不在本线程直接给预测值。

## 7.1 单队战术特征包

建议输出到 `K:\worldcup\data\packets\tactics\<team>.json`：

```json
{
  "team": "",
  "data_timestamp": "",
  "sample_summary": {
    "matches_used": 0,
    "competitive_match_count": 0,
    "friendly_match_count": 0,
    "same_coach_match_count": 0,
    "sample_quality": "high/medium/low"
  },
  "tactical_features": {
    "nominal_formations": [],
    "in_possession_shape": "",
    "out_of_possession_shape": "",
    "alternate_shapes": [],
    "build_up_style": [],
    "preferred_progression_zones": [],
    "direct_play_frequency": "low/medium/high",
    "press_height": "low/mid/high/variable",
    "pressing_triggers": [],
    "press_orientation": "zonal/man-oriented/hybrid/unknown",
    "defensive_block_height": "low/mid/high/variable",
    "compactness": "low/medium/high",
    "transition_attack_speed": "low/medium/high",
    "counterpress_level": "low/medium/high",
    "rest_defense_shape": "",
    "set_piece_attack_strength": "low/medium/high/unknown",
    "set_piece_defense_strength": "low/medium/high/unknown"
  },
  "coach_features": {
    "selection_stability": "low/medium/high",
    "flexibility": "low/medium/high",
    "typical_first_sub_minute_band": "early/mid/late/variable",
    "leading_behavior": [],
    "drawing_behavior": [],
    "trailing_behavior": [],
    "knockout_pragmatism": "low/medium/high"
  },
  "role_dependencies": [
    {
      "role": "",
      "players": [],
      "impact_if_missing": "",
      "confidence": "low/medium/high"
    }
  ],
  "risk_flags": [],
  "market_relevant_tactical_flags": [
    {
      "factor": "",
      "impact_area": "1x2/totals/handicap",
      "direction_note": "",
      "confidence": "low/medium/high"
    }
  ],
  "confidence_map": {
    "shape": "low/medium/high",
    "build_up": "low/medium/high",
    "pressing": "low/medium/high",
    "settled_defense": "low/medium/high",
    "transition": "low/medium/high",
    "set_pieces": "low/medium/high",
    "coach_profile": "low/medium/high"
  },
  "source_references": []
}
```

## 7.2 指定对阵战术特征包

建议输出到 `K:\worldcup\data\packets\matchup_tactics\<match>.json`：

```json
{
  "match": "",
  "data_timestamp": "",
  "team_a": "",
  "team_b": "",
  "matchup_edges": [
    {
      "phase": "build_up/pressing/transition/set_piece/defensive_block",
      "edge_team": "",
      "description": "",
      "depends_on": [],
      "confidence": "low/medium/high"
    }
  ],
  "game_state_interactions": {
    "if_team_a_leads": "",
    "if_team_a_trails": "",
    "if_team_b_leads": "",
    "if_team_b_trails": ""
  },
  "model_feature_hints": [],
  "tactical_risk_flags": [],
  "source_references": []
}
```

## 7.3 建模注意事项

- 只输出类别、方向性和条件依赖，不直接给数值权重。
- 对同一特征同时输出 `value` 与 `confidence`，方便模型 agent 自行决定是否降权。
- 对高度依赖关键球员可用性的特征，必须显式附 `depends_on_player_availability`。
- 额外标记与市场判断相关的战术因素，但只描述“为什么会影响”，不描述“应该怎么下”。
- 重点标记以下几类对最终预测链路最敏感的变量：
  - 比赛节奏快慢
  - 高压是否容易制造开放回合
  - 防线身后与定位球失分风险
  - 领先后收缩或继续压迫的倾向
  - 关键组织者或终结点缺阵后对进球倾向的影响

## 7.4 与赔率相关的战术输出边界

赔率需要纳入总项目分析，因此战术线程应补充“盘口相关战术解释”，但严格停留在可核验战术层，不越权到投注建议层。

允许输出：

- 哪些战术因素可能影响 `1x2` 判断
- 哪些战术因素可能影响让球判断
- 哪些战术因素可能影响大小球倾向
- 哪些条件变化会让市场判断失效，例如关键伤停、首发结构变化、天气导致节奏下降

不允许输出：

- 具体投注建议
- 下注方向结论
- 仓位建议
- 赔率价值判断

## 8. 产出给核验 agent 的反驳/质疑清单格式

建议输出到 `K:\worldcup\data\drafts\tactics\<team>__verification_questions.json`：

```json
[
  {
    "claim_id": "",
    "claim": "",
    "confidence": "low/medium/high",
    "why_challengeable": "",
    "challenge_type": "old_sample/friendly_only/role_mismatch/injury_dependency/source_conflict/opponent_specific/small_sample",
    "required_checks": [],
    "preferred_sources": [],
    "invalidate_if": [],
    "recheck_deadline": ""
  }
]
```

核验 agent 重点应挑战：

- 是否把友谊赛现象误当成稳定身份。
- 是否把旧教练周期样本混入当前判断。
- 是否把俱乐部角色错套到国家队。
- 是否忽略伤停导致的结构变化。
- 是否把单场临场部署误写成长期特征。
- 是否在来源冲突时给出了过高置信度。
- 是否把“可能影响盘口/大小球”的战术因素说得过满。
- 是否把战术倾向直接偷换成比分或胜平负结论。

## 9. 战术分析执行流程

每支球队建议按以下顺序处理：

1. 检查事实包完整度，列出 `data_gaps`。
2. 按正式比赛优先筛样本，并标出友谊赛与旧周期样本。
3. 先定基础结构，再拆六个阶段：阵型、控球/出球、压迫、防守落位、攻防转换、定位球。
4. 单独评估主教练的选人与换人习惯。
5. 区分稳定特征、对手特定部署、临场变化、伤病被迫调整。
6. 输出人类可读摘要、结构化特征包、核验问题清单，并附一条可供汇总线程直接转述的球迷化摘要。
7. 若对阵已知，再额外生成 `matchup_tactics` 包；若对阵未知，不提前做对位推断。

## 9.1 汇总线程可直接转述的摘要要求

每份球队包或比赛对位包，除核心战术结论外，额外附一条一句话摘要：

- 风格要求：像懂球但不过度术语化的球迷评论。
- 内容要求：能概括本队最关键的战术身份或本场最关键的对位点。
- 约束：这句话必须能被底层事实支撑，不能为了好读而夸大。

建议字段：

```json
{
  "fan_summary": ""
}
```

## 10. 置信度规则

- `high`：同一主教练下、多个正式比赛反复出现，且当前阵容可用性支持结论。
- `medium`：有重复样本，但受样本质量、球员可用性或对手差异影响。
- `low`：主要来自友谊赛、旧样本、角色推断，或当前关键缺阵使结论不稳定。

## 11. 第一批建议分析范围

不建议完全等待“全量小组包完成后再按小组推进”，也不建议一开始就平均铺开 48 队深度战术分析。建议采用“分层启动、再按小组收口”的混合方案。

## 11.1 第一批启动范围

先做 8 到 12 支球队的深度战术模板验证，优先顺序为：

- 东道主：美国、加拿大、墨西哥
- 夺冠热门与高关注强队
- 各洲代表性风格样本，优先亚洲、非洲、南美的强代表队

这样做的原因：

- 可以尽快验证字段是否足够支撑高质量战术结论。
- 可以先建立不同风格模板，避免后续分析只适配欧洲强队。
- 可以提前发现数据采集包中最容易缺失的战术关键字段。

## 11.2 第二批推进方式

当数据采集 agent 完成某个小组的基础包后，再按小组推进剩余球队分析。

这样做的原因：

- 小组内更适合做相对比较与风格映射。
- 主线程后续做小组赛建模与叙事时，组内一致性更高。
- 便于在同一批次中统一校准置信度。

## 11.3 结论性建议

推荐顺序：

1. 先用东道主 + 夺冠热门 + 亚洲/非洲/南美代表队，建立第一批深度模板。
2. 同步要求数据采集 agent 按小组逐步补齐基础包。
3. 从第二批开始改为“按小组批次分析 + 对即将开赛比赛追加对位包”。

这比“纯热门优先”更均衡，也比“完全等小组包”更高效。

## 12. 本阶段交付物

第一阶段我将向主线程交付：

- 本执行方案
- 后续所需输入字段清单
- 战术与教练分析流程定义
- 模型 agent 结构化输出格式
- 核验 agent 反驳清单格式
- 一句可转述的球迷化摘要要求
- 与赔率相关但不越权的战术输出边界
- 首批分析范围建议

在收到数据采集 agent 的事实包之前，不启动逐队战术结论，不输出任何比赛预测。
