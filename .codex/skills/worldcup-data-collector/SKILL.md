---
name: worldcup-data-collector
description: Collect and normalize current, source-cited 2026 FIFA World Cup data for team, player, fixture, injury, suspension, travel, climate, ranking, performance, and betting-market analysis. Use when preparing factual data packets for World Cup predictions, team dossiers, player availability checks, odds snapshots, or cross-source verification before tactical/modeling work.
---

# World Cup Data Collector

## Mission

Build sourced, timestamped data packets for 2026 FIFA World Cup analysis. Collect facts only; do not predict match outcomes except to describe market-implied probabilities when odds are requested.

For prediction work, this skill feeds the quantitative pipeline defined by `worldcup-quant-prediction-system`. The collector owns facts and timestamps only; it does not choose scores, probabilities, or betting actions.

## Operating Rules

1. Treat all roster, injury, suspension, odds, and lineup data as time-sensitive. Browse or otherwise verify live sources before reporting.
2. Prefer official sources first: FIFA, confederations, national associations, competition documents, team announcements, and verified club/player channels.
3. Use specialist data sites for structured context: Opta/The Analyst, FBref, Transfermarkt, FotMob, SofaScore, WhoScored, Elo, FIFA ranking, and reputable newswires.
4. For betting markets, record bookmaker, market type, odds format, capture time, and implied probability. Never frame output as betting advice.
5. When sources conflict, keep the conflict visible. Do not average away uncertainty; mark status as `confirmed`, `probable`, `uncertain`, or `conflicting`.
6. Attach source URLs and access/capture dates to every volatile claim.
7. Separate facts from inference. If a value is derived, label the formula or assumption.
8. Treat third-party player ratings as optional, not mandatory. Only record `external_rating` when it comes from a named, same-match, same-source provider. If no reliable same-source rating is available, leave it `null`, set `rating_source_status`, and write `rating_missing_note`; never invent a subjective rating to fill the field.
9. Treat the project's internal 1-5 player score as a model field, not an external rating. `form_status_1_5` and per-match `internal_match_rating_1_5` may use one decimal place, must stay within 1.0-5.0, and must include a short evidence-based reason.

## Workflow

1. Confirm assignment scope: teams, group, match, time window, and whether odds are included.
2. Gather official baseline: fixture, venue, kickoff time, squad list, coach, group, and competition status.
3. Gather availability: injuries, fitness, suspensions, withdrawals, minutes restrictions, and recent club/national-team usage.
4. Gather performance context: recent results, opponent quality, goals, xG if available, rankings, Elo, market value, and set-piece indicators.
5. Gather environment context: host city, travel distance, rest days, climate, altitude, pitch/stadium notes, and time-zone burden.
6. Gather market context if requested: 1X2, Asian handicap, totals, qualification, group winner, outright, and line movement.
7. Normalize into the schemas in `references/data-schemas.md`.
8. Produce a concise data-quality note: freshness, missing fields, conflicting claims, and recommended follow-up checks.

## Quantitative Input Requirements

When the output will feed a match prediction, group projection, or backtest, provide model-ready fields in addition to prose notes:

- `form_status_1_5` for each relevant player, allowing one decimal place from 1.0 to 5.0, with a short reason and source context.
- injury, suspension, availability, and minutes-risk fields.
- expected or confirmed starter status, starts, substitution role, and recent minutes.
- recent performance: goals, assists, cards, xG/xA or shot data when available, and external ratings only when same-source coverage is reliable.
- rating fields: `external_rating`, `rating_source`, `rating_source_status`, `rating_missing_note`, `internal_rating_proxy`, and `internal_rating_proxy_basis`. The model should rely primarily on `form_status_1_5`, per-match `internal_match_rating_1_5`, minutes, events, availability, and role evidence; external ratings are an auxiliary factor.
- club, league, market value, position, role, preferred foot, height, and squad status when available.
- team recent form, opponent strength context, rankings/Elo/power ratings if gathered.
- fixture context: kickoff time, venue, rest days, travel, climate, altitude, and host/crowd context.
- odds snapshots when requested: bookmaker/source, market type, odds format, `captured_at`, and implied probability.
- `source_log` and `captured_at` for every volatile claim.

If a field cannot be verified, set it to `null`, mark `source_status` as `missing` or `uncertain`, and explain it in `gaps_and_conflicts`. Do not invent values to satisfy the model.

## Post-Match Player-State Updates

When a match has been played, the collector must update the participating teams' player files before the review is marked complete:

- `data/outputs/player_state/{team-slug}-player-state.json`
- `队伍/{球队中文名}/成员表.md`
- `data/packets/rosters/{team-slug}-roster.json` when roster-level dynamic fields are present

Update or verify for every squad player:

- started, minutes, substitution timing, and unused-sub status.
- goals, assists, cards, penalties, own goals, key errors, and goalkeeper goals conceded when relevant.
- injury, suspension, knock, fatigue, minutes restriction, and next-match availability.
- `form_status_1_5`, with one decimal allowed and a short reason tied to match evidence.
- a per-player, per-match `internal_match_rating_1_5` entry in the player's rating log, one decimal allowed, based on model evidence from minutes, role, events, availability, tactical responsibility, and post-match adjustment.
- external rating when a reliable same-source provider is available, or a clear `rating_missing_note` when it is not. If needed, provide an `internal_rating_proxy` derived from verifiable match events, minutes, role, and form evidence, explicitly labeled as derived.
- `source_log` and `captured_at` for each volatile update.

Member-table Markdown must be updated in place at `队伍/{球队中文名}/成员表.md`; do not create per-round or dated member-table copies such as `成员表_赛后迭代_*.md`, `成员表_第二轮赛后迭代_*.md`, or `成员表_patch_*.md`. Once a team has played at least one match, the canonical member table must include or maintain a `逐场内部评分记录` section. Keep the table compact but complete enough for backtesting: match id/date, opponent, player, started, minutes, key events, external rating/source status, `internal_match_rating_1_5`, reason, post-match `form_status_1_5`, injury/availability status, and `captured_at`. If a temporary patch file already exists, merge its valid content back into the canonical `成员表.md`, then remove the temporary file.

Return `player_state_update_status` as `updated`, `partial`, or `blocked`. If it is not `updated`, list the exact missing fields and recommended follow-up owner.

## Source Tiers

Use `references/source-policy.md` for source priority, conflict handling, and citation expectations.

Use `references/data-schemas.md` for JSON fields and output shapes.

## Output Contract

Return:

- `summary`: what was collected and the data timestamp.
- `data`: one or more JSON objects matching the requested schema.
- `factor_inputs_ready`: whether the packet is ready for factor scoring.
- `model_ready_fields`: player state, availability, minutes, performance, schedule, environment, and odds fields supplied.
- `player_state_update_status`: post-match player-table update state when the task is a review or backtest.
- `source_log`: source name, URL, capture date/time, and fields supported.
- `gaps_and_conflicts`: missing data, stale data, contradictions, and uncertainty labels.
- `handoff_notes`: what tactical, modeling, or verification agents should inspect next.

Keep commentary brief. The main deliverable is clean, reusable data.

## Anti-disconnect Workflow

For long World Cup work, keep each turn to the smallest current group/round loop: collect facts, hand off concise findings, write files, validate, then report briefly. Do not paste long reports into chat; write them to local files first. If multiple files are needed, create skeleton files first, then fill them one by one. Subagent outputs must be summarized as key conclusions only. Before rewriting after an interruption, check which files already exist and preserve valid content. Final chat output should include only the prediction table, file paths, validation result, and key risks.
