phase: match_prediction
group: A
match:
  - 墨西哥 vs 捷克
  - 南非 vs 韩国
status: complete
created_at: 2026-06-24T17:50:16+08:00
updated_at: 2026-06-24T17:50:16+08:00
owner: red_team
scope: A组第三轮预测修正的红队复核；聚焦赔率来源冲突、T-75官方首发缺失、estimated首发建模折扣、discussion_only升级投注执行门槛
missing_fields:
  - 临场T-75官方首发
  - 最新官方伤停/黄牌停赛确认
  - 可销售状态下的稳定同源赔率快照
source_log:
  - data/thread_outputs/a-group-round3-20260624/red-team.md
  - data/thread_outputs/a-group-round3-20260624/data-collector.md
  - data/thread_outputs/a-group-round3-20260624/tactics-coach.md
  - data/thread_outputs/a-group-round3-20260624/modeler.md
  - data/outputs/match_predictions/a-group-round3-quant-prediction-20260624.json
notes:
  - 中国足彩网当前页面提示系统升级/暂停销售
  - 现有A组第三轮量化输出可用于讨论预测，但不满足投注执行门槛

# A组第三轮预测修正 红队复核

## Verdict

- prediction verdict: `revise`
- betting verdict: `hold`
- publish boundary: `discussion_only`

## 关键结论

### 1. 中国体彩 / 同源赔率来源冲突如何标记

- 当前口径应标记为: `market_conflict_flag`
- 原因不是单纯“赔率不存在”，而是“同源页面可见赔率，但页面同时提示系统升级/暂停销售”，因此它更像概率锚点，不是可执行交易价格。
- 若不同页面、不同抓取时间、不同玩法之间出现数值不一致，而又没有统一的时间戳和销售状态说明，必须再加: `stale_or_non_executable_market_flag`
- 红队要求:
  - 可以把此类赔率用于讨论市场倾向与热门溢价。
  - 不可以把此类赔率写成竞彩可直接下单依据。
  - 若主线程引用赔率，必须带时间戳和“暂停销售/非执行价”声明。

### 2. T-75 官方首发未公布是否应阻塞预测

- 对 `prediction`:
  - 不必一刀切阻塞到 `hold`，但必须从 `pass` 降为 `revise`。
  - 只能作为 discussion-only 的赛前讨论预测，不得宣称临场可执行。
- 对 `betting`:
  - 直接构成 `hold` blocker。
- 红队理由:
  - 第三轮轮换、黄牌保护、分钟管理和同时开球联动，会放大首发信息价值。
  - 墨西哥是否轮换、韩国是否保守起手，都会显著改变 xG、节奏和比分尾部。

### 3. 使用 estimated 首发建模的风险如何折扣

- 红队建议折扣方式:
  - 将可用性相关结论整体降一档置信度。
  - 将比分精度降级，不得使用“单一最稳比分”口吻。
  - 将热门方胜率解释从“明确优势”改为“方向优势，但对首发敏感”。
  - 对 draw 和 low-event scenario 保留更高权重，避免把轮换不确定性硬压成热门胜。
- 对量化链的最低要求:
  - 明确标注 `estimated_lineup_used: true`
  - 明确哪些球员位置是高不确定节点
  - 明确 estimated 首发触发的风险类别: 轮换、黄牌保护、伤后分钟限制、战术角色改变
- 红队不建议:
  - 用 estimated 首发给出高置信让球结论
  - 用 estimated 首发支持“热门稳穿”或“大比分稳态”

### 4. 哪些条件满足后才能从 discussion_only 升级投注执行

- 必须同时满足以下条件:
  - T-75 官方首发已出，且关键轮换位已核验
  - 最新官方伤停、停赛、黄牌保护状态已更新
  - 竞彩或同源可执行赔率处于正常销售状态，且时间戳清晰
  - 若赔率源仍显示暂停销售，继续 `hold`
  - 模型已基于确认首发重跑 xG / Poisson / final probabilities
  - 主线程文本已移除“稳胆、必买、重注、可抄作业”等诱导表达

## Top Concerns

1. `market_conflict_flag`
   - category: market
   - severity: blocker
   - confidence: high
   - evidence: 中国足彩网页面同时给出赔率与“系统升级/暂停销售”提示
   - why_it_matters: 可见赔率不等于可执行价格，误用会把讨论锚点包装成投注入口
   - owner: `data` / `main`

2. `missing_T75_lineup_flag`
   - category: availability
   - severity: blocker
   - confidence: high
   - evidence: 当前线程文件未提供临场官方首发
   - why_it_matters: 第三轮轮换与黄牌保护会直接改变比赛节奏和胜平负/比分分布
   - owner: `data`

3. `estimated_lineup_model_risk`
   - category: data
   - severity: high
   - confidence: high
   - evidence: 当前预测链对第三轮动机和轮换有建模，但首发仍是估计口径
   - why_it_matters: 若首发与估计偏差较大，墨西哥/韩国热门方向与小比分倾向都可能偏移
   - owner: `model`

4. `overprecision_scoreline_flag`
   - category: tactical
   - severity: medium
   - confidence: medium
   - evidence: 现有模型给出首选比分，但第三轮末段受另一场实时比分影响
   - why_it_matters: 单一比分叙事容易低估平局管理和末段搏命带来的尾部波动
   - owner: `model` / `main`

## Allowed / Not Allowed

### 允许

- 允许发布为赛前讨论预测，并明确是 `discussion_only`
- 允许引用“墨西哥/韩国热门不宜过热，小比分与平局管理风险偏高”
- 允许把现有赔率作为市场方向信号，但必须附带暂停销售说明

### 不允许

- 不允许把当前口径升级为可执行投注单
- 不允许把 estimated 首发包装成已确认首发
- 不允许把暂停销售页面赔率写成真实可买 SP
- 不允许使用强执行词汇

## Red-Team Upgrade Gate

- 若只补到“预测首发更完整”，但仍无 T-75 官方首发: `prediction=revise`，`betting=hold`
- 若有 T-75 首发，但赔率源仍暂停销售或冲突未解: `prediction=pass` 可讨论，`betting=hold`
- 只有当首发、伤停、黄牌、销售状态正常的赔率、重跑模型全部到位后，才可把 betting 从 `hold` 升到 `revise/pass` 审核阶段

## Handoff

- `data`: 补 T-75 官方首发、最新伤停/黄牌、竞彩销售状态与统一时间戳
- `model`: 对 estimated 首发显式降置信度，重跑确认首发版量化输出
- `main`: 对外只保留 discussion-only 表述，未过门控前不得生成执行型投注语言
