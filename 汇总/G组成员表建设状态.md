# G组成员表建设状态

updated_at: 2026-06-20T21:52:16+08:00

## 启动条件

- status: in_progress
- 说明：G组按并行线程分队采集；本文件只记录成员表建设进度，不含预测或竞彩建议。

## 并行任务预分配

| 球队 | 当前状态 | 备注 |
| --- | --- | --- |
| 比利时 | in_progress | 不由本线程处理 |
| 埃及 | complete | 本线程已完成26人 roster/player_state/成员表 |
| 伊朗 | in_progress | 不由本线程处理 |
| 新西兰 | in_progress | 不由本线程处理 |

## 埃及

- status: complete
- owner: worldcup-data-collector-egypt
- updated_at: 2026-06-20T21:52:16+08:00
- outputs:
  - data\packets\rosters\egypt-roster.json
  - data\outputs\player_state\egypt-player-state.json
  - 队伍\埃及\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码与占位残留扫描通过。
- notes: 仅处理埃及；未进入比利时、伊朗、新西兰资料补齐。

## 伊朗

- status: local_passed
- updated_at: 2026-06-20T21:55:32+08:00
- files:
  - data\packets\rosters\iran-roster.json
  - data\outputs\player_state\iran-player-state.json
  - 队伍\伊朗\成员表.md
- validation: local_passed
- player_state_update_status: updated
- notes: 26人必填字段已补齐；首轮2-2新西兰的首发、分钟、进球、助攻、牌和赛中身体事件已同步；身高/体重/惯用脚与完整评分保留为缺口。

