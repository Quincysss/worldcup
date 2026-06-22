---
phase: roster_quality_audit_detail
status: completed_first_pass
updated_at: 2026-06-20T00:00:00+08:00
owner: roster-quality-audit-thread
---

# A-F 组成员表质量校验明细

## A 组

### 墨西哥

- status: pass
- roster: E:\worldcup\data\packets\rosters\mexico-roster.json
- player_state: E:\worldcup\data\outputs\player_state\mexico-player-state.json
- markdown: E:\worldcup\队伍\墨西哥\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 0; goals 0
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues: none

### 南非

- status: pass
- roster: E:\worldcup\data\packets\rosters\south-africa-roster.json
- player_state: E:\worldcup\data\outputs\player_state\south-africa-player-state.json
- markdown: E:\worldcup\队伍\南非\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 0; goals 0
- tags: missing 0; generic 0; max_duplicate_signature 2
- scan: encoding markers 0; residue markers 0
- issues: none

### 韩国

- status: pass
- roster: E:\worldcup\data\packets\rosters\south-korea-roster.json
- player_state: E:\worldcup\data\outputs\player_state\south-korea-player-state.json
- markdown: E:\worldcup\队伍\韩国\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 0; goals 0
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues: none

### 捷克

- status: pass
- roster: E:\worldcup\data\packets\rosters\czechia-roster.json
- player_state: E:\worldcup\data\outputs\player_state\czechia-player-state.json
- markdown: E:\worldcup\队伍\捷克\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 0; goals 0
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues: none

## C 组

### 巴西

- status: needs_fix
- roster: E:\worldcup\data\packets\rosters\brazil-roster.json
- player_state: E:\worldcup\data\outputs\player_state\brazil-player-state.json
- markdown: E:\worldcup\队伍\巴西\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 23; started missing 23; rating missing 26
- profile gaps: preferred_foot 26; height 26; market_value 26; caps 26; goals 26
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues:
  - [high] round1_usage_large_gap: 首轮 minutes 缺失 23/26，started 缺失 23/26。
  - [medium] round1_rating_large_gap: 首轮评分缺失 26/26，已按质量缺口记录。
  - [medium] profile_fields_large_gap: 资料字段缺失较多：preferred_foot 26/26, height_cm 26/26, market_value_eur 26/26, caps 26/26, goals 26/26。

### 摩洛哥

- status: pass
- roster: E:\worldcup\data\packets\rosters\morocco-roster.json
- player_state: E:\worldcup\data\outputs\player_state\morocco-player-state.json
- markdown: E:\worldcup\队伍\摩洛哥\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 0; goals 0
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues: none

### 海地

- status: needs_fix
- roster: E:\worldcup\data\packets\rosters\haiti-roster.json
- player_state: E:\worldcup\data\outputs\player_state\haiti-player-state.json
- markdown: E:\worldcup\队伍\海地\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 25/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 26
- profile gaps: preferred_foot 26; height 26; market_value 26; caps 26; goals 26
- tags: missing 26; generic 0; max_duplicate_signature 0
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] round1_rating_large_gap: 首轮评分缺失 26/26，已按质量缺口记录。
  - [medium] profile_fields_large_gap: 资料字段缺失较多：preferred_foot 26/26, height_cm 26/26, market_value_eur 26/26, caps 26/26, goals 26/26。
  - [medium] technical_tags_quality: technical_tags 缺失 26/26，泛化 0，最高重复签名 0。
  - [blocker] markdown_not_full_26: Markdown 成员表数字行 25/26。

### 苏格兰

- status: needs_fix
- roster: E:\worldcup\data\packets\rosters\scotland-roster.json
- player_state: E:\worldcup\data\outputs\player_state\scotland-player-state.json
- markdown: E:\worldcup\队伍\苏格兰\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 25; started missing 26; rating missing 26
- profile gaps: preferred_foot 26; height 26; market_value 26; caps 26; goals 26
- tags: missing 26; generic 0; max_duplicate_signature 0
- scan: encoding markers 0; residue markers 0
- issues:
  - [high] round1_usage_large_gap: 首轮 minutes 缺失 25/26，started 缺失 26/26。
  - [medium] round1_rating_large_gap: 首轮评分缺失 26/26，已按质量缺口记录。
  - [medium] profile_fields_large_gap: 资料字段缺失较多：preferred_foot 26/26, height_cm 26/26, market_value_eur 26/26, caps 26/26, goals 26/26。
  - [medium] technical_tags_quality: technical_tags 缺失 26/26，泛化 0，最高重复签名 0。

## D 组

### 美国

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\usa-roster.json
- player_state: E:\worldcup\data\outputs\player_state\usa-player-state.json
- markdown: E:\worldcup\队伍\美国\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 26; goals 26
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] profile_fields_large_gap: 资料字段缺失较多：caps 26/26, goals 26/26。

### 澳大利亚

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\australia-roster.json
- player_state: E:\worldcup\data\outputs\player_state\australia-player-state.json
- markdown: E:\worldcup\队伍\澳大利亚\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 1; height 2; market_value 0; caps 26; goals 26
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] profile_fields_large_gap: 资料字段缺失较多：caps 26/26, goals 26/26。

### 土耳其

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\turkey-roster.json
- player_state: E:\worldcup\data\outputs\player_state\turkey-player-state.json
- markdown: E:\worldcup\队伍\土耳其\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 11
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 0; goals 0
- tags: missing 26; generic 0; max_duplicate_signature 0
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] technical_tags_quality: technical_tags 缺失 26/26，泛化 0，最高重复签名 0。

### 巴拉圭

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\paraguay-roster.json
- player_state: E:\worldcup\data\outputs\player_state\paraguay-player-state.json
- markdown: E:\worldcup\队伍\巴拉圭\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 26; height 26; market_value 26; caps 0; goals 0
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] profile_fields_large_gap: 资料字段缺失较多：preferred_foot 26/26, height_cm 26/26, market_value_eur 26/26。

## E 组

### 德国

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\germany-roster.json
- player_state: E:\worldcup\data\outputs\player_state\germany-player-state.json
- markdown: E:\worldcup\队伍\德国\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 26; goals 26
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] profile_fields_large_gap: 资料字段缺失较多：caps 26/26, goals 26/26。

### 科特迪瓦

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\ivory-coast-roster.json
- player_state: E:\worldcup\data\outputs\player_state\ivory-coast-player-state.json
- markdown: E:\worldcup\队伍\科特迪瓦\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 0; height 0; market_value 0; caps 26; goals 26
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] profile_fields_large_gap: 资料字段缺失较多：caps 26/26, goals 26/26。

### 厄瓜多尔

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\ecuador-roster.json
- player_state: E:\worldcup\data\outputs\player_state\ecuador-player-state.json
- markdown: E:\worldcup\队伍\厄瓜多尔\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 26
- profile gaps: preferred_foot 26; height 26; market_value 26; caps 0; goals 0
- tags: missing 26; generic 0; max_duplicate_signature 0
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] round1_rating_large_gap: 首轮评分缺失 26/26，已按质量缺口记录。
  - [medium] profile_fields_large_gap: 资料字段缺失较多：preferred_foot 26/26, height_cm 26/26, market_value_eur 26/26。
  - [medium] technical_tags_quality: technical_tags 缺失 26/26，泛化 0，最高重复签名 0。

### 库拉索

- status: pass_with_medium_gaps
- roster: E:\worldcup\data\packets\rosters\curacao-roster.json
- player_state: E:\worldcup\data\outputs\player_state\curacao-player-state.json
- markdown: E:\worldcup\队伍\库拉索\成员表.md
- counts: roster 26/26; player_state 26/26; markdown rows 26/26
- required fields: chinese missing 0; club_cn missing 0; source_log missing 0
- form: invalid 0; reason missing 0
- round1: minutes missing 0; started missing 0; rating missing 0
- profile gaps: preferred_foot 26; height 26; market_value 26; caps 0; goals 0
- tags: missing 0; generic 0; max_duplicate_signature 1
- scan: encoding markers 0; residue markers 0
- issues:
  - [medium] profile_fields_large_gap: 资料字段缺失较多：preferred_foot 26/26, height_cm 26/26, market_value_eur 26/26。

## F 组 not_ready 记录

- 荷兰: status=not_ready; roster=26; player_state=26; thread=019ededd-afc1-7e50-a791-f4a4571a59bc; note=F组状态文件仍含 in_progress/pending，第一轮审计按 not_ready 记录，不打断并行线程。
- 日本: status=not_ready; roster=26; player_state=26; thread=019edede-0e20-7382-9419-d6250c64ea5c; note=F组状态文件仍含 in_progress/pending，第一轮审计按 not_ready 记录，不打断并行线程。
- 瑞典: status=not_ready; roster=26; player_state=26; thread=019edede-7507-7ed0-80cf-b55d4c4b6efa; note=F组状态文件仍含 in_progress/pending，第一轮审计按 not_ready 记录，不打断并行线程。
- 突尼斯: status=not_ready; roster=26; player_state=26; thread=019edede-d910-7301-a501-dc0517b1c2d4; note=F组状态文件仍含 in_progress/pending，第一轮审计按 not_ready 记录，不打断并行线程。

## 回派队列

- 巴西 -> `019ededd-afc1-7e50-a791-f4a4571a59bc`：status `pending_handoff_after_current_task`；补齐 26 人首轮 minutes/started 并同步 player_state/Markdown。
- 海地 -> `019edede-7507-7ed0-80cf-b55d4c4b6efa`：status `pending_handoff_after_current_task`；修复 Markdown 25/26 展示 blocker，必须补成完整 26 人。
- 苏格兰 -> `019edede-d910-7301-a501-dc0517b1c2d4`：status `pending_handoff_after_current_task`；补齐 26 人首轮 minutes/started 并同步 player_state/Markdown。

说明：三个目标线程均为 F 组复用并行线程，状态文件仍显示 F 组 in_progress；本轮按规则不打断，等待当前任务完成或主线程明确要求立即阻断后再发送。

