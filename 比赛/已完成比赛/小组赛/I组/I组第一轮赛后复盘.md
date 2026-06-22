# I组第一轮赛后复盘

phase: group_round_postmortem  
status: completed_match_review  
updated_at: 2026/06/17 10:20 +08:00  
group: I  
scope: 复盘昨晚已确认完赛的 I组两场：法国 3-1 塞内加尔、伊拉克 1-4 挪威。

## 赛果总览

| 比赛 | 赛前预测 | 实际比分 | 胜平负 | 精确比分 |
| --- | --- | --- | --- | --- |
| 法国 vs 塞内加尔 | 法国 2-1 塞内加尔 | 法国 3-1 塞内加尔 | 命中 | 未命中 |
| 伊拉克 vs 挪威 | 伊拉克 0-2 挪威 | 伊拉克 1-4 挪威 | 命中 | 未命中 |

第一轮两场的方向判断不错：法国和挪威都拿到了该拿的胜利。但我们对比分仍偏保守，尤其是挪威这场，实际大胜路径比模型给得更清晰。

## 最大校准点

这次不是 G/H 组那种“低估平局”的问题，而是另一个方向：当热门方拥有顶级终结点和后程冲击力时，我们不能因为首轮保守逻辑就过度压低扩大比分概率。

法国和挪威都有一个共同点：不是只靠控球赢，而是有能把半机会变成进球的人。Mbappe、Haaland 这种级别的终结点，会让 2-1、0-2 这种保守比分更容易被推到 3-1、1-4。

## 模型修正

- 对拥有顶级终结点的热门队，提高 `elite_finisher_conversion`。
- 对热门队后 30 分钟优势，提高 `late_game_attack_boost`。
- 对低位防守队，若先丢球，提高 `game_state_collapse_risk`。
- 对非零封路径提高一点权重：弱队即使大比分输，也可能通过支点、定位球或一次转换进球。

## 对 I组后续的含义

法国和挪威都证明了自己有稳定拿三分的能力。法国的优势在边路、替补和 Mbappe 的决定性；挪威的优势在 Haaland/Odegaard 轴心和禁区效率。两队后续直接或间接竞争小组头名时，不能只看控球率，必须看谁能把对手防线压到最后阶段。

塞内加尔没有崩盘，但后段防线保护要修。伊拉克的问题更严重：一旦比赛状态被打开放，低位防守很难恢复成低事件局。

## 文件索引

- `比赛/已完成比赛/小组赛/I组/2026-06-16_法国_3-1_塞内加尔_复盘.md`
- `比赛/已完成比赛/小组赛/I组/2026-06-16_伊拉克_1-4_挪威_复盘.md`
- `data/outputs/match_predictions/i-group-round1-postmortem.json`

## 参考源

- Olympics matchday live scores: https://www.olympics.com/en/news/fifa-world-cup-2026-every-match-group-result-tuesday-16-june-live-scores
- Los Angeles Times live updates: https://www.latimes.com/sports/soccer/live/fifa-world-cup-live-updates-tv-schedule-results-standings-highlights
- FIFA Match Schedule: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/match-schedule

