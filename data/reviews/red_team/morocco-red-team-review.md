phase: team_profile
team: 摩洛哥
group: C
status: partial
created_at: 2026-06-12T19:22:44+08:00
updated_at: 2026-06-12T19:33:19+08:00
owner: worldcup-red-team-verifier
scope: 球队分析审查；不做比分、胜平负、出线或投注建议。
blocked_by_missing_live_refresh: true
missing_fields:
  - T-24h injury/training refresh
  - T-75m official lineup
  - fresh odds and handicap movement
  - new-coach pressing-height confirmation
  - final set-piece map
source_log: data/source_logs/morocco-team-source-log.json
notes:
  - deep_partial red-team review for C 组 team_profile 审查
  - blocked by live refresh before any downstream prediction use

# 摩洛哥红队审查

## Verdict

verdict：`revise_before_prediction`

摩洛哥的防守韧性和边路质量是真优势，但 2022 四强光环不能无条件复制到 2026。换帅、阵地战、核心年龄/状态是主要审查点。

## 关键断言核验

- `pass`：摩洛哥仍是 C 组第二档强队，防守地板、边路推进和门将质量都是真优势。
- `revise`：不能把 2022 四强光环直接平移成 2026 的确定性。
- `revise`：不能默认换帅后体系无缝衔接。
- `hold`：在关键边后卫、门将、后腰和前腰角色未确认前，不应锁死其防反强度与主动进攻质量。

## Top 8 Concerns

1. `data / high`：新帅 Mohamed Ouahbi 的成人国家队大赛样本仍浅，不能高置信外推。
2. `tactical / high`：摩洛哥打强队舒服，但面对低位和主动控球任务时，创造力未必同档。
3. `availability / blocker`：Hakimi、Brahim、Bounou、Amrabat 的健康和负荷必须赛前复核。
4. `model / high`：2022 的防守韧性不能被直接当作 2026 的防守地板输入。
5. `tactical / medium`：边后卫大幅前插会带来身后空间，尤其对巴西和苏格兰两端脚本都存在风险。
6. `market / medium`：若市场过分追捧“黑马记忆”，价格会高于实际进攻兑现率。
7. `tournament / medium`：首战对巴西若消耗过大，第二场对苏格兰的体能与情绪可能受影响。
8. `data / medium`：定位球主罚体系、前场站位和追分脚本仍需更新。

## 五类风险地图

- `availability`：核心边路、门将和中场屏障任何一处掉档，摩洛哥的比赛脚本会明显变化。
- `tactical`：强项在于紧凑防守和反击，但主动破局时未必一样强。
- `data`：换帅后样本稀薄，是当前最大结构性证据缺口。
- `market`：2022 世界杯记忆可能导致市场与舆论对摩洛哥产生偏热。
- `tournament`：如果首战消耗太大，第二轮对苏格兰时反而可能掉出最舒服节奏。

## overconfidence_flags

- 把“2022 四强”直接写成“2026 依旧同级成熟”。
- 把“防守很稳”直接写成“任何脚本都稳”。
- 把“反击很强”直接写成“阵地战也能稳定破局”。
- 把“黑马叙事仍在”直接写成“市场低估摩洛哥”。

## upset_or_failure_scenarios

- 首战巴西时被迫长期低位，边后卫身后和二点球被连续针对。
- 对海地或苏格兰主动控球时，创造力不足导致优势局拖成低比分消耗战。
- 新帅比预期更保守或更激进，破坏既有平衡。
- 关键核心状态下滑时，摩洛哥会从“危险强队”掉到“很硬但不够锋利”的版本。

## 预测前 hold 条件

- 首发阵型和新帅风险偏好不明。
- 关键边后卫/门将状态不明。
- 对低位对手的阵地战样本不足。
- T-24h 训练与伤停没有最终更新。
- 定位球主罚和第一目标未确认前，不宜高估定位球兑现率。

## 回派

- data：补官方伤停、首发和近期强度样本。
- tactics：补换帅后压迫高度和出球结构。
- model：把防守韧性和进攻创造力分开建模。
- summary：写摩洛哥时必须同时写“防守地板”与“阵地战疑点”。
- main：禁止只靠 2022 光环去写高确定性判断。

## 可转述风险提示

- 摩洛哥最容易被人写错的地方，就是把 2022 那支队的光环直接套到现在。
- 他们的防守和边路质量是真的，但这不等于每一种比赛脚本都同样舒服。
- 打强队时摩洛哥往往很危险，真要主动压出去，反而更考验这版球队的创造力。
- 市场如果一直记着黑马故事，就要小心“名声比当前证据更热”。
