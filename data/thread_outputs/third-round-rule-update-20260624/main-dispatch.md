# Third-Round Rule Update Dispatch - 2026-06-24

## Scope

The project now treats final group-round predictions as a distinct modeling problem. Predictions must include tournament context before xG, Poisson, market calibration, and red-team review.

## Updated Local Rules

- `.codex/skills/worldcup-quant-prediction-system/SKILL.md`
- `.codex/skills/worldcup-data-collector/SKILL.md`
- `.codex/skills/worldcup-data-modeler/SKILL.md`
- `.codex/skills/worldcup-data-modeler/references/model-input-contract.md`
- `.codex/skills/worldcup-data-modeler/references/output-schemas.md`
- `.codex/skills/worldcup-tactics-coach/SKILL.md`
- `.codex/skills/worldcup-red-team-verifier/SKILL.md`

## Notified Threads

- data collector: `019eb053-ef96-7a22-9685-4602ba252b10`
- tactics coach: `019eb05a-a3ee-7023-9c89-42d9786d4685`
- data modeler: `019eb079-bed5-7342-9dfd-d1f448caa0dc`
- red-team verifier: `019eb05b-66db-7000-8a84-c453dece7ac3`
- summary/commentator: `019eb06a-ae34-7c00-b1fe-9e35ff23c848`
- betting-risk: `019ed379-0c15-7620-965f-a59bd5da9998`

## Required Third-Round Additions

- group table snapshot and official tiebreaker rules
- qualification-state labels and scenario simulation
- simultaneous-match dependency
- round-of-32 path expectation
- rotation, minutes-management, and yellow-card suspension risk
- strategic tempo adjustment
- market double-counting guard
- red-team review of incentive failure modes

## Status

Dispatched to all relevant threads. No concrete group prediction started in this rule-update step.
