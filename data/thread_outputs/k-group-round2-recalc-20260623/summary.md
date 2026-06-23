# K组第二轮补充输入后复核重算 - 汇总短版

> phase: match_prediction_recalc
> group: K组
> status: partial_thread_backed_discussion_only
> created_at: 2026-06-23T16:05:28+08:00
> updated_at: 2026-06-23T16:18:23+08:00
> owner: 汇总/评论员输出 agent
> scope: 只汇总两场最终预测表、体彩赔率来源状态、discussion_only/hold 风险、输出文件路径
> inputs_expected:
> - `data/thread_outputs/k-group-round2-recalc-20260623/data-collector.md`
> - `data/thread_outputs/k-group-round2-recalc-20260623/tactics-coach.md`
> - `data/thread_outputs/k-group-round2-recalc-20260623/modeler.md`
> - `data/thread_outputs/k-group-round2-recalc-20260623/red-team.md`
> inputs_used:
> - `data/thread_outputs/k-group-round2-recalc-20260623/data-collector.md`
> - `data/thread_outputs/k-group-round2-recalc-20260623/tactics-coach.md`
> - `data/thread_outputs/k-group-round2-recalc-20260623/modeler.md`
> - `data/thread_outputs/k-group-round2-recalc-20260623/red-team.md`
> - `data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json`
> notes:
> - 四线文件已可读取，但数据、模型、红队均明确当前不能升格为 betting-ready。
> - 本稿只保留最终摘要结论，不展开过程说明。

## 最终预测表

| 比赛 | 比分倾向 | 胜平负概率 | 总进球倾向 | 发布口径 |
| --- | --- | --- | --- | --- |
| 葡萄牙 vs 乌兹别克斯坦 | 2-0；并列保留 1-0 / 1-1 风险 | 葡萄牙胜 64.87% / 平 21.30% / 乌兹别克斯坦胜 13.83% | 小 2.5 略占优，50.84% | 葡萄牙占优，但仅限 discussion-only 讨论稿 |
| 哥伦比亚 vs 刚果金 | 2-1；必须保留 1-1 高风险 | 哥伦比亚胜 49.85% / 平 25.37% / 刚果金胜 24.78% | 小 2.5 略占优，52.35% | 哥伦比亚略占先，不可写成强热门 |

## 体彩赔率来源状态

- 中国体彩同源即时赔率：`missing_or_blocked`
- 新浪/懂球帝/500 等中国侧公开替代源：未形成可结构化、同时间戳、可比盘口链
- 当前赔率层结论：可写“缺同源体彩赔率支持”，不可写市场校准已完成

## discussion_only / hold 风险

- 当前只能标注为 `partial_thread_backed_discussion_only`。
- 红队总 verdict：`hold_for_betting`
- 发布模式：`discussion_only`
- 触发原因：
  - 缺 `T-75` 官方首发
  - 缺最终伤停/停赛确认
  - 缺中国体彩同源赔率链
  - `k-group-round2-quant-prediction-20260623.json` 仍被红队标记为不可机读解析风险

## 输出文件路径

- `K:\worldcup\data\thread_outputs\k-group-round2-recalc-20260623\summary.md`

<!-- cp-jc-odds-20260623:start -->
## 汇总摘要 2026-06-23 体彩赔率复核
| 比赛 | 方向 | 胜/平/负 | xG | 主比分 | 竞彩赔率状态 |
|---|---|---:|---|---|---|
| 葡萄牙 vs 乌兹别克斯坦 | 葡萄牙胜 | 65.5% / 21.2% / 13.3% | 1.92-0.72 | 1-0 / 2-0 | 周二045：普通SPF未开售；让球-2为1.98/4.05/2.65 |
| 哥伦比亚 vs 刚果金 | 哥伦比亚小胜倾向 | 57.0% / 23.5% / 19.5% | 1.72-0.94 | 1-0 / 2-1 | 周二048：SPF 1.35/3.90/7.60；让球-1为2.22/3.35/2.63 |

结论：已纳入中国足彩网竞彩混合页赔率；红队仍维持 discussion_only / hold_for_betting。
<!-- cp-jc-odds-20260623:end -->
