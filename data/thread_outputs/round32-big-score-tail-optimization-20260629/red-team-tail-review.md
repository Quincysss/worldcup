# 淘汰赛大比分尾部层红队审查

verdict: `revise`
betting_advice: `false`

## 审查结论

允许新增 `knockout_big_score_tail_layer`，但它只能作为尾部可见性/风险层接入。不得直接改 xG、胜平负概率、大小球概率、首选比分、红队状态或竞彩闸门。

## 护栏

- 只作为 tail_visibility / risk layer 接入，不直接改 1X2、xG、大小球或 headline score。
- T-75 官方首发、最终伤停/分钟限制和同源赔率未闭合前，不能把大比分尾部写成可执行结论。
- 红牌、早球、点球、门将失误和晚段追分只能作为条件尾部，不得作为稳定主预测。
- 必须保留 raw Poisson 和 adjusted headline score，防止从过保守反向过度补偿。
- 防止与 totals、BTTS、player_state、tactical_volatility 重复计权。

## 分级

- high：M74、M76、M77、M80、M82、M84
- medium：M78、M81
- low：M73、M75、M79、M83
- 禁止写成主线比分：M73、M75、M78、M79、M81、M82、M83

