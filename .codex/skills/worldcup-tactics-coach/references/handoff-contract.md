# Handoff Contract

## Inputs Expected From Data Collection

Require:

- official squad and availability status
- recent match window and opponent quality note
- likely starters or role candidates when available
- coach identity and tenure
- fixture venue, rest days, and travel context for match-specific work
- set-piece takers and injury/suspension notes where known

If a claim depends on missing data, add it to `data_gaps` rather than filling it by memory.

## Outputs To Model Agent

Pass:

- tactical style labels suitable for features
- phase strengths and weaknesses
- availability dependencies by role
- set-piece edge or risk
- coach flexibility and substitution timing
- matchup edges with confidence

Avoid:

- final win probabilities
- betting picks
- unsupported numerical weights

## Outputs To Verification Agent

Pass:

- low-confidence claims
- claims based on old matches or friendlies
- injury-dependent role assumptions
- source conflicts inherited from data collection
- tactical conclusions likely to be challenged by a specific opponent

## Outputs To Commentary Agent

Pass:

- concise identity statement
- two or three tactical keys
- one coach decision to watch
- one risk that could flip the match narrative
