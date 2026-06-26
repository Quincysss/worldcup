const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const createdAt = "2026-06-26T22:50:00+08:00";
const captureAt = "2026-06-26T17:43:00+08:00";

function ensureDir(p) {
  fs.mkdirSync(path.join(ROOT, p), { recursive: true });
}

function poisson(lambda, k) {
  let p = Math.exp(-lambda);
  for (let i = 1; i <= k; i += 1) p *= lambda / i;
  return p;
}

function pct(x, digits = 1) {
  return `${(x * 100).toFixed(digits)}%`;
}

function implied(odds) {
  if (!odds) return null;
  const raw = odds.map((o) => 1 / o);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => v / sum);
}

function poissonModel(homeXg, awayXg) {
  const max = 14;
  const scoreMatrix = [];
  const top = [];
  const totals = { over25: 0, under25: 0, over35: 0, under35: 0 };
  const oneXtwo = { home: 0, draw: 0, away: 0 };
  let bttsYes = 0;
  const handicap = { plus2Home: 0, plus2Draw: 0, plus2Away: 0 };

  for (let h = 0; h <= max; h += 1) {
    const row = [];
    for (let a = 0; a <= max; a += 1) {
      const p = poisson(homeXg, h) * poisson(awayXg, a);
      row.push(p);
      if (h > a) oneXtwo.home += p;
      else if (h === a) oneXtwo.draw += p;
      else oneXtwo.away += p;
      if (h + a > 2.5) totals.over25 += p;
      else totals.under25 += p;
      if (h + a > 3.5) totals.over35 += p;
      else totals.under35 += p;
      if (h > 0 && a > 0) bttsYes += p;
      if (a - h <= 1) handicap.plus2Home += p;
      else if (a - h === 2) handicap.plus2Draw += p;
      else handicap.plus2Away += p;
      if (h <= 5 && a <= 5) top.push({ score: `${h}-${a}`, probability: p });
    }
    scoreMatrix.push(row);
  }

  top.sort((a, b) => b.probability - a.probability);
  return {
    expected_goals: { home: homeXg, away: awayXg },
    poisson_raw_1x2: oneXtwo,
    totals,
    btts: { yes: bttsYes, no: 1 - bttsYes },
    handicap_plus2_from_home_view: handicap,
    top_scorelines: top.slice(0, 5),
    score_matrix_0_5: scoreMatrix.slice(0, 6).map((row) => row.slice(0, 6)),
  };
}

function blend(model, market, weightModel = 0.7) {
  if (!market) return model;
  return model.map((v, i) => v * weightModel + market[i] * (1 - weightModel));
}

const matches = [
  {
    id: "L-R3-CRO-GHA-20260627",
    group: "L组",
    round: "第三轮",
    match: "克罗地亚 vs 加纳",
    home: "克罗地亚",
    away: "加纳",
    fixture_note: "中国足彩网竞彩编号周六067，页面字段 22:40 / 05:00；数据采集线程核到 FIFA 口径为 2026-06-27 17:00 ET，即北京时间 2026-06-28 05:00。竞彩编号不等同 FIFA Match ID。",
    xg: [1.28, 0.78],
    odds: {
      source: "中国足彩网竞彩混合页",
      url: "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
      captured_at: captureAt,
      match_no: "周六067",
      spf: { odds: [1.6, 3.05, 5.65], labels: ["克罗地亚胜", "平", "加纳胜"] },
      rq_spf: { handicap: "克罗地亚 -1", odds: [2.92, 3.35, 2.05], labels: ["让胜", "让平", "让负"] },
      sale_status: "普通胜平负与让球胜平负均显示可售",
    },
    tactical_pick: "克罗地亚小优，但主预测落在一球差和平局走廊。",
    red_team_note: "加纳打平即可锁前二，低位防守和反击尾部不能被克罗地亚经验叙事吞掉。",
    confidence: "medium_low",
  },
  {
    id: "L-R3-PAN-ENG-20260627",
    group: "L组",
    round: "第三轮",
    match: "巴拿马 vs 英格兰",
    home: "巴拿马",
    away: "英格兰",
    fixture_note: "中国足彩网竞彩编号周六068，页面字段 22:40 / 05:00；数据采集线程核到 FIFA 口径为 2026-06-27 17:00 ET，即北京时间 2026-06-28 05:00。竞彩编号不等同 FIFA Match ID。",
    xg: [0.5, 1.75],
    odds: {
      source: "中国足彩网竞彩混合页",
      url: "https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini",
      captured_at: captureAt,
      match_no: "周六068",
      spf: null,
      rq_spf: { handicap: "巴拿马 +2", odds: [2.48, 3.9, 2.13], labels: ["让胜", "让平", "让负"] },
      sale_status: "普通胜平负显示未开售；让球胜平负显示可售",
    },
    tactical_pick: "英格兰胜面最大，但不是自动大胜；低比分英胜和下半场打开并存。",
    red_team_note: "英格兰第二轮 0-0 证明控场不等于稳定破密防，+2 让球盘的深胜信号只做校准，不直接吞掉小球尾部。",
    confidence: "medium",
  },
];

for (const m of matches) {
  const model = poissonModel(m.xg[0], m.xg[1]);
  const marketSpf = implied(m.odds.spf && m.odds.spf.odds);
  const raw = [model.poisson_raw_1x2.home, model.poisson_raw_1x2.draw, model.poisson_raw_1x2.away];
  const calibrated = blend(raw, marketSpf, 0.7);
  m.model = {
    ...model,
    market_implied_spf: marketSpf
      ? { home: marketSpf[0], draw: marketSpf[1], away: marketSpf[2] }
      : null,
    market_implied_rq_spf: implied(m.odds.rq_spf && m.odds.rq_spf.odds),
    final_calibrated_1x2: { home: calibrated[0], draw: calibrated[1], away: calibrated[2] },
    brier_1x2_pre_match: null,
    log_loss_1x2_pre_match: null,
    evaluation_status: "pending_postmatch",
  };
}

const threadDir = "data/thread_outputs/l-group-round3-prediction-20260626";
const outputDir = "data/outputs/match_predictions";
const matchDir = "比赛/未开始比赛/小组赛/L组";
ensureDir(threadDir);
ensureDir(outputDir);
ensureDir(matchDir);

const threadOutputs = {
  "data-collector.md": `# L组第三轮数据采集线程摘要

- 状态：主线程已抓取中国足彩网竞彩页；原数据采集子线程超时，若后续返回新增事实需再修订。
- 抓取时间：${captureAt}
- 周六067 克罗地亚 vs 加纳：SPF 1.60 / 3.05 / 5.65；RQ(-1) 2.92 / 3.35 / 2.05。
- 周六068 巴拿马 vs 英格兰：普通 SPF 未开售；RQ(+2) 2.48 / 3.90 / 2.13。
- FIFA 口径开球：两场均为 2026-06-27 17:00 ET，即北京时间 2026-06-28 05:00；注意竞彩编号周六067/068不等同 FIFA Match ID。
- 本地 player_state JSON：英格兰、加纳、巴拿马、克罗地亚四队均可解析；更新时间多为 2026-06-24T09:54:21+08:00。
- 数据缺口：T75 正式首发不可提前获得；加纳 Ati-Zigi/Partey、英格兰 Rice/Saka/Reece James、克罗地亚老将负荷、巴拿马阵型冒险程度需赛前复核。
`,
  "tactics-coach.md": `# L组第三轮战术线程摘要

- 克罗地亚 vs 加纳：克罗地亚控球与二次进攻占优，但加纳更可能先低位保平；若 55-65 分钟仍平，克罗地亚换上更直接前场点后比赛会打开。
- 加纳的主要威胁来自 Semenyo/Jordan Ayew 等转换冲击，阵地战机会数不高。
- 巴拿马 vs 英格兰：巴拿马必须主动，但高质量中路创造不足；英格兰更适合先控风险，再利用巴拿马后段前压后的转换空间。
- 英格兰破低位仍有疑问，边锋一对一与换人后手比纯控球更关键。
`,
  "modeler.md": `# L组第三轮模型线程摘要

- 克罗地亚 vs 加纳建议 xG：1.28 / 0.78；Poisson raw 1X2：${pct(matches[0].model.poisson_raw_1x2.home)} / ${pct(matches[0].model.poisson_raw_1x2.draw)} / ${pct(matches[0].model.poisson_raw_1x2.away)}。
- 巴拿马 vs 英格兰基础建议 xG：0.50 / 1.58；主线程结合体彩 +2 让球深胜信号和巴拿马必须冒险，校准为 0.50 / 1.75。
- 赛前 Brier / Log loss 统一保留 null，赛后回填。
`,
  "red-team.md": `# L组第三轮红队线程摘要

- 结论：revise_for_probability / hold_for_betting。
- 英格兰仍是组内最强，但不是自动大胜；第二轮 0-0 后必须保留低比分尾部。
- 克罗地亚小优成立，但加纳低位质量、身体对抗和反击纵深强于巴拿马，不能写成稳胜。
- 同时开球最大分叉在 60-75 分钟，固定泊松会低估后段脚本突变。
`,
};

for (const [file, content] of Object.entries(threadOutputs)) {
  fs.writeFileSync(path.join(ROOT, threadDir, file), content, "utf8");
}

function matchMarkdown(m) {
  const p = m.model;
  const top = p.top_scorelines.map((s) => `${s.score} ${pct(s.probability, 2)}`).join(" / ");
  const spfOdds = m.odds.spf
    ? `${m.odds.spf.odds.join(" / ")}，去水位 ${pct(p.market_implied_spf.home)} / ${pct(p.market_implied_spf.draw)} / ${pct(p.market_implied_spf.away)}`
    : "普通胜平负未开售";
  const rqImp = p.market_implied_rq_spf;
  const rqOdds = `${m.odds.rq_spf.handicap}：${m.odds.rq_spf.odds.join(" / ")}，去水位 ${pct(rqImp[0])} / ${pct(rqImp[1])} / ${pct(rqImp[2])}`;
  return `<!-- ${m.id} -->
# ${m.group}第三轮预测：${m.match}

phase: pre_match_prediction
status: complete
group: ${m.group}
round: ${m.round}
match_id: ${m.id}
updated_at: ${createdAt}

## 预测表

| 项目 | 预测 |
| --- | --- |
| 1X2 概率 | ${m.home}胜 ${pct(p.final_calibrated_1x2.home)} / 平 ${pct(p.final_calibrated_1x2.draw)} / ${m.away}胜 ${pct(p.final_calibrated_1x2.away)} |
| Poisson raw 1X2 | ${pct(p.poisson_raw_1x2.home)} / ${pct(p.poisson_raw_1x2.draw)} / ${pct(p.poisson_raw_1x2.away)} |
| Top5 比分 | ${top} |
| 进球数 | 大2.5 ${pct(p.totals.over25)} / 小2.5 ${pct(p.totals.under25)}；大3.5 ${pct(p.totals.over35)} / 小3.5 ${pct(p.totals.under35)} |
| BTTS | 是 ${pct(p.btts.yes)} / 否 ${pct(p.btts.no)} |
| 预测 xG/进球均值 | ${m.home} ${m.xg[0].toFixed(2)} / ${m.away} ${m.xg[1].toFixed(2)} |
| Brier | 赛前不可计算，赛后回填 null |
| Log loss | 赛前不可计算，赛后回填 null |
| 主结论 | ${m.tactical_pick} |
| 置信度 | ${m.confidence} |

## 赔率与校准

- 竞彩来源：${m.fixture_note}
- 普通胜平负：${spfOdds}
- 让球胜平负：${rqOdds}
- 校准原则：普通胜平负用于 1X2 收缩，让球胜平负只校准净胜球分布；本场不让赔率覆盖第二轮复盘得到的低比分尾部。

## 第三轮动机

- 英格兰 4 分、加纳 4 分、克罗地亚 3 分、巴拿马 0 分。
- 英格兰与加纳打平即可基本锁住前二；克罗地亚赢球最稳，平局要看另一场和第三名比较；巴拿马前二路径已断，只剩理论第三名路径。
- 两场同时开球，60-75 分钟会受另一场比分强烈影响，因此固定泊松只代表赛前均值，不代表全场脚本线性展开。

## 战术判断

- ${m.tactical_pick}
- ${m.red_team_note}
- 首发使用预测口径，不写成 T75 正式首发；T75 正式名单需赛前一小时复核。

## 风险

- 中国足彩网页面时间字段包含 22:40 / 05:00；本次按数据采集线程核到的 FIFA 17:00 ET / 北京时间 05:00 作为开球口径。
- 成员状态文件存在部分 availability=unknown 字段，第三轮前需继续核验伤停、负荷和停赛。
- 若赛前正式首发显示强队大轮换，xG 与 Top5 比分需要重算。
`;
}

fs.writeFileSync(
  path.join(ROOT, matchDir, "2026-06-28_克罗地亚_vs_加纳_量化预测.md"),
  matchMarkdown(matches[0]),
  "utf8",
);
fs.writeFileSync(
  path.join(ROOT, matchDir, "2026-06-28_巴拿马_vs_英格兰_量化预测.md"),
  matchMarkdown(matches[1]),
  "utf8",
);

const summary = `# L组第三轮量化预测汇总

updated_at: ${createdAt}

| 比赛 | 主结论 | 1X2 概率 | Top5比分 | 大小球 |
| --- | --- | --- | --- | --- |
${matches.map((m) => {
  const p = m.model;
  return `| ${m.match} | ${m.tactical_pick} | ${pct(p.final_calibrated_1x2.home)} / ${pct(p.final_calibrated_1x2.draw)} / ${pct(p.final_calibrated_1x2.away)} | ${p.top_scorelines.map((s) => `${s.score} ${pct(s.probability, 2)}`).join("；")} | 小2.5 ${pct(p.totals.under25)}；小3.5 ${pct(p.totals.under35)} |`;
}).join("\n")}

## 文件

- data/outputs/match_predictions/l-group-round3-quant-prediction-20260626.json
- 比赛/未开始比赛/小组赛/L组/2026-06-28_克罗地亚_vs_加纳_量化预测.md
- 比赛/未开始比赛/小组赛/L组/2026-06-28_巴拿马_vs_英格兰_量化预测.md

## 线程参与

- 数据采集：data/thread_outputs/l-group-round3-prediction-20260626/data-collector.md
- 战术教练：data/thread_outputs/l-group-round3-prediction-20260626/tactics-coach.md
- 数据建模：data/thread_outputs/l-group-round3-prediction-20260626/modeler.md
- 红队校验：data/thread_outputs/l-group-round3-prediction-20260626/red-team.md
`;

fs.writeFileSync(path.join(ROOT, matchDir, "L组第三轮量化预测汇总_20260626.md"), summary, "utf8");

const json = {
  metadata: {
    phase: "pre_match_prediction",
    group: "L",
    round: 3,
    status: "complete",
    created_at: createdAt,
    workflow: ["collect_facts", "tactical_judgement", "model_probability", "red_team_check", "write_files", "validate"],
    thread_outputs: {
      data_collector: `${threadDir}/data-collector.md`,
      tactics_coach: `${threadDir}/tactics-coach.md`,
      modeler: `${threadDir}/modeler.md`,
      red_team: `${threadDir}/red-team.md`,
    },
    note: "Historical role threads were unavailable in this Codex App surface; native subagents were used and a data collector timeout was recorded.",
    data_quality_flags: [
      "cp_spf_partial: 巴拿马 vs 英格兰普通胜平负在中国足彩网快照中未开售",
      "odds_single_snapshot: 赔率只抓了单时点，未追踪盘口波动",
      "official_standings_parse_limited: FIFA standings 页面片段不稳定，积分以赛果复算为主",
      "lineup_rotation_uncertain: 四队第三轮均存在轮换/负荷不确定",
      "gha_keeper_doubtful: Ati-Zigi 疑似伤病点未完全消除",
      "pan_carrasquilla_start_uncertain: Carrasquilla 首发/出场仍需临场确认",
      "no_confirmed_postmatch_injuries: 四队未见明确新增伤停/停赛官方确认",
    ],
  },
  group_table_after_round2: [
    { team: "英格兰", points: 4, gf: 4, ga: 2, gd: 2 },
    { team: "加纳", points: 4, gf: 1, ga: 0, gd: 1 },
    { team: "克罗地亚", points: 3, gf: 3, ga: 4, gd: -1 },
    { team: "巴拿马", points: 0, gf: 0, ga: 2, gd: -2 },
  ],
  matches,
};

fs.writeFileSync(path.join(ROOT, outputDir, "l-group-round3-quant-prediction-20260626.json"), JSON.stringify(json, null, 2), "utf8");

console.log("generated L group round3 prediction files");
