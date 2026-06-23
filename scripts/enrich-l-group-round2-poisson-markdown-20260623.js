const fs = require("fs");
const path = require("path");

const root = process.cwd();
const jsonPath = path.join(root, "data", "outputs", "match_predictions", "l-group-round2-quant-prediction-20260623.json");
const groupDir = path.join(root, "比赛", "未开始比赛", "小组赛", "L组");
const summaryFile = path.join(groupDir, "L组第二轮量化预测汇总_20260623.md");
const matchFiles = {
  "L-R2-ENG-GHA-20260623": path.join(groupDir, "2026-06-24_英格兰_vs_加纳_量化预测_20260623.md"),
  "L-R2-PAN-CRO-20260623": path.join(groupDir, "2026-06-24_巴拿马_vs_克罗地亚_量化预测_20260623.md"),
};
const modelerFile = path.join(root, "data", "thread_outputs", "l-group-round2-recalc-20260623", "modeler.md");
const statusFile = path.join(root, "线程状态.md");

const doc = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

function pct(n) {
  return `${(n * 100).toFixed(2)}%`;
}

function tableMatrix(matrix) {
  const header = "| 主队进球\\客队进球 | 0 | 1 | 2 | 3 | 4 | 5 |";
  const sep = "|---|---:|---:|---:|---:|---:|---:|";
  const rows = matrix.map((row, i) => `| ${i} | ${row.map(pct).join(" | ")} |`);
  return [header, sep, ...rows].join("\n");
}

function scorelines(items) {
  return items.map((item) => `${item.score} ${pct(item.probability)}`).join("；");
}

function matchBlock(match) {
  const m = match.poisson_score_matrix;
  return `<!-- POISSON-DETAILS:START -->
## 泊松分布模型明细
- 模型版本：${doc.model_version}
- 入模 xG：${match.expected_goals.home.toFixed(2)} - ${match.expected_goals.away.toFixed(2)}
- 泊松原始胜平负：主胜 ${pct(match.probabilities_1x2.home_win)} / 平 ${pct(match.probabilities_1x2.draw)} / 客胜 ${pct(match.probabilities_1x2.away_win)}
- 赔率与红队校准后：主胜 ${pct(match.final_probabilities.home_win)} / 平 ${pct(match.final_probabilities.draw)} / 客胜 ${pct(match.final_probabilities.away_win)}
- Top 比分：${scorelines(match.top_scorelines.slice(0, 8))}
- 矩阵说明：下表为 0-5 球比分概率，行是主队进球，列是客队进球。

${tableMatrix(m.rows_home_goals_cols_away_goals)}

- 0-5 球矩阵外尾部概率：${pct(m.tail_probability_outside_0_to_5)}
<!-- POISSON-DETAILS:END -->`;
}

function summaryBlock(matches) {
  const rows = matches.map((match) => {
    const top3 = scorelines(match.top_scorelines.slice(0, 3));
    return `| ${match.match_cn} | ${match.expected_goals.home.toFixed(2)}-${match.expected_goals.away.toFixed(2)} | ${pct(match.probabilities_1x2.home_win)} / ${pct(match.probabilities_1x2.draw)} / ${pct(match.probabilities_1x2.away_win)} | ${pct(match.final_probabilities.home_win)} / ${pct(match.final_probabilities.draw)} / ${pct(match.final_probabilities.away_win)} | ${top3} |`;
  });
  return `<!-- POISSON-SUMMARY:START -->
## 泊松分布模型摘要
| 比赛 | xG | 泊松原始胜/平/负 | 校准后胜/平/负 | Top 3 比分 |
|---|---:|---:|---:|---|
${rows.join("\n")}

说明：泊松层负责由 xG 生成比分分布；竞彩赔率只作为后续校准层，红队门控负责投注冻结，不替代泊松基线。
<!-- POISSON-SUMMARY:END -->`;
}

function upsert(content, start, end, block) {
  const s = content.indexOf(start);
  const e = content.indexOf(end);
  if (s !== -1 && e !== -1 && e > s) {
    return `${content.slice(0, s)}${block}${content.slice(e + end.length)}`;
  }
  return `${content.trimEnd()}\n\n${block}\n`;
}

for (const match of doc.matches) {
  const file = matchFiles[match.match_id];
  if (!file) throw new Error(`No match file mapped for ${match.match_id}`);
  const body = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, upsert(body, "<!-- POISSON-DETAILS:START -->", "<!-- POISSON-DETAILS:END -->", matchBlock(match)), "utf8");
}

const summaryBody = fs.readFileSync(summaryFile, "utf8");
const summary = summaryBlock(doc.matches);
fs.writeFileSync(summaryFile, upsert(summaryBody, "<!-- POISSON-SUMMARY:START -->", "<!-- POISSON-SUMMARY:END -->", summary), "utf8");

const modelerBody = fs.readFileSync(modelerFile, "utf8");
fs.writeFileSync(modelerFile, upsert(modelerBody, "<!-- POISSON-SUMMARY:START -->", "<!-- POISSON-SUMMARY:END -->", summary), "utf8");

for (const file of [...Object.values(matchFiles), summaryFile, modelerFile]) {
  const body = fs.readFileSync(file, "utf8");
  if (!body.includes("泊松分布模型") || !body.includes("Top")) {
    throw new Error(`Poisson markdown validation failed: ${file}`);
  }
}

const statusAppend = `\n## 2026-06-23 L组第二轮泊松模型呈现补齐\n- action: enrich_poisson_markdown_from_existing_json\n- json_source: data/outputs/match_predictions/l-group-round2-quant-prediction-20260623.json\n- files: 比赛/未开始比赛/小组赛/L组/*_20260623.md; data/thread_outputs/l-group-round2-recalc-20260623/modeler.md\n- validation: poisson_markdown_blocks_ok; status_tail_verified\n`;
fs.appendFileSync(statusFile, statusAppend, "utf8");
const tail = fs.readFileSync(statusFile, "utf8").slice(-1000);
if (!tail.includes("L组第二轮泊松模型呈现补齐") || !tail.includes("status_tail_verified")) {
  throw new Error("Status tail validation failed");
}

console.log(JSON.stringify({
  ok: true,
  enriched: [...Object.values(matchFiles), summaryFile, modelerFile].map((file) => path.relative(root, file)),
  status_tail_verified: true,
}, null, 2));
