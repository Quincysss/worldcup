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

const threadDir = "data/thread_outputs/l-group-round2-postmatch-20260624";
const predictionFile = "data/outputs/match_predictions/l-group-round2-quant-prediction-20260623.json";

const sources = {
  englandFootball: {
    name: "England Football match centre",
    url: "https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2025-26/World-Cup/england-v-ghana-fifa-world-cup-tuesday-23-june-2026-match-centre",
    note: "官方赛后口径：英格兰 0-0 加纳，英格兰控球和机会占优但未转化。",
  },
  guardianRatings: {
    name: "The Guardian England 0-0 Ghana player ratings",
    url: "https://www.theguardian.com/football/2026/jun/23/england-0-0-ghana-world-cup-2026-group-l-player-ratings",
    note: "提供英格兰与加纳球员评分，用于 round2 外部评分与内部状态值校准。",
  },
  guardianPanCro: {
    name: "The Guardian Panama v Croatia live",
    url: "https://www.theguardian.com/football/live/2026/jun/23/panama-v-croatia-world-cup-2026-live-updates",
    note: "确认巴拿马 0-1 克罗地亚、Budimir 进球、克罗地亚半场换人和巴拿马被迫传中。",
  },
  foxPanCro: {
    name: "FOX Sports Panama v Croatia boxscore",
    url: "https://www.foxsports.com/soccer/fifa-world-cup-men-panama-vs-croatia-jun-23-2026-game-boxscore-647662",
    note: "交叉核验比分、阵型和巴拿马出场名单。",
  },
};

const matches = [
  {
    id: "L-R2-ENG-GHA-20260623",
    file: rel("比赛", "已完成比赛", "小组赛", "L组", "2026-06-23_英格兰_0-0_加纳_复盘.md"),
    marker: "<!-- L-R2-ENG-GHA-POSTMATCH-20260624 -->",
    title: "L组第二轮复盘：英格兰 0-0 加纳",
    date: "2026-06-23",
    kickoff_beijing: "2026-06-24",
    home: "英格兰",
    away: "加纳",
    score: "0-0",
    actual: { home: 0, away: 0 },
    prediction: {
      pick: "英格兰胜倾向",
      score: "1-0 / 2-0",
      probability: { home_win: 0.64, draw: 0.22, away_win: 0.14 },
      expected_goals: { home: 1.9, away: 0.74 },
    },
    verdict: "方向未命中，0-0 是赛前第六候选比分，说明模型识别到小比分尾部但低估了加纳中卫线和低位保护的稳定性。",
    facts: [
      "英格兰延续小组榜首位置，但与加纳同分，比赛结果是 0-0。",
      "英格兰长时间控场，Nico O'Reilly 和 Harry Kane 都有后段关键机会未把握。",
      "加纳防线尤其 Jerome Opoku、Jonas Adjetey 对禁区正面和二点保护质量很高。",
      "Reece James 早段较活跃，但与 Jordan Ayew 对抗后接受治疗，后续可用性需赛前再核。",
      "Bukayo Saka、Nico O'Reilly 替补提升边路和后点威胁，但没有转化为进球。",
    ],
    tactics: [
      "英格兰的问题不是完全没有推进，而是最后一传和禁区内触球被压缩，Kane 与 Bellingham 的接应区被加纳双中卫切断。",
      "Ghana 的防线选择了降低身后空间风险，允许英格兰在外线组织，但强力保护禁区正面和后点。",
      "Saka 替补后带来更直接的 1v1 和节奏变化，说明英格兰首发边路冲击不足是本场主要短板。",
      "加纳前场反击并非持续高产，但 Semenyo、Ayew 和 Inaki Williams 的身体对抗让英格兰后场不敢无限前压。",
    ],
    model: [
      "赛前主胜 64% 过高，主要误差来自对英格兰 xG 转化稳定性的乐观估计。",
      "赛前 Under 2.5 为 50.84%，小球方向并不弱；后续强弱盘不能自动推导大胜。",
      "对防守端评分较高、首轮已能零封弱队的非热门队，需要提高低比分平局尾部权重。",
    ],
    redTeam: [
      "不能把 0-0 简化成英格兰状态崩盘，更准确是转化失败叠加强对抗防线。",
      "Guardian 评分可作为状态迭代输入，但单一媒体评分不应直接等同模型分。",
      "Reece James 的治疗信息只标记为观察项，不写成伤停结论。",
    ],
    sources: [sources.englandFootball, sources.guardianRatings],
  },
  {
    id: "L-R2-PAN-CRO-20260623",
    file: rel("比赛", "已完成比赛", "小组赛", "L组", "2026-06-24_巴拿马_0-1_克罗地亚_复盘.md"),
    marker: "<!-- L-R2-PAN-CRO-POSTMATCH-20260624 -->",
    title: "L组第二轮复盘：巴拿马 0-1 克罗地亚",
    date: "2026-06-23",
    kickoff_beijing: "2026-06-24",
    home: "巴拿马",
    away: "克罗地亚",
    score: "0-1",
    actual: { home: 0, away: 1 },
    prediction: {
      pick: "克罗地亚胜倾向",
      score: "0-1 / 0-2",
      probability: { home_win: 0.155, draw: 0.245, away_win: 0.6 },
      expected_goals: { home: 0.76, away: 1.72 },
    },
    verdict: "方向命中，首选比分 0-1 命中；模型对克罗地亚小胜、巴拿马进攻受限的判断有效。",
    facts: [
      "克罗地亚 1-0 击败巴拿马，巴拿马两轮均以 0-1 失利后出线形势严重受损。",
      "Luka Modric 达成国家队第 200 场里程碑，并继续承担中场节奏控制。",
      "克罗地亚半场换上 Ante Budimir 与 Andrej Kramaric，Budimir 在第 54 分钟打入全场唯一进球。",
      "巴拿马后段主要依靠边路传中和定位球压迫，但中路渗透质量不足。",
      "Yoel Barcenas 因对 Modric 的身体冲撞吃到黄牌，纪律风险需更新。",
    ],
    tactics: [
      "克罗地亚用中场控球和站位封住巴拿马中路推进，主动把对手引导到低效率传中区域。",
      "半场换 Budimir 和 Kramaric 是胜负手：克罗地亚从控节奏切换到更明确的禁区终结点。",
      "Panama 的 Murillo 在边路推进和对抗上仍是亮点，但全队最后一传和禁区抢点没有形成稳定 xG。",
      "克罗地亚没有踢成大胜，说明前场压制力有限，后续面对更高强度对手仍需看终结效率。",
    ],
    model: [
      "赛前客胜 60%、首选 0-1/0-2，本场命中方向和首选比分。",
      "赛前 Under 2.5 为 54.9%，与实赛总进球 1 球一致。",
      "后续保持克罗地亚小胜模型权重，但不要因比分命中而过度上调让球穿盘能力。",
    ],
    redTeam: [
      "Guardian 和 FOX 对阵型展示存在 4-3-3/4-2-3-1 口径差异，复盘只采用战术功能描述。",
      "Budimir 进球链条可确认，但具体助攻归属需等 FIFA/官方技术报告再锁死。",
      "Panama 两场 0-1 更像进攻上限不足，不等于防守完全失控。",
    ],
    sources: [sources.guardianPanCro, sources.foxPanCro],
  },
];

const playerUpdates = {
  england: {
    file: rel("data", "outputs", "player_state", "england-player-state.json"),
    team: "英格兰",
    match: "英格兰 0-0 加纳",
    source: "Guardian player ratings + England Football match centre",
    defaultForm: 3.0,
    updates: {
      "Jordan Pickford": { rating: 5, form: 2.8, note: "零封但一次出击处理有风险，内部状态小幅下调。" },
      "Reece James": { rating: 6, form: 3.2, note: "开局活跃；与 Jordan Ayew 对抗后接受治疗，标记赛前复核。" },
      "Djed Spence": { rating: 5, form: 2.8, note: "左路推进有限，66分钟被 O'Reilly 替换。" },
      "Marc Guéhi": { rating: 6, form: 3.1, note: "中卫线整体稳定但进攻端帮助有限。" },
      "Ezri Konsa": { rating: 5, form: 2.9, note: "有关键补防，但整体出球和推进贡献有限。" },
      "Declan Rice": { rating: 7, form: 3.6, note: "上半场英格兰最稳定中场，推进和覆盖均较好。" },
      "Elliot Anderson": { rating: 5, form: 2.8, note: "控球偏慢，未能持续打穿加纳中场。" },
      "Noni Madueke": { rating: 6, form: 3.1, note: "有直接性，但最终传球质量不足。" },
      "Jude Bellingham": { rating: 6, form: 3.2, note: "第50场国家队出场，活动范围大但决定性不足。" },
      "Anthony Gordon": { rating: 4, form: 2.4, note: "边路首发冲击不够，66分钟被 Saka 替换。" },
      "Harry Kane": { rating: 6, form: 3.1, note: "上半场安静，后段错过补射机会。" },
      "Bukayo Saka": { rating: 7, form: 3.7, note: "替补后明显提升边路节奏和威胁。" },
      "Nico O'Reilly": { rating: 6, form: 3.2, note: "替补后制造后点机会，头球击中横梁/接近破门。" },
      "Morgan Rogers": { rating: 6, form: 3.1, note: "替补提供活力，样本仍短。" },
      "Eberechi Eze": { rating: 5, form: 2.8, note: "替补影响有限。" },
      "Marcus Rashford": { rating: 6, form: 3.1, note: "替补阶段参与提速，但没有终结输出。" },
    },
  },
  ghana: {
    file: rel("data", "outputs", "player_state", "ghana-player-state.json"),
    team: "加纳",
    match: "英格兰 0-0 加纳",
    source: "Guardian player ratings",
    defaultForm: 3.1,
    updates: {
      "Benjamin Asare": { rating: 6, form: 3.2, note: "零封英格兰，门线与出击整体合格。" },
      "Marvin Senaya": { rating: 6, form: 3.1, note: "右路防守稳定，限制英格兰边路传中质量。" },
      "Gideon Mensah": { rating: 7, form: 3.6, note: "左路防守质量高，处理后点压力可靠。" },
      "Jerome Opoku": { rating: 8, form: 4.2, note: "本场防线核心之一，正面封堵和禁区保护出色。" },
      "Jonas Adjetey": { rating: 8, form: 4.2, note: "与 Opoku 组成高质量中卫组合，限制 Kane。" },
      "Caleb Yirenkyi": { rating: 7, form: 3.6, note: "边路回防和对抗到位。" },
      "Thomas Partey": { rating: 7, form: 3.7, note: "中场屏障价值明显，帮助降低英格兰中路渗透。" },
      "Kwasi Sibo": { rating: 7, form: 3.5, note: "中场覆盖稳定，提升二点球争夺。" },
      "Antoine Semenyo": { rating: 7, form: 3.6, note: "前场身体对抗和反击牵制明显。" },
      "Jordan Ayew": { rating: 7, form: 3.5, note: "对抗和控球牵制有效，与 Reece James 有高强度碰撞。" },
      "Iñaki Williams": { rating: 6, form: 3.1, note: "前场牵制合格，终结机会不多。" },
      "Abdul Fatawu": { rating: 6, form: 3.1, note: "替补提供速度。" },
      "Prince Kwabena Adu": { rating: 7, form: 3.5, note: "替补后制造对 Pickford 的压力，冲击力突出。" },
      "Kojo Peprah Oppong": { rating: 6, form: 3.0, note: "短时间替补守住比赛。" },
    },
  },
  panama: {
    file: rel("data", "outputs", "player_state", "panama-player-state.json"),
    team: "巴拿马",
    match: "巴拿马 0-1 克罗地亚",
    source: "Guardian live + FOX boxscore, internal ratings",
    defaultForm: 2.7,
    updates: {
      "Orlando Mosquera": { rating: null, internal: 3.0, form: 3.0, note: "只丢一球，整体防线压力下保持比赛悬念。" },
      "Andrés Andrade": { internal: 2.9, form: 2.9, note: "三中卫体系承担较多横移压力。" },
      "José Córdoba": { internal: 2.8, form: 2.8, note: "禁区保护总体尚可，但对 Budimir 终结点限制不足。" },
      "Jiovany Ramos": { internal: 2.7, form: 2.7, note: "首发后防，76分钟附近被换下口径待官方技术报告核验。" },
      "Amir Murillo": { internal: 3.4, form: 3.4, note: "边路推进和对抗是巴拿马主要亮点。" },
      "Yoel Bárcenas": { internal: 2.5, form: 2.5, note: "吃到黄牌，纪律风险上调；进攻贡献未转化。" },
      "Carlos Harvey": { internal: 2.8, form: 2.8, note: "中场对抗积极，但中路推进质量不足。" },
      "Cristian Martínez": { internal: 2.8, form: 2.8, note: "参与中场覆盖，未能形成持续向前传递。" },
      "José Luis Rodríguez": { internal: 2.7, form: 2.7, note: "边路传中参与较多，但传中质量和禁区连接不足。" },
      "José Fajardo": { internal: 2.6, form: 2.6, note: "前场支点和射门威胁偏低。" },
      "César Blackman": { internal: 2.8, form: 2.8, note: "边翼卫往返有消耗，进攻效率一般。" },
    },
  },
  croatia: {
    file: rel("data", "outputs", "player_state", "croatia-player-state.json"),
    team: "克罗地亚",
    match: "巴拿马 0-1 克罗地亚",
    source: "Guardian live + FOX boxscore, internal ratings",
    defaultForm: 3.2,
    updates: {
      "Dominik Livakovic": { internal: 3.5, form: 3.5, note: "零封，后段处理传中和定位球保持稳定。" },
      "Josko Gvardiol": { internal: 3.1, form: 3.1, note: "首发半场被换下，未见明确伤停结论，标记赛前复核。" },
      "Marin Pongracic": { internal: 3.4, form: 3.4, note: "中卫线保持零封，对传中落点保护较稳。" },
      "Josip Sutalo": { internal: 3.4, form: 3.4, note: "中卫线保护中路，限制巴拿马禁区抢点。" },
      "Josip Stanisic": { internal: 3.8, form: 3.8, note: "参与制胜进球链条，右路攻防质量高。" },
      "Mateo Kovacic": { internal: 3.6, form: 3.6, note: "中场控节奏和抗压转移稳定。" },
      "Martin Baturina": { internal: 3.4, form: 3.4, note: "首发中场连接顺畅，但直接制造机会有限。" },
      "Luka Modric": { internal: 3.9, form: 3.9, note: "第200场国家队出场，中场节奏核心；遭 Barcenas 犯规。" },
      "Ivan Perisic": { internal: 3.3, form: 3.3, note: "边路宽度与传中威胁稳定。" },
      "Petar Musa": { internal: 2.8, form: 2.8, note: "首发中锋半场被换下，终结参与不足。" },
      "Mario Pasalic": { internal: 3.3, form: 3.3, note: "前场右侧/肋部参与制胜进球发起链条。" },
      "Ante Budimir": { internal: 4.2, form: 4.2, note: "半场替补登场，第54分钟打入制胜球。" },
      "Andrej Kramaric": { internal: 3.6, form: 3.6, note: "半场替补后提高禁区前串联和终结支援。" },
    },
  },
};

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function buildMatchMarkdown(match) {
  const sourceLines = match.sources
    .map((source) => `- ${source.name}: ${source.url}\n  - ${source.note}`)
    .join("\n");
  return `${match.marker}
# ${match.title}

phase: post_match_review
status: complete_partial_minutes
group: L组
round: 第二轮
match_id: ${match.id}
match_date_local: ${match.date}
kickoff_beijing_date: ${match.kickoff_beijing}
score: ${match.score}
updated_at: ${capturedAt}

## 赛果与赛前回测

| 项目 | 内容 |
| --- | --- |
| 实际比分 | ${match.home} ${match.score} ${match.away} |
| 赛前倾向 | ${match.prediction.pick} |
| 赛前首选比分 | ${match.prediction.score} |
| 赛前胜平负概率 | 主胜 ${match.prediction.probability.home_win} / 平 ${match.prediction.probability.draw} / 客胜 ${match.prediction.probability.away_win} |
| 赛前期望进球 | ${match.home} ${match.prediction.expected_goals.home} / ${match.away} ${match.prediction.expected_goals.away} |
| 回测结论 | ${match.verdict} |

## 事实核验

${match.facts.map((item) => `- ${item}`).join("\n")}

## 战术复盘

${match.tactics.map((item) => `- ${item}`).join("\n")}

## 模型复盘

${match.model.map((item) => `- ${item}`).join("\n")}

## 红队校验

${match.redTeam.map((item) => `- ${item}`).join("\n")}

## 成员表迭代口径

- 已在四队 \`成员表.md\` 追加第二轮赛后迭代段落。
- 已在四队 \`data/outputs/player_state/*-player-state.json\` 写入 \`round2\`、内部评分、状态值、伤停观察项。
- 本场分钟与部分助攻归属仍以赛后官方技术报告为后续修订依据。

## 来源

${sourceLines}
`;
}

function updatePlayerState(config) {
  const data = readJson(config.file);
  data.updated_at = capturedAt;
  data.player_state_update_status = "updated_round2_postmatch";
  data.round_context = `${config.match} 第二轮赛后迭代：写入 round2、内部评分、状态值与伤停观察项。`;
  data.round2_source_status = config.source;
  data.players = (data.players || []).map((player) => {
    const update = config.updates[player.english_name] || {};
    const rating = update.rating ?? update.internal ?? null;
    const form = update.form ?? player.form_status_1_5 ?? config.defaultForm;
    const availability = player.availability || {};
    return {
      ...player,
      availability: {
        ...availability,
        status: availability.status || "unknown",
        last_update: capturedAt,
        round2_note:
          update.note && update.note.includes("伤")
            ? update.note
            : "未取得赛后官方新增伤停通报；下一场赛前需复核首发、替补和伤停名单。",
      },
      round2: {
        match: config.match,
        updated_at: capturedAt,
        source_status: update.note ? "player_level_observed" : "team_level_only",
        external_rating: update.rating ?? null,
        internal_match_rating_1_5: rating,
        postmatch_form_status_1_5: form,
        injury_status_after_match: update.note && update.note.includes("治疗") ? "monitor" : "no_new_official_report",
        note: update.note || "本场未取得稳定个人级事件，保留团队层面状态迭代。",
      },
      form_status_1_5: form,
      form_status_reason: update.note || player.form_status_reason || "第二轮赛后团队层面迭代。",
    };
  });
  writeJson(config.file, data);
}

function memberAppend(teamName, filePath, matchLine, bullets) {
  const marker = `<!-- L-R2-MEMBER-UPDATE-${teamName}-20260624 -->`;
  const text = `${marker}
## L组第二轮赛后迭代：${matchLine}（2026-06-24）

${bullets.map((item) => `- ${item}`).join("\n")}

### 模型输入更新

- 状态值已同步到 \`data/outputs/player_state\` 对应 JSON 的 \`round2\` 字段。
- 伤停：暂无官方新增伤停结论；Reece James、Josko Gvardiol 等涉及治疗/半场换人的球员保留赛前复核标记。
- 下一场建模：优先读取 \`round2.internal_match_rating_1_5\`、\`round2.postmatch_form_status_1_5\` 与 \`availability.round2_note\`。
`;
  appendOnce(filePath, marker, text);
}

for (const match of matches) {
  appendOnce(match.file, match.marker, buildMatchMarkdown(match));
}

for (const config of Object.values(playerUpdates)) {
  updatePlayerState(config);
}

memberAppend("england", rel("队伍", "英格兰", "成员表.md"), "英格兰 0-0 加纳", [
  "Declan Rice、Bukayo Saka 状态上调；Anthony Gordon、Elliot Anderson 因转化和推进不足下调。",
  "Harry Kane 仍保持首发核心权重，但本场终结未兑现，下一轮不可机械按强队大胜处理。",
  "Reece James 标记观察项：比赛中接受治疗，暂不写成伤停。",
]);
memberAppend("ghana", rel("队伍", "加纳", "成员表.md"), "英格兰 0-0 加纳", [
  "Jerome Opoku、Jonas Adjetey、Thomas Partey 状态明显上调，加纳防守可信度提高。",
  "Semenyo、Jordan Ayew 保持反击牵制权重，球队平局与小比分能力上修。",
  "门将 Benjamin Asare 完成强队零封，下一轮模型需上调其稳定性输入。",
]);
memberAppend("panama", rel("队伍", "巴拿马", "成员表.md"), "巴拿马 0-1 克罗地亚", [
  "Amir Murillo 边路推进表现保留正向；前场 Fajardo、Rodriguez、Barcenas 终结效率继续下调。",
  "Yoel Barcenas 黄牌与纪律风险写入 round2 note。",
  "球队连续 0-1 说明防守未崩，但进攻上限和中路渗透能力不足。",
]);
memberAppend("croatia", rel("队伍", "克罗地亚", "成员表.md"), "巴拿马 0-1 克罗地亚", [
  "Ante Budimir 因制胜球上调，Kramaric 替补串联价值上调。",
  "Modric 第200场国家队出场仍能稳定控节奏，Kovacic、Stanisic 保持正向。",
  "Gvardiol、Musa 半场被换下：暂不写伤停结论，只保留战术/可用性复核。",
]);

const output = {
  metadata: {
    phase: "post_match_review",
    group: "L",
    round: 2,
    status: "complete_partial_minutes",
    created_at: capturedAt,
    workflow: ["collect_facts", "tactical_judgement", "model_backtest", "red_team_check", "write_files", "validate"],
    thread_outputs: {
      data_collector: `${threadDir}/data-collector.md`,
      tactics_coach: `${threadDir}/tactics-coach.md`,
      modeler: `${threadDir}/modeler.md`,
      red_team: `${threadDir}/red-team.md`,
    },
    prediction_file: predictionFile,
  },
  matches: matches.map((match) => ({
    id: match.id,
    score: match.score,
    prediction: match.prediction,
    verdict: match.verdict,
    risks: match.redTeam,
    sources: match.sources,
  })),
  player_state_files: Object.fromEntries(
    Object.entries(playerUpdates).map(([slug, config]) => [slug, path.relative(root, config.file).replace(/\\/g, "/")]),
  ),
};

const postmatchJson = rel("data", "outputs", "postmatch", "l-group-round2-postmatch-20260624.json");
writeJson(postmatchJson, output);

const statusMarker = `<!-- L-R2-POSTMATCH-STATUS-20260624-${capturedAt} -->`;
appendOnce(
  rel("线程状态.md"),
  statusMarker,
  `${statusMarker}
## L组第二轮复盘完成（${capturedAt}）

- 单场复盘：${path.relative(root, matches[0].file)}；${path.relative(root, matches[1].file)}
- 结构化输出：${path.relative(root, postmatchJson)}
- 成员表：英格兰、加纳、巴拿马、克罗地亚均在原 \`成员表.md\` 追加第二轮赛后迭代，不新增副本。
- player-state：四队 JSON 均写入 \`round2\`、状态值、伤停观察项。
- 校验：脚本写入后需执行 JSON parse 与 Markdown 存在性检查。
`,
);

for (const file of [
  postmatchJson,
  ...Object.values(playerUpdates).map((config) => config.file),
]) {
  JSON.parse(fs.readFileSync(file, "utf8"));
}

console.log(JSON.stringify({
  status: "ok",
  capturedAt,
  files: [
    path.relative(root, matches[0].file),
    path.relative(root, matches[1].file),
    path.relative(root, postmatchJson),
    ...Object.values(playerUpdates).map((config) => path.relative(root, config.file)),
  ],
}, null, 2));
