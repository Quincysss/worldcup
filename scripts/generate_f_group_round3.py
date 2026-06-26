from __future__ import annotations

import json
import math
from copy import deepcopy
from datetime import datetime, timedelta, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
NOW = datetime.now(timezone(timedelta(hours=8))).isoformat(timespec="seconds")


TEAMS = ["荷兰", "日本", "瑞典", "突尼斯"]

BASE_TABLE = {
    "荷兰": {"pts": 4, "gf": 7, "ga": 3},
    "日本": {"pts": 4, "gf": 6, "ga": 2},
    "瑞典": {"pts": 3, "gf": 6, "ga": 6},
    "突尼斯": {"pts": 0, "gf": 1, "ga": 9},
}

PREVIOUS_RESULTS = [
    {"match": "瑞典 5-1 突尼斯", "note": "瑞典攻击端打开，但防守样本仍不稳定。"},
    {"match": "荷兰 2-2 日本", "note": "日本能在强队对抗中保持节奏，荷兰领先后管理比赛仍有尾部风险。"},
    {"match": "荷兰 5-1 瑞典", "note": "荷兰边路和二线攻击压制瑞典，瑞典被迫争胜时身后空间暴露。"},
    {"match": "突尼斯 0-4 日本", "note": "突尼斯连续大比分失利，后场抗压和心理尾部风险升高。"},
]


def pmf(lam: float, max_goals: int) -> list[float]:
    return [math.exp(-lam) * lam**goals / math.factorial(goals) for goals in range(max_goals + 1)]


def no_vig(odds: list[float]) -> dict:
    raw = [1 / odd for odd in odds]
    total = sum(raw)
    return {
        "odds": odds,
        "raw_inverse": [round(value, 6) for value in raw],
        "overround": round(total, 6),
        "normalized_probability": [round(value / total, 4) for value in raw],
    }


def poisson_matrix(home_xg: float, away_xg: float, max_goals: int = 5) -> dict:
    home_probs = pmf(home_xg, max_goals)
    away_probs = pmf(away_xg, max_goals)
    matrix: dict[str, dict[str, float]] = {}
    mass = 0.0
    for home_goals, hp in enumerate(home_probs):
        matrix[str(home_goals)] = {}
        for away_goals, ap in enumerate(away_probs):
            probability = hp * ap
            matrix[str(home_goals)][str(away_goals)] = round(probability, 6)
            mass += probability
    return {"goals_0_to_5": matrix, "covered_mass": round(mass, 6), "tail_probability": round(max(0.0, 1 - mass), 6)}


def poisson_summary(home_xg: float, away_xg: float, max_goals: int = 14) -> dict:
    home_probs = pmf(home_xg, max_goals)
    away_probs = pmf(away_xg, max_goals)
    mass = sum(home_probs) * sum(away_probs)
    home_win = draw = away_win = over25 = under25 = btts = 0.0
    scorelines = []

    for home_goals, hp in enumerate(home_probs):
        for away_goals, ap in enumerate(away_probs):
            probability = hp * ap
            if home_goals > away_goals:
                home_win += probability
            elif home_goals == away_goals:
                draw += probability
            else:
                away_win += probability
            if home_goals + away_goals >= 3:
                over25 += probability
            else:
                under25 += probability
            if home_goals > 0 and away_goals > 0:
                btts += probability
            scorelines.append((probability, home_goals, away_goals))

    total = home_win + draw + away_win
    scorelines.sort(reverse=True)
    return {
        "poisson_formula": (
            "P(home=i, away=j)=exp(-lambda_home)*lambda_home^i/i! * "
            "exp(-lambda_away)*lambda_away^j/j!"
        ),
        "probabilities_1x2": {
            "home_win": round(home_win / total, 4),
            "draw": round(draw / total, 4),
            "away_win": round(away_win / total, 4),
        },
        "totals_probabilities": {
            "over_2_5": round(over25 / mass, 4),
            "under_2_5": round(under25 / mass, 4),
            "btts_yes": round(btts / mass, 4),
            "btts_no": round(1 - btts / mass, 4),
        },
        "top_scorelines": [
            {"score": f"{home_goals}-{away_goals}", "probability": round(probability / mass, 4)}
            for probability, home_goals, away_goals in scorelines[:8]
        ],
    }


def capped_distribution(lam: float, max_goals: int = 7) -> list[float]:
    probs = pmf(lam, max_goals)
    probs[-1] += max(0.0, 1 - sum(probs))
    return probs


def rank(table: dict[str, dict[str, int]]) -> list[str]:
    return sorted(
        table,
        key=lambda team: (
            table[team]["pts"],
            table[team]["gf"] - table[team]["ga"],
            table[team]["gf"],
        ),
        reverse=True,
    )


def third_place_advancement_probability(points: int, goal_difference: int) -> float:
    if points >= 6:
        return 0.98
    if points == 5:
        return 0.92
    if points == 4:
        if goal_difference >= 2:
            return 0.86
        if goal_difference >= 0:
            return 0.78
        return 0.64
    if points == 3:
        if goal_difference >= 2:
            return 0.52
        if goal_difference >= 0:
            return 0.40
        if goal_difference >= -2:
            return 0.25
        return 0.12
    return 0.01


def simulate_group(matches: list[dict], max_goals: int = 7) -> dict:
    distributions = []
    for match in matches:
        final_xg = match["expected_goals"]["final"]
        home_probs = capped_distribution(final_xg["home"], max_goals)
        away_probs = capped_distribution(final_xg["away"], max_goals)
        scores = []
        for home_goals, hp in enumerate(home_probs):
            for away_goals, ap in enumerate(away_probs):
                scores.append((home_goals, away_goals, hp * ap))
        distributions.append(scores)

    finish = {team: [0.0, 0.0, 0.0, 0.0] for team in TEAMS}
    top2 = {team: 0.0 for team in TEAMS}
    advance = {team: 0.0 for team in TEAMS}
    avg_points = {team: 0.0 for team in TEAMS}
    branch_weights = {
        "日本胜瑞典": 0.0,
        "日本平瑞典": 0.0,
        "瑞典胜日本": 0.0,
        "荷兰胜突尼斯": 0.0,
        "荷兰平突尼斯": 0.0,
        "突尼斯胜荷兰": 0.0,
    }

    for h1, a1, p1 in distributions[0]:
        if h1 > a1:
            branch_weights["日本胜瑞典"] += p1
        elif h1 == a1:
            branch_weights["日本平瑞典"] += p1
        else:
            branch_weights["瑞典胜日本"] += p1

        for h2, a2, p2 in distributions[1]:
            if h2 < a2:
                branch_weights["荷兰胜突尼斯"] += p1 * p2
            elif h2 == a2:
                branch_weights["荷兰平突尼斯"] += p1 * p2
            else:
                branch_weights["突尼斯胜荷兰"] += p1 * p2

            probability = p1 * p2
            table = deepcopy(BASE_TABLE)
            for match, home_goals, away_goals in ((matches[0], h1, a1), (matches[1], h2, a2)):
                home = match["home"]
                away = match["away"]
                table[home]["gf"] += home_goals
                table[home]["ga"] += away_goals
                table[away]["gf"] += away_goals
                table[away]["ga"] += home_goals
                if home_goals > away_goals:
                    table[home]["pts"] += 3
                elif home_goals == away_goals:
                    table[home]["pts"] += 1
                    table[away]["pts"] += 1
                else:
                    table[away]["pts"] += 3

            ordered = rank(table)
            for index, team in enumerate(ordered):
                finish[team][index] += probability
                avg_points[team] += table[team]["pts"] * probability
            for team in ordered[:2]:
                top2[team] += probability
                advance[team] += probability
            third_team = ordered[2]
            third_data = table[third_team]
            third_gd = third_data["gf"] - third_data["ga"]
            advance[third_team] += probability * third_place_advancement_probability(third_data["pts"], third_gd)

    teams = []
    for team in TEAMS:
        teams.append(
            {
                "team": team,
                "avg_points": round(avg_points[team], 3),
                "finish_1st": round(finish[team][0], 4),
                "finish_2nd": round(finish[team][1], 4),
                "finish_3rd": round(finish[team][2], 4),
                "finish_4th": round(finish[team][3], 4),
                "top2_probability": round(top2[team], 4),
                "advance_probability": round(min(1.0, advance[team]), 4),
            }
        )

    return {
        "method": (
            "Independent Poisson enumeration, 0-6 plus 7+ bucket. Ranking uses points, "
            "goal difference and goals for; later FIFA tie-breakers are flagged but not modeled. "
            "Third-place advancement is a heuristic because it depends on other groups."
        ),
        "branch_weights": {key: round(value, 4) for key, value in branch_weights.items()},
        "teams": teams,
    }


MATCH_INPUTS = [
    {
        "match_id": "2026-06-26_F_R3_日本_vs_瑞典",
        "match_no": "周四058",
        "kickoff_beijing": "2026-06-26 07:00",
        "stadium": "Dallas Stadium",
        "home": "日本",
        "away": "瑞典",
        "expected_goals": {
            "baseline": {"home": 1.34, "away": 1.00},
            "adjustments": [
                {"factor": "日本不败即大概率前二", "home": -0.03, "away": -0.02, "reason": "日本不会无条件拉开阵型。"},
                {"factor": "日本仍有争第一动机", "home": 0.05, "away": 0.00, "reason": "荷兰若未早早领先，日本会继续争进球和净胜球。"},
                {"factor": "瑞典必须赢球", "home": 0.08, "away": 0.10, "reason": "瑞典后段主动压上，双方尾部概率同时抬升。"},
                {"factor": "瑞典定位球/高点", "home": 0.00, "away": 0.06, "reason": "这是瑞典最清晰的非阵地战破局路径。"},
                {"factor": "日本转换和边路衔接", "home": 0.08, "away": -0.02, "reason": "瑞典追胜时边后卫身后空间会变成日本反击入口。"},
                {"factor": "市场校准", "home": 0.00, "away": 0.00, "reason": "当前体彩同源赔率更偏日本，但模型避免把市场与实力重复计数。"},
            ],
            "final": {"home": 1.52, "away": 1.12},
        },
        "market": {
            "source": "中国足彩网竞彩混合页",
            "url": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
            "captured_at": "2026-06-25 current page via main thread web open",
            "ordinary_1x2": no_vig([1.60, 3.57, 4.45]),
            "handicap_1x2": {"handicap": "日本 -1", **no_vig([3.00, 3.70, 1.91])},
            "cross_check": "新浪/懂球帝结构化同源赔率待采集线程回填；当前先以中国足彩网为主。",
        },
        "third_round_context": {
            "current_state": "日本4分、净胜球+4；瑞典3分、净胜球0。",
            "japan_path": "胜则7分争F1；平则5分基本前二；负则4分，大概率落到第三名候选，仍要看净胜球和其他小组。",
            "sweden_path": "胜则6分大概率前二；平则4分第三名候选；负则3分第三名质量偏弱。",
            "same_kickoff_dependency": "若荷兰早早大比分领先，日本争F1压力上升；若荷兰迟迟不领先，日本接受平局的倾向会增强。瑞典无论另一场如何都不能把平局当作好结果。",
        },
        "tactical_read": [
            "日本更适合把比赛切成可控节奏：前60分钟不盲目对攻，靠中场传导和边路二过一找机会。",
            "瑞典必须制造更多禁区触球，定位球、远端传中和二点球是最可能打穿日本的方式。",
            "比赛最危险的窗口在60分钟后：瑞典如果仍未领先，会从结构性进攻转向更直接的冲吊，日本反击xG也会同步上升。",
        ],
        "qualification_scenarios": [
            "日本胜：日本7分，至少前二，并与荷兰比净胜球/进球数争第一。",
            "日本平：日本5分，瑞典4分；日本前二概率很高，瑞典多半要比较第三名。",
            "瑞典胜：瑞典6分，日本4分；瑞典进入前二主线，日本转入第三名晋级比较。",
        ],
        "bracket_path_expectation": {
            "status": "need_verify",
            "project_assumption": "项目旧稿使用F1/F2/F3分支推演，具体32强对手映射需赛程表最终确认。",
            "football_effect": "F1通常意味着更可控的首轮淘汰赛路径；F3不确定性和对强队概率明显更高。",
        },
        "red_team_focus": [
            "不能把日本平局可接受简单写成保守小球；瑞典必须赢会主动拉开比赛。",
            "不能把瑞典上一场1-5负荷兰线性外推，日本对抗方式与荷兰不同。",
            "T-75官方首发未出，边路和中锋使用方式仍是赛前最大变量。",
        ],
        "recommendation_language": "赛果倾向日本不败，代表比分1-1/2-1；瑞典胜尾部不低，不能当作单边稳胆。",
    },
    {
        "match_id": "2026-06-26_F_R3_突尼斯_vs_荷兰",
        "match_no": "周四057",
        "kickoff_beijing": "2026-06-26 07:00",
        "stadium": "Kansas City Stadium",
        "home": "突尼斯",
        "away": "荷兰",
        "expected_goals": {
            "baseline": {"home": 0.54, "away": 2.00},
            "adjustments": [
                {"factor": "荷兰实力和边路压制", "home": -0.03, "away": 0.12, "reason": "突尼斯前两轮防线抗压差，远端保护和二线保护都偏弱。"},
                {"factor": "荷兰争F1", "home": 0.00, "away": 0.08, "reason": "荷兰不仅要出线，还要避免被日本净胜球/进球数压过。"},
                {"factor": "荷兰轮换与保护核心", "home": 0.04, "away": -0.14, "reason": "第三轮领先后存在降速和保护主力的动机。"},
                {"factor": "突尼斯荣誉战/低位扰动", "home": 0.06, "away": -0.03, "reason": "突尼斯出线几乎只剩理论，但低位反击和定位球仍会制造小样本波动。"},
                {"factor": "市场校准", "home": -0.01, "away": -0.03, "reason": "普通SPF未开售，只参考+2盘，避免强行市场拉偏。"},
            ],
            "final": {"home": 0.60, "away": 2.00},
        },
        "market": {
            "source": "中国足彩网竞彩混合页",
            "url": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
            "captured_at": "2026-06-25 current page via main thread web open",
            "ordinary_1x2": None,
            "handicap_1x2": {"handicap": "突尼斯 +2", **no_vig([3.47, 4.25, 1.65])},
            "cross_check": "普通胜平负未开售；只能把让+2作为荷兰大胜风险的弱校准。",
        },
        "third_round_context": {
            "current_state": "荷兰4分、净胜球+4、进球7；突尼斯0分、净胜球-8。",
            "netherlands_path": "胜则7分，结合进球数大概率争F1；平则5分仍大概率前二；负则4分，若瑞典胜日本可能跌到第三名。",
            "tunisia_path": "理论上赢球到3分，但净胜球-8使第三名晋级几乎只剩数学尾部。",
            "same_kickoff_dependency": "若日本迟迟无法领先，荷兰一球领先后也未必完全收手；若日本大比分领先，荷兰会更看重净胜球。",
        },
        "tactical_read": [
            "荷兰最清晰的路径仍是边路推进、倒三角和二线插上；突尼斯前两轮最怕连续横向转移后的远端漏人。",
            "突尼斯要把比赛拖成低节奏、低射门质量，并在荷兰中卫压上后打身后第一脚。",
            "荷兰若早早2球领先，比赛会从追求击穿转向管理体能；这会压低3球以上继续扩大的概率。",
        ],
        "qualification_scenarios": [
            "荷兰胜：7分，通常与日本比较F1；若日本不胜，荷兰基本F1。",
            "荷兰平：5分，若日本不负则荷兰可能F2；若瑞典胜日本，荷兰仍有被瑞典追近但大概率前二。",
            "荷兰负：4分，若瑞典胜日本，则荷兰/日本同4分与瑞典6分，荷兰可能滑到第三名比较。",
        ],
        "bracket_path_expectation": {
            "status": "need_verify",
            "project_assumption": "项目旧稿把F1/F2/F3路径作为重要动机层，但32强具体对手需官方赛程映射复核。",
            "football_effect": "荷兰最大动机不是单纯出线，而是争F1并降低32强首轮路径波动。",
        },
        "red_team_focus": [
            "不能因为突尼斯0分就把比赛写成无条件大胜；荷兰轮换和领先后降速会压低让+2穿盘确定性。",
            "普通SPF未开售，市场校准弱于日本vs瑞典。",
            "突尼斯低位反击的进球概率小，但一旦先进球会显著改变荷兰节奏和另一场心理。",
        ],
        "recommendation_language": "赛果倾向荷兰胜，代表比分0-2/0-1/1-2；让+2方向风险来自荷兰是否早早收手。",
    },
]


GROUP_SCENARIO_TREE = [
    {
        "branch": "日本胜瑞典 + 荷兰胜突尼斯",
        "meaning": "荷兰与日本同7分，F1取决于净胜球、进球数和更后续规则；两队都进前二，瑞典3分第三质量偏弱。",
    },
    {
        "branch": "日本平瑞典 + 荷兰胜突尼斯",
        "meaning": "荷兰7分F1，日本5分F2，瑞典4分第三名候选。",
    },
    {
        "branch": "瑞典胜日本 + 荷兰胜突尼斯",
        "meaning": "荷兰7分F1，瑞典6分F2，日本4分第三名候选；日本晋级仍有机会，但路径质量下降。",
    },
    {
        "branch": "日本不败 + 荷兰不胜",
        "meaning": "日本有明显F1机会；荷兰虽大概率前二，但如果输球会把第三名尾部风险放出来。",
    },
    {
        "branch": "瑞典胜日本 + 荷兰负突尼斯",
        "meaning": "瑞典6分上岸，日本/荷兰同4分，荷兰凭当前净胜球和进球数仍较有利，但必须进入细则比较。",
    },
]


def build_match(match_input: dict) -> dict:
    final_xg = match_input["expected_goals"]["final"]
    summary = poisson_summary(final_xg["home"], final_xg["away"])
    matrix = poisson_matrix(final_xg["home"], final_xg["away"])
    market = match_input["market"]
    market_delta = None
    if market.get("ordinary_1x2"):
        implied = market["ordinary_1x2"]["normalized_probability"]
        probs = summary["probabilities_1x2"]
        market_delta = {
            "home_win": round(probs["home_win"] - implied[0], 4),
            "draw": round(probs["draw"] - implied[1], 4),
            "away_win": round(probs["away_win"] - implied[2], 4),
        }
    return {
        **match_input,
        "factor_weights": {
            "baseline_strength": 0.22,
            "recent_group_performance": 0.18,
            "player_state_injury_rotation": 0.16,
            "tactical_matchup": 0.16,
            "third_round_context": 0.18,
            "market_calibration": 0.05 if market.get("ordinary_1x2") is None else 0.10,
        },
        "poisson_score_matrix": matrix,
        **summary,
        "model_market_delta": market_delta,
        "red_team_status": "awaiting_final_thread_verdict",
    }


def pct(value: float) -> str:
    return f"{value * 100:.1f}%"


def score_table(matrix: dict) -> str:
    rows = ["| 主队进球 | 客队0 | 客队1 | 客队2 | 客队3 | 客队4 | 客队5 |", "| --- | ---: | ---: | ---: | ---: | ---: | ---: |"]
    for home_goals, row in matrix["goals_0_to_5"].items():
        values = " | ".join(f"{float(row[str(away)]) * 100:.2f}%" for away in range(6))
        rows.append(f"| {home_goals} | {values} |")
    return "\n".join(rows)


def markdown_match(match: dict) -> str:
    probs = match["probabilities_1x2"]
    totals = match["totals_probabilities"]
    top_scores = ", ".join(f"{item['score']}({pct(item['probability'])})" for item in match["top_scorelines"][:6])
    if match["home"] == "日本":
        home_path = match["third_round_context"]["japan_path"]
        away_path = match["third_round_context"]["sweden_path"]
    else:
        home_path = match["third_round_context"]["tunisia_path"]
        away_path = match["third_round_context"]["netherlands_path"]
    adjustments = "\n".join(
        f"- {item['factor']}: 主队 {item['home']:+.2f} / 客队 {item['away']:+.2f}。{item['reason']}"
        for item in match["expected_goals"]["adjustments"]
    )
    tactical = "\n".join(f"- {line}" for line in match["tactical_read"])
    scenarios = "\n".join(f"- {line}" for line in match["qualification_scenarios"])
    risks = "\n".join(f"- {line}" for line in match["red_team_focus"])
    market = match["market"]
    ordinary = "未开售" if market["ordinary_1x2"] is None else " / ".join(str(x) for x in market["ordinary_1x2"]["odds"])
    handicap = f"{market['handicap_1x2']['handicap']}：{' / '.join(str(x) for x in market['handicap_1x2']['odds'])}"
    market_delta = "无普通SPF，未计算胜平负delta" if match["model_market_delta"] is None else json.dumps(match["model_market_delta"], ensure_ascii=False)

    return f"""# {match['home']} vs {match['away']} F组第三轮深度预测

- 比赛编号：{match['match_no']}
- 开球：{match['kickoff_beijing']} 北京时间
- 场地：{match['stadium']}
- 代表比分：{match['top_scorelines'][0]['score']}
- 胜平负：{match['home']}胜 {pct(probs['home_win'])} / 平 {pct(probs['draw'])} / {match['away']}胜 {pct(probs['away_win'])}
- 大小2.5：大 {pct(totals['over_2_5'])} / 小 {pct(totals['under_2_5'])}
- 双方进球：是 {pct(totals['btts_yes'])} / 否 {pct(totals['btts_no'])}
- Top比分：{top_scores}

## 第三轮语境

- 当前形势：{match['third_round_context']['current_state']}
- 主队路径：{home_path}
- 客队路径：{away_path}
- 同开球依赖：{match['third_round_context']['same_kickoff_dependency']}

## 战术判断

{tactical}

## xG修正链

- 基础xG：{match['home']} {match['expected_goals']['baseline']['home']:.2f} / {match['away']} {match['expected_goals']['baseline']['away']:.2f}
- 最终xG：{match['home']} {match['expected_goals']['final']['home']:.2f} / {match['away']} {match['expected_goals']['final']['away']:.2f}

{adjustments}

## 泊松分布

公式：`{match['poisson_formula']}`

{score_table(match['poisson_score_matrix'])}

0-5覆盖质量：{pct(match['poisson_score_matrix']['covered_mass'])}；6球以上尾部：{pct(match['poisson_score_matrix']['tail_probability'])}

## 出线分支

{scenarios}

## 市场校准

- 来源：{market['source']}
- 抓取时间：{market['captured_at']}
- 普通胜平负：{ordinary}
- 让球胜平负：{handicap}
- 模型-市场差：{market_delta}
- 交叉验证：{market['cross_check']}

## 32强路径

- 状态：{match['bracket_path_expectation']['status']}
- 项目假设：{match['bracket_path_expectation']['project_assumption']}
- 足球影响：{match['bracket_path_expectation']['football_effect']}

## 红队风险

{risks}

## 结论

{match['recommendation_language']}
"""


def summary_markdown(payload: dict) -> str:
    rows = []
    for match in payload["matches"]:
        probs = match["probabilities_1x2"]
        rows.append(
            f"| {match['match_no']} | {match['home']} vs {match['away']} | "
            f"{pct(probs['home_win'])}/{pct(probs['draw'])}/{pct(probs['away_win'])} | "
            f"{match['expected_goals']['final']['home']:.2f}-{match['expected_goals']['final']['away']:.2f} | "
            f"{match['top_scorelines'][0]['score']} | "
            f"{pct(match['totals_probabilities']['over_2_5'])} |"
        )

    table_rows = []
    for team, data in payload["group_table_snapshot"].items():
        table_rows.append(f"| {team} | {data['pts']} | {data['gf']} | {data['ga']} | {data['gf'] - data['ga']:+d} |")

    group_rows = []
    for team in payload["simulated_group_outcomes"]["teams"]:
        group_rows.append(
            f"| {team['team']} | {pct(team['finish_1st'])} | {pct(team['finish_2nd'])} | "
            f"{pct(team['finish_3rd'])} | {pct(team['top2_probability'])} | {pct(team['advance_probability'])} |"
        )

    scenario_rows = "\n".join(f"- {item['branch']}：{item['meaning']}" for item in payload["group_scenario_tree"])

    return f"""# F组第三轮深度预测汇总

生成时间：{payload['generated_at']}

## 当前积分

| 球队 | 分 | 进 | 失 | 净胜 |
| --- | ---: | ---: | ---: | ---: |
{chr(10).join(table_rows)}

已完成赛果：
{chr(10).join(f"- {item['match']}：{item['note']}" for item in PREVIOUS_RESULTS)}

## 预测表

| 编号 | 比赛 | 胜/平/负 | xG | 代表比分 | 大2.5 |
| --- | --- | --- | --- | --- | ---: |
{chr(10).join(rows)}

## 小组模拟

| 球队 | F1 | F2 | F3 | 前二 | 晋级 |
| --- | ---: | ---: | ---: | ---: | ---: |
{chr(10).join(group_rows)}

说明：F3晋级概率是启发式估计，因为它依赖其他小组第三名表现；F1/F2/F3路径的具体32强对手仍需官方bracket映射复核。

## 关键分支

{scenario_rows}

## 总体判断

- 这个组最有研究价值的点不是“谁强谁弱”，而是荷兰、日本、瑞典三队的目标彼此牵动：日本和荷兰都想争第一，但都不能为了争第一把前二安全性打丢；瑞典则没有控平空间。
- 日本 vs 瑞典不是简单小球局。日本有控平能力，但瑞典必须赢会把比赛推向更开放，尤其60分钟后会放大双方进球尾部。
- 突尼斯 vs 荷兰的核心不是荷兰能不能赢，而是荷兰赢几个、何时降速。普通SPF未开售，所以让+2只能作为大胜风险参考，不能当成完整市场锚。
"""


def validate(payload: dict) -> list[str]:
    messages = []
    for match in payload["matches"]:
        prob_sum = sum(match["probabilities_1x2"].values())
        if not 0.999 <= prob_sum <= 1.001:
            raise ValueError(f"{match['match_id']} 1X2 probabilities sum to {prob_sum}")
        matrix = match["poisson_score_matrix"]["goals_0_to_5"]
        if len(matrix) != 6 or any(len(row) != 6 for row in matrix.values()):
            raise ValueError(f"{match['match_id']} missing 0-5 matrix")
        if len(match["top_scorelines"]) < 5:
            raise ValueError(f"{match['match_id']} missing top scorelines")
        messages.append(f"{match['match_id']}: probabilities_sum={prob_sum:.4f}, matrix=6x6")
    return messages


def main() -> None:
    matches = [build_match(match_input) for match_input in MATCH_INPUTS]
    payload = {
        "schema_version": "worldcup-quant-prediction-system.v2",
        "generated_at": NOW,
        "group": "F",
        "round": "group_round_3",
        "source_threads": {
            "data_collector": "019eb053-ef96-7a22-9685-4602ba252b10",
            "tactics_coach": "019eb05a-a3ee-7023-9c89-42d9786d4685",
            "data_modeler": "019eb079-bed5-7342-9dfd-d1f448caa0dc",
            "red_team": "019eb05b-66db-7000-8a84-c453dece7ac3",
        },
        "group_table_snapshot": BASE_TABLE,
        "tie_breaker_modeling": {
            "official_priority_checked": "points, goal difference, goals scored; later FIFA tie-breakers are not modeled in the Poisson group simulation.",
            "source": "FIFA group qualification/tie-breaker explainer checked 2026-06-25",
        },
        "group_scenario_tree": GROUP_SCENARIO_TREE,
        "matches": matches,
        "simulated_group_outcomes": simulate_group(matches),
        "source_log": [
            {
                "name": "中国足彩网竞彩混合页",
                "url": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
                "captured_at": "2026-06-25 current page via main thread web open",
                "usage": "周四057/058竞彩足球编号、普通胜平负、让球胜平负、未开售状态、赔率去水概率。",
            },
            {
                "name": "FIFA tie-breaker explainer",
                "url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/groups-how-teams-qualify-tie-breakers",
                "captured_at": "2026-06-25",
                "usage": "小组排名同分规则边界。",
            },
        ],
        "quality_notes": [
            "T-75官方首发未发布，首发只能作为预测输入。",
            "突尼斯 vs 荷兰普通SPF未开售，市场校准弱于日本 vs 瑞典。",
            "32强路径的具体对手映射仍需官方赛程表复核，不在本脚本中硬编码。",
        ],
    }
    payload["validation"] = validate(payload)

    json_path = ROOT / "data" / "outputs" / "match_predictions" / "f-group-round3-quant-prediction-20260625.json"
    summary_path = ROOT / "比赛" / "未开始比赛" / "小组赛" / "F组" / "F组第三轮量化预测汇总_20260625.md"
    match_paths = {
        "2026-06-26_F_R3_日本_vs_瑞典": ROOT / "比赛" / "未开始比赛" / "小组赛" / "F组" / "2026-06-26_日本_vs_瑞典_量化预测.md",
        "2026-06-26_F_R3_突尼斯_vs_荷兰": ROOT / "比赛" / "未开始比赛" / "小组赛" / "F组" / "2026-06-26_突尼斯_vs_荷兰_量化预测.md",
    }

    json_path.parent.mkdir(parents=True, exist_ok=True)
    summary_path.parent.mkdir(parents=True, exist_ok=True)
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n")
    summary_path.write_text(summary_markdown(payload), encoding="utf-8", newline="\n")
    for match in payload["matches"]:
        match_paths[match["match_id"]].write_text(markdown_match(match), encoding="utf-8", newline="\n")

    print(
        json.dumps(
            {"json": str(json_path), "summary": str(summary_path), "validation": payload["validation"]},
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
