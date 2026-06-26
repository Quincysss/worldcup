# B组第三轮 红队校验摘要

status: completed

## Verdict

部分失效。核心失败集中在瑞士 vs 加拿大：结果方向、主比分脚本和动机叙事都偏了；波黑 vs 卡塔尔命中胜负方向，但对开放比赛后的尾部比分与失球回摆仍偏保守。总体问题是“对平局脚本过度自信、对尾部比分过度保守”。

## Top Concerns

- 第三轮动机误判：瑞士 vs 加拿大把“平局激励”抬得过高，低估瑞士争头名/路径收益。
- 伤停/首发误判：Eustaquio 无法首发、Davies 可用但不适合高负荷，这类中轴损失没有触发足够强的阵容风险惩罚。
- 市场校准误差：市场平局价格和模型平局叙事同向叠加，缺少 `market_draw_absorption_cap`。
- 尾部比分风险低估：2-1 与 3-1 都说明开放局面下的 2+ 进球尾部被压低。
- 文字风险没有进入分布：波黑战“必须取胜会放大后段波动”停留在备注，没有真正推高比分尾部。

## 参数修正

| 参数 | 建议 |
| --- | --- |
| third_round_draw_incentive_weight | 下调15%-25%，有头名/路径收益时收缩平局加成 |
| path_value_asymmetry_multiplier | 新增，头名和淘汰赛路径收益进入高优先级因子 |
| market_draw_absorption_cap | 新增，市场信号单独上调平局不超过1.5-2.0个百分点 |
| availability_chain_gate_weight | 上调；关键中轴缺阵达到2人时触发比分分布重算 |
| nonstarter_star_minutes_prior | 新增；可入名单但不健康球星采用更低出场先验 |
| must_win_open_state_multiplier | 上调15%-20%，直接注入70分钟后比分尾部 |
| favorite_two_plus_goal_tail | 上调约20% |
| underdog_consolation_goal_tail | 上调10%-15% |
