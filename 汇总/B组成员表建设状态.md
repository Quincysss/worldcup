# B组成员表建设状态

updated_at: 2026-06-21T00:35:00+08:00
phase: team_profile
scope: B组成员表、roster 与 player_state 补齐
owner: 主线程调度；四条补充信息线程并行执行

## 工作边界

- 本阶段只补齐加拿大、波黑、卡塔尔、瑞士四队成员信息，不做新增比分预测、出线预测或竞彩建议。
- 每队必须输出标准三件套：
  - `data\packets\rosters\{team-slug}-roster.json`
  - `data\outputs\player_state\{team-slug}-player-state.json`
  - `队伍\{球队中文名}\成员表.md`
- 必须读取对应正式球队档案、B组第一/第二轮预测上下文、B组已完成比赛复盘；预测文件只作赛前预期对照，不采纳预测结论。
- 阵容、伤停、身价、首轮/第二轮出场、评分等时效字段必须写 `source_log`、`captured_at`、`source_status`。
- 若官方完整逐人分钟、评分或同源技术统计缺失，保留 `null` 或 `uncertain`，并在 `gaps_and_conflicts` 说明，不伪造。

## 并行派发表

| 球队 | slug | 线程 | 状态 | 关键本地输入 | 目标文件 |
| --- | --- | --- | --- | --- | --- |
| 加拿大 | canada | `019ededd-afc1-7e50-a791-f4a4571a59bc` | partial_current_stage | `2026-06-12_加拿大_1-1_波黑_复盘.md`、`2026-06-18_加拿大_6-0_卡塔尔_复盘.md` | `canada-roster.json` / `canada-player-state.json` / `队伍\加拿大\成员表.md` |
| 波黑 | bosnia-herzegovina | `019edede-d910-7301-a501-dc0517b1c2d4` | completed_core_partial | `2026-06-12_加拿大_1-1_波黑_复盘.md`、`2026-06-18_瑞士_4-1_波黑_复盘.md` | `bosnia-herzegovina-roster.json` / `bosnia-herzegovina-player-state.json` / `队伍\波黑\成员表.md` |
| 卡塔尔 | qatar | `019edb8e-e57d-71c1-8b2f-ddcf57c48878` | dispatched | `2026-06-13_卡塔尔_1-1_瑞士_复盘.md`、`2026-06-18_加拿大_6-0_卡塔尔_复盘.md` | `qatar-roster.json` / `qatar-player-state.json` / `队伍\卡塔尔\成员表.md` |
| 瑞士 | switzerland | `019edede-7507-7ed0-80cf-b55d4c4b6efa` | dispatched | `2026-06-13_卡塔尔_1-1_瑞士_复盘.md`、`2026-06-18_瑞士_4-1_波黑_复盘.md` | `switzerland-roster.json` / `switzerland-player-state.json` / `队伍\瑞士\成员表.md` |

## 验收标准

- roster/player_state 均 26/26。
- `chinese_name`、`club_name_cn`、球员级 `source_log` 26/26 非空。
- Markdown 展示完整 26 人中文成员表。
- 每队同步第一轮与第二轮已赛事实：首发、分钟、换人、进球、助攻、牌、伤停、评分或评分缺口、`form_status_1_5`。
- `player_state_update_status` 必须为 `updated`、`partial` 或 `blocked`，且原因清楚。
- JSON 可解析；Markdown/JSON 无常见编码异常和临时残留。


## 加拿大进展

updated_at: 2026-06-21T00:35:00+08:00

- 三件套已生成：`canada-roster.json` / `canada-player-state.json` / `队伍\加拿大\成员表.md`。
- 26 人名单、中文名、俱乐部中文名和球员级 source_log 已补齐。
- `player_state_update_status=partial`：首轮/第二轮完整逐人分钟、评分、助攻和牌仍需官方技术报告或稳定 match centre 补齐；已同步 Davies 首轮缺阵、David 戴帽、Larin/Saliba 进球和 Kone 伤情。
## 卡塔尔
- status: partial_current_stage
- owner: worldcup-data-collector-qatar-current-thread
- updated_at: 2026-06-21T00:35:00+08:00
- outputs:
  - data\packets\rosters\qatar-roster.json
  - data\outputs\player_state\qatar-player-state.json
  - 队伍\卡塔尔\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: partial。
  - 编码扫描通过且无临时残留。
- gaps:
  - 两轮完整换人和同源逐人评分仍缺。
  - Homam Ahmed、Assim Madibo 第二轮红牌已标 suspended/uncertain/high，停赛场次需官方纪律公告复核。
- notes: 仅处理卡塔尔；未进入加拿大、波黑、瑞士；不做预测或投注建议。

## 波黑
- status: completed_core_partial
- owner: worldcup-data-collector-bosnia-herzegovina
- updated_at: 2026-06-21T00:35:00+08:00
- outputs:
  - data\packets\rosters\bosnia-herzegovina-roster.json
  - data\outputs\player_state\bosnia-herzegovina-player-state.json
  - 队伍\波黑\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - form_status_1_5 数值为 26/26。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: partial。
  - 编码扫描通过且无临时残留。
- gaps:
  - 最终名单、第二轮首发/红牌/进球等关键事实已同步。
  - 两轮完整逐人分钟、全部换人表与同源评分未取得，保留 partial。
- notes: 仅处理波黑；未进入加拿大、卡塔尔、瑞士；不做预测或投注建议。

## 瑞士
- status: partial_current_stage
- owner: worldcup-data-collector-switzerland-current-thread
- updated_at: 2026-06-21T00:35:00+08:00
- player_state_update_status: partial
- outputs:
  - data\packets\rosters\switzerland-roster.json
  - data\outputs\player_state\switzerland-player-state.json
  - 队伍\瑞士\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: partial。
  - 编码扫描通过且无临时残留。
- gaps:
  - 已核验并同步第一轮卡塔尔1-1瑞士、第二轮瑞士4-1波黑的瑞士首发、分钟、换人、进球、助攻线索、牌和评分缺口。
  - 尚缺官方/数据商逐人评分、全量技术统计、部分替换对象、完整身价、惯用脚、身高/体重和多数 caps/goals 同源核验。
  - 第一轮卡塔尔扳平球存在Khoukhi进球与Muheim乌龙口径冲突，已保留conflicting。
- notes: 仅处理瑞士；未进入加拿大、波黑、卡塔尔。不做预测或投注建议。

