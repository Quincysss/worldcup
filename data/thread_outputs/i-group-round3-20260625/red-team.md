---
phase: match_prediction
group:
  - I
match:
  - france_vs_norway
  - senegal_vs_iraq
status: complete
created_at: 2026-06-25T15:05:00+08:00
updated_at: 2026-06-25T15:24:00+08:00
owner: red_team
scope: red-team review only; challenge assumptions, stress test outcomes, and propose revisions
missing_fields:
  - round3_quant_prediction_file
  - official_group_table_and_tiebreaker_snapshot
  - official_t_minus_75_lineups
  - latest_official_injury_confirmation
  - latest_official_discipline_confirmation
  - executable_market_snapshot_same_book
source_log:
  - K:\worldcup\data\thread_outputs\i-group-round3-20260625\data-collector.json
  - K:\worldcup\data\thread_outputs\i-group-round3-20260625\tactics-coach.json
  - K:\worldcup\data\thread_outputs\i-group-round3-20260625\data-modeler.json
  - K:\worldcup\data\outputs\match_predictions\i-group-round1-postmortem.json
  - K:\worldcup\data\outputs\match_predictions\i-group-round2-postmortem-20260623.json
  - K:\worldcup\data\outputs\match_predictions\i-group-round2-quant-prediction-20260621.json
  - K:\worldcup\data\reviews\red_team\france-red-team-review.md
  - K:\worldcup\data\reviews\red_team\norway-red-team-review.md
  - K:\worldcup\data\reviews\red_team\senegal-red-team-review.md
  - K:\worldcup\data\reviews\red_team\iraq-red-team-review.md
  - K:\worldcup\data\outputs\player_state\france-player-state.json
  - K:\worldcup\data\outputs\player_state\norway-player-state.json
  - K:\worldcup\data\outputs\player_state\senegal-player-state.json
  - K:\worldcup\data\outputs\player_state\iraq-player-state.json
notes:
  - upstream data, tactics, and model threads remain skeletal or partial
  - review completed as a release gate, not as approval for executable betting or full-confidence prediction
---

# I组第三轮红队校验

## 总结

| 项目 | 结论 |
| --- | --- |
| 总 verdict | `hold` |
| 发布门槛 | `discussion_only` |
| 投注门槛 | `hold_for_betting` |
| 主因 | 量化主文件缺失，T-75 官方首发缺失，伤停/黄牌/轮换未最终核实，赔率快照不可确认是否 stale |

## 当前已知上下文

- 依据已完成前两轮赛果，可推导当前积分形势约为：法国 6 分，挪威 6 分，塞内加尔 0 分，伊拉克 0 分。
- 但本线程内尚无数据线程给出的官方积分榜快照与 tiebreaker 明文，因此“法国打平即可保头名”“两支 0 分队是否仍有第三名路径价值”不能按 full fact 宣称。
- 战术线程仍是 `predicted_lineup_status: estimated`，模型线程仍缺 `third_round_context`、`poisson_matrices` 与 `group_simulation`，所以当前只能做风险门禁与修正方向，不能放行为完整预测链。

## Top Concerns

1. `blocker | high | data/main`：I组第三轮量化预测文件尚未生成，当前没有可审的 `final_probabilities`、`expected_goals`、`poisson_score_matrix`，不能宣称预测链已闭环。
2. `blocker | high | data/tactics`：T-75 官方首发缺失，且四队 player-state 仅到 `partial_key_players_updated`，首发、分钟限制、临场轮换都未最终确认。
3. `high | medium | data/main`：当前线程没有官方积分榜与 tiebreaker 明文，第三轮动机判断存在“推导正确但证据链不完整”的风险。
4. `high | medium | model/main`：法国品牌溢价与两连胜叙事，容易把“强队上限”误写成“本场动机与稳定性都更高”；对挪威争头名、法国控节奏或轮换的情景压得不够。
5. `high | medium | model`：挪威前两轮总进球高，容易把高比分尾部直接线性外推；应上调开放局面的尾部，但不能把 4-1、3-2 过拟合成稳定 shootout baseline。
6. `high | medium | model`：塞内加尔与伊拉克样本都偏小，且对手强度、比赛态势和友谊赛/预选赛可比性有限；若按名气或单场比分直接拉开差距，属于过度推断。
7. `high | medium | market/model`：缺同源、同时间的可执行赔率快照，任何“市场支持法国/看低伊拉克”的表述都可能是 stale market，不能拿旧线当临场校准。
8. `medium | high | model`：独立泊松天然低估红牌、早球、末段追分、同开赛比分传导后的策略突变，两场都应扩大方差与尾部。

## 分场修正方向

### 法国 vs 挪威

**建议 verdict**：`hold`

**必须防的误判**

- 不可把法国两连胜直接等同于本场仍应高压争胜。法国可能存在保守控风险、局部轮换、接受平局管理的策略空间。
- 不可把挪威写成只靠哈兰德单点爆发。前两轮复盘已经提示：挪威在对手打开局面后，二点、定位球和高点终结的上限是活的。
- 不可把“法国品牌 + 市场热度”重复计入模型和文字结论；若市场本就给法国溢价，模型端不能再把 reputational premium 当独立利好。

**概率修正方向**

- 若上游初稿把法国写成明显高于常规强强对话的热门，`下调法国胜率`。
- `上调平局概率`，尤其是 1-1、0-0、2-2 这类由节奏管理或对攻转换带出的路径。
- `小幅上调挪威进球概率与 BTTS 路径`，但不要把挪威大胜尾部抬到主路径。
- `下调法国净胜 2+ 的置信表达`，除非临场首发与动机证据同时支持强压阵容。

**上游必须补证**

- 法国是否存在主力轮换、分钟保护或黄牌风险。
- 挪威是否全主力可用，尤其边后卫与中后场保护位。
- 临场赔率是否继续给法国明显品牌溢价，且这一溢价是否有阵容新闻支撑。

### 塞内加尔 vs 伊拉克

**建议 verdict**：`hold`

**必须防的误判**

- 不可把“塞内加尔 0 分”直接解读成必然高动机强压，也不可把“伊拉克 0 分”直接解读成战意低；第三名路径、荣誉战、同时开赛信息，都可能改变节奏。
- 不可把塞内加尔名气、大赛经验或非洲强队叙事当成足够理由去压低平局与冷门。
- 不可把伊拉克前两场失球直接外推成必然继续崩；其低位防守、反击偷一球与比赛拖慢能力仍可能干扰热门叙事。

**概率修正方向**

- 若初稿把塞内加尔写成干净利落的单边热门，`下调塞内加尔胜率与净胜信心`。
- `上调平局份额`，尤其在动机与第三名路径没有被官方说明前。
- `小幅上调伊拉克进球与爆冷路径`，特别是定位球、早球或塞内加尔压上后的反击窗口。
- 若上游默认低总进球，需要 `扩大比分区间`；两队前两轮都显示出防线不稳与末段比赛态势可漂移。

**上游必须补证**

- 两队第三轮真实出线或排名激励是否仍存在。
- 伊拉克锋线和中场硬度是否有新增伤停。
- 塞内加尔是否会因为前两轮失分而主动提速，还是更倾向保底不败收官。

## 典型失败情景

1. 法国被按品牌和两连胜高估，但实际接受平局管理，导致法国胜率与大胜尾部被写高。
2. 挪威争头名意愿高于法国，比赛开放度被提升，导致法国零封和低波动假设失真。
3. 塞内加尔被按名气压成热门，但样本质量不足，且阵地战破密防并不稳定，导致平局或小冷门被低估。
4. 伊拉克被两轮净负球拖得过低，但若先取得定位球或反击早球，独立泊松链会低估比赛失控概率。
5. 两场同开赛末段一旦接收到另一场比分，球队策略会突然切换，赛前静态概率若没有留出弹性，会过度自信。

## Owner 回派

- `data`
  - 补官方积分榜、tiebreaker、第三名路径说明。
  - 补同源同时间赔率快照，并标记 capture time。
  - 补四队最新伤停、黄牌停赛、是否有出场限制。
- `tactics`
  - 明确法国是否可能轮换与降节奏。
  - 明确挪威开放局面下的推进与防反弱点。
  - 明确塞内加尔破密防方案与伊拉克低位反击路径。
- `model`
  - 不得重复计算动机、轮换、市场变化。
  - 放宽泊松尾部，重新审视 BTTS、平局与单球差路径。
  - 若无官方首发与新赔率，仅能输出 discussion-only 版本。
- `main`
  - 文案必须写清：这是 `hold`，不是 full pass。
  - 禁止把本稿转述成投注建议或高置信度比分建议。

## 可直接写入汇总稿的红队声明

- 当前 I 组第三轮预测链未闭环，最核心缺口是量化主文件、T-75 官方首发、最新伤停/黄牌确认与可执行赔率快照。
- 法国 vs 挪威最容易犯的错，不是低估法国实力，而是高估法国本场动机与稳定性，同时低估挪威争头名带来的进球路径。
- 塞内加尔 vs 伊拉克不能只按名气和前两轮比分排序；两队样本都浅，第三轮战意、早球和末段策略变化会显著扩大不确定性。
