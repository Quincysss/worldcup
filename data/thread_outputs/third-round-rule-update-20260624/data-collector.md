phase: rule_update
team/group/match: third_round_global_rule_patch
status: complete
created_at: 2026-06-24T15:24:29.6491736+08:00
updated_at: 2026-06-24T15:24:29.6491736+08:00
owner: worldcup-data-collector
scope: update data-collector requirements for all third-round group-stage prediction packets; no live match collection started
missing_fields:
- fair_play_points_or_disciplinary_tiebreak fields are not yet mandatory in every existing team/player packet and should be added where official competition documents require them
- official round-of-32 path mapping table should be stored centrally for reuse across groups
- market_line_movement delta fields need a standard schema if same-source opening odds are available
source_log:
- source_name: worldcup-data-collector-skill
  source_url: K:\worldcup\.codex\skills\worldcup-data-collector\SKILL.md
  captured_at: 2026-06-24T15:24:29.6491736+08:00
  source_status: read
  supported_fields:
  - third-round tournament-context facts
  - source/capture requirements
  - volatile field freshness rules
- source_name: worldcup-quant-prediction-system-skill
  source_url: K:\worldcup\.codex\skills\worldcup-quant-prediction-system\SKILL.md
  captured_at: 2026-06-24T15:24:29.6491736+08:00
  source_status: read
  supported_fields:
  - prediction pipeline dependencies
  - third_round_context model fields
  - market calibration boundary
notes:
- anti_disconnect_workflow_adopted
- no_group_prediction_started
- future third-round packets must be written as local files before chat summaries

# Adopted Third-Round Data Requirements

## Mandatory packet additions

1. group_table_snapshot
   - points
   - rank
   - goal_difference
   - goals_for
   - goals_against
   - matches_played
   - head_to_head_relevant_status
   - fair_play_status_when_officially_relevant
   - captured_at
   - source_url

2. official_tiebreaker_order
   - governing_body
   - competition_stage
   - ordered_rules
   - source_url
   - captured_at

3. simultaneous_fixture_dependency
   - same_group_other_match
   - simultaneous_kickoff_status
   - scenario_dependency_note
   - late_game_incentive_swing_risk
   - source_status

4. qualification_status_tags
   - must_win
   - draw_enough
   - first_place_race
   - already_qualified
   - rotation_likely
   - eliminated
   - theoretical_only
   - qualification_status_reason
   - uncertainty_label

5. bracket_path_expectation
   - finish_position
   - likely_round_of_32_opponent_pool
   - opponent_strength_note
   - rest_day_impact
   - travel_impact
   - venue_impact
   - uncertainty_note

6. discipline_rotation_risk
   - yellow_card_count
   - suspension_if_booked
   - protected_starter_risk
   - rotation_hint
   - coach_public_comment
   - coach_quote_source_url
   - captured_at

7. market_motivation_context
   - bookmaker_or_source
   - market_type
   - decimal_odds
   - implied_probability
   - devig_probability_when_multisided
   - line_movement_if_available
   - market_reflects_rotation_signal
   - market_reflects_motivation_signal
   - captured_at
   - source_status

## Collector handoff additions for model thread

- third_round_context
- group_table_snapshot
- qualification_scenarios
- motivation_profile
- bracket_path_expectation
- rotation_risk
- yellow_card_suspension_risk
- strategic_tempo_adjustment_input
- market_adjustment_input_boundary

## Still recommended schema additions

- official_ranking_rule_fields_used
- fair_play_points
- disciplinary_record_snapshot
- same_source_open_to_latest_odds_delta
- lineup_protection_risk_by_key_player
- target_finish_position_signal
- mutual_benefit_draw_risk_flag
- scenario_tree_reference
