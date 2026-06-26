# A组第三轮首发/赔率复核后汇总

> phase: group_round3_lineup_adjusted_summary
> group: A组
> status: complete
> updated_at: 2026-06-24T18:08:00+08:00
> owner: 汇总/评论员输出 agent

## 汇总短表

| 比赛 | predicted lineup 状态 | 体彩同源赔率 | 模型重算 | 投注口径 | 关键说明 |
|---|---|---|---|---|---|
| 捷克 vs 墨西哥 | estimated | ZGZCW 3.63/3.50/1.76；乐彩一致 | 已重算：31.69/27.44/40.87 | hold | 墨西哥热门胜被轮换和平局接受度降温 |
| 南非 vs 韩国 | estimated | ZGZCW 5.55/3.78/1.46；乐彩一致 | 已重算：22.61/26.97/50.41 | hold | 南非中轴停赛明确，韩国胜仍是方向但低赔偏热 |

## 当前结论

- T-75官方首发未到公布窗口，不再作为赛前预测阻塞；预测使用 `estimated` 首发并降低置信度。
- 中国足彩网与乐彩普通胜平负一致，已可用于市场校准；但中国足彩网提示暂停销售，仍不能升级为执行购彩建议。
- 模型线和红队线已落地，结论统一为：可讨论预测，投注执行保持 `discussion_only/hold`。

## 输入文件

- data/thread_outputs/a-group-round3-20260624/data-collector-lineup-odds-recheck.md
- data/thread_outputs/a-group-round3-20260624/tactics-predicted-lineups.md
- data/thread_outputs/a-group-round3-20260624/modeler-lineup-adjusted-recalc.md
- data/thread_outputs/a-group-round3-20260624/red-team-lineup-odds-recheck.md
