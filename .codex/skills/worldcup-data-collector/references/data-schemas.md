# Data Schemas

Use JSON-compatible objects. Prefer `null` over guessed values.

## Team Packet

```json
{
  "team": "",
  "fifa_code": "",
  "group": "",
  "coach": {
    "name": "",
    "appointed": null,
    "source_status": "confirmed"
  },
  "competition_context": {
    "fixtures": [],
    "base_camp": null,
    "travel_notes": "",
    "rest_days": []
  },
  "strength_indicators": {
    "fifa_rank": null,
    "elo_rating": null,
    "opta_power_rank": null,
    "squad_market_value_eur": null,
    "data_timestamp": ""
  },
  "recent_form": {
    "matches_window": "",
    "record": "",
    "goals_for": null,
    "goals_against": null,
    "xg_for": null,
    "xg_against": null,
    "opponent_quality_note": ""
  },
  "squad_status": {
    "final_squad_announced": false,
    "key_players": [],
    "injuries": [],
    "suspensions": [],
    "fitness_risks": [],
    "depth_notes": ""
  },
  "source_log": []
}
```

## Player Packet

```json
{
  "player": "",
  "team": "",
  "club": "",
  "position": "",
  "age": null,
  "role": "starter/rotation/depth/uncertain",
  "availability": {
    "status": "confirmed/probable/uncertain/conflicting",
    "issue": null,
    "last_update": "",
    "expected_return": null
  },
  "recent_usage": {
    "club_minutes_window": "",
    "national_team_minutes_window": "",
    "starts_recent": null,
    "load_note": ""
  },
  "performance_snapshot": {
    "goals": null,
    "assists": null,
    "xg": null,
    "xa": null,
    "form_status_1_5": null,
    "form_status_reason": "",
    "external_rating": null,
    "rating_source": null,
    "rating_source_status": "available/missing/not_same_source/paywalled_or_unstable",
    "rating_missing_note": "",
    "internal_rating_proxy": null,
    "internal_rating_proxy_basis": "",
    "defensive_actions_note": "",
    "set_piece_role": ""
  },
  "match_internal_rating_log": [
    {
      "match_id": "",
      "match_date": "",
      "opponent": "",
      "round": "",
      "started": false,
      "minutes": null,
      "position_role": "",
      "key_events": [],
      "external_rating": null,
      "rating_source": null,
      "rating_source_status": "available/missing/not_same_source/paywalled_or_unstable",
      "internal_match_rating_1_5": null,
      "internal_match_rating_reason": "",
      "postmatch_form_status_1_5": null,
      "model_weight_note": "",
      "captured_at": "",
      "source_log": []
    }
  ],
  "source_log": []
}
```

## Player Rating Policy

External player ratings are not hard-required fields. Use them only when the rating comes from a named, same-match, same-source provider such as FotMob, SofaScore, WhoScored, Opta-linked reports, or another clearly identified data provider. Do not mix providers inside one match packet unless the inconsistency is explicitly labeled.

If no reliable external rating is available, keep `external_rating` as `null`, set `rating_source_status`, and fill `rating_missing_note`. The project may use `internal_rating_proxy` and `internal_match_rating_1_5` as derived model inputs, but they must be based on verifiable facts such as minutes, goals, assists, cards, errors, goalkeeper goals conceded/saves when available, role, and `form_status_1_5`.

`form_status_1_5`, `internal_rating_proxy`, `internal_match_rating_1_5`, and `postmatch_form_status_1_5` use a 1.0-5.0 scale and may keep one decimal place. Values outside that range are invalid. They are internal model fields and must not be presented as external data-provider ratings.

## Member Table Rating Log

Each `队伍/{球队中文名}/成员表.md` should add a `逐场内部评分记录` section after a team has played at least one match:

```markdown
## 逐场内部评分记录

| 比赛 | 日期 | 对手 | 球员 | 首发 | 分钟 | 事件摘要 | 外部评分/来源状态 | 内部评分1-5 | 评分理由 | 赛后状态值 | captured_at |
| --- | --- | --- | --- | --- | ---: | --- | --- | ---: | --- | ---: | --- |
```

The table is the human-readable mirror of `match_internal_rating_log`. It may be grouped by match if the full table becomes long.

## Match Data Packet

```json
{
  "match": "",
  "stage": "",
  "date_local": "",
  "kickoff_local": "",
  "venue": "",
  "city": "",
  "teams": [],
  "availability_summary": {
    "team_a_absences": [],
    "team_b_absences": [],
    "status_timestamp": ""
  },
  "context": {
    "rest_days": {},
    "travel_distance_note": "",
    "weather_forecast": null,
    "altitude_m": null
  },
  "market_snapshot": {
    "capture_time": "",
    "bookmakers": [],
    "one_x_two": {},
    "asian_handicap": {},
    "totals": {},
    "line_movement_note": ""
  },
  "source_log": []
}
```

## Source Log Entry

```json
{
  "source": "",
  "url": "",
  "captured_at": "",
  "supports_fields": [],
  "reliability_tier": 1,
  "notes": ""
}
```
