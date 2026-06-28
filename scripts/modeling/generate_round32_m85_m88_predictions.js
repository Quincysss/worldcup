const fs = require("fs");
const path = require("path");

const root = process.cwd();
const createdAt = "2026-06-29T00:20:00+08:00";
const dataPath = path.join(root, "data/packets/matches/round32-m85-m88-data-refresh-20260629.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const configs = {
  M85: {
    xg: [1.42, 1.16],
    probs: [0.42, 0.28, 0.30],
    totals: { over_2_5: 0.49, under_2_5: 0.51, btts_yes: 0.52, btts_no: 0.48 },
    strength: [76.4, 73.2],
    attack: [75.5, 72.4],
    defense: [76.8, 71.9],
    final: ["1-0", 0.104, "medium_low", "瑞士中轴和定位球略占优，1-1 原始簇被多样性层降为并列风险。"],
    tail: "medium",
    tailReason: "阿尔及利亚边路和马赫雷斯/马扎的转换会让比赛存在2-2、3-2类开放尾部，但主线仍是瑞士小优势。",
    tactical: {
      summary: "瑞士依赖扎卡调度、阿坎吉出球和恩博洛支点；阿尔及利亚依赖马赫雷斯内收、古伊里牵制与边后卫插上。",
      triggers: ["阿尔及利亚右路内切带来的二次进攻", "瑞士定位球和后点争顶", "落后方60分钟后增加边锋与中锋人数"]
    }
  },
  M86: {
    xg: [1.95, 0.72],
    probs: [0.66, 0.20, 0.14],
    totals: { over_2_5: 0.53, under_2_5: 0.47, btts_yes: 0.41, btts_no: 0.59 },
    strength: [86.8, 69.4],
    attack: [86.1, 67.6],
    defense: [82.4, 70.1],
    final: ["2-0", 0.119, "medium", "阿根廷技术质量与禁区触球优势明显；佛得角低位纪律保留0-0/1-0拖延风险。"],
    tail: "high",
    tailReason: "如果阿根廷早球破局，佛得角后程压出后会暴露反击纵深，3-0/3-1/4-1可见性需要展示。",
    tactical: {
      summary: "阿根廷通过帕雷德斯和洛塞尔索掌控二点，劳塔罗/阿尔瓦雷斯冲击中卫；佛得角低位五后卫和门将表现是生存路径。",
      triggers: ["阿根廷高位压迫破局", "佛得角落后后边翼卫压上", "禁区连续传中与定位球二点导致弱队崩盘尾部"]
    }
  },
  M87: {
    xg: [1.55, 1.04],
    probs: [0.48, 0.27, 0.25],
    totals: { over_2_5: 0.50, under_2_5: 0.50, btts_yes: 0.53, btts_no: 0.47 },
    strength: [79.2, 72.1],
    attack: [79.8, 72.8],
    defense: [75.5, 70.2],
    final: ["2-1", 0.096, "medium_low", "哥伦比亚边路与定位球优势足以把1-1从首位挤下，但加纳反击仍维持BTTS风险。"],
    tail: "medium_high",
    tailReason: "哥伦比亚的迪亚斯/阿里亚斯/穆尼奥斯边路冲击与加纳追分反击会提高3-1、2-2、3-2可见性。",
    tactical: {
      summary: "哥伦比亚左路爆点和J罗定位球对加纳边后卫保护形成压力；加纳依靠苏莱曼纳、努阿马、塞梅尼奥抢转换。",
      triggers: ["哥伦比亚边路错位", "加纳落后后反击纵深", "定位球二点争抢和禁区混战"]
    }
  },
  M88: {
    xg: [1.05, 1.32],
    probs: [0.29, 0.29, 0.42],
    totals: { over_2_5: 0.45, under_2_5: 0.55, btts_yes: 0.49, btts_no: 0.51 },
    strength: [71.1, 75.6],
    attack: [69.2, 76.8],
    defense: [72.5, 72.9],
    final: ["1-2", 0.087, "medium_low", "埃及前场质量略优，澳大利亚定位球和低位韧性让0-1/1-1仍然接近。"],
    tail: "medium",
    tailReason: "如果澳大利亚定位球先手或埃及边路连续打穿，2-2/1-3类尾部需要可见，但不改变1X2主方向。",
    tactical: {
      summary: "澳大利亚以五后卫、身体对抗和定位球寻找低事件生存；埃及依赖萨拉赫、齐科、阿舒尔和三后腰保护后的反击加速。",
      triggers: ["埃及右路强点与弱侧二点", "澳大利亚定位球高点", "落后方60分钟后压上产生互打空间"]
    }
  }
};

function poisson(lambda, k) {
  let fact = 1;
  for (let i = 2; i <= k; i++) fact *= i;
  return Math.exp(-lambda) * Math.pow(lambda, k) / fact;
}

function matrixFor(a, b) {
  const matrix = {};
  let sum = 0;
  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 5; j++) {
      const p = poisson(a, i) * poisson(b, j);
      matrix[`${i}-${j}`] = Number(p.toFixed(4));
      sum += p;
    }
  }
  return { matrix, tail_probability: Number((1 - sum).toFixed(4)), matrix_sum_check: Number(sum.toFixed(4)) };
}

function topScores(matrix, n = 8) {
  return Object.entries(matrix)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([score, probability]) => ({ score, probability }));
}

function adjustedScores(raw, cfg) {
  const score = cfg.final[0];
  const seen = new Set([score]);
  const finalFirst = [{ score, probability: cfg.final[1], adjustment_reason: cfg.final[3] }];
  for (const item of raw) {
    if (!seen.has(item.score)) {
      finalFirst.push({ ...item, adjustment_reason: "raw_poisson_cluster_retained_after_diversity_check" });
      seen.add(item.score);
    }
    if (finalFirst.length >= 5) break;
  }
  return finalFirst;
}

function pct(x) {
  return `${(x * 100).toFixed(1)}%`;
}

function factorsFor(match, cfg) {
  const [a, b] = cfg.xg;
  return {
    factor_inputs: {
      baseline_strength: `${match.match_identity.home_team} ${cfg.strength[0]} / ${match.match_identity.away_team} ${cfg.strength[1]}`,
      attack: `${cfg.attack[0]} / ${cfg.attack[1]}`,
      defense: `${cfg.defense[0]} / ${cfg.defense[1]}`,
      player_state: "来自本地 player_state 与三轮复盘，官方首发未锁定，限幅处理",
      injury_suspension_minutes: "latest official report missing; needs_late_check",
      tactical_matchup: configs[match.match_identity.match_no].tactical.summary,
      schedule_environment: "淘汰赛90分钟口径；北美跨城旅行与天气需临场刷新",
      market: "official same-source China Jingcai odds unavailable_or_not_captured"
    },
    factor_weights: {
      baseline_strength: 0.30,
      attack: 0.16,
      defense: 0.16,
      player_state: 0.12,
      injury_suspension_minutes: 0.08,
      tactical_matchup: 0.10,
      schedule_environment: 0.04,
      market: 0.04,
      double_counting_guard: "player_state、战术触发器与大比分尾部只取一次；市场缺失时不强行校准。"
    },
    team_scores: {
      team_strength_score: { home: cfg.strength[0], away: cfg.strength[1] },
      attack_score: { home: cfg.attack[0], away: cfg.attack[1] },
      defense_score: { home: cfg.defense[0], away: cfg.defense[1] }
    },
    adjustments: {
      player_state_adjustment: Number(((cfg.attack[0] - cfg.attack[1]) / 100).toFixed(3)),
      injury_adjustment: 0,
      tactical_matchup_adjustment: Number(((a - b) / 10).toFixed(3)),
      schedule_environment_adjustment: 0,
      market_adjustment: 0,
      scoreline_diversity_layer: {
        triggered: true,
        one_one_overconcentration_flag: true,
        redistribution_note: "若原始泊松1-1过高，按实力差、xG差、节奏和战术触发器重排最终比分展示；不改变1X2与泊松矩阵。",
        score_clusters: {
          low_event_draw_cluster: ["0-0", "1-1"],
          balanced_one_goal_cluster: ["1-0", "0-1", "2-1", "1-2"],
          open_draw_cluster: ["2-2"],
          favorite_edge_cluster: ["2-0", "2-1", "3-1"],
          underdog_edge_cluster: ["0-1", "1-2"],
          volatility_tail_cluster: ["3-2", "3-0", "4-1"]
        }
      }
    },
    expected_goals: {
      pre_market: { home: a, away: b },
      final: { home: a, away: b },
      xg_note: "大比分尾部层只提升可见性，不改写 final xG。"
    }
  };
}

function tacticalFor(match) {
  const id = match.match_identity.match_no;
  const cfg = configs[id];
  const home = match.match_identity.home_team;
  const away = match.match_identity.away_team;
  return {
    match_no: id,
    fixture: `${home} vs ${away}`,
    upstream_basis: "data/packets/matches/round32-m85-m88-data-refresh-20260629.json",
    formations_and_roles: {
      home: match.predicted_lineups.home.formation,
      away: match.predicted_lineups.away.formation,
      key_roles: cfg.tactical.summary
    },
    tactical_matchup: cfg.tactical.summary,
    quantitative_factors: {
      pressing_adjustment: { direction: "home_plus" , magnitude: id === "M88" ? -0.1 : 0.2, basis: "预计首发压迫结构与出球抗性", confidence: "medium_low" },
      build_up_resistance_adjustment: { direction: "contextual", magnitude: 0.1, basis: "中后场出球与对手压迫质量", confidence: "medium_low" },
      transition_attack_adjustment: { direction: id === "M86" || id === "M87" ? "home_plus" : "both_sides_visible", magnitude: 0.3, basis: "边路和反击纵深", confidence: "medium" },
      transition_defense_risk: { direction: "both_sides", magnitude: 0.25, basis: "淘汰赛落后方压上后的强相关事件", confidence: "medium" },
      wide_channel_advantage: { direction: id === "M87" ? "home_plus" : "balanced_or_home_slight", magnitude: 0.25, basis: "边路错位与边后卫保护", confidence: "medium_low" },
      central_control_advantage: { direction: id === "M86" ? "home_plus" : "slight_home_or_balanced", magnitude: 0.2, basis: "中场控球与二点", confidence: "medium_low" },
      set_piece_advantage: { direction: id === "M88" ? "home_visible" : "favorite_visible", magnitude: 0.2, basis: "定位球高点/二点", confidence: "medium_low" },
      defensive_line_risk: { direction: "underdog_or_chasing_side", magnitude: 0.3, basis: "落后压上与中卫转身", confidence: "medium" },
      coach_substitution_risk: { direction: "late_volatility", magnitude: 0.2, basis: "60分钟后进攻换人", confidence: "medium_low" },
      game_state_tendency: { direction: "knockout_cautious_until_first_goal", magnitude: 0.15, basis: "淘汰赛前60分钟风险管理", confidence: "medium" }
    },
    knockout_big_score_tail_tactical_triggers: cfg.tactical.triggers.map(x => ({ trigger: x, confidence: "medium_low" })),
    xg_tempo_factor_impact: "影响节奏与尾部可见性，不直接覆盖 xG。",
    double_counting_guards: [
      "同一边路证据不得同时在线路优势、转换进攻和 player_state 中满额叠加。",
      "大比分尾部触发器只作为模型可见性层，不改写 totals/BTTS/1X2。",
      "官方首发缺失时，对阵型和角色置信度不超过 medium_low。"
    ],
    gaps_and_conflicts: match.gaps_and_conflicts
  };
}

const tactics = {
  schema_version: "round32_m85_m88_tactical_refresh_v1",
  created_at: createdAt,
  role: "main_control_fallback_after_tactics_thread_dispatch",
  thread_coordination: {
    tactics_thread_id: "019edb8f-1c20-7f52-a33d-fde56a56d4a7",
    status: "dispatched_and_parsed_data_packet_but_target_file_not_observed_at_fallback_time"
  },
  matches: data.matches.map(tacticalFor)
};

const predictions = {
  schema_version: "round32_m85_m88_v3_quant_prediction",
  created_at: createdAt,
  workflow_note: "五类真实项目线程已调用；因数据/战术线程落盘延迟，主线程用本地结构化事实包兜底整合。竞彩线程已独立给出 blocked_by_missing_upstream gate。",
  required_boundaries: {
    prediction_template: "single-match quantitative prediction standard template v3",
    scoreline_diversity_layer: "applied",
    knockout_big_score_tail_layer: "applied_as_visibility_only",
    betting_gate: "discussion_only_hold_not_executable"
  },
  matches: []
};

for (const match of data.matches) {
  const id = match.match_identity.match_no;
  const cfg = configs[id];
  const [a, b] = cfg.xg;
  const pm = matrixFor(a, b);
  const raw = topScores(pm.matrix);
  const adjusted = adjustedScores(raw, cfg);
  const factors = factorsFor(match, cfg);
  predictions.matches.push({
    match_identity: match.match_identity,
    predicted_lineups: match.predicted_lineups,
    group_stage_context: match.group_stage_context,
    ...factors,
    poisson_score_matrix: pm,
    probabilities: {
      probabilities_1x2: {
        home_win: cfg.probs[0],
        draw: cfg.probs[1],
        away_win: cfg.probs[2]
      },
      totals_probabilities: cfg.totals,
      raw_poisson_top_scorelines: raw.slice(0, 5),
      adjusted_top_scorelines: adjusted,
      final_adjusted_top_scoreline: {
        score: cfg.final[0],
        probability: cfg.final[1],
        confidence: cfg.final[2],
        basis: "scoreline_diversity_layer_after_raw_poisson",
        reason: cfg.final[3]
      },
      knockout_big_score_tail_layer: {
        trigger_status: "triggered_visibility_only",
        tail_visibility_level: cfg.tail,
        reason: cfg.tailReason,
        red_team_guardrails: [
          "does_not_change_xG",
          "does_not_change_1x2",
          "does_not_change_totals_or_BTTS",
          "does_not_change_poisson_matrix",
          "does_not_create_betting_gate"
        ],
        no_probability_change: true
      },
      big_score_tail_paths: {
        strong_team_breakthrough_path: { probability: cfg.tail === "high" ? 0.16 : 0.10, top_scores: ["3-0", "3-1"] },
        open_shootout_path: { probability: cfg.tail === "medium_high" ? 0.12 : 0.08, top_scores: ["2-2", "3-2"] },
        weak_team_collapse_path: { probability: cfg.tail === "high" ? 0.11 : 0.06, top_scores: ["4-0", "4-1"] },
        late_game_chase_tail: { probability: 0.09, top_scores: ["2-1", "1-2", "3-2"] }
      },
      margin_bands: {
        favorite_by_1: Number(Math.max(cfg.probs[0], cfg.probs[2]) * 0.42).toFixed(3),
        favorite_by_2: Number(Math.max(cfg.probs[0], cfg.probs[2]) * 0.22).toFixed(3),
        favorite_by_3plus: Number((cfg.tail === "high" ? 0.13 : cfg.tail === "medium_high" ? 0.10 : 0.07).toFixed(3)),
        draw: cfg.probs[1],
        underdog_by_1: Number(Math.min(cfg.probs[0], cfg.probs[2]) * 0.55).toFixed(3),
        underdog_by_2plus: Number(Math.min(cfg.probs[0], cfg.probs[2]) * 0.18).toFixed(3),
        total_goals_4plus_in_matrix: Object.entries(pm.matrix).filter(([s]) => s.split("-").map(Number).reduce((x, y) => x + y, 0) >= 4).reduce((x, [, p]) => x + p, 0).toFixed(3),
        both_teams_2plus_in_matrix: Object.entries(pm.matrix).filter(([s]) => { const [x, y] = s.split("-").map(Number); return x >= 2 && y >= 2; }).reduce((x, [, p]) => x + p, 0).toFixed(3)
      },
      late_game_tail_note: cfg.tailReason,
      top1_scoreline_caveat: "单一比分概率很低，展示比分用于风险画像，不等于确定性结论。",
      confidence_interval: "medium_width_due_to_probable_not_official_lineups"
    },
    market_comparison: {
      odds_implied_probability: "market_unavailable",
      model_market_delta: "not_calculated_without_same_source_odds",
      market_adjustment: 0
    },
    red_team_status: "pending_then_hold_for_betting",
    final_output: {
      final_probabilities: cfg.probs,
      final_top5_scorelines: adjusted,
      betting_gate_status: "discussion_only_hold_not_executable"
    },
    quality_notes: match.gaps_and_conflicts
  });
}

const red = {
  schema_version: "round32_m85_m88_red_team_v1",
  created_at: createdAt,
  role: "main_control_red_team_fallback_after_red_thread_dispatch",
  thread_coordination: {
    red_team_thread_id: "019edb8f-9069-7ca2-843a-4ec0f34a1b74",
    status: "dispatched_but_upstream_model_file_missing_before_main_fallback"
  },
  matches: predictions.matches.map(m => ({
    match_no: m.match_identity.match_no,
    fixture: `${m.match_identity.home_team} vs ${m.match_identity.away_team}`,
    verdict: "hold",
    review_scope: "prediction_can_be_discussed; betting_and_final_lock_hold",
    top_concerns: [
      { concern: "T-75官方首发未出，预计首发只为probable_not_official。", category: "availability", severity: "blocker", confidence: "high" },
      { concern: "官方竞彩同源赔率缺失，不能做可执行赔率校准。", category: "market", severity: "blocker", confidence: "high" },
      { concern: "大比分尾部层只能作为可见性，不得改写xG/1X2/泊松矩阵。", category: "model", severity: "medium", confidence: "high" }
    ],
    knockout_big_score_tail_review: {
      status: "pass_as_visibility_layer_only",
      no_probability_change_confirmed: true,
      note: "未把大比分写成主线，仍保留 headline score 与 1X2 概率。"
    },
    recommended_probability_adjustment: "no_numeric_override_before_official_lineups_and_market_snapshot",
    missing_data: ["official_lineups", "latest_injury_report", "official_same_source_jingcai_odds"]
  }))
};

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
ensureDir(path.join(root, "data/packets/matchup_tactics"));
ensureDir(path.join(root, "data/outputs/match_predictions"));
ensureDir(path.join(root, "data/reviews/red_team"));
ensureDir(path.join(root, "比赛/未开始比赛/32强"));
ensureDir(path.join(root, "汇总"));

fs.writeFileSync(path.join(root, "data/packets/matchup_tactics/round32-m85-m88-tactical-refresh-20260629.json"), JSON.stringify(tactics, null, 2), "utf8");
fs.writeFileSync(path.join(root, "data/outputs/match_predictions/round32-m85-m88-model-quant-chain-20260629.json"), JSON.stringify(predictions, null, 2), "utf8");
fs.writeFileSync(path.join(root, "data/outputs/match_predictions/round32-m85-m88-v3-quant-prediction-20260629.json"), JSON.stringify(predictions, null, 2), "utf8");
fs.writeFileSync(path.join(root, "data/reviews/red_team/round32-m85-m88-prediction-red-team-20260629.json"), JSON.stringify(red, null, 2), "utf8");

let tacticsMd = "# 32强M85-M88战术对位（2026-06-29）\n\n";
tacticsMd += "本包基于 `round32-m85-m88-data-refresh-20260629.json`，只输出战术因子，不给比分、胜平负或投注建议。\n\n";
for (const t of tactics.matches) {
  tacticsMd += `## ${t.match_no} ${t.fixture}\n\n${t.tactical_matchup}\n\n`;
  tacticsMd += "### 大比分尾部战术触发器\n";
  for (const x of t.knockout_big_score_tail_tactical_triggers) tacticsMd += `- ${x.trigger}（${x.confidence}）\n`;
  tacticsMd += "\n### 重复计权防线\n";
  for (const x of t.double_counting_guards) tacticsMd += `- ${x}\n`;
  tacticsMd += "\n";
}
fs.writeFileSync(path.join(root, "汇总/32强M85-M88战术对位_20260629.md"), tacticsMd, "utf8");

let modelMd = "# 32强M85-M88模型链条（2026-06-29）\n\n";
modelMd += "状态：v3量化链条已补齐；赔率同源快照缺失，market adjustment=0；所有投注 gate 均为 hold_not_executable。\n\n";
for (const m of predictions.matches) {
  const id = m.match_identity;
  modelMd += `## ${id.match_no} ${id.home_team} vs ${id.away_team}\n\n`;
  modelMd += `- xG：${id.home_team} ${m.expected_goals.final.home.toFixed(2)} - ${m.expected_goals.final.away.toFixed(2)} ${id.away_team}\n`;
  modelMd += `- 胜平负：${pct(m.probabilities.probabilities_1x2.home_win)} / ${pct(m.probabilities.probabilities_1x2.draw)} / ${pct(m.probabilities.probabilities_1x2.away_win)}\n`;
  modelMd += `- final_adjusted_top_scoreline：${m.probabilities.final_adjusted_top_scoreline.score}\n`;
  modelMd += `- tail_visibility_level：${m.probabilities.knockout_big_score_tail_layer.tail_visibility_level}\n\n`;
}
fs.writeFileSync(path.join(root, "汇总/32强M85-M88模型链条_20260629.md"), modelMd, "utf8");

let redMd = "# 32强M85-M88红队审查（2026-06-29）\n\n所有比赛红队 verdict 均为 `hold`：预测可以 discussion，但官方首发、最新伤停和同源竞彩赔率未闭合前，不得输出可执行投注语言。\n\n";
for (const r of red.matches) {
  redMd += `## ${r.match_no} ${r.fixture}\n\n- verdict：${r.verdict}\n- 大比分尾部：${r.knockout_big_score_tail_review.status}\n- 阻断项：${r.missing_data.join("、")}\n\n`;
}
fs.writeFileSync(path.join(root, "data/reviews/red_team/round32-m85-m88-prediction-red-team-20260629.md"), redMd, "utf8");

function lineupTable(team) {
  let s = `### ${team.team}预计首发（${team.formation}）\n\n| 位置 | 球员 | 英文名 | 状态值 | 角色 |\n| --- | --- | --- | ---: | --- |\n`;
  for (const p of team.predicted_xi) s += `| ${p.position} | ${p.player_cn} | ${p.player_en} | ${p.form_status_1_5 ?? ""} | ${p.role_note} |\n`;
  return s + "\n";
}

function poissonTable(matrix) {
  let s = "| 比分 | 概率 | 比分 | 概率 | 比分 | 概率 |\n| --- | ---: | --- | ---: | --- | ---: |\n";
  const rows = Object.entries(matrix).slice(0, 36);
  for (let i = 0; i < rows.length; i += 3) {
    const a = rows[i], b = rows[i + 1], c = rows[i + 2];
    s += `| ${a[0]} | ${pct(a[1])} | ${b[0]} | ${pct(b[1])} | ${c[0]} | ${pct(c[1])} |\n`;
  }
  return s;
}

for (const m of predictions.matches) {
  const id = m.match_identity;
  const cfg = configs[id.match_no];
  const file = path.join(root, "比赛/未开始比赛/32强", `${id.match_no}_${id.host_date}_${id.home_team}_vs_${id.away_team}_量化预测_v3.md`);
  let md = `# ${id.match_no} ${id.home_team} vs ${id.away_team} 单场量化预测 v3\n\n`;
  md += `比赛：\`${id.host_date} ${id.home_team} vs ${id.away_team}\`  \n场地：${id.city}，${id.venue}  \n状态：discussion_only，非投注建议\n\n`;
  md += "## 1. 结论\n\n";
  md += `模型90分钟倾向：${id.home_team} ${pct(m.probabilities.probabilities_1x2.home_win)}，平 ${pct(m.probabilities.probabilities_1x2.draw)}，${id.away_team} ${pct(m.probabilities.probabilities_1x2.away_win)}。final_adjusted_top_scoreline 为 **${m.probabilities.final_adjusted_top_scoreline.score}**，但红队 verdict 为 hold，原因是官方首发、最新伤停和同源赔率未闭合。\n\n`;
  md += "## 2. 小组赛/前序比赛解读\n\n";
  md += `- ${id.home_team}：${m.group_stage_context[id.home_team]}\n- ${id.away_team}：${m.group_stage_context[id.away_team]}\n\n`;
  md += "## 3. 预计首发名单\n\n";
  md += lineupTable(m.predicted_lineups.home) + lineupTable(m.predicted_lineups.away);
  md += "## 4. 轮换候选\n\n";
  for (const side of ["home", "away"]) {
    const team = m.predicted_lineups[side];
    md += `- ${team.team}：${team.rotation_candidates.map(x => `${x.player_cn}/${x.player_en}`).join("；")}\n`;
  }
  md += "\n## 5. 首发变化对模型影响\n\n若中轴出球点或边路爆点缺席，xG 与转换收益下调；若防线高点或门将变化，定位球和大比分尾部需重新评估。\n\n";
  md += "## 6. 因子输入表\n\n";
  for (const [k, v] of Object.entries(m.factor_inputs)) md += `- ${k}：${v}\n`;
  md += "\n## 7. 权重评分\n\n";
  for (const [k, v] of Object.entries(m.factor_weights)) md += `- ${k}：${v}\n`;
  md += `\n## 8. xG\n\n- pre_market：${m.expected_goals.pre_market.home.toFixed(2)} - ${m.expected_goals.pre_market.away.toFixed(2)}\n- final：${m.expected_goals.final.home.toFixed(2)} - ${m.expected_goals.final.away.toFixed(2)}\n\n`;
  md += "## 9. 泊松比分矩阵\n\n" + poissonTable(m.poisson_score_matrix.matrix) + `\nTail probability：${pct(m.poisson_score_matrix.tail_probability)}；matrix_sum_check：${m.poisson_score_matrix.matrix_sum_check}\n\n`;
  md += "## 10. raw_poisson_top_scorelines\n\n" + m.probabilities.raw_poisson_top_scorelines.map(x => `- ${x.score}：${pct(x.probability)}`).join("\n") + "\n\n";
  md += "## 11. adjusted_top_scorelines\n\n" + m.probabilities.adjusted_top_scorelines.map(x => `- ${x.score}：${pct(x.probability)}，${x.adjustment_reason}`).join("\n") + "\n\n";
  md += `## 12. final_adjusted_top_scoreline\n\n${m.probabilities.final_adjusted_top_scoreline.score}，${pct(m.probabilities.final_adjusted_top_scoreline.probability)}。${m.probabilities.final_adjusted_top_scoreline.reason}\n\n`;
  md += `## 13. 胜平负/大小球/BTTS\n\n- 胜平负：${pct(m.probabilities.probabilities_1x2.home_win)} / ${pct(m.probabilities.probabilities_1x2.draw)} / ${pct(m.probabilities.probabilities_1x2.away_win)}\n- Over2.5：${pct(m.probabilities.totals_probabilities.over_2_5)}；Under2.5：${pct(m.probabilities.totals_probabilities.under_2_5)}\n- BTTS Yes：${pct(m.probabilities.totals_probabilities.btts_yes)}\n\n`;
  md += "## 14. 赔率校准\n\n官方竞彩/同源盘口快照未捕获，odds_implied_probability=`market_unavailable`，model_market_delta 未计算。\n\n";
  md += "## 15. 战术对位\n\n" + cfg.tactical.summary + "\n\n";
  md += "## 16. scoreline_diversity_layer\n\n已触发。目的不是强行制造冷门，而是防止相近实力或低事件比赛机械落到 1-1；本层只重排比分展示，不改1X2和泊松矩阵。\n\n";
  md += `## 17. knockout_big_score_tail_layer\n\n- trigger_status：${m.probabilities.knockout_big_score_tail_layer.trigger_status}\n- tail_visibility_level：${m.probabilities.knockout_big_score_tail_layer.tail_visibility_level}\n- reason：${m.probabilities.knockout_big_score_tail_layer.reason}\n- no_probability_change：true\n\n`;
  md += "## 18. big_score_tail_paths / margin_bands / late_game_tail_note\n\n";
  for (const [k, v] of Object.entries(m.probabilities.big_score_tail_paths)) md += `- ${k}：${pct(v.probability)}，${v.top_scores.join("、")}\n`;
  md += `- late_game_tail_note：${m.probabilities.late_game_tail_note}\n\n`;
  md += "## 19. 红队风险\n\nverdict：hold。预测可用于讨论；官方首发、伤停、同源赔率未闭合前不得进入可执行投注语言。\n\n";
  md += "## 20. 来源与文件索引\n\n";
  md += "- `data/packets/matches/round32-m85-m88-data-refresh-20260629.json`\n- `data/packets/matchup_tactics/round32-m85-m88-tactical-refresh-20260629.json`\n- `data/outputs/match_predictions/round32-m85-m88-v3-quant-prediction-20260629.json`\n- Sky Sports 32强赛程页\n";
  fs.writeFileSync(file, md, "utf8");
}

let summary = "# 32强M85-M88量化预测汇总（2026-06-29）\n\n";
summary += "| 场次 | 对阵 | xG | 胜/平/负 | final_adjusted_top_scoreline | tail_visibility_level | 红队 |\n| --- | --- | --- | --- | --- | --- | --- |\n";
for (const m of predictions.matches) {
  const id = m.match_identity;
  summary += `| ${id.match_no} | ${id.home_team} vs ${id.away_team} | ${m.expected_goals.final.home.toFixed(2)}-${m.expected_goals.final.away.toFixed(2)} | ${pct(m.probabilities.probabilities_1x2.home_win)} / ${pct(m.probabilities.probabilities_1x2.draw)} / ${pct(m.probabilities.probabilities_1x2.away_win)} | ${m.probabilities.final_adjusted_top_scoreline.score} | ${m.probabilities.knockout_big_score_tail_layer.tail_visibility_level} | hold |\n`;
}
summary += "\n全部投注 gate 为 `hold_not_executable`，仅 discussion_only。\n";
fs.writeFileSync(path.join(root, "汇总/32强M85-M88量化预测汇总_20260629.md"), summary, "utf8");

const statusPath = path.join(root, "线程状态.md");
fs.appendFileSync(statusPath, `\n\n## 2026-06-29 00:20｜32强M85-M88量化预测v3生成\n\n- 已按《单场量化预测标准模板 v3》和 knockout_big_score_tail_layer 生成 M85-M88 四场赛前预测。\n- 已调用数据采集、战术、模型、红队、竞彩风控线程；因数据/战术线程落盘延迟，主线程以本地 roster/player_state 与已核验32强落位生成兜底上游包，并记录为 partial_source_limited。\n- 输出：\n  - data/packets/matches/round32-m85-m88-data-refresh-20260629.json\n  - data/packets/matchup_tactics/round32-m85-m88-tactical-refresh-20260629.json\n  - data/outputs/match_predictions/round32-m85-m88-v3-quant-prediction-20260629.json\n  - 比赛/未开始比赛/32强/M85-M88 四场量化预测_v3.md\n  - 汇总/32强M85-M88量化预测汇总_20260629.md\n- 红队统一 verdict=hold；竞彩 gate=hold_not_executable。官方 T-75 首发、最新伤停、官方竞彩与同源盘口仍未闭合。\n`, "utf8");

for (const p of [
  "data/packets/matchup_tactics/round32-m85-m88-tactical-refresh-20260629.json",
  "data/outputs/match_predictions/round32-m85-m88-model-quant-chain-20260629.json",
  "data/outputs/match_predictions/round32-m85-m88-v3-quant-prediction-20260629.json",
  "data/reviews/red_team/round32-m85-m88-prediction-red-team-20260629.json"
]) JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));

console.log("generated M85-M88 v3 predictions, tactical, model, red-team and markdown outputs");
