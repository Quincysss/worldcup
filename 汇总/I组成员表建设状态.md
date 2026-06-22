# I组成员表建设状态

updated_at: 2026-06-20T22:45:00+08:00

## 启动条件
- phase: team_profile
- group: I组
- status: in_progress
- owner: main-control-thread
- 说明：I组按并行线程分队采集；本文件只记录成员表、roster 与 player_state 建设进度，不含比分预测或竞彩建议。

## 并行任务分配
| 球队 | 当前状态 | 目标产物 |
| --- | --- | --- |
| 挪威 | complete | norway-roster.json / norway-player-state.json / 队伍\挪威\成员表.md |
| 法国 | complete | france-roster.json / france-player-state.json / 队伍\法国\成员表.md |
| 塞内加尔 | complete | senegal-roster.json / senegal-player-state.json / 队伍\塞内加尔\成员表.md |
| 伊拉克 | dispatched | iraq-roster.json / iraq-player-state.json / 队伍\伊拉克\成员表.md |

## 挪威
- status: complete
- owner: worldcup-data-collector-norway
- updated_at: 2026-06-20T22:45:00+08:00
- outputs:
  - data\packets\rosters\norway-roster.json
  - data\outputs\player_state\norway-player-state.json
  - 队伍\挪威\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无占位残留。
- notes: 仅处理挪威；未进入法国、塞内加尔、伊拉克资料补齐。

## 法国
- status: complete
- owner: worldcup-data-collector-france
- updated_at: 2026-06-20T22:24:21+08:00
- outputs:
  - data\packets\rosters\france-roster.json
  - data\outputs\player_state\france-player-state.json
  - 队伍\法国\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无占位残留。
- notes: 仅处理法国；未进入挪威、塞内加尔、伊拉克资料补齐。

## 合并备注
- 如其他并行线程同时更新本文件，请由主线程按球队段落合并。

## 塞内加尔

- status: complete
- updated_at: 2026-06-20T22:45:00+08:00
- player_state_update_status: updated
- outputs:
  - data\packets\rosters\senegal-roster.json
  - data\outputs\player_state\senegal-player-state.json
  - 队伍\塞内加尔\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无占位残留。
- notes: 已完成26人成员表、首轮法国3-1塞内加尔球员状态同步；不含预测或竞彩建议。


