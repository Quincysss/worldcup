from __future__ import annotations

import json
import math
from datetime import datetime, timezone, timedelta
from pathlib import Path


ROOT = Path(r"K:\worldcup")
OUT_JSON = ROOT / "data" / "outputs" / "match_predictions" / "i-group-round3-quant-prediction-20260625.json"
GROUP_DIR = ROOT / "比赛" / "未开始比赛" / "小组赛" / "I组"
SUMMARY_JSON = GROUP_DIR / "I组第三轮量化预测汇总_20260625.json"
SUMMARY_MD = GROUP_DIR / "I组第三轮量化预测汇总_20260625.md"
THREAD_DIR = ROOT / "data" / "thread_outputs" / "i-group-round3-20260625"
STATUS_FILE = ROOT / "线程状态.md"

TZ = timezone(timedelta(hours=8))
CAPTURED_AT = datetime.now(TZ).isoformat(timespec="seconds")


def poisson_pmf(lam: float, k: int) -> float:
    return math.exp(-lam) * lam**k / math.factorial(k)


def no_vig(odds: list[float]) -> dict[str, float]:
    raw = [1.0 / x for x in odds]
    total = sum(raw)
    return {
        "home": raw[0] / total,
        "draw": raw[1] / total,
        "away": raw[2] / total,
        "book_overround": total - 1.0,
    }


def score_matrix(home_xg: float, away_xg: float, max_goals: int = 5) -> tuple[dict[str, dict[str, float]], float]:
    home = [poisson_pmf(home_xg, i) for i in range(max_goals + 1)]
    away = [poisson_pmf(away_xg, i) for i in range(max_goals + 1)]
    matrix: dict[str, dict[str, float]] = {}
    covered = 0.0
    for i in range(max_goals + 1):
        row: dict[str, float] = {}
        for j in range(max_goals + 1):
            p = home[i] * away[j]
            row[str(j)] = p
            covered += p
        matrix[str(i)] = row
    return matrix, 1.0 - covered


def full_poisson(home_xg: float, away_xg: float, cap: int = 14) -> dict[str, object]:
    home = [poisson_pmf(home_xg, i) for i in range(cap + 1)]
    away = [poisson_pmf(away_xg, i) for i in range(cap + 1)]
    home_win = draw = away_win = over25 = under25 = btts = 0.0
    scores: list[tuple[str, float]] = []
    for i, hp in enumerate(home):
        for j, ap in enumerate(away):
            p = hp * ap
            if i > j:
                home_win += p
            elif i == j:
                draw += p
            else:
                away_win += p
            if i + j >= 3:
                over25 += p
            else:
                under25 += p
            if i > 0 and j > 0:
                btts += p
            scores.append((f"{i}-{j}", p))
    score_sum = sum(p for _, p in scores)
    return {
        "probabilities_1x2": {
            "home": home_win / score_sum,
            "draw": draw / score_sum,
            "away": away_win / score_sum,
        },
        "totals": {
            "over_2_5": over25 / score_sum,
            "under_2_5": under25 / score_sum,
            "both_teams_to_score_yes": btts / score_sum,
        },
        "top_scorelines": [
            {"score": score, "probability": prob / score_sum}
            for score, prob in sorted(scores, key=lambda x: x[1], reverse=True)[:5]
        ],
    }


def pct(x: float) -> str:
    return f"{x * 100:.1f}%"


def round_probs(obj: object) -> object:
    if isinstance(obj, float):
        return round(obj, 6)
    if isinstance(obj, dict):
        return {k: round_probs(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [round_probs(v) for v in obj]
    return obj


MARKETS = {
    "norway_france": {
        "source": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
        "cross_check_source": "新浪体育/新浪彩票结构化同场页面未稳定取得，待赛前再核验",
        "captured_at": CAPTURED_AT,
        "match_no": "周五061",
        "home": "挪威",
        "away": "法国",
        "spf_odds": [3.65, 3.25, 1.82],
        "handicap": "挪威 +1",
        "handicap_odds": [1.69, 3.65, 3.72],
        "sale_status": "开售",
    },
    "senegal_iraq": {
        "source": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
        "cross_check_source": "新浪体育/新浪彩票结构化同场页面未稳定取得，待赛前再核验",
        "captured_at": CAPTURED_AT,
        "match_no": "周五062",
        "home": "塞内加尔",
        "away": "伊拉克",
        "spf_odds": [1.51, 3.55, 5.35],
        "handicap": "塞内加尔 -1",
        "handicap_odds": [2.65, 3.38, 2.18],
        "sale_status": "开售",
    },
}

for market in MARKETS.values():
    market["spf_implied_no_vig"] = no_vig(market["spf_odds"])
    market["handicap_implied_no_vig"] = no_vig(market["handicap_odds"])


GROUP_TABLE = [
    {"team": "法国", "played": 2, "points": 6, "gf": 6, "ga": 1, "gd": 5},
    {"team": "挪威", "played": 2, "points": 6, "gf": 7, "ga": 3, "gd": 4},
    {"team": "塞内加尔", "played": 2, "points": 0, "gf": 3, "ga": 6, "gd": -3},
    {"team": "伊拉克", "played": 2, "points": 0, "gf": 1, "ga": 7, "gd": -6},
]

WEIGHTS = {
    "baseline_strength": 0.24,
    "recent_attack_defense": 0.20,
    "player_state_injury_rotation": 0.18,
    "tactical_matchup": 0.12,
    "schedule_environment": 0.06,
    "third_round_context": 0.12,
    "market_calibration": 0.08,
}


MATCHES = [
    {
        "match_id": "2026-06-27_I_R3_挪威_vs_法国",
        "file": GROUP_DIR / "2026-06-27_挪威_vs_法国_量化预测.md",
        "home": "挪威",
        "away": "法国",
        "market_key": "norway_france",
        "home_xg": 1.18,
        "away_xg": 1.40,
        "recommended_score": "1-1",
        "lean": "红队修正后仅临时发布：法国不败仍优先，但平局尾部上修",
        "factor_inputs": {
            "baseline_strength": "法国整体阵容深度、前场创造与防线质量仍高于挪威；挪威强点集中在哈兰德-厄德高链路。",
            "recent_attack_defense": "法国前两轮6进1失；挪威前两轮7进3失，进攻尾部上修但零封能力下修。",
            "player_state": "姆巴佩/登贝莱/奥利塞状态值高；哈兰德/厄德高状态值高；里尔森伤情待核降低挪威边路防守稳定性。",
            "tactical_matchup": "法国需要限制厄德高向哈兰德的早传和定位球二点；挪威可用快速直传与定位球攻击法国身后。",
            "third_round_context": "两队已基本锁定出线。法国因净胜球领先，平局大概率保小组第一；挪威需要赢球才主动争第一。",
            "market_calibration": "竞彩去水后法国胜约48.6%；红队要求修正法国品牌溢价与主客口径冲突，模型下调法国胜率并上修平局尾部。",
        },
        "team_strength_score": {
            "挪威": {"overall": 81, "attack": 86, "defense": 66, "form": 84},
            "法国": {"overall": 88, "attack": 90, "defense": 82, "form": 89},
        },
        "adjustments": [
            {"target": "挪威进攻xG", "delta": "+0.04", "reason": "前两轮高转化、哈兰德状态与争第一动机，但受法国控场压制"},
            {"target": "法国进攻xG", "delta": "-0.12", "reason": "法国平局足够，红队要求压低品牌溢价和末段冒险强度"},
            {"target": "挪威失球风险", "delta": "+0.06", "reason": "对强队时边路和后段防守稳定性仍待核验"},
        ],
        "predicted_lineups": {
            "status": "T-75官方首发未公布，以下为预测首发",
            "挪威": "4-2-3-1：尼兰德；佩德森/里尔森待核，阿耶尔，厄斯蒂高，梅勒-沃尔夫；贝格，托斯比；努萨，厄德高，鲍勃/索尔洛特；哈兰德",
            "法国": "4-3-3：迈尼昂；孔德，萨利巴，于帕梅卡诺，特奥；楚阿梅尼，拉比奥，卡马文加/坎特；登贝莱，姆巴佩，奥利塞/巴尔科拉",
        },
        "red_team_notes": [
            "不能用法国品牌直接压死挪威：哈兰德链路和定位球会放大比分尾部。",
            "法国若大轮换或领先后收节奏，法国胜率和大球概率需赛前下修。",
            "T-75首发、黄牌停赛、里尔森可用性是赛前必须复核项。",
        ],
    },
    {
        "match_id": "2026-06-27_I_R3_塞内加尔_vs_伊拉克",
        "file": GROUP_DIR / "2026-06-27_塞内加尔_vs_伊拉克_量化预测.md",
        "home": "塞内加尔",
        "away": "伊拉克",
        "market_key": "senegal_iraq",
        "home_xg": 1.52,
        "away_xg": 0.92,
        "recommended_score": "1-0",
        "lean": "红队修正后仅临时发布：塞内加尔小胜优先，防平局与伊拉克反击尾部",
        "factor_inputs": {
            "baseline_strength": "塞内加尔个人能力、防守对抗与边路冲击仍强于伊拉克。",
            "recent_attack_defense": "塞内加尔两战均有进球但失球6个；伊拉克两战仅1球、失7球。",
            "player_state": "伊斯梅拉-萨尔状态上修；门迪/库利巴利可用性与状态需复核；艾曼-侯赛因伤情待核影响伊拉克支点。",
            "tactical_matchup": "塞内加尔必须赢球会提高边路推进和反抢强度，但也给伊拉克低位反击与定位球留下空间。",
            "third_round_context": "塞内加尔赢球才有较现实第三名竞争力；伊拉克若想第三名需要赢球且最好大比分。",
            "market_calibration": "竞彩去水后塞内加尔胜约58.6%；红队指出普通1X2交叉验证不足，模型下调塞内加尔胜率并上修平局/冷门尾部。",
        },
        "team_strength_score": {
            "塞内加尔": {"overall": 71, "attack": 70, "defense": 58, "form": 63},
            "伊拉克": {"overall": 53, "attack": 49, "defense": 43, "form": 46},
        },
        "adjustments": [
            {"target": "塞内加尔进攻xG", "delta": "-0.10", "reason": "必须争胜但普通1X2交叉验证不足，红队要求压低热门净胜假设"},
            {"target": "伊拉克进攻xG", "delta": "+0.01", "reason": "艾曼-侯赛因可用性未确认，但塞内加尔压上会留下反击与定位球尾部"},
            {"target": "比赛方差", "delta": "+0.04", "reason": "第三轮末段追分会增加转换和空档"},
        ],
        "predicted_lineups": {
            "status": "T-75官方首发未公布，以下为预测首发",
            "塞内加尔": "4-3-3：门迪待核/迪昂；雅各布斯，库利巴利待核，尼亚卡特，萨巴利；盖耶，帕普-马塔尔-萨尔，库亚特/拉明-卡马拉；伊斯梅拉-萨尔，迪亚，马内/恩迪亚耶",
            "伊拉克": "4-2-3-1/5-4-1：哈桑；阿德南，塔赫辛，苏拉卡，萨德；阿姆贾德-阿特万，阿尔-阿马里；阿里-贾西姆，巴耶什，侯赛因-阿里；艾曼-侯赛因待核/阿尔-哈马迪",
        },
        "red_team_notes": [
            "塞内加尔必须赢不等于稳胜：压上后身后空间和门将状态是反向风险。",
            "伊拉克若艾曼-侯赛因缺阵，进攻xG和定位球威胁应继续下修。",
            "让球盘对塞内加尔净胜2球要求偏高，需警惕1球小胜或平局。",
        ],
    },
]


def build_match(match: dict[str, object]) -> dict[str, object]:
    home_xg = float(match["home_xg"])
    away_xg = float(match["away_xg"])
    matrix, tail = score_matrix(home_xg, away_xg)
    summary = full_poisson(home_xg, away_xg)
    market = MARKETS[str(match["market_key"])]
    implied = market["spf_implied_no_vig"]
    probs = summary["probabilities_1x2"]
    delta = {
        "home": probs["home"] - implied["home"],
        "draw": probs["draw"] - implied["draw"],
        "away": probs["away"] - implied["away"],
    }
    return {
        **{k: v for k, v in match.items() if k != "file"},
        "kickoff_beijing": "2026-06-27，具体开球时间以FIFA/竞彩赛前页最终显示为准",
        "sources_used": [
            "data/outputs/match_predictions/i-group-round1-postmortem.json",
            "data/outputs/match_predictions/i-group-round2-postmortem-20260623.json",
            "data/outputs/player_state/i-group-round2-state-iteration-20260623.json",
            market["source"],
        ],
        "factor_weights": WEIGHTS,
        "expected_goals": {
            str(match["home"]): home_xg,
            str(match["away"]): away_xg,
            "formula": f"P({match['home']}=h,{match['away']}=a)=e^-{home_xg}*{home_xg}^h/h! * e^-{away_xg}*{away_xg}^a/a!",
        },
        "poisson_score_matrix_0_to_5": matrix,
        "poisson_tail_probability_outside_0_to_5": tail,
        "probabilities_1x2": summary["probabilities_1x2"],
        "totals": summary["totals"],
        "top_scorelines": summary["top_scorelines"],
        "market": market,
        "model_market_delta": delta,
        "red_team_status": "revise; temporary_publish_only",
        "final_probabilities": summary["probabilities_1x2"],
    }


MATCH_OUTPUTS = [build_match(m) for m in MATCHES]


def rank_table(results: list[tuple[str, str, int, int]]) -> list[dict[str, object]]:
    table = {row["team"]: dict(row) for row in GROUP_TABLE}
    for home, away, hg, ag in results:
        table[home]["played"] += 1
        table[away]["played"] += 1
        table[home]["gf"] += hg
        table[home]["ga"] += ag
        table[away]["gf"] += ag
        table[away]["ga"] += hg
        table[home]["gd"] = table[home]["gf"] - table[home]["ga"]
        table[away]["gd"] = table[away]["gf"] - table[away]["ga"]
        if hg > ag:
            table[home]["points"] += 3
        elif hg == ag:
            table[home]["points"] += 1
            table[away]["points"] += 1
        else:
            table[away]["points"] += 3
    return sorted(table.values(), key=lambda r: (-r["points"], -r["gd"], -r["gf"], r["team"]))


def simulate_group() -> dict[str, object]:
    team_first = {row["team"]: 0.0 for row in GROUP_TABLE}
    team_second = {row["team"]: 0.0 for row in GROUP_TABLE}
    team_third = {row["team"]: 0.0 for row in GROUP_TABLE}
    team_top2 = {row["team"]: 0.0 for row in GROUP_TABLE}
    probs = {}
    for match in MATCH_OUTPUTS:
        home = str(match["home"])
        away = str(match["away"])
        matrix = match["poisson_score_matrix_0_to_5"]
        probs[(home, away)] = [
            (i, j, matrix[str(i)][str(j)]) for i in range(6) for j in range(6)
        ]
    total_mass = 0.0
    for n_h, n_a, p1 in probs[("挪威", "法国")]:
        for s_h, s_a, p2 in probs[("塞内加尔", "伊拉克")]:
            p = p1 * p2
            total_mass += p
            ranked = rank_table([("挪威", "法国", n_h, n_a), ("塞内加尔", "伊拉克", s_h, s_a)])
            team_first[ranked[0]["team"]] += p
            team_second[ranked[1]["team"]] += p
            team_third[ranked[2]["team"]] += p
            team_top2[ranked[0]["team"]] += p
            team_top2[ranked[1]["team"]] += p
    normalize = lambda d: {k: v / total_mass for k, v in d.items()}
    third = normalize(team_third)
    return {
        "method": "基于两场0-5泊松矩阵枚举；tail未再分配，因此第三名晋级为启发式估计。",
        "finish_first": normalize(team_first),
        "finish_second": normalize(team_second),
        "finish_third": third,
        "top_two": normalize(team_top2),
        "third_place_advancement_heuristic": {
            "塞内加尔": round(third["塞内加尔"] * 0.24, 6),
            "伊拉克": round(third["伊拉克"] * 0.12, 6),
            "法国": 0.0,
            "挪威": 0.0,
        },
        "notes": [
            "法国/挪威已锁定前二的概率按当前积分结构视作100%。",
            "法国打平即基本锁定小组第一；挪威必须击败法国才主动抢第一。",
            "塞内加尔/伊拉克只能争第三，且要看其他组第三名积分和净胜球。",
        ],
    }


PROJECT_THREADS = {
    "data_collector": "019eb053-ef96-7a22-9685-4602ba252b10",
    "tactics_coach": "019eb05a-a3ee-7023-9c89-42d9786d4685",
    "data_modeler": "019eb079-bed5-7342-9dfd-d1f448caa0dc",
    "red_team": "019eb05b-66db-7000-8a84-c453dece7ac3",
}


REPORT = {
    "schema": "worldcup_group_round3_prediction_v1",
    "created_at": CAPTURED_AT,
    "group": "I",
    "status": "temporary_publish_red_team_revised",
    "project_threads": PROJECT_THREADS,
    "current_standings": GROUP_TABLE,
    "tiebreaker_note": "小组排名按积分、净胜球、进球等通用顺序处理；若官方特殊细则或公平竞赛分触发，需赛后再核。",
    "round3_context": {
        "simultaneous_dependency": "同组第三轮应按同时开球处理；实时比分会改变末段压迫和换人。",
        "qualification_state": "法国与挪威6分基本锁定前二；塞内加尔与伊拉克0分，只能冲第三名横向比较。",
        "rotation_risk": "法国平局足够，存在末段降风险和小轮换；挪威争第一动机更直接。",
        "market_guard": "竞彩赔率只做校准，不与实力重复计数；T-75官方首发未公布，投注执行需赛前复核。",
    },
    "matches": MATCH_OUTPUTS,
    "simulated_group_outcomes": simulate_group(),
    "global_gaps": [
        "T-75官方首发未公布。",
        "累计黄牌/停赛未形成官方逐队结构表。",
        "挪威vs法国仍有主客顺序与市场标签冲突，赛前发布必须统一口径。",
        "里尔森、门迪、库利巴利、艾曼-侯赛因伤情需赛前刷新。",
        "塞内加尔vs伊拉克普通胜平负同源交叉验证不足，新浪同场结构化赔率未稳定取得。",
    ],
    "red_team_final_review": {
        "path": str(THREAD_DIR / "red-team-final-review.json"),
        "verdict": "revise",
        "publish_gate": "temporary_publish_only",
        "probability_adjustment": [
            "挪威vs法国：下调法国胜率，小幅上修平局尾部，保留挪威冷门尾部。",
            "塞内加尔vs伊拉克：下调塞内加尔胜率，小幅上修平局与伊拉克冷门尾部。",
        ],
    },
}


def matrix_markdown(match: dict[str, object]) -> str:
    matrix = match["poisson_score_matrix_0_to_5"]
    lines = ["| 主\\客 | 0 | 1 | 2 | 3 | 4 | 5 |", "|---|---:|---:|---:|---:|---:|---:|"]
    for i in range(6):
        row = [str(i)]
        for j in range(6):
            row.append(pct(matrix[str(i)][str(j)]))
        lines.append("| " + " | ".join(row) + " |")
    return "\n".join(lines)


def write_match_md(match: dict[str, object], path: Path) -> None:
    p1x2 = match["probabilities_1x2"]
    totals = match["totals"]
    top = ", ".join(f"{x['score']} {pct(x['probability'])}" for x in match["top_scorelines"])
    market = match["market"]
    implied = market["spf_implied_no_vig"]
    delta = match["model_market_delta"]
    lines = [
        f"# {match['home']} vs {match['away']}｜I组第三轮量化预测",
        "",
        f"- 生成时间：{CAPTURED_AT}",
        f"- 比赛编号：{market['match_no']}；竞彩来源：中国足彩网竞彩混合页",
        f"- 预测结论：{match['recommended_score']}，倾向：{match['lean']}",
        f"- xG：{match['home']} {match['home_xg']} / {match['away']} {match['away_xg']}",
        f"- 泊松算式：`{match['expected_goals']['formula']}`",
        "",
        "## 胜平负与大小球",
        "",
        f"- 模型胜平负：{match['home']}胜 {pct(p1x2['home'])} / 平 {pct(p1x2['draw'])} / {match['away']}胜 {pct(p1x2['away'])}",
        f"- 大小2.5：大 {pct(totals['over_2_5'])} / 小 {pct(totals['under_2_5'])}；双方进球 {pct(totals['both_teams_to_score_yes'])}",
        f"- Top5比分：{top}",
        "",
        "## 竞彩校准",
        "",
        f"- 普通胜平负赔率：{market['spf_odds'][0]} / {market['spf_odds'][1]} / {market['spf_odds'][2]}",
        f"- 去水隐含概率：主胜 {pct(implied['home'])} / 平 {pct(implied['draw'])} / 客胜 {pct(implied['away'])}",
        f"- 模型-市场差：主胜 {pct(delta['home'])} / 平 {pct(delta['draw'])} / 客胜 {pct(delta['away'])}",
        f"- 让球：{market['handicap']}，赔率 {market['handicap_odds'][0]} / {market['handicap_odds'][1]} / {market['handicap_odds'][2]}",
        "",
        "## 关键输入",
        "",
    ]
    lines.extend(f"- {k}：{v}" for k, v in match["factor_inputs"].items())
    lines.extend([
        "",
        "## 预测首发",
        "",
        f"- 状态：{match['predicted_lineups']['status']}",
    ])
    for team, lineup in match["predicted_lineups"].items():
        if team != "status":
            lines.append(f"- {team}：{lineup}")
    lines.extend([
        "",
        "## 泊松0-5矩阵",
        "",
        matrix_markdown(match),
        "",
        f"- 0-5矩阵外尾部概率：{pct(match['poisson_tail_probability_outside_0_to_5'])}",
        "",
        "## 红队风险",
        "",
    ])
    lines.extend(f"- {note}" for note in match["red_team_notes"])
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def write_summary_md() -> None:
    rows = []
    for match in MATCH_OUTPUTS:
        p = match["probabilities_1x2"]
        top = " / ".join(f"{x['score']} {pct(x['probability'])}" for x in match["top_scorelines"][:3])
        rows.append(
            f"| {match['market']['match_no']} | {match['home']} vs {match['away']} | "
            f"{match['home_xg']:.2f}-{match['away_xg']:.2f} | "
            f"{pct(p['home'])}/{pct(p['draw'])}/{pct(p['away'])} | "
            f"{match['recommended_score']} | {top} |"
        )
    sim = REPORT["simulated_group_outcomes"]
    first = sim["finish_first"]
    third_adv = sim["third_place_advancement_heuristic"]
    lines = [
        "# I组第三轮量化预测汇总",
        "",
        f"- 生成时间：{CAPTURED_AT}",
        "- 状态：红队修正版临时发布；四个专业线程均已回传，红队 verdict=revise，publish_gate=temporary_publish_only。",
        "- 注意：以下不是赛前最终投注指令，T-75首发、伤停、黄牌和即时赔率需刷新。",
        "",
        "## 预测表",
        "",
        "| 编号 | 比赛 | xG | 胜/平/负 | 首选比分 | Top3比分 |",
        "|---|---|---:|---:|---|---|",
        *rows,
        "",
        "## 小组形势",
        "",
        f"- 小组第一概率：法国 {pct(first['法国'])}，挪威 {pct(first['挪威'])}。",
        "- 法国/挪威当前6分，前二基本锁定；法国平局大概率第一，挪威必须赢球争第一。",
        f"- 第三名晋级启发式：塞内加尔 {pct(third_adv['塞内加尔'])}，伊拉克 {pct(third_adv['伊拉克'])}，需横向比较其他组第三名。",
        "",
        "## 关键风险",
        "",
    ]
    lines.extend(f"- {gap}" for gap in REPORT["global_gaps"])
    lines.append("")
    SUMMARY_MD.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    GROUP_DIR.mkdir(parents=True, exist_ok=True)
    THREAD_DIR.mkdir(parents=True, exist_ok=True)
    for match, original in zip(MATCH_OUTPUTS, MATCHES):
        write_match_md(match, original["file"])
    OUT_JSON.write_text(json.dumps(round_probs(REPORT), ensure_ascii=False, indent=2), encoding="utf-8")
    SUMMARY_JSON.write_text(json.dumps(round_probs(REPORT), ensure_ascii=False, indent=2), encoding="utf-8")
    write_summary_md()
    status = [
        "",
        f"## {CAPTURED_AT} I组第三轮预测",
        "",
        "- 状态：temporary_publish_red_team_revised；四个相关线程均已回传，红队 verdict=revise，publish_gate=temporary_publish_only。",
        f"- 数据采集线程：{PROJECT_THREADS['data_collector']}",
        f"- 战术教练线程：{PROJECT_THREADS['tactics_coach']}",
        f"- 数据模型线程：{PROJECT_THREADS['data_modeler']}",
        f"- 红队核验线程：{PROJECT_THREADS['red_team']}",
        f"- 输出：{OUT_JSON}",
        f"- 输出：{SUMMARY_JSON}",
        f"- 输出：{SUMMARY_MD}",
        f"- 输出：{MATCHES[0]['file']}",
        f"- 输出：{MATCHES[1]['file']}",
        "- 校验：脚本负责生成文件；运行后请用 json.tool 与字段检查追加复核结果。",
    ]
    with STATUS_FILE.open("a", encoding="utf-8") as f:
        f.write("\n".join(status) + "\n")


if __name__ == "__main__":
    main()
