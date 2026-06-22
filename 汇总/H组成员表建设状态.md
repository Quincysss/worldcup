# H组成员表建设状态

updated_at: 2026-06-20T22:11:28+08:00

## 启动条件

- phase: team_profile
- group: H组
- status: in_progress
- owner: main-control-thread
- 说明：H组按并行线程分队采集；本文件只记录成员表、roster 与 player_state 建设进度，不含比分预测或竞彩建议。

## 并行任务分配

| 球队 | 当前状态 | 目标产物 |
| --- | --- | --- |
| 西班牙 | dispatched | spain-roster.json / spain-player-state.json / 队伍\西班牙\成员表.md |
| 沙特 | complete | saudi-arabia-roster.json / saudi-arabia-player-state.json / 队伍\沙特\成员表.md |
| 乌拉圭 | dispatched | uruguay-roster.json / uruguay-player-state.json / 队伍\乌拉圭\成员表.md |
| 佛得角 | dispatched | cape-verde-roster.json / cape-verde-player-state.json / 队伍\佛得角\成员表.md |

## 本地输入

- 队伍\西班牙\正式球队档案.md
- 队伍\沙特\正式球队档案.md
- 队伍\乌拉圭\正式球队档案.md
- 队伍\佛得角\正式球队档案.md
- 比赛\已完成比赛\小组赛\H组\2026-06-15_沙特_1-1_乌拉圭_复盘.md
- 比赛\已完成比赛\小组赛\H组\2026-06-15_西班牙_0-0_佛得角_复盘.md
- 比赛\已完成比赛\小组赛\H组\H组第一轮复盘.md
- 比赛\未开始比赛\小组赛\H组\2026-06-21_佛得角_vs_乌拉圭_预测.md
- 比赛\未开始比赛\小组赛\H组\2026-06-21_西班牙_vs_沙特_预测.md

## 沙特

- status: complete
- owner: worldcup-data-collector-saudi-arabia
- updated_at: 2026-06-20T22:11:28+08:00
- outputs:
  - data\packets\rosters\saudi-arabia-roster.json
  - data\outputs\player_state\saudi-arabia-player-state.json
  - 队伍\沙特\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码与占位残留扫描通过。
- notes: 仅处理沙特；未进入西班牙、乌拉圭、佛得角资料补齐。Guardian记录90+3前沙特三换但未列姓名，已写入 gaps_and_conflicts。

## 验收口径

- 每队 roster/player_state 均覆盖 26 人。
- 球员中文名、效力俱乐部中文名、擅长位置、惯用脚、身高、年龄、身价、伤停、停赛、分钟风险、近期状态、评分、首轮表现字段尽量补齐。
- 必须包含教练信息、球队打法风格、首轮比赛风格、首轮阵型、第二轮前可用性备注。
- orm_status_1_5 为 0-5 模型输入值，必须给短原因；缺可靠来源时标记 
ull/uncertain，不得编造。
- 每个时效字段必须有 source_log 与 captured_at。
- player_state_update_status 必须为 updated、partial 或 locked；完整完成只能写 updated。
- JSON 必须可解析；Markdown/JSON 必须 UTF-8，编码扫描通过且无占位残留。