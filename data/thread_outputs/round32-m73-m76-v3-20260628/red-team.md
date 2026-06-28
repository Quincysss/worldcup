# M73-M76 v3 预测链红队复审

red_team_status: complete_red_team_review_after_data_tactics_model_fill  
upstream_status: present_partial_source_limited  
overall_verdict: hold  
betting_gate: hold_not_executable  
betting_language_blocked: true  
created_at: 2026-06-28T21:40:00+08:00

## 读取结论

已按主线程要求重新读取当前目录三件套：

- `data-collector.json`: present, partial_source_limited, 21:28:54
- `tactics-coach.json`: present, partial_source_limited, 21:30:45
- `modeler.json`: present, completed_partial_source_limited_data_and_tactics_absorbed, 21:30:59

模型链已有 xG、Poisson、90分钟 1X2、大小球、top scores 和尾部说明；但官方首发、最终伤停/分钟限制、官方中国竞彩、同源赔率仍缺，投注 gate 必须保持 `hold_not_executable`。

另需提示：三份上游 `.json` 在本地 `ConvertFrom-Json` 严格解析时报错，红队本次按原文可读字段审查。主线程整合前应修复上游 JSON 编码/转义，避免机器聚合失败。

## 四场 verdict

| 场次 | 模型 90分钟概率 | 红队 verdict | 核心阻断 |
| --- | --- | --- | --- |
| M73 南非 vs 加拿大 | 南非 30.12% / 平 27.24% / 加拿大 42.65%，xG 1.08-1.34 | hold | Davies/Eustaquio/Kone 分钟、Mokoena 状态冲突、T-75、同源赔率缺失；低事件平局和首球事件波动仍需保留。 |
| M74 德国 vs 巴拉圭 | 德国 67.93% / 平 19.33% / 巴拉圭 12.74%，xG 2.10-0.78 | hold | 德国热门税和 7-1 样本外推风险；巴拉圭低位/定位球分支未充分压实；T-75 与赔率缺失。 |
| M75 荷兰 vs 摩洛哥 | 荷兰 45.45% / 平 25.88% / 摩洛哥 28.67%，xG 1.48-1.12 | hold | 最强平局底盘场；荷兰近两场高产可能过热，摩洛哥转换尾部和 Bounou 状态需复核；同源赔率缺失。 |
| M76 巴西 vs 日本 | 巴西 56.94% / 平 22.06% / 日本 21.00%，xG 1.92-1.08 | hold | 巴西品牌/球星溢价不可审，Vinicius/Bruno 状态与战术宽路优势有重复计权风险；日本 1-1/低事件尾部不可压低。 |

## 必改与概率折扣

- M73：加拿大 42.65% 不能作为硬发布概率；若 Davies/Eustaquio 分钟受限，建议复核到 39-42% 区间，并保持平局约 27% 风险。
- M74：德国 67.93% 应在 T-75 与赔率前按 63-66% 口径封顶；必须抬高巴拉圭定位球、低位平局和先手球分支。
- M75：荷兰 45.45% 只能作为轻微模型优势；若摩洛哥主防线完整，建议保持 42-45% 审查带，并保留平局 26% 与摩洛哥 29% 尾部。
- M76：巴西 56.94% 应视为临时上沿；若日本左侧保护和巴西轮换成立，建议审查到 53-56% 带，同时明确非胜质量超过四成。

## 量化链红队 flags

- 模型已吸收 tactics ten-factor，且市场权重设为 0，这是合理克制。
- 仍有重复计权风险：加拿大转换、德国 7-1、荷兰高产、巴西 Vinicius/Bruno、日本低事件防守。
- 泊松尾部虽有 tail_shape_adjustments，但红牌、点球、VAR、早球和门将波动仍只能靠文字层提示，不能视作完全建模。
- 淘汰赛边界已标 90分钟 1X2，晋级/加时/点球未模拟，主线程不得混写。
- 上游 JSON 严格解析失败，是机器整合风险，需 owner 修复。

## 最终阻断项

- T-75 官方首发。
- 最终伤停、停赛、黄牌风险和分钟限制。
- 官方中国竞彩。
- 同源 1X2 / 让球 / 大小球赔率快照与 overround。
- 天气、裁判、临场节奏信息。
- 上游 JSON 机器可解析性。

## 收口

最终 verdict：`hold`。四场都可作为“赛前讨论中的模型分布”继续传递，但不能发布为最终预测确信口径，更不能进入任何可执行投注语言。
