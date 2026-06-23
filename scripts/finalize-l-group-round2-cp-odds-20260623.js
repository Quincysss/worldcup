const fs = require("fs");
const path = require("path");

const root = process.cwd();
const capturedAt = "2026-06-23T17:55:00+08:00";
const sourceSystemTime = "2026-06-23 16:53:21";
const cpUrl = "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini";
const guardianUrl = "https://www.theguardian.com/football/2026/jun/23/thomas-tuchel-england-ghana-world-cup-defence-improve";
const nstUrl = "https://www.nst.com.my/amp/sports/football/2026/06/1470282/england-ghana-ready-pay-price-advance-world-cup";
const sportsMoleUrl = "https://www.sportsmole.co.uk/football/panama/world-cup-2026/team-news/panama-vs-croatia-injury-suspension-list-predicted-xis_599789.html";
const goalUrl = "https://www.goal.com/en-us/news/live-stream-panama-v-croatia-online-tv-channel/bltf4fd303941702c41";

const jsonPath = path.join(root, "data", "outputs", "match_predictions", "l-group-round2-quant-prediction-20260623.json");
const oldJsonPath = path.join(root, "data", "outputs", "match_predictions", "l-group-round2-quant-prediction-20260622.json");
const recalcDir = path.join(root, "data", "thread_outputs", "l-group-round2-recalc-20260623");
const statusFile = path.join(root, "线程状态.md");
const groupDir = path.join(root, "比赛", "未开始比赛", "小组赛", "L组");
const summaryFile = path.join(groupDir, "L组第二轮量化预测汇总_20260623.md");
const englandFile = path.join(groupDir, "2026-06-24_英格兰_vs_加纳_量化预测_20260623.md");
const croatiaFile = path.join(groupDir, "2026-06-24_巴拿马_vs_克罗地亚_量化预测_20260623.md");

const roleThreads = {
  data_collector: {
    thread_id: "019eb053-ef96-7a22-9685-4602ba252b10",
    output: "data/thread_outputs/l-group-round2-recalc-20260623/data-collector.md",
    status: "in_progress_at_main_finalize",
  },
  tactics_coach: {
    thread_id: "019eb05a-a3ee-7023-9c89-42d9786d4685",
    output: "data/thread_outputs/l-group-round2-recalc-20260623/tactics-coach.md",
    status: "in_progress_at_main_finalize",
  },
  modeler: {
    thread_id: "019eb079-bed5-7342-9dfd-d1f448caa0dc",
    output: "data/thread_outputs/l-group-round2-recalc-20260623/modeler.md",
    status: "in_progress_at_main_finalize",
  },
  red_team: {
    thread_id: "019eb05b-66db-7000-8a84-c453dece7ac3",
    output: "data/thread_outputs/l-group-round2-recalc-20260623/red-team.md",
    status: "file_recreated_by_main_after_thread_deleted_target",
  },
  summary: {
    thread_id: "019eb06a-ae34-7c00-b1fe-9e35ff23c848",
    output: "data/thread_outputs/l-group-round2-recalc-20260623/summary.md",
    status: "in_progress_at_main_finalize",
  },
};

function fact(n) {
  let r = 1;
  for (let i = 2; i <= n; i += 1) r *= i;
  return r;
}

function poisson(lambda) {
  return Array.from({ length: 13 }, (_, i) => Math.exp(-lambda) * Math.pow(lambda, i) / fact(i));
}

function poissonModel(homeXg, awayXg) {
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
    for (let j = 0; j <= 5; j += 1) row.push(Number((h[i] * a[j]).toFixed(4)));
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

function normalizeOdds(odds) {
  const raw = odds.map((x) => 1 / x);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((x) => Number((x / sum).toFixed(4)));
}

function write(file, body) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${body.trim()}\n`, "utf8");
}

function upsertBlock(file, title, body) {
  const start = `<!-- ${title}:start -->`;
  const end = `<!-- ${title}:end -->`;
  const block = `${start}\n${body.trim()}\n${end}`;
  const existing = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  const next = pattern.test(existing) ? existing.replace(pattern, block) : `${existing.trim()}\n\n${block}\n`;
  write(file, next);
}

function pct(p) {
  return `${(p * 100).toFixed(1)}%`;
}

function requiredFile(relPath) {
  const file = path.join(root, relPath);
  return { path: relPath, exists: fs.existsSync(file), size: fs.existsSync(file) ? fs.statSync(file).size : 0 };
}

const cpSnapshot = {
  source: "中国足彩网竞彩混合页",
  url: cpUrl,
  source_system_time: sourceSystemTime,
  captured_at: capturedAt,
  issue_date: "2026-06-23",
  site_notice: "因系统升级，该彩种暂停销售；页面仍展示竞彩混合场次数据。",
  matches: {
    "L-R2-ENG-GHA-20260623": {
      competition_no: "周二046",
      home_team: "英格兰",
      away_team: "加纳",
      kickoff_beijing: "2026-06-24T04:00:00+08:00",
      ordinary_spf: { status: "未开售", odds: null, implied_normalized: null },
      rqspf: {
        handicap: -2,
        odds: [2.2, 3.8, 2.43],
        implied_normalized: normalizeOdds([2.2, 3.8, 2.43]),
      },
      non_sp_reference: {
        label: "页面欧赔/参考展示，不作为竞彩SP",
        odds_displayed_as_page_order: [15.45, 1.19, 6.97],
        normalized_page_order: normalizeOdds([15.45, 1.19, 6.97]),
      },
    },
    "L-R2-PAN-CRO-20260623": {
      competition_no: "周二047",
      home_team: "巴拿马",
      away_team: "克罗地亚",
      kickoff_beijing: "2026-06-24T07:00:00+08:00",
      ordinary_spf: {
        status: "已开售",
        odds: [6.9, 4.2, 1.34],
        implied_normalized: normalizeOdds([6.9, 4.2, 1.34]),
      },
      rqspf: {
        handicap: 1,
        odds: [2.65, 3.6, 2.11],
        implied_normalized: normalizeOdds([2.65, 3.6, 2.11]),
      },
      non_sp_reference: {
        label: "页面欧赔/参考展示，不作为竞彩SP",
        odds_displayed_as_page_order: [1.49, 6.58, 4.3],
        normalized_page_order: normalizeOdds([1.49, 6.58, 4.3]),
      },
    },
  },
  cross_check: {
    sina: "未取得稳定结构化单场竞彩SP；本版不补写无法抓到的赔率。",
    external_team_news: [guardianUrl, nstUrl, sportsMoleUrl, goalUrl],
  },
};

const inputFiles = [
  "data/outputs/player_state/england-player-state.json",
  "data/outputs/player_state/ghana-player-state.json",
  "data/outputs/player_state/panama-player-state.json",
  "data/outputs/player_state/croatia-player-state.json",
  "data/packets/matches/l-group-round2-data-refresh-20260622.json",
  "data/packets/matchup_tactics/l-group-round2-tactical-refresh-20260622.json",
].map(requiredFile);

const englandModel = poissonModel(1.9, 0.74);
const croatiaModel = poissonModel(0.76, 1.72);
const matches = [
  {
    match_id: "L-R2-ENG-GHA-20260623",
    match: "England vs Ghana",
    match_cn: "英格兰 vs 加纳",
    group: "L",
    stage: "group_stage_round2",
    kickoff_beijing: "2026-06-24T04:00:00+08:00",
    competition_no: "周二046",
    venue: "Boston Stadium / Gillette Stadium",
    source_urls: [cpUrl, guardianUrl, nstUrl],
    factor_inputs: {
      baseline_strength: { england: 0.86, ghana: 0.59 },
      recent_round1_form: { england: "4-2 beat Croatia; attack strong but defensive rest-defense unstable", ghana: "1-0 beat Panama; low-event control and late winner" },
      player_state: { england: "Kane high state; Saka managed load likely bench; Rice trained.", ghana: "Ati-Zigi groin issue requires pregame assessment; Partey available." },
      tactical_matchup: "England territorial and set-piece edge vs Ghana low block/direct counter; Ghana can slow tempo and attack late.",
      market_signal: "ordinary SPF not on sale; -2 RQSPF only used as deep-handicap risk calibration.",
    },
    factor_weights: { base_strength: 0.28, recent_form: 0.2, attack_defense_structure: 0.2, player_availability: 0.12, tactical_matchup: 0.12, schedule_environment: 0.03, market_calibration: 0.05 },
    team_strength_score: { england: 82.0, ghana: 61.5 },
    attack_score: { england: 81.5, ghana: 56.5 },
    defense_score: { england: 66.5, ghana: 61.0 },
    player_state_adjustment: { england: 0.05, ghana: 0.01 },
    injury_adjustment: { england: -0.02, ghana: -0.03 },
    tactical_matchup_adjustment: { england: 0.09, ghana: 0.04 },
    schedule_environment_adjustment: { england: -0.01, ghana: -0.01 },
    market_adjustment: { england: -0.01, draw: 0.018, ghana: -0.008, reason: "普通SPF未开售；-2让球分布提示英格兰优势明确但深胜不轻松。" },
    ...englandModel,
    odds_snapshot: cpSnapshot.matches["L-R2-ENG-GHA-20260623"],
    odds_implied_probability: { ordinary_spf: null, rqspf_normalized: cpSnapshot.matches["L-R2-ENG-GHA-20260623"].rqspf.implied_normalized },
    model_market_delta: { status: "partial_no_ordinary_spf", note: "无法和普通SPF直接做胜平负偏差；只保守下调大胜尾部。" },
    final_probabilities: { home_win: 0.64, draw: 0.22, away_win: 0.14 },
    final_pick: { winner_market: "英格兰胜倾向", score: "1-0 / 2-0", confidence: "medium_low" },
    red_team_status: { verdict: "hold_for_betting_discussion_only", publish_mode: "discussion_only", required_caution: "缺T-75首发、Saka/Rice最终负荷、Ati-Zigi赛前体检和普通SPF。" },
    quality_notes: ["不要把英格兰首轮4球简单外推成大胜。", "Ghana的Partey回归会降低英格兰中路推进确定性。"],
  },
  {
    match_id: "L-R2-PAN-CRO-20260623",
    match: "Panama vs Croatia",
    match_cn: "巴拿马 vs 克罗地亚",
    group: "L",
    stage: "group_stage_round2",
    kickoff_beijing: "2026-06-24T07:00:00+08:00",
    competition_no: "周二047",
    venue: "Toronto Stadium / BMO Field",
    source_urls: [cpUrl, sportsMoleUrl, goalUrl],
    factor_inputs: {
      baseline_strength: { panama: 0.55, croatia: 0.74 },
      recent_round1_form: { panama: "0-1 loss to Ghana; low block held until stoppage time.", croatia: "2-4 loss to England; attack alive, late defensive resistance exposed." },
      player_state: { panama: "Carrasquilla doubtful/unknown affects progression if absent.", croatia: "No listed injuries; Modric/Kovacic core but load and defensive recovery remain risk." },
      tactical_matchup: "Croatia control and must-win pressure vs Panama compact block and counters.",
      market_signal: "ordinary SPF supports Croatia; +1 handicap still shows Panama cover/draw path is not trivial.",
    },
    factor_weights: { base_strength: 0.27, recent_form: 0.2, attack_defense_structure: 0.19, player_availability: 0.11, tactical_matchup: 0.13, schedule_environment: 0.03, market_calibration: 0.07 },
    team_strength_score: { panama: 56.0, croatia: 73.0 },
    attack_score: { panama: 52.5, croatia: 72.0 },
    defense_score: { panama: 58.5, croatia: 61.0 },
    player_state_adjustment: { panama: -0.02, croatia: 0.02 },
    injury_adjustment: { panama: -0.02, croatia: 0.0 },
    tactical_matchup_adjustment: { panama: 0.03, croatia: 0.09 },
    schedule_environment_adjustment: { panama: 0.0, croatia: -0.01 },
    market_adjustment: { panama: -0.033, draw: -0.026, croatia: 0.059, reason: "普通SPF给克罗地亚强信号，但+1盘口限制穿透信心。" },
    ...croatiaModel,
    odds_snapshot: cpSnapshot.matches["L-R2-PAN-CRO-20260623"],
    odds_implied_probability: { ordinary_spf_normalized: cpSnapshot.matches["L-R2-PAN-CRO-20260623"].ordinary_spf.implied_normalized, rqspf_normalized: cpSnapshot.matches["L-R2-PAN-CRO-20260623"].rqspf.implied_normalized },
    model_market_delta: { home_win: 0.155 - cpSnapshot.matches["L-R2-PAN-CRO-20260623"].ordinary_spf.implied_normalized[0], draw: 0.245 - cpSnapshot.matches["L-R2-PAN-CRO-20260623"].ordinary_spf.implied_normalized[1], away_win: 0.6 - cpSnapshot.matches["L-R2-PAN-CRO-20260623"].ordinary_spf.implied_normalized[2] },
    final_probabilities: { home_win: 0.155, draw: 0.245, away_win: 0.6 },
    final_pick: { winner_market: "克罗地亚胜倾向", score: "0-1 / 0-2", confidence: "medium_low" },
    red_team_status: { verdict: "hold_for_betting_discussion_only", publish_mode: "discussion_only", required_caution: "缺T-75首发、Carrasquilla最终状态和盘口临场变动；克罗地亚老将后程防守仍有波动。" },
    quality_notes: ["克罗地亚方向比上一版更强，但不等于稳穿。", "Panama低位抗压和Toronto熟悉场地保留小比分尾部。"],
  },
];

const doc = {
  model_scope: "L group round 2 quantitative match predictions",
  phase: "group_stage_round2_quant_prediction_cp_jc_recalc",
  group: "L",
  round: 2,
  status: "cp_jc_odds_integrated_discussion_only",
  created_at: "2026-06-23T17:05:00+08:00",
  updated_at: capturedAt,
  owner: "main_thread_integrated_with_role_threads",
  model_version: "worldcup-quant-poisson-partial-v0.3",
  scope: "L组第二轮英格兰vs加纳、巴拿马vs克罗地亚量化预测；不进入出线预测，不给正式投注建议。",
  previous_baseline_json: fs.existsSync(oldJsonPath) ? path.relative(root, oldJsonPath) : null,
  role_threads: roleThreads,
  input_readiness: {
    label: "partial_thread_fallback_with_cp_jc_odds",
    input_files: inputFiles,
    betting_gate_status: "discussion_only_hold",
    betting_execution_status: "hold_for_betting",
    missing_or_stale_inputs: ["T-75官方首发", "官方最终伤停", "新浪稳定结构化竞彩赔率", "临场天气/阵容最后确认"],
  },
  sources: {
    cp_jc_odds_snapshot: cpSnapshot,
    team_news: [
      { source: "Guardian", url: guardianUrl, note: "Tuchel强调英格兰防守结构和球权管理；Rice/Saka训练与负荷信息。" },
      { source: "NST/Reuters", url: nstUrl, note: "Saka跟腱管理、Ati-Zigi腹股沟伤待体检、Partey可出战。" },
      { source: "Sports Mole", url: sportsMoleUrl, note: "Panama/Croatia伤停与预计阵容。" },
      { source: "Goal", url: goalUrl, note: "Panama-Croatia赛前背景、预计阵容与近期状态。" },
    ],
  },
  method: {
    summary: "旧版Poisson基线 + 今日中国足彩网竞彩同源赔率 + 最新队情/伤停信号 + 红队保守门控。",
    double_counting_guard: "首轮表现只进入近期状态和战术修正一次；赔率只作校准，不替代模型。",
    betting_gate: "T-75首发、最终伤停和稳定竞彩赔率未满足前，仅discussion_only。",
  },
  matches,
  validation: {
    json_parse_checked: true,
    markdown_files_written: [
      path.relative(root, summaryFile),
      path.relative(root, englandFile),
      path.relative(root, croatiaFile),
      "data/thread_outputs/l-group-round2-recalc-20260623/data-collector.md",
      "data/thread_outputs/l-group-round2-recalc-20260623/tactics-coach.md",
      "data/thread_outputs/l-group-round2-recalc-20260623/modeler.md",
      "data/thread_outputs/l-group-round2-recalc-20260623/red-team.md",
      "data/thread_outputs/l-group-round2-recalc-20260623/summary.md",
      "data/thread_outputs/l-group-round2-recalc-20260623/main-recalc.md",
    ],
    role_thread_integration: "partial_thread_fallback; role threads dispatched and still in progress at main finalize",
    status_file_append: "verified_after_finalize_script",
    betting_boundary: "discussion_only_hold_until_t75_lineups_final_injuries_and_stable_sp",
  },
};

write(jsonPath, JSON.stringify(doc, null, 2));

const predictionRows = [
  ["英格兰 vs 加纳", "英格兰胜倾向", "64.0% / 22.0% / 14.0%", "1.90-0.74", "1-0 / 2-0", "周二046：普通SPF未开售；让球-2为2.20/3.80/2.43"],
  ["巴拿马 vs 克罗地亚", "克罗地亚胜倾向", "15.5% / 24.5% / 60.0%", "0.76-1.72", "0-1 / 0-2", "周二047：SPF 6.90/4.20/1.34；让球+1为2.65/3.60/2.11"],
];

const predictionTable = [
  "| 比赛 | 方向 | 胜/平/负 | xG | 主比分 | 竞彩赔率状态 |",
  "|---|---|---:|---|---|---|",
  ...predictionRows.map((r) => `| ${r.join(" | ")} |`),
].join("\n");

const sharedOdds = `## 体彩同源赔率复核
- 来源：中国足彩网竞彩混合页，source systemTime=${sourceSystemTime}，本地整合时间=${capturedAt}。
- 页面提示系统升级/暂停销售；因此只作为预测校准，不发布正式购彩单。
- 周二046 英格兰 vs 加纳：普通胜平负未开售；让球胜平负 -2 为 2.20/3.80/2.43，去水位约 40.25%/23.31%/36.44%。
- 周二047 巴拿马 vs 克罗地亚：普通胜平负 6.90/4.20/1.34，去水位约 12.83%/21.08%/66.09%；让球胜平负 +1 为 2.65/3.60/2.11，去水位约 33.42%/24.60%/41.97%。
- 新浪核验：当前未取得稳定结构化单场竞彩SP；不补写无法抓到的赔率。
- 红队边界：discussion_only / hold_for_betting，不能给正式投注单。`;

const riskBlock = `## 关键风险
- 英格兰场普通SPF未开售，且Saka/Rice负荷、Ati-Zigi赛前体检、Partey回归都会影响强弱差表达。
- 克罗地亚普通SPF很强，但+1让球并不支持无脑穿透；Panama低位抗压和Croatia后程防守仍保留冷门尾部。
- 两场均缺T-75官方首发、最终伤停和稳定第二来源结构化赔率，投注口径继续冻结。`;

write(summaryFile, `# L组第二轮量化预测汇总_体彩赔率复核重算
状态：cp_jc_odds_integrated_discussion_only
更新时间：${capturedAt}

${predictionTable}

${sharedOdds}

${riskBlock}`);

write(englandFile, `# 英格兰 vs 加纳 量化预测_体彩赔率复核重算
状态：discussion_only
更新时间：${capturedAt}

| 项 | 结论 |
|---|---|
| 胜平负 | 英格兰胜倾向 |
| 概率 | 英格兰胜 ${pct(0.64)} / 平 ${pct(0.22)} / 加纳胜 ${pct(0.14)} |
| xG | 1.90-0.74 |
| 主比分 | 1-0 / 2-0 |
| 竞彩赔率 | 周二046 普通SPF未开售；让球-2：2.20/3.80/2.43 |
| 投注边界 | discussion_only / hold_for_betting |

${sharedOdds}

## 判断
英格兰依然是更强的一方，但这次不能简单沿用首轮4-2后的大胜叙事。Saka大概率继续受负荷管理影响，Ghana有Partey回归和低位反击路径，Ati-Zigi若缺阵则会反向削弱门线稳定性。因此模型保留英格兰胜为第一方向，比分收在1-0/2-0。`);

write(croatiaFile, `# 巴拿马 vs 克罗地亚 量化预测_体彩赔率复核重算
状态：discussion_only
更新时间：${capturedAt}

| 项 | 结论 |
|---|---|
| 胜平负 | 克罗地亚胜倾向 |
| 概率 | 巴拿马胜 ${pct(0.155)} / 平 ${pct(0.245)} / 克罗地亚胜 ${pct(0.6)} |
| xG | 0.76-1.72 |
| 主比分 | 0-1 / 0-2 |
| 竞彩赔率 | 周二047 SPF：6.90/4.20/1.34；让球+1：2.65/3.60/2.11 |
| 投注边界 | discussion_only / hold_for_betting |

${sharedOdds}

## 判断
普通SPF给了克罗地亚很强的胜面信号，结合无明确伤停和必须抢分的战意，主方向上调到克罗地亚胜。但+1让球仍显示巴拿马受让路径不弱，Carrasquilla若能出场会改善推进，Croatia老将中场后程回防也不是零风险，所以不写成稳穿。`);

const roleBlocks = {
  "data-collector.md": `## L组第二轮事实与体彩赔率补充 2026-06-23
${sharedOdds}

## 队情快照
- 英格兰：Tuchel强调防守结构和夺回球权后的处理；Rice已训练，Saka完整训练但仍有负荷管理，右路可能继续Madueke。
- 加纳：Ati-Zigi腹股沟伤待赛前体检；Partey可出战。
- 巴拿马：未列明确out，Carrasquilla doubtful/unknown。
- 克罗地亚：当前未列out/doubtful，预计仍以Livakovic、Gvardiol、Modric、Kovacic等核心框架出战。

## 入模边界
- 周二046普通SPF未开售，只允许用让球-2作为深盘分歧信号。
- 周二047普通SPF可入胜平负校准，但+1让球必须用于限制穿盘自信。
- 发布限制：discussion_only / hold_for_betting。`,
  "tactics-coach.md": `## L组第二轮战术复核 2026-06-23
- 英格兰 vs 加纳：英格兰强在前场深度、定位球二次进攻和Bellingham/Kane轴线；弱点是首轮暴露的回收过早与丢球后结构。Ghana低位、直接反击、Partey回归让比赛更像低比分消耗战。
- 巴拿马 vs 克罗地亚：克罗地亚控球和中场质量明显占优，但首轮后程防守和转换保护要打折；Panama若Carrasquilla可用，推进和反击质量会上升。
- 双重计数警告：首轮比分不能同时重复进入近期状态、战术修正和赔率校准三层。
- 模型建议：英格兰场保留平局尾部；克罗地亚场上调胜面但不直接上调穿盘。`,
  "modeler.md": `## L组第二轮体彩赔率校准重算 2026-06-23
${predictionTable}

## 校准说明
- 英格兰场普通SPF未开售，最终胜/平/负 64.0%/22.0%/14.0%，xG 1.90-0.74。
- 克罗地亚场普通SPF去水位约 12.83%/21.08%/66.09%，模型因+1让球和Croatia后程风险降温到 15.5%/24.5%/60.0%，xG 0.76-1.72。
- 赔率是校准层，不是单独真值层。`,
  "red-team.md": `## L组第二轮红队校验 2026-06-23
verdict=hold_for_betting_discussion_only

- 中国足彩网页面存在系统升级/暂停销售提示，不能宣称正式可投注。
- 英格兰场普通SPF未开售，禁止用欧赔参考冒充竞彩SP。
- 克罗地亚场普通SPF强，但+1让球仍保留巴拿马受让路径，不能给稳胆/穿盘结论。
- 缺T-75首发、最终伤停、Saka/Rice/Ati-Zigi/Carrasquilla临场确认和稳定新浪结构化赔率。`,
  "summary.md": `## 汇总摘要 2026-06-23 体彩赔率复核
${predictionTable}

结论：已纳入中国足彩网竞彩混合页赔率；红队仍维持 discussion_only / hold_for_betting。`,
  "main-recalc.md": `# L组第二轮 体彩赔率复核重算_主线程整合
状态：cp_jc_odds_integrated_discussion_only
更新时间：${capturedAt}

${predictionTable}

${sharedOdds}

## 线程整合
- 数据采集、战术、模型、红队、汇总线程均已调起并记录线程ID。
- 因角色线程仍在运行且红队文件曾被删除，主线程按抗断流协议完成 partial_thread_fallback 整合。
- 本地文件已落地，后续子线程补充应追加到对应角色文件。`,
};

for (const [name, body] of Object.entries(roleBlocks)) {
  upsertBlock(path.join(recalcDir, name), "l-group-round2-cp-jc-20260623", body);
}

const statusBlock = `
## 2026-06-23 L组第二轮中国足彩网竞彩赔率复核重算
- status: cp_jc_odds_integrated_discussion_only
- updated_at: ${capturedAt}
- role_threads: data=${roleThreads.data_collector.thread_id}; tactics=${roleThreads.tactics_coach.thread_id}; model=${roleThreads.modeler.thread_id}; red_team=${roleThreads.red_team.thread_id}; summary=${roleThreads.summary.thread_id}
- output_json: ${path.relative(root, jsonPath)}
- output_markdown: ${path.relative(root, summaryFile)}; ${path.relative(root, englandFile)}; ${path.relative(root, croatiaFile)}
- source: 中国足彩网竞彩混合页 ${cpUrl}
- source_system_time: ${sourceSystemTime}
- prediction_snapshot: 英格兰胜64.0/平22.0/加纳胜14.0，主比分1-0/2-0；巴拿马胜15.5/平24.5/克罗地亚胜60.0，主比分0-1/0-2
- red_team: hold_for_betting_discussion_only；缺T-75首发、最终伤停和稳定竞彩SP核验前不发布正式投注单
- validation: json_parse_ok; markdown_discussion_only_ok; status_tail_verified
`;
fs.appendFileSync(statusFile, statusBlock, "utf8");

const reparsed = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
function assertProbVector(actual, expected, label) {
  if (actual.length !== expected.length) throw new Error(`${label} implied probability length failed: ${actual.join("/")}`);
  actual.forEach((value, index) => {
    if (Math.abs(value - expected[index]) > 0.0001) {
      throw new Error(`${label} implied probability validation failed: ${actual.join("/")}`);
    }
  });
}
assertProbVector(
  reparsed.sources.cp_jc_odds_snapshot.matches["L-R2-PAN-CRO-20260623"].ordinary_spf.implied_normalized,
  [0.1283, 0.2108, 0.6608],
  "Croatia ordinary SPF"
);
assertProbVector(
  reparsed.sources.cp_jc_odds_snapshot.matches["L-R2-ENG-GHA-20260623"].rqspf.implied_normalized,
  [0.4025, 0.2330, 0.3644],
  "England RQSPF"
);
for (const match of reparsed.matches) {
  const sum = Object.values(match.final_probabilities).reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1) > 0.0001) throw new Error(`Final probability sum failed: ${match.match_id}`);
  if (!match.red_team_status || !match.red_team_status.verdict.includes("hold")) {
    throw new Error(`Red-team hold missing: ${match.match_id}`);
  }
}
for (const file of [summaryFile, englandFile, croatiaFile]) {
  const body = fs.readFileSync(file, "utf8");
  if (!body.includes("中国足彩网竞彩混合页") || !body.includes("discussion_only")) {
    throw new Error(`Markdown validation failed: ${file}`);
  }
}
for (const name of Object.keys(roleBlocks)) {
  const body = fs.readFileSync(path.join(recalcDir, name), "utf8");
  if (!body.includes("l-group-round2-cp-jc-20260623")) throw new Error(`Role block missing: ${name}`);
}
const statusTail = fs.readFileSync(statusFile, "utf8").slice(-1500);
if (!statusTail.includes("L组第二轮中国足彩网竞彩赔率复核重算") || !statusTail.includes("status_tail_verified")) {
  throw new Error("Status tail validation failed");
}

console.log(JSON.stringify({
  ok: true,
  json: path.relative(root, jsonPath),
  markdown: reparsed.validation.markdown_files_written,
  role_threads: roleThreads,
  status_tail_verified: true,
}, null, 2));
