# L组成员表建设状态

updated_at: 2026-06-21T00:45:00+08:00
phase: team_profile
scope: L组成员表、roster、player_state 建设；不做比赛预测、出线预测或竞彩建议。

## 球队

| 球队 | slug | 线程 | 状态 | 说明 |
| --- | --- | --- | --- | --- |
| 英格兰 | england | `019ededd-afc1-7e50-a791-f4a4571a59bc` | postmatch_updated | 已补 `英格兰 4-2 克罗地亚` 单场复盘，并同步英格兰成员表/player_state/roster |
| 加纳 | ghana | `019edede-d910-7301-a501-dc0517b1c2d4` | completed_core_partial | 引用已有 `加纳 1-0 巴拿马` 复盘，已补加纳成员表/player_state/roster；完整分钟与评分缺口保留为 partial |
| 巴拿马 | panama | `019edb8e-e57d-71c1-8b2f-ddcf57c48878` | complete_current_stage | 引用已有 `加纳 1-0 巴拿马` 复盘，已补巴拿马成员表/player_state/roster |
| 克罗地亚 | croatia | `019edede-0e20-7382-9419-d6250c64ea5c` | complete_current_stage | 已引用 `英格兰 4-2 克罗地亚` 单场复盘与外源，补克罗地亚成员表/player_state/roster |

## 本地基线

- 四队正式球队档案目录存在：英格兰、克罗地亚、加纳、巴拿马。
- 已有复盘：`比赛\已完成比赛\小组赛\L组\2026-06-17_加纳_1-0_巴拿马_复盘.md`。
- 已补复盘：`比赛\已完成比赛\小组赛\L组\2026-06-17_英格兰_4-2_克罗地亚_复盘.md`。
- 已有赛前上下文：`比赛\未开始比赛\小组赛\L组\2026-06-17_英格兰_vs_克罗地亚_预测.md`、`比赛\未开始比赛\小组赛\L组\2026-06-17_加纳_vs_巴拿马_预测.md`、`比赛\未开始比赛\小组赛\L组\L组第一轮预测与赔率汇总.md`。

## 验收要求

- 每队 roster/player_state 均为 26/26。
- `chinese_name`、`club_name_cn`、球员级 `source_log` 26/26 非空。
- Markdown 成员表完整展示 26 人。
- 已同步或明确标注第一轮首发、分钟、换人、进球、助攻、牌、伤停、评分或评分缺口说明、`form_status_1_5`。
- `player_state_update_status` 必须为 `updated`、`partial` 或 `blocked`。
- JSON 可解析；Markdown/JSON 无常见编码异常、无残留标记。
- 只做事实采集和标准化，不做预测或投注建议。

## 巴拿马
- status: complete_current_stage
- owner: worldcup-data-collector-panama-current-thread
- updated_at: 2026-06-21T00:45:00+08:00
- outputs:
  - data\packets\rosters\panama-roster.json
  - data\outputs\player_state\panama-player-state.json
  - 队伍\巴拿马\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无残留标记。
- notes: 仅处理巴拿马；未进入英格兰、克罗地亚、加纳。首轮加纳 1-0 巴拿马的首发、分钟、换人、黄牌和失球已按 FotMob 事件流同步；数字评分表未稳定提取，已逐人写评分缺口说明。
## 英格兰
- status: postmatch_updated
- owner: worldcup-data-collector-england
- updated_at: 2026-06-21T01:18:00+08:00
- outputs:
  - 比赛\已完成比赛\小组赛\L组\2026-06-17_英格兰_4-2_克罗地亚_复盘.md
  - data\packets\rosters\england-roster.json
  - data\outputs\player_state\england-player-state.json
  - 队伍\英格兰\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无残留标记。
- notes: 仅处理英格兰侧球员状态；克罗地亚本队 player_state/成员表由后续克罗地亚线程负责。英格兰牌面、caps/goals 和部分身体数据仍保留为后续官方数据复核项。

## 加纳
- status: completed_core_partial
- owner: worldcup-data-collector-ghana
- updated_at: 2026-06-20T23:55:00+08:00
- outputs:
  - data\packets\rosters\ghana-roster.json
  - data\outputs\player_state\ghana-player-state.json
  - 队伍\加纳\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - form_status_1_5 数值为 26/26。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: partial。
  - 编码扫描通过且无残留标记。
- gaps: Guardian 可确认首发、关键换人和进球助攻，但完整官方逐人分钟、全部换人表与同源评分未取得；未进入英格兰、克罗地亚、巴拿马资料补齐。

## 克罗地亚
- status: complete_current_stage
- owner: worldcup-data-collector-croatia
- updated_at: 2026-06-21T00:09:43+08:00
- player_state_update_status: updated
- outputs:
  - data\packets\rosters\croatia-roster.json
  - data\outputs\player_state\croatia-player-state.json
  - 队伍\克罗地亚\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - form_status_1_5 数值为 26/26。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无残留标记。
- gaps:
  - 未找到完整官方黄红牌表；Guardian/本地复盘未记录克罗地亚球员牌面，逐人牌数按0写入并保留复核说明。
  - 身高、体重、惯用脚、逐人国家队caps/goals未在本轮以同源官方资料核验，保留null。
- notes: 仅处理克罗地亚；未进入英格兰、加纳、巴拿马。英格兰线程主责单场复盘，本线程只引用复盘并更新克罗地亚本队文件。

