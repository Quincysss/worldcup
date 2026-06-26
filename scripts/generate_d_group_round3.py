import json
import math
from datetime import datetime, timedelta, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "比赛" / "未开始比赛" / "小组赛" / "D组"
THREAD = ROOT / "data" / "thread_outputs" / "d-group-round3-20260625"
NOW = datetime.now(timezone(timedelta(hours=8))).isoformat(timespec="seconds")


def no_vig(odds):
    raw = [1 / o for o in odds]
    total = sum(raw)
    return [r / total for r in raw], raw, total


def poisson(home_xg, away_xg, max_goals=7):
    home = [math.exp(-home_xg) * home_xg**i / math.factorial(i) for i in range(max_goals + 1)]
    away = [math.exp(-away_xg) * away_xg**i / math.factorial(i) for i in range(max_goals + 1)]
    scores = []
    home_win = draw = away_win = over25 = under25 = btts = 0.0
    for h, ph in enumerate(home):
        for a, pa in enumerate(away):
            p = ph * pa
            scores.append({"score": f"{h}-{a}", "probability": p})
            if h > a:
                home_win += p
            elif h == a:
                draw += p
            else:
                away_win += p
            if h + a >= 3:
                over25 += p
            else:
                under25 += p
            if h > 0 and a > 0:
                btts += p
    total = sum(s["probability"] for s in scores)
    top_scores = sorted(scores, key=lambda item: item["probability"], reverse=True)[:8]
    return {
        "home_win": round(home_win / total, 4),
        "draw": round(draw / total, 4),
        "away_win": round(away_win / total, 4),
        "over_2_5": round(over25 / total, 4),
        "under_2_5": round(under25 / total, 4),
        "btts_yes": round(btts / total, 4),
        "top_scores": [
            {"score": item["score"], "probability": round(item["probability"] / total, 4)}
            for item in top_scores
        ],
    }


def pct(value):
    return f"{value * 100:.1f}%"


SOURCES = [
    {
        "name": "中国足彩网竞彩混合页",
        "url": "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
        "captured": "2026-06-25 10:27:30 page systemTime",
        "usage": "竞彩编号、胜平负/让球胜平负赔率、销售状态",
    },
    {
        "name": "The Guardian Australia",
        "url": "https://www.theguardian.com/football/2026/jun/24/australia-changes-world-cup-paraguay",
        "captured": NOW,
        "usage": "澳大利亚伤停、晋级形势、巴拉圭 Almirón 停赛",
    },
    {
        "name": "Times Union USA vs Türkiye preview",
        "url": "https://www.timesunion.com/sports/article/2026-fifa-world-cup-team-usa-soccer-turkiye-22317813.php",
        "captured": NOW,
        "usage": "美国已锁定小组第一、土耳其出局和比赛动机；场地信息需以FIFA/场馆页临场复核",
    },
    {
        "name": "SoFi Stadium event page",
        "url": "https://www.sofistadium.com/events/detail/fifa-world-cup-turkiye-vs-usa",
        "captured": NOW,
        "usage": "土耳其 vs 美国比赛场地和开球时间交叉核验",
    },
]

TABLE = [
    {"team": "美国", "pts": 6, "gd": 5, "gf": 6, "ga": 1, "state": "已锁定小组第一"},
    {"team": "澳大利亚", "pts": 3, "gd": 0, "gf": 2, "ga": 2, "state": "平/胜巴拉圭即第二"},
    {"team": "巴拉圭", "pts": 3, "gd": -2, "gf": 2, "ga": 4, "state": "必须击败澳大利亚争第二"},
    {"team": "土耳其", "pts": 0, "gd": -3, "gf": 0, "ga": 3, "state": "已出局"},
]


def build_match(
    match_id,
    issue,
    home,
    away,
    spf_odds,
    rq_handicap,
    rq_odds,
    xg,
    final_probs,
    prediction,
    context,
    lineups,
    tactical,
    watchlist,
):
    market, raw, book = no_vig(spf_odds)
    rq_market, _, _ = no_vig(rq_odds)
    model = poisson(*xg)
    return {
        "match_id": match_id,
        "competition_round": "Group D Round 3",
        "issue_number": issue,
        "date_beijing": "2026-06-26 10:00",
        "home": home,
        "away": away,
        "status": "completed_prediction_discussion_only",
        "group_table_snapshot": TABLE,
        "odds": {
            "source": "中国足彩网竞彩混合页",
            "captured": "2026-06-25 10:27:30 page systemTime",
            "spf": {
                "odds": spf_odds,
                "raw_inverse": [round(item, 5) for item in raw],
                "no_vig_probability": [round(item, 4) for item in market],
                "booksum": round(book, 4),
            },
            "rqspf": {
                "handicap": rq_handicap,
                "odds": rq_odds,
                "no_vig_probability": [round(item, 4) for item in rq_market],
            },
        },
        "expected_goals": {"home": xg[0], "away": xg[1]},
        "poisson": model,
        "market_adjustment": {
            "market_no_vig": {
                "home_win": round(market[0], 4),
                "draw": round(market[1], 4),
                "away_win": round(market[2], 4),
            },
            "model_final": final_probs,
            "delta_vs_market": {
                "home_win": round(final_probs["home_win"] - market[0], 4),
                "draw": round(final_probs["draw"] - market[1], 4),
                "away_win": round(final_probs["away_win"] - market[2], 4),
            },
        },
        "third_round_context": context,
        "predicted_lineups": lineups,
        "tactical_read": tactical,
        "prediction": prediction,
        "red_team_status": "revise_completed_hold_discussion_only",
        "red_team_watchlist": watchlist,
    }


MATCHES = [
    build_match(
        "2026-06-25_PAR_AUS",
        "周四059",
        "巴拉圭",
        "澳大利亚",
        [2.63, 2.06, 3.80],
        "巴拉圭 -1",
        [6.10, 4.35, 1.36],
        (1.12, 1.08),
        {"home_win": 0.3547, "draw": 0.3398, "away_win": 0.3054},
        {
            "primary_score": "1-1",
            "secondary_scores": ["0-0", "1-0", "0-1"],
            "winner_pick": "平",
            "confidence": "medium-low",
            "totals": "小2.5倾向，模型小2.5约62%",
            "handicap_view": "澳大利亚受让/巴拉圭-1让负优于追巴拉圭大胜",
        },
        {
            "motivation_profile": "澳大利亚低风险拿平即可，巴拉圭必须胜。",
            "qualification_scenarios": "澳大利亚胜/平第二；巴拉圭胜第二。",
            "bracket_path_expectation": "第二名路径未完全确定，核心动机仍是确保出线。",
            "rotation_yellow_card_risk": "澳大利亚被动伤停轮换；巴拉圭被动替换 Almirón。",
            "strategic_tempo_adjustment": "澳大利亚保平触发前60分钟降速脚本，巴拉圭久攻不下后尾盘提速。",
            "draw_floor_dynamic": "泊松原始平局低于市场，因第三轮保平脚本将平局地板上调，但不过度追随43%市场平局。",
        },
        {
            "disclaimer": "T-75官方首发未公布，本节为赛前模型首发预测，不作为官方首发。",
            "home": "Gill; Cáceres/Alonso, Gustavo Gómez, Alderete; Cubas, Galarza/Diego Gómez; Enciso; Pitta/Sanabria；边路替代 Almirón",
            "away": "Beach; Geria/Circati/Souttar/Burgess/Bos; O'Neill, Okon-Engstler; Metcalfe, Irankunda/Velupillay; Toure/Yengi",
        },
        [
            "巴拉圭必须主动，但 Almirón 停赛削弱右路推进和反击第一脚。",
            "澳大利亚最合理路径是前60分钟降节奏，依靠身高、定位球和防线密度守住平局。",
            "若60分钟仍平，平局概率继续上升；若巴拉圭先丢球，尾盘会明显失衡。",
        ],
        [
            "竞彩平局低赔已经强烈表达保平预期，模型不能重复加权过度。",
            "澳大利亚 Italiano、Leckie 缺席会降低边路出球质量。",
            "巴拉圭若早早领先，澳大利亚的长传和定位球会抬高反向尾部。",
        ],
    ),
    build_match(
        "2026-06-25_TUR_USA",
        "周四060",
        "土耳其",
        "美国",
        [3.30, 3.50, 1.85],
        "土耳其 +1",
        [1.74, 4.00, 3.28],
        (1.00, 1.34),
        {"home_win": 0.2754, "draw": 0.2678, "away_win": 0.4568},
        {
            "primary_score": "1-2",
            "secondary_scores": ["1-1", "0-1", "0-2"],
            "winner_pick": "美国胜",
            "confidence": "medium",
            "totals": "2-3球区间，小2.5略优",
            "handicap_view": "美国胜优于美国-1穿；土耳其+1需临场看美国轮换强度",
        },
        {
            "motivation_profile": "美国已第一但要维护主场状态；土耳其出局后争体面。",
            "qualification_scenarios": "本场不改变美国第一/土耳其出局结论。",
            "bracket_path_expectation": "美国32强对手仍待其它组第三名排序，场地信息存在外部来源冲突，预测不把同场地优势作为硬因子。",
            "rotation_yellow_card_risk": "美国轮换风险中高，Pulisic 小腿问题按管理风险处理。",
            "strategic_tempo_adjustment": "美国不需要抢头名，领先后降速和控风险权重上调。",
            "turkey_dual_motivation": "土耳其同时保留低动机下滑与无压力反弹两条路径，不能简单按摆烂处理。",
        },
        {
            "disclaimer": "T-75官方首发未公布，本节为赛前模型首发预测，不作为官方首发。",
            "home": "Uğurcan Çakır; Mert Müldür, Demiral, Bardakcı, Kadıoğlu; Yüksek, Çalhanoğlu; Güler/Yıldız/Akgün/Aktürkoğlu",
            "away": "Freese/Turner; Freeman, Richards, Ream, Robinson/Scally; Adams/Musah, McKennie, Tillman/Reyna; Weah/Aaronson, Pepi/Balogun, Wright；Pulisic 管理",
        },
        [
            "美国不需要90分钟高压，但轮换阵容仍有纵深和定位球优势。",
            "土耳其前两场零进球不能等同于无进攻，低压状态下 Güler/Yıldız 可能回归效率。",
            "美国领先后可能降速保护体能，所以赢1球比穿2球更自然。",
        ],
        [
            "美国已锁第一，不能按满主力强队模型硬推大胜。",
            "土耳其出局不等于低对抗，射门样本可能回归。",
            "Pulisic 若临场确认缺阵，美国进攻上限需再下调。",
        ],
    ),
]


def match_markdown(match):
    spf = match["odds"]["spf"]
    rq = match["odds"]["rqspf"]
    model = match["poisson"]
    final_probs = match["market_adjustment"]["model_final"]
    prediction = match["prediction"]
    lines = [
        f"# {match['home']} vs {match['away']} D组第三轮量化预测",
        "",
        f"- 状态: {match['status']}",
        f"- 竞彩编号: {match['issue_number']}",
        f"- 北京时间: {match['date_beijing']}",
        f"- 生成时间: {NOW}",
        "",
        "## 数据来源",
    ]
    lines.extend(f"- {source['name']}: {source['url']} ({source['captured']})" for source in SOURCES)
    lines += [
        "",
        "## 小组形势快照",
        "| 队伍 | 积分 | 净胜球 | 进/失球 | 状态 |",
        "|---|---:|---:|---|---|",
    ]
    for team in TABLE:
        lines.append(f"| {team['team']} | {team['pts']} | {team['gd']} | {team['gf']}/{team['ga']} | {team['state']} |")
    lines += [
        "",
        "## 竞彩赔率与隐含概率",
        f"- 普通胜平负赔率: {spf['odds'][0]} / {spf['odds'][1]} / {spf['odds'][2]}",
        f"- 普通胜平负去水概率: {pct(spf['no_vig_probability'][0])} / {pct(spf['no_vig_probability'][1])} / {pct(spf['no_vig_probability'][2])}",
        f"- 让球胜平负: {rq['handicap']}，赔率 {rq['odds'][0]} / {rq['odds'][1]} / {rq['odds'][2]}",
        "",
        "## 首发预测约束",
        f"- 说明: {match['predicted_lineups']['disclaimer']}",
        f"- {match['home']}预测: {match['predicted_lineups']['home']}",
        f"- {match['away']}预测: {match['predicted_lineups']['away']}",
        "",
        "## 战术判断",
    ]
    lines.extend(f"- {item}" for item in match["tactical_read"])
    lines += [
        "",
        "## 泊松模型",
        f"- 预期进球: {match['home']} {match['expected_goals']['home']}，{match['away']} {match['expected_goals']['away']}",
        f"- 泊松1X2: {pct(model['home_win'])} / {pct(model['draw'])} / {pct(model['away_win'])}",
        f"- 大2.5/小2.5: {pct(model['over_2_5'])} / {pct(model['under_2_5'])}；双方进球Yes: {pct(model['btts_yes'])}",
        "- Top比分: " + ", ".join(f"{item['score']} {pct(item['probability'])}" for item in model["top_scores"][:5]),
        "",
        "## 市场校准后结论",
        f"- 最终胜平负概率: {pct(final_probs['home_win'])} / {pct(final_probs['draw'])} / {pct(final_probs['away_win'])}",
        f"- 模型-市场差异: 主胜 {match['market_adjustment']['delta_vs_market']['home_win']:+.3f}，平 {match['market_adjustment']['delta_vs_market']['draw']:+.3f}，客胜 {match['market_adjustment']['delta_vs_market']['away_win']:+.3f}",
        "",
        "## 最终预测",
        f"- 主比分: {prediction['primary_score']}",
        f"- 备选比分: {', '.join(prediction['secondary_scores'])}",
        f"- 胜平负: {prediction['winner_pick']}，信心 {prediction['confidence']}",
        f"- 总进球: {prediction['totals']}",
        f"- 让球观察: {prediction['handicap_view']}",
        "",
        "## 红队风险",
        f"- 结论: {match['red_team_status']}",
    ]
    lines.extend(f"- {item}" for item in match["red_team_watchlist"])
    lines.append("")
    return "\n".join(lines)


def summary_markdown():
    lines = [
        "# D组第三轮量化预测汇总",
        "",
        f"- 生成时间: {NOW}",
        "- 工作流: 数据采集 -> 战术判断 -> 泊松/市场模型 -> 红队校验 -> 落文件 -> 校验",
        "- 线程参与: data_collector / tactics_coach / modeler / red_team。",
        "",
        "## 预测表",
        "| 比赛 | 竞彩编号 | 赔率SPF | 市场去水 | 模型最终概率 | 主比分 | 胜平负 | 总进球 |",
        "|---|---|---|---|---|---|---|---|",
    ]
    for match in MATCHES:
        spf = match["odds"]["spf"]
        final_probs = match["market_adjustment"]["model_final"]
        prediction = match["prediction"]
        lines.append(
            f"| {match['home']} vs {match['away']} | {match['issue_number']} | "
            f"{spf['odds'][0]}/{spf['odds'][1]}/{spf['odds'][2]} | "
            f"{pct(spf['no_vig_probability'][0])}/{pct(spf['no_vig_probability'][1])}/{pct(spf['no_vig_probability'][2])} | "
            f"{pct(final_probs['home_win'])}/{pct(final_probs['draw'])}/{pct(final_probs['away_win'])} | "
            f"{prediction['primary_score']} | {prediction['winner_pick']} | {prediction['totals']} |"
        )
    lines += [
        "",
        "## 红队总闸",
        "- 红队结论: revise + hold + discussion_only。T-75前不得把预测首发当官方首发；美国轮换和巴拉圭/澳大利亚战术性平局是最大误差源。",
        "- 若用于购彩，必须临场复核官方首发、销售状态、赔率变化和伤停变化。",
        "",
        "## 输出文件",
    ]
    for filename in FILES.values():
        lines.append(f"- {OUT / (filename + '.md')}")
        lines.append(f"- {OUT / (filename + '.json')}")
    lines.append(f"- {OUT / 'D组第三轮量化预测汇总_20260625.json'}")
    lines.append("")
    return "\n".join(lines)


FILES = {
    "2026-06-25_PAR_AUS": "2026-06-25_巴拉圭_vs_澳大利亚_量化预测",
    "2026-06-25_TUR_USA": "2026-06-25_土耳其_vs_美国_量化预测",
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    THREAD.mkdir(parents=True, exist_ok=True)
    for match in MATCHES:
        stem = FILES[match["match_id"]]
        (OUT / f"{stem}.md").write_text(match_markdown(match), encoding="utf-8")
        (OUT / f"{stem}.json").write_text(json.dumps(match, ensure_ascii=False, indent=2), encoding="utf-8")

    summary = {
        "generated_at": NOW,
        "workflow": "facts -> tactics -> model probabilities -> red-team -> files -> validation -> short report",
        "group": "D",
        "round": 3,
        "sources": SOURCES,
        "group_table_snapshot": TABLE,
        "matches": MATCHES,
    }
    summary_md = summary_markdown()
    (OUT / "D组第三轮量化预测汇总_20260625.md").write_text(summary_md, encoding="utf-8")
    (OUT / "D组第三轮量化预测汇总_20260625.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    (THREAD / "summary.md").write_text(summary_md, encoding="utf-8")
    (THREAD / "data-collector.md").write_text(
        "# D组第三轮数据采集摘要\n\n"
        "- 中国足彩网竞彩页 systemTime: 2026-06-25 10:27:30。\n"
        "- 周四059 巴拉圭 vs 澳大利亚: SPF 2.63/2.06/3.80；RQ(-1) 6.10/4.35/1.36。\n"
        "- 周四060 土耳其 vs 美国: SPF 3.30/3.50/1.85；RQ(+1) 1.74/4.00/3.28。\n"
        "- 澳大利亚 Italiano、Leckie 伤缺；巴拉圭 Almirón 停赛；美国 Pulisic 小腿问题按管理风险处理。\n",
        encoding="utf-8",
    )
    (THREAD / "tactics-coach.md").write_text(
        "# D组第三轮战术摘要\n\n"
        "- 巴拉圭必须胜，但 Almirón 停赛降低推进质量；澳大利亚伤停迫使右路/边路调整，最合理路径是控风险保平。\n"
        "- 美国已第一，但主场与淘汰赛同场地带来状态维护动机；土耳其出局后可能无压力反弹。\n"
        "- 官方T-75首发未出，所有首发仅为预测区间。\n",
        encoding="utf-8",
    )
    (THREAD / "modeler.md").write_text(
        "# D组第三轮建模摘要\n\n"
        "- 巴拉圭 vs 澳大利亚: xG 1.12-1.08；最终 35.47%/33.98%/30.54%，主比分 1-1。\n"
        "- 土耳其 vs 美国: xG 1.00-1.34；最终 27.54%/26.78%/45.68%，主比分 1-2。\n"
        "- 泊松Top比分和JSON已写入比赛目录。\n",
        encoding="utf-8",
    )
    (THREAD / "red-team.md").write_text(
        "# D组第三轮红队摘要\n\n"
        "- revise + hold + discussion_only。\n"
        "- 已修正: 巴拉圭净胜球/失球、巴澳保平脚本、美土轮换降速、Almirón停赛、Leckie/Italiano伤缺、场地冲突不入硬因子。\n"
        "- 必须临场复核: 官方首发、销售状态、赔率变化、Pulisic/澳大利亚伤停确认。\n",
        encoding="utf-8",
    )
    print(json.dumps({"status": "written", "match_files": list(FILES.values())}, ensure_ascii=False))


if __name__ == "__main__":
    main()
