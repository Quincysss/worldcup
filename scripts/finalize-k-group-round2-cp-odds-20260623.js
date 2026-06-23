const fs = require("fs");
const path = require("path");

const root = process.cwd();
const capturedAt = "2026-06-23T17:40:00+08:00";
const sourceSystemTime = "2026-06-23 15:54:38";
const cpUrl = "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini";
const sinaUrl = "https://lotto.sina.cn/ai";

const jsonPath = path.join(root, "data", "outputs", "match_predictions", "k-group-round2-quant-prediction-20260623.json");
const recalcDir = path.join(root, "data", "thread_outputs", "k-group-round2-recalc-20260623");
const statusFile = path.join(root, "线程状态.md");
const summaryFile = path.join(root, "比赛", "未开始比赛", "小组赛", "K组", "K组第二轮量化预测汇总_20260623.md");
const porFile = path.join(root, "比赛", "未开始比赛", "小组赛", "K组", "2026-06-23_葡萄牙_vs_乌兹别克斯坦_量化预测.md");
const colFile = path.join(root, "比赛", "未开始比赛", "小组赛", "K组", "2026-06-23_哥伦比亚_vs_刚果金_量化预测.md");

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

const cpSnapshot = {
  source: "中国足彩网竞彩混合页",
  url: cpUrl,
  source_system_time: sourceSystemTime,
  captured_at: capturedAt,
  issue_date: "2026-06-23",
  note: "页面有系统升级/暂停销售提示；普通胜平负若显示未开售，不用欧赔参考替代竞彩SP。",
  matches: {
    "K-R2-POR-UZB-20260623": {
      competition_no: "周二045",
      home_team: "葡萄牙",
      away_team: "乌兹别克斯坦",
      kickoff_beijing: "2026-06-24T01:00:00+08:00",
      ordinary_spf: { status: "未开售", odds: null, implied_normalized: null },
      rqspf: {
        handicap: -2,
        odds: [1.98, 4.05, 2.65],
        implied_normalized: normalizeOdds([1.98, 4.05, 2.65]),
      },
      non_sp_reference: {
        label: "页面欧赔/参考展示，不作为竞彩SP",
        odds: [1.14, 8.24, 19.04],
        implied_normalized: normalizeOdds([1.14, 8.24, 19.04]),
      },
    },
    "K-R2-COL-DRC-20260623": {
      competition_no: "周二048",
      home_team: "哥伦比亚",
      away_team: "刚果金",
      kickoff_beijing: "2026-06-24T10:00:00+08:00",
      ordinary_spf: {
        status: "已开售",
        odds: [1.35, 3.9, 7.6],
        implied_normalized: normalizeOdds([1.35, 3.9, 7.6]),
      },
      rqspf: {
        handicap: -1,
        odds: [2.22, 3.35, 2.63],
        implied_normalized: normalizeOdds([2.22, 3.35, 2.63]),
      },
      non_sp_reference: {
        label: "页面欧赔/参考展示，不作为竞彩SP",
        odds: [1.53, 3.98, 6.59],
        implied_normalized: normalizeOdds([1.53, 3.98, 6.59]),
      },
    },
  },
  sina_cross_check: {
    source: "新浪彩票/新浪体育",
    url: sinaUrl,
    status: "fixture_verified_no_structured_odds_in_available_fetch",
    note: "当前可抓取页面只稳定验证到赛程；用户提到的单场赔率页若提供URL，可再做同源核验。",
  },
};

const patches = {
  "K-R2-POR-UZB-20260623": {
    model: poissonModel(1.92, 0.72),
    final_probabilities: { home_win: 0.655, draw: 0.212, away_win: 0.133 },
    final_pick: {
      winner_market: "葡萄牙胜",
      score: "1-0 / 2-0",
      score_rationale: "普通胜平负未开售，-2让球盘显示市场不应直接写成深盘稳穿；保留低比分胜和乌兹别克反击得分尾部。",
      confidence: "medium_low",
    },
    market_adjustment: {
      home: 0.015,
      draw: -0.003,
      away: -0.012,
      reason: "仅吸收中国足彩网-2让球胜平负，普通SPF未开售，欧赔展示只作为非SP参考。",
    },
  },
  "K-R2-COL-DRC-20260623": {
    model: poissonModel(1.72, 0.94),
    final_probabilities: { home_win: 0.57, draw: 0.235, away_win: 0.195 },
    final_pick: {
      winner_market: "哥伦比亚小胜倾向",
      score: "1-0 / 2-1",
      score_rationale: "普通SPF强推哥伦比亚，但-1让球胜面只有约39.9%，说明赢球强于穿盘，1-1必须前置。",
      confidence: "low_medium",
    },
    market_adjustment: {
      home: 0.035,
      draw: -0.002,
      away: -0.033,
      reason: "吸收普通SPF 65.6%主胜信号，但用-1让球分歧压低过热穿盘判断。",
    },
  },
};

const doc = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
doc.metadata.status = "cp_jc_odds_integrated_discussion_only";
doc.metadata.updated_at = capturedAt;
doc.metadata.cp_jc_odds_snapshot = cpSnapshot;
doc.metadata.publication_gate = {
  discussion_prediction: true,
  betting_release: false,
  reason: "已纳入中国足彩网竞彩混合页赔率；但页面存在暂停销售提示，葡萄牙普通SPF未开售，新浪未稳定抓到结构化赔率，且缺T-75首发/最新伤停确认，所以不发布正式投注单。",
};
doc.metadata.source_urls = Array.from(new Set([...(doc.metadata.source_urls || []), cpUrl, sinaUrl]));

for (const key of Object.keys(doc.metadata.role_threads || {})) {
  if (doc.metadata.role_threads[key]?.output) {
    doc.metadata.role_threads[key].output = `data/thread_outputs/k-group-round2-recalc-20260623/${key.replace("_", "-")}.md`;
  }
}

for (const match of doc.matches) {
  const patch = patches[match.match_id];
  if (!patch) continue;
  match.odds_snapshot = cpSnapshot.matches[match.match_id];
  match.expected_goals = patch.model.expected_goals;
  match.poisson_score_matrix = patch.model.poisson_score_matrix;
  match.probabilities_1x2 = patch.model.probabilities_1x2;
  match.totals_probabilities = patch.model.totals_probabilities;
  match.top_scorelines = patch.model.top_scorelines;
  match.final_probabilities = patch.final_probabilities;
  match.final_pick = patch.final_pick;
  match.market_adjustment = patch.market_adjustment;
  match.red_team_status = {
    verdict: "hold_for_betting_discussion_only",
    publish_mode: "discussion_only",
    required_caution: "等待T-75首发、最新伤停和稳定竞彩SP核验后，才能转成投注方案。",
  };
}

doc.validation = {
  json_parse_checked: true,
  markdown_files_written: [
    path.relative(root, summaryFile),
    path.relative(root, porFile),
    path.relative(root, colFile),
  ],
  status_file_append: "verified_after_cp_jc_odds_finalize_script",
  betting_boundary: "discussion_only_hold_until_lineups_injuries_and_stable_sp",
};
write(jsonPath, JSON.stringify(doc, null, 2));

const rows = [
  ["葡萄牙 vs 乌兹别克斯坦", "葡萄牙胜", "65.5% / 21.2% / 13.3%", "1.92-0.72", "1-0 / 2-0", "周二045：普通SPF未开售；让球-2为1.98/4.05/2.65"],
  ["哥伦比亚 vs 刚果金", "哥伦比亚小胜倾向", "57.0% / 23.5% / 19.5%", "1.72-0.94", "1-0 / 2-1", "周二048：SPF 1.35/3.90/7.60；让球-1为2.22/3.35/2.63"],
];

const predictionTable = [
  "| 比赛 | 方向 | 胜/平/负 | xG | 主比分 | 竞彩赔率状态 |",
  "|---|---|---:|---|---|---|",
  ...rows.map((r) => `| ${r.join(" | ")} |`),
].join("\n");

const sharedOdds = `## 体彩同源赔率复核
- 来源：中国足彩网竞彩混合页，source systemTime=${sourceSystemTime}，本地整合时间=${capturedAt}。
- 周二045 葡萄牙 vs 乌兹别克斯坦：普通胜平负未开售；让球胜平负 -2 为 1.98/4.05/2.65，去水位约 44.72%/21.86%/33.41%。
- 周二048 哥伦比亚 vs 刚果金：普通胜平负 1.35/3.90/7.60，去水位约 65.63%/22.72%/11.66%；让球胜平负 -1 为 2.22/3.35/2.63，去水位约 39.89%/26.44%/33.67%。
- 新浪核验：当前可抓取页面只稳定验证到赛程，未稳定返回结构化竞彩赔率；不补写无法抓到的赔率。
- 红队边界：discussion_only / hold_for_betting，不能给正式投注单。`;

write(summaryFile, `# K组第二轮量化预测汇总_体彩赔率复核重算
状态：cp_jc_odds_integrated_discussion_only
更新时间：${capturedAt}

${predictionTable}

${sharedOdds}

## 关键风险
- 葡萄牙普通胜平负未开售，只能用 -2 让球盘做分歧校准，不能把欧赔参考当竞彩SP。
- 哥伦比亚普通SPF支持胜面，但 -1 让球盘不支持强穿盘，1-1与刚果金反击必须保留。
- 缺 T-75 首发、最终伤停和稳定新浪单场赔率页前，结论只用于赛前讨论。`);

write(porFile, `# 葡萄牙 vs 乌兹别克斯坦 量化预测_体彩赔率复核重算
状态：discussion_only
更新时间：${capturedAt}

| 项 | 结论 |
|---|---|
| 胜平负 | 葡萄牙胜 |
| 概率 | 葡萄牙胜 ${pct(0.655)} / 平 ${pct(0.212)} / 乌兹别克斯坦胜 ${pct(0.133)} |
| xG | 1.92-0.72 |
| 主比分 | 1-0 / 2-0 |
| 竞彩赔率 | 周二045 普通SPF未开售；让球-2：1.98/4.05/2.65 |
| 投注边界 | discussion_only / hold_for_betting |

${sharedOdds}

## 判断
葡萄牙仍是更强的一方，但这次不再用欧赔参考直接推高胜率。让球-2的去水位结构说明市场对大胜并不轻松，模型从控球压制与阵容质量给葡萄牙优势，同时把比分从单一2-0改成1-0/2-0并列。`);

write(colFile, `# 哥伦比亚 vs 刚果金 量化预测_体彩赔率复核重算
状态：discussion_only
更新时间：${capturedAt}

| 项 | 结论 |
|---|---|
| 胜平负 | 哥伦比亚小胜倾向 |
| 概率 | 哥伦比亚胜 ${pct(0.57)} / 平 ${pct(0.235)} / 刚果金胜 ${pct(0.195)} |
| xG | 1.72-0.94 |
| 主比分 | 1-0 / 2-1 |
| 竞彩赔率 | 周二048 SPF：1.35/3.90/7.60；让球-1：2.22/3.35/2.63 |
| 投注边界 | discussion_only / hold_for_betting |

${sharedOdds}

## 判断
普通SPF明显支持哥伦比亚胜面，但让球-1的市场分布更谨慎，所以模型只把哥伦比亚从轻微优势上调到小胜倾向，不写成稳胆。刚果金的反击、二点球和定位球仍足以制造1-1风险。`);

const roleBlocks = {
  "data-collector.md": `## 体彩同源赔率补充 2026-06-23
${sharedOdds}

入模边界：周二048普通SPF可作为主胜市场信号；周二045普通SPF未开售，只允许使用让球-2作为深盘分歧信号。`,
  "tactics-coach.md": `## 体彩赔率后的战术复核 2026-06-23
- 葡萄牙优势仍来自控球、边路压制和前场个人能力，但让球-2不支持把比赛写成轻松穿盘。
- 乌兹别克斯坦的现实路径是低位密集、二点球和定位球，比分预测应保留1-0与2-0并列。
- 哥伦比亚普通SPF强化胜面，但-1让球分歧要求保留刚果金反击和1-1。`,
  "modeler.md": `## 体彩赔率校准重算 2026-06-23
- 葡萄牙：普通SPF未开售，xG 1.92-0.72，最终胜/平/负 65.5%/21.2%/13.3%，比分 1-0/2-0。
- 哥伦比亚：普通SPF去水位 65.63%/22.72%/11.66%，但-1让球去水位仅 39.89%/26.44%/33.67%；最终胜/平/负 57.0%/23.5%/19.5%，比分 1-0/2-1。
- 赔率只作为校准信号，不作为真值替代战术与球员状态。`,
  "red-team.md": `## 体彩赔率红队校验 2026-06-23
verdict=hold_for_betting_discussion_only

- 页面存在系统升级/暂停销售提示，不能宣称正式可投注。
- 葡萄牙普通胜平负未开售，禁止用欧赔参考冒充竞彩SP。
- 哥伦比亚普通SPF强，但-1让球不强，不能给稳胆/穿盘结论。
- 缺T-75首发、最终伤停和稳定新浪单场赔率页，投注建议继续冻结。`,
  "summary.md": `## 汇总摘要 2026-06-23 体彩赔率复核
${predictionTable}

结论：已纳入中国足彩网竞彩混合页赔率；红队仍维持 discussion_only / hold_for_betting。`,
  "main-recalc.md": `# K组第二轮 体彩赔率复核重算_主线程整合
状态：cp_jc_odds_integrated_discussion_only
更新时间：${capturedAt}

${predictionTable}

${sharedOdds}

## 线程整合
- 数据采集、战术、模型、红队、汇总线程均已收到同一赔率事实。
- 本地文件已先落地，后续线程补充可继续追加到对应角色文件。`,
};

for (const [name, body] of Object.entries(roleBlocks)) {
  upsertBlock(path.join(recalcDir, name), "cp-jc-odds-20260623", body);
}

const statusBlock = `
## 2026-06-23 K组第二轮中国足彩网竞彩赔率复核重算
- status: cp_jc_odds_integrated_discussion_only
- updated_at: ${capturedAt}
- source: 中国足彩网竞彩混合页 ${cpUrl}
- source_system_time: ${sourceSystemTime}
- sina_cross_check: fixture_verified_no_structured_odds_in_available_fetch
- prediction_snapshot: 葡萄牙胜65.5/平21.2/乌兹别克斯坦胜13.3，主比分1-0/2-0；哥伦比亚胜57.0/平23.5/刚果金胜19.5，主比分1-0/2-1
- red_team: hold_for_betting_discussion_only；缺T-75首发、最终伤停和稳定竞彩SP核验前不发布正式投注单
`;
fs.appendFileSync(statusFile, statusBlock, "utf8");

const reparsed = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
if (reparsed.metadata.cp_jc_odds_snapshot.matches["K-R2-COL-DRC-20260623"].ordinary_spf.implied_normalized.join("/") !== "0.6563/0.2272/0.1166") {
  throw new Error("Colombia SPF implied probability validation failed");
}
for (const match of reparsed.matches) {
  const sum = Object.values(match.final_probabilities).reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1) > 0.0001) throw new Error(`Final probability sum failed: ${match.match_id}`);
}
for (const file of [summaryFile, porFile, colFile]) {
  const body = fs.readFileSync(file, "utf8");
  if (!body.includes("中国足彩网竞彩混合页") || !body.includes("discussion_only")) {
    throw new Error(`Markdown validation failed: ${file}`);
  }
}
const statusTail = fs.readFileSync(statusFile, "utf8").slice(-1000);
if (!statusTail.includes("K组第二轮中国足彩网竞彩赔率复核重算") || !statusTail.includes("cp_jc_odds_integrated_discussion_only")) {
  throw new Error("Status tail validation failed");
}

console.log(JSON.stringify({
  ok: true,
  json: path.relative(root, jsonPath),
  markdown: reparsed.validation.markdown_files_written,
  role_outputs: Object.keys(roleBlocks).map((x) => path.relative(root, path.join(recalcDir, x))),
  status_tail_verified: true,
}, null, 2));
