# H组第二轮复盘

- 阶段：小组赛 H 组第二轮
- 比赛：西班牙 4-0 沙特；乌拉圭 2-2 佛得角
- 状态：`completed_partial_source_limited`
- 信息表：西班牙、沙特、乌拉圭、佛得角均已追加第二轮内部评分记录

## 小组态势

H 组第二轮的核心信息很清楚：西班牙完成强势修正，佛得角连续证明自己不是偶然，乌拉圭的高强度打法风险被放大，沙特则在面对顶级压迫时暴露出出球和禁区防守短板。

西班牙 4-0 的意义，不只是拿三分，而是解决了首轮对佛得角 0-0 时最刺眼的问题：低位破局。佛得角 2-2 乌拉圭则再次改变了小组判断，它已经连续逼平两个强队，模型必须把它的低位韧性和定位球威胁当成真实输入。

## 西班牙 4-0 沙特

赛前模型方向命中西班牙胜，但低估了大胜尾部。Yamal 首发让西班牙右路有爆点，Oyarzabal 的禁区跑位补上了终结点，Rodri、Baena、Olmo 让传导更快。沙特的五后卫结构早早被打穿，比赛在前 25 分钟基本失去悬念。

这场之后，西班牙应上调 `fast_start_then_load_manage`：他们不仅能控球，还能在早球打开后管理体能和风险。沙特则需下调面对高位压迫时的 build-up resistance 和 defensive-line stability。

## 乌拉圭 2-2 佛得角

乌拉圭有强度，也能反扑，但缺少稳定控制。Pina 任意球让佛得角领先，Araujo 和 Canobbio 帮乌拉圭反超，随后 Varela 抓住防线失误扳平。乌拉圭最后仍有压力，但无法把比赛重新关上。

佛得角的复盘价值非常高。首轮逼平西班牙可能还能被解释成一次低位爆冷，但第二轮又逼平乌拉圭，说明它的低位纪律、定位球和心理韧性都应该进入模型。乌拉圭则需要同步上调进攻强度和防线波动，而不是只保留强队胜率。

## 模型共同教训

| 项目 | 第二轮暴露的问题 | 下一轮处理 |
| --- | --- | --- |
| 西班牙 | 低估早球后大胜尾部 | 上调强队 3+ 球尾部，但需避免和 Yamal/Oyarzabal 个人状态重复计权 |
| 沙特 | 低位开局抗压失败 | 下调面对高位压迫时的出球和禁区横移 |
| 乌拉圭 | 高压迫伴随高波动 | 攻击评分保留，defensive_line_risk 同步上调 |
| 佛得角 | 定位球和韧性被低估 | 上调 set-piece/draw/underdog two-goal tail |

## 信息表迭代

已更新：

- `data/outputs/player_state/spain-player-state.json`
- `data/outputs/player_state/saudi-arabia-player-state.json`
- `data/outputs/player_state/uruguay-player-state.json`
- `data/outputs/player_state/cape-verde-player-state.json`
- 四队对应 `roster.json`
- 四队 `成员表.md`

四队每名球员均已追加第二轮 `internal_match_rating_1_5` 与赛后 `form_status_1_5`。当前仍为 `partial_source_limited`，因为完整官方逐人分钟、换人和同源外部评分仍需后续补齐。

## 重点参数更新

- `poisson_tail_dispersion_for_high_mismatch_matches`：西班牙 4-0 是典型触发条件。
- `non_favorite_two_goal_tail`：佛得角 2-2 乌拉圭说明弱势方两球尾部不能过薄。
- `market_alignment_weight_split`：市场帮助判断西班牙，但在乌拉圭热门热度上需要降温。
- `africa_compact_counter_resilience_bonus`：佛得角必须进入证据型上调样本。

## 文件

- `比赛/已完成比赛/小组赛/H组/2026-06-21_西班牙_4-0_沙特_复盘.md`
- `比赛/已完成比赛/小组赛/H组/2026-06-21_乌拉圭_2-2_佛得角_复盘.md`
- `data/outputs/match_predictions/h-group-round2-postmortem-20260622.json`
- `data/outputs/model_backtests/g-h-round2-model-backtest-20260622.json`
