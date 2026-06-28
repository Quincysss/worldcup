# J组第三轮赛后数据采集与成员表更新

- 采集身份：worldcup-data-collector
- captured_at：2026-06-28T20:56:26+08:00
- 范围：阿尔及利亚 3-3 奥地利；约旦 1-3 阿根廷
- player_state_update_status：partial
- 边界：只写事实、来源、缺口和成员表/player_state回灌状态；不做预测或投注建议。

## 赛果与关键事件

| 比赛 | 赛果 | 关键事件 | 来源状态 |
| --- | --- | --- | --- |
| 阿尔及利亚 vs 奥地利 | 3-3 | Arnautovic 28'；Belghali 45'；Sabitzer 54'；Mahrez 60'、90+4'；Kalajdzic 90+5' | Guardian确认比分/首发/主要事件；助攻和全量换人仍partial |
| 约旦 vs 阿根廷 | 1-3 | Lo Celso 19'任意球；Lautaro Martinez 31'点球；Al-Taamari 55'；Messi 80'任意球 | Guardian确认比分/首发/换人/主要牌面 |

## 成员表与player_state回灌

| 球队 | player_state | 成员表 | roster动态摘要 | 状态 |
| --- | --- | --- | --- | --- |
| 阿尔及利亚 | data/outputs/player_state/algeria-player-state.json | 队伍/阿尔及利亚/成员表.md | data/packets/rosters/algeria-roster.json | 26/26追加本场内部评分，partial_source_limited |
| 奥地利 | data/outputs/player_state/austria-player-state.json | 队伍/奥地利/成员表.md | data/packets/rosters/austria-roster.json | 26/26追加本场内部评分，partial_source_limited |
| 约旦 | data/outputs/player_state/jordan-player-state.json | 队伍/约旦/成员表.md | data/packets/rosters/jordan-roster.json | 26/26追加本场内部评分，partial_source_limited |
| 阿根廷 | data/outputs/player_state/argentina-player-state.json | 队伍/阿根廷/成员表.md | data/packets/rosters/argentina-roster.json | 26/26追加本场内部评分，partial_source_limited |

## 伤停/停赛观察

- 奥地利：David Alaba 62分钟被换下，现场源提示可能有体能/健康担忧；Marko Arnautovic 17分钟一度跛行但继续比赛。
- 约旦：Husam Abu Dahab 89分钟担架离场，下一场/后续档案需复核伤情。
- 约旦：Mohannad Abu Taha 与 Yazan Al-Arab 吃黄牌，累计纪律风险需官方牌表闭合。
- 阿尔及利亚、阿根廷：当前可靠来源未发现新增停赛，但仍需官方完整牌表确认。

## 来源

- Guardian live：Algeria 3-3 Austria，首发、比分、主要事件、部分换人。
- Guardian live：Jordan 1-3 Argentina，首发、比分、换人、主要牌面。
- Times of India：两场赛果与晋级背景交叉确认。
- Cadena SER：两场赛果、进球时间线交叉确认。

## 缺口

- FIFA官方完整事件表未取得。
- 阿尔及利亚-奥地利全量换人分钟和部分助攻未闭合。
- 四队均未取得可靠同场同源外部逐人评分，已按项目口径保留 `external_rating=null` 并写入内部评分。
- 因上述缺口，本轮数据采集状态为 `partial_source_limited`，不是完整官方版。
