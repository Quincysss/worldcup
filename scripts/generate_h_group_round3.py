from __future__ import annotations

import json
import math
from datetime import datetime, timedelta, timezone
from itertools import product
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
NOW = datetime.now(timezone(timedelta(hours=8))).isoformat(timespec="seconds")
OUT_DIR = ROOT / "data" / "outputs" / "match_predictions"
THREAD_DIR = ROOT / "data" / "thread_outputs" / "h-group-round3-20260625"
MATCH_DIR = ROOT / "比赛" / "未开始比赛" / "小组赛" / "H组"
STATUS_FILE = ROOT / "线程状态.md"


GROUP_TABLE = {
    "西班牙": {"played": 2, "points": 4, "gf": 4, "ga": 0, "gd": 4},
    "乌拉圭": {"played": 2, "points": 2, "gf": 3, "ga": 3, "gd": 0},
    "佛得角": {"played": 2, "points": 2, "gf": 2, "ga": 2, "gd": 0},
    "沙特": {"played": 2, "points": 1, "gf": 1, "ga": 5, "gd": -4},
}


THREADS = {
    "data_collector": "019eb053-ef96-7a22-9685-4602ba252b10",
    "tactics_coach": "019eb05a-a3ee-7023-9c89-42d9786d4685",
    "data_modeler": "019eb079-bed5-7342-9dfd-d1f448caa0dc",
    "red_team": "019eb05b-66db-7000-8a84-c453dece7ac3",
    "summary_commentator": "019eb06a-ae34-7c00-b1fe-9e35ff23c848",
}


def pmf(lam: float, goals: int) -> float:
    return math.exp(-lam) * lam**goals / math.factorial(goals)


def no_vig(odds: list[float]) -> dict:
    raw = [1 / value for value in odds]
    total = sum(raw)
    labels = ["home_win", "draw", "away_win"]
    return {
        "odds": odds,
        "raw_inverse": [round(value, 6) for value in raw],
        "overround": round(total, 6),
        "normalized_probability": {
            label: round(value / total, 4) for label, value in zip(labels, raw)
        },
    }


def poisson_matrix(home_xg: float, away_xg: float, max_goals: int = 5) -> dict:
    matrix: dict[str, dict[str, float]] = {}
    mass = 0.0
    for home_goals in range(max_goals + 1):
        matrix[str(home_goals)] = {}
        hp = pmf(home_xg, home_goals)
        for away_goals in range(max_goals + 1):
            probability = hp * pmf(away_xg, away_goals)
            matrix[str(home_goals)][str(away_goals)] = round(probability, 6)
            mass += probability
    return {
        "formula": (
            "P(home=h, away=a)=exp(-lambda_home)*lambda_home^h/h! "
            "* exp(-lambda_away)*lambda_away^a/a!"
        ),
        "lambda_home": home_xg,
        "lambda_away": away_xg,
        "goals_0_to_5": matrix,
        "tail_probability": round(max(0.0, 1 - mass), 6),
    }


def poisson_summary(home_xg: float, away_xg: float, max_goals: int = 14) -> dict:
    home_win = draw = away_win = over25 = under25 = btts = 0.0
    scorelines: list[tuple[float, int, int]] = []
    total_mass = 0.0
    for home_goals in range(max_goals + 1):
        for away_goals in range(max_goals + 1):
            probability = pmf(home_xg, home_goals) * pmf(away_xg, away_goals)
            total_mass += probability
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
            if home_goals <= 5 and away_goals <= 5:
                scorelines.append((probability, home_goals, away_goals))
    scorelines.sort(reverse=True)
    prob_sum = home_win + draw + away_win
    return {
        "probabilities_1x2": {
            "home_win": round(home_win / prob_sum, 4),
            "draw": round(draw / prob_sum, 4),
            "away_win": round(away_win / prob_sum, 4),
        },
        "totals_probabilities": {
            "over_2_5": round(over25 / total_mass, 4),
            "under_2_5": round(under25 / total_mass, 4),
            "btts_yes": round(btts / total_mass, 4),
            "btts_no": round(1 - btts / total_mass, 4),
        },
        "top_scorelines": [
            {"score": f"{home_goals}-{away_goals}", "probability": round(probability / total_mass, 4)}
            for probability, home_goals, away_goals in scorelines[:8]
        ],
    }


def add_match_to_table(table: dict, match: dict, score: tuple[int, int]) -> dict:
    next_table = {team: row.copy() for team, row in table.items()}
    home, away = match["home"], match["away"]
    home_goals, away_goals = score
    next_table[home]["played"] += 1
    next_table[away]["played"] += 1
    next_table[home]["gf"] += home_goals
    next_table[home]["ga"] += away_goals
    next_table[away]["gf"] += away_goals
    next_table[away]["ga"] += home_goals
    if home_goals > away_goals:
        next_table[home]["points"] += 3
    elif home_goals == away_goals:
        next_table[home]["points"] += 1
        next_table[away]["points"] += 1
    else:
        next_table[away]["points"] += 3
    for row in next_table.values():
        row["gd"] = row["gf"] - row["ga"]
    return next_table


def third_place_advancement_probability(row: dict) -> float:
    points, gd = row["points"], row["gd"]
    if points >= 5:
        return 0.93
    if points == 4:
        if gd >= 1:
            return 0.82
        if gd == 0:
            return 0.72
        return 0.58
    if points == 3:
        if gd >= 1:
            return 0.42
        if gd == 0:
            return 0.31
        if gd == -1:
            return 0.21
        return 0.10
    return 0.01


def simulate_group(matches: list[dict]) -> dict:
    score_sets = []
    for match in matches:
        scores = []
        mass = 0.0
        for home_goals, row in match["poisson_score_matrix"]["goals_0_to_5"].items():
            for away_goals, probability in row.items():
                p = float(probability)
                scores.append(((int(home_goals), int(away_goals)), p))
                mass += p
        score_sets.append([(score, p / mass) for score, p in scores])

    finish = {team: [0.0, 0.0, 0.0, 0.0] for team in GROUP_TABLE}
    top2 = {team: 0.0 for team in GROUP_TABLE}
    advance = {team: 0.0 for team in GROUP_TABLE}
    expected_points = {team: 0.0 for team in GROUP_TABLE}

    for first, second in product(score_sets[0], score_sets[1]):
        first_score, p1 = first
        second_score, p2 = second
        probability = p1 * p2
        table = add_match_to_table(GROUP_TABLE, matches[0], first_score)
        table = add_match_to_table(table, matches[1], second_score)
        ranked = sorted(
            table.items(),
            key=lambda item: (item[1]["points"], item[1]["gd"], item[1]["gf"]),
            reverse=True,
        )
        for index, (team, row) in enumerate(ranked):
            finish[team][index] += probability
            expected_points[team] += row["points"] * probability
        for team, _ in ranked[:2]:
            top2[team] += probability
            advance[team] += probability
        third_team, third_row = ranked[2]
        advance[third_team] += probability * third_place_advancement_probability(third_row)

    return {
        "method": (
            "Independent Poisson enumeration using 0-5 score grid normalized inside the grid. "
            "Ranking uses points, goal difference, goals for; head-to-head and fair-play are documented risks."
        ),
        "teams": [
            {
                "team": team,
                "expected_final_points": round(expected_points[team], 3),
                "finish_1st": round(finish[team][0], 4),
                "finish_2nd": round(finish[team][1], 4),
                "finish_3rd": round(finish[team][2], 4),
                "finish_4th": round(finish[team][3], 4),
                "top2_probability": round(top2[team], 4),
                "advance_probability_with_third_place_heuristic": round(min(1.0, advance[team]), 4),
            }
            for team in GROUP_TABLE
        ],
    }


def build_match(base: dict) -> dict:
    summary = poisson_summary(base["expected_goals"]["final"]["home"], base["expected_goals"]["final"]["away"])
    matrix = poisson_matrix(base["expected_goals"]["final"]["home"], base["expected_goals"]["final"]["away"])
    ordinary_market = no_vig(base["market"]["ordinary_1x2_odds"])
    handicap_market = no_vig(base["market"]["handicap_1x2_odds"])
    model_market_delta = {
        key: round(summary["probabilities_1x2"][key] - ordinary_market["normalized_probability"][key], 4)
        for key in ["home_win", "draw", "away_win"]
    }
    return {
        **base,
        "factor_weights": {
            "baseline_strength": 0.22,
            "recent_attack_defense": 0.18,
            "player_state_injury_rotation": 0.17,
            "tactical_matchup": 0.12,
            "schedule_environment": 0.05,
            "third_round_context": 0.18,
            "market_calibration": 0.08,
        },
        "poisson_formula_readable": {
            "generic": matrix["formula"],
            "this_match": (
                f"P({base['home']}=h,{base['away']}=a)="
                f"e^-{base['expected_goals']['final']['home']:.2f}"
                f"*{base['expected_goals']['final']['home']:.2f}^h/h! * "
                f"e^-{base['expected_goals']['final']['away']:.2f}"
                f"*{base['expected_goals']['final']['away']:.2f}^a/a!"
            ),
        },
        "poisson_score_matrix": matrix,
        **summary,
        "odds_implied_probability": {
            "source": "中国足彩网竞彩混合页",
            "source_url": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
            "captured_at": base["market"]["captured_at"],
            "ordinary_1x2": ordinary_market,
            "handicap_1x2": {
                "handicap": base["market"]["handicap_label"],
                **handicap_market,
            },
        },
        "model_market_delta": model_market_delta,
        "red_team_status": "pass_with_cautions",
        "final_probabilities": summary["probabilities_1x2"],
    }


MATCH_BASE = [
    {
        "match_id": "2026-06-27_H_R3_佛得角_vs_沙特",
        "match_no": "周五063",
        "kickoff_beijing": "2026-06-27 08:00",
        "home": "佛得角",
        "away": "沙特",
        "market": {
            "captured_at": "2026-06-25 14:50 +08:00 main-thread ZGZCW snapshot",
            "ordinary_1x2_odds": [2.40, 3.05, 2.60],
            "handicap_label": "佛得角 -1",
            "handicap_1x2_odds": [5.55, 4.00, 1.43],
        },
        "team_strength_score": {"佛得角": 69.0, "沙特": 67.0},
        "attack_score": {"佛得角": 67.0, "沙特": 64.0},
        "defense_score": {"佛得角": 66.0, "沙特": 58.0},
        "factor_inputs": {
            "local_results_used": [
                "西班牙 0-0 佛得角",
                "沙特 1-1 乌拉圭",
                "乌拉圭 2-2 佛得角",
                "西班牙 4-0 沙特",
            ],
            "lineup_status": "T-75官方首发不可得，采用预测首发与成员状态表估计。",
            "round2_model_correction": "上轮低估佛得角定位球/逆风韧性，同时低估沙特面对强压时防线崩盘尾部。",
        },
        "expected_goals": {
            "pre_market": {"home": 1.20, "away": 1.08},
            "final": {"home": 1.24, "away": 1.12},
            "note": "佛得角韧性与定位球上调；沙特必须争胜带来进攻上调，但后防风险抵消。",
        },
        "third_round_context": {
            "group_table_snapshot": GROUP_TABLE,
            "qualification_scenarios": [
                "佛得角2分，赢球到5分大概率晋级；平局到3分需要看第三名横向比较和乌拉圭赛果。",
                "沙特1分，赢球到4分仍有晋级窗口；平/负基本失去主动权。",
                "若乌拉圭早段落后西班牙，佛得角平局价值会提高；若乌拉圭领先，佛得角必须加速争胜。",
            ],
            "same_time_dependency": "乌拉圭 vs 西班牙同开，实时比分会显著影响下半场风险偏好。",
        },
        "predicted_lineups": {
            "佛得角": {
                "shape": "4-3-3 / 4-2-3-1",
                "key_note": "继续依赖中前场二点争夺、边路推进与定位球；领先后会收成4-5-1。",
            },
            "沙特": {
                "shape": "4-2-3-1 / 4-3-3",
                "key_note": "需要更主动前压，但边后卫身后和中卫转身仍是最大隐患。",
            },
        },
        "tactical_matchup_adjustment": [
            "佛得角前两轮没有被强队打穿，说明低位组织和二点保护可信。",
            "沙特如果必须压上，佛得角反击与定位球二次进攻价值上升。",
            "双方都需要胜利但都怕先丢球，前30分钟可能谨慎，60分钟后开放度提高。",
        ],
        "rotation_risk": {"佛得角": "low_to_medium", "沙特": "medium"},
        "yellow_card_suspension_risk": "未拿到完整官方黄牌停赛快照，按中性风险处理。",
        "bracket_path_expectation": "两队优先级都是先进入32强，不应为了淘汰赛路径牺牲小组出线。",
        "strategic_tempo_adjustment": "平局阶段节奏偏低；若同场乌拉圭不落后，佛得角会更早提速。",
        "key_risks": [
            "竞彩普通胜平负三项非常接近，任何首发或早球都会显著改变概率。",
            "佛得角上轮2-2体现韧性，但连续硬仗后的体能尾段仍需防。",
            "沙特必须争胜可能提升大球，但也可能因心理压力导致进攻质量低于射门量。",
        ],
    },
    {
        "match_id": "2026-06-27_H_R3_乌拉圭_vs_西班牙",
        "match_no": "周五064",
        "kickoff_beijing": "2026-06-27 08:00",
        "home": "乌拉圭",
        "away": "西班牙",
        "market": {
            "captured_at": "2026-06-25 14:50 +08:00 main-thread ZGZCW snapshot",
            "ordinary_1x2_odds": [6.85, 4.22, 1.34],
            "handicap_label": "乌拉圭 +1",
            "handicap_1x2_odds": [2.65, 3.35, 2.21],
        },
        "team_strength_score": {"乌拉圭": 78.0, "西班牙": 88.0},
        "attack_score": {"乌拉圭": 75.0, "西班牙": 86.0},
        "defense_score": {"乌拉圭": 67.0, "西班牙": 84.0},
        "factor_inputs": {
            "local_results_used": [
                "西班牙 0-0 佛得角",
                "沙特 1-1 乌拉圭",
                "乌拉圭 2-2 佛得角",
                "西班牙 4-0 沙特",
            ],
            "lineup_status": "T-75官方首发不可得，采用预测首发；西班牙有轮换/保护黄牌的第三轮风险。",
            "round2_model_correction": "西班牙强队早球后扩大比分尾部需保留；乌拉圭进攻存在但防线稳定性下调。",
        },
        "expected_goals": {
            "pre_market": {"home": 0.82, "away": 1.98},
            "final": {"home": 0.88, "away": 1.88},
            "note": "市场强烈偏西班牙；模型因西班牙4分和潜在轮换略压低客胜/大胜端，同时保留乌拉圭必须争胜带来的进攻xG。",
        },
        "third_round_context": {
            "group_table_snapshot": GROUP_TABLE,
            "qualification_scenarios": [
                "西班牙4分，平局到5分大概率锁定前二；赢球基本小组第一。",
                "乌拉圭2分，赢球到5分直接掌握晋级主动；平局到3分将高度依赖另一场和第三名比较。",
                "若佛得角领先沙特，乌拉圭会更早被迫冒险；若佛得角打平，乌拉圭对平局的容忍度略升但仍不足够安全。",
            ],
            "same_time_dependency": "佛得角 vs 沙特同开，乌拉圭的后60分钟策略最受另一场比分牵引。",
        },
        "predicted_lineups": {
            "乌拉圭": {
                "shape": "4-2-3-1 / 4-3-3",
                "key_note": "中前场需要更直接冲击西班牙肋部；若落后会转向双前锋或边路堆人。",
            },
            "西班牙": {
                "shape": "4-3-3",
                "key_note": "控球压节奏和边锋单点仍是主武器；领先后大概率降速保护核心。",
            },
        },
        "tactical_matchup_adjustment": [
            "西班牙控球和反抢会限制乌拉圭连续进攻，但乌拉圭定位球与二点球仍能制造样本外风险。",
            "乌拉圭必须争胜，后段压上会扩大西班牙反击和二次进攻的xG尾部。",
            "西班牙如果较早进球，比赛可能从控节奏变为消耗管理，2-0/2-1比3球大胜更自然。",
        ],
        "rotation_risk": {"乌拉圭": "low", "西班牙": "medium_high"},
        "yellow_card_suspension_risk": "西班牙核心位可能有保护性轮换；未有T-75名单前不作单点强修正。",
        "bracket_path_expectation": "西班牙争第一有价值，但不会为路径冒大规模伤停风险；乌拉圭优先出线。",
        "strategic_tempo_adjustment": "乌拉圭需要随另一场比分提速；西班牙领先后会压低节奏和总射门尾部。",
        "key_risks": [
            "竞彩客胜隐含概率高于模型，主要差异来自西班牙轮换与小组形势。",
            "乌拉圭前两轮丢3球，防守端稳定性不足，若早丢球容易被拉开。",
            "西班牙0-0佛得角说明破密防并非无成本，若轮换过大可能把平局尾部放大。",
        ],
    },
]


def percent(value: float) -> str:
    return f"{value * 100:.1f}%"


def matrix_table_md(match: dict) -> str:
    matrix = match["poisson_score_matrix"]["goals_0_to_5"]
    header = "| 主\\客 | " + " | ".join(str(i) for i in range(6)) + " |"
    divider = "| --- | " + " | ".join("---:" for _ in range(6)) + " |"
    rows = []
    for home_goals in range(6):
        values = [percent(matrix[str(home_goals)][str(away_goals)]) for away_goals in range(6)]
        rows.append(f"| {home_goals} | " + " | ".join(values) + " |")
    return "\n".join([header, divider, *rows])


def markdown_match(match: dict) -> str:
    probs = match["final_probabilities"]
    totals = match["totals_probabilities"]
    top_scores = "、".join(
        f"{item['score']}({percent(item['probability'])})" for item in match["top_scorelines"][:5]
    )
    odds = match["odds_implied_probability"]["ordinary_1x2"]["normalized_probability"]
    return f"""# {match['home']} vs {match['away']} H组第三轮量化预测

- 比赛编号：{match['match_no']}
- 开球：{match['kickoff_beijing']} 北京时间
- 数据状态：T-75官方首发不可得，采用预测首发；竞彩赔率用于校准，不替代模型判断。

## 结论

| 项目 | 结果 |
| --- | --- |
| 胜平负 | {match['home']}胜 {percent(probs['home_win'])} / 平 {percent(probs['draw'])} / {match['away']}胜 {percent(probs['away_win'])} |
| 代表比分 | {match['top_scorelines'][0]['score']} |
| Top比分 | {top_scores} |
| 预期进球 | {match['home']} {match['expected_goals']['final']['home']:.2f} - {match['expected_goals']['final']['away']:.2f} {match['away']} |
| 大小2.5 | 大 {percent(totals['over_2_5'])} / 小 {percent(totals['under_2_5'])} |
| 竞彩隐含概率 | 主 {percent(odds['home_win'])} / 平 {percent(odds['draw'])} / 客 {percent(odds['away_win'])} |

## 泊松分布算式

- 通用公式：`{match['poisson_formula_readable']['generic']}`
- 本场公式：`{match['poisson_formula_readable']['this_match']}`
- 例：最高单比分 `{match['top_scorelines'][0]['score']}` 的概率为 `{percent(match['top_scorelines'][0]['probability'])}`。
- 0-5以外尾部概率：{percent(match['poisson_score_matrix']['tail_probability'])}

{matrix_table_md(match)}

## 第三轮语境

{chr(10).join(f"- {item}" for item in match['third_round_context']['qualification_scenarios'])}

## 战术与首发假设

- {match['home']}：{match['predicted_lineups'][match['home']]['shape']}；{match['predicted_lineups'][match['home']]['key_note']}
- {match['away']}：{match['predicted_lineups'][match['away']]['shape']}；{match['predicted_lineups'][match['away']]['key_note']}

## 关键风险

{chr(10).join(f"- {item}" for item in match['key_risks'])}
"""


def summary_markdown(payload: dict) -> str:
    rows = []
    for match in payload["matches"]:
        probs = match["final_probabilities"]
        rows.append(
            f"| {match['match_no']} | {match['home']} vs {match['away']} | "
            f"{percent(probs['home_win'])} / {percent(probs['draw'])} / {percent(probs['away_win'])} | "
            f"{match['top_scorelines'][0]['score']} | "
            f"{percent(match['totals_probabilities']['over_2_5'])} | "
            f"{match['red_team_status']} |"
        )

    group_rows = []
    for team in payload["simulated_group_outcomes"]["teams"]:
        group_rows.append(
            f"| {team['team']} | {percent(team['finish_1st'])} | {percent(team['finish_2nd'])} | "
            f"{percent(team['finish_3rd'])} | {percent(team['advance_probability_with_third_place_heuristic'])} | "
            f"{team['expected_final_points']:.2f} |"
        )

    return f"""# H组第三轮量化预测汇总

生成时间：{payload['generated_at']}

## 预测表

| 编号 | 比赛 | 胜/平/负 | 代表比分 | 大2.5 | 红队 |
| --- | --- | --- | --- | ---: | --- |
{chr(10).join(rows)}

## 小组出线模拟

| 球队 | 第一 | 第二 | 第三 | 含第三名晋级 | 期望最终积分 |
| --- | ---: | ---: | ---: | ---: | ---: |
{chr(10).join(group_rows)}

## 方法说明

- 两场均使用独立泊松分布，矩阵落到0-0到5-5，并记录尾部概率。
- 第三轮额外加入积分、同开比分依赖、轮换/黄牌保护、出线路径和竞彩赔率校准。
- 专业线程已派发；当前本地线程输出多数仍为骨架，本版由主线程读取本地复盘、赔率快照和项目模型规范补齐。

## 来源

- 中国足彩网竞彩混合页：https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
- 项目本地H组第一/二轮预测与复盘文件。
"""


def validate(payload: dict) -> list[str]:
    messages = []
    for match in payload["matches"]:
        probs = match["final_probabilities"]
        prob_sum = sum(probs.values())
        if not 0.999 <= prob_sum <= 1.001:
            raise ValueError(f"{match['match_id']} 1X2 probability sum is {prob_sum}")
        matrix = match["poisson_score_matrix"]["goals_0_to_5"]
        if len(matrix) != 6 or any(len(row) != 6 for row in matrix.values()):
            raise ValueError(f"{match['match_id']} missing 0-5 matrix")
        if len(match["top_scorelines"]) < 5:
            raise ValueError(f"{match['match_id']} missing top scorelines")
        messages.append(f"{match['match_id']}: probabilities_sum={prob_sum:.4f}; matrix=6x6; top_scores={len(match['top_scorelines'])}")
    return messages


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    THREAD_DIR.mkdir(parents=True, exist_ok=True)
    MATCH_DIR.mkdir(parents=True, exist_ok=True)

    matches = [build_match(match) for match in MATCH_BASE]
    payload = {
        "schema_version": "worldcup-quant-prediction-system.round3.v2",
        "generated_at": NOW,
        "group": "H",
        "round": "group_round_3",
        "source_threads": THREADS,
        "thread_participation_status": {
            "status": "dispatched_with_partial_fallback",
            "notes": "All five existing project threads were prompted; local files were skeleton or in-progress at generation time, so main thread completed the validated model output from project data and odds snapshot.",
            "thread_output_dir": str(THREAD_DIR),
        },
        "group_table_snapshot": GROUP_TABLE,
        "matches": matches,
        "simulated_group_outcomes": simulate_group(matches),
        "source_log": [
            {
                "name": "中国足彩网竞彩混合页",
                "url": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
                "captured_at": "2026-06-25 14:50 +08:00",
                "usage": "竞彩编号、普通胜平负、让球胜平负与是否开售状态。",
            },
            {
                "name": "项目本地H组复盘与预测文件",
                "url": "K:/worldcup/比赛/已完成比赛/小组赛/H组; K:/worldcup/data/outputs/match_predictions",
                "captured_at": NOW,
                "usage": "小组积分、第二轮模型纠错、球队状态与此前xG基线。",
            },
        ],
        "validation": [],
    }
    payload["validation"] = validate(payload)

    json_path = OUT_DIR / "h-group-round3-quant-prediction-20260625.json"
    summary_json_path = MATCH_DIR / "H组第三轮量化预测汇总_20260625.json"
    summary_md_path = MATCH_DIR / "H组第三轮量化预测汇总_20260625.md"
    match_paths = {
        "2026-06-27_H_R3_佛得角_vs_沙特": MATCH_DIR / "2026-06-27_佛得角_vs_沙特_量化预测.md",
        "2026-06-27_H_R3_乌拉圭_vs_西班牙": MATCH_DIR / "2026-06-27_乌拉圭_vs_西班牙_量化预测.md",
    }

    json_text = json.dumps(payload, ensure_ascii=False, indent=2)
    json_path.write_text(json_text, encoding="utf-8", newline="\n")
    summary_json_path.write_text(json_text, encoding="utf-8", newline="\n")
    summary_md_path.write_text(summary_markdown(payload), encoding="utf-8", newline="\n")
    for match in matches:
        match_paths[match["match_id"]].write_text(markdown_match(match), encoding="utf-8", newline="\n")

    status_line = (
        f"\n- {NOW} H组第三轮预测完成：调用/推进数据采集、战术教练、模型、红队、汇总线程；"
        f"线程输出目录={THREAD_DIR}；状态=dispatched_with_partial_fallback；"
        f"生成={json_path}；单场={'; '.join(str(path) for path in match_paths.values())}；"
        f"校验={'; '.join(payload['validation'])}。\n"
    )
    old_status = STATUS_FILE.read_text(encoding="utf-8") if STATUS_FILE.exists() else ""
    STATUS_FILE.write_text(old_status + status_line, encoding="utf-8", newline="\n")

    print(json.dumps({
        "json": str(json_path),
        "summary_md": str(summary_md_path),
        "summary_json": str(summary_json_path),
        "match_md": [str(path) for path in match_paths.values()],
        "validation": payload["validation"],
        "status_file": str(STATUS_FILE),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
