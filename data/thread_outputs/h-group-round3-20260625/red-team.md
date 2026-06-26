---
phase: match_prediction
group:
  - H
match:
  - spain_vs_uruguay
  - cape_verde_vs_saudi_arabia
status: complete
created_at: 2026-06-25T14:50:25.4874976+08:00
updated_at: 2026-06-25T14:54:40+08:00
owner: red_team
scope: red-team review only; challenge assumptions, stress test outcomes, and propose revisions
missing_fields:
  - official_third_round_quant_output
  - official_t_minus_75_lineups
  - latest_official_injury_confirmation
  - latest_official_discipline_confirmation
  - china_sports_lottery_same_day_snapshot
source_log:
  - K:\worldcup\data\thread_outputs\h-group-round3-20260625\data-collector.json
  - K:\worldcup\data\thread_outputs\h-group-round3-20260625\tactics-coach.json
  - K:\worldcup\data\thread_outputs\h-group-round3-20260625\modeler-draft.json
  - K:\worldcup\data\outputs\match_predictions\h-group-round2-postmortem-20260622.json
  - K:\worldcup\data\outputs\match_predictions\h-group-round2-quant-revision-20260621.json
  - K:\worldcup\比赛\已完成比赛\小组赛\H组\H组第一轮复盘.md
  - K:\worldcup\比赛\已完成比赛\小组赛\H组\H组第二轮复盘.md
notes:
  - upstream third-round files exist but remain skeleton or partial
  - discussion_only until lineup, discipline, injury, and executable market snapshots refresh
---

# H Group Round 3 Red-Team Check

## Status

- verdict: `revise`
- red_team_status: `revise_required`
- publish_gate: `partial_publish_only`
- betting_gate: `hold_for_betting`

## Group Context

- Spain: 4 pts, GD +4
- Cape Verde: 2 pts, GD 0
- Uruguay: 2 pts, GD 0
- Saudi Arabia: 1 pt, GD -4
- Same-time dependency matters. Motivation should not be modeled as static from minute 1 to minute 90.

## Match Guidance

| Match | Red-team view | Suggested probability range | Suggested xG range | Trigger to revise |
| --- | --- | --- | --- | --- |
| spain_vs_uruguay | Spain should not be priced like a full-motivation favorite. Rotation, pace control, and draw-management can reduce both win rate and blowout tail. Uruguay late-game opening risk is real, but do not force all-out attack from kickoff. | ESP `34%-40%` / D `29%-34%` / URU `28%-33%` | ESP `1.0-1.4` / URU `0.9-1.3` | Revise if Spain win is above `41%` or Uruguay win is below `27%` |
| cape_verde_vs_saudi_arabia | Cape Verde resilience is now evidence-based, but "win-and-qualify" can become market overheat. Saudi must-win urgency raises both early-collapse and late-chaos tails. | CPV `35%-41%` / D `27%-32%` / KSA `27%-33%` | CPV `1.0-1.4` / KSA `0.9-1.4` | Revise if Cape Verde win is above `42%` or Saudi tail is pushed below `26%` |

## Top Concerns

1. Spain at 4 points may protect qualification and reduce tempo, so any strong-favorite or big-win framing is vulnerable.
2. Uruguay has drawn twice, but "must win" should not be treated as a fixed minute-1 state; same-time scoreboard dependence can delay or accelerate game opening.
3. Cape Verde has now drawn Spain and Uruguay, so its low-score resilience and set-piece path cannot be treated as noise.
4. Saudi Arabia must chase the game, but its line can break early or devolve into late chaos after Spain exposed major defensive instability.
5. China Sports Lottery snapshot is missing, so there is no evidence that the market fully prices third-round incentive changes.
6. All three upstream round-3 files remain skeleton-level in_progress outputs, so no precise quant chain is available to audit.

## Failure Scenarios

- Spain rotates or manages risk after an even first half, leaving too much draw weight unmodeled.
- Uruguay does not press all-in from kickoff, then opens sharply after live scoreboard pressure.
- Cape Verde gets overheated because "win means qualify" is framed too simply.
- Saudi concedes early and the match swings into a high-variance state instead of a controlled Cape Verde win.
- Real-time changes in the other match alter qualification logic and late-game tempo.

## Market And Quant Flags

- No China Sports Lottery same-day snapshot is present, so motivation pricing cannot be verified.
- No official T-75 lineups are available.
- No final third-round quant output exists; only skeleton collector, tactics, and modeler files are present.
- Same-time incentive, rotation risk, and market movement must not be counted twice.

## Handoff

- `data`: add table snapshot, qualification paths, same-time dependency notes, and executable market snapshot.
- `tactics`: recheck Spain rotation/load management, Uruguay late-game opening triggers, Cape Verde set-piece resilience, and Saudi early-collapse versus late-chaos split.
- `model`: trim Spain favorite premium, keep Uruguay draw-to-open game path, avoid overheating Cape Verde, and preserve Saudi volatility tails.
- `main`: publish only as partial discussion output, not as full quant consensus.
