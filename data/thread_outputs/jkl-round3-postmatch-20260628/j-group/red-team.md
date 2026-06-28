# J组第三轮赛后红队复核

red_team_status: complete_red_team_review_source_limited  
overall_verdict: hold  
betting_language_blocked: true

## 总结

本地未发现 J 组第三轮两场正式赛果/复盘文件；只能从 32 强落位确认部分信号：阿根廷为 1J，奥地利为 2J。该信号不足以判断比分、让球、大小球、Top score 或逐票结算命中。四队成员表与 `player_state` 也未见 2026-06-28 第三轮赛后迭代，因此赛后复盘状态不能升级为 complete。

## 阿尔及利亚 vs 奥地利

verdict: hold

- 赛前模型：xG 1.14-1.31；阿尔及利亚胜/平/奥地利胜为 31.5%/33.0%/35.5%；Top score 为 1-1。
- 可确认赛后信号：奥地利落位 2J，但缺正式比分，不能判断是平局、奥地利胜还是其他净胜球路径。
- top_concerns：真实比分缺失；player_state 未更新；市场平局热与模型小幅客胜之间的冲突不能被“奥地利晋级”掩盖。
- quant_chain_flags：前两轮样本小；第三轮平局价值、末段提速和同步比赛依赖会污染常规强弱参数；独立泊松可能低估早球、红牌和末段打开。
- parameter_update_risks：不得仅因奥地利 2J 上修奥地利压迫/强度；不得在比分缺失时写入 Brier、Log loss、比分命中或让球命中。

## 约旦 vs 阿根廷

verdict: hold

- 赛前模型：xG 0.56-1.95；约旦胜/平/阿根廷胜为 12.0%/24.0%/64.0%；Top score 为 0-1。
- 可确认赛后信号：阿根廷落位 1J 且 32 强对阵 confirmed；但缺正式比分和净胜球，不能判断 0-1/0-2/0-3、约旦 +2 或大小球层级。
- top_concerns：真实比分缺失；阿根廷轮换/Messi 分钟/约旦低位是否兑现未闭合；普通 1X2 和同源大小球赛前缺口不能赛后反补。
- quant_chain_flags：阿根廷胜、赢 2 球、赢 3+ 是不同层级；第三轮控风险和轮换会混淆强队基础胜率；缺事件时间线无法验证早球/红牌/低位节奏尾部。
- parameter_update_risks：不得把阿根廷 1J 当作比分或盘口命中；不得因方向层大概率兑现而上调强队 ceiling。

## 必须修正

- data-collector/postmatch：补两场官方赛果、半场、进球/牌/换人、首发和技术统计。
- player-state：同步阿尔及利亚、奥地利、约旦、阿根廷第三轮成员表和 `data/outputs/player_state`。
- tactics-coach：复核赛前假设被证伪/命中的战术链，特别是奥地利平局价值、阿尔及利亚末段提速、阿根廷轮换控节奏、约旦低位。
- modeler：比分和事件链补齐前禁止写参数更新；补齐后分拆方向、净胜球、Top score、大小球和盘口层级。
- main：阻断项清除前不得写 complete，也不得用方向命中掩盖比分/盘口/投注层失败。
