# Source Policy

## Priority

1. Official competition and team sources: FIFA, confederations, national federations, squad PDFs, match reports, disciplinary bulletins, verified team announcements.
2. Primary event data: official match centers, FIFA stats feeds, recognized data providers when cited by name.
3. Reputable reporting: Reuters, AP, BBC, ESPN, The Athletic, Sky Sports, major local outlets with named reporters.
4. Structured football databases: FBref, Transfermarkt, FotMob, SofaScore, WhoScored, World Football Elo Ratings, FIFA ranking pages.
5. Market sources: bookmaker pages, odds aggregators, exchange prices, Asian handicap boards. Always record capture time.

## Volatile Fields

Always timestamp and source:

- final squads and late replacements
- injuries, fitness, illness, minutes restrictions
- suspensions and disciplinary risk
- expected lineups
- odds and line movement
- coach changes
- kickoff time, venue changes, weather, and travel disruption

## Conflict Handling

Use:

- `confirmed`: official or independently confirmed by two reliable sources
- `probable`: credible reporting but no official confirmation
- `uncertain`: plausible but weak, stale, or single-source
- `conflicting`: reliable sources disagree

When conflicting:

1. Quote neither source at length; summarize the disagreement.
2. Prefer the most recent official source for status.
3. Preserve both source links in `source_log`.
4. Add a follow-up check with exact trigger, such as "recheck official squad sheet 24h before kickoff".

## Odds Notes

Convert decimal odds to implied probability with `1 / decimal_odds` before margin removal. If multiple outcomes are available, calculate overround and normalized probabilities when useful.

Do not recommend bets. Describe market signal, movement, and disagreement with non-market indicators.
