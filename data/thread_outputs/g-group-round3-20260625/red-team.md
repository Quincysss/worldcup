---
phase: match_prediction
group:
  - G
match:
  - belgium_vs_new_zealand
  - egypt_vs_iran
status: complete
created_at: 2026-06-25T12:00:00+08:00
updated_at: 2026-06-25T12:13:31.8851829+08:00
owner: red_team
scope: red-team review only; challenge assumptions, stress test outcomes, and propose revisions
missing_fields:
  - g-group-round3-quant-prediction-20260625.json
  - official_t_minus_75_lineups
  - latest_official_injury_confirmation
  - latest_official_discipline_confirmation
  - china_sports_lottery_same_day_snapshot
source_log:
  - K:\worldcup\data\thread_outputs\g-group-round3-20260625\data-collector.json
  - K:\worldcup\data\thread_outputs\g-group-round3-20260625\tactics-coach.json
  - K:\worldcup\data\thread_outputs\g-group-round3-20260625\modeler-draft.json
  - K:\worldcup\data\outputs\match_predictions\g-group-round2-postmortem-20260622.json
  - K:\worldcup\汇总\GH组第二轮战术复盘_20260622.md
  - K:\worldcup\data\outputs\betting_risk\g-h-round1-process-correction.md
notes:
  - upstream data, tactics, and model files are still partial skeletons
  - discussion_only until quant output, lineup confirmation, and market snapshot are refreshed
---

# G Group Round 3 Red-Team Check

## Status

- verdict: `revise`
- red_team_status: `revise_required`
- publish_gate: `partial_publish_only`
- betting_gate: `hold_for_betting`

## Match Guidance

| Match | Red-team view | Suggested probability range | Suggested xG range | Trigger to revise |
| --- | --- | --- | --- | --- |
| belgium_vs_new_zealand | Belgium should still be favored, but not at a high-confidence level after two straight low-conversion matches. | BEL `48%-55%` / D `24%-29%` / NZ `19%-24%` | BEL `1.3-1.7` / NZ `0.7-1.1` | Revise if Belgium win is above `56%` |
| egypt_vs_iran | Egypt has a small edge, but draw and Iran set-piece/counter tails must remain live. | EGY `34%-40%` / D `31%-36%` / IRN `27%-32%` | EGY `1.0-1.4` / IRN `0.8-1.2` | Revise if Egypt win is above `41%` and draw is below `30%` |

## Top Concerns

1. No round-3 quant output exists yet, so this cannot be presented as a full quant-backed validation.
2. Belgium name bias remains dangerous because process edge has not turned into reliable finishing.
3. Egypt second-half pressure gains and Iran low-score resilience can both be under-modeled if the match is framed too one-sided.

## Failure Scenarios

- Belgium controls territory again but fails to convert, pushing the game toward a draw tail.
- New Zealand stays conservative early, then opens late because a win is required.
- Egypt shifts into draw-management mode in the second half and lowers its own win rate.
- Iran scores first from a set piece or counter and breaks the favorite script.
- Real-time scoreboard changes in the other match alter late-game incentives.

## Release Gates

- Keep `discussion_only` while China Sports Lottery prices are missing or unopened.
- Keep `partial_publish_only` until the round-3 quant file exists.
- Do not present any precise score band as high confidence without official T-75 lineups.

## Handoff

- `data`: add standings, qualification paths, same-time motivation notes, and market snapshot.
- `tactics`: recheck Belgium finishing and rest-defense issues, New Zealand pace split, Egypt second-half pressure, and Iran set-piece/counter routes.
- `model`: cap Belgium favorite premium, avoid double-counting Egypt tactical lift plus star finishing, and preserve Iran draw/upset tail.
- `main`: publish only as partial discussion output, not as full quant consensus.
