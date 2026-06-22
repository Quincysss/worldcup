# L组第二轮量化预测红队复审（2026-06-22）

red_team_status: complete_red_team_review_after_model_fill  
verdict: hold  
betting_language_blocked: true  

## 收口结论

预测 Markdown 与 JSON 基本一致，且未越过 `discussion_only_hold`。但临场首发、最终伤停/分钟、官方中国竞彩、同源 1X2/让球/大小球仍缺，第一轮表现、战术因子与 player_state 也存在重复计权风险，因此红队 verdict 维持 `hold`。

## blocking_gates

- T-75m official lineups
- final injuries/minutes
- official Chinese sports lottery odds
- same-source 1X2/handicap/totals

## top_concerns

- first-round overfit：英格兰 4-2 与克罗地亚 4-2 失利后的单场样本可能被外推过重。
- duplicate counting：首轮进球、player_state、战术因子、定位球优势可能重复进入同一方向。
- England-Ghana transition tail：加纳低位、转换、定位球和末段替补尾部仍需抬高不确定性。
- Panama-Croatia draw/under tail：巴拿马低位压节奏、同城休整与克罗地亚老将分钟不确定，平局/小比分尾部需抬高。
- Poisson correlation events：早球、点球、红牌、换人和追分状态等强相关事件可能被独立 Poisson 低估。

## probability_discount_suggestion

- 英格兰胜：模型 64.98%，赛前首发前建议临时 cap / review band 约 59-62%，并上调平局与加纳转换尾部不确定性。
- 克罗地亚胜：模型 54.07%，赛前首发前建议临时 cap / review band 约 49-52%，并上调平局、小比分与巴拿马低位尾部不确定性。

## owner_followups

- data/team news：补 T-75m 官方首发、最终伤停/分钟、Ati-Zigi、Rice/Rashford/Saka、克罗地亚老将分钟、巴拿马牌/轮换。
- model cap：限制首轮样本外推，去重 player_state、战术因子、首轮进球与定位球优势。
- betting hold：官方中国竞彩和同源 1X2/让球/大小球缺失前，继续阻断投注化表达。
