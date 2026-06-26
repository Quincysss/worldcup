const fs = require("fs");
const path = require("path");

const root = process.cwd();
const createdAt = "2026-06-26T23:30:00+08:00";

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function poisson(lambda, k) {
  let factorial = 1;
  for (let i = 2; i <= k; i += 1) factorial *= i;
  return Math.exp(-lambda) * Math.pow(lambda, k) / factorial;
}

function pct(value, digits = 1) {
  return `${(value * 100).toFixed(digits)}%`;
}

function round(value, digits = 4) {
  return Number(value.toFixed(digits));
}

function normalizeOdds(odds) {
  if (!odds) return null;
  const raw = odds.map((odd) => 1 / odd);
  const sum = raw.reduce((acc, value) => acc + value, 0);
  return raw.map((value) => value / sum);
}

function buildPoisson(homeXg, awayXg) {
  const maxEval = 14;
  const maxMatrix = 5;
  const homeP = Array.from({ length: maxEval + 1 }, (_, i) => poisson(homeXg, i));
  const awayP = Array.from({ length: maxEval + 1 }, (_, i) => poisson(awayXg, i));
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  let over25 = 0;
  let over35 = 0;
  let bttsYes = 0;
  const scores = [];

  for (let h = 0; h <= maxEval; h += 1) {
    for (let a = 0; a <= maxEval; a += 1) {
      const p = homeP[h] * awayP[a];
      if (h > a) homeWin += p;
      if (h === a) draw += p;
      if (h < a) awayWin += p;
      if (h + a > 2.5) over25 += p;
      if (h + a > 3.5) over35 += p;
      if (h > 0 && a > 0) bttsYes += p;
      scores.push({ score: `${h}-${a}`, home_goals: h, away_goals: a, probability: p });
    }
  }

  const matrix = [];
  let matrixMass = 0;
  for (let h = 0; h <= maxMatrix; h += 1) {
    const row = [];
    for (let a = 0; a <= maxMatrix; a += 1) {
      const p = poisson(homeXg, h) * poisson(awayXg, a);
      matrixMass += p;
      row.push(round(p, 6));
    }
    matrix.push(row);
  }

  scores.sort((left, right) => right.probability - left.probability);

  return {
    raw_1x2: {
      home_win: round(homeWin, 6),
      draw: round(draw, 6),
      away_win: round(awayWin, 6),
    },
    totals: {
      over_2_5: round(over25, 6),
      under_2_5: round(1 - over25, 6),
      over_3_5: round(over35, 6),
      under_3_5: round(1 - over35, 6),
    },
    btts: {
      yes: round(bttsYes, 6),
      no: round(1 - bttsYes, 6),
    },
    top5: scores.slice(0, 5).map((item) => ({
      score: item.score,
      probability: round(item.probability, 6),
    })),
    score_matrix_0_5: matrix,
    score_matrix_0_5_mass: round(matrixMass, 6),
    score_matrix_tail_probability: round(1 - matrixMass, 6),
  };
}

function handicapProbabilities(homeXg, awayXg, handicap) {
  const maxEval = 14;
  let homeHandicapWin = 0;
  let handicapDraw = 0;
  let awayHandicapWin = 0;
  for (let h = 0; h <= maxEval; h += 1) {
    for (let a = 0; a <= maxEval; a += 1) {
      const p = poisson(homeXg, h) * poisson(awayXg, a);
      const adjusted = h + handicap - a;
      if (adjusted > 0) homeHandicapWin += p;
      if (adjusted === 0) handicapDraw += p;
      if (adjusted < 0) awayHandicapWin += p;
    }
  }
  return {
    handicap,
    home_handicap_win: round(homeHandicapWin, 6),
    handicap_draw: round(handicapDraw, 6),
    away_handicap_win: round(awayHandicapWin, 6),
  };
}

const matches = [
  {
    id: "J-R3-071",
    match_no: "周六071",
    kickoff_beijing: "2026-06-28 10:00",
    home: "阿尔及利亚",
    away: "奥地利",
    xg: { home: 1.14, away: 1.31 },
    final_1x2: { home_win: 0.315, draw: 0.31, away_win: 0.375 },
    confidence: { label: "medium", value: 0.54 },
    odds: {
      source_primary: "中国足彩网竞彩混合页本地快照 data/tmp_zgzcw_jcmini_20260626.html",
      source_cross_check: "500.com 竞彩页本地快照 data/tmp_500_jczq_20260626.html",
      captured_at: "2026-06-26",
      ordinary_spf: { odds: [3.35, 2.11, 2.8], implied_no_vig: normalizeOdds([3.35, 2.11, 2.8]) },
      handicap_spf: { handicap: 1, odds: [1.31, 4.35, 7.35], implied_no_vig: normalizeOdds([1.31, 4.35, 7.35]) },
      sale_status: "普通胜平负与让球胜平负均有快照",
    },
    context: [
      "奥地利3分且净胜球领先，平局价值高于阿尔及利亚。",
      "阿尔及利亚3分但净胜球落后，后段更可能主动打开比赛。",
      "体彩普通胜平负平局隐含概率偏高，提示这场不能按奥地利稳胜处理。",
    ],
    tactical: [
      "奥地利高压、二点球和定位球仍是主要优势。",
      "阿尔及利亚需要尽早把球送到马赫雷斯、马扎、沙伊比脚下，避免后场横传被压。",
      "若60分钟后仍平，阿尔及利亚比奥地利更可能主动加速。",
    ],
    red_team: [
      "下调奥地利稳胜置信度，上调平局与阿尔及利亚一球胜尾部。",
      "总进球维持偏小基线，但末段转大尾部不能被压掉。",
    ],
  },
  {
    id: "J-R3-072",
    match_no: "周六072",
    kickoff_beijing: "2026-06-28 10:00",
    home: "约旦",
    away: "阿根廷",
    xg: { home: 0.56, away: 1.95 },
    final_1x2: { home_win: 0.106, draw: 0.224, away_win: 0.67 },
    confidence: { label: "medium-high", value: 0.65 },
    odds: {
      source_primary: "中国足彩网竞彩混合页本地快照 data/tmp_zgzcw_jcmini_20260626.html",
      source_cross_check: "500.com 竞彩页本地快照 data/tmp_500_jczq_20260626.html",
      captured_at: "2026-06-26",
      ordinary_spf: null,
      handicap_spf: { handicap: 2, odds: [2.28, 3.85, 2.32], implied_no_vig: normalizeOdds([2.28, 3.85, 2.32]) },
      sale_status: "普通胜平负未开售；仅核验到约旦+2让球胜平负",
    },
    context: [
      "阿根廷6分、净胜球+5，主要目标是控风险保头名和健康。",
      "约旦0分但仍有理论第三名通道和尊严战动机，不能按零抵抗处理。",
      "约旦+2让球盘显示阿根廷3球以上深穿并不轻松。",
    ],
    tactical: [
      "阿根廷会控球，但更可能按阶段开关压迫，而不是全场追大比分。",
      "约旦预计低位5后卫起手，反击和定位球是主要得分路径。",
      "若约旦守到50-60分钟，比赛节奏会慢；若被迫压出，阿根廷反击空间才会放大。",
    ],
    red_team: [
      "下调阿根廷3球以上大胜尾部，上调平局和1-2球小胜走廊。",
      "大小球与Top5比分都应降一档置信度，避免强队标签重复计权。",
    ],
  },
];

for (const match of matches) {
  const model = buildPoisson(match.xg.home, match.xg.away);
  match.poisson = model;
  match.handicap_probabilities = match.odds.handicap_spf
    ? handicapProbabilities(match.xg.home, match.xg.away, match.odds.handicap_spf.handicap)
    : null;
  match.brier_1x2_pre_match = null;
  match.log_loss_1x2_pre_match = null;
  match.evaluation_status = "pending_postmatch";
}

const output = {
  metadata: {
    generated_at: createdAt,
    project: "K:/worldcup",
    group: "J",
    round: 3,
    stage: "2026 FIFA World Cup group stage",
    workflow: "data_collection -> tactics -> poisson_model -> market_calibration -> red_team -> markdown/json validation",
    thread_participation: {
      data_collector: {
        thread_id: "019f0349-c122-7660-9c2c-2e8aa6f4fb1b",
        status: "partial_thread_fallback",
        note: "线程仍在收口；已使用其已核验赔率页、本地快照和主线程复核结果。",
      },
      tactics_coach: { thread_id: "019f0349-ffd7-7043-99de-4a2285fc2db3", status: "completed" },
      modeler: { thread_id: "019f034a-3dfb-7930-bb4b-26f2e139d316", status: "completed" },
      red_team: { thread_id: "019f034a-7841-70e2-9c25-41d5b1e92d60", status: "completed" },
    },
  },
  group_table_after_round2: [
    { rank: 1, team: "阿根廷", points: 6, gf: 5, ga: 0, gd: 5 },
    { rank: 2, team: "奥地利", points: 3, gf: 3, ga: 3, gd: 0 },
    { rank: 3, team: "阿尔及利亚", points: 3, gf: 2, ga: 4, gd: -2 },
    { rank: 4, team: "约旦", points: 0, gf: 2, ga: 5, gd: -3 },
  ],
  matches,
  validation_notes: [
    "Poisson矩阵按0-0到5-5输出，并保留tail_probability。",
    "1X2概率使用0-14截断网格，质量接近1；赛后Brier/Log loss字段赛前保持null。",
    "普通胜平负缺口只作为数据质量风险，不用让球盘直接改写1X2。",
  ],
};

function oddsText(odds) {
  if (!odds) return "未开售/未抓到";
  return `${odds.odds.map((item) => item.toFixed(2)).join(" / ")}；去水概率 ${odds.implied_no_vig.map((item) => pct(item)).join(" / ")}`;
}

function top5Text(top5) {
  return top5.map((item) => `${item.score} ${pct(item.probability)}`).join("；");
}

function matrixMarkdown(matrix) {
  const header = "| 主\\\\客 | 0 | 1 | 2 | 3 | 4 | 5 |\n| --- | --- | --- | --- | --- | --- | --- |";
  const rows = matrix.map((row, index) => `| ${index} | ${row.map((value) => pct(value)).join(" | ")} |`);
  return [header, ...rows].join("\n");
}

function matchMarkdown(match) {
  const p = match.poisson;
  const lines = [];
  lines.push(`# ${match.kickoff_beijing}_${match.home}_vs_${match.away}_量化预测`);
  lines.push("");
  lines.push(`- 比赛编号：${match.match_no}`);
  lines.push(`- 生成时间：${createdAt}`);
  lines.push(`- 状态：赛前预测，T-75正式首发未公布`);
  lines.push("");
  lines.push("## 核心预测表");
  lines.push("");
  lines.push("| 项目 | 预测 |");
  lines.push("| --- | --- |");
  lines.push(`| 1X2 概率 | Poisson原始：${match.home}胜 ${pct(p.raw_1x2.home_win)} / 平 ${pct(p.raw_1x2.draw)} / ${match.away}胜 ${pct(p.raw_1x2.away_win)}；校准后：${match.home}胜 ${pct(match.final_1x2.home_win)} / 平 ${pct(match.final_1x2.draw)} / ${match.away}胜 ${pct(match.final_1x2.away_win)} |`);
  lines.push(`| Top 比分 | ${top5Text(p.top5)} |`);
  lines.push(`| 进球数 | O2.5 ${pct(p.totals.over_2_5)} / U2.5 ${pct(p.totals.under_2_5)}；O3.5 ${pct(p.totals.over_3_5)} / U3.5 ${pct(p.totals.under_3_5)} |`);
  lines.push(`| BTTS | Yes ${pct(p.btts.yes)} / No ${pct(p.btts.no)} |`);
  lines.push(`| 预测 xG/进球均值 | ${match.home} ${match.xg.home.toFixed(2)} / ${match.away} ${match.xg.away.toFixed(2)} |`);
  lines.push("| Brier | null，赛后按final_calibrated_pre_match回填 |");
  lines.push("| Log loss | null，赛后按final_calibrated_pre_match回填 |");
  lines.push("");
  lines.push("## 泊松分布算式");
  lines.push("");
  lines.push(`- ${match.home}进球：X ~ Poisson(lambda=${match.xg.home.toFixed(2)})`);
  lines.push(`- ${match.away}进球：Y ~ Poisson(lambda=${match.xg.away.toFixed(2)})`);
  lines.push("- 比分概率：P(X=i,Y=j)=P(X=i)*P(Y=j)");
  lines.push("");
  lines.push("## 0-0 到 5-5 矩阵");
  lines.push("");
  lines.push(matrixMarkdown(p.score_matrix_0_5));
  lines.push("");
  lines.push(`- 0-5矩阵质量：${pct(p.score_matrix_0_5_mass, 2)}`);
  lines.push(`- 5球以上尾部：${pct(p.score_matrix_tail_probability, 2)}`);
  lines.push("");
  lines.push("## 体彩与市场校准");
  lines.push("");
  lines.push(`- 普通胜平负：${oddsText(match.odds.ordinary_spf)}`);
  lines.push(`- 让球胜平负：${match.odds.handicap_spf ? `主队${match.odds.handicap_spf.handicap >= 0 ? "+" : ""}${match.odds.handicap_spf.handicap}，${oddsText(match.odds.handicap_spf)}` : "未抓到"}`);
  lines.push(`- 销售状态：${match.odds.sale_status}`);
  lines.push("");
  lines.push("## 第三轮语境");
  lines.push("");
  match.context.forEach((item) => lines.push(`- ${item}`));
  lines.push("");
  lines.push("## 战术判断");
  lines.push("");
  match.tactical.forEach((item) => lines.push(`- ${item}`));
  lines.push("");
  lines.push("## 红队校验");
  lines.push("");
  match.red_team.forEach((item) => lines.push(`- ${item}`));
  lines.push(`- 置信度：${match.confidence.label} (${match.confidence.value.toFixed(2)})`);
  lines.push("");
  lines.push("## 数据质量标记");
  lines.push("");
  lines.push("- T-75正式首发未公布，使用首发预测与负荷判断。");
  lines.push("- 赔率为单时点快照，不代表临场最终赔率。");
  if (!match.odds.ordinary_spf) lines.push("- 普通胜平负未开售，1X2未做完整同源市场校准。");
  lines.push("");
  return lines.join("\n");
}

function summaryMarkdown(data) {
  const lines = [];
  lines.push("# J组第三轮量化预测汇总_20260626");
  lines.push("");
  lines.push(`生成时间：${createdAt}`);
  lines.push("");
  lines.push("## 预测汇总");
  lines.push("");
  lines.push("| 比赛 | 1X2校准后 | Top5比分 | 大小球 | xG | 置信度 |");
  lines.push("| --- | --- | --- | --- | --- | --- |");
  data.matches.forEach((match) => {
    lines.push(`| ${match.home} vs ${match.away} | ${match.home}胜 ${pct(match.final_1x2.home_win)} / 平 ${pct(match.final_1x2.draw)} / ${match.away}胜 ${pct(match.final_1x2.away_win)} | ${top5Text(match.poisson.top5)} | U2.5 ${pct(match.poisson.totals.under_2_5)}；U3.5 ${pct(match.poisson.totals.under_3_5)} | ${match.xg.home.toFixed(2)} / ${match.xg.away.toFixed(2)} | ${match.confidence.label} ${match.confidence.value.toFixed(2)} |`);
  });
  lines.push("");
  lines.push("## 文件与校验");
  lines.push("");
  lines.push("- JSON：data/outputs/match_predictions/j-group-round3-quant-prediction-20260626.json");
  lines.push("- 两场单场预测已分别落盘。");
  lines.push("- Brier / Log loss 赛前字段为 null，赛后回填。");
  lines.push("");
  lines.push("## 关键风险");
  lines.push("");
  lines.push("- 约旦 vs 阿根廷：阿根廷轮换和控节奏会压低深穿概率。");
  lines.push("- 阿尔及利亚 vs 奥地利：平局价值、同时开球和末段分叉会使Top比分置信度下降。");
  lines.push("- 赔率为单时点快照，临场需复核销售状态和赔率变动。");
  lines.push("");
  return lines.join("\n");
}

const jsonPath = path.join(root, "data", "outputs", "match_predictions", "j-group-round3-quant-prediction-20260626.json");
ensureDir(jsonPath);
fs.writeFileSync(jsonPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

const matchDir = path.join(root, "比赛", "未开始比赛", "小组赛", "J组");
const fileMap = [
  [matches[0], "2026-06-28_阿尔及利亚_vs_奥地利_量化预测.md"],
  [matches[1], "2026-06-28_约旦_vs_阿根廷_量化预测.md"],
];
for (const [match, fileName] of fileMap) {
  const filePath = path.join(matchDir, fileName);
  ensureDir(filePath);
  fs.writeFileSync(filePath, `${matchMarkdown(match)}\n`, "utf8");
}

const summaryPath = path.join(matchDir, "J组第三轮量化预测汇总_20260626.md");
ensureDir(summaryPath);
fs.writeFileSync(summaryPath, `${summaryMarkdown(output)}\n`, "utf8");

const threadDir = path.join(root, "data", "thread_outputs", "j-group-round3-prediction-20260626");
fs.mkdirSync(threadDir, { recursive: true });
fs.writeFileSync(path.join(threadDir, "data-collector.md"), [
  "# J组第三轮数据采集线程摘要",
  "",
  "- thread_id: 019f0349-c122-7660-9c2c-2e8aa6f4fb1b",
  "- status: partial_thread_fallback",
  "- 赛程：阿尔及利亚 vs 奥地利、约旦 vs 阿根廷，均为北京时间2026-06-28 10:00。",
  "- 赔率：周六071 SPF 3.35/2.11/2.80，RQ(+1) 1.31/4.35/7.35；周六072 SPF未开售，RQ(+2) 2.28/3.85/2.32。",
  "- 来源：中国足彩网竞彩页本地快照、500.com竞彩页本地快照。",
  "- 缺口：数据采集线程仍在收口；普通SPF缺口存在于约旦 vs 阿根廷。",
  "",
].join("\n"), "utf8");
fs.writeFileSync(path.join(threadDir, "tactics-coach.md"), [
  "# J组第三轮战术线程摘要",
  "",
  "- thread_id: 019f0349-ffd7-7043-99de-4a2285fc2db3",
  "- status: completed",
  "- 阿根廷更可能控节奏和控风险；约旦低位反击与定位球仍是主要路径。",
  "- 奥地利高压、二点球和定位球占优；阿尔及利亚需要利用马赫雷斯、马扎、沙伊比和后手提速。",
  "- xG建议已纳入：阿根廷端控场上修但受轮换限制，阿尔及利亚后段进攻弹性上修。",
  "",
].join("\n"), "utf8");
fs.writeFileSync(path.join(threadDir, "modeler.md"), [
  "# J组第三轮建模线程摘要",
  "",
  "- thread_id: 019f034a-3dfb-7930-bb4b-26f2e139d316",
  "- status: completed",
  "- 约旦 vs 阿根廷推荐xG：0.56 / 1.95。",
  "- 阿尔及利亚 vs 奥地利推荐xG：1.14 / 1.31。",
  "- 赛前Brier与Log loss字段保持null，赛后回填。",
  "",
].join("\n"), "utf8");
fs.writeFileSync(path.join(threadDir, "red-team.md"), [
  "# J组第三轮红队线程摘要",
  "",
  "- thread_id: 019f034a-7841-70e2-9c25-41d5b1e92d60",
  "- status: completed",
  "- verdict: revise",
  "- 约旦 vs 阿根廷：下调阿根廷大胜和3+球胜尾部，上调平局与1-2球小胜走廊。",
  "- 阿尔及利亚 vs 奥地利：下调奥地利稳胜置信，上调平局与阿尔及利亚一球胜尾部。",
  "- 关键缺口：T-75首发、最新赔率、约旦第三名跨组门槛。",
  "",
].join("\n"), "utf8");

console.log(JSON.stringify({
  jsonPath,
  markdown: fileMap.map(([, fileName]) => path.join(matchDir, fileName)).concat(summaryPath),
  threadDir,
}, null, 2));
