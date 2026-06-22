# 红队审查产物目录

本目录用于存放红队核验正式产物。

## 约束

- 所有文件统一使用 UTF-8 编码。
- 正式审查报告优先使用 JSON。
- 文件内容必须显式区分 `severity`、`confidence`、`owner`。
- 每份正式报告必须显式标注 `phase`。
- 接到任务后必须先创建目标文件并写入最小骨架，再继续填内容。
- 最小骨架必须包含：`phase`、`team/group/match`、`status`、`created_at`、`updated_at`、`owner`、`scope`、`missing_fields`、`source_log`、`notes`。
- 若任务中断，文件仍必须保留当前进度、疑点和 `missing_fields`。
- 任务完成后将 `status` 改为 `complete`；若上游文件缺失或关键输入缺失，则改为 `partial` 或 `blocked` 并写明 `owner`。
- 涉及赔率、盘口、首发、伤病、天气的结论必须带时间戳。
- 涉及投注倾向时，不给直接投注建议，只标记：
  - `keep_watch`
  - `downgrade`
  - `avoid`
  - `wait_for_lineup`
  - `wait_for_market_refresh`

## 推荐命名

- `rtv-match-YYYYMMDD-HHMM-<slug>.json`
- `rtv-team-YYYYMMDD-HHMM-<slug>.json`
- `rtv-market-YYYYMMDD-HHMM-<slug>.json`

## Phase 枚举

- `team_profile`
- `group_comparison`
- `match_prediction`
- `group_projection`
- `tournament_projection`

当前阶段球队分析只能使用 `team_profile`。

## Status 枚举

- `in_progress`
- `complete`
- `partial`
- `blocked`

## 面向汇总线程的附加要求

每份报告应尽量包含 `fan_facing_risk_tips`，供汇总线程转述为球迷评论风格内容，并落入：

- `K:\worldcup\队伍\`
- `K:\worldcup\比赛\`
- `K:\worldcup\赔率与投注\`
