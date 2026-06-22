# Model Input Contract

## Required For Match Prediction

- match id/name, stage, date, kickoff time, venue, city
- teams and current coach
- baseline strength indicator: Elo or equivalent rating
- recent form window with opponent-quality note
- injuries, suspensions, and fitness risks with freshness timestamp
- player-state inputs: `form_status_1_5` on a 1.0-5.0 scale with one decimal allowed, plus recent `internal_match_rating_1_5` logs when a team has already played
- rest days and travel/context note
- source log and captured_at for volatile fields

## Strongly Recommended

- expected lineups or likely starters
- per-player match rating log from `队伍/{球队中文名}/成员表.md` and `data/outputs/player_state/{team-slug}-player-state.json`
- xG/xGA or shot-quality indicators
- set-piece attacking/defending indicators
- goalkeeper status and recent minutes
- climate/altitude/pitch context
- odds snapshot for 1X2, Asian handicap, and totals
- tactical-agent matchup notes

## Required For Group/Tournament Simulation

- full fixture list
- group assignments
- baseline team ratings for all teams in scope
- tiebreaker rules
- advancement rules
- bracket path rules
- host/venue context if modeling each match

## Freshness Rules

- odds: recapture same day as analysis, and again within 24h of kickoff
- injuries/fitness: recheck within 24h of kickoff; for major players, recheck after official press conference
- final squads: official source only once published
- lineups: treat as uncertain until official team sheet
- weather: same day preferred; within 72h only for rough context

## Readiness Labels

- `ready`: enough current data to model with normal uncertainty
- `partial`: model possible but important inputs missing or stale
- `blocked`: missing baseline data, fixture identity, or major availability uncertainty
