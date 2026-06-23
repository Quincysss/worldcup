# J组第二轮复盘 - 数据模型线程产物

> status: partial
> owner_thread: 数据模型 agent
> updated_at: 2026-06-23T12:26:00+08:00
> source_prediction: `data/outputs/match_predictions/j-group-round2-quant-prediction-20260621.json`
> source_postmortem: `data/outputs/match_predictions/j-group-round2-postmortem-20260623.json`

## 任务范围

- 阿根廷 2-0 奥地利
- 约旦 1-2 阿尔及利亚

## 最小回测

| 比赛 | 赛前1X2 | 实际 | 赛前主比分 | 实际比分 | 2.5球倾向 | 赛前xG | 实际进球 | 回测结论 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 阿根廷 vs 奥地利 | 阿根廷胜 61.44% / 平 21.42% / 奥地利胜 17.14% | 阿根廷胜 | 1-0（2-0为次高，10.78%） | 2-0 | 大 54.71%，实际小 | 1.95 - 0.92 | 2 - 0 | 胜平负命中；比分接近；弱侧进球尾部高估 |
| 约旦 vs 阿尔及利亚 | 约旦胜 26.89% / 平 27.96% / 阿尔及利亚胜 45.15% | 阿尔及利亚胜 | 0-1 | 1-2 | 小 60.40%，实际大 | 0.95 - 1.32 | 1 - 2 | 胜平负命中；总进球低估；强侧追分弹性低估 |

## 误差拆解

- 阿根廷 vs 奥地利：
  - xG误差：阿根廷 `+0.05`，奥地利 `-0.92`，总进球相对总xG `-0.87`。
  - 模型方向正确，但把奥地利在强队受控局面的终结概率抬得偏高。
  - `2-0` 已在高概率簇内，说明比分分布中心基本对，只是 top1 仍偏保守。
- 约旦 vs 阿尔及利亚：
  - xG误差：约旦 `+0.05`，阿尔及利亚 `+0.68`，总进球相对总xG `+0.73`。
  - 模型低估阿尔及利亚落后/胶着阶段的替补冲击和下半场提速。
  - 对约旦领先后防线稳定性的设定偏乐观，导致小球和 0-1 路径过重。

## 参数修正建议

- 上调：
  - `argentina_clean_sheet_factor`：`+0.03 ~ +0.05`
  - `messi_clutch_finishing_factor`：`+0.03 ~ +0.05`
  - `algeria_bench_attack_factor`：`+0.06 ~ +0.09`
  - `favorite_trailing_live_state_factor`：`+0.04 ~ +0.07`
- 下调：
  - `austria_vs_elite_final_third_factor`：`-0.05 ~ -0.07`
  - `underdog_goal_tail_in_control_games`：`-0.04 ~ -0.06`
  - `jordan_lead_protection_factor`：`-0.04 ~ -0.06`
- 保持：
  - 不建议因为本轮两场样本直接改写基础实力层权重。
  - 不建议改动市场校准主框架，只做比赛态势因子微调。

## 对现有 postmortem JSON 的处理建议

- 当前 `j-group-round2-postmortem-20260623.json` 结论可继续使用，不需要推翻重写。
- 建议后续补字段而不是改口径：
  - `predicted_primary_score`
  - `actual_score_error_by_team`
  - `actual_total_goals_error`
  - `xg_error_by_team`
  - `xg_total_error`
  - `player_state_update_sufficiency`

## player_state 判断

- 四队 `player_state_update_status` 字段层面显示已更新到第二轮赛后，作为本次模型回测输入可判定为 `sufficient_for_model_backtest`。
- 但至少一份 `player_state` JSON 在严格解析时出现噪声/格式异常，当前未完成全量机器可解析性复核。
- 因此本稿维持 `partial`，缺口集中在：`player_state JSON parseability verification`。

## 校验

- status: `partial`
- completed:
  - 已写入两场最小回测
  - 已给出参数上调/下调方向
  - 已判断 postmortem JSON 是否需改写
- gaps:
  - `player_state` 全量 JSON 可解析性未完全确认
  - 尚未把字段补齐建议回写进 `j-group-round2-postmortem-20260623.json`
