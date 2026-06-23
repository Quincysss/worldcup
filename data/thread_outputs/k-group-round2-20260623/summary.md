# K组第二轮预测 - 汇总短版

> status: partial_thread_fallback
> owner_thread: 汇总/评论员输出 agent
> updated_at: 2026-06-23T15:50:10+08:00
> discussion_only: true
> scope: 只输出 K 组第二轮两场比赛的短汇总，不展开长报告，不提供投注建议
> inputs_expected:
> - `data/thread_outputs/k-group-round2-20260623/data-collector.md`
> - `data/thread_outputs/k-group-round2-20260623/tactics-coach.md`
> - `data/thread_outputs/k-group-round2-20260623/modeler.md`
> - `data/thread_outputs/k-group-round2-20260623/red-team.md`
> - `data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json`
> inputs_used:
> - `data/outputs/match_predictions/k-group-round2-quant-prediction-20260622.json`
> upstream_note: 四个线程 Markdown 当前仍是 skeleton_created；用户指定的 `20260623` 量化 JSON 本地缺失，本稿仅以 `20260622` 量化预测文件做 discussion_only 汇总

## 预测表

| 比赛 | 比分倾向 | 胜平负概率 | 总进球倾向 | 结论口径 |
| --- | --- | --- | --- | --- |
| 葡萄牙 vs 乌兹别克斯坦 | 1-0 / 2-0 更靠前 | 葡萄牙胜 63.85% / 平 21.46% / 乌兹别克斯坦胜 14.69% | 大于2.5球 50.15%，接近五五开 | 葡萄牙占优，但不是轻松碾压盘面 |
| 哥伦比亚 vs 刚果金 | 1-1、1-0、2-1 都很活跃 | 哥伦比亚胜 48.93% / 平 25.10% / 刚果金胜 25.97% | 小于2.5球 50.35%，基本五五开 | 哥伦比亚是第一方向，但平局和冷门尾部不能忽视 |

## 关键理由

- 葡萄牙这场的底盘仍然来自整体实力、边路宽度和半空间创造能力，模型给到 `1.90 vs 0.78` 的预期进球差。
- 但葡萄牙首轮只和刚果金 1比1，说明“能压住场面”不自动等于“能把比赛早早杀死”，所以模型把大胜信心压下来了。
- 乌兹别克斯坦的反击出口还在，费祖拉耶夫和肖穆罗多夫这条线让平局尾部和一球输球路径持续可见。
- 哥伦比亚这场是更典型的“方向偏哥伦比亚，过程未必轻松”：哥伦比亚边路推进、路易斯-迪亚斯持球和詹姆斯输送仍是主线。
- 刚果金首轮逼平葡萄牙后，反击、定位球和身体对抗的可信度被抬高，所以模型把 `1-1` 放在单一最高比分位。

## 关键风险

- 四个上游线程文件目前都还是骨架，数据采集、战术、模型说明、红队核验都没有形成这一轮的完整文字产物。
- 用户指定的 `k-group-round2-quant-prediction-20260623.json` 本地不存在，当前只能引用 `20260622` 版本作为替代。
- 缺少 `T-75m` 官方首发、最新伤停和出场时间限制确认。
- 缺少同源 1X2、让球、大小球实时赔率快照，无法做市场校准。
- 红队 verdict 文件尚未成文，因此不能把这份预测包装成 fully verified。

## 是否只是 discussion_only

是。当前只能标注为 `discussion_only`：

- 没有完整四线 thread-backed 产物。
- 没有最终版量化 JSON `20260623`。
- 没有临场首发、赔率和红队放行。

## 给主线程一句状态摘要

K组第二轮汇总已落成短版 `summary.md`，但当前仅能基于 `20260622` 量化 JSON 输出 `partial_thread_fallback + discussion_only` 预测，四线线程正文和 `20260623` 最终量化文件仍缺。
