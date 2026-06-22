---
phase: roster_staff_table
group: A
status: complete_current_stage
created_at: 2026-06-18T10:15:47.8960396+08:00
updated_at: 2026-06-19T15:35:00+08:00
owner: worldcup-data-collector
scope: A组成员表建设状态跟踪；只做数据采集与标准化，不做预测或投注建议。
missing_fields:
  - round2_dynamic_refresh
source_log:
  - E:\worldcup\data\packets\rosters\mexico-roster.json
  - E:\worldcup\data\outputs\player_state\mexico-player-state.json
  - E:\worldcup\data\packets\rosters\south-korea-roster.json
  - E:\worldcup\data\outputs\player_state\south-korea-player-state.json
  - E:\worldcup\data\packets\rosters\south-africa-roster.json
  - E:\worldcup\data\outputs\player_state\south-africa-player-state.json
  - E:\worldcup\data\packets\rosters\czechia-roster.json
  - E:\worldcup\data\outputs\player_state\czechia-player-state.json
---

# A组成员表建设状态

## 当前范围确认

- 本地项目 A 组：墨西哥、南非、韩国、捷克。

## 当前进度

- 当前状态：A 组四队成员表返工当前阶段完成；后续仅剩第二轮/临场动态刷新。
- 墨西哥：complete_current_stage。26/26 球员中文名、俱乐部中文名、球员级 source_log 已补齐；roster.json 与 player-state.json 已同步完整 26 人；Markdown 展示完整 26 人中文成员表。
- 韩国：complete_current_stage。26/26 球员中文名、韩文名、俱乐部中文名、球员级 source_log 已补齐；roster.json 与 player-state.json 已同步完整 26 人；Markdown 展示完整 26 人中文成员表。
- 南非：complete_current_stage。26/26 球员中文名、俱乐部中文名、球员级 source_log 已补齐；roster.json 与 player-state.json 已同步完整 26 人；Markdown 展示完整 26 人中文成员表。
- 捷克：complete_current_stage。26/26 球员中文名、捷克语/本名、俱乐部中文名、球员级 source_log 已补齐；roster.json 与 player-state.json 已同步完整 26 人；Markdown 展示完整 26 人中文成员表；Koubek/Hašek 教练姓名冲突已复核并保留来源说明。

## 韩国剩余缺口

- 官方完整工作人员名单仍缺，门将教练、体能、医疗、分析岗位在可访问官方源中未完整确认。
- 第二轮 T-75m 官方首发、赛前训练伤停和纪律公告需临场刷新。
- 部分替补换人分钟和未登场球员评分仍待 FIFA Match Centre 最终事件表复核。

## 南非剩余缺口

- 官方完整工作人员名单仍缺，部分教练组岗位在可访问官方源中未完整确认。
- 部分替补换人分钟待 FIFA Match Centre 最终事件表复核。
- 下一场 T-75m 官方首发、赛前训练伤停和纪律公告需临场刷新。

## 捷克剩余缺口

- 官方完整医疗团队名单仍缺，部分门将/体能/分析岗位来自非官方 staff 源，需后续官方确认。
- 公开评分源未稳定返回完整捷克26人首轮评分；JSON 中 `per_match_ratings.rating` 暂为 `null` 并标注缺口。
- 第二轮 T-75m 官方首发、赛前训练伤停和纪律公告需临场刷新。

## 校验结果

- data/packets/rosters/mexico-roster.json：PowerShell ConvertFrom-Json 解析通过。
- data/outputs/player_state/mexico-player-state.json：PowerShell ConvertFrom-Json 解析通过。
- data/packets/rosters/south-korea-roster.json：PowerShell ConvertFrom-Json 解析通过。
- data/outputs/player_state/south-korea-player-state.json：PowerShell ConvertFrom-Json 解析通过。
- data/packets/rosters/south-africa-roster.json：PowerShell ConvertFrom-Json 解析通过。
- data/outputs/player_state/south-africa-player-state.json：PowerShell ConvertFrom-Json 解析通过。
- data/packets/rosters/czechia-roster.json：PowerShell ConvertFrom-Json 解析通过。
- data/outputs/player_state/czechia-player-state.json：PowerShell ConvertFrom-Json 解析通过。
- 韩国 26/26 chinese_name、native_name、club_name_cn、球员级 source_log 非空；Markdown 完整展示 26 人。
- 南非 26/26 chinese_name、club_name_cn、球员级 source_log 非空；Markdown 完整展示 26 人。
- 捷克 26/26 chinese_name、native_name、club_name_cn、球员级 source_log 非空；Markdown 完整展示 26 人。
- 指定编码异常标记与 skeleton 残留检查通过。
- A组四队成员表返工当前阶段完成；后续需统一做第二轮/临场动态刷新。
