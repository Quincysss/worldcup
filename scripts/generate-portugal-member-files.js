const fs = require("fs");
const path = require("path");

const root = "E:\\worldcup";
const capturedAt = "2026-06-21T00:12:00+08:00";

const sources = {
  transfermarkt: {
    source: "Transfermarkt Portugal detailed squad 2026",
    url: "https://www.transfermarkt.com/portugal/kader/verein/3300",
    captured_at: capturedAt,
    reliability_tier: 4,
  },
  fourFourTwo: {
    source: "FourFourTwo Portugal World Cup 2026 squad",
    url: "https://www.fourfourtwo.com/team/portugal-world-cup-2026-squad",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
  guardianReport: {
    source: "The Guardian match report: Portugal 1-1 DR Congo",
    url: "https://www.theguardian.com/football/2026/jun/17/portugal-dr-congo-world-cup-2026-group-k-match-report",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
  guardianLive: {
    source: "The Guardian live: Portugal 1-1 DR Congo",
    url: "https://www.theguardian.com/football/live/2026/jun/17/portugal-v-dr-congo-world-cup-2026-live",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
  axios: {
    source: "Axios Houston: Congo stuns Portugal in 1-1 draw",
    url: "https://www.axios.com/local/houston/2026/06/17/portugal-congo-world-cup-houston",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
};

const clubs = {
  "FC Porto": ["波尔图", "Primeira Liga", "葡萄牙超级联赛", "葡萄牙"],
  "Sporting CP": ["葡萄牙体育", "Primeira Liga", "葡萄牙超级联赛", "葡萄牙"],
  "Wolverhampton Wanderers": ["狼队", "Premier League", "英格兰超级联赛", "英格兰"],
  "Manchester City": ["曼城", "Premier League", "英格兰超级联赛", "英格兰"],
  "SL Benfica": ["本菲卡", "Primeira Liga", "葡萄牙超级联赛", "葡萄牙"],
  "Villarreal CF": ["比利亚雷亚尔", "LaLiga", "西班牙甲级联赛", "西班牙"],
  "Paris Saint-Germain": ["巴黎圣日耳曼", "Ligue 1", "法国甲级联赛", "法国"],
  "Manchester United": ["曼联", "Premier League", "英格兰超级联赛", "英格兰"],
  "FC Barcelona": ["巴塞罗那", "LaLiga", "西班牙甲级联赛", "西班牙"],
  Fenerbahce: ["费内巴切", "Super Lig", "土耳其超级联赛", "土耳其"],
  "Al-Hilal SFC": ["利雅得新月", "Saudi Pro League", "沙特职业联赛", "沙特阿拉伯"],
  "RCD Mallorca": ["马略卡", "LaLiga", "西班牙甲级联赛", "西班牙"],
  "AC Milan": ["AC米兰", "Serie A", "意大利甲级联赛", "意大利"],
  "Real Sociedad": ["皇家社会", "LaLiga", "西班牙甲级联赛", "西班牙"],
  "Chelsea FC": ["切尔西", "Premier League", "英格兰超级联赛", "英格兰"],
  "Juventus FC": ["尤文图斯", "Serie A", "意大利甲级联赛", "意大利"],
  "Al-Nassr FC": ["利雅得胜利", "Saudi Pro League", "沙特职业联赛", "沙特阿拉伯"],
  Genclerbirligi: ["根克勒比利吉", "Turkish football", "土耳其足球联赛", "土耳其"],
};

const players = [
  ["迪奥戈·科斯塔", "Diogo Costa", 1, 26, "门将", "GK", "首发门将", "右脚", 186, 81, "FC Porto", "€40.00m"],
  ["鲁伊·席尔瓦", "Rui Silva", 22, 32, "门将", "GK", "替补门将", "右脚", 191, 91, "Sporting CP", "€7.00m"],
  ["若泽·萨", "José Sá", 12, 33, "门将", "GK", "替补门将", "右脚", 192, 84, "Wolverhampton Wanderers", "€3.50m"],
  ["鲁本·迪亚斯", "Rúben Dias", 3, 29, "中后卫", "CB", "核心中卫/防线领袖", "右脚", 187, 82, "Manchester City", "€55.00m"],
  ["贡萨洛·伊纳西奥", "Gonçalo Inácio", 14, 24, "中后卫", "CB/LB", "轮换中卫/左脚出球点", "左脚", 186, 81, "Sporting CP", "€40.00m"],
  ["托马斯·阿劳若", "Tomás Araújo", 4, 24, "中后卫", "CB", "首轮首发中卫", "右脚", 187, 80, "SL Benfica", "€30.00m"],
  ["雷纳托·韦加", "Renato Veiga", 13, 22, "中后卫", "CB/LB/DM", "首轮首发中卫/多面手", "左脚", 190, 86, "Villarreal CF", "€25.00m"],
  ["努诺·门德斯", "Nuno Mendes", 25, 24, "左后卫", "LB/LWB", "主力左路推进点", "左脚", 176, 70, "Paris Saint-Germain", "€80.00m"],
  ["马特乌斯·努内斯", "Matheus Nunes", 6, 27, "右后卫", "RB/CM", "后场/中场轮换", "右脚", 183, 74, "Manchester City", "€50.00m"],
  ["迪奥戈·达洛特", "Diogo Dalot", 5, 27, "右后卫", "RB/LB", "边后卫轮换", "右脚", 184, 76, "Manchester United", "€30.00m"],
  ["若昂·坎塞洛", "João Cancelo", 20, 32, "右后卫", "RB/LB", "首发边后卫/内收组织", "右脚", 182, 74, "FC Barcelona", "€8.00m"],
  ["内尔松·塞梅多", "Nélson Semedo", 2, 32, "右后卫", "RB", "替补边后卫", "右脚", 177, 67, "Fenerbahce", "€6.00m"],
  ["维蒂尼亚", "Vitinha", 23, 26, "防守型中场", "DM/CM", "中场节奏核心", "右脚", 172, 64, "Paris Saint-Germain", "€140.00m"],
  ["鲁本·内维斯", "Rúben Neves", 21, 29, "防守型中场", "DM/CM", "替补后腰/长传与定位球", "右脚", 180, 80, "Al-Hilal SFC", "€25.00m"],
  ["萨穆·科斯塔", "Samú Costa", 24, 25, "防守型中场", "DM/CM", "防守型轮换", "右脚", 183, 75, "RCD Mallorca", "€15.00m"],
  ["若昂·内维斯", "João Neves", 15, 21, "中前卫", "CM/DM", "首轮进球中场/高强度连接", "右脚", 174, 66, "Paris Saint-Germain", "€140.00m"],
  ["弗朗西斯科·特林康", "Francisco Trincão", 16, 26, "攻击型中场", "AM/RW", "前场轮换", "左脚", 184, 78, "Sporting CP", "€40.00m"],
  ["布鲁诺·费尔南德斯", "Bruno Fernandes", 8, 31, "攻击型中场", "AM/CM", "核心创造者/定位球", "右脚", 179, 69, "Manchester United", "€35.00m"],
  ["贝尔纳多·席尔瓦", "Bernardo Silva", 10, 31, "攻击型中场", "AM/RW/CM", "首发连接点", "左脚", 173, 64, "Manchester City", "€22.00m"],
  ["拉斐尔·莱奥", "Rafael Leão", 17, 27, "左边锋", "LW/ST", "替补爆点/纵深", "右脚", 188, 81, "AC Milan", "€50.00m"],
  ["贡萨洛·格德斯", "Gonçalo Guedes", 19, 29, "左边锋", "LW/ST", "前场深度", "右脚", 179, 68, "Real Sociedad", "€6.00m"],
  ["佩德罗·内托", "Pedro Neto", 18, 26, "右边锋", "RW/LW", "首轮首发边锋/助攻者", "左脚", 172, 62, "Chelsea FC", "€60.00m"],
  ["弗朗西斯科·孔塞桑", "Francisco Conceição", 26, 23, "右边锋", "RW", "替补突破手", "左脚", 170, 64, "Juventus FC", "€30.00m"],
  ["若昂·菲利克斯", "João Félix", 11, 26, "影子前锋", "SS/LW/AM", "前场轮换", "右脚", 181, 70, "Al-Nassr FC", "€28.00m"],
  ["贡萨洛·拉莫斯", "Gonçalo Ramos", 9, 25, "中锋", "CF", "替补中锋", "右脚", 185, 79, "Paris Saint-Germain", "€30.00m"],
  ["克里斯蒂亚诺·罗纳尔多", "Cristiano Ronaldo", 7, 41, "中锋", "CF", "队长/禁区终结", "右脚", 187, 83, "Al-Nassr FC", "€10.00m"],
];

const round1 = {
  "Diogo Costa": { started: true, minutes: 90, goals_against: 1 },
  "João Cancelo": { started: true, minutes: 90 },
  "Tomás Araújo": { started: true, minutes: 90, yellow_cards: 1 },
  "Renato Veiga": { started: true, minutes: 90 },
  "Nuno Mendes": { started: true, minutes: 72, subbed_off_minute: 72 },
  Vitinha: { started: true, minutes: 83, subbed_off_minute: 83 },
  "João Neves": { started: true, minutes: 90, goals: 1 },
  "Bernardo Silva": { started: true, minutes: 45, subbed_off_minute: 46 },
  "Bruno Fernandes": { started: true, minutes: 90 },
  "Pedro Neto": { started: true, minutes: 72, assists: 1, subbed_off_minute: 72 },
  "Cristiano Ronaldo": { started: true, minutes: 90 },
  "Francisco Conceição": { started: false, minutes: 45, subbed_on_minute: 46 },
  "Rafael Leão": { started: false, minutes: 18, subbed_on_minute: 72 },
  "Nélson Semedo": { started: false, minutes: 18, subbed_on_minute: 72 },
  "Gonçalo Ramos": { started: false, minutes: 7, subbed_on_minute: 83 },
};

function logFor(fields, extra = []) {
  return [
    { ...sources.transfermarkt, supports_fields: ["squad_number", "age", "club", "market_value", "primary_position", ...fields] },
    { ...sources.fourFourTwo, supports_fields: ["squad_context", "coach", "squad_selection", ...extra] },
  ];
}

function formStatus(player, usage) {
  if (player[1] === "João Neves") return [4, "首轮第6分钟头球破门，状态上调；仍需复核完整评分。"];
  if (player[1] === "Pedro Neto") return [3.5, "首轮首发并送出助攻，但下半场被换下，保持偏正面。"];
  if (player[1] === "Cristiano Ronaldo") return [2.5, "首轮踢满但影响力有限，多家赛后报道指出参与度和压迫问题。"];
  if (player[1] === "Rúben Dias") return [2, "Guardian赛前记录其因伤缺席首发，但替补名单口径存在冲突，需赛前复核。"];
  if (usage?.started) return [3, "首轮首发，球队1-1未能扩大优势；无同源评分，维持中性。"];
  if ((usage?.minutes || 0) > 0) return [3, "首轮替补登场，角色明确但时间有限。"];
  return [2.5, "首轮未登场或未可靠核验登场，状态保持中性偏谨慎。"];
}

const normalizedPlayers = players.map((p) => {
  const [cn, en, number, age, posCn, pos, role, foot, height, weight, club, value] = p;
  const [clubCn, league, leagueCn, countryCn] = clubs[club];
  const usage = round1[en] || { started: false, minutes: 0 };
  const [form, reason] = formStatus(p, usage);
  const dynamicLog = usage.minutes || usage.started || en === "Rúben Dias"
    ? [{ ...sources.guardianLive, supports_fields: ["round1_lineup", "round1_minutes", "round1_events"] }]
    : [];
  return {
    squad_number: number,
    chinese_name: cn,
    english_name: en,
    native_name: en,
    date_of_birth: null,
    age,
    primary_position: posCn,
    secondary_position: pos.includes("/") ? pos.split("/").slice(1).join("/") : null,
    position_code: pos,
    national_team_role: role,
    preferred_foot: foot,
    height_cm: height,
    weight_kg: weight,
    club_name_en: club,
    club_name_cn: clubCn,
    league_name_en: league,
    league_name_cn: leagueCn,
    club_country_cn: countryCn,
    market_value_eur: value,
    market_value_source: "Transfermarkt",
    market_value_captured_at: capturedAt,
    national_team_caps: null,
    national_team_goals: null,
    availability: en === "Rúben Dias"
      ? { status: "conflicting", issue: "Guardian赛前文字称因伤缺席，但实时名单仍列替补；需官方赛前名单复核。", minutes_risk: "high", captured_at: capturedAt }
      : { status: "probable", issue: null, minutes_risk: age >= 35 ? "medium" : "normal", captured_at: capturedAt },
    round1: {
      match: "葡萄牙 1-1 刚果金",
      source_status: usage.minutes || usage.started ? "probable" : "uncertain",
      started: usage.started,
      minutes: usage.minutes,
      subbed_on_minute: usage.subbed_on_minute ?? null,
      subbed_off_minute: usage.subbed_off_minute ?? null,
      goals: usage.goals || 0,
      assists: usage.assists || 0,
      yellow_cards: usage.yellow_cards || 0,
      red_cards: 0,
      goals_against: usage.goals_against ?? null,
      rating: null,
      rating_note: "未找到稳定同源赛后评分；保留null，后续可由FotMob/SofaScore/WhoScored补。"
    },
    form_status_1_5: form,
    form_status_reason: reason + " 此字段为模型输入，不是投注结论。",
    technical_tags: tagsFor(posCn, role),
    source_log: [...logFor([], []), ...dynamicLog],
  };
});

function tagsFor(posCn, role) {
  const tags = [];
  if (posCn.includes("门将")) tags.push("出球门将", "门线反应");
  if (posCn.includes("中后卫")) tags.push("防空", "后场出球");
  if (posCn.includes("后卫")) tags.push("边路推进", "一对一防守");
  if (posCn.includes("防守型") || posCn.includes("中前卫")) tags.push("中场覆盖", "反压迫");
  if (posCn.includes("攻击型")) tags.push("肋部创造", "定位球参与");
  if (posCn.includes("边锋")) tags.push("边路突破", "纵深冲刺");
  if (posCn.includes("中锋") || posCn.includes("影子")) tags.push("禁区终结", "前场接应");
  if (role.includes("核心") || role.includes("队长")) tags.push("关键球员");
  return tags;
}

const roster = {
  phase: "team_profile",
  team: "葡萄牙",
  team_en: "Portugal",
  fifa_code: "POR",
  group: "K组",
  status: "complete",
  created_at: capturedAt,
  updated_at: capturedAt,
  owner: "worldcup-data-collector-portugal",
  player_state_update_status: "partial",
  coach: {
    chinese_name: "罗伯托·马丁内斯",
    english_name: "Roberto Martínez",
    role: "主教练",
    tenure_note: "2023年起执教葡萄牙；本文件未联网核验完整教练组岗位名单。",
    source_log: [{ ...sources.fourFourTwo, supports_fields: ["manager"] }],
  },
  staff: [
    { role_cn: "主教练", name_cn: "罗伯托·马丁内斯", name_en: "Roberto Martínez", source_status: "confirmed", source_log: [{ ...sources.fourFourTwo, supports_fields: ["manager"] }] },
    { role_cn: "助理教练", name_cn: null, name_en: null, source_status: "missing", source_log: [] },
    { role_cn: "门将教练", name_cn: null, name_en: null, source_status: "missing", source_log: [] },
    { role_cn: "体能/医疗/分析岗位", name_cn: null, name_en: null, source_status: "missing", source_log: [] },
  ],
  base_formation: "4-2-3-1 / 4-3-3",
  team_style_facts: [
    "首轮官方/媒体首发口径为4-2-3-1：Diogo Costa；Cancelo、Araújo、Veiga、Mendes；Vitinha、João Neves；Bernardo、Bruno、Neto；Ronaldo。",
    "首轮第6分钟由Pedro Neto左路传中、João Neves头球得分；之后控球优势未转化为持续压制。",
    "Guardian赛后描述葡萄牙节奏偏慢，刚果金通过五后卫和反击制造威胁。"
  ],
  round1_match_shape: {
    match: "葡萄牙 1-1 刚果金",
    date: "2026-06-17",
    venue: "Houston Stadium",
    formation: "4-2-3-1",
    goals_for: [{ minute: 6, player: "João Neves", assist: "Pedro Neto", note: "头球，左路传中" }],
    goals_against: [{ minute: "45+5", player: "Yoane Wissa", assist: "Arthur Masuaku", note: "角球二次组织后头球" }],
    substitutions_verified: [
      "46' Francisco Conceição for Bernardo Silva",
      "72' Rafael Leão for Pedro Neto",
      "72' Nélson Semedo for Nuno Mendes",
      "83' Gonçalo Ramos for Vitinha"
    ],
    source_status: "partial",
  },
  round1_player_usage: normalizedPlayers.map((p) => ({
    player: p.english_name,
    chinese_name: p.chinese_name,
    started: p.round1.started,
    minutes: p.round1.minutes,
    goals: p.round1.goals,
    assists: p.round1.assists,
    cards: { yellow: p.round1.yellow_cards, red: p.round1.red_cards },
    source_status: p.round1.source_status,
  })),
  players: normalizedPlayers,
  source_log: Object.values(sources).map((s) => ({ ...s, supports_fields: ["squad", "match_context", "market_value", "round1_result"] })),
  gaps_and_conflicts: [
    "本地缺K组第一轮复盘文件；首轮事实来自Guardian/Axios外部报道。",
    "未找到稳定同源球员评分和完整技术统计；所有rating保留null。",
    "国家队caps/goals未逐人可靠核验，保留null。",
    "FourFourTwo仍称27人预选且门将待裁，Transfermarkt列26人；本文件采用Transfermarkt 26人作为主名单，并保留冲突。",
    "Rúben Dias伤情口径冲突：Guardian赛前称其因伤缺席，但名单行又列替补；标记conflicting并建议赛前官方名单复核。",
    "身高、体重、惯用脚按公开数据库常见资料标准化，未逐项用官方PDF复核。"
  ],
};

const playerState = {
  phase: "player_state",
  team: "葡萄牙",
  team_en: "Portugal",
  group: "K组",
  status: "partial",
  player_state_update_status: "partial",
  created_at: capturedAt,
  updated_at: capturedAt,
  owner: "worldcup-data-collector-portugal",
  round_context: "K组第一轮 葡萄牙 1-1 刚果金；本地复盘缺失，外部来源核验到首发、主要换人、进球链和若干事件。",
  players: normalizedPlayers.map((p) => ({
    chinese_name: p.chinese_name,
    english_name: p.english_name,
    squad_number: p.squad_number,
    club_name_cn: p.club_name_cn,
    primary_position: p.primary_position,
    availability: p.availability,
    round1: p.round1,
    form_status_1_5: p.form_status_1_5,
    form_status_reason: p.form_status_reason,
    model_note: p.round1.started ? "首轮已进入Martínez用人样本。" : "首轮未首发；后续按轮换/可用性复核。",
    source_log: p.source_log,
  })),
  team_style_facts: roster.team_style_facts,
  round1_match_shape: roster.round1_match_shape,
  source_log: roster.source_log,
  gaps_and_conflicts: roster.gaps_and_conflicts,
};

function mdTable(players) {
  const header = "| 号 | 中文名 | 原文名 | 位置 | 角色 | 俱乐部 | 联赛 | 身价 | 首轮 | 状态 |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |";
  const rows = players.map((p) => {
    const r = p.round1;
    const first = r.started ? `首发${r.minutes}分钟` : (r.minutes ? `替补${r.minutes}分钟` : "未登场/未核验");
    const event = [r.goals ? `${r.goals}球` : "", r.assists ? `${r.assists}助` : "", r.yellow_cards ? `${r.yellow_cards}黄` : ""].filter(Boolean).join("，");
    return `| ${p.squad_number} | ${p.chinese_name} | ${p.english_name} | ${p.primary_position} | ${p.national_team_role} | ${p.club_name_cn} | ${p.league_name_cn} | ${p.market_value_eur} | ${first}${event ? "，" + event : ""} | ${p.form_status_1_5} |`;
  });
  return [header, ...rows].join("\n");
}

const markdown = `# 葡萄牙国家队成员表

phase: team_profile
status: complete
updated_at: ${capturedAt}
group: K组
player_state_update_status: partial

## 数据口径

- 只处理葡萄牙国家队，不处理刚果金、乌兹别克斯坦、哥伦比亚。
- 26人主名单采用 Transfermarkt 2026 葡萄牙详细名单；FourFourTwo 仍保留“27人预选/门将待裁”口径，已列入缺口。
- K组第一轮本地复盘缺失；赛果和首轮事件使用 Guardian/Axios 外部报道核验。评分和完整技术统计未稳定核验，保留 null。
- \`form_status_1_5\` 是后续模型输入，不是投注结论。

## 教练与球队事实

- 主教练：罗伯托·马丁内斯（Roberto Martínez）。
- 常用结构：4-2-3-1 / 4-3-3。
- 首轮阵型：4-2-3-1。首发为 Diogo Costa；Cancelo、Araújo、Veiga、Mendes；Vitinha、João Neves；Bernardo、Bruno Fernandes、Pedro Neto；Cristiano Ronaldo。
- 首轮关键事件：João Neves 第6分钟头球破门，Pedro Neto 助攻；Yoane Wissa 在45+5分钟为刚果金扳平。
- 首轮换人：46' Francisco Conceição 换 Bernardo Silva；72' Rafael Leão 换 Pedro Neto；72' Nélson Semedo 换 Nuno Mendes；83' Gonçalo Ramos 换 Vitinha。

## 26人中文成员表

${mdTable(normalizedPlayers)}

## 缺口与冲突

${roster.gaps_and_conflicts.map((g) => `- ${g}`).join("\n")}

## 来源

- Transfermarkt Portugal detailed squad 2026: ${sources.transfermarkt.url}
- FourFourTwo Portugal World Cup 2026 squad: ${sources.fourFourTwo.url}
- Guardian match report: ${sources.guardianReport.url}
- Guardian live: ${sources.guardianLive.url}
- Axios Houston: ${sources.axios.url}
`;

function writeJson(rel, data) {
  fs.writeFileSync(path.join(root, rel), JSON.stringify(data, null, 2), "utf8");
}

writeJson("data\\packets\\rosters\\portugal-roster.json", roster);
writeJson("data\\outputs\\player_state\\portugal-player-state.json", playerState);
fs.writeFileSync(path.join(root, "队伍\\葡萄牙\\成员表.md"), markdown, "utf8");

