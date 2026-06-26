const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const rel = (...parts) => path.join(root, ...parts);
const capturedAt =
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .replace(" ", "T") + "+08:00";

const match = {
  id: "K-R2-POR-UZB-20260623",
  group: "K",
  round: 2,
  date: "2026-06-23",
  kickoff_beijing: "2026-06-24T01:00:00+08:00",
  venue: "Houston Stadium / NRG Stadium",
  home_team: "葡萄牙",
  away_team: "乌兹别克斯坦",
  score: "5-0",
  result: { portugal: 5, uzbekistan: 0 },
};

const sources = [
  {
    name: "FIFA match report",
    url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/portugal-uzbekistan-match-report-highlights",
    note: "确认葡萄牙5-0、C罗梅开二度和比赛报告框架。",
  },
  {
    name: "The Guardian match report",
    url: "https://www.theguardian.com/football/2026/jun/23/portugal-uzbekistan-world-cup-group-k-match-report",
    note: "用于进球链、战术细节、定位球与C罗纪录描述。",
  },
  {
    name: "VAVEL live report",
    url: "https://www.vavel.com/en-us/soccer/2026/06/23/1264145-portugal-vs-uzbekistan-live-score-2026-fifa-world-cup.html",
    note: "确认比分、首发、终场和第86分钟莱奥进球链。",
  },
  {
    name: "AP syndicated report",
    url: "https://www.bigrapidsnews.com/sports/article/portugal-sticks-with-ronaldo-against-uzbekistan-22316960.php",
    note: "交叉验证5-0、C罗双响、Nematov乌龙归属。",
  },
];

const goals = [
  {
    minute: 6,
    team: "葡萄牙",
    scorer: "Cristiano Ronaldo",
    scorer_cn: "克里斯蒂亚诺·罗纳尔多",
    assist_or_source: "Joao Cancelo byline cutback",
    source_status: "confirmed_multi_source",
  },
  {
    minute: 17,
    team: "葡萄牙",
    scorer: "Nuno Mendes",
    scorer_cn: "努诺·门德斯",
    assist_or_source: "direct free kick after Pedro Neto drew foul",
    source_status: "confirmed_multi_source",
  },
  {
    minute: 39,
    team: "葡萄牙",
    scorer: "Cristiano Ronaldo",
    scorer_cn: "克里斯蒂亚诺·罗纳尔多",
    assist_or_source: "Bruno Fernandes through ball",
    source_status: "confirmed_multi_source",
  },
  {
    minute: 60,
    team: "葡萄牙",
    scorer: "Own goal",
    scorer_cn: "乌龙球",
    assist_or_source: "Bruno Fernandes low corner; Nematov/Khusanov touch sequence",
    source_status: "confirmed_goal_conflicting_own_goal_attribution",
  },
  {
    minute: 86,
    team: "葡萄牙",
    scorer: "Rafael Leao",
    scorer_cn: "拉斐尔·莱奥",
    assist_or_source: "Nelson Semedo low cross after Bruno Fernandes pass",
    source_status: "confirmed_multi_source",
  },
];

const predicted = {
  source_file: "data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json",
  parse_status: "invalid_json_in_local_file",
  pre_match_pick: "葡萄牙胜",
  pre_match_score: "1-0 / 2-0",
  expected_goals: { portugal: 1.92, uzbekistan: 0.72 },
  home_win_probability: 0.655,
  under_2_5_probability: 0.5084,
  handicap_note: "赛前对葡萄牙-2/-2.25穿盘保持谨慎",
};

const backtest = {
  winner_direction: "hit",
  exact_score: "miss",
  total_goals: "miss_over_2_5_actual",
  handicap_direction: "miss_portugal_covered_minus_2",
  btts: "hit_no",
  main_errors: [
    "强弱差场景下，Poisson尾部被压缩，4球以上大胜概率不足。",
    "赛前模型保留了乌兹别克斯坦反击进球尾部，但实战中其推进和二点球都被压住。",
    "葡萄牙定位球设计、领先后继续压迫、替补边路冲击没有被充分联动到大小球和让球模块。",
    "竞彩/近同源市场强烈支持葡萄牙时，模型只轻度吸收，导致主胜概率与大胜路径偏保守。",
  ],
  parameter_updates: [
    "加入强队领先后持续压制放大项。",
    "当市场主胜去水概率超过80%且模型仅65%左右时，触发非线性校准复核。",
    "重标4+净胜尾部分布，尤其是边路强队对低位弱队。",
    "让球、大小球与胜负强信号增强联动，避免机械低比分锚定。",
  ],
};

const tactical = [
  "葡萄牙开局就把比赛打成两翼牵引加禁区内终结：坎塞洛的底线回敲、佩德罗·内托造任意球、门德斯直接任意球，连续把乌兹别克斯坦防线拉到横向失衡。",
  "布鲁诺·费尔南德斯是中场真空的最大利用者：第三球送出纵向传递，第四球低平角球制造乌龙，第五球前也参与右路转移。",
  "乌兹别克斯坦低位并没有真正形成第一落点保护，门将和中卫在定位球/低平球处理上连续出错，导致比分从可控输球坠入崩盘。",
  "葡萄牙没有在2-0后降速，而是继续用C罗的禁区威胁牵制中卫，再用莱奥和塞梅多补强边路冲击。",
  "这场不能简单理解成C罗个人复苏，真正决定比赛下限的是定位球质量、边后卫宽度和布鲁诺的二次组织。",
];

const redTeam = [
  "不要因为5-0就把葡萄牙后续所有深盘都视为可穿；乌兹别克斯坦的门将/中卫事故有样本偶然性。",
  "C罗双响提升终结可信度，但面对更强中卫线时，葡萄牙是否继续牺牲前场压迫强度仍要单独评估。",
  "乌龙归属在可访问媒体之间有细节差异，成员表只写事件影响，不把争议归因写死为单一球员重大失误。",
  "本场赛前预测方向正确但让球和大小球失误，不能用赛后比分反向抹掉赛前信息缺口。",
];

const portugalUpdates = {
  "Diogo Costa": { started: true, clean_sheet: true, goals: 0, assists: 0, rating: 3.6, form: 3.6, note: "首发零封，后场压力低于首轮。" },
  "Joao Cancelo": { aliases: ["João Cancelo"], started: true, goals: 0, assists: 1, rating: 4.1, form: 4.0, note: "右路底线回敲制造C罗首球，宽度和插上质量突出。" },
  "Ruben Dias": { aliases: ["Rúben Dias"], started: true, clean_sheet: true, rating: 3.6, form: 3.5, note: "首发零封，防线组织稳定。" },
  "Renato Veiga": { started: true, clean_sheet: true, rating: 3.5, form: 3.5, note: "首发零封，低风险推进。" },
  "Nuno Mendes": { started: true, goals: 1, assists: 0, rating: 4.4, form: 4.2, note: "直接任意球破门，左路控制和定位球执行是关键优势。" },
  "Joao Neves": { aliases: ["João Neves"], started: true, rating: 3.7, form: 3.7, note: "中场控制顺畅，帮助球队压住反击第一波。" },
  Vitinha: { started: true, rating: 3.7, form: 3.7, note: "控球节奏稳定，支持高位围攻。" },
  "Bruno Fernandes": { started: true, goals: 0, assists: 2, rating: 4.5, form: 4.3, note: "纵向传递、低平角球和右路转移均制造进球链。" },
  "Joao Felix": { aliases: ["João Félix"], started: true, rating: 3.4, form: 3.4, note: "前场轮转参与度尚可，直接事件较少。" },
  "Cristiano Ronaldo": { started: true, goals: 2, assists: 0, rating: 4.8, form: 4.6, note: "上半场双响，打破本届进球荒并刷新世界杯连续届数进球纪录。" },
  "Pedro Neto": { started: true, goals: 0, assists: 0, rating: 3.8, form: 3.7, note: "制造第二球任意球，边路压迫和持球牵制有效。" },
  "Rafael Leao": { aliases: ["Rafael Leão"], started: false, goals: 1, assists: 0, rating: 4.2, form: 4.0, note: "替补/后段冲击收获第五球，适合继续作为提速牌。" },
  "Nelson Semedo": { aliases: ["Nélson Semedo"], started: false, goals: 0, assists: 1, rating: 3.7, form: 3.6, note: "后段右路低平传中参与莱奥进球链。" },
};

const uzbekistanUpdates = {
  "Abduvohid Nematov": { started: null, goals_against: 5, own_goal_conflict: true, rating: 1.5, form: 1.7, note: "多源确认门前乌龙/触球归属存在细节冲突；门线和低平球处理负面。" },
  "Abdukodir Khusanov": { started: null, own_goal_conflict: true, rating: 1.8, form: 1.9, note: "第四球触球链存在冲突归因；防线横移和禁区保护压力极大。" },
  "Odiljon Hamrobekov": { started: null, rating: 2.0, form: 2.1, note: "对Pedro Neto犯规送出危险任意球，随后被Nuno Mendes破门。" },
  "Eldor Shomurodov": { started: null, rating: 2.2, form: 2.2, note: "前场支点和反击连接被葡萄牙压制，缺少稳定射门服务。" },
  "Jaloliddin Masharipov": { started: null, rating: 2.2, form: 2.2, note: "推进被限制，未能持续把球队带出低位。" },
};

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function writeText(filePath, text) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, text.replace(/\n/g, "\r\n"), "utf8");
}

function appendOnce(filePath, marker, text) {
  const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  if (current.includes(marker)) return false;
  fs.writeFileSync(filePath, current.replace(/\s*$/, "\n\n") + text.replace(/\n/g, "\r\n") + "\r\n", "utf8");
  return true;
}

function findUpdate(englishName, updates) {
  if (updates[englishName]) return updates[englishName];
  return Object.values(updates).find((update) => update.aliases && update.aliases.includes(englishName));
}

function updatePlayerState(filePath, teamName, updates, teamDefault) {
  const data = readJson(filePath);
  data.updated_at = capturedAt;
  data.player_state_update_status = "updated_round2_postmatch_partial_ratings";
  data.round_context = `${teamName} K组第二轮 ${match.home_team} ${match.score} ${match.away_team}；已同步单场事件、内部评分、状态值、伤停/可用性缺口。`;
  data.postmatch_source_log_round2 = sources;
  data.players = data.players.map((player) => {
    const update = findUpdate(player.english_name, updates);
    const existingAvailability = player.availability || {};
    const round2 = {
      match: `${match.home_team} ${match.score} ${match.away_team}`,
      date: match.date,
      source_status: update ? "event_verified_minutes_partial" : "team_level_only_minutes_unverified",
      started: update ? update.started ?? null : null,
      minutes: null,
      goals: update?.goals ?? 0,
      assists: update?.assists ?? 0,
      yellow_cards: 0,
      red_cards: 0,
      clean_sheet: Boolean(update?.clean_sheet),
      goals_against: update?.goals_against ?? null,
      own_goal_conflict: Boolean(update?.own_goal_conflict),
      external_rating: null,
      rating_source_status: "coverage_incomplete",
      internal_match_rating_1_5: update?.rating ?? null,
      postmatch_form_status_1_5: update?.form ?? player.form_status_1_5 ?? teamDefault.form,
      internal_rating_reason: update?.note ?? teamDefault.note,
      injury_status_after_match: existingAvailability.status || "unknown",
      injury_note_after_match: "未取得赛后官方伤停通报；下一场赛前需T-75首发与伤停再核验。",
      updated_at: capturedAt,
    };
    return {
      ...player,
      availability: {
        ...existingAvailability,
        status: existingAvailability.status || "unknown",
        last_update: capturedAt,
        round2_note: "赛后未发现可稳定引用的新增伤停通报；保留赛前可用性并等待下一场官方名单。",
      },
      round2,
      form_status_1_5: update?.form ?? player.form_status_1_5 ?? teamDefault.form,
      form_status_reason: update?.note ?? player.form_status_reason ?? teamDefault.note,
    };
  });
  writeJson(filePath, data);
}

const postmatchJson = {
  metadata: {
    phase: "post_match_review",
    status: "complete_partial_minutes",
    created_at: capturedAt,
    workflow: [
      "collect_facts",
      "tactical_judgement",
      "model_backtest",
      "red_team_check",
      "write_files",
      "validate",
    ],
    role_thread_outputs: {
      data_collector: "data/thread_outputs/k-group-round2-portugal-uzbekistan-postmatch-20260624/data-collector.md",
      tactics_coach: "data/thread_outputs/k-group-round2-portugal-uzbekistan-postmatch-20260624/tactics-coach.md",
      modeler: "data/thread_outputs/k-group-round2-portugal-uzbekistan-postmatch-20260624/modeler.md",
      red_team: "data/thread_outputs/k-group-round2-portugal-uzbekistan-postmatch-20260624/red-team.md",
    },
  },
  match,
  sources,
  goals,
  predicted,
  backtest,
  tactical,
  red_team: redTeam,
  player_state_updates: {
    portugal: Object.keys(portugalUpdates),
    uzbekistan: Object.keys(uzbekistanUpdates),
    status: "canonical_player_state_and_member_table_updated; full official minute/player rating feed still missing",
  },
};

const report = `# 葡萄牙 5-0 乌兹别克斯坦复盘

phase: post_match_review
status: complete_partial_minutes
updated_at: ${capturedAt}
group: K组
round: 第二轮
match_id: ${match.id}
player_state_update_status: updated_round2_postmatch_partial_ratings

## 结论

葡萄牙这场不是普通赢球，而是把赛前“强队方向”打成了“深盘和大球全穿”的比赛。赛前模型判断葡萄牙胜是对的，但比分锚定在 1-0/2-0 明显偏保守，低估了领先后继续压制、定位球设计和乌兹别克斯坦禁区事故的连锁效应。

## 比赛事实

| 项目 | 内容 |
| --- | --- |
| 比分 | 葡萄牙 5-0 乌兹别克斯坦 |
| 时间 | 2026-06-23；北京时间 2026-06-24 01:00 |
| 地点 | Houston Stadium / NRG Stadium |
| 赛果影响 | 葡萄牙4分；乌兹别克斯坦两连败，出线压力极高 |
| 来源状态 | 比分和主要进球链已多源确认；乌龙归属在 Nematov/Khusanov 细节上存在媒体差异 |

## 进球链

| 分钟 | 进球 | 关键来源 |
| --- | --- | --- |
| 6' | C罗 | 坎塞洛右路到底线后回敲，C罗近距离完成终结 |
| 17' | 努诺·门德斯 | 佩德罗·内托造禁区前任意球，门德斯直接破门 |
| 39' | C罗 | 布鲁诺利用中场空当送出纵向球，C罗斜线完成第二球 |
| 60' | 乌龙球 | 布鲁诺低平角球制造混乱，Nematov/Khusanov 触球链待官方技术统计统一 |
| 86' | 拉斐尔·莱奥 | 布鲁诺转移，塞梅多右路低平球，莱奥完成第五球 |

## 战术复盘

${tactical.map((item) => `- ${item}`).join("\n")}

## 赛前模型回测

| 模块 | 赛前判断 | 赛后结果 | 复盘 |
| --- | --- | --- | --- |
| 胜平负 | 葡萄牙胜，约65.5% | 葡萄牙胜 | 方向正确，但概率偏低 |
| 比分 | 1-0 / 2-0 | 5-0 | 精确比分失败，尾部大胜概率过低 |
| 大小球 | 小球略占优 | 大球 | 低估定位球和领先后持续压制 |
| 让球 | -2/-2.25谨慎 | 葡萄牙穿深盘 | 对市场强信号吸收不足 |
| BTTS | 否倾向 | 否 | 这一项正确 |

## 模型修正

${backtest.parameter_updates.map((item) => `- ${item}`).join("\n")}

## 球员状态迭代摘要

| 球队 | 上调/下调重点 | 说明 |
| --- | --- | --- |
| 葡萄牙 | C罗、布鲁诺、努诺·门德斯、坎塞洛、莱奥上调 | 进球、定位球、边路和二次组织全部兑现 |
| 乌兹别克斯坦 | Nematov/Khusanov防线链条、Hamrobekov下调 | 低位防守、门前处理和危险区域犯规连续失分 |

已直接迭代：

- data/outputs/player_state/portugal-player-state.json
- data/outputs/player_state/uzbekistan-player-state.json
- 队伍/葡萄牙/成员表.md
- 队伍/乌兹别克斯坦/成员表.md

## 红队校验

${redTeam.map((item) => `- ${item}`).join("\n")}

## 数据缺口

- 未取得官方完整技术统计包、全员分钟和同源球员外部评分，内部评分只作为项目模型输入，不等同媒体评分。
- 乌龙球最终归属需以后续 FIFA/官方技术统计为准，当前只在模型里记作“门将-中卫门前处理共同负面事件”。
- 赛前预测 JSON 本地文件存在解析失败问题，本次另存了有效 postmatch JSON。

## source_log

${sources.map((source) => `- ${source.name}: ${source.url} | ${source.note}`).join("\n")}
`;

const portugalMemberSection = `## K组第二轮赛后迭代：葡萄牙 5-0 乌兹别克斯坦（2026-06-24）

| 球员 | 本场事件 | 内部分 | 状态值 | 伤停/可用性 |
| --- | --- | --- | --- | --- |
| 克里斯蒂亚诺·罗纳尔多 | 2球，禁区牵制恢复，刷新世界杯连续届数进球纪录 | 4.8 | 4.6 | 未见新增官方伤停 |
| 布鲁诺·费尔南德斯 | 纵向传递、低平角球、第五球前转移，核心组织点 | 4.5 | 4.3 | 未见新增官方伤停 |
| 努诺·门德斯 | 任意球破门，左路压制明显 | 4.4 | 4.2 | 未见新增官方伤停 |
| 若昂·坎塞洛 | 右路底线回敲制造首球 | 4.1 | 4.0 | 未见新增官方伤停 |
| 拉斐尔·莱奥 | 后段进球，替补冲击价值上升 | 4.2 | 4.0 | 未见新增官方伤停 |
| 迪奥戈·科斯塔/鲁本·迪亚斯/雷纳托·韦加 | 零封，防线压力低于首轮 | 3.5-3.6 | 3.5-3.6 | 未见新增官方伤停 |

模型备注：葡萄牙强队尾部大胜参数上修；后续遇到低位弱队时，边路宽度、定位球和领先后持续压制需要联动大小球/让球模块。
`;

const uzbekistanMemberSection = `## K组第二轮赛后迭代：葡萄牙 5-0 乌兹别克斯坦（2026-06-24）

| 球员 | 本场事件 | 内部分 | 状态值 | 伤停/可用性 |
| --- | --- | --- | --- | --- |
| 阿布杜沃希德·内马托夫 | 失5球；乌龙归属在多源之间存在细节冲突 | 1.5 | 1.7 | 未见新增官方伤停 |
| 阿卜杜科迪尔·胡萨诺夫 | 第四球触球链/禁区保护负面，官方归属待复核 | 1.8 | 1.9 | 未见新增官方伤停 |
| 奥迪尔琼·哈姆罗别科夫 | 禁区前犯规送出任意球，随后被破门 | 2.0 | 2.1 | 未见新增官方伤停 |
| 埃尔多尔·绍穆罗多夫 | 前场支点被压制，反击服务不足 | 2.2 | 2.2 | 未见新增官方伤停 |
| 贾洛利丁·马沙里波夫 | 推进受限，难以持续带队出低位 | 2.2 | 2.2 | 未见新增官方伤停 |

模型备注：乌兹别克斯坦防线抗压、低平球处理、定位球防守参数下修；下一场需优先核验门将选择和中卫搭档是否调整。
`;

const postmatchFile = rel("比赛", "已完成比赛", "小组赛", "K组", "2026-06-23_葡萄牙_5-0_乌兹别克斯坦_复盘.md");
const postmatchJsonFile = rel("data", "outputs", "postmatch", "k-group-round2-portugal-uzbekistan-postmatch-20260624.json");

writeText(postmatchFile, report);
writeJson(postmatchJsonFile, postmatchJson);

updatePlayerState(rel("data", "outputs", "player_state", "portugal-player-state.json"), "葡萄牙", portugalUpdates, {
  form: 3,
  note: "团队层面5-0大胜，未核验到个人出场事件；状态值暂不机械上调。",
});
updatePlayerState(rel("data", "outputs", "player_state", "uzbekistan-player-state.json"), "乌兹别克斯坦", uzbekistanUpdates, {
  form: 2,
  note: "团队层面0-5失利，未核验到个人出场事件；下一场需复核首发和伤停。",
});

const portugalMemberFile = rel("队伍", "葡萄牙", "成员表.md");
const uzbekistanMemberFile = rel("队伍", "乌兹别克斯坦", "成员表.md");
appendOnce(portugalMemberFile, "K组第二轮赛后迭代：葡萄牙 5-0 乌兹别克斯坦", portugalMemberSection);
appendOnce(uzbekistanMemberFile, "K组第二轮赛后迭代：葡萄牙 5-0 乌兹别克斯坦", uzbekistanMemberSection);

const statusEntry = `\n- ${capturedAt} | K组第二轮 | 葡萄牙 5-0 乌兹别克斯坦复盘完成；单场复盘、postmatch JSON、葡萄牙/乌兹别克斯坦 player_state 与成员表已迭代；赛前预测 JSON 解析失败已记录为输入质量问题；乌龙归属等待官方技术统计最终统一。`;
appendOnce(rel("线程状态.md"), "葡萄牙 5-0 乌兹别克斯坦复盘完成", statusEntry);

JSON.parse(fs.readFileSync(postmatchJsonFile, "utf8"));
JSON.parse(fs.readFileSync(rel("data", "outputs", "player_state", "portugal-player-state.json"), "utf8"));
JSON.parse(fs.readFileSync(rel("data", "outputs", "player_state", "uzbekistan-player-state.json"), "utf8"));

console.log(JSON.stringify({
  ok: true,
  files: {
    report: postmatchFile,
    json: postmatchJsonFile,
    portugal_player_state: rel("data", "outputs", "player_state", "portugal-player-state.json"),
    uzbekistan_player_state: rel("data", "outputs", "player_state", "uzbekistan-player-state.json"),
    portugal_member_table: portugalMemberFile,
    uzbekistan_member_table: uzbekistanMemberFile,
    status: rel("线程状态.md"),
  },
}, null, 2));
