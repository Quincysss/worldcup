# G组第二轮复盘

- 阶段：小组赛 G 组第二轮
- 比赛：比利时 0-0 伊朗；新西兰 1-3 埃及
- 状态：`completed_partial_source_limited`
- 信息表：比利时、伊朗、新西兰、埃及均已追加第二轮内部评分记录

## 小组态势

G 组第二轮把这个组从“比利时和埃及相对占优”推向了更混沌的局面。埃及 3-1 逆转新西兰后拿到关键胜利，伊朗连续两场不败，比利时则两连平且仍没有自己完成运动战进球。新西兰虽然两场都能进球，但两场都丢掉领先或控制权，后程稳定性成为硬伤。

## 比利时 0-0 伊朗

比利时的问题继续集中在转化率。赛前模型给比利时 1.55 xG 和 47.7% 胜率，说明我们知道他们不是绝对稳胆，但仍高估了他们把前场过程转成进球的能力。Beiranvand 的扑救、伊朗低位纪律、Taremi 的反击威胁和 Ngoy 红牌，让比赛落到模型没有充分覆盖的 0-0 尾部。

模型后续处理比利时时，要把“控球推进”和“禁区兑现”拆开，不再把前场人数和射门数自动映射成进球均值。伊朗则应上调低位防守和反击出口，但不能误读为中场控制增强。

## 新西兰 1-3 埃及

新西兰依靠 Surman 头球先领先，说明直接打法和空中路线仍有用。但埃及下半场的反扑质量更高：Ziko 扳平，Salah 反超，Trezeguet 锁定胜局。赛前模型方向命中埃及胜，但低估了埃及 3 球尾部，也高估了新西兰首轮进攻状态的可持续性。

这场之后，埃及不能再被建模成单纯 Salah 反击队。Ashour 的中路连接、Ziko/Trezeguet 的禁区冲击和定位球价值，都会影响第三轮。

## 模型共同教训

| 项目 | 第二轮暴露的问题 | 下一轮处理 |
| --- | --- | --- |
| 比利时进攻 | 过程强但终结弱 | 下调转化率，上调平局/低比分尾部 |
| 伊朗防守 | 低位和门将能显著压比分 | 上调 low-block survival，但不加控球 |
| 新西兰状态 | 首轮进攻高光外推过多 | 限制单场爆发带来的 team bump |
| 埃及进攻 | 多点进攻尾部被低估 | 上调二阶段压迫和 3 球尾部 |

## 信息表迭代

已更新：

- `data/outputs/player_state/belgium-player-state.json`
- `data/outputs/player_state/iran-player-state.json`
- `data/outputs/player_state/new-zealand-player-state.json`
- `data/outputs/player_state/egypt-player-state.json`
- 四队对应 `roster.json`
- 四队 `成员表.md`

四队每名球员均已追加第二轮 `internal_match_rating_1_5` 与赛后 `form_status_1_5`。当前仍为 `partial_source_limited`，因为完整官方逐人分钟和同源外部评分未全部稳定取得。

## 重点参数更新

- `low_event_zero_inflation_draw_tail`：比利时 vs 伊朗类比赛上调。
- `round1_player_state_overreaction_cap`：限制新西兰首轮高光外推。
- `africa_compact_counter_resilience_bonus`：对埃及、伊朗这类低位/反击/韧性路径做证据型上调。
- `poisson_tail_dispersion_for_high_mismatch_matches`：埃及 3-1 说明优势方多球尾部要比原模型更厚。

## 文件

- `比赛/已完成比赛/小组赛/G组/2026-06-21_比利时_0-0_伊朗_复盘.md`
- `比赛/已完成比赛/小组赛/G组/2026-06-21_新西兰_1-3_埃及_复盘.md`
- `data/outputs/match_predictions/g-group-round2-postmortem-20260622.json`
- `data/outputs/model_backtests/g-h-round2-model-backtest-20260622.json`
