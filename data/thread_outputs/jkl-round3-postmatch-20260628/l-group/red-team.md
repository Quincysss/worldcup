# L组第三轮赛后红队复核

red_team_status: complete_red_team_review_after_user_result_input_source_limited  
overall_verdict: hold  
betting_language_blocked: true

## 总结

按用户给定赛果复核：克罗地亚 2-1 加纳、巴拿马 0-2 英格兰。本地已完成比赛目录没有这两场第三轮复盘文件，四队 `player_state` 和成员表也没有 2026-06-28 第三轮记录。由于官方逐人分钟和评分缺失，复盘只能 `partial/source_limited`，不能 `complete`。

## 克罗地亚 vs 加纳

verdict: hold  
model_error_verdict: revise

- 赛前：xG 1.28-0.78；红队后概率为克罗地亚胜/平/加纳胜 48.5%/30.5%/21.0%；Top5 为 1-0、0-0、1-1、2-0、0-1。
- 赛果：2-1。克罗地亚方向命中，但2-1不在Top5；实际 over2.5 和 BTTS 发生，而赛前 under2.5 与 BTTS-no 更强。
- top_concerns：方向命中不能掩盖比分/总进球尾部低估；第三轮克罗地亚必须赢与加纳守平价值需要按时段建模；逐人分钟和评分缺失阻断 complete。
- quant_chain_flags：小样本不能外推克罗地亚稳定进攻；泊松低估比分状态、后段破局、定位球/转换相关事件；克罗地亚经验、中场控制、市场支持和必须赢可能重复计权。
- parameter_update_risks：不要把2-1直接上修为克罗地亚常规攻击强度；先分离第三轮动机、换人、定位球/后段破局和加纳单点进球来源。

## 巴拿马 vs 英格兰

verdict: hold  
model_error_verdict: revise

- 赛前：xG 0.50-1.75；红队后概率为巴拿马胜/平/英格兰胜 11.5%/24.0%/64.5%；Top5 为 0-1、0-2、0-0、0-3、1-1。
- 赛果：0-2。英格兰方向命中，精确比分为Top2；under2.5 和 BTTS-no 也贴近模型。
- top_concerns：命中度高但仍缺官方首发、逐人分钟和评分；不能因为英格兰赢球就上调强队大胜 ceiling；赛前伤停/首发过期风险必须赛后关闭。
- quant_chain_flags：0-2命中不能证明所有因子正确；普通1X2赛前缺失，不能赛后反补市场校准；需确认是否存在早球、点球、红牌或低位久攻后破局。
- parameter_update_risks：不要把英格兰胜率和3+大胜一起上修；0-2更支持控制型小胜与低位破局路径。

## 必须修正

- data-collector/postmatch：补两场正式复盘，含官方首发、换人、逐人分钟、进球/助攻、牌、红牌/点球/定位球/早球、xG/射门。
- player-state：同步克罗地亚、加纳、巴拿马、英格兰第三轮成员表和 `data/outputs/player_state`。
- tactics-coach：复核克罗地亚2-1中的后段破局、BTTS、定位球/转换/换人尾部；复核英格兰0-2中的低位破局和控风险。
- modeler：回测必须拆分方向、比分、总进球、BTTS、让球层级；校准 late_break、set_piece_tail、BTTS_tail，并做重复计权审计。
- main：阻断项清除前不得写 `complete`，不得输出投注建议或将赛后命中转成可执行口径。
