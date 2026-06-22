phase: team_profile
team: 苏格兰
group: C
status: partial
created_at: 2026-06-12T19:22:47+08:00
updated_at: 2026-06-12T19:33:19+08:00
owner: worldcup-red-team-verifier
scope: 球队分析审查；不做比分、胜平负、出线或投注建议。
blocked_by_missing_live_refresh: true
missing_fields:
  - T-24h injury/training refresh
  - T-75m official lineup
  - fresh odds and handicap movement
  - final suspension check
  - final striker-choice confirmation
source_log: data/source_logs/scotland-team-source-log.json
notes:
  - deep_partial red-team review for C 组 team_profile 审查
  - blocked by live refresh before any downstream prediction use

# 苏格兰红队审查

## Verdict

verdict：`revise_before_prediction`

苏格兰的纪律、身体和中场硬度可靠，但锋线效率和“必须赢海地”的压力不能忽略。预测时不能把苏格兰写成天然能轻松打穿弱队。

## 关键断言核验

- `pass`：苏格兰的纪律、身体、中场硬度和定位球能力都是真资产。
- `revise`：不能把“纪律硬队”直接写成“稳定能打穿弱队”。
- `revise`：不能把中场存在感自动翻译成锋线兑现率。
- `hold`：三中卫组合、左路角色和中锋选择不明前，不应锁死其进攻脚本。

## Top 8 Concerns

1. `tactical / high`：阵地战创造力不稳定，面对低位海地时可能必须靠定位球或二次进攻破局。
2. `availability / blocker`：Robertson、Tierney、McTominay、首发中锋选择都必须赛前复核。
3. `model / high`：定位球优势不能等同于持续进球能力。
4. `tournament / medium_high`：首战若久攻不下，“必须赢”的压力会迅速反噬。
5. `tactical / medium_high`：面对巴西边路速度时，五后卫宽度和边翼卫身后会被反复拉扯。
6. `data / medium`：Steve Clarke 的首发和换人倾向需结合最新名单，而不是只靠旧印象。
7. `market / medium`：对海地若成为热门，盘口可能低估苏格兰终结不稳与胶着风险。
8. `data / medium`：停赛、黄牌和角色轮换需要临场更新。

## 五类风险地图

- `availability`：左路双核与中锋选择会改变苏格兰的传中量、压迫和防守宽度。
- `tactical`：他们最真实的问题不是守不守得住，而是能不能把场面优势转成稳定进球。
- `data`：历史上的“硬队印象”容易遮住这版苏格兰在锋线上的波动。
- `market`：对海地的热门标签可能比真实创造力更热。
- `tournament`：首战心理压力会把小问题放大成比赛问题。

## overconfidence_flags

- 把“纪律和身体”直接写成“稳吃弱队”。
- 把“定位球好”直接写成“破密防一定够用”。
- 只看 McTominay/McGinn 的存在感，不看锋线是否能把机会吃掉。
- 市场若看好苏格兰，就顺手把他们写成低风险热门。

## upset_or_failure_scenarios

- 对海地久攻不下后越踢越急，被拖进低比分焦躁局。
- Robertson/Tierney 角色重叠导致左路推进有余、终结不足。
- 对摩洛哥和巴西时边翼卫被迫深退，苏格兰中场前插价值下降。
- 若先丢球，苏格兰的主动追分创造力不一定足够流畅。

## 预测前 hold 条件

- 三中卫组合和左路角色不明。
- 首发中锋不明。
- 定位球主罚和目标不明。
- T-24h 伤停与停赛没有最终刷新。
- 临场盘口如果把苏格兰推成过深热门，需要重新审视进攻效率假设。

## 回派

- data：补官方首发、伤停、停赛和盘口。
- tactics：补对海地低位的破局手段。
- model：锋线效率和定位球效率分开建模。
- summary：写苏格兰时必须同时写“稳定防守”和“进攻兑现不稳”。
- main：禁止用“欧洲硬队”这种标签替代具体风险。

## 可转述风险提示

- 苏格兰最容易被写顺嘴的地方，是“很硬，所以应该能赢”，但硬不等于稳定进球。
- 他们的中场和定位球是真武器，可真正让人不放心的，是一旦比赛进入阵地战，苏格兰能不能把优势变成比分。
- 对海地那场尤其要小心，越是外界觉得该赢，越容易把焦虑踢出来。
- 苏格兰不是不能看高，而是不能高看到忽略锋线和节奏问题。
