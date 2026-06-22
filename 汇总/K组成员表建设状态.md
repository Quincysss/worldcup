# K组成员表建设状态

updated_at: 2026-06-20T23:59:30+08:00

## 启动条件
- phase: team_profile
- group: K组
- status: postmatch_completion_dispatched
- owner: main-control-thread
- 说明：K组按并行线程分队采集；本文件只记录成员表、roster 与 player_state 建设进度，不含比分预测、出线预测或竞彩建议。

## 第一轮复盘与球员状态补齐派发
- dispatched_at: 2026-06-20T24:05:00+08:00
- Trigger: 用户要求“调用对应的线程补充第一轮复盘，然后补充各队信息”。
- Match review ownership:
  - 葡萄牙线程主责：`比赛\已完成比赛\小组赛\K组\2026-06-17_葡萄牙_1-1_刚果金_复盘.md`
  - 乌兹别克斯坦线程主责：`比赛\已完成比赛\小组赛\K组\2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md`
- Team-state ownership:
  - 葡萄牙线程更新葡萄牙 roster/player_state/成员表。
  - 刚果金线程更新刚果金 roster/player_state/成员表，并引用葡萄牙线程单场复盘或自行核验同场事实。
  - 乌兹别克斯坦线程更新乌兹别克斯坦 roster/player_state/成员表。
  - 哥伦比亚线程更新哥伦比亚 roster/player_state/成员表，并引用乌兹别克斯坦线程单场复盘或自行核验同场事实。
- Completion target:
  - 两场单场复盘落盘。
  - 四队 `player_state_update_status` 从 `partial` 尽量提升到 `updated`；若仍缺官方逐人分钟/评分，必须保留 `partial` 并列清缺口。
  - 后续由主线程或指定线程补 `K组第一轮复盘.md` 轮次汇总。

## 本地基线
- 已存在四队正式球队档案：
  - 队伍\葡萄牙\正式球队档案.md
  - 队伍\刚果金\正式球队档案.md
  - 队伍\乌兹别克斯坦\正式球队档案.md
  - 队伍\哥伦比亚\正式球队档案.md
- 已存在 K组第一轮赛前预测文件：
  - 比赛\未开始比赛\小组赛\K组\2026-06-17_葡萄牙_vs_刚果金_预测.md
  - 比赛\未开始比赛\小组赛\K组\2026-06-17_乌兹别克斯坦_vs_哥伦比亚_预测.md
  - 比赛\未开始比赛\小组赛\K组\K组第一轮预测与赔率汇总.md
- 本地暂未发现 K组第一轮单场复盘文件。审计线程此前记录缺口：
  - 葡萄牙 1-1 刚果金
  - 乌兹别克斯坦 1-3 哥伦比亚
- 因此成员表线程必须核验第一轮赛后事实；如无法可靠补齐首发、分钟、事件和评分，不得伪装为完整 `updated`，应写 `partial` 并列明缺口。

## 并行任务分配
| 球队 | 当前状态 | 线程 | 目标产物 |
| --- | --- | --- | --- |
| 葡萄牙 | complete_core_partial_state | 019ededd-afc1-7e50-a791-f4a4571a59bc | portugal-roster.json / portugal-player-state.json / 队伍\葡萄牙\成员表.md |
| 刚果金 | complete_core_partial_state | 019edede-0e20-7382-9419-d6250c64ea5c | dr-congo-roster.json / dr-congo-player-state.json / 队伍\刚果金\成员表.md |
| 乌兹别克斯坦 | complete_core_partial_state | 019edede-7507-7ed0-80cf-b55d4c4b6efa | uzbekistan-roster.json / uzbekistan-player-state.json / 队伍\乌兹别克斯坦\成员表.md |
| 哥伦比亚 | complete_current_stage | 019edb8e-e57d-71c1-8b2f-ddcf57c48878 | colombia-roster.json / colombia-player-state.json / 队伍\哥伦比亚\成员表.md；首轮本队状态已补齐，复盘主责为乌兹别克斯坦线程 |

## 验收标准
- roster/player_state 均 26/26。
- `chinese_name`、`club_name_cn`、球员级 `source_log` 100% 非空。
- Markdown 展示完整 26 人中文成员表。
- 已尽力核验并同步第一轮比赛表现、阵型、首发/分钟/换人/牌/进球/助攻、伤停与 `form_status_1_5`。
- `player_state_update_status` 必须为 `updated`、`partial` 或 `blocked`；缺完整赛后来源时只允许 `partial/blocked`。
- 无编码异常、无残留标记。
- 只做事实采集和标准化，不做预测、不做竞彩建议。

## 葡萄牙
- status: postmatch_updated
- owner: worldcup-data-collector-portugal
- updated_at: 2026-06-20T23:59:30+08:00
- outputs:
  - 比赛\已完成比赛\小组赛\K组\2026-06-17_葡萄牙_1-1_刚果金_复盘.md
  - data\packets\rosters\portugal-roster.json
  - data\outputs\player_state\portugal-player-state.json
  - 队伍\葡萄牙\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无残留标记。
- notes: 仅处理葡萄牙侧球员状态；刚果金本队 player_state/成员表由刚果金线程负责。评分未找到稳定同源数据，已逐人写入 rating=null 与缺口说明。
## 哥伦比亚
- status: complete_current_stage
- owner: worldcup-data-collector-colombia-current-thread
- updated_at: 2026-06-20T23:59:30+08:00
- outputs:
  - data\packets\rosters\colombia-roster.json
  - data\outputs\player_state\colombia-player-state.json
  - 队伍\哥伦比亚\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无残留标记。
- notes: 仅处理哥伦比亚；未进入葡萄牙、刚果金、乌兹别克斯坦。本队首发、事件流、换人、进球、助攻、Mojica黄牌、首发评分和替补评分缺口说明已补齐；单场复盘主责为乌兹别克斯坦线程。

## 刚果金
- status: complete_core_partial_state
- owner: worldcup-data-collector-dr-congo
- updated_at: 2026-06-20T23:59:30+08:00
- outputs:
  - data\packets\rosters\dr-congo-roster.json
  - data\outputs\player_state\dr-congo-player-state.json
  - 队伍\刚果金\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无残留标记。
- gaps:
  - 葡萄牙线程尚未落盘本场复盘；复盘主责仍为葡萄牙线程，刚果金线程未创建或覆盖单场复盘。
  - 刚果金26人首轮 started/minutes/sub_on/sub_off/goals/assists/cards/rating_note/form_status 已补齐；逐人评分未取得官方或同源数据商评分，rating 保持 null 并逐人说明。
  - Guardian现场文字未给出官方全量牌表；刚果金球员牌面字段已保留复核说明。
- notes: 仅处理刚果金；未进入葡萄牙、乌兹别克斯坦、哥伦比亚。基于Guardian现场文字补齐刚果金本队球员状态；单场复盘主责为葡萄牙线程。

## 乌兹别克斯坦
- status: postmatch_partial_synced
- owner: worldcup-data-collector-uzbekistan-current-thread
- updated_at: 2026-06-20T23:59:30+08:00
- player_state_update_status: partial
- match_review:
  - 比赛\已完成比赛\小组赛\K组\2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md
- outputs:
  - data\packets\rosters\uzbekistan-roster.json
  - data\outputs\player_state\uzbekistan-player-state.json
  - 队伍\乌兹别克斯坦\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - 单场复盘已落盘。
  - player_state_update_status: partial。
  - 编码扫描通过且无残留标记。
- gaps:
  - 已用 Guardian 核验乌兹别克斯坦 1-3 哥伦比亚、双方首发、阵型、进球、乌兹别克斯坦换人和可见黄牌。
  - 尚缺官方/数据商逐人评分、全量技术统计、完整官方牌表、完整身价、惯用脚、体重和多数 caps/goals 同源核验。
- notes: 仅处理乌兹别克斯坦与本场复盘主责；未进入葡萄牙、刚果金，也未更新哥伦比亚本队成员表。The Sun最终名单与FourFourTwo March selection存在差异，最终26人按The Sun，冲突来源保留。
