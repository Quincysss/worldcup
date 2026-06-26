# B组第三轮主线程调度记录

```yaml
group: B
round: 3
created_at: 2026-06-24T18:12:00+08:00
workflow: collect_facts -> tactics -> model -> red_team -> write_files -> validate -> short_report
status: dispatched_and_completed_by_main_with_subthreads
```

## 调用线程

| 角色 | 状态 | 产物 |
| --- | --- | --- |
| 数据采集 | 已调用并落地，主线程修复乱码并补全 | data-collector-lineup-odds-recheck.md |
| 战术教练 | 已调用，主线程补齐可用版 | tactics-predicted-lineups.md |
| 数据模型 | 已调用并落地，主线程补齐Poisson与校准概率 | modeler-lineup-adjusted-recalc.md |
| 红队校验 | 已调用并落地，主线程修复乱码并补全 | red-team-lineup-odds-recheck.md |
| 竞彩风控 | 已调用，主线程补齐讨论版 | betting-risk.md |
| 汇总线程 | 已调用读取最终文件 | summary-lineup-adjusted.md |

## 主线程决策

- 不等待官方T-75首发；改用预测首发，并明确 `prediction_gate=pass_with_predicted_lineups`。
- 中国足彩网赔率可见，但页面提示暂停销售；因此 `betting_gate=hold_not_executable`。
- 瑞士 vs 加拿大主比分 1-1；波黑 vs 卡塔尔主比分 2-0。
