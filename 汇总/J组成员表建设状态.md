# J组成员表建设状态

updated_at: 2026-06-20T23:45:00+08:00

## 启动条件
- phase: team_profile
- group: J组
- status: complete_current_stage
- owner: main-control-thread
- 说明：J组按并行线程分队采集；本文件只记录成员表、roster 与 player_state 建设进度，不含比分预测、出线预测或竞彩建议。

## 并行任务分配
| 球队 | 当前状态 | 目标产物 |
| --- | --- | --- |
| 阿根廷 | complete | argentina-roster.json / argentina-player-state.json / 队伍\阿根廷\成员表.md |
| 阿尔及利亚 | complete | algeria-roster.json / algeria-player-state.json / 队伍\阿尔及利亚\成员表.md |
| 奥地利 | complete | austria-roster.json / austria-player-state.json / 队伍\奥地利\成员表.md |
| 约旦 | complete | jordan-roster.json / jordan-player-state.json / 队伍\约旦\成员表.md |

## 阿根廷
- status: complete
- owner: worldcup-data-collector-argentina
- updated_at: 2026-06-20T23:35:00+08:00
- outputs:
  - data\packets\rosters\argentina-roster.json
  - data\outputs\player_state\argentina-player-state.json
  - 队伍\阿根廷\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无占位残留。
- notes: 仅处理阿根廷；未进入阿尔及利亚、奥地利、约旦资料补齐。阵容冲突、评分缺口、caps/goals 缺口已写入 gaps_and_conflicts。

## 阿尔及利亚
- status: complete
- owner: worldcup-data-collector-algeria
- updated_at: 2026-06-20T22:39:33+08:00
- outputs:
  - data\packets\rosters\algeria-roster.json
  - data\outputs\player_state\algeria-player-state.json
  - 队伍\阿尔及利亚\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无占位残留。
- notes: 仅处理阿尔及利亚；未进入阿根廷、奥地利、约旦资料补齐。

## 奥地利
- status: complete
- owner: worldcup-data-collector-austria
- updated_at: 2026-06-20T22:38:14+08:00
- outputs:
  - data\packets\rosters\austria-roster.json
  - data\outputs\player_state\austria-player-state.json
  - 队伍\奥地利\成员表.md
- validation:
  - JSON 可解析。
  - roster 为 data.players 结构，player_state 为 players 结构，均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无占位残留。
- notes: 仅处理奥地利；未进入阿根廷、阿尔及利亚、约旦资料补齐。身高、体重、惯用脚和完整评分缺口已写入 gaps_and_conflicts。

## 约旦
- status: complete
- owner: worldcup-data-collector-jordan
- updated_at: 2026-06-20T23:25:00+08:00
- outputs:
  - data\packets\rosters\jordan-roster.json
  - data\outputs\player_state\jordan-player-state.json
  - 队伍\约旦\成员表.md
- validation:
  - JSON 可解析。
  - roster/player_state 均为 26/26。
  - chinese_name、club_name_cn、球员级 source_log 均为 26/26 非空。
  - Markdown 26 人中文成员表已落盘。
  - player_state_update_status: updated。
  - 编码扫描通过且无占位残留。
- notes: 仅处理约旦；未进入阿根廷、阿尔及利亚、奥地利资料补齐。身高、惯用脚、体重、球员身价等不可核验字段已保留为 null/uncertain。

## 主线程合并说明
- 本文件由主线程在四个并行线程收口后合并，修复并行写入造成的段落缺失和路径控制字符。
- J组当前阶段只完成成员表、roster 与 player_state 建设；后续预测或竞彩必须由用户明确触发。
