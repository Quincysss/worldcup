from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BAD_PATTERN = re.compile(r"锛|绋|涓|婢|宸|鍦|熻|乱码|�")
FULL_ROSTER_HEADINGS = ("## 完整名单", "## 完整26人成员表", "## 26人成员表")

TEAMS = [
    ("mexico", "墨西哥"),
    ("south-africa", "南非"),
    ("south-korea", "韩国"),
    ("czechia", "捷克"),
]


def is_nonempty(value: object) -> bool:
    return isinstance(value, str) and value.strip() != ""


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def roster_paths(slug: str, team_cn: str) -> tuple[Path, Path, Path]:
    return (
        ROOT / "data" / "packets" / "rosters" / f"{slug}-roster.json",
        ROOT / "data" / "outputs" / "player_state" / f"{slug}-player-state.json",
        ROOT / "队伍" / team_cn / "成员表.md",
    )


def markdown_full_roster_row_count(text: str) -> int:
    lines = text.splitlines()
    count = 0
    in_section = False
    for line in lines:
        stripped = line.strip()
        if not in_section and stripped in FULL_ROSTER_HEADINGS:
            in_section = True
            continue
        if not in_section:
            continue
        if stripped.startswith("## "):
            break
        if not stripped.startswith("|"):
            continue
        cells = [cell.strip() for cell in stripped.strip("|").split("|")]
        if not cells or all(cell == "" for cell in cells):
            continue
        if all(set(cell) <= {"-", ":"} for cell in cells):
            continue
        if any(cell in {"中文名", "英文名"} for cell in cells):
            continue
        count += 1
    return count


def player_metrics(players: list[dict]) -> dict:
    total = len(players) or 1
    chinese_name = sum(1 for p in players if is_nonempty(p.get("chinese_name")))
    club_name_cn = sum(1 for p in players if is_nonempty(p.get("club_name_cn")))
    source_log = sum(1 for p in players if isinstance(p.get("source_log"), list) and len(p["source_log"]) > 0)
    market_value = sum(1 for p in players if p.get("market_value_eur") is not None)
    height = sum(1 for p in players if p.get("height_cm") is not None)
    preferred_foot = sum(1 for p in players if is_nonempty(p.get("preferred_foot")))
    ratings = sum(1 for p in players if isinstance(p.get("per_match_ratings"), list) and len(p["per_match_ratings"]) > 0)

    per_match_arrays_ok = all(isinstance(p.get("per_match_ratings"), list) for p in players)
    technical_arrays_ok = all(isinstance(p.get("technical_tags"), list) for p in players)
    technical_unique = len({tuple(p.get("technical_tags", [])) for p in players}) > 1

    return {
        "players_total": len(players),
        "chinese_name_ratio": chinese_name / total,
        "club_name_cn_ratio": club_name_cn / total,
        "source_log_ratio": source_log / total,
        "market_value_ratio": market_value / total,
        "height_ratio": height / total,
        "preferred_foot_ratio": preferred_foot / total,
        "rating_nonempty_ratio": ratings / total,
        "per_match_ratings_all_arrays": per_match_arrays_ok,
        "technical_tags_all_arrays": technical_arrays_ok,
        "technical_tags_not_single_team_phrase": technical_unique,
    }


def scan_file(path: Path) -> list[str]:
    hits = []
    for idx, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if BAD_PATTERN.search(line):
            hits.append(f"{path}:{idx}")
    return hits


def main() -> None:
    report: dict[str, object] = {"teams": {}, "encoding_hits": [], "all_json_parse_ok": True}
    for slug, team_cn in TEAMS:
        roster_path, state_path, md_path = roster_paths(slug, team_cn)
        team_report: dict[str, object] = {
            "roster_json_exists": roster_path.exists(),
            "player_state_json_exists": state_path.exists(),
            "markdown_exists": md_path.exists(),
        }
        try:
            roster = load_json(roster_path)
            team_report["roster_json_parse_ok"] = True
        except Exception as exc:  # noqa: BLE001
            report["all_json_parse_ok"] = False
            team_report["roster_json_parse_ok"] = False
            team_report["roster_json_error"] = str(exc)
            roster = {}
        try:
            state = load_json(state_path)
            team_report["player_state_json_parse_ok"] = True
        except Exception as exc:  # noqa: BLE001
            report["all_json_parse_ok"] = False
            team_report["player_state_json_parse_ok"] = False
            team_report["player_state_json_error"] = str(exc)
            state = {}

        players = roster.get("data", {}).get("players_full_roster", [])
        team_report.update(player_metrics(players if isinstance(players, list) else []))
        team_report["player_state_priority_count"] = len(state.get("data", {}).get("priority_players", []))

        if md_path.exists():
            md_text = md_path.read_text(encoding="utf-8")
            team_report["markdown_full_roster_rows"] = markdown_full_roster_row_count(md_text)
        else:
            team_report["markdown_full_roster_rows"] = 0

        report["encoding_hits"].extend(scan_file(roster_path))
        report["encoding_hits"].extend(scan_file(state_path))
        if md_path.exists():
            report["encoding_hits"].extend(scan_file(md_path))

        report["teams"][slug] = team_report

    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
