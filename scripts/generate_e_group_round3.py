from __future__ import annotations

import json
import math
from datetime import datetime, timezone, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CAPTURED_AT = datetime.now(timezone(timedelta(hours=8))).replace(microsecond=0).isoformat()


def poisson_pmf(lam: float, max_goals: int = 5) -> list[float]:
    return [math.exp(-lam) * (lam ** k) / math.factorial(k) for k in range(max_goals + 1)]


def score_matrix(home_xg: float, away_xg: float, max_goals: int = 5) -> dict:
    hp = poisson_pmf(home_xg, max_goals)
    ap = poisson_pmf(away_xg, max_goals)
    matrix = {}
    mass = 0.0
    for h, hpv in enumerate(hp):
        row = {}
        for a, apv in enumerate(ap):
            p = hpv * apv
            row[str(a)] = round(p, 6)
            mass += p
        matrix[str(h)] = row
    return {"goals_0_to_5": matrix, "tail_probability": round(1 - mass, 6)}


def outcome_probs(home_xg: float, away_xg: float, max_goals: int = 10) -> dict:
    hp = poisson_pmf(home_xg, max_goals)
    ap = poisson_pmf(away_xg, max_goals)
    hw = dr = aw = over25 = under25 = 0.0
    scores = []
    for h, hpv in enumerate(hp):
        for a, apv in enumerate(ap):
            p = hpv * apv
            if h > a:
                hw += p
            elif h == a:
                dr += p
            else:
                aw += p
            if h + a > 2.5:
                over25 += p
            else:
                under25 += p
            scores.append((p, h, a))
    mass = sum(hp) * sum(ap)
    tail = max(0.0, 1 - mass)
    total = hw + dr + aw
    scores.sort(reverse=True)
    return {
        "home_win": round(hw / total, 4),
        "draw": round(dr / total, 4),
        "away_win": round(aw / total, 4),
        "over_2_5": round(over25 / mass, 4),
        "under_2_5": round(under25 / mass, 4),
        "top_scorelines": [
            {"score": f"{h}-{a}", "probability": round(p / mass, 4)}
            for p, h, a in scores[:5]
        ],
        "tail_probability_10_plus": round(tail, 6),
    }


def normalized_market(odds: list[float]) -> dict:
    raw = [1 / o for o in odds]
    overround = sum(raw)
    return {
        "odds": odds,
        "overround": round(overround, 4),
        "normalized": [round(v / overround, 4) for v in raw],
    }


def capped_poisson(lam: float, max_goals: int = 7) -> list[float]:
    probs = poisson_pmf(lam, max_goals)
    probs[-1] += max(0.0, 1 - sum(probs))
    return probs


def rank_table(table: dict[str, dict]) -> list[str]:
    return sorted(
        table,
        key=lambda t: (
            table[t]["pts"],
            table[t]["gf"] - table[t]["ga"],
            table[t]["gf"],
        ),
        reverse=True,
    )


def simulate_group(matches: list[dict], max_goals: int = 7) -> dict:
    base = {
        "德国": {"pts": 6, "gf": 9, "ga": 2},
        "科特迪瓦": {"pts": 3, "gf": 2, "ga": 2},
        "厄瓜多尔": {"pts": 1, "gf": 0, "ga": 1},
        "库拉索": {"pts": 1, "gf": 1, "ga": 7},
    }
    finish = {team: [0.0, 0.0, 0.0, 0.0] for team in base}
    avg_pts = {team: 0.0 for team in base}

    distributions = []
    for match in matches:
        hp = capped_poisson(match["home_xg"], max_goals)
        ap = capped_poisson(match["away_xg"], max_goals)
        scores = []
        for h, hpv in enumerate(hp):
            for a, apv in enumerate(ap):
                scores.append((h, a, hpv * apv))
        distributions.append(scores)

    for h1, a1, p1 in distributions[0]:
        for h2, a2, p2 in distributions[1]:
            p = p1 * p2
            table = json.loads(json.dumps(base))
            for match, h, a in [(matches[0], h1, a1), (matches[1], h2, a2)]:
                home, away = match["home"], match["away"]
                table[home]["gf"] += h
                table[home]["ga"] += a
                table[away]["gf"] += a
                table[away]["ga"] += h
                if h > a:
                    table[home]["pts"] += 3
                elif h == a:
                    table[home]["pts"] += 1
                    table[away]["pts"] += 1
                else:
                    table[away]["pts"] += 3
            ranking = rank_table(table)
            for idx, team in enumerate(ranking):
                finish[team][idx] += p
            for team in table:
                avg_pts[team] += table[team]["pts"] * p

    return {
        "method": "deterministic enumeration of independent Poisson scorelines, 0-6 plus 7+ bucket; tiebreakers modeled as points, goal difference, goals for. Later FIFA tiebreakers are not modeled.",
        "teams": [
            {
                "team": team,
                "avg_points": round(avg_pts[team], 3),
                "finish_1st": round(finish[team][0], 4),
                "finish_2nd": round(finish[team][1], 4),
                "finish_3rd": round(finish[team][2], 4),
                "finish_4th": round(finish[team][3], 4),
                "top2_probability": round(finish[team][0] + finish[team][1], 4),
            }
            for team in ["德国", "科特迪瓦", "厄瓜多尔", "库拉索"]
        ],
    }


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


matches = [
    {
        "match_id": "2026-06-25_E组_R3_厄瓜多尔_vs_德国",
        "match": "厄瓜多尔 vs 德国",
        "home": "厄瓜多尔",
        "away": "德国",
        "kickoff": "2026-06-25 21:40",
        "home_xg": 0.90,
        "away_xg": 1.40,
        "representative_score": "0-1",
        "market": {
            "zgzcw_match_no": "周四055",
            "zgzcw_1x2": normalized_market([4.36, 4.05, 1.53]),
            "zgzcw_handicap_plus1_home": normalized_market([2.14, 3.45, 2.69]),
            "sina_1x2_cross_check": normalized_market([4.36, 4.05, 1.53]),
            "market_note": "中国足彩网隐藏字段 ht_2040291=value=\"4.36 4.05 1.53|2.14 3.45 2.69\"；新浪口径与此一致，德国方向明显偏热。",
        },
        "factor_inputs": {
            "baseline_strength": {"厄瓜多尔": 72, "德国": 87},
            "attack": {"厄瓜多尔": 63, "德国": 86},
            "defense": {"厄瓜多尔": 76, "德国": 78},
            "player_state": {"厄瓜多尔": 63, "德国": 76},
            "third_round_context": {"厄瓜多尔": "+6 must-win", "德国": "-2 rotation/draw-management"},
            "tactical_adjustment": {"厄瓜多尔": "+2 press and physicality, -3 conversion risk", "德国": "+4 chance quality, -2 possible rotation"},
            "market_adjustment": {"厄瓜多尔": "-2", "德国": "+1; red-team downweight because Germany are already almost through"},
            "rotation_risk": {"厄瓜多尔": "low", "德国": "medium-high"},
            "motivation_profile": {"厄瓜多尔": "must-win but low conversion base", "德国": "draw/top-place management"},
            "strategic_tempo_adjustment": "德国领先或同步局势有利时，节奏从压制转为控盘；概率主要让给平局而不是厄瓜多尔主胜。",
        },
        "risk_flags": [
            "德国已基本锁定出线，存在轮换和控节奏风险。",
            "厄瓜多尔两场0进球，必须进攻但终结效率仍是硬伤。",
            "T-75官方首发未出，只能使用预计首发与状态值。",
            "模型从原始 1.05/1.62 xG 下修到 0.90/1.40，红队认为德国热度与轮换风险需要压回。",
        ],
    },
    {
        "match_id": "2026-06-25_E组_R3_库拉索_vs_科特迪瓦",
        "match": "库拉索 vs 科特迪瓦",
        "home": "库拉索",
        "away": "科特迪瓦",
        "kickoff": "2026-06-25 21:40",
        "home_xg": 0.68,
        "away_xg": 1.95,
        "representative_score": "0-1",
        "market": {
            "zgzcw_match_no": "周四056",
            "zgzcw_1x2": None,
            "zgzcw_1x2_status": "未开售/未显示完整胜平负",
            "zgzcw_handicap_plus2_home": normalized_market([2.40, 3.85, 2.21]),
            "market_note": "普通胜平负缺失，+2让球盘提示大胜路径被市场重视；红队将其解释为让球保护/尾部风险信号，而非继续强化科特迪瓦客胜。",
        },
        "factor_inputs": {
            "baseline_strength": {"库拉索": 54, "科特迪瓦": 77},
            "attack": {"库拉索": 50, "科特迪瓦": 77},
            "defense": {"库拉索": 43, "科特迪瓦": 72},
            "player_state": {"库拉索": 64, "科特迪瓦": 72},
            "third_round_context": {"库拉索": "+5 must-win but open-game risk", "科特迪瓦": "+3 draw enough, second-place control"},
            "tactical_adjustment": {"库拉索": "+2 goalkeeper rebound, -5 chasing exposure", "科特迪瓦": "+5 transition/aerial/pace mismatch"},
            "market_adjustment": {"库拉索": "+1 handicap protection", "科特迪瓦": "+2 strength edge, capped because draw is enough"},
            "rotation_risk": {"库拉索": "low", "科特迪瓦": "medium tempo-management"},
            "motivation_profile": {"库拉索": "must-win, but GD gap makes chase fragile", "科特迪瓦": "draw usually enough; win preferred but not all-out"},
            "strategic_tempo_adjustment": "科特迪瓦若先领先或德国同步领先，进攻强度会下降，0-1/0-2权重高于0-3。",
        },
        "risk_flags": [
            "库拉索上一场0-0反弹主要依赖门将高扑救，不能线性延续。",
            "科特迪瓦打平大概率足够，若早早领先可能降低进攻强度。",
            "科特迪瓦 player_state 顶层结构与其他队不完全一致，成员表可补足但需后续标准化。",
            "模型从原始 0.62/2.24 xG 下修到 0.68/1.95，红队认为科特迪瓦平局够用不能按无条件强攻建模。",
        ],
    },
]

weights = {
    "baseline_strength": 0.22,
    "attack_defense": 0.20,
    "player_state_availability": 0.16,
    "tactical_matchup": 0.14,
    "third_round_tournament_context": 0.13,
    "schedule_environment": 0.05,
    "market_signal": 0.10,
}

for match in matches:
    probs = outcome_probs(match["home_xg"], match["away_xg"])
    match["expected_goals"] = {"home": match["home_xg"], "away": match["away_xg"]}
    match["probabilities_1x2"] = {
        f"{match['home']}_win": probs["home_win"],
        "draw": probs["draw"],
        f"{match['away']}_win": probs["away_win"],
    }
    match["totals_probabilities"] = {"over_2_5": probs["over_2_5"], "under_2_5": probs["under_2_5"]}
    match["top_scorelines"] = probs["top_scorelines"]
    match["poisson_score_matrix"] = score_matrix(match["home_xg"], match["away_xg"])
    match["confidence_interval"] = "1X2 single-outcome +/- 0.07; xG +/- 0.25 because lineups unavailable"

group_sim = simulate_group(matches)

prediction = {
    "phase": "group_e_round3_prediction",
    "status": "red_team_revise_applied",
    "captured_at": CAPTURED_AT,
    "model_version": "worldcup-quant-v2026.06-third-round-context",
    "group": "E",
    "fixtures": [m["match"] for m in matches],
    "current_table": [
        {"rank": 1, "team": "德国", "pts": 6, "gf": 9, "ga": 2, "gd": 7},
        {"rank": 2, "team": "科特迪瓦", "pts": 3, "gf": 2, "ga": 2, "gd": 0},
        {"rank": 3, "team": "厄瓜多尔", "pts": 1, "gf": 0, "ga": 1, "gd": -1},
        {"rank": 4, "team": "库拉索", "pts": 1, "gf": 1, "ga": 7, "gd": -6},
    ],
    "tiebreaker_note": "模型按积分、净胜球、进球数排序；后续同分小项/公平竞赛未量化，作为风险披露。",
    "factor_weights": weights,
    "matches": matches,
    "simulated_group_outcomes": group_sim,
    "source_log": [
        {
            "source": "中国足彩网竞彩混合投注页面",
            "url": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
            "captured_at": CAPTURED_AT,
            "supports_fields": ["周四055", "周四056", "胜平负", "让球胜平负"],
        },
        {
            "source": "新浪世界杯赛程/竞彩页面",
            "url": "https://match2026.sina.com.cn/worldcup/team/ligne/8582051.shtml",
            "captured_at": CAPTURED_AT,
            "supports_fields": ["厄瓜多尔 vs 德国赛程", "竞彩赔率交叉核验"],
        },
        {
            "source": "本地E组第二轮复盘与player_state",
            "url": "K:/worldcup/比赛/已完成比赛/小组赛/E组/E组第二轮复盘.md",
            "captured_at": CAPTURED_AT,
            "supports_fields": ["前两轮赛果", "模型误差修正", "成员表/player_state联动状态"],
        },
    ],
    "red_team_status": "revise_applied",
    "red_team_revision": {
        "verdict": "revise",
        "thread_output": "K:/worldcup/data/thread_outputs/e-group-round3-20260625/red-team.md",
        "applied_changes": [
            "厄瓜多尔 vs 德国从原始 1.05/1.62 xG 下修为 0.90/1.40，发布概率转为 24.2% / 27.2% / 48.6%。",
            "库拉索 vs 科特迪瓦从原始 0.62/2.24 xG 修正为 0.68/1.95，发布概率转为 12.1% / 20.4% / 67.5%。",
            "德国与科特迪瓦的市场正向加成降级，第三轮轮换、控节奏、平局够用因子显式写入。",
        ],
    },
}

out_json = ROOT / "data" / "outputs" / "match_predictions" / "e-group-round3-quant-prediction-20260625.json"
write_text(out_json, json.dumps(prediction, ensure_ascii=False, indent=2))

summary_lines = [
    "---",
    "phase: group_e_round3_prediction",
    "group: E",
    "round: 3",
    f"captured_at: {CAPTURED_AT}",
    "status: red_team_revise_applied",
    "---",
    "",
    "# E组第三轮量化预测汇总",
    "",
    "## 小组形势",
    "",
    "| 排名 | 球队 | 分 | 进/失 | 净胜球 | 第三轮状态 |",
    "| --- | --- | ---: | --- | ---: | --- |",
    "| 1 | 德国 | 6 | 9/2 | +7 | 平局基本锁第一；需防轮换与控节奏 |",
    "| 2 | 科特迪瓦 | 3 | 2/2 | 0 | 不败大概率出线；赢球仍可压住第三方风险 |",
    "| 3 | 厄瓜多尔 | 1 | 0/1 | -1 | 必须赢德国才有强出线路径 |",
    "| 4 | 库拉索 | 1 | 1/7 | -6 | 必须赢科特迪瓦，且净胜球劣势很大 |",
    "",
    "## 预测表",
    "",
    "| 比赛 | 竞彩编号 | xG | 胜平负概率 | 大/小2.5 | Top比分 | 代表比分 |",
    "| --- | --- | --- | --- | --- | --- | --- |",
]

for m in matches:
    p = m["probabilities_1x2"]
    keys = list(p.keys())
    tops = "、".join([f"{s['score']}({s['probability']:.1%})" for s in m["top_scorelines"]])
    summary_lines.append(
        f"| {m['match']} | {m['market']['zgzcw_match_no']} | "
        f"{m['home']} {m['home_xg']:.2f} / {m['away']} {m['away_xg']:.2f} | "
        f"{m['home']}胜 {p[keys[0]]:.1%} / 平 {p['draw']:.1%} / {m['away']}胜 {p[keys[2]]:.1%} | "
        f"大 {m['totals_probabilities']['over_2_5']:.1%} / 小 {m['totals_probabilities']['under_2_5']:.1%} | "
        f"{tops} | {m['representative_score']} |"
    )

summary_lines += [
    "",
    "## 组内模拟",
    "",
    "| 球队 | 预计积分 | 第一 | 第二 | 前二 | 第三 | 第四 |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
]
for team in group_sim["teams"]:
    summary_lines.append(
        f"| {team['team']} | {team['avg_points']:.2f} | {team['finish_1st']:.1%} | "
        f"{team['finish_2nd']:.1%} | {team['top2_probability']:.1%} | "
        f"{team['finish_3rd']:.1%} | {team['finish_4th']:.1%} |"
    )

summary_lines += [
    "",
    "## 赔率与市场",
    "",
    "- 周四055 厄瓜多尔 vs 德国：中国足彩网胜平负 4.36 / 4.05 / 1.53，归一后约 20.3% / 21.9% / 57.8%；让球(+1) 2.14 / 3.45 / 2.69，归一后约 41.4% / 25.7% / 32.9%。新浪核验口径与足彩网一致，德国方向明显偏热。",
    "- 周四056 库拉索 vs 科特迪瓦：中国足彩网普通胜平负未开售；让球(+2) 2.40 / 3.85 / 2.21，归一后约 36.9% / 23.0% / 40.1%。",
    "- 当前不是T-75官方首发窗口，竞彩执行层面仍应标记为 `discussion_only`，不写稳胆或重注。",
    "",
    "## 红队修正",
    "",
    "- 已采用红队 `verdict=revise`：德国客胜从原始 50.6% 下修到 48.6%，主要增加平局权重。",
    "- 科特迪瓦客胜从原始 74.4% 下修到 67.5%，原因是平局大概率够用，+2盘更像大胜尾部风险信号。",
    "- 两场仍保留 Poisson Top 比分输出，但竞彩执行层面维持 `discussion_only`，等待T-75官方首发。",
]

summary_path = ROOT / "比赛" / "未开始比赛" / "小组赛" / "E组" / "E组第三轮量化预测汇总_20260625.md"
write_text(summary_path, "\n".join(summary_lines) + "\n")

for m in matches:
    stem = "2026-06-25_" + m["match"].replace(" vs ", "_vs_") + "_量化预测.md"
    lines = [
        "---",
        "phase: match_prediction",
        "group: E",
        "round: 3",
        f"match: {m['match']}",
        f"captured_at: {CAPTURED_AT}",
        "status: red_team_revise_applied",
        "---",
        "",
        f"# {m['match']} 量化预测",
        "",
        "## 结论",
        "",
        f"- 代表比分：{m['representative_score']}",
        f"- xG：{m['home']} {m['home_xg']:.2f} / {m['away']} {m['away_xg']:.2f}",
        f"- 胜平负：{m['home']}胜 {list(m['probabilities_1x2'].values())[0]:.1%}，平 {m['probabilities_1x2']['draw']:.1%}，{m['away']}胜 {list(m['probabilities_1x2'].values())[2]:.1%}",
        f"- 大小2.5：大 {m['totals_probabilities']['over_2_5']:.1%}，小 {m['totals_probabilities']['under_2_5']:.1%}",
        "",
        "## Top比分",
        "",
        "| 比分 | 概率 |",
        "| --- | ---: |",
    ]
    for s in m["top_scorelines"]:
        lines.append(f"| {s['score']} | {s['probability']:.1%} |")
    lines += [
        "",
        "## 第三轮因子",
        "",
        json.dumps(m["factor_inputs"], ensure_ascii=False, indent=2),
        "",
        "## 赔率状态",
        "",
        json.dumps(m["market"], ensure_ascii=False, indent=2),
        "",
        "## 风险",
        "",
    ]
    lines.extend([f"- {flag}" for flag in m["risk_flags"]])
    lines += [
        "",
        "## 泊松矩阵",
        "",
        "完整 JSON 见 `K:/worldcup/data/outputs/match_predictions/e-group-round3-quant-prediction-20260625.json`。",
    ]
    write_text(ROOT / "比赛" / "未开始比赛" / "小组赛" / "E组" / stem, "\n".join(lines) + "\n")

print(out_json)
print(summary_path)
