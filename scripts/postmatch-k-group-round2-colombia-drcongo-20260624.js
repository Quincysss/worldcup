const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const now = "2026-06-24T18:30:00+08:00";
const matchId = "K-R2-COL-DRC-20260624";

const paths = {
  review: "比赛/已完成比赛/小组赛/K组/2026-06-24_哥伦比亚_1-0_刚果金_复盘.md",
  postmatchJson: "data/outputs/postmatch/k-group-round2-colombia-drcongo-postmatch-20260624.json",
  colombiaState: "data/outputs/player_state/colombia-player-state.json",
  drcState: "data/outputs/player_state/dr-congo-player-state.json",
  colombiaMembers: "队伍/哥伦比亚/成员表.md",
  drcMembers: "队伍/刚果金/成员表.md",
  status: "线程状态.md",
  threadDir: "data/thread_outputs/k-group-round2-colombia-drcongo-postmatch-20260624",
};

const sources = [
  {
    name: "FOX Sports box score",
    url: "https://www.foxsports.com/soccer/fifa-world-cup-men-colombia-vs-dr-congo-jun-23-2026-game-boxscore-647663",
    captured_at: now,
    fields: ["lineups", "formations", "substitutions", "cards", "goal", "saves", "odds display"],
  },
  {
    name: "The Guardian live/report",
    url: "https://www.theguardian.com/football/live/2026/jun/24/fifa-world-cup-2026-live-colombia-v-dr-congo-updates-col-vs-cod-group-k-match-score-latest",
    captured_at: now,
    fields: ["match narrative", "shots", "shots on target", "qualification impact", "goal context"],
  },
];

const prediction = {
  source_file: "data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json",
  pre_match_pick: "哥伦比亚小胜倾向，比分 1-0 / 2-1，信心 low_medium",
  expected_goals: { colombia: 1.72, dr_congo: 0.94 },
  probabilities_1x2: { colombia_win: 0.5575, draw: 0.2379, dr_congo_win: 0.2047 },
  top_scorelines: [
    { score: "1-0", probability: 0.1203 },
    { score: "1-1", probability: 0.1131 },
    { score: "2-0", probability: 0.1035 },
    { score: "2-1", probability: 0.0973 },
    { score: "0-0", probability: 0.0699 },
  ],
  totals_probabilities: { over_2_5: 0.4965, under_2_5: 0.5035, btts_yes: 0.5003 },
  sporttery_reference: {
    competition_no: "周二048",
    ordinary_spf_odds: [1.35, 3.9, 7.6],
    ordinary_spf_implied_normalized: [0.6563, 0.2272, 0.1166],
    rqspf_handicap: -1,
    rqspf_odds: [2.22, 3.35, 2.63],
    rqspf_implied_normalized: [0.3989, 0.2644, 0.3367],
  },
};

const actual = {
  score: "哥伦比亚 1-0 刚果金",
  local_date: "2026-06-23",
  beijing_date: "2026-06-24",
  kickoff_beijing: "2026-06-24T10:00:00+08:00",
  venue: "Estadio Guadalajara / Estadio Akron, Guadalajara/Zapopan",
  goal: "76' 丹尼尔·穆尼奥斯，胡安·费尔南多·昆特罗助攻",
  formations: {
    colombia: "4-2-3-1",
    dr_congo: "5-3-2",
  },
  key_stats: {
    colombia_shots: 20,
    colombia_shots_on_target: 9,
    dr_congo_shots: 7,
    dr_congo_shots_on_target: 2,
    dr_congo_goalkeeper_saves: 6,
    dr_congo_goalkeeper_saves_conflict: "FOX key players shows Lionel Mpasi 6 saves; data-collector notes FOX play-by-play reverse count may imply 8 saves.",
    total_goals: 1,
  },
};

const colombiaUpdates = [
  ["Camilo Vargas", "卡米洛·巴尔加斯", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.5, form: 3.5, note: "零封刚果金，比赛压力主要来自零星反击和终段定位球，状态稳定。", availability: "probable" }],
  ["Jhon Lucumí", "约翰·卢库米", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 1, internal: 3.1, form: 3.2, note: "零封体系成员，但56分钟黄牌增加淘汰赛前纪律风险。", availability: "probable_card_watch" }],
  ["Davinson Sánchez", "达文森·桑切斯", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.5, form: 3.5, note: "中卫线完成零封，39分钟有射正威胁，防线推进较稳。", availability: "probable" }],
  ["Johan Mojica", "约翰·莫希卡", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.4, form: 3.4, note: "左路宽度和回防完成度合格，进攻端让路易斯·迪亚斯获得单挑空间。", availability: "probable" }],
  ["Daniel Muñoz", "丹尼尔·穆尼奥斯", { started: true, minutes: 90, goals: 1, assists: 0, yellow_cards: 0, internal: 4.5, form: 4.4, note: "76分钟前插打入制胜球，右后卫连续两轮进球，模型需上调其后点冲击和弱侧终结权重。", availability: "probable" }],
  ["Jefferson Lerma", "杰弗森·莱尔马", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 1, internal: 3.2, form: 3.2, note: "中场屏障贡献稳定，但90+4黄牌提示高对抗下纪律风险。", availability: "probable_card_watch" }],
  ["Gustavo Puerta", "古斯塔沃·普埃尔塔", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.4, form: 3.5, note: "双后腰出球和二点保护合格，延续首轮积极信号。", availability: "probable" }],
  ["Luis Díaz", "路易斯·迪亚斯", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.6, form: 3.8, note: "左路持续制造射门和牵制，但终结效率低于威胁质量。", availability: "probable" }],
  ["James Rodríguez", "哈梅斯·罗德里格斯", { started: true, minutes: 58, goals: 0, assists: 0, yellow_cards: 0, internal: 3.2, form: 3.3, note: "首发组织和定位球承担较多，58分钟被昆特罗换下，体能管理信号明显。", availability: "probable_minutes_managed" }],
  ["Jhon Arias", "约翰·阿里亚斯", { started: true, minutes: 77, goals: 0, assists: 0, yellow_cards: 0, internal: 3.2, form: 3.3, note: "右路连接和压迫参与稳定，77分钟被里奥斯换下。", availability: "probable" }],
  ["Luis Suárez", "路易斯·苏亚雷斯", { started: true, minutes: 58, goals: 0, assists: 0, yellow_cards: 0, internal: 2.9, form: 3.0, note: "首发中锋牵制有限，58分钟被科尔多瓦换下，下一场中锋位竞争加剧。", availability: "probable_role_pressure" }],
  ["Juan Fernando Quintero", "胡安·费尔南多·昆特罗", { started: false, minutes: 32, goals: 0, assists: 1, yellow_cards: 0, internal: 4.0, form: 4.0, note: "58分钟替补后送出制胜助攻，提升哥伦比亚面对低位防线时的直塞解法权重。", availability: "probable_impact_sub_or_starter" }],
  ["Jhon Córdoba", "约翰·科尔多瓦", { started: false, minutes: 32, goals: 0, assists: 0, yellow_cards: 0, internal: 3.6, form: 3.6, note: "替补登场后制造禁区身体对抗和进球前空间，支点价值上调。", availability: "probable_starter_candidate" }],
  ["Richard Ríos", "理查德·里奥斯", { started: false, minutes: 13, goals: 0, assists: 0, yellow_cards: 0, internal: 3.2, form: 3.2, note: "77分钟出场帮助收尾，状态维持。", availability: "probable" }],
];

const drcUpdates = [
  ["Lionel Mpasi", "利昂内尔·姆帕西", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 4.3, form: 4.2, note: "6次扑救让刚果金保留到最后，虽失一球仍是本队最佳；下一轮门将状态显著上调。", availability: "probable" }],
  ["Aaron Wan-Bissaka", "阿隆·万-比萨卡", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.3, form: 3.3, note: "五后卫右侧承担大量防守，进攻贡献有限。", availability: "probable" }],
  ["Chancel Mbemba", "尚塞尔·姆本巴", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.5, form: 3.5, note: "中卫核心支撑低位防线，终段也参与一次射门威胁。", availability: "probable" }],
  ["Axel Tuanzebe", "阿克塞尔·图安泽贝", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.2, form: 3.2, note: "禁区防守工作量大，整体抗压合格。", availability: "probable" }],
  ["Steve Kapuadi", "史蒂夫·卡普阿迪", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.2, form: 3.2, note: "五后卫左中卫轮转补位较多，仍被哥伦比亚弱侧插上击穿一次。", availability: "probable" }],
  ["Arthur Masuaku", "阿蒂尔·马苏亚库", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.2, form: 3.2, note: "左翼卫和定位球参与度较高，但被迫长期退守。", availability: "probable" }],
  ["Ngalayel Mukau", "恩加莱耶尔·穆考", { started: true, minutes: 45, goals: 0, assists: 0, yellow_cards: 0, internal: 2.8, form: 2.8, note: "半场被换下，刚果金中场出球受压明显。", availability: "probable_role_pressure" }],
  ["Samuel Moutoussamy", "萨穆埃尔·穆图萨米", { started: true, minutes: 82, goals: 0, assists: 0, yellow_cards: 0, internal: 2.9, form: 2.9, note: "中路覆盖消耗大，推进和反击连接不足。", availability: "probable" }],
  ["Edo Kayembe", "埃多·卡延贝", { started: true, minutes: 72, goals: 0, assists: 0, yellow_cards: 0, internal: 2.8, form: 2.8, note: "72分钟被换下，中场抗压和向前传递不足。", availability: "probable_role_pressure" }],
  ["Cedric Bakambu", "塞德里克·巴坎布", { started: true, minutes: 57, goals: 0, assists: 0, yellow_cards: 0, internal: 2.7, form: 2.8, note: "首发前锋获得支援有限，57分钟被班扎换下。", availability: "probable_role_pressure" }],
  ["Yoane Wissa", "约阿内·威萨", { started: true, minutes: 90, goals: 0, assists: 0, yellow_cards: 0, internal: 3.1, form: 3.2, note: "少量反击中仍是最有威胁前点，但整体供给不足。", availability: "probable" }],
  ["Noah Sadiki", "诺亚·萨迪基", { started: false, minutes: 45, goals: 0, assists: 0, yellow_cards: 0, internal: 3.0, form: 3.0, note: "半场登场改善中场活力，但未能改变长期被压制局面。", availability: "probable" }],
  ["Simon Banza", "西蒙·班扎", { started: false, minutes: 33, goals: 0, assists: 0, yellow_cards: 0, internal: 2.9, form: 2.9, note: "57分钟替补登场，拿球支点效果有限。", availability: "probable" }],
  ["Joris Kayembe", "约里斯·卡延贝", { started: false, minutes: 18, goals: 0, assists: 0, yellow_cards: 0, internal: 3.0, form: 3.0, note: "72分钟登场补充边路/中场机动。", availability: "probable" }],
  ["Charles Pickel", "夏尔·皮克尔", { started: false, minutes: 18, goals: 0, assists: 0, yellow_cards: 1, internal: 2.6, form: 2.7, note: "72分钟登场，FOX事件页黄牌显示存在重复/时间冲突，纪律风险保守上调。", availability: "probable_card_watch" }],
  ["Nathanael Mbuku", "纳塔纳埃尔·姆布库", { started: false, minutes: 8, goals: 0, assists: 0, yellow_cards: 0, internal: 3.3, form: 3.2, note: "82分钟登场后制造晚段射正/角球信号，可作为追分替补观察。", availability: "probable_impact_sub" }],
];

function abs(rel) {
  return path.join(ROOT, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(abs(rel), { recursive: true });
}

function readJson(rel) {
  return JSON.parse(fs.readFileSync(abs(rel), "utf8"));
}

function writeJson(rel, data) {
  ensureDir(path.dirname(rel));
  fs.writeFileSync(abs(rel), `${JSON.stringify(data, null, 2)}\n`, "utf8");
  JSON.parse(fs.readFileSync(abs(rel), "utf8"));
}

function norm(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function upsertRating(player, rating) {
  if (!Array.isArray(player.per_match_ratings)) player.per_match_ratings = [];
  player.per_match_ratings = player.per_match_ratings.filter((item) => item.match_id !== matchId);
  player.per_match_ratings.push(rating);
}

function updateTeamState(rel, updates, teamLabel) {
  const data = readJson(rel);
  if (!Array.isArray(data.players)) throw new Error(`${rel} missing players array`);
  for (const [english, chinese, u] of updates) {
    const p = data.players.find((player) => {
      const en = norm(player.english_name || player.native_name || player.name_en);
      const cn = String(player.chinese_name || player.name_cn || "");
      return en === norm(english) || cn.includes(chinese.split("·")[0]) || cn === chinese;
    });
    if (!p) {
      data.gaps_and_conflicts = data.gaps_and_conflicts || [];
      data.gaps_and_conflicts.push(`${matchId}: 未匹配到 ${teamLabel} 球员 ${chinese} / ${english}`);
      continue;
    }
    p.world_cup_2026_minutes = Number(p.world_cup_2026_minutes || 0) + u.minutes;
    p.world_cup_2026_starts = Number(p.world_cup_2026_starts || 0) + (u.started ? 1 : 0);
    p.goals = Number(p.goals || 0) + u.goals;
    p.assists = Number(p.assists || 0) + u.assists;
    p.yellow_cards = Number(p.yellow_cards || 0) + u.yellow_cards;
    p.red_cards = Number(p.red_cards || 0);
    p.form_status_1_5 = u.form;
    p.form_status_reason = u.note;
    p.form_status_captured_at = now;
    p.availability_status = u.availability;
    p.injury_status = p.injury_status || "healthy";
    p.injury_status_note = "本场赛后未见可靠新增伤停公开确认；下一轮赛前仍需复核官方名单。";
    p.round2_match_update = {
      match_id: matchId,
      opponent: teamLabel === "哥伦比亚" ? "刚果金" : "哥伦比亚",
      result: teamLabel === "哥伦比亚" ? "1-0 win" : "0-1 loss",
      started: u.started,
      minutes: u.minutes,
      goals: u.goals,
      assists: u.assists,
      yellow_cards: u.yellow_cards,
      red_cards: 0,
      rating: null,
      rating_source_status: "external_rating_not_collected_same_source",
      internal_match_rating_1_5: u.internal,
      postmatch_form_status_1_5: u.form,
      event_note: u.note,
      captured_at: now,
      sources: sources.map((source) => source.url),
    };
    upsertRating(p, {
      match_id: matchId,
      source: "project_internal_postmatch_model",
      rating: u.internal,
      note: u.note,
      captured_at: now,
    });
  }
  data.updated_at = now;
  data.player_state_update_status = "updated_round2_colombia_1_0_dr_congo";
  data.round2_match_update = {
    match_id: matchId,
    match: actual.score,
    captured_at: now,
    source_status: "FOX_Guardian_cross_checked_partial_player_ratings",
    rating_policy: "external same-source ratings not available; internal 1-5 ratings derived from minutes, role, events, and verified match narrative.",
  };
  writeJson(rel, data);
}

function appendOnce(rel, marker, content) {
  let text = fs.existsSync(abs(rel)) ? fs.readFileSync(abs(rel), "utf8") : "";
  if (!text.includes(marker)) {
    text = `${text.trimEnd()}\n\n${marker}\n${content.trim()}\n`;
    fs.writeFileSync(abs(rel), text, "utf8");
  }
}

const reviewMd = `---
phase: postmatch_review
group: K
round: 2
match_id: ${matchId}
status: complete_thread_backed
created_at: ${now}
updated_at: ${now}
---

# K组第二轮复盘：哥伦比亚 1-0 刚果金

## 结论

哥伦比亚赢球方向、低比分方向、1-0比分都与赛前模型命中；但比赛过程显示“赢球不等于穿盘”，20次射门、9次射正只换来1球，主要被姆帕西的高扑救表现和刚果金五后卫密集防线压低了比分。

## 赛事实况

| 项目 | 内容 |
| --- | --- |
| 比赛 | 哥伦比亚 1-0 刚果金 |
| 日期 | 当地 2026-06-23；北京时间 2026-06-24 |
| 场地 | Estadio Guadalajara / Estadio Akron |
| 阵型 | 哥伦比亚 4-2-3-1；刚果金 5-3-2 |
| 进球 | 76' 丹尼尔·穆尼奥斯，胡安·费尔南多·昆特罗助攻 |
| 关键统计 | 哥伦比亚20射9正；刚果金7射2正；姆帕西6次扑救（FOX关键球员卡），事件流反推可能为8次，按源冲突保守记录；总进球1 |
| 出线影响 | 哥伦比亚提前进入淘汰赛/32强，末轮战葡萄牙打平即可锁定小组第一；刚果金末轮需要击败乌兹别克斯坦争取出线主动权。 |

## 赛前预测回测

| 维度 | 赛前模型 | 实际 | 回测 |
| --- | --- | --- | --- |
| 胜平负 | 哥伦比亚胜 55.75% | 哥伦比亚胜 | 命中 |
| 比分 | 1-0 / 2-1，Top1为1-0 12.03% | 1-0 | 精确命中 |
| 大小球 | 小2.5 50.35%，优势极薄 | 1球，小2.5 | 命中但不应高信心 |
| 让球 | 哥伦比亚-1胜面约39.89%，提示赢球强于穿盘 | -1走/不穿深盘 | 命中风险提示 |
| BTTS | 是 50.03%，接近五五开 | 否 | 未命中边缘项 |

## 战术复盘

哥伦比亚的优势不是控球叙事本身，而是持续把球推进到刚果金五后卫身后和禁区弱侧。詹姆斯首发负责前场节奏，但58分钟昆特罗和科尔多瓦同时登场后，哥伦比亚的解题方式更直接：科尔多瓦用身体对抗吸住中卫，昆特罗用直塞打穿肋部，穆尼奥斯从右后卫位置插入完成终结。

刚果金的防守纪律和姆帕西的扑救把比赛拖成了低比分。问题是反击出口太少，巴坎布、威萨长期拿不到舒服的第一落点，中场在压力下难以连续向前。这个结构能偷分，但如果先丢球，追分手段仍偏薄。

## 球员状态更新摘要

哥伦比亚上调穆尼奥斯、昆特罗、科尔多瓦；维持路易斯·迪亚斯高威胁但下调终结效率；卢库米、莱尔马因黄牌进入纪律观察。刚果金上调姆帕西，维持姆本巴/后卫线抗压值，前场巴坎布和中场出球链路略降。

## 模型修正

- 对哥伦比亚：右后卫弱侧前插不是偶发，下一轮对葡萄牙需单独建“穆尼奥斯后点/二线终结”因子。
- 对刚果金：门将扑救高光不能直接转化为防守强度上调；应拆分为门将状态上调、整体防线被射门质量压制不变。
- 对投注/竞彩：本场再次证明强队普通胜和让胜不能合并判断。哥伦比亚普通胜命中，但-1穿盘没有足够优势。

## 风险与缺口

- FOX事件页黄牌信息存在重复/时间显示冲突，皮克尔黄牌按“纪律风险保守上调”处理。
- FOX关键球员卡显示姆帕西6次扑救，但事实线程按事件流反推可能为8次；复盘采用6次作为可见卡片值，保留冲突。
- 未取得可靠同源逐人外部评分，成员表和 player_state 使用项目内部1-5评分。
- 20射9正只进1球既有门将因素，也有终结质量问题；不可简单解读为哥伦比亚进攻低迷。

## 来源

- FOX Sports box score: https://www.foxsports.com/soccer/fifa-world-cup-men-colombia-vs-dr-congo-jun-23-2026-game-boxscore-647663
- The Guardian live/report: https://www.theguardian.com/football/live/2026/jun/24/fifa-world-cup-2026-live-colombia-v-dr-congo-updates-col-vs-cod-group-k-match-score-latest
`;

const postmatchJson = {
  metadata: {
    phase: "postmatch_review",
    group: "K",
    round: 2,
    match_id: matchId,
    created_at: now,
    workflow: ["collect_facts", "tactical_judgement", "model_backtest", "red_team_check", "write_files", "validate"],
    role_thread_outputs: {
      data_collector: `${paths.threadDir}/data-collector.md`,
      tactics_coach: `${paths.threadDir}/tactics-coach.md`,
      modeler: `${paths.threadDir}/modeler.md`,
      red_team: `${paths.threadDir}/red-team.md`,
    },
  },
  actual,
  prediction_backtest: {
    prediction,
    verdict: {
      win_draw_loss: "hit",
      exact_score: "hit",
      under_2_5: "hit_low_edge",
      handicap_minus_1: "risk_warning_hit",
      btts: "miss_edge_case",
    },
  },
  tactical_summary: {
    colombia: "58分钟后由昆特罗直塞、科尔多瓦支点和穆尼奥斯弱侧前插解决低位防线。",
    dr_congo: "五后卫和门将高扑救把比分压低，但反击出球链路不足。",
  },
  player_state_updates: {
    colombia_updated_players: colombiaUpdates.map(([english, chinese]) => ({ english, chinese })),
    dr_congo_updated_players: drcUpdates.map(([english, chinese]) => ({ english, chinese })),
  },
  red_team_notes: [
    "不要把1-0误读为哥伦比亚进攻弱，射门量和射正量显示压制真实存在。",
    "不要把姆帕西高扑救直接外推为刚果金整体防守提升。",
    "让球与普通胜继续分离建模。",
    "黄牌事件存在源冲突，需赛前再查官方停赛。",
    "姆帕西扑救数存在6次与事件流反推8次冲突，模型只使用方向性门将高光信号。",
  ],
  sources,
};

ensureDir("比赛/已完成比赛/小组赛/K组");
ensureDir("data/outputs/postmatch");
ensureDir(paths.threadDir);
fs.writeFileSync(abs(paths.review), reviewMd, "utf8");
writeJson(paths.postmatchJson, postmatchJson);
updateTeamState(paths.colombiaState, colombiaUpdates, "哥伦比亚");
updateTeamState(paths.drcState, drcUpdates, "刚果金");

appendOnce(
  paths.colombiaMembers,
  "<!-- K-R2-MEMBER-UPDATE-colombia-20260624 -->",
  `## K组第二轮赛后成员表迭代：哥伦比亚 1-0 刚果金

- updated_at: ${now}
- 直接更新原则：本节为原成员表增量迭代，不新建 dated 成员表副本。
- 关键上调：丹尼尔·穆尼奥斯 form 4.4，胡安·费尔南多·昆特罗 form 4.0，约翰·科尔多瓦 form 3.6。
- 纪律观察：约翰·卢库米、杰弗森·莱尔马本场吃黄，下一轮赛前复核停赛/累计黄牌。
- 模型输入：哥伦比亚“右后卫弱侧前插终结”和“替补创造力”权重上调；中锋首发竞争重新打开。`
);

appendOnce(
  paths.drcMembers,
  "<!-- K-R2-MEMBER-UPDATE-drcongo-20260624 -->",
  `## K组第二轮赛后成员表迭代：哥伦比亚 1-0 刚果金

- updated_at: ${now}
- 直接更新原则：本节为原成员表增量迭代，不新建 dated 成员表副本。
- 关键上调：利昂内尔·姆帕西 form 4.2，6次扑救是刚果金保持悬念的主要原因。
- 结构性下调：巴坎布和中场出球链路轻微下调，反击第一传和前场支点质量不足。
- 纪律观察：夏尔·皮克尔黄牌信息存在源冲突，按保守纪律风险记录，末轮赛前必须复核官方牌表。`
);

appendOnce(
  paths.status,
  "<!-- K-R2-COL-DRC-POSTMATCH-20260624 -->",
  `- ${now} K组第二轮 哥伦比亚1-0刚果金复盘已落地；更新单场复盘、postmatch JSON、哥伦比亚/刚果金 player_state JSON、两队成员表.md；子线程输出目录：${paths.threadDir}。`
);

console.log(JSON.stringify({
  ok: true,
  files: paths,
}, null, 2));
