const fs = require("fs");
const path = require("path");

const root = process.cwd();
const capturedAt = "2026-06-23T17:08:00+08:00";
const jsonPath = path.join(root, "data", "outputs", "match_predictions", "k-group-round2-quant-prediction-20260623.json");
const recalcDir = path.join(root, "data", "thread_outputs", "k-group-round2-recalc-20260623");
const statusFile = path.join(root, "线程状态.md");

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

function write(file, body) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${body.trim()}\n`, "utf8");
}

const doc = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
doc.metadata.status = "partial_thread_backed_discussion_only";
doc.metadata.updated_at = capturedAt;
doc.metadata.recalc_after_supplemental_inputs = {
  ...(doc.metadata.recalc_after_supplemental_inputs || {}),
  status: "completed_partial_thread_backed_discussion_only",
  captured_at: capturedAt,
  final_integration_note: "已整合建模线程的降温基线与红队校验，赔率只做参考校准，不升级为投注单。",
  role_thread_outputs: {
    data_collector: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "data-collector.md"),
    tactics_coach: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "tactics-coach.md"),
    modeler: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "modeler.md"),
    red_team: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "red-team.md"),
    summary: path.join("data", "thread_outputs", "k-group-round2-recalc-20260623", "summary.md"),
  },
};
doc.metadata.publication_gate = {
  discussion_prediction: true,
  betting_release: false,
  reason: "中国竞彩网官方即时SP、T-75首发和最终伤停未完整结构化取得；足彩网与新浪只作为中文同源参考/赛程确认，本版不发布正式投注单。",
};

const porModel = model(2.0, 0.68);
const colModel = model(1.64, 0.98);
const patches = {
  "K-R2-POR-UZB-20260623": {
    model: porModel,
    final_probabilities: { home_win: 0.685, draw: 0.199, away_win: 0.116 },
    final_pick: {
      winner_market: "葡萄牙胜",
      score: "2-0",
      score_rationale: "2-0与1-0接近，赔率热度只部分吸收；保留1-1作为冷门风险。",
      confidence: "medium_low",
    },
    red_team_status: {
      verdict: "hold_for_betting",
      publish_mode: "discussion_only",
      required_caution: "只能写葡萄牙方向占优，不写稳胆、穿盘或重注。",
    },
  },
  "K-R2-COL-DRC-20260623": {
    model: colModel,
    final_probabilities: { home_win: 0.53, draw: 0.245, away_win: 0.225 },
    final_pick: {
      winner_market: "哥伦比亚轻微优势",
      score: "1-0",
      score_rationale: "1-0和1-1非常接近，刚果金反击、二点球与定位球尾部必须保留。",
      confidence: "low_medium",
    },
    red_team_status: {
      verdict: "hold_for_betting",
      publish_mode: "discussion_only",
      required_caution: "哥伦比亚只能写轻微第一方向，必须前置1-1风险。",
    },
  },
};

for (const match of doc.matches) {
  const patch = patches[match.match_id];
  if (!patch) continue;
  match.expected_goals = patch.model.expected_goals;
  match.poisson_score_matrix = patch.model.poisson_score_matrix;
  match.probabilities_1x2 = patch.model.probabilities_1x2;
  match.totals_probabilities = patch.model.totals_probabilities;
  match.top_scorelines = patch.model.top_scorelines;
  match.final_probabilities = patch.final_probabilities;
  match.final_pick = patch.final_pick;
  match.red_team_status = patch.red_team_status;
}

doc.validation = {
  json_parse_checked: true,
  markdown_files_written: doc.validation?.markdown_files_written || [],
  status_file_append: "verified_after_finalize_script",
  betting_boundary: "discussion_only_until_official_sp_lineups_injuries",
};
fs.writeFileSync(jsonPath, `${JSON.stringify(doc, null, 2)}\n`, "utf8");

const [summaryRel, porRel, colRel] = doc.validation.markdown_files_written;
const files = [summaryRel, porRel, colRel].map((p) => path.join(root, p));
const table = `| 比赛 | 方向 | 胜/平/负 | xG | 主比分 | 口径 |
|---|---|---:|---|---|---|
| 葡萄牙 vs 乌兹别克斯坦 | 葡萄牙胜 | 68.50% / 19.90% / 11.60% | 2.00-0.68 | 2-0 | discussion_only |
| 哥伦比亚 vs 刚果金 | 哥伦比亚轻微优势 | 53.00% / 24.50% / 22.50% | 1.64-0.98 | 1-0 | discussion_only |`;

const shared = `## 补充输入
- 四队 player-state JSON 已重新解析通过，前版“四队解析失败”为误报。
- 足彩网比分直播/百家欧赔已纳入参考：葡萄牙 1.14/8.24/19.04；哥伦比亚 1.53/3.98/6.56。
- 新浪彩票页面只确认两场赛程，没有暴露可结构化赔率。
- 中国竞彩网官方即时SP、T-75首发、最终伤停仍未完整结构化取得。
- 建模线程给出更保守基线，红队维持 hold_for_betting，本版只作为赛前讨论预测。`;

write(files[0], `# K组第二轮量化预测汇总_补充输入复核重算
状态：partial_thread_backed_discussion_only
红队结论：hold_for_betting，不发布正式投注单
更新时间：${capturedAt}

## 预测表
${table}

${shared}

## 关键风险
- 葡萄牙方向最清晰，但赔率过热，深盘穿透不写成稳结论。
- 哥伦比亚只能写轻微优势，1-1和刚果金定位球/反击风险必须前置。
- 赔率来源仍不是中国竞彩网官方最终SP，投注口径继续冻结。`);

write(files[1], `# 葡萄牙 vs 乌兹别克斯坦 量化预测_补充输入复核重算
状态：discussion_only
更新时间：${capturedAt}

## 预测表
| 项 | 结论 |
|---|---|
| 胜平负 | 葡萄牙胜 |
| 概率 | 葡萄牙胜68.50% / 平19.90% / 乌兹别克斯坦胜11.60% |
| xG | 2.00-0.68 |
| 主推比分 | 2-0 |
| 备选风险 | 1-0、1-1、2-1 |
| 投注边界 | 只作讨论预测，不发布正式投注单 |

${shared}

## 判断
葡萄牙控球、边路压制和替补深度仍明显占优；足彩网赔率显示市场极热，但红队要求只部分吸收热度。因此比分表达保留低比分和乌兹别克反击尾部，不能写成深盘稳穿。`);

write(files[2], `# 哥伦比亚 vs 刚果金 量化预测_补充输入复核重算
状态：discussion_only
更新时间：${capturedAt}

## 预测表
| 项 | 结论 |
|---|---|
| 胜平负 | 哥伦比亚轻微优势 |
| 概率 | 哥伦比亚胜53.00% / 平24.50% / 刚果金胜22.50% |
| xG | 1.64-0.98 |
| 主推比分 | 1-0 |
| 备选风险 | 1-1、2-1、0-1 |
| 投注边界 | 只作讨论预测，不发布正式投注单 |

${shared}

## 判断
哥伦比亚边路爆点、定位球质量和替补冲击略好，但刚果金首轮对抗、反击和二点球质量不能被低估。模型最终只给哥伦比亚轻微第一方向，1-1是最需要防的风险比分。`);

write(path.join(recalcDir, "main-recalc.md"), `# K组第二轮补充输入后复核重算_主线程整合
状态：partial_thread_backed_discussion_only
更新时间：${capturedAt}

${table}

${shared}

## 线程整合
- 数据采集线程：data/thread_outputs/k-group-round2-recalc-20260623/data-collector.md
- 战术教练线程：data/thread_outputs/k-group-round2-recalc-20260623/tactics-coach.md
- 建模线程：data/thread_outputs/k-group-round2-recalc-20260623/modeler.md
- 红队线程：data/thread_outputs/k-group-round2-recalc-20260623/red-team.md
- 汇总线程：data/thread_outputs/k-group-round2-recalc-20260623/summary.md`);

fs.appendFileSync(statusFile, `
## 2026-06-23 K组第二轮补充输入复核重算-整合建模红队修正
- status: completed_partial_thread_backed_discussion_only
- updated_at: ${capturedAt}
- player_state_json: 四队均解析通过，前版解析失败更正为误报
- odds_input: 足彩网比分直播/百家欧赔已纳入参考；新浪确认赛程无结构化赔率；中国竞彩网官方即时SP未结构化取得
- prediction_snapshot: 葡萄牙胜68.5/平19.9/乌兹别克胜11.6，主比分2-0；哥伦比亚胜53.0/平24.5/刚果金胜22.5，主比分1-0
- red_team: hold_for_betting；缺官方SP、T-75首发、最终伤停前不发布正式投注单
`, "utf8");

const reparsed = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
if (!reparsed.matches || reparsed.matches.length !== 2) throw new Error("JSON validation failed");
for (const file of files) {
  const body = fs.readFileSync(file, "utf8");
  if (!body.includes("discussion_only") || !body.includes("复核重算")) throw new Error(`Markdown validation failed: ${file}`);
}
const tail = fs.readFileSync(statusFile, "utf8").slice(-900);
if (!tail.includes("整合建模红队修正") || !tail.includes("completed_partial_thread_backed_discussion_only")) {
  throw new Error("Status tail validation failed");
}
console.log(JSON.stringify({
  ok: true,
  json: path.relative(root, jsonPath),
  markdown: doc.validation.markdown_files_written,
  status_tail_verified: true,
}, null, 2));
