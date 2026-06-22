---
phase: group_round_review
group: B
round: 2
status: complete
updated_at: 2026-06-19
owner: main-thread
scope: B组第二轮赛后汇总；索引单场复盘、预测偏差和模型修正。
---

# B 组第二轮复盘

## 第二轮结果

| 比赛 | 赛前预测 | 实际赛果 | 校验 |
| --- | --- | --- | --- |
| 加拿大 vs 卡塔尔 | 加拿大 2-1 卡塔尔 | 加拿大 6-0 卡塔尔 | 胜负方向命中，但大胜尾部严重低估 |
| 瑞士 vs 波黑 | 瑞士 1-1 波黑 | 瑞士 4-1 波黑 | 瑞士方向低估，平局和小球权重过高 |

## 第二轮后积分

| 球队 | 积分 | 净胜球 | 第二轮后状态 |
| --- | ---: | ---: | --- |
| 加拿大 | 4 | +6 | 主场大胜，净胜球优势巨大，但 Kone 伤情需复核 |
| 瑞士 | 4 | +3 | 后段爆发，替补冲击上调，末轮争头名 |
| 波黑 | 1 | -3 | 被红牌和后段崩盘打穿，末轮压力大 |
| 卡塔尔 | 1 | -6 | 两红牌与惨败重创模型评分 |

## 模型复盘

B 组第二轮对模型的冲击很大。赛前我们从第一轮两场 1-1 出发，把“平局基线”和“热门低赔折扣”抬得比较高；结果第二轮两个热门都赢，而且都打成大比分。

加拿大 6-0 卡塔尔说明，主场压迫型强队面对纪律风险高的低位队，一旦早段打开局面，比分尾部会被红牌和心理崩盘放大。赛前 2-1 的方向是对的，但 6-0 这种结果说明加拿大进攻上限、板凳冲击和卡塔尔纪律风险都被低估。

瑞士 4-1 波黑说明，第一轮瑞士 1-1 卡塔尔不能被过度解读成瑞士进攻长期低效。瑞士的结构稳定，替补改变比赛的能力很强；而波黑的身体对抗和禁区支点能拖住比赛，但一旦被红牌打破平衡，崩盘速度很快。

## 参数调整方向

| 参数 | 调整 | 适用范围 |
| --- | --- | --- |
| `canada_home_attacking_ceiling` | 上调 | 加拿大主场、对低位或纪律不稳对手 |
| `canada_red_card_blowout_multiplier` | 新增/上调 | 对手少打一人后的大胜尾部 |
| `qatar_discipline_risk` | 大幅上调 | 卡塔尔高压下的犯规、红牌和崩盘风险 |
| `qatar_low_block_resilience` | 下调 | 不能从逼平瑞士直接外推到所有强队 |
| `switzerland_late_substitution_impact` | 上调 | 瑞士后 30 分钟替补改变比赛 |
| `switzerland_control_to_goal_conversion` | 回调上修 | 第一轮低效不能过度惩罚 |
| `bosnia_red_card_collapse_risk` | 上调 | 波黑少打一人或被迫开放时 |
| `b_group_draw_baseline_after_round1` | 下调 | 第一轮全平不代表第二轮继续高平局 |
| `favorite_ceiling_tail_probability` | 上调 | 热门在红牌/早进球条件下的大胜尾部 |

## 文件索引

- `比赛\已完成比赛\小组赛\B组\2026-06-18_加拿大_6-0_卡塔尔_复盘.md`
- `比赛\已完成比赛\小组赛\B组\2026-06-18_瑞士_4-1_波黑_复盘.md`
- `data\outputs\match_predictions\b-group-round2-postmortem.json`
- `data\outputs\model_adjustments\b-group-round2-model-adjustments.json`

