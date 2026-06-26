---
name: worldcup-data-collector
description: Collect and normalize current, source-cited 2026 FIFA World Cup data for team, player, fixture, injury, suspension, travel, climate, ranking, performance, and betting-market analysis. Use when preparing factual data packets for World Cup predictions, team dossiers, player availability checks, odds snapshots, or cross-source verification before tactical/modeling work.
---

# World Cup Data Collector

## Mission

Build sourced, timestamped data packets for 2026 FIFA World Cup analysis. Collect facts only; do not predict match outcomes except to describe market-implied probabilities when odds are requested.

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

## Rating Policy

External player ratings are auxiliary fields. Use them only when a reliable same-source provider covers the match or player packet. If unavailable, use `rating_source_status` and `rating_missing_note`; the model should rely primarily on `form_status_1_5`, per-match `internal_match_rating_1_5`, minutes, events, availability, and role evidence. A derived `internal_rating_proxy` is allowed only when clearly labeled and based on verifiable match facts.

`form_status_1_5`, `internal_rating_proxy`, and `internal_match_rating_1_5` use a 1.0-5.0 internal scale and may keep one decimal place. Member-table Markdown must include a `逐场内部评分记录` section once a team has played at least one match.

## Source Tiers

Use `references/source-policy.md` for source priority, conflict handling, and citation expectations.

Use `references/data-schemas.md` for JSON fields and output shapes.

## Output Contract

Return:

- `summary`: what was collected and the data timestamp.
- `data`: one or more JSON objects matching the requested schema.
- `source_log`: source name, URL, capture date/time, and fields supported.
- `gaps_and_conflicts`: missing data, stale data, contradictions, and uncertainty labels.
- `handoff_notes`: what tactical, modeling, or verification agents should inspect next.

Keep commentary brief. The main deliverable is clean, reusable data.

## Output Discipline

For World Cup work, choose the output size based on the user's current request and the reusable value of the result. Write durable data packets and reusable reports to local Markdown/JSON files when they need to persist, but do not force skeleton-first file creation or smallest-loop batching as a mandatory workflow. Before updating existing files, check whether valid content already exists and preserve it. Subagent outputs should be summarized into key conclusions, source gaps, and handoff notes unless the user asks for full detail.
