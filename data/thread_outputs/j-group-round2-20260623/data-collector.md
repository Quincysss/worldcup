# J组第二轮复盘 - 数据采集线程产物

> status: partial_thread_fallback
> owner_thread: 数据采集 agent
> fallback_writer: main_thread
> updated_at: 2026-06-23T16:45:00+08:00
> reason: 数据采集线程已参与检索与校验，但在删骨架后未及时重建目标文件；主线程按已核验来源补最小事实文件，供红队继续审查。

## 任务范围

- 阿根廷 2-0 奥地利
- 约旦 1-2 阿尔及利亚

## 已核验最小事实

| 比赛 | 赛果 | 半场 | 关键事件 | 赛果方向 |
| --- | --- | --- | --- | --- |
| 阿根廷 vs 奥地利 | 阿根廷 2-0 奥地利 | 阿根廷 1-0 奥地利 | 梅西上下半场各入一球；梅西早段点球未进；奥地利后段压上未能兑现 | 阿根廷胜，小于2.5球 |
| 约旦 vs 阿尔及利亚 | 约旦 1-2 阿尔及利亚 | 约旦 1-0 阿尔及利亚 | 拉什丹36分钟破门；本布阿利69分钟扳平；古伊里82分钟反超 | 阿尔及利亚胜，大于2.5球 |

## 事件链

### 阿根廷 2-0 奥地利

- 进球：梅西 38分钟；梅西 90+5分钟。
- 点球：梅西 9分钟点球未进。
- 牌：波施 40分钟黄牌；梅迪纳 76分钟黄牌；帕雷德斯 90+2分钟黄牌。
- 阵型口径：本地复盘记录阿根廷 `4-4-2`，奥地利 `4-2-3-1`；战术线程认为阿根廷实际存在 `4-3-3/4-4-2` 切换，需等待官方首发/站位二次锁定。
- 伤停：本轮未见可直接确认的新伤退；仍需等官方赛后医疗/停赛更新。

### 约旦 1-2 阿尔及利亚

- 进球：尼扎尔·拉什丹 36分钟；纳迪尔·本布阿利 69分钟；阿明·古伊里 82分钟。
- 助攻链：塔马里参与约旦进球链；马赫雷斯参与阿尔及利亚扳平链。官方助攻口径待二次锁定。
- 牌：泽鲁基 44分钟黄牌并半场被换下；阿布·达哈卜 64分钟黄牌。
- 阵型口径：约旦 `3-4-3/5-4-1`，阿尔及利亚 `4-3-3`。
- 伤停：未见本轮明确新增伤退；需继续跟踪停赛累计和末轮轮换。

## canonical 文件状态

| 文件 | 状态 | 备注 |
| --- | --- | --- |
| `队伍/阿根廷/成员表.md` | exists | 已存在第二轮赛后痕迹，仍需人工复核个别事件分钟与球员评分 |
| `队伍/奥地利/成员表.md` | exists | 已存在第二轮赛后痕迹，需补强末轮可用性/停赛风险 |
| `队伍/约旦/成员表.md` | exists | 已存在第二轮赛后痕迹，需复核塔马里、拉什丹等评分 |
| `队伍/阿尔及利亚/成员表.md` | exists | 已存在第二轮赛后痕迹，需复核本布阿利、古伊里、马赫雷斯评分 |
| `data/outputs/player_state/argentina-player-state.json` | json_ok | 可解析 |
| `data/outputs/player_state/austria-player-state.json` | json_ok | 可解析 |
| `data/outputs/player_state/jordan-player-state.json` | json_ok | 可解析 |
| `data/outputs/player_state/algeria-player-state.json` | json_ok | 可解析 |

## source_log

- FIFA match report: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/argentina-austria-match-report-highlights`
- FIFA match report: `https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/jordan-algeria-match-report-highlights`
- Guardian Argentina-Austria report/live: `https://www.theguardian.com/football/2026/jun/22/argentina-austria-world-cup-group-j-match-report`
- Guardian Jordan-Algeria live/report: `https://www.theguardian.com/football/live/2026/jun/23/fifa-world-cup-2026-live-jordan-v-algeria-updates-jor-v-alg-group-j-match-score-latest`
- FOX boxscore pages and beIN/ESPN match pages were used as secondary cross-checks; full minute-by-minute event stream still needs official boxscore lock.

## gaps

- 官方完整首发、替补出场分钟、全量黄牌/犯规/射门数据尚未统一成结构化事件流。
- 阿根廷第一球与约旦/阿尔及利亚两条助攻链的官方助攻口径仍需二次锁定。
- 赔率只完成方向性引用，未形成 bookmaker、odds、capture_time 的结构化表。
- 数据采集线程本体仍应在恢复后覆盖/补全本文件，但不得删除 `partial_thread_fallback` 事实记录。

## 校验

- file_written: yes
- status: partial_thread_fallback
- json_validation: postmortem 与四队 player_state 均 `json_ok`
