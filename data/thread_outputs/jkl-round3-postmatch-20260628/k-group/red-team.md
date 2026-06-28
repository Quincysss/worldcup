# K组第三轮赛后红队复核

red_team_status: complete_red_team_review_after_user_result_input_source_limited  
overall_verdict: hold  
betting_language_blocked: true

## 总结

按用户给定真实赛果复核：哥伦比亚 0-0 葡萄牙，刚果金 3-1 乌兹别克斯坦。本地 K组已完成目录未见第三轮两场复盘文件，四队 `player_state` 与成员表也未见 2026-06-28 第三轮记录；因此模型偏差可以审查，但复盘闭环不能标 `complete`。

## 哥伦比亚 vs 葡萄牙

verdict: hold  
model_error_verdict: revise

- 赛前：xG 1.18-1.48；哥伦比亚胜/平/葡萄牙胜为 27.8%/26.1%/46.1%；Top5 为 1-1、0-1、1-2、1-0、0-2。
- 赛果：0-0。葡萄牙方向失败，0-0 在矩阵内约 7.0% 但不在 Top5，低事件平局尾部被低估。
- top_concerns：draw_floor 不够厚；门将扑救与 VAR/offside 这类相关事件缺模型字段；葡萄牙市场热门税赛前虽被红队提示，但仍需进一步校准。
- quant_chain_flags：独立泊松用 1.18-1.48 均值摊薄 0-0；over1.5 约 74.4% 对实际低事件局偏乐观；市场强队偏热不能赛后淡化。
- parameter_update_risks：不要简单下修葡萄牙进攻，也不要无条件上修哥伦比亚防守；先补扑救、越位/VAR、射门质量和控风险事件链。

## 刚果金 vs 乌兹别克斯坦

verdict: hold  
model_error_verdict: revise

- 赛前：xG 1.48-0.98；刚果金胜/平/乌兹别克斯坦胜为 50.0%/25.5%/24.5%；Top5 为 1-0、1-1、2-0、2-1、0-0。
- 赛果：3-1。刚果金方向命中，但比分、总进球和尾部路径没有充分覆盖；3-1 在矩阵内约 4.5% 但不在 Top5。
- top_concerns：不能用方向命中掩盖大比分/over2.5 尾部低估；must-win second-half escalation、penalty、late goal tail 需要事件链确认；乌兹别克追分崩盘尾部仍偏薄。
- quant_chain_flags：第三轮动机写进了上下文，但没有足够非线性地推高后段开放；under2.5 仍略占优而实际4球；刚果金深胜和方向层必须拆开。
- parameter_update_risks：不要把3-1全部上修为刚果金基础进攻强度；需要分离点球、晚段进球、乌兹别克压出和弱防线状态依赖。

## 必须修正

- data-collector/postmatch：补两场正式复盘，含首发、半场、进球、点球、VAR越位、门将扑救、红黄牌、换人、xG/射门。
- player-state：同步哥伦比亚、葡萄牙、刚果金、乌兹别克斯坦第三轮成员表和 `data/outputs/player_state`。
- tactics-coach：复核0-0中的控风险/门将/VAR链，以及3-1中的后段提速、点球、追分暴露。
- modeler：校准 `draw_floor_dynamic`、`goalkeeper_save_variance`、`VAR_offside_disallowance_tail`、`third_round_scoreboard_pressure`、`penalty_tail`、`late_goal_tail`，并做重复计权约束。
- main：阻断项清除前不得发布 `complete`，不得把刚果金方向命中写成比分/盘口/总进球全中，也不得淡化葡萄牙热门方向失败。
