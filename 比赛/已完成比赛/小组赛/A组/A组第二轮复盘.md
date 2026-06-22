---
phase: group_round_review
group: A
round: 2
status: complete
updated_at: 2026-06-19
owner: main-thread
scope: A组第二轮赛后汇总；索引单场复盘、预测偏差和模型修正。
---

# A 组第二轮复盘

## 第二轮结果

| 比赛 | 赛前预测 | 实际赛果 | 校验 |
| --- | --- | --- | --- |
| 墨西哥 vs 韩国 | 墨西哥 1-1 韩国 | 墨西哥 1-0 韩国 | 小比分命中，平局高估，墨西哥胜率低估 |
| 捷克 vs 南非 | 捷克 1-0 南非 | 捷克 1-1 南非 | 小球命中，防平提醒有效，捷克胜方向未命中 |

## 第二轮后积分

| 球队 | 积分 | 净胜球 | 第二轮后状态 |
| --- | ---: | ---: | --- |
| 墨西哥 | 6 | +3 | 提前出线，末轮存在轮换空间 |
| 韩国 | 3 | 0 | 仍有主动权，但末轮不能低估南非韧性 |
| 捷克 | 1 | -1 | 连续暴露控场问题，末轮必须抢分 |
| 南非 | 1 | -2 | 留住生机，但进攻质量仍需谨慎评估 |

## 模型复盘

A 组第二轮最大的教训不是“冷门很多”，而是两个低事件局都卡在了模型最难处理的边界上。

墨西哥 1-0 韩国说明，主场强队不一定用控球压制对手，但可以通过一次高质量转换或中场插上，把低事件局管理成 1-0。赛前模型把韩国首轮逆转的后程强度上调，这是合理的；偏差在于把韩国控球和技术控制过多折算成进球概率。

捷克 1-1 南非则再次确认，捷克的高点和定位球优势是真实的，但领先后控场惩罚必须进入数值层。南非的进攻不能高估，可它在保命局里拖到最后、制造一点机会的能力也不能被首轮 0-2 完全抹掉。

## 参数调整方向

| 参数 | 调整 | 适用范围 |
| --- | --- | --- |
| `mexico_low_event_win_conversion` | 上调 | 墨西哥主场、低节奏、先手进球或中场优势局 |
| `south_korea_possession_to_xg_discount` | 上调惩罚 | 韩国面对身体对抗强、低位纪律好的防线 |
| `czechia_game_management_penalty` | 上调 | 捷克领先后、比赛后 30 分钟 |
| `south_africa_late_resilience_bonus` | 上调 | 南非落后 1 球、低事件保命局 |
| `draw_weight_in_survival_matches` | 上调 | 两队都不能输或弱势方先求不崩的第二/第三轮 |
| `market_alignment_weight_when_low_event` | 下调 | 低事件局里市场热门不能过度覆盖平局/尾部路径 |
| `favorite_moneyline_discount_after_host_signal` | 对墨西哥类主场信号减小折扣 | 东道主主场信号已连续兑现，不能机械反热门 |

## 文件索引

- `比赛\已完成比赛\小组赛\A组\2026-06-18_墨西哥_1-0_韩国_复盘.md`
- `比赛\已完成比赛\小组赛\A组\2026-06-18_捷克_1-1_南非_复盘.md`
- `data\outputs\match_predictions\a-group-round2-postmortem.json`
- `data\outputs\model_adjustments\a-group-round2-model-adjustments.json`
