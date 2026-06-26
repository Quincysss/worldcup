---
phase: match_prediction
group:
  - I
match:
  - france_vs_norway
  - senegal_vs_iraq
status: in_progress
created_at: 2026-06-25T15:38:00+08:00
updated_at: 2026-06-25T15:49:00+08:00
owner: red_team
scope: final red-team re-review of latest four packets; release gate only
missing_fields:
  - official_t75_lineups_both_matches
  - official_card_accumulation_confirmation
  - france_norway_canonical_home_away_confirmation
  - mendy_final_availability
  - aymen_hussein_final_availability
  - senegal_iraq_stable_ordinary_1x2_market
source_log:
  - K:\worldcup\data\thread_outputs\i-group-round3-20260625\data-collector.json
  - K:\worldcup\data\thread_outputs\i-group-round3-20260625\tactics-coach.json
  - K:\worldcup\data\thread_outputs\i-group-round3-20260625\data-modeler.json
  - K:\worldcup\data\thread_outputs\i-group-round3-20260625\red-team.json
notes:
  - final rereview completed on latest four packets
---

# I组第三轮最终红队复审

status: complete
verdict: revise
publish_gate: 仅临时发布

关键三条风险：
1. 两场 `T-75` 官方首发仍未出，预测首发误差仍可能改变强弱边界与节奏判断。
2. 法国 vs 挪威仍有主客/赔率口径冲突；塞内加尔 vs 伊拉克仍缺稳定普通胜平负校准。
3. 第三轮同开球与动机差异会放大平局管理、末段追分与开放战尾部，基础泊松分布偏窄。

两场概率微调方向：
- 法国 vs 挪威：在 `44.73 / 25.91 / 29.36` 基础上，小幅下修法国胜，小幅上修平局尾部，保留挪威爆冷尾部但不额外夸大。
- 塞内加尔 vs 伊拉克：在 `53.07 / 24.82 / 22.11` 基础上，小幅下修塞内加尔胜，小幅上修平局尾部，并保留一小段条件式伊拉克爆冷尾部。
