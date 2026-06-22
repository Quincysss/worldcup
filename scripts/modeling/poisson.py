"""Poisson scoreline utilities for match prediction outputs.

This module is intentionally small and dependency-free. It turns two expected
goal values into a visible score matrix, 1X2 probabilities, totals, and top
scorelines. JSON/Markdown generation scripts can import these functions instead
of reimplementing the same math in each team or group script.
"""

from __future__ import annotations

import argparse
import json
import math
from dataclasses import dataclass
from typing import Any


DEFAULT_VISIBLE_MAX_GOALS = 5
DEFAULT_CALC_MAX_GOALS = 12


@dataclass(frozen=True)
class TeamLambdas:
    team_a: str
    team_b: str
    lambda_a: float
    lambda_b: float


def poisson_pmf(goals: int, expected_goals: float) -> float:
    """Return P(X=goals) for a Poisson process with mean expected_goals."""
    if goals < 0:
        raise ValueError("goals must be >= 0")
    if expected_goals < 0:
        raise ValueError("expected_goals must be >= 0")
    return math.exp(-expected_goals) * (expected_goals**goals) / math.factorial(goals)


def _round_probability(value: float, unit: str, decimals: int) -> float:
    multiplier = 100.0 if unit == "percent" else 1.0
    return round(value * multiplier, decimals)


def score_matrix(
    lambda_a: float,
    lambda_b: float,
    max_goals: int = DEFAULT_VISIBLE_MAX_GOALS,
    unit: str = "percent",
    decimals: int = 2,
) -> dict[str, dict[str, float]]:
    """Build a visible 0..max_goals score matrix.

    Rows are team A goals and columns are team B goals. Values are independent
    Poisson probabilities in percent by default.
    """
    if max_goals < 0:
        raise ValueError("max_goals must be >= 0")
    matrix: dict[str, dict[str, float]] = {}
    for goals_a in range(max_goals + 1):
        row: dict[str, float] = {}
        prob_a = poisson_pmf(goals_a, lambda_a)
        for goals_b in range(max_goals + 1):
            prob = prob_a * poisson_pmf(goals_b, lambda_b)
            row[str(goals_b)] = _round_probability(prob, unit, decimals)
        matrix[str(goals_a)] = row
    return matrix


def _raw_score_distribution(
    lambda_a: float,
    lambda_b: float,
    calc_max_goals: int,
) -> list[tuple[int, int, float]]:
    """Build an internal score distribution up to calc_max_goals.

    A calc_max_goals of 12 is usually enough for normal football lambdas while
    keeping the omitted tail tiny. The omitted tail is still reported.
    """
    if calc_max_goals < 0:
        raise ValueError("calc_max_goals must be >= 0")
    distribution: list[tuple[int, int, float]] = []
    for goals_a in range(calc_max_goals + 1):
        prob_a = poisson_pmf(goals_a, lambda_a)
        for goals_b in range(calc_max_goals + 1):
            distribution.append((goals_a, goals_b, prob_a * poisson_pmf(goals_b, lambda_b)))
    return distribution


def derive_probabilities(
    lambda_a: float,
    lambda_b: float,
    calc_max_goals: int = DEFAULT_CALC_MAX_GOALS,
    unit: str = "percent",
    decimals: int = 2,
) -> dict[str, Any]:
    """Derive 1X2, totals, and top scorelines from the score distribution."""
    distribution = _raw_score_distribution(lambda_a, lambda_b, calc_max_goals)
    mass = sum(prob for _, _, prob in distribution)
    if mass <= 0:
        raise ValueError("score distribution has zero probability mass")

    team_a_win = sum(prob for a, b, prob in distribution if a > b) / mass
    draw = sum(prob for a, b, prob in distribution if a == b) / mass
    team_b_win = sum(prob for a, b, prob in distribution if a < b) / mass

    over_1_5 = sum(prob for a, b, prob in distribution if a + b > 1.5) / mass
    over_2_5 = sum(prob for a, b, prob in distribution if a + b > 2.5) / mass
    over_3_5 = sum(prob for a, b, prob in distribution if a + b > 3.5) / mass

    top_scorelines = sorted(distribution, key=lambda item: item[2], reverse=True)[:5]

    return {
        "probabilities_1x2": {
            "team_a_win": _round_probability(team_a_win, unit, decimals),
            "draw": _round_probability(draw, unit, decimals),
            "team_b_win": _round_probability(team_b_win, unit, decimals),
        },
        "totals_probabilities": {
            "over_1_5": _round_probability(over_1_5, unit, decimals),
            "under_1_5": _round_probability(1.0 - over_1_5, unit, decimals),
            "over_2_5": _round_probability(over_2_5, unit, decimals),
            "under_2_5": _round_probability(1.0 - over_2_5, unit, decimals),
            "over_3_5": _round_probability(over_3_5, unit, decimals),
            "under_3_5": _round_probability(1.0 - over_3_5, unit, decimals),
        },
        "top_scorelines": [
            {
                "score": f"{goals_a}-{goals_b}",
                "probability": _round_probability(prob / mass, unit, decimals),
            }
            for goals_a, goals_b, prob in top_scorelines
        ],
        "calculation_mass": _round_probability(mass, unit, decimals),
        "calculation_tail_probability": _round_probability(1.0 - mass, unit, decimals),
    }


def build_poisson_block(
    teams: TeamLambdas,
    visible_max_goals: int = DEFAULT_VISIBLE_MAX_GOALS,
    calc_max_goals: int = DEFAULT_CALC_MAX_GOALS,
    unit: str = "percent",
    decimals: int = 2,
) -> dict[str, Any]:
    """Return a complete JSON-compatible Poisson block for a match."""
    visible_matrix = score_matrix(
        teams.lambda_a,
        teams.lambda_b,
        max_goals=visible_max_goals,
        unit=unit,
        decimals=decimals,
    )
    visible_mass_raw = sum(
        poisson_pmf(a, teams.lambda_a) * poisson_pmf(b, teams.lambda_b)
        for a in range(visible_max_goals + 1)
        for b in range(visible_max_goals + 1)
    )
    derived = derive_probabilities(
        teams.lambda_a,
        teams.lambda_b,
        calc_max_goals=calc_max_goals,
        unit=unit,
        decimals=decimals,
    )
    return {
        "expected_goals": {
            teams.team_a: teams.lambda_a,
            teams.team_b: teams.lambda_b,
        },
        "poisson_score_matrix": {
            "team_a": teams.team_a,
            "team_b": teams.team_b,
            "probability_unit": unit,
            "visible_max_goals": visible_max_goals,
            "calculation_max_goals": calc_max_goals,
            "scores_0_to_visible_max": visible_matrix,
            "visible_matrix_mass": _round_probability(visible_mass_raw, unit, decimals),
            "visible_tail_probability": _round_probability(1.0 - visible_mass_raw, unit, decimals),
        },
        **derived,
    }


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a Poisson score matrix from two xG values.")
    parser.add_argument("--team-a", required=True, help="Team A display name")
    parser.add_argument("--team-b", required=True, help="Team B display name")
    parser.add_argument("--lambda-a", required=True, type=float, help="Team A expected goals")
    parser.add_argument("--lambda-b", required=True, type=float, help="Team B expected goals")
    parser.add_argument("--visible-max-goals", type=int, default=DEFAULT_VISIBLE_MAX_GOALS)
    parser.add_argument("--calc-max-goals", type=int, default=DEFAULT_CALC_MAX_GOALS)
    parser.add_argument("--decimals", type=int, default=2)
    parser.add_argument("--unit", choices=["percent", "probability"], default="percent")
    return parser.parse_args()


def main() -> None:
    args = _parse_args()
    teams = TeamLambdas(
        team_a=args.team_a,
        team_b=args.team_b,
        lambda_a=args.lambda_a,
        lambda_b=args.lambda_b,
    )
    block = build_poisson_block(
        teams,
        visible_max_goals=args.visible_max_goals,
        calc_max_goals=args.calc_max_goals,
        unit=args.unit,
        decimals=args.decimals,
    )
    print(json.dumps(block, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

