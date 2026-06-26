from __future__ import annotations

import datetime as dt
import json
import math
from itertools import product
from pathlib import Path


ROOT = Path(r"K:\worldcup")
OUT_DIR = ROOT / "data" / "outputs" / "match_predictions"
THREAD_DIR = ROOT / "data" / "thread_outputs" / "g-group-round3-20260625"
MATCH_DIR = ROOT / "比赛" / "未开始比赛" / "小组赛" / "G组"
STATUS_FILE = ROOT / "线程状态.md"

GENERATED_AT = dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).isoformat(timespec="seconds")


def poisson_pmf(lam: float, k: int) -> float:
    return math.exp(-lam) * lam**k / math.factorial(k)


def poisson_matrix(home_xg: float, away_xg: float, max_goals: int = 5) -> dict:
    matrix = {}
    in_grid = 0.0
    for h in range(max_goals + 1):
        matrix[str(h)] = {}
        hp = poisson_pmf(home_xg, h)
        for a in range(max_goals + 1):
            p = hp * poisson_pmf(away_xg, a)
            in_grid += p
            matrix[str(h)][str(a)] = round(p, 6)
    return {"max_goals": max_goals, "matrix": matrix, "tail_probability": round(max(0.0, 1.0 - in_grid), 6)}


def derived_probs(home_xg: float, away_xg: float, limit: int = 14) -> dict:
    home = draw = away = over25 = btts = 0.0
    score_probs = []
    for h in range(limit + 1):
        hp = poisson_pmf(home_xg, h)
        for a in range(limit + 1):
            p = hp * poisson_pmf(away_xg, a)
            if h > a:
                home += p
            elif h == a:
                draw += p
            else:
                away += p
            if h + a > 2:
                over25 += p
            if h > 0 and a > 0:
                btts += p
            if h <= 5 and a <= 5:
                score_probs.append((p, h, a))
    score_probs.sort(reverse=True)
    return {
        "1x2": {"home": round(home, 4), "draw": round(draw, 4), "away": round(away, 4)},
        "totals": {
            "over_2_5": round(over25, 4),
            "under_2_5": round(1 - over25, 4),
            "btts_yes": round(btts, 4),
            "btts_no": round(1 - btts, 4),
        },
        "top_scorelines": [
            {"score": f"{h}-{a}", "probability": round(p, 4)}
            for p, h, a in score_probs[:8]
        ],
    }


def no_vig(odds: list[float]) -> dict:
    raw = [1.0 / x for x in odds]
    total = sum(raw)
    labels = ["home", "draw", "away"]
    return {label: round(value / total, 4) for label, value in zip(labels, raw)}


def add_probs_to_table(base: dict, match: dict, score: tuple[int, int]) -> dict:
    table = {team: row.copy() for team, row in base.items()}
    home, away = match["home"], match["away"]
    h, a = score
    table[home]["played"] += 1
    table[away]["played"] += 1
    table[home]["gf"] += h
    table[home]["ga"] += a
    table[away]["gf"] += a
    table[away]["ga"] += h
    if h > a:
        table[home]["points"] += 3
    elif h == a:
        table[home]["points"] += 1
        table[away]["points"] += 1
    else:
        table[away]["points"] += 3
    for row in table.values():
        row["gd"] = row["gf"] - row["ga"]
    return table


def third_place_advancement_probability(row: dict) -> float:
    pts, gd = row["points"], row["gd"]
    if pts >= 5:
        return 0.92
    if pts == 4:
        return 0.78 if gd >= 0 else 0.62
    if pts == 3:
        if gd >= 1:
            return 0.44
        if gd == 0:
            return 0.34
        if gd == -1:
            return 0.24
        return 0.14
    return 0.02


def simulate_group(base_table: dict, matches: list[dict]) -> dict:
    score_sets = []
    for match in matches:
        grid = match["poisson_score_matrix"]["matrix"]
        entries = []
        mass = 0.0
        for h, cols in grid.items():
            for a, p in cols.items():
                prob = float(p)
                entries.append(((int(h), int(a)), prob))
                mass += prob
        score_sets.append([{"score": score, "p": p / mass} for score, p in entries])

    teams = list(base_table)
    top2 = {team: 0.0 for team in teams}
    third = {team: 0.0 for team in teams}
    advance = {team: 0.0 for team in teams}
    expected_points = {team: 0.0 for team in teams}

    for first, second in product(*score_sets):
        p = first["p"] * second["p"]
        table = add_probs_to_table(base_table, matches[0], first["score"])
        table = add_probs_to_table(table, matches[1], second["score"])
        ranked = sorted(table.items(), key=lambda item: (item[1]["points"], item[1]["gd"], item[1]["gf"]), reverse=True)
        for team, row in table.items():
            expected_points[team] += p * row["points"]
        top2[ranked[0][0]] += p
        top2[ranked[1][0]] += p
        third[ranked[2][0]] += p
        advance[ranked[0][0]] += p
        advance[ranked[1][0]] += p
        advance[ranked[2][0]] += p * third_place_advancement_probability(ranked[2][1])

    return {
        "tie_breaker_note": "simulation sorts by points, goal difference, goals for; head-to-head edge is documented in scenarios but not exhaustively enumerated.",
        "top2_probability": {team: round(top2[team], 4) for team in teams},
        "third_place_probability": {team: round(third[team], 4) for team in teams},
        "advance_probability_with_third_place_heuristic": {team: round(min(1.0, advance[team]), 4) for team in teams},
        "expected_final_points": {team: round(expected_points[team], 3) for team in teams},
    }


def match_payload(
    *,
    match_id: str,
    home: str,
    away: str,
    venue: str,
    source_match_no: str,
    handicap_label: str,
    market: dict,
    home_xg: float,
    away_xg: float,
    strengths: dict,
    attack_defense: dict,
    predicted_lineups: dict,
    tactical_notes: list[str],
    scenarios: list[str],
    risks: list[str],
    red_range: dict,
) -> dict:
    matrix = poisson_matrix(home_xg, away_xg)
    probs = derived_probs(home_xg, away_xg)
    odds_implied = None
    if market.get("ordinary_1x2_odds"):
        odds_implied = no_vig(market["ordinary_1x2_odds"])
    elif market.get("handicap_1x2_odds"):
        odds_implied = {
            "ordinary_status": "not_open_or_unavailable",
            "handicap_no_vig": no_vig(market["handicap_1x2_odds"]),
            "handicap_label": handicap_label,
        }

    model_market_delta = None
    if isinstance(odds_implied, dict) and all(k in odds_implied for k in ["home", "draw", "away"]):
        model_market_delta = {
            k: round(probs["1x2"][k] - odds_implied[k], 4)
            for k in ["home", "draw", "away"]
        }

    return {
        "match_id": match_id,
        "kickoff_beijing": "2026-06-27 11:00",
        "home": home,
        "away": away,
        "venue": venue,
        "source_match_no": source_match_no,
        "factor_inputs": {
            "local_results_used": [
                "比利时 1-1 埃及",
                "伊朗 2-2 新西兰",
                "比利时 0-0 伊朗",
                "新西兰 1-3 埃及",
            ],
            "lineup_status": "T-75 official lineups unavailable; model uses predicted lineups.",
            "market_status": market,
            "third_round_context_weighted": True,
        },
        "weights": {
            "baseline_strength": 0.22,
            "recent_attack_defense": 0.17,
            "player_state_injury_rotation": 0.17,
            "tactical_matchup": 0.12,
            "schedule_environment": 0.05,
            "third_round_context": 0.19,
            "market_calibration": 0.08,
        },
        "team_strength_score": strengths,
        "attack_defense": attack_defense,
        "player_adjustment": "uses member-table state where available; no official T-75 XI.",
        "injury_adjustment": "unconfirmed injuries are not treated as ruled out.",
        "tactics_adjustment": tactical_notes,
        "schedule_adjustment": "same-time final group matches; live score dependency is material after half-time.",
        "market_adjustment": "China Sports Lottery odds used as calibration only; not counted as an independent team-strength signal.",
        "third_round_context": {
            "group_table_snapshot_before_match": GROUP_TABLE,
            "same_time_dependency": "Both G fixtures kick off at the same Beijing time.",
            "strategic_tempo_adjustment": "risk appetite can change sharply after the other match's first goal.",
        },
        "qualification_scenarios": scenarios,
        "motivation_profile": {
            home: "must protect or chase depending on live table; draw/win value differs by team.",
            away: "must protect or chase depending on live table; draw/win value differs by team.",
        },
        "bracket_path_expectation": "group rank affects round-of-32 path; no team should over-optimize bracket at the expense of qualification.",
        "rotation_yellow_card_risk": "third-match rotation is possible, but table pressure reduces full rotation probability.",
        "expected_goals": {"home": home_xg, "away": away_xg, "total": round(home_xg + away_xg, 2)},
        "poisson_score_matrix": matrix,
        "probabilities_1x2": probs["1x2"],
        "totals": probs["totals"],
        "top_scorelines": probs["top_scorelines"],
        "odds_implied_probability": odds_implied,
        "model_market_delta": model_market_delta,
        "red_team_status": "pass_with_cautions",
        "red_team_probability_range": red_range,
        "final_probabilities": probs["1x2"],
        "predicted_lineups": predicted_lineups,
        "key_risks": risks,
    }


GROUP_TABLE = {
    "埃及": {"played": 2, "points": 4, "gf": 4, "ga": 2, "gd": 2},
    "比利时": {"played": 2, "points": 2, "gf": 1, "ga": 1, "gd": 0},
    "伊朗": {"played": 2, "points": 2, "gf": 2, "ga": 2, "gd": 0},
    "新西兰": {"played": 2, "points": 1, "gf": 3, "ga": 5, "gd": -2},
}


def percent(x: float) -> str:
    return f"{x * 100:.1f}%"


def md_match(match: dict) -> str:
    p = match["probabilities_1x2"]
    totals = match["totals"]
    tops = ", ".join(f'{x["score"]}({percent(x["probability"])})' for x in match["top_scorelines"][:5])
    odds = match["odds_implied_probability"]
    odds_text = json.dumps(odds, ensure_ascii=False)
    return f"""# {match['home']} vs {match['away']}｜G组第三轮量化预测

- 开球：{match['kickoff_beijing']} 北京时间
- 场地：{match['venue']}
- 数据状态：T-75官方首发未公布，使用预测首发；中国体彩数据按已抓取状态校准。

## 预测结论

| 项目 | 结果 |
| --- | --- |
| 胜平负概率 | {match['home']}胜 {percent(p['home'])} / 平 {percent(p['draw'])} / {match['away']}胜 {percent(p['away'])} |
| 建议比分倾向 | {tops} |
| 预期进球 | {match['home']} {match['expected_goals']['home']:.2f} - {match['expected_goals']['away']:.2f} {match['away']} |
| 大小球 | 大2.5 {percent(totals['over_2_5'])} / 小2.5 {percent(totals['under_2_5'])} |
| 红队状态 | {match['red_team_status']} |

## 第三轮语境

{chr(10).join('- ' + item for item in match['qualification_scenarios'])}

## 战术与首发假设

- {match['home']}：{match['predicted_lineups'][match['home']]['shape']}；关键点：{match['predicted_lineups'][match['home']]['key_note']}
- {match['away']}：{match['predicted_lineups'][match['away']]['shape']}；关键点：{match['predicted_lineups'][match['away']]['key_note']}

## 赔率校准

```json
{odds_text}
```

## 主要风险

{chr(10).join('- ' + item for item in match['key_risks'])}

## 泊松Top比分

| 比分 | 概率 |
| --- | --- |
{chr(10).join(f"| {x['score']} | {percent(x['probability'])} |" for x in match['top_scorelines'])}
"""


def md_summary(payload: dict) -> str:
    rows = []
    for match in payload["matches"]:
        p = match["probabilities_1x2"]
        top = match["top_scorelines"][0]["score"]
        rows.append(
            f"| {match['home']} vs {match['away']} | {percent(p['home'])} | {percent(p['draw'])} | {percent(p['away'])} | {top} | {match['red_team_status']} |"
        )
    sim = payload["simulated_group_outcomes"]
    sim_rows = [
        f"| {team} | {percent(sim['top2_probability'][team])} | {percent(sim['advance_probability_with_third_place_heuristic'][team])} | {sim['expected_final_points'][team]:.2f} |"
        for team in GROUP_TABLE
    ]
    return f"""# G组第三轮量化预测汇总｜2026-06-25

## 预测表

| 比赛 | 主胜 | 平 | 客胜 | 首选比分 | 红队 |
| --- | ---: | ---: | ---: | --- | --- |
{chr(10).join(rows)}

## 出线模拟

| 球队 | 前二概率 | 含第三名晋级概率 | 期望积分 |
| --- | ---: | ---: | ---: |
{chr(10).join(sim_rows)}

## 关键风险

- 比利时纸面实力高，但前两轮只有1球，转化率风险必须保留。
- 埃及4分不是“无欲无求”，但平局价值较高，比赛节奏可能被压低。
- 伊朗与新西兰都存在必须争胜后的尾段开放风险，比分分布尾部不能忽略。
- 新西兰 vs 比利时普通胜平负未开售，仅采用让球市场作弱校准。

## 来源

- Sky Sports Group G fixture/table guide: https://www.skysports.com/football/news/12098/13543098/world-cup-2026-group-g-guide-fixtures-schedule-standings-and-odds-for-belgium-egypt-iran-and-new-zealand
- 中国足彩网竞彩混合页: https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
"""


def main() -> None:
    THREAD_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    MATCH_DIR.mkdir(parents=True, exist_ok=True)

    matches = [
        match_payload(
            match_id="G-R3-20260627-NZL-BEL",
            home="新西兰",
            away="比利时",
            venue="Vancouver, Canada",
            source_match_no="周六104",
            handicap_label="新西兰 +2",
            market={
                "source": "中国足彩网竞彩混合页",
                "captured_at": GENERATED_AT,
                "ordinary_1x2_status": "未开售",
                "ordinary_1x2_odds": None,
                "handicap_1x2_odds": [2.25, 3.90, 2.32],
                "handicap_label": "新西兰 +2",
            },
            home_xg=0.88,
            away_xg=1.88,
            strengths={"新西兰": 62.0, "比利时": 81.5},
            attack_defense={
                "新西兰_attack": 64.0,
                "新西兰_defense": 57.0,
                "比利时_attack": 79.0,
                "比利时_defense": 77.0,
            },
            predicted_lineups={
                "新西兰": {
                    "shape": "5-3-2 / 5-4-1",
                    "key_note": "先保禁区密度，依赖伍德支点、边路传中和定位球；若另一场不利会提前压上。",
                },
                "比利时": {
                    "shape": "4-2-3-1",
                    "key_note": "多库与特罗萨德拉宽，德布劳内找肋部直塞；卢卡库或德凯特拉雷承担禁区终结。",
                },
            },
            tactical_notes=[
                "比利时需要更早提升禁区触球质量，不能只停留在控球和外围压制。",
                "新西兰前两轮进球不少但防线被埃及下半场打穿，面对边锋单点会承压。",
            ],
            scenarios=[
                "比利时2分，赢球基本锁定前二或至少高质量第三；打平只有3分，晋级依赖其他组。",
                "新西兰1分，只有赢球才能把积分推到4分并争取前二/第三名通道。",
                "若埃及领先伊朗，比利时可更稳；若伊朗领先，比利时会被迫继续争净胜球。",
            ],
            risks=[
                "比利时前两轮1球，强队名气与实际终结之间有偏差。",
                "新西兰若先丢球会开放，尾段可能把比分推向2-2或1-3。",
                "普通胜平负未开售，市场校准权重低于埃及 vs 伊朗。",
            ],
            red_range={"home": [0.14, 0.20], "draw": [0.20, 0.25], "away": [0.56, 0.64]},
        ),
        match_payload(
            match_id="G-R3-20260627-EGY-IRN",
            home="埃及",
            away="伊朗",
            venue="Seattle, USA",
            source_match_no="周六105",
            handicap_label="埃及 -1",
            market={
                "source": "中国足彩网竞彩混合页",
                "captured_at": GENERATED_AT,
                "ordinary_1x2_status": "available",
                "ordinary_1x2_odds": [2.32, 2.50, 3.35],
                "handicap_1x2_odds": [5.50, 3.80, 1.46],
                "handicap_label": "埃及 -1",
            },
            home_xg=1.05,
            away_xg=0.85,
            strengths={"埃及": 74.0, "伊朗": 71.0},
            attack_defense={
                "埃及_attack": 74.5,
                "埃及_defense": 70.5,
                "伊朗_attack": 69.0,
                "伊朗_defense": 72.0,
            },
            predicted_lineups={
                "埃及": {
                    "shape": "4-2-3-1 / 4-3-3",
                    "key_note": "萨拉赫右路内收创造终结点，特雷泽盖/齐科后插上冲击二点。",
                },
                "伊朗": {
                    "shape": "4-1-4-1 / 4-2-3-1",
                    "key_note": "先压低中路空间，塔雷米反击和定位球是主要破局手段。",
                },
            },
            tactical_notes=[
                "埃及4分但仍要避免掉到第三，平局价值会降低比赛节奏。",
                "伊朗2分需要胜利更主动，但若另一场新西兰领先，比利时被拖住时伊朗对平局的价值也会变化。",
            ],
            scenarios=[
                "埃及4分，平局到5分基本晋级，赢球大概率小组第一。",
                "伊朗2分，赢球到5分即可主动晋级；平局到3分大概率只能看第三名横向比较。",
                "若比利时早早领先新西兰，伊朗需要更早冒险；若另一场僵持，伊朗可能先保持低比分。",
            ],
            risks=[
                "竞彩普通胜平负给到高平局水位，模型不能把埃及第二轮强势简单外推成大胜。",
                "伊朗两连平说明韧性强，1-1和0-0权重需要保留。",
                "埃及如果过早转入保守，1-0/1-1会比2-0更自然。",
            ],
            red_range={"home": [0.36, 0.43], "draw": [0.29, 0.35], "away": [0.24, 0.31]},
        ),
    ]

    payload = {
        "schema_version": "worldcup_round3_prediction_v2",
        "generated_at": GENERATED_AT,
        "group": "G",
        "round": "group_stage_round_3",
        "source_threads_dispatched": {
            "data_collector": "019eb053-ef96-7a22-9685-4602ba252b10",
            "tactics_coach": "019eb05a-a3ee-7023-9c89-42d9786d4685",
            "modeler": "019eb079-bed5-7342-9dfd-d1f448caa0dc",
            "red_team": "019eb05b-66db-7000-8a84-c453dece7ac3",
            "summary_commentator": "019eb06a-ae34-7c00-b1fe-9e35ff23c848",
        },
        "source_urls": [
            "https://www.skysports.com/football/news/12098/13543098/world-cup-2026-group-g-guide-fixtures-schedule-standings-and-odds-for-belgium-egypt-iran-and-new-zealand",
            "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
        ],
        "group_table_snapshot": GROUP_TABLE,
        "matches": matches,
    }
    payload["simulated_group_outcomes"] = simulate_group(GROUP_TABLE, matches)
    payload["validation_notes"] = [
        "Poisson 1X2 probabilities computed from final xG over 0-14 goal range.",
        "Score matrix persisted for 0-0 through 5-5 with tail probability.",
        "New Zealand vs Belgium ordinary China Sports Lottery market was not open; handicap odds used with reduced calibration confidence.",
    ]

    json_path = OUT_DIR / "g-group-round3-quant-prediction-20260625.json"
    summary_path = MATCH_DIR / "G组第三轮量化预测汇总_20260625.md"
    summary_json_path = MATCH_DIR / "G组第三轮量化预测汇总_20260625.json"
    single_paths = [
        MATCH_DIR / "2026-06-27_新西兰_vs_比利时_量化预测.md",
        MATCH_DIR / "2026-06-27_埃及_vs_伊朗_量化预测.md",
    ]

    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    summary_json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    summary_path.write_text(md_summary(payload), encoding="utf-8")
    for path, match in zip(single_paths, matches):
        path.write_text(md_match(match), encoding="utf-8")

    status_line = (
        f"\n- {GENERATED_AT} 主线程完成 G组第三轮预测：已派发数据/战术/模型/红队/汇总线程，"
        f"生成 {json_path.name} 与两场单场 Markdown；T-75首发未公布，采用预测首发；"
        f"竞彩校准：新西兰vs比利时普通未开售、让球+2已采集，埃及vs伊朗普通/让球均已采集。\n"
    )
    STATUS_FILE.write_text(STATUS_FILE.read_text(encoding="utf-8") + status_line, encoding="utf-8")

    print(json.dumps({
        "json": str(json_path),
        "summary": str(summary_path),
        "matches": [str(p) for p in single_paths],
        "status_file": str(STATUS_FILE),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
