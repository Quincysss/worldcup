const fs = require("fs");
const path = require("path");

const root = "E:\\worldcup";
const capturedAt = "2026-06-21T01:18:00+08:00";

const source = {
  tm: {
    source: "Transfermarkt England detailed squad 2026",
    url: "https://www.transfermarkt.com/england/kader/verein/3299",
    captured_at: capturedAt,
    reliability_tier: 4,
  },
  fft: {
    source: "FourFourTwo England World Cup 2026 squad",
    url: "https://www.fourfourtwo.com/features/england-world-cup-2026-squad-thomas-tuchel-roster-line-up-xi-final-uk",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
  guardianLive: {
    source: "The Guardian live: England 4-2 Croatia",
    url: "https://www.theguardian.com/football/live/2026/jun/17/england-v-croatia-world-cup-2026-live-updates",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
  guardianRatings: {
    source: "The Guardian player ratings: England 4-2 Croatia",
    url: "https://www.theguardian.com/football/2026/jun/17/england-4-2-croatia-world-cup-2026-group-l-player-ratings",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
  bfw: {
    source: "Bavarian Football Works Kane reaction after England 4-2 Croatia",
    url: "https://www.bavarianfootballworks.com/fifa-world-cup/218120/a-complete-performance-absolute-leader-hes-all-in-harry-kane-lauded-after-england-win-over-croatia",
    captured_at: capturedAt,
    reliability_tier: 3,
  },
};

const clubs = {
  "Crystal Palace": ["水晶宫", "Premier League", "英格兰超级联赛", "英格兰"],
  "Manchester City": ["曼城", "Premier League", "英格兰超级联赛", "英格兰"],
  Everton: ["埃弗顿", "Premier League", "英格兰超级联赛", "英格兰"],
  "Bayer 04 Leverkusen": ["勒沃库森", "Bundesliga", "德国甲级联赛", "德国"],
  "Aston Villa": ["阿斯顿维拉", "Premier League", "英格兰超级联赛", "英格兰"],
  "Chelsea FC": ["切尔西", "Premier League", "英格兰超级联赛", "英格兰"],
  "Newcastle United": ["纽卡斯尔联", "Premier League", "英格兰超级联赛", "英格兰"],
  "Tottenham Hotspur": ["托特纳姆热刺", "Premier League", "英格兰超级联赛", "英格兰"],
  "Brentford FC": ["布伦特福德", "Premier League", "英格兰超级联赛", "英格兰"],
  "Arsenal FC": ["阿森纳", "Premier League", "英格兰超级联赛", "英格兰"],
  "Nottingham Forest": ["诺丁汉森林", "Premier League", "英格兰超级联赛", "英格兰"],
  "Manchester United": ["曼联", "Premier League", "英格兰超级联赛", "英格兰"],
  "Real Madrid": ["皇家马德里", "LaLiga", "西班牙甲级联赛", "西班牙"],
  "FC Barcelona": ["巴塞罗那", "LaLiga", "西班牙甲级联赛", "西班牙"],
  "Bayern Munich": ["拜仁慕尼黑", "Bundesliga", "德国甲级联赛", "德国"],
  "Al-Ahli SFC": ["吉达国民", "Saudi Pro League", "沙特职业联赛", "沙特阿拉伯"],
};

const players = [
  ["迪恩·亨德森", "Dean Henderson", 13, 29, "门将", "GK", "替补门将", "右脚", 188, 85, "Crystal Palace", "€28.00m"],
  ["詹姆斯·特拉福德", "James Trafford", 23, 23, "门将", "GK", "替补门将", "右脚", 197, 88, "Manchester City", "€25.00m"],
  ["乔丹·皮克福德", "Jordan Pickford", 1, 32, "门将", "GK", "首发门将", "左脚", 185, 77, "Everton", "€13.00m"],
  ["马克·格伊", "Marc Guéhi", 6, 25, "中后卫", "CB", "替补中卫/末段稳守", "右脚", 182, 82, "Manchester City", "€70.00m"],
  ["贾雷尔·宽萨", "Jarell Quansah", 26, 23, "中后卫", "CB", "替补中卫", "右脚", 190, 85, "Bayer 04 Leverkusen", "€45.00m"],
  ["埃兹里·孔萨", "Ezri Konsa", 2, 28, "中后卫", "CB/RB", "首发中卫", "右脚", 183, 77, "Aston Villa", "€40.00m"],
  ["特雷沃·查洛巴", "Trevoh Chalobah", 12, 26, "中后卫", "CB/RB", "替补中卫", "右脚", 192, 85, "Chelsea FC", "€40.00m"],
  ["约翰·斯通斯", "John Stones", 5, 32, "中后卫", "CB/DM", "首发出球中卫", "右脚", 188, 76, "Manchester City", "€12.00m"],
  ["丹·伯恩", "Dan Burn", 15, 34, "中后卫", "CB/LB", "替补防空点", "左脚", 201, 87, "Newcastle United", "€4.00m"],
  ["尼科·奥赖利", "Nico O'Reilly", 3, 21, "左后卫", "LB/CM", "首发左后卫", "左脚", 188, 80, "Manchester City", "€70.00m"],
  ["杰德·斯彭斯", "Djed Spence", 25, 25, "左后卫", "LB/RB", "替补边后卫", "右脚", 184, 76, "Tottenham Hotspur", "€30.00m"],
  ["里斯·詹姆斯", "Reece James", 24, 26, "右后卫", "RB/RWB", "首发右后卫", "右脚", 179, 82, "Chelsea FC", "€60.00m"],
  ["乔丹·亨德森", "Jordan Henderson", 14, 36, "防守型中场", "DM/CM", "替补经验中场", "右脚", 182, 80, "Brentford FC", "€1.20m"],
  ["德克兰·赖斯", "Declan Rice", 4, 27, "中前卫", "CM/DM", "首发中场屏障/定位球", "右脚", 185, 80, "Arsenal FC", "€120.00m"],
  ["埃利奥特·安德森", "Elliot Anderson", 8, 23, "中前卫", "CM/DM", "首发中场连接点", "右脚", 179, 72, "Nottingham Forest", "€75.00m"],
  ["科比·梅努", "Kobbie Mainoo", 16, 21, "中前卫", "CM/DM", "替补中场", "右脚", 175, 72, "Manchester United", "€70.00m"],
  ["裘德·贝林厄姆", "Jude Bellingham", 10, 22, "攻击型中场", "AM/CM", "首发十号位/关键前插", "右脚", 186, 75, "Real Madrid", "€130.00m"],
  ["摩根·罗杰斯", "Morgan Rogers", 17, 23, "攻击型中场", "AM/LW", "替补中前场", "右脚", 187, 80, "Aston Villa", "€90.00m"],
  ["埃贝雷奇·埃泽", "Eberechi Eze", 21, 27, "攻击型中场", "AM/LW", "替补创造者", "右脚", 178, 73, "Arsenal FC", "€65.00m"],
  ["安东尼·戈登", "Anthony Gordon", 18, 25, "左边锋", "LW/RW", "首发左路", "右脚", 183, 72, "Newcastle United", "€65.00m"],
  ["马库斯·拉什福德", "Marcus Rashford", 11, 28, "左边锋", "LW/ST", "替补进球边锋", "右脚", 187, 75, "FC Barcelona", "€40.00m"],
  ["布卡约·萨卡", "Bukayo Saka", 7, 24, "右边锋", "RW/LW", "替补复出边锋/助攻者", "左脚", 178, 72, "Arsenal FC", "€110.00m"],
  ["诺尼·马杜埃凯", "Noni Madueke", 20, 24, "右边锋", "RW/LW", "首发右路爆点/造点", "左脚", 182, 75, "Arsenal FC", "€50.00m"],
  ["哈里·凯恩", "Harry Kane", 9, 32, "中锋", "CF", "队长/首发中锋", "右脚", 188, 86, "Bayern Munich", "€60.00m"],
  ["奥利·沃特金斯", "Ollie Watkins", 19, 30, "中锋", "CF", "替补中锋", "右脚", 180, 70, "Aston Villa", "€25.00m"],
  ["伊万·托尼", "Ivan Toney", 22, 30, "中锋", "CF", "替补中锋/点球与禁区方案", "右脚", 187, 86, "Al-Ahli SFC", "€20.00m"],
];

const usage = {
  "Jordan Pickford": { started: true, minutes: 90, rating: 6, goals_against: 2 },
  "Reece James": { started: true, minutes: 90, rating: 6 },
  "Ezri Konsa": { started: true, minutes: 90, rating: 6 },
  "John Stones": { started: true, minutes: 87, off: 87, rating: 6 },
  "Nico O'Reilly": { started: true, minutes: 90, rating: 7 },
  "Elliot Anderson": { started: true, minutes: 90, assists: 1, rating: 8 },
  "Declan Rice": { started: true, minutes: 72, off: 72, assists: 1, rating: 7, issue: "赛后被观察到轻微跛行，Tuchel称不愿冒风险。", risk: "medium" },
  "Noni Madueke": { started: true, minutes: 72, off: 72, rating: 8, penalties_won: 1 },
  "Jude Bellingham": { started: true, minutes: 80, off: 80, goals: 1, rating: 7 },
  "Anthony Gordon": { started: true, minutes: 72, off: 72, rating: 6 },
  "Harry Kane": { started: true, minutes: 90, goals: 2, rating: 9 },
  "Marcus Rashford": { started: false, minutes: 18, on: 72, goals: 1, rating: 7, issue: "赛后被观察到轻微跛行，需下一场前复核。", risk: "medium" },
  "Morgan Rogers": { started: false, minutes: 18, on: 72, assists: 1, rating: 6 },
  "Bukayo Saka": { started: false, minutes: 18, on: 72, assists: 1, rating: 7, issue: "赛前跟腱/健康状态未达满格，替补复出并参与第四球。", risk: "medium" },
  "Djed Spence": { started: false, minutes: 10, on: 80, rating: 6 },
  "Marc Guéhi": { started: false, minutes: 3, on: 87, rating: 6 },
};

function tags(pos, role) {
  const out = [];
  if (pos.includes("门将")) out.push("门线反应", "长传发动");
  if (pos.includes("中后卫")) out.push("防空", "后场出球");
  if (pos.includes("后卫")) out.push("边路推进", "防守覆盖");
  if (pos.includes("中前卫") || pos.includes("防守型")) out.push("中场覆盖", "反压迫");
  if (pos.includes("攻击型")) out.push("肋部创造", "前插终结");
  if (pos.includes("边锋")) out.push("一对一", "纵深冲刺");
  if (pos.includes("中锋")) out.push("禁区终结", "支点回撤");
  if (role.includes("队长") || role.includes("关键")) out.push("关键球员");
  return out;
}

function form(name, u) {
  if (name === "Harry Kane") return [4.5, "首轮梅开二度、评分9，并有补时防守封堵，状态显著上调。"];
  if (name === "Elliot Anderson") return [4, "首发踢满，送出贝林厄姆进球助攻，Guardian评分8。"];
  if (name === "Noni Madueke") return [4, "首发右路持续制造威胁并造点，Guardian评分8。"];
  if (name === "Jude Bellingham") return [3.5, "首发进球但也参与克罗地亚第一球前丢失球权，状态偏正面。"];
  if (name === "Marcus Rashford") return [3.5, "替补破门但赛后轻微跛行需复核，状态偏正面但有分钟风险。"];
  if (name === "Bukayo Saka") return [3.5, "伤情背景下替补登场并参与第四球，状态回升但仍需复核。"];
  if (u?.started) return [3, "首轮首发并参与4-2取胜，个人状态中性偏稳。"];
  if ((u?.minutes || 0) > 0) return [3, "首轮替补登场，角色明确但时间有限。"];
  return [2.5, "首轮未登场，保持中性偏谨慎。"];
}

function sourceLog(base, extra = []) {
  return [
    { ...source.tm, supports_fields: ["squad_number", "age", "club", "market_value", "primary_position"] },
    { ...source.fft, supports_fields: ["squad_selection", "coach", "club_cross_check"] },
    ...extra,
  ];
}

const normalizedPlayers = players.map((raw) => {
  const [cn, en, num, age, posCn, code, role, foot, height, weight, club, value] = raw;
  const [clubCn, league, leagueCn, countryCn] = clubs[club];
  const u = usage[en] || { started: false, minutes: 0 };
  const [status, reason] = form(en, u);
  const eventLog = u.started || u.minutes
    ? [{ ...source.guardianLive, supports_fields: ["round1_lineup", "round1_minutes", "round1_events", "substitutions"] }, { ...source.guardianRatings, supports_fields: ["round1_rating"] }]
    : [];
  return {
    squad_number: num,
    chinese_name: cn,
    english_name: en,
    native_name: en,
    age,
    primary_position: posCn,
    secondary_position: code.includes("/") ? code.split("/").slice(1).join("/") : null,
    position_code: code,
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
    availability: {
      status: u.issue ? "probable" : "confirmed",
      issue: u.issue || null,
      minutes_risk: u.risk || "normal",
      captured_at: capturedAt,
    },
    round1: {
      match: "英格兰 4-2 克罗地亚",
      source_status: u.started || u.minutes ? "confirmed" : "probable_unused",
      started: !!u.started,
      minutes: u.minutes || 0,
      subbed_on_minute: u.on ?? null,
      subbed_off_minute: u.off ?? null,
      goals: u.goals || 0,
      assists: u.assists || 0,
      penalties_won: u.penalties_won || 0,
      yellow_cards: 0,
      red_cards: 0,
      goals_against: u.goals_against ?? null,
      rating: u.rating ?? null,
      rating_source: u.rating ? "The Guardian" : null,
      rating_note: u.rating ? "Guardian赛后评分。" : "未登场或无稳定同源评分，rating保留null。",
    },
    form_status_1_5: status,
    form_status_reason: `${reason} 此字段为模型输入，不是投注结论。`,
    technical_tags: tags(posCn, role),
    source_log: sourceLog(raw, eventLog),
  };
});

const goals = [
  { minute: "12", team: "英格兰", scorer: "Harry Kane", assist: null, note: "点球；首次罚球被扑后因门将离线/防守方提前进入重罚命中。" },
  { minute: "36", team: "克罗地亚", scorer: "Martin Baturina", assist: "Petar Sucic", note: "禁区弧右侧横传后远射扳平。" },
  { minute: "42", team: "英格兰", scorer: "Harry Kane", assist: "Declan Rice", note: "Rice角球，Kane头球。" },
  { minute: "45+5", team: "克罗地亚", scorer: "Petar Musa", assist: "Ivan Perisic", note: "Perisic头球摆渡，Musa侧身推射。" },
  { minute: "47", team: "英格兰", scorer: "Jude Bellingham", assist: "Elliot Anderson", note: "Anderson长传，Bellingham右路推进后低射。" },
  { minute: "85", team: "英格兰", scorer: "Marcus Rashford", assist: "Bukayo Saka", note: "Saka右路回收球权后横传，Rashford内切低射。" },
];

const roster = {
  phase: "team_profile",
  team: "英格兰",
  team_en: "England",
  fifa_code: "ENG",
  group: "L组",
  status: "complete",
  created_at: capturedAt,
  updated_at: capturedAt,
  owner: "worldcup-data-collector-england",
  player_state_update_status: "updated",
  coach: {
    chinese_name: "托马斯·图赫尔",
    english_name: "Thomas Tuchel",
    role: "主教练",
    source_log: [{ ...source.fft, supports_fields: ["coach", "squad_comments"] }],
  },
  staff: [
    { role_cn: "主教练", name_cn: "托马斯·图赫尔", name_en: "Thomas Tuchel", source_status: "confirmed", source_log: [{ ...source.fft, supports_fields: ["coach"] }] },
    { role_cn: "助理/定位球职责", name_cn: "安东尼·巴里", name_en: "Anthony Barry", source_status: "probable", source_log: [{ ...source.guardianLive, supports_fields: ["postmatch_staff_reference"] }] },
    { role_cn: "门将教练/体能/医疗/分析岗位", name_cn: null, name_en: null, source_status: "missing", source_log: [] },
  ],
  base_formation: "4-2-3-1 / 4-3-3",
  team_style_facts: [
    "首轮4-2-3-1首发：Pickford；James、Konsa、Stones、O'Reilly；Anderson、Rice；Madueke、Bellingham、Gordon；Kane。",
    "首轮两个定位球/死球链路进球：Kane点球、Rice角球助攻Kane头球。",
    "Guardian live记录Tuchel半场后要求球队以更主动方式比赛，英格兰下半场强度明显提升。",
    "Guardian live在81分钟给出xG：英格兰2.36，克罗地亚0.38。"
  ],
  round1_match_shape: {
    match: "英格兰 4-2 克罗地亚",
    date: "2026-06-17",
    venue: "Dallas Stadium / AT&T Stadium, Arlington",
    formation: "4-2-3-1",
    england_starting_xi: ["Jordan Pickford", "Reece James", "Ezri Konsa", "John Stones", "Nico O'Reilly", "Elliot Anderson", "Declan Rice", "Noni Madueke", "Jude Bellingham", "Anthony Gordon", "Harry Kane"],
    croatia_starting_xi: ["Dominik Livakovic", "Josip Sutalo", "Luka Vuskovic", "Josko Gvardiol", "Josip Stanisic", "Luka Modric", "Petar Sucic", "Ivan Perisic", "Mario Pasalic", "Martin Baturina", "Petar Musa"],
    goals,
    england_substitutions: [
      "72' Morgan Rogers for Declan Rice",
      "72' Bukayo Saka for Noni Madueke",
      "72' Marcus Rashford for Anthony Gordon",
      "80' Djed Spence for Jude Bellingham",
      "87' Marc Guéhi for John Stones"
    ],
    source_status: "updated",
  },
  round1_player_usage: normalizedPlayers.map((p) => ({
    player: p.english_name,
    chinese_name: p.chinese_name,
    started: p.round1.started,
    minutes: p.round1.minutes,
    goals: p.round1.goals,
    assists: p.round1.assists,
    rating: p.round1.rating,
    cards: { yellow: p.round1.yellow_cards, red: p.round1.red_cards },
    source_status: p.round1.source_status,
  })),
  players: normalizedPlayers,
  source_log: Object.values(source).map((s) => ({ ...s, supports_fields: ["squad", "match_context", "lineups", "events", "ratings"] })),
  gaps_and_conflicts: [
    "英格兰26名球员首发/分钟/换人/事件/可用性/评分或评分缺口说明已同步；克罗地亚本队player_state和成员表由克罗地亚线程负责。",
    "未逐人可靠核验国家队caps/goals，保留null。",
    "未找到完整同源牌表，英格兰球员未见可靠黄红牌记录，逐人牌数按0写入并建议官方数据复核。",
    "Rice和Rashford赛后轻微跛行信号为媒体赛后观察，标probable，下一场前复核。",
    "身高、体重、惯用脚按公开数据库常见资料标准化，未逐项用官方PDF复核。"
  ],
};

const playerState = {
  phase: "player_state",
  team: "英格兰",
  team_en: "England",
  group: "L组",
  status: "complete",
  player_state_update_status: "updated",
  created_at: capturedAt,
  updated_at: capturedAt,
  owner: "worldcup-data-collector-england",
  round_context: "L组第一轮 英格兰 4-2 克罗地亚；英格兰26名球员首发/分钟/换人/事件/伤停/评分或评分缺口说明已同步。",
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
    model_note: p.round1.started ? "首轮进入Tuchel首发样本。" : (p.round1.minutes ? "首轮替补进入轮换样本。" : "首轮未登场，保持轮换/深度跟踪。"),
    source_log: p.source_log,
  })),
  team_style_facts: roster.team_style_facts,
  round1_match_shape: roster.round1_match_shape,
  source_log: roster.source_log,
  gaps_and_conflicts: roster.gaps_and_conflicts,
};

function memberRows() {
  return roster.players.map((p) => {
    const r = p.round1;
    const usageText = r.started ? `首发${r.minutes}分钟` : (r.minutes ? `替补${r.minutes}分钟` : "未登场");
    const ev = [r.subbed_on_minute ? `${r.subbed_on_minute}'上` : "", r.subbed_off_minute ? `${r.subbed_off_minute}'下` : "", r.goals ? `${r.goals}球` : "", r.assists ? `${r.assists}助` : "", r.penalties_won ? "造点" : ""].filter(Boolean).join("，");
    return `| ${p.squad_number} | ${p.chinese_name} | ${p.english_name} | ${p.primary_position} | ${p.club_name_cn} | ${p.market_value_eur} | ${usageText}${ev ? "，" + ev : ""} | ${p.round1.rating ?? "null"} | ${p.form_status_1_5} |`;
  }).join("\n");
}

const memberMd = `# 英格兰国家队成员表

phase: team_profile
status: complete
updated_at: ${capturedAt}
group: L组
player_state_update_status: updated

## 数据口径

- 只处理英格兰国家队，不处理克罗地亚本队成员表、加纳、巴拿马。
- 26人名单采用 Transfermarkt，并用 FourFourTwo 名单交叉核验。
- L组第一轮英格兰 4-2 克罗地亚的首发、分钟、换人、进球/助攻、评分或评分缺口说明已同步。
- \`form_status_1_5\` 是后续模型输入，不是投注结论。

## 教练与球队事实

- 主教练：托马斯·图赫尔（Thomas Tuchel）。
- 首轮阵型：4-2-3-1。
- 首轮关键变化：半场后英格兰提高压迫和向前速度，第47分钟由Bellingham反超，第85分钟Rashford锁定比分。
- 第二轮前可用性备注：Rice与Rashford有赛后轻微跛行观察，Saka为带健康背景替补复出，均需赛前复核。

## 26人中文成员表

| 号 | 中文名 | 原文名 | 位置 | 俱乐部 | 身价 | 首轮状态 | 评分 | form |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${memberRows()}

## 缺口与冲突

${roster.gaps_and_conflicts.map((g) => `- ${g}`).join("\n")}

## 来源

${roster.source_log.map((s) => `- ${s.source}: ${s.url}`).join("\n")}
`;

const reviewMd = `# 英格兰 4-2 克罗地亚复盘

phase: post_match_review
status: complete
updated_at: ${capturedAt}
group: L组
match: England 4-2 Croatia
player_state_update_status: updated
scope: 单场复盘主责；英格兰球员状态同步；克罗地亚本队 player_state/成员表由克罗地亚线程负责。

## 赛果与来源

- 比赛：英格兰 4-2 克罗地亚。
- 日期：2026-06-17。
- 场地：Dallas Stadium / AT&T Stadium, Arlington。
- 英格兰阵型：4-2-3-1。
- 克罗地亚阵型：3-4-2-1。
- 来源状态：赛果、首发、换人、进球链和英格兰评分由 Guardian live/ratings 核验；英格兰牌面未见可靠黄红牌记录，后续可用官方数据复核。

## 首发与换人

### 英格兰首发

Jordan Pickford；Reece James、Ezri Konsa、John Stones、Nico O'Reilly；Elliot Anderson、Declan Rice；Noni Madueke、Jude Bellingham、Anthony Gordon；Harry Kane。

### 克罗地亚首发

Dominik Livakovic；Josip Sutalo、Luka Vuskovic、Josko Gvardiol；Josip Stanisic、Luka Modric、Petar Sucic、Ivan Perisic；Mario Pasalic、Martin Baturina；Petar Musa。

### 英格兰换人

| 分钟 | 换上 | 换下 |
| --- | --- | --- |
| 72' | Morgan Rogers | Declan Rice |
| 72' | Bukayo Saka | Noni Madueke |
| 72' | Marcus Rashford | Anthony Gordon |
| 80' | Djed Spence | Jude Bellingham |
| 87' | Marc Guéhi | John Stones |

## 进球与助攻

| 分钟 | 球队 | 进球 | 助攻/来源 | 说明 |
| --- | --- | --- | --- | --- |
${goals.map((g) => `| ${g.minute}' | ${g.team} | ${g.scorer} | ${g.assist || "-"} | ${g.note} |`).join("\n")}

## 关键事实与战术变化

- 赛前文件首选比分为1-1，实际为英格兰4-2克罗地亚；英格兰进攻转化和下半场强度显著高于赛前预期。
- 上半场2-2体现了赛前担心的克罗地亚经验与转换威胁，Baturina和Musa分别利用英格兰防守问题进球。
- 下半场英格兰明显提高推进速度和压迫强度，Bellingham第47分钟反超后，Rashford第85分钟锁定比分。
- Guardian live记录81分钟xG：英格兰2.36，克罗地亚0.38；比分比xG更开放，但英格兰机会质量和二次进攻明显占优。
- Kane两球并在补时封堵Gvardiol近距离射门，赛后被Tuchel称赞为完整表现；此处仅作事实记录，不作预测。

## 英格兰球员状态同步

| 号 | 球员 | 首发/分钟 | 事件 | 评分 | form |
| --- | --- | --- | --- | --- | --- |
${roster.players.map((p) => {
  const r = p.round1;
  const used = r.started ? `首发${r.minutes}` : (r.minutes ? `替补${r.minutes}` : "未登场");
  const ev = [r.goals ? `${r.goals}球` : "", r.assists ? `${r.assists}助` : "", r.penalties_won ? "造点" : ""].filter(Boolean).join("，") || "-";
  return `| ${p.squad_number} | ${p.chinese_name} | ${used} | ${ev} | ${r.rating ?? "null"} | ${p.form_status_1_5} |`;
}).join("\n")}

## player_state_update_status

updated

英格兰26名球员的首发、分钟、换人、进球、助攻、牌、伤停/可用性、评分或评分缺口说明已同步到：

- data\\outputs\\player_state\\england-player-state.json
- 队伍\\英格兰\\成员表.md
- data\\packets\\rosters\\england-roster.json

## 缺口与冲突

${roster.gaps_and_conflicts.map((g) => `- ${g}`).join("\n")}

## source_log

${roster.source_log.map((s) => `- ${s.source} | ${s.url} | captured_at=${capturedAt}`).join("\n")}
`;

function writeJson(rel, data) {
  fs.writeFileSync(path.join(root, rel), JSON.stringify(data, null, 2), "utf8");
}

writeJson("data\\packets\\rosters\\england-roster.json", roster);
writeJson("data\\outputs\\player_state\\england-player-state.json", playerState);
fs.writeFileSync(path.join(root, "队伍\\英格兰\\成员表.md"), memberMd, "utf8");
fs.mkdirSync(path.join(root, "比赛\\已完成比赛\\小组赛\\L组"), { recursive: true });
fs.writeFileSync(path.join(root, "比赛\\已完成比赛\\小组赛\\L组\\2026-06-17_英格兰_4-2_克罗地亚_复盘.md"), reviewMd, "utf8");
