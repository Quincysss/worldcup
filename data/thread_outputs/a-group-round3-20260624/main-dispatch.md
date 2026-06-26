# A组第三轮预测调度记录 - 2026-06-24

- status: in_progress
- scope: A组第三轮两场预测
- matches_pending_confirmation:
  - Mexico vs Czechia
  - South Africa vs South Korea
- workflow: facts -> tactics -> model -> red_team -> betting_risk -> summary
- anti_disconnect: long content stays in local files; chat only returns prediction table, file paths, validation, key risks
- third_round_context_required: true
- dispatched_threads:
  - data_collector: 019eb5e6-3961-71f3-8451-4af2fdae71cc
  - tactics_coach: 019eb05a-a3ee-7023-9c89-42d9786d4685
  - data_modeler: 019eb5e6-5269-7b12-a59d-73a9d6bdd585
  - red_team: 019eb05b-66db-7000-8a84-c453dece7ac3
  - betting_risk: 019ed379-0c15-7620-965f-a59bd5da9998
  - summary_commentator: 019eb06a-ae34-7c00-b1fe-9e35ff23c848
- validation: pending

## Required Inputs

- current group table and official tiebreaker rules
- confirmed third-round fixtures, kickoff times, venue, and simultaneous-match dependency
- same-source China Sports Lottery odds snapshot when available
- latest injuries, suspensions, yellow-card and rotation risk
- updated player-state files and team member tables
- tactical third-round motivation adjustments
- xG, Poisson score matrix, 1X2, totals, top scorelines
- red-team verdict and betting-risk gate
