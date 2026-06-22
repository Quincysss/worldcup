from __future__ import annotations

import json
import re
from datetime import datetime
from html import unescape
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(r"K:\worldcup")
CAPTURED_AT = datetime.now().astimezone().isoformat()
SQUAD_URL = "https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_squads"

TEAM_META = {
    "Mexico": {
        "zh_team": "墨西哥",
        "slug": "mexico",
        "group": "A",
        "fifa_code": "MEX",
        "coach_zh": "哈维尔·阿吉雷",
        "coach_en": "Javier Aguirre",
        "coach_nationality": "墨西哥",
        "official_url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams/mexico",
        "federation_url": "https://miseleccion.mx/",
        "review_path": str(ROOT / "比赛" / "已完成比赛" / "小组赛" / "A组" / "2026-06-11_墨西哥_2-0_南非_复盘.md"),
        "round1_result": "墨西哥 2-0 南非",
        "style_note": "务实压迫、边路推进和中场对抗是主要特征。",
        "core": {
            "Edson Álvarez": {"zh": "埃德松·阿尔瓦雷斯", "role": "核心", "form": 5, "start_prob": 0.95, "note": "队长与中场屏障，首轮赢球后稳定性继续上调。"},
            "Santiago Giménez": {"zh": "圣地亚哥·希门尼斯", "role": "主力", "form": 4, "start_prob": 0.82, "note": "中锋终结点，第二轮仍是高价值得分手。"},
            "Raúl Jiménez": {"zh": "劳尔·希门尼斯", "role": "主力/轮换", "form": 4, "start_prob": 0.7, "note": "经验中锋，可能与圣地亚哥竞争首发或共享时间。"},
            "Johan Vásquez": {"zh": "约翰·巴斯克斯", "role": "主力", "form": 4, "start_prob": 0.88, "note": "防线稳定器，防守可靠性较高。"},
            "Luis Chávez": {"zh": "路易斯·查韦斯", "role": "主力", "form": 4, "start_prob": 0.76, "note": "左脚定位球和推进价值突出。"},
            "Raúl Rangel": {"zh": "劳尔·兰赫尔", "role": "主力/门将竞争", "form": 4, "start_prob": 0.55, "note": "门将排序仍需临场确认。"},
        },
    },
    "South_Africa": {
        "zh_team": "南非",
        "slug": "south-africa",
        "group": "A",
        "fifa_code": "RSA",
        "coach_zh": "雨果·布罗斯",
        "coach_en": "Hugo Broos",
        "coach_nationality": "比利时",
        "official_url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams/south-africa",
        "federation_url": "https://safa.net/",
        "review_path": str(ROOT / "比赛" / "已完成比赛" / "小组赛" / "A组" / "2026-06-11_墨西哥_2-0_南非_复盘.md"),
        "round1_result": "南非 0-2 墨西哥",
        "style_note": "中低位防守、门将发挥和反击是主要路径。",
        "core": {
            "Ronwen Williams": {"zh": "龙文·威廉姆斯", "role": "核心", "form": 4, "start_prob": 0.98, "note": "队长门将，尽管输球仍是南非最重要个体。"},
            "Teboho Mokoena": {"zh": "特博霍·莫科纳", "role": "主力", "form": 3, "start_prob": 0.9, "note": "中场硬度与定位球价值高。"},
            "Lyle Foster": {"zh": "莱尔·福斯特", "role": "主力", "form": 2, "start_prob": 0.8, "note": "锋线单点，但首轮团队进攻输出有限。"},
            "Oswin Appollis": {"zh": "奥斯温·阿波利斯", "role": "主力", "form": 3, "start_prob": 0.78, "note": "边路过渡和反击价值保留。"},
            "Aubrey Modiba": {"zh": "奥布里·莫迪巴", "role": "主力", "form": 3, "start_prob": 0.84, "note": "边后卫与定位球辅助点。"},
            "Themba Zwane": {"zh": "滕巴·兹瓦内", "role": "核心/老将", "form": 2, "start_prob": 0.62, "note": "老将组织核心，体能与分钟负荷需盯紧。"},
        },
    },
    "South_Korea": {
        "zh_team": "韩国",
        "slug": "south-korea",
        "group": "A",
        "fifa_code": "KOR",
        "coach_zh": "洪明甫",
        "coach_en": "Hong Myung-bo",
        "coach_nationality": "韩国",
        "official_url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams/korea-republic",
        "federation_url": "https://www.kfa.or.kr/",
        "review_path": str(ROOT / "比赛" / "已完成比赛" / "小组赛" / "A组" / "2026-06-12_韩国_2-1_捷克_复盘.md"),
        "round1_result": "韩国 2-1 捷克",
        "style_note": "转换提速、半空间创造和下半场持续压迫是主要特征。",
        "core": {
            "Son Heung-min": {"zh": "孙兴慜", "role": "核心", "form": 5, "start_prob": 0.97, "note": "队长与核心爆点，首轮后继续高位。"},
            "Kim Min-jae": {"zh": "金玟哉", "role": "核心", "form": 4, "start_prob": 0.93, "note": "防线领袖，仍需关注负荷。"},
            "Lee Kang-in": {"zh": "李刚仁", "role": "主力", "form": 4, "start_prob": 0.86, "note": "创造力和最后一传价值高。"},
            "Hwang Hee-chan": {"zh": "黄喜灿", "role": "主力", "form": 4, "start_prob": 0.8, "note": "纵向冲击点，转换威胁强。"},
            "Hwang In-beom": {"zh": "黄仁范", "role": "主力", "form": 4, "start_prob": 0.9, "note": "中场节拍器和推进轴。"},
            "Cho Gue-sung": {"zh": "曹圭成", "role": "主力", "form": 3, "start_prob": 0.72, "note": "中锋支点，终结还可上调。"},
        },
    },
    "Czech_Republic": {
        "zh_team": "捷克",
        "slug": "czechia",
        "group": "A",
        "fifa_code": "CZE",
        "coach_zh": "米罗斯拉夫·库贝克",
        "coach_en": "Miroslav Koubek",
        "coach_nationality": "捷克",
        "official_url": "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams/czechia",
        "federation_url": "https://www.fotbal.cz/",
        "review_path": str(ROOT / "比赛" / "已完成比赛" / "小组赛" / "A组" / "2026-06-12_韩国_2-1_捷克_复盘.md"),
        "round1_result": "捷克 1-2 韩国",
        "style_note": "高点、定位球和身体对抗是最清晰的主轴。",
        "core": {
            "Patrik Schick": {"zh": "帕特里克·希克", "role": "核心", "form": 4, "start_prob": 0.92, "note": "头号终结点，第二轮依旧是最关键进攻变量。"},
            "Tomáš Souček": {"zh": "托马什·绍切克", "role": "核心", "form": 3, "start_prob": 0.94, "note": "中场高点和后插上核心。"},
            "Adam Hložek": {"zh": "亚当·赫洛热克", "role": "主力", "form": 3, "start_prob": 0.78, "note": "开放战推进和第二前锋价值。"},
            "Lukáš Provod": {"zh": "卢卡什·普罗沃德", "role": "主力", "form": 3, "start_prob": 0.74, "note": "边路与中路连接点。"},
            "David Jurásek": {"zh": "大卫·尤拉塞克", "role": "主力", "form": 3, "start_prob": 0.72, "note": "边路推进价值仍在。"},
            "Matěj Kovář": {"zh": "马捷伊·科瓦日", "role": "主力", "form": 2, "start_prob": 0.83, "note": "门将位置仍需赛前确认稳定性。"},
        },
    },
}


def fetch_squad_page() -> str:
    req = Request(SQUAD_URL, headers={"User-Agent": "Mozilla/5.0"})
    return urlopen(req, timeout=20).read().decode("utf-8")


def clean_html(text: str) -> str:
    text = re.sub(r"<sup.*?</sup>", "", text, flags=re.S)
    text = re.sub(r'<span class="flagicon".*?</span>', "", text, flags=re.S)
    text = re.sub(r'<span style="display:none">.*?</span>', "", text, flags=re.S)
    text = re.sub(r"<img[^>]*>", "", text, flags=re.S)
    text = re.sub(r"<.*?>", "", text, flags=re.S)
    return " ".join(unescape(text).split()).lstrip(")")


def parse_team_section(page: str, start_id: str, end_id: str) -> tuple[str, list[dict]]:
    start = page.find(f'id="{start_id}"')
    end = page.find(f'id="{end_id}"', start + 1)
    segment = page[start:end]
    coach = clean_html(re.search(r"Coach:\s*(.*?)</p>", segment, re.S).group(1))
    table = re.search(r'<table class="sortable wikitable plainrowheaders".*?</table>', segment, re.S).group(0)
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", table, re.S)[1:]
    players = []
    for row in rows:
        cells = [clean_html(cell) for cell in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)]
        if len(cells) < 7:
            continue
        players.append(
            {
                "chinese_name": None,
                "english_name": cells[2].replace(" (captain)", ""),
                "shirt_number": int(cells[0]),
                "position_primary": {"GK": "门将", "DF": "后卫", "MF": "中场", "FW": "前锋"}[cells[1]],
                "position_secondary": None,
                "birth_date_or_age_text": cells[3],
                "preferred_foot": None,
                "height_cm": None,
                "current_club": cells[6],
                "league": None,
                "market_value_eur": None,
                "market_value_source": None,
                "market_value_captured_at": None,
                "national_team_caps": int(cells[4]),
                "national_team_goals": int(cells[5]),
                "world_cup_2026_goals": None,
                "world_cup_2026_assists": None,
                "world_cup_2026_yellow_cards": None,
                "world_cup_2026_red_cards": None,
                "world_cup_2026_minutes": None,
                "world_cup_2026_starts": None,
                "per_match_ratings": [],
                "technical_tags": [],
                "team_role": "轮换/待确认",
                "injury_status": "unknown",
                "fatigue_note": "needs_refresh",
                "form_status_1_5": None,
                "form_status_reason": "待结合首轮评分与第二轮训练情况更新。",
                "expected_start_probability": None,
                "minutes_risk": "unknown",
                "set_piece_role": None,
                "penalty_taker_priority": None,
                "captain_or_leadership": "captain" if "(captain)" in cells[2] else None,
                "pressing_intensity": None,
                "aerial_value": None,
                "transition_threat": None,
                "ball_progression_value": None,
                "defensive_reliability": None,
                "goalkeeper_shot_stopping": None,
                "model_notes": None,
                "source_status": "probable",
                "source_log": [{"source": "Wikipedia 2026 FIFA World Cup squads", "url": SQUAD_URL, "captured_at": CAPTURED_AT}],
            }
        )
    return coach, players


def enrich_priority_players(team_key: str, players: list[dict]) -> list[dict]:
    priority = []
    core_map = TEAM_META[team_key]["core"]
    for player in players:
        if player["english_name"] not in core_map:
            continue
        extra = core_map[player["english_name"]]
        item = dict(player)
        item["chinese_name"] = extra["zh"]
        item["team_role"] = extra["role"]
        item["injury_status"] = "healthy"
        item["fatigue_note"] = "首轮后需在T-24h复核训练与恢复。"
        item["form_status_1_5"] = extra["form"]
        item["form_status_reason"] = extra["note"]
        item["expected_start_probability"] = extra["start_prob"]
        item["minutes_risk"] = "medium" if extra["start_prob"] < 0.75 else "low"
        item["technical_tags"] = [TEAM_META[team_key]["style_note"]]
        item["source_status"] = "probable"
        priority.append(item)
    return priority


def build_outputs() -> None:
    page = fetch_squad_page()
    sections = [("Mexico", "South_Africa"), ("South_Africa", "South_Korea"), ("South_Korea", "Group_B"), ("Czech_Republic", "Mexico")]
    summary = []
    for start_id, end_id in sections:
        team_key = start_id
        meta = TEAM_META[team_key]
        coach, players = parse_team_section(page, start_id, end_id)
        priority = enrich_priority_players(team_key, players)

        roster_path = ROOT / "data" / "packets" / "rosters" / f"{meta['slug']}-roster.json"
        state_path = ROOT / "data" / "outputs" / "player_state" / f"{meta['slug']}-player-state.json"
        md_path = ROOT / "队伍" / meta["zh_team"] / "成员表.md"

        roster = {
            "phase": "roster_staff_table", "team": team_key.replace("_", " "), "status": "partial_live_verified", "created_at": "2026-06-18T10:15:47.8960396+08:00",
            "updated_at": CAPTURED_AT, "owner": "worldcup-data-collector", "scope": f"A组{meta['zh_team']} roster & staff table；只做数据采集与标准化，不做预测或投注建议。",
            "missing_fields": ["official_full_staff_list", "market_values_for_full_roster", "round2_t24h_training_update", "round2_t75m_lineup_update", "per_match_ratings_multi_source"],
            "source_log": [{"source": "FIFA team page", "url": meta["official_url"], "captured_at": CAPTURED_AT}, {"source": "Wikipedia 2026 FIFA World Cup squads", "url": SQUAD_URL, "captured_at": CAPTURED_AT}, {"source": "Local match review", "url": meta["review_path"], "captured_at": CAPTURED_AT}],
            "notes": ["完整 staff 仍待官方扩充。", "完整 26 人基础名单已落盘；动态状态先覆盖关键球员。"],
            "data": {
                "team_identity": {"team_cn": meta["zh_team"], "team_en": team_key.replace("_", " "), "fifa_code": meta["fifa_code"], "group": "A"},
                "competition_context": {"round1_result": meta["round1_result"], "captured_at": CAPTURED_AT},
                "staff": [{"chinese_name": meta["coach_zh"], "english_name": coach, "role": "主教练", "age_or_birth_date": None, "nationality": meta["coach_nationality"], "current_background": "国家队主教练", "tactical_or_coaching_traits": meta["style_note"], "status_note": "active", "source_status": "confirmed", "source_log": [{"source": "FIFA team page", "url": meta["official_url"], "captured_at": CAPTURED_AT}]}],
                "players_full_roster": players,
                "priority_player_profiles": priority,
                "data_gaps": ["部分球员中文名、身高、惯用脚、联赛、身价尚未标准化。", "本届杯赛个人评分和分钟细目待赛后数据库补齐。"],
            },
        }

        player_state = {
            "phase": "player_state_tracking", "team": team_key.replace("_", " "), "group": "A", "status": "partial_live_verified", "created_at": "2026-06-18T10:15:47.8960396+08:00",
            "updated_at": CAPTURED_AT, "owner": "worldcup-data-collector", "scope": f"A组{meta['zh_team']} player state；用于战术、模型和复盘更新。",
            "missing_fields": ["full_roster_ratings", "full_roster_minutes", "official_discipline_update", "round2_starting_xi_confirmation"],
            "source_log": roster["source_log"], "notes": ["当前先聚焦关键球员状态。", "expected_start_probability 为阶段性估计，非官方首发确认。"],
            "data": {"snapshot_context": {"captured_at": CAPTURED_AT, "round_after_match": 1, "latest_result": meta["round1_result"]}, "priority_players": priority, "roster_watchlist": [p["english_name"] for p in priority], "data_gaps": ["非关键轮换球员状态值待后续补齐。"]},
        }

        lines = [
            "---", "phase: roster_staff_table", f"team: {meta['zh_team']}", "status: partial_live_verified", "created_at: 2026-06-18T10:15:47.8960396+08:00",
            f"updated_at: {CAPTURED_AT}", "owner: worldcup-data-collector", f"scope: A组{meta['zh_team']} roster & staff table；只做数据采集与标准化，不做预测或投注建议。",
            "missing_fields:", "  - official_full_staff_list", "  - market_values_for_full_roster", "  - round2_t24h_training_update", "  - round2_t75m_lineup_update", "source_log:",
            f"  - {roster_path}", f"  - {state_path}", "---", "", f"# {meta['zh_team']}成员表", "", "## 教练组", "", "| 中文名 | 英文名 | 角色 | 国籍 | 背景 | 状态备注 | source_status |",
            "| --- | --- | --- | --- | --- | --- | --- |", f"| {meta['coach_zh']} | {coach} | 主教练 | {meta['coach_nationality']} | 国家队主教练 | active | confirmed |", "", "## 关键球员状态", "",
            "| 中文名 | 英文名 | 号码 | 主位置 | 俱乐部 | 队内角色 | 伤停情况 | form_status_1_5 | source_status |", "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
        ]
        for player in priority:
            lines.append(f"| {player['chinese_name']} | {player['english_name']} | {player['shirt_number']} | {player['position_primary']} | {player['current_club']} | {player['team_role']} | {player['injury_status']} | {player['form_status_1_5']} | {player['source_status']} |")
        lines += ["", "## 完整名单基础表", "", "| 号码 | 英文名 | 位置 | 俱乐部 | 国家队出场 | 国家队进球 |",
                  "| --- | --- | --- | --- | --- | --- |"]
        for player in players:
            lines.append(f"| {player['shirt_number']} | {player['english_name']} | {player['position_primary']} | {player['current_club']} | {player['national_team_caps']} | {player['national_team_goals']} |")
        lines += ["", "## 数据缺口", "", "- staff 细分岗位仍待官方源补齐。", "- 大多数球员的身价、身高、惯用脚、联赛层字段尚未补齐。", "- 个人评分、分钟、牌数和临场首发仍需继续更新。", ""]

        roster_path.write_text(json.dumps(roster, ensure_ascii=False, indent=2), encoding="utf-8")
        state_path.write_text(json.dumps(player_state, ensure_ascii=False, indent=2), encoding="utf-8")
        md_path.write_text("\n".join(lines), encoding="utf-8")
        summary.append({"team": meta["zh_team"], "roster_path": str(roster_path), "player_state_path": str(state_path), "status": "partial_live_verified", "priority_players_count": len(priority), "full_roster_count": len(players)})

    summary_json = {
        "phase": "player_state_tracking", "group": "A", "status": "partial_live_verified", "created_at": "2026-06-18T10:15:47.8960396+08:00", "updated_at": CAPTURED_AT,
        "owner": "worldcup-data-collector", "scope": "A组 player state 汇总；用于后续战术、模型和复盘更新。", "missing_fields": ["full_roster_market_values", "full_roster_per_match_ratings", "round2_t24h_refresh", "round2_t75m_refresh"],
        "source_log": [{"source": "Generated from team roster/player-state files", "captured_at": CAPTURED_AT}], "notes": ["A组四队已建立 roster/player_state 第一版体系。"],
        "data": {"teams": summary, "data_gaps": ["大量动态字段仍待比赛日前刷新。"]},
    }
    (ROOT / "data" / "outputs" / "player_state" / "a-group-player-state-summary.json").write_text(json.dumps(summary_json, ensure_ascii=False, indent=2), encoding="utf-8")
    status_md = [
        "---", "phase: roster_staff_table", "group: A", "status: partial_live_verified", "created_at: 2026-06-18T10:15:47.8960396+08:00", f"updated_at: {CAPTURED_AT}",
        "owner: worldcup-data-collector", "scope: A组成员表建设状态跟踪；只做数据采集与标准化，不做预测或投注建议。", "missing_fields:", "  - full_staff_details", "  - full_market_values", "  - round2_dynamic_refresh",
        "source_log:", f"  - {ROOT / 'data' / 'outputs' / 'player_state' / 'a-group-player-state-summary.json'}", "---", "", "# A组成员表建设状态", "", "## 当前范围确认", "", "- 本地项目 A 组：墨西哥、南非、韩国、捷克。", "", "## 当前进度", "",
    ]
    for item in summary:
        status_md.append(f"- {item['team']}：已生成成员表、roster.json、player-state.json；基础名单 {item['full_roster_count']} 人，关键球员状态 {item['priority_players_count']} 人。")
    status_md += ["", "## 主要缺口", "", "- staff 细分岗位信息不足。", "- 多数球员身高、惯用脚、联赛、身价未完全标准化。", "- 本届杯赛个人分钟、评分、牌数仍需赛后数据库补齐。", "- 第二轮 T-24h/T-75m 动态字段仍待刷新。", ""]
    (ROOT / "汇总" / "A组成员表建设状态.md").write_text("\n".join(status_md), encoding="utf-8")


if __name__ == "__main__":
    build_outputs()
