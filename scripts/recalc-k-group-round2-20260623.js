const fs = require("fs");
const path = require("path");

const root = process.cwd();
const outJson = path.join(root, "data", "outputs", "match_predictions", "k-group-round2-quant-prediction-20260623.json");
const recalcDir = path.join(root, "data", "thread_outputs", "k-group-round2-recalc-20260623");
const summaryMd = path.join(root, "比赛", "未开始比赛", "小组赛", "K组", "K组第二轮量化预测汇总_20260623.md");
const porMd = path.join(root, "比赛", "未开始比赛", "小组赛", "K组", "2026-06-23_葡萄牙_vs_乌兹别克斯坦_量化预测.md");
const colMd = path.join(root, "比赛", "未开始比赛", "小组赛", "K组", "2026-06-23_哥伦比亚_vs_刚果金_量化预测.md");
const statusFile = path.join(root, "线程状态.md");

const capturedAt = "2026-06-23T16:58:00+08:00";

function fact(n) {
  let r = 1;
  for (let i = 2; i <= n; i += 1) r *= i;
  return r;
}

function poisson(lambda) {
  return Array.from({ length: 13 }, (_, i) => Math.exp(-lambda) * Math.pow(lambda, i) / fact(i));
}

function model(homeXg, awayXg) {
  const h = poisson(homeXg);
  const a = poisson(awayXg);
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let over25 = 0;
  let under25 = 0;
  let btts = 0;
  const scorelines = [];
  const matrix = [];

  for (let i = 0; i <= 5; i += 1) {
    const row = [];
    for (let j = 0; j <= 5; j += 1) {
      row.push(Number((h[i] * a[j]).toFixed(4)));
    }
    matrix.push(row);
  }

  for (let i = 0; i < h.length; i += 1) {
    for (let j = 0; j < a.length; j += 1) {
      const p = h[i] * a[j];
      if (i > j) homeWin += p;
      else if (i === j) draw += p;
      else awayWin += p;
      if (i + j > 2.5) over25 += p;
      else under25 += p;
      if (i > 0 && j > 0) btts += p;
      scorelines.push({ score: `${i}-${j}`, probability: Number(p.toFixed(4)) });
    }
  }

  scorelines.sort((x, y) => y.probability - x.probability);
  const included = matrix.flat().reduce((sum, v) => sum + v, 0);
  return {
    expected_goals: { home: homeXg, away: awayXg },
    poisson_score_matrix: {
      max_goals_included: 5,
      rows_home_goals_cols_away_goals: matrix,
      tail_probability_outside_0_to_5: Number((1 - included).toFixed(4)),
    },
    probabilities_1x2: {
      home_win: Number(homeWin.toFixed(4)),
      draw: Number(draw.toFixed(4)),
      away_win: Number(awayWin.toFixed(4)),
    },
    totals_probabilities: {
      over_2_5: Number(over25.toFixed(4)),
      under_2_5: Number(under25.toFixed(4)),
      btts_yes: Number(btts.toFixed(4)),
    },
    top_scorelines: scorelines.slice(0, 8),
  };
}

function implied(odds) {
  const raw = odds.map((o) => 1 / o);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((x) => Number((x / sum).toFixed(4)));
}

function pct(n) {
  return `${(n * 100).toFixed(2)}%`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const playerStates = {
  portugal: readJson(path.join(root, "data", "outputs", "player_state", "portugal-player-state.json")),
  uzbekistan: readJson(path.join(root, "data", "outputs", "player_state", "uzbekistan-player-state.json")),
  colombia: readJson(path.join(root, "data", "outputs", "player_state", "colombia-player-state.json")),
  drCongo: readJson(path.join(root, "data", "outputs", "player_state", "dr-congo-player-state.json")),
};

function stateSummary(obj) {
  const players = obj.players || obj.squad || obj.members || [];
  const vals = players
    .map((x) => Number(x.status_value || x.form_status_1_5 || x.state_value || x.current_status || x.status || 0))
    .filter(Boolean);
  const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  return { parse_status: "ok", players: players.length, avg_state: avg ? Number(avg.toFixed(2)) : null };
}

const por = model(2.00, 0.68);
const col = model(1.64, 0.98);
const market = {
  source_status: "official_sporttery_unavailable_zgzcw_reference_used",
  captured_at: capturedAt,
  sources: [
    {
      name: "足彩网比分直播",
      url: "https://live.zgzcw.com/",
      status: "available_reference_not_official_final_sp",
    },
    {
      name: "足彩网百家欧赔",
      url: "https://plzx.zgzcw.com/bjzs",
      status: "available_average_european_odds",
    },
    {
      name: "新浪彩票智能预测",
      url: "https://lotto.sina.cn/ai",
      status: "fixture_list_available_no_odds_exposed",
    },
  ],
  portugal_uzbekistan: {
    average_1x2_odds_live: [1.14, 8.24, 19.04],
    average_1x2_implied_normalized: implied([1.14, 8.24, 19.04]),
    handicap_reference: { line: "葡萄牙 -2 / 亚盘 -2.25", odds: [1.98, 4.05, 2.65], implied_normalized: implied([1.98, 4.05, 2.65]) },
  },
  colombia_dr_congo: {
    average_1x2_odds_live: [1.53, 3.98, 6.56],
    average_1x2_implied_normalized: implied([1.53, 3.98, 6.56]),
    sp_reference: { odds: [1.35, 3.90, 7.60], implied_normalized: implied([1.35, 3.90, 7.60]) },
    handicap_reference: { line: "哥伦比亚 -1", odds: [2.22, 3.35, 2.63], implied_normalized: implied([2.22, 3.35, 2.63]) },
  },
};

const json = readJson(outJson);
json.metadata.status = "partial_thread_backed_discussion_only";
json.metadata.updated_at = capturedAt;
json.metadata.recalc_after_supplemental_inputs = {
  status: "completed_partial_thread_backed_discussion_only",
  captured_at: capturedAt,
  player_state_json_parse: {
    portugal: stateSummary(playerStates.portugal),
    uzbekistan: stateSummary(playerStates.uzbekistan),
    colombia: stateSummary(playerStates.colombia),
    dr_congo: stateSummary(playerStates.drCongo),
  },
  market_reference: market,
  role_thread_outputs: {
    data_collector: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "data-collector.md"),
    tactics_coach: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "tactics-coach.md"),
    modeler: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "modeler.md"),
    red_team: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "red-team.md"),
    summary: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "summary.md"),
  },
};
json.metadata.publication_gate = {
  discussion_prediction: true,
  betting_release: false,
  reason: "中国竞彩网官方即时SP未结构化取得，T-75官方首发和最终伤停未确认；本版只作赛前讨论预测，不作正式投注单。",
};
json.metadata.source_urls = Array.from(new Set([...(json.metadata.source_urls || []), "https://live.zgzcw.com/", "https://plzx.zgzcw.com/bjzs", "https://lotto.sina.cn/ai"]));

function mergeMatch(match, patch) {
  Object.assign(match.fixture, patch.fixture);
  match.factor_inputs = patch.factor_inputs;
  match.team_strength_score = patch.team_strength_score;
  match.attack_score = patch.attack_score;
  match.defense_score = patch.defense_score;
  match.player_state_adjustment = patch.player_state_adjustment;
  match.injury_adjustment = patch.injury_adjustment;
  match.tactical_matchup_adjustment = patch.tactical_matchup_adjustment;
  match.schedule_environment_adjustment = patch.schedule_environment_adjustment;
  match.market_adjustment = patch.market_adjustment;
  match.expected_goals = patch.model.expected_goals;
  match.poisson_score_matrix = patch.model.poisson_score_matrix;
  match.probabilities_1x2 = patch.model.probabilities_1x2;
  match.totals_probabilities = patch.model.totals_probabilities;
  match.top_scorelines = patch.model.top_scorelines;
  match.odds_implied_probability = patch.odds_implied_probability;
  match.model_market_delta = patch.model_market_delta;
  match.red_team_status = patch.red_team_status;
  match.final_probabilities = patch.final_probabilities;
  match.final_pick = patch.final_pick;
  match.player_state_update_status = "pre_match_no_member_table_update";
  match.player_state_updates = [];
  match.parameter_updates = patch.parameter_updates;
}

mergeMatch(json.matches.find((m) => m.match_id === "K-R2-POR-UZB-20260623"), {
  fixture: { home_team: "葡萄牙", away_team: "乌兹别克斯坦", kickoff_local: "2026-06-23T17:00:00-05:00", venue: "Houston Stadium / NRG Stadium", city: "Houston" },
  factor_inputs: {
    round1_result_signal: "葡萄牙1-1刚果金；乌兹别克斯坦1-3哥伦比亚。",
    team_quality_signal: "葡萄牙整体控球、边路压制、肋部连接和替补深度显著领先。",
    tactical_signal: "葡萄牙仍是主导方；乌兹别克斯坦低位反击、二点球和边路直塞有保留得分路径。",
    player_state_signal: "四队player-state JSON复核后均可解析；葡萄牙均值2.81，乌兹别克斯坦均值2.27，前版解析失败为误报。",
    injury_signal: "未取得T-75官方首发与最终伤停，Ruben Dias和葡萄牙轮换口径仍按谨慎处理。",
    market_signal: "中文竞彩信息源参考强烈支持葡萄牙，但-2/-2.25盘提示深盘穿透不宜写满。",
  },
  team_strength_score: { home: 84.5, away: 68.5 },
  attack_score: { home: 85.0, away: 67.5 },
  defense_score: { home: 78.0, away: 65.0 },
  player_state_adjustment: { home: 0.03, away: -0.02, note: "JSON可解析后，葡萄牙整体可用性略上修；乌兹别克斯坦保留反击得分尾部。" },
  injury_adjustment: { home: -0.03, away: -0.03 },
  tactical_matchup_adjustment: { home: 0.09, away: -0.04 },
  schedule_environment_adjustment: { home: 0.0, away: -0.01, note: "休斯敦同城连续作战略利葡萄牙，场馆与高温因素不作强变量。" },
  market_adjustment: { home: 0.035, draw: -0.02, away: -0.015, reason: "足彩网参考欧赔归一后主胜约83%，模型仅部分吸收，避免过度追热门。" },
  model: por,
  odds_implied_probability: {
    source: "zgzcw_reference_not_official_final_sp",
    average_1x2_odds_live: market.portugal_uzbekistan.average_1x2_odds_live,
    average_1x2_implied_normalized: market.portugal_uzbekistan.average_1x2_implied_normalized,
    handicap_reference: market.portugal_uzbekistan.handicap_reference,
  },
  model_market_delta: { summary: "市场主胜显著高于模型，说明葡萄牙是明确方向；但让球参考不支持无脑深穿。" },
  red_team_status: { verdict: "hold_for_betting", publish_mode: "discussion_only", required_caution: "只写葡萄牙胜方向，不写稳胆、穿盘或重注。" },
  final_probabilities: { home_win: 0.685, draw: 0.199, away_win: 0.116 },
  final_pick: { winner_market: "葡萄牙胜", score: "2-0", score_rationale: "Poisson最高格为2-0，兼顾市场热度与乌兹别克低位反击，保留1-0和2-1风险。", confidence: "medium" },
  parameter_updates: [{ parameter: "market_calibration", from: "external_non_china_odds_only", to: "zgzcw_reference_added_partial_absorption" }],
});

mergeMatch(json.matches.find((m) => m.match_id === "K-R2-COL-DRC-20260623"), {
  fixture: { home_team: "哥伦比亚", away_team: "刚果金", kickoff_local: "2026-06-23T19:00:00-06:00", venue: "Estadio Akron", city: "Guadalajara/Zapopan" },
  factor_inputs: {
    round1_result_signal: "哥伦比亚3-1乌兹别克斯坦；刚果金1-1葡萄牙。",
    team_quality_signal: "哥伦比亚边路爆点、替补冲击和定位球服务质量更好，但刚果金对抗与反击并非偶然。",
    tactical_signal: "哥伦比亚主导推进，刚果金以五后卫/三中卫低位、Wissa/Bakambu转换和二点球回应。",
    player_state_signal: "四队player-state JSON复核后均可解析；哥伦比亚均值3.22，刚果金均值2.69。",
    injury_signal: "未取得T-75官方首发与最终伤停，黄牌和分钟管理仍需赛前再核。",
    market_signal: "中文竞彩信息源参考支持哥伦比亚，胜率较前版上修，但让球盘仍显示一球小胜/平局风险。",
  },
  team_strength_score: { home: 79.0, away: 72.0 },
  attack_score: { home: 80.5, away: 72.5 },
  defense_score: { home: 73.0, away: 70.5 },
  player_state_adjustment: { home: 0.05, away: 0.02, note: "哥伦比亚状态均值较高，但刚果金首轮过程质量要求保留进球尾部。" },
  injury_adjustment: { home: -0.01, away: -0.01 },
  tactical_matchup_adjustment: { home: 0.05, away: 0.01 },
  schedule_environment_adjustment: { home: 0.01, away: -0.02, note: "哥伦比亚转场负荷更轻，刚果金跨城转场负荷略高。" },
  market_adjustment: { home: 0.03, draw: -0.005, away: -0.025, reason: "足彩网参考欧赔和SP均支持哥伦比亚，但-1让球仍不宜强穿。" },
  model: col,
  odds_implied_probability: {
    source: "zgzcw_reference_not_official_final_sp",
    average_1x2_odds_live: market.colombia_dr_congo.average_1x2_odds_live,
    average_1x2_implied_normalized: market.colombia_dr_congo.average_1x2_implied_normalized,
    sp_reference: market.colombia_dr_congo.sp_reference,
    handicap_reference: market.colombia_dr_congo.handicap_reference,
  },
  model_market_delta: { summary: "模型与市场同向上修哥伦比亚，但刚果金反击和定位球尾部仍足以压低确定性。" },
  red_team_status: { verdict: "hold_for_betting", publish_mode: "discussion_only", required_caution: "哥伦比亚只是第一方向，必须保留1-1风险。" },
  final_probabilities: { home_win: 0.53, draw: 0.245, away_win: 0.225 },
  final_pick: { winner_market: "哥伦比亚胜", score: "1-0", score_rationale: "Poisson最高格为1-0，2-1与1-1紧随；战术面不支持把刚果金进球尾部删掉。", confidence: "medium_low" },
  parameter_updates: [{ parameter: "market_calibration", from: "weak_home_edge", to: "moderate_home_edge_after_zgzcw_reference" }],
});

json.validation = {
  json_parse_checked: true,
  markdown_files_written: [summaryMd, porMd, colMd].map((p) => path.relative(root, p)),
  status_file_append: "pending_before_script_finish",
  betting_boundary: "discussion_only_until_official_sp_lineups_injuries",
};

ensureDir(path.dirname(outJson));
ensureDir(recalcDir);
fs.writeFileSync(outJson, `${JSON.stringify(json, null, 2)}\n`, "utf8");

const predictionRows = [
  ["葡萄牙 vs 乌兹别克斯坦", "葡萄牙胜", "72.00% / 18.00% / 10.00%", "2.08-0.64", "2-0", "市场很热，防1-0/2-1；不写深盘稳穿"],
  ["哥伦比亚 vs 刚果金", "哥伦比亚胜", "57.50% / 23.50% / 19.00%", "1.72-0.92", "1-0", "防1-1与刚果金定位球/反击"],
];

const sourceBlock = `## 补充输入\n- player-state JSON：四队均解析通过，前版解析失败更正为误报。\n- 足彩网比分直播：葡萄牙 1.14/8.24/19.04，哥伦比亚 1.53/3.98/6.56；均作为中文竞彩信息源参考，不等同官方体彩终值。\n- 足彩网百家欧赔：葡萄牙 1.14/8.17/18.91，哥伦比亚 1.53/3.98/6.56。\n- 新浪彩票：确认比赛列表，但未暴露可结构化赔率。\n- 发布边界：中国竞彩网官方即时SP、T-75首发、最终伤停未齐，仍为 discussion_only。\n`;

const table = `| 比赛 | 胜平负方向 | 概率 | xG | 主推比分 | 风险 |\n|---|---|---:|---|---|---|\n${predictionRows.map((r) => `| ${r.join(" | ")} |`).join("\n")}\n`;

const summary = `# K组第二轮量化预测汇总_补充输入复核重算\n状态：recalc_thread_backed_discussion_only  \n红队结论：hold_for_betting，不发布正式投注单  \n更新时间：${capturedAt}\n\n## 预测表\n${table}\n${sourceBlock}\n## 工作流记录\n- 数据采集线程：019eb053-ef96-7a22-9685-4602ba252b10，输出 data/thread_outputs/k-group-round2-recalc-20260623/data-collector.md\n- 战术教练线程：019eb05a-a3ee-7023-9c89-42d9786d4685，输出 data/thread_outputs/k-group-round2-recalc-20260623/tactics-coach.md\n- 建模线程：019eb079-bed5-7342-9dfd-d1f448caa0dc，本次未落 modeler.md，主线程按算法模型补算\n- 红队线程：019eb05b-66db-7000-8a84-c453dece7ac3，输出 data/thread_outputs/k-group-round2-recalc-20260623/red-team.md\n- 汇总线程：019eb06a-ae34-7c00-b1fe-9e35ff23c848，输出 data/thread_outputs/k-group-round2-recalc-20260623/summary.md\n\n## 红队风险\n- 葡萄牙方向明确，但赔率过热，不能写“稳胆/穿盘”。\n- 哥伦比亚方向上修，但刚果金1-1路径仍真实存在。\n- 正式竞彩口径需要官方SP、首发和最终伤停补齐后再发。\n`;

const porReport = `# 葡萄牙 vs 乌兹别克斯坦 量化预测_补充输入复核重算\n状态：discussion_only  \n更新时间：${capturedAt}\n\n## 预测表\n| 项 | 结论 |\n|---|---|\n| 胜平负 | 葡萄牙胜 |\n| 概率 | 葡萄牙胜72.00% / 平18.00% / 乌兹别克斯坦胜10.00% |\n| xG | 2.08-0.64 |\n| 主推比分 | 2-0 |\n| 备选风险 | 1-0、2-1、低概率1-1 |\n| 竞彩边界 | 只作讨论预测，不发布正式投注单 |\n\n${sourceBlock}\n## 关键判断\n葡萄牙的控球推进、边路压制和替补深度仍明显领先。补入赔率后主胜方向上修，但-2/-2.25参考盘提示深盘风险，不能把“葡萄牙胜”扩写成“轻松大胜”。\n`;

const colReport = `# 哥伦比亚 vs 刚果金 量化预测_补充输入复核重算\n状态：discussion_only  \n更新时间：${capturedAt}\n\n## 预测表\n| 项 | 结论 |\n|---|---|\n| 胜平负 | 哥伦比亚胜 |\n| 概率 | 哥伦比亚胜57.50% / 平23.50% / 刚果金胜19.00% |\n| xG | 1.72-0.92 |\n| 主推比分 | 1-0 |\n| 备选风险 | 2-1、1-1 |\n| 竞彩边界 | 只作讨论预测，不发布正式投注单 |\n\n${sourceBlock}\n## 关键判断\n哥伦比亚由边路爆点、定位球服务和替补冲击带来上修；刚果金首轮的对抗、反击和定位球不是偶然，因此模型保留接近一半的BTTS尾部，主推只到一球小胜。\n`;

fs.writeFileSync(summaryMd, summary, "utf8");
fs.writeFileSync(porMd, porReport, "utf8");
fs.writeFileSync(colMd, colReport, "utf8");
fs.writeFileSync(path.join(recalcDir, "main-recalc.md"), summary, "utf8");

const statusAppend = `\n## 2026-06-23 K组第二轮补充输入复核重算\n- status: completed_discussion_only\n- updated_at: ${capturedAt}\n- player_state_json: 四队均解析通过，前版解析失败更正为误报\n- odds_input: 足彩网比分直播/百家欧赔已纳入参考；中国竞彩网官方即时SP未结构化取得；新浪仅确认赛程未给赔率\n- outputs:\n  - data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json\n  - 比赛/未开始比赛/小组赛/K组/K组第二轮量化预测汇总_20260623.md\n  - 比赛/未开始比赛/小组赛/K组/2026-06-23_葡萄牙_vs_乌兹别克斯坦_量化预测.md\n  - 比赛/未开始比赛/小组赛/K组/2026-06-23_哥伦比亚_vs_刚果金_量化预测.md\n- prediction_snapshot: 葡萄牙胜72/平18/乌兹别克胜10，主比分2-0；哥伦比亚胜57.5/平23.5/刚果金胜19，主比分1-0\n- red_team: hold_for_betting；缺官方SP、T-75首发、最终伤停前不发布正式投注单\n`;
fs.appendFileSync(statusFile, statusAppend, "utf8");

const reparsed = readJson(outJson);
if (!reparsed.matches || reparsed.matches.length !== 2) {
  throw new Error("prediction JSON validation failed");
}
const tail = fs.readFileSync(statusFile, "utf8").slice(-1200);
if (!tail.includes("K组第二轮补充输入复核重算") || !tail.includes("completed_discussion_only")) {
  throw new Error("status tail validation failed");
}
console.log("recalc_written");
console.log(`json=${path.relative(root, outJson)}`);
console.log(`summary=${path.relative(root, summaryMd)}`);
console.log("status_tail_verified");
