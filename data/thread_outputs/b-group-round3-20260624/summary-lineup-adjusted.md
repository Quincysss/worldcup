# B组第三轮首发/赔率复核汇总

```yaml
phase: group_round3_lineup_adjusted_summary
group: B
status: completed_for_main_reply
updated_at: 2026-06-24T18:14:00+08:00
prediction_gate: pass_with_predicted_lineups
betting_gate: hold_not_executable
official_t75_lineups: not_available
odds_source_status: usable_for_market_calibration_sales_paused
```

## 校对后预测表

| 场次 | 比赛 | 预测比分 | 胜平负概率 | predicted_lineup | 竞彩状态 | 红队结论 |
| --- | --- | --- | --- | --- | --- | --- |
| 周三049 | 瑞士 vs 加拿大 | 1-1 | 瑞士 38.50% / 平 33.00% / 加拿大 28.50% | estimated / not official | hold_not_executable | revise_then_pass |
| 周三050 | 波黑 vs 卡塔尔 | 2-0 | 波黑 69.00% / 平 18.00% / 卡塔尔 13.00% | estimated / not official | hold_not_executable | revise_then_pass |

## 关键校对结论

- `betting_gate=hold_not_executable`：保持不变。页面有暂停销售提示，因此只能做 discussion-only 风险观察，不能升级为可执行购彩口径。
- `T-75` 未公布不阻塞预测：本轮允许使用 predicted lineups，并在模型里加入阵容不确定性折扣。
- 竞彩同源赔率可用于市场校准：049/050 的中国足彩网胜平负与让球胜平负可见，已用于市场概率去水与模型校准。
- 页面暂停销售：赔率可以参考，但不能当作当前可成交价格使用。

## 必带风险标签

- `predicted_lineup_not_official`
- `betting_gate_hold`
- `odds_source_sales_paused`
- `third_round_incentive_game`
- `same_time_dependency`

## 给主线程的收口

- 预测可发布。
- 投注只能写 discussion-only / hold。
- 赛前约 1 小时若拿到官方首发，需要再做一次轻量复核，但当前不阻塞第三轮预测摘要发布。
