const fs = require("fs");
const path = require("path");

const root = "E:\\worldcup";
const capturedAt = "2026-06-21T00:35:00+08:00";
const rosterPath = path.join(root, "data", "packets", "rosters", "canada-roster.json");
const statePath = path.join(root, "data", "outputs", "player_state", "canada-player-state.json");
const mdPath = path.join(root, "队伍", "加拿大", "成员表.md");
const statusPath = path.join(root, "汇总", "B组成员表建设状态.md");

const sources = {
  transfermarkt: {
    source: "Transfermarkt Canada national team detailed squad",
    url: "https://www.transfermarkt.com/canada/kader/verein/3510",
    captured_at: capturedAt,
    source_status: "confirmed"
  },
  localProfile: {
    source: "E:\\worldcup\\队伍\\加拿大\\正式球队档案.md",
    captured_at: capturedAt,
    source_status: "local_context"
  },
  round1Local: {
    source: "E:\\worldcup\\比赛\\已完成比赛\\小组赛\\B组\\2026-06-12_加拿大_1-1_波黑_复盘.md",
    captured_at: capturedAt,
    source_status: "local_verified"
  },
  round2Local: {
    source: "E:\\worldcup\\比赛\\已完成比赛\\小组赛\\B组\\2026-06-18_加拿大_6-0_卡塔尔_复盘.md",
    captured_at: capturedAt,
    source_status: "local_verified"
  },
  guardianRound2: {
    source: "The Guardian live report, Canada 6-0 Qatar, June 18 2026",
    url: "https://www.theguardian.com/football/live/2026/jun/18/canada-v-qatar-world-cup-2026-live",
    captured_at: capturedAt,
    source_status: "confirmed"
  },
  espnSchedule: {
    source: "ESPN 2026 FIFA World Cup fixtures/results",
    url: "https://www.espn.com/soccer/story/_/id/48939282/2026-fifa-world-cup-fixtures-results-match-schedule-group-stage-knockout-rounds-bracket",
    captured_at: capturedAt,
    source_status: "confirmed"
  }
};

const players = [
  p(1, "德雷克·卡伦德", "Drake Callender", "Drake Callender", "门将", "", "主力/轮换门将", "右脚", 191, null, 28, "Inter Miami CF", "迈阿密国际", "Major League Soccer", "美国职业足球大联盟", "美国", 2500000, 3),
  p(16, "马克西姆·克雷波", "Maxime Crépeau", "Maxime Crépeau", "门将", "", "轮换门将", "右脚", 181, null, 32, "Portland Timbers", "波特兰伐木者", "Major League Soccer", "美国职业足球大联盟", "美国", 1500000, 2.5),
  p(18, "汤姆·麦吉尔", "Tom McGill", "Tom McGill", "门将", "", "替补门将", "右脚", 185, null, 26, "Milton Keynes Dons", "米尔顿凯恩斯", "EFL League Two", "英格兰足球乙级联赛", "英格兰", 300000, 2.5),
  p(2, "阿方索·戴维斯", "Alphonso Davies", "Alphonso Davies", "左后卫/左翼卫", "左边锋", "核心球员", "左脚", 183, null, 25, "Bayern Munich", "拜仁慕尼黑", "Bundesliga", "德国足球甲级联赛", "德国", 50000000, 2.5, { r1Absent: true }),
  p(3, "德里克·科尔内柳斯", "Derek Cornelius", "Derek Cornelius", "中后卫", "左中卫", "主力中卫", "左脚", 188, null, 28, "Olympique Marseille", "马赛", "Ligue 1", "法国足球甲级联赛", "法国", 7000000, 3),
  p(4, "莫伊塞·邦比托", "Moïse Bombito", "Moïse Bombito", "中后卫", "右中卫", "主力中卫", "右脚", 190, null, 26, "OGC Nice", "尼斯", "Ligue 1", "法国足球甲级联赛", "法国", 12000000, 3),
  p(5, "卢克·德富热罗勒", "Luc de Fougerolles", "Luc de Fougerolles", "中后卫", "右后卫", "年轻轮换后卫", "右脚", 180, null, 20, "Fulham FC", "富勒姆", "Premier League", "英格兰足球超级联赛", "英格兰", 1500000, 2.5),
  p(13, "里奇·拉里亚", "Richie Laryea", "Richie Laryea", "右后卫/右翼卫", "左后卫", "边路轮换", "右脚", 175, null, 31, "Toronto FC", "多伦多FC", "Major League Soccer", "美国职业足球大联盟", "加拿大", 1500000, 3),
  p(15, "阿利斯泰尔·约翰斯顿", "Alistair Johnston", "Alistair Johnston", "右后卫", "右中卫", "主力右后卫", "右脚", 180, null, 27, "Celtic FC", "凯尔特人", "Scottish Premiership", "苏格兰足球超级联赛", "苏格兰", 9000000, 3),
  p(19, "科比·富兰克林", "Kobe Franklin", "Kobe Franklin", "右后卫", "左后卫", "替补边后卫", "右脚", 176, null, 23, "Barnsley FC", "巴恩斯利", "EFL League One", "英格兰足球甲级联赛", "英格兰", 500000, 2.5),
  p(20, "乔尔·沃特曼", "Joel Waterman", "Joel Waterman", "中后卫", "右中卫", "轮换中卫", "右脚", 188, null, 30, "CF Montréal", "蒙特利尔冲击", "Major League Soccer", "美国职业足球大联盟", "加拿大", 1500000, 2.5),
  p(6, "萨米·皮耶特", "Samuel Piette", "Samuel Piette", "防守型中场", "中前卫", "防守轮换", "右脚", 171, null, 31, "CF Montréal", "蒙特利尔冲击", "Major League Soccer", "美国职业足球大联盟", "加拿大", 1000000, 2.5),
  p(7, "斯蒂芬·欧斯塔基奥", "Stephen Eustáquio", "Stephen Eustáquio", "中前卫", "防守型中场", "中场核心", "右脚", 178, null, 29, "FC Porto", "波尔图", "Liga Portugal", "葡萄牙足球超级联赛", "葡萄牙", 12000000, 3.5),
  p(8, "伊斯梅尔·科内", "Ismaël Koné", "Ismaël Koné", "中前卫", "攻击型中场", "主力/重要轮换中场", "右脚", 188, null, 24, "US Sassuolo", "萨索洛", "Serie A", "意大利足球甲级联赛", "意大利", 10000000, 1, { koneInjury: true }),
  p(14, "内森·萨利巴", "Nathan Saliba", "Nathan Saliba", "中前卫", "防守型中场", "轮换中场", "右脚", 176, null, 22, "RSC Anderlecht", "安德莱赫特", "Belgian Pro League", "比利时职业联赛", "比利时", 5000000, 4, { round2Goals: 1 }),
  p(21, "马蒂厄·舒瓦尼耶", "Mathieu Choinière", "Mathieu Choinière", "中前卫", "右前卫", "轮换中场", "右脚", 175, null, 27, "Grasshopper Club Zurich", "苏黎世草蜢", "Swiss Super League", "瑞士足球超级联赛", "瑞士", 2500000, 2.5),
  p(22, "乔纳森·奥索里奥", "Jonathan Osorio", "Jonathan Osorio", "中前卫", "攻击型中场", "经验型轮换", "右脚", 175, null, 34, "Toronto FC", "多伦多FC", "Major League Soccer", "美国职业足球大联盟", "加拿大", 1500000, 2.5),
  p(23, "阿里·艾哈迈德", "Ali Ahmed", "Ali Ahmed", "左中场", "左后卫/中前卫", "多面手轮换", "左脚", 180, null, 25, "Vancouver Whitecaps FC", "温哥华白浪", "Major League Soccer", "美国职业足球大联盟", "加拿大", 4000000, 3),
  p(10, "乔纳森·戴维", "Jonathan David", "Jonathan David", "中锋", "影锋", "进攻核心", "右脚", 180, null, 26, "Juventus FC", "尤文图斯", "Serie A", "意大利足球甲级联赛", "意大利", 45000000, 5, { round2Goals: 3 }),
  p(11, "泰琼·布坎南", "Tajon Buchanan", "Tajon Buchanan", "右边锋", "右翼卫/左边锋", "边路主力", "右脚", 183, null, 27, "Villarreal CF", "比利亚雷亚尔", "La Liga", "西班牙足球甲级联赛", "西班牙", 8000000, 3.5),
  p(12, "凯尔·拉林", "Cyle Larin", "Cyle Larin", "中锋", "左边锋", "主力/轮换前锋", "右脚", 188, null, 31, "RCD Mallorca", "马略卡", "La Liga", "西班牙足球甲级联赛", "西班牙", 4000000, 4, { round2Goals: 1 }),
  p(17, "雅各布·沙费尔伯格", "Jacob Shaffelburg", "Jacob Shaffelburg", "左边锋", "左翼卫", "速度型轮换", "左脚", 178, null, 26, "Nashville SC", "纳什维尔SC", "Major League Soccer", "美国职业足球大联盟", "美国", 5500000, 3),
  p(24, "利亚姆·米拉尔", "Liam Millar", "Liam Millar", "左边锋", "右边锋", "边路轮换", "右脚", 176, null, 26, "Hull City", "赫尔城", "EFL Championship", "英格兰足球冠军联赛", "英格兰", 4500000, 2.5),
  p(25, "西奥·贝尔", "Théo Bair", "Théo Bair", "中锋", "左边锋", "替补前锋", "右脚", 193, null, 26, "AJ Auxerre", "欧塞尔", "Ligue 1", "法国足球甲级联赛", "法国", 2500000, 2.5),
  p(26, "普罗米斯·戴维", "Promise David", "Promise David", "中锋", "影锋", "替补前锋", "右脚", 195, null, 24, "Royale Union Saint-Gilloise", "圣吉罗斯联合", "Belgian Pro League", "比利时职业联赛", "比利时", 8000000, 2.5),
  p(9, "泰奥·科尔贝亚努", "Theo Corbeanu", "Theo Corbeanu", "右边锋", "左边锋", "替补边锋", "右脚", 190, null, 24, "Granada CF", "格拉纳达", "LaLiga 2", "西班牙足球乙级联赛", "西班牙", 2500000, 2.5)
];

function p(number, chinese, english, nativeName, primary, secondary, role, foot, height, weight, age, clubEn, clubCn, leagueEn, leagueCn, countryCn, market, form, flags = {}) {
  const sourceLog = [sources.transfermarkt, sources.localProfile];
  if (flags.r1Absent) sourceLog.push(sources.round1Local);
  if (flags.round2Goals || flags.koneInjury) sourceLog.push(sources.round2Local, sources.guardianRound2);
  return {
    squad_number: number,
    chinese_name: chinese,
    english_name: english,
    native_name: nativeName,
    age,
    date_of_birth: null,
    primary_position: primary,
    secondary_position: secondary || null,
    national_team_role: role,
    preferred_foot: foot,
    height_cm: height,
    weight_kg: weight,
    club_name_en: clubEn,
    club_name_cn: clubCn,
    league_name_en: leagueEn,
    league_name_cn: leagueCn,
    club_country_cn: countryCn,
    market_value_eur: market,
    market_value_source: "Transfermarkt Canada detailed squad",
    market_value_captured_at: capturedAt,
    national_team_caps: null,
    national_team_goals: null,
    availability_status: flags.koneInjury ? "injured_uncertain" : (flags.r1Absent ? "managed_return_uncertain" : "available_or_unreported"),
    injury_suspension_note: flags.koneInjury ? "第二轮对卡塔尔时遭遇严重腿部伤情离场；第三轮前可用性需要继续核验。" : (flags.r1Absent ? "首轮本地复盘记录 Davies 缺阵；第二轮后完整分钟状态未核验。" : "未见本地复盘记录伤停或停赛。"),
    minute_risk: flags.koneInjury ? "high" : (flags.r1Absent ? "medium" : "normal"),
    round1: {
      match: "加拿大 1-1 波黑",
      started: flags.r1Absent ? false : null,
      minutes: flags.r1Absent ? 0 : null,
      goals: 0,
      assists: null,
      yellow_cards: null,
      red_cards: 0,
      rating: null,
      note: flags.r1Absent ? "本地赛后复盘记录 Davies 缺阵；其余球员首发和逐分钟未在本地文件完整列出。" : "首轮逐人首发、分钟和评分未在本地复盘中完整列出。"
    },
    round2: {
      match: "加拿大 6-0 卡塔尔",
      started: flags.koneInjury ? true : null,
      minutes: flags.koneInjury ? 57 : null,
      goals: flags.round2Goals || 0,
      assists: null,
      yellow_cards: null,
      red_cards: 0,
      rating: null,
      note: flags.round2Goals ? `本地复盘和外部赛后记录确认本场进球 ${flags.round2Goals} 个；逐分钟和评分缺失。` : (flags.koneInjury ? "本地复盘和外部赛后记录确认重伤离场；分钟按赛后文本近似记录为 57，需官方技术报告复核。" : "第二轮逐人首发、分钟和评分未在本地复盘中完整列出。")
    },
    form_status_1_5: form,
    form_status_reason: flags.round2Goals ? "第二轮大胜中直接进球贡献提升状态值；评分缺失，保守保留不满分。" : (flags.koneInjury ? "重要中场但第二轮伤情显著抬高可用性风险。" : (flags.r1Absent ? "核心能力高，但首轮缺阵且第二轮完整出场状态未核验。" : "基于球队两轮 4 分、第二轮大胜和未记录伤停，给予中性到偏正状态。")),
    technical_tags: buildTags(primary, role),
    source_log: sourceLog
  };
}

function buildTags(primary, role) {
  const tags = [];
  if (primary.includes("门将")) tags.push("shot-stopping", "distribution");
  if (primary.includes("中后卫")) tags.push("aerial-defense", "duel-defense");
  if (primary.includes("后卫") || primary.includes("翼卫")) tags.push("wide-defending", "overlap-support");
  if (primary.includes("中场")) tags.push("press-resistance", "ball-circulation");
  if (primary.includes("边锋")) tags.push("wide-carrying", "transition-runner");
  if (primary.includes("中锋")) tags.push("box-threat", "pressing-forward");
  if (role.includes("核心")) tags.push("core-player");
  return tags;
}

const coachStaff = [
  {
    role_cn: "主教练",
    name_cn: "杰西·马什",
    name_en: "Jesse Marsch",
    tenure: "2024 年起执教加拿大男足",
    source_log: [sources.localProfile, sources.transfermarkt]
  },
  {
    role_cn: "助理教练/专项岗位",
    name_cn: null,
    name_en: null,
    tenure: null,
    source_status: "missing",
    note: "本轮未获得可稳定复核的完整教练组名单，保留缺口。"
  }
];

const commonGaps = [
  "首轮加拿大 1-1 波黑缺少同源完整首发、逐人分钟、助攻、牌和评分，除 Davies 缺阵外未强行补写。",
  "第二轮加拿大 6-0 卡塔尔已同步 David 戴帽、Larin/Saliba 进球与 Kone 伤情；其余逐人分钟和评分缺少稳定来源，保留 null。",
  "国家队 caps/goals、体重和完整生日未在本轮稳定核验，保留 null；后续可由 FIFA/Canada Soccer match centre 或官方 squad PDF 补齐。"
];

const roster = {
  schema_version: "2026-worldcup-roster-v1",
  team: "Canada",
  team_cn: "加拿大",
  group: "B",
  status: "partial_current_stage",
  player_state_update_status: "partial",
  captured_at: capturedAt,
  source_policy: "事实采集；预测文件仅作赛前上下文，不采用预测结论。",
  head_coach: coachStaff[0],
  coaching_staff: coachStaff,
  base_formation: ["4-2-3-1", "4-3-3"],
  team_style_facts: [
    { tag: "高位压迫", evidence: "正式球队档案记录 Jesse Marsch 体系强调压迫与转换。", source_log: [sources.localProfile] },
    { tag: "边路速度", evidence: "球队档案将 Davies、Buchanan、Shaffelburg 等边路推进列为关键事实。", source_log: [sources.localProfile] },
    { tag: "第二轮大胜尾部", evidence: "第二轮 6-0 卡塔尔，David 戴帽且对手两红推动比分扩大。", source_log: [sources.round2Local, sources.guardianRound2] }
  ],
  round1_match_shape: "加拿大 1-1 波黑；本地复盘强调 Davies 缺阵削弱左路推进，比赛被主场动能和波黑经验/定位球路径抵消。",
  round2_match_shape: "加拿大 6-0 卡塔尔；本地复盘记录早段打开局面、红牌和心理崩盘放大比分，Jonathan David 戴帽，Larin、Saliba 进球，Kone 伤情为第三轮前关键变量。",
  round1_player_usage: "完整逐人分钟缺失；Davies 记为未出场，其余待官方技术报告补齐。",
  round2_player_usage: "进球和伤情动态已同步；完整首发/换人/评分仍为 partial。",
  players,
  gaps_and_conflicts: commonGaps,
  source_log: [sources.transfermarkt, sources.localProfile, sources.round1Local, sources.round2Local, sources.guardianRound2, sources.espnSchedule]
};

const playerState = {
  schema_version: "2026-worldcup-player-state-v1",
  team: "Canada",
  team_cn: "加拿大",
  group: "B",
  player_state_update_status: "partial",
  status: "partial_current_stage",
  captured_at: capturedAt,
  update_basis: "B组前两轮本地复盘、Transfermarkt 26人阵容和外部赛后来源；不包含预测或投注结论。",
  second_round_record: "加拿大两轮后 4 分、净胜球 +6；第二轮 6-0 卡塔尔后 Kone 伤情需复核。",
  players: players.map((player) => ({
    squad_number: player.squad_number,
    chinese_name: player.chinese_name,
    english_name: player.english_name,
    club_name_cn: player.club_name_cn,
    primary_position: player.primary_position,
    availability_status: player.availability_status,
    minute_risk: player.minute_risk,
    injury_suspension_note: player.injury_suspension_note,
    round1: player.round1,
    round2: player.round2,
    recent_status_summary: player.form_status_reason,
    form_status_1_5: player.form_status_1_5,
    form_status_reason: player.form_status_reason,
    source_log: player.source_log
  })),
  gaps_and_conflicts: commonGaps,
  source_log: roster.source_log
};

function mdEscape(value) {
  if (value === null || value === undefined || value === "") return "null";
  return String(value).replace(/\|/g, "/");
}

function writeMarkdown() {
  const lines = [];
  lines.push("# 加拿大国家队成员表");
  lines.push("");
  lines.push("status: partial_current_stage  ");
  lines.push(`updated_at: ${capturedAt}  `);
  lines.push("player_state_update_status: partial");
  lines.push("");
  lines.push("## 采集说明");
  lines.push("");
  lines.push("- 本文件只整理加拿大国家队事实数据，不包含比分预测、出线判断或投注建议。");
  lines.push("- Transfermarkt 用于 26 人名单、号码、年龄、俱乐部和身价锚点；本地复盘和 Guardian 用于前两轮动态事实。");
  lines.push("- 首轮/第二轮完整逐人分钟、评分、助攻和牌未稳定核验处保留 null，并在缺口说明中列明。");
  lines.push("");
  lines.push("## 教练与球队事实");
  lines.push("");
  lines.push("- 主教练：杰西·马什（Jesse Marsch），2024 年起执教。");
  lines.push("- 常用阵型：4-2-3-1 / 4-3-3。");
  lines.push("- 风格事实：高位压迫、转换推进、依赖边路速度；第二轮 6-0 卡塔尔体现对低位与少打一人局面的比分放大。");
  lines.push("- 前两轮状态：1-1 波黑、6-0 卡塔尔；Kone 伤情为第三轮前主要可用性变量。");
  lines.push("");
  lines.push("## 26 人成员表");
  lines.push("");
  lines.push("| # | 中文名 | 英文/原文名 | 年龄 | 位置 | 角色 | 惯用脚 | 身高cm | 俱乐部 | 联赛 | 身价EUR | R1 | R2 | 状态值 | 来源 |");
  lines.push("| ---: | --- | --- | ---: | --- | --- | --- | ---: | --- | --- | ---: | --- | --- | ---: | --- |");
  players.forEach((player) => {
    lines.push(`| ${player.squad_number} | ${mdEscape(player.chinese_name)} | ${mdEscape(player.english_name)} | ${player.age} | ${mdEscape(player.primary_position)} | ${mdEscape(player.national_team_role)} | ${mdEscape(player.preferred_foot)} | ${mdEscape(player.height_cm)} | ${mdEscape(player.club_name_cn)} (${mdEscape(player.club_name_en)}) | ${mdEscape(player.league_name_cn)} | ${mdEscape(player.market_value_eur)} | ${mdEscape(player.round1.note)} | ${mdEscape(player.round2.note)} | ${player.form_status_1_5} | Transfermarkt/本地复盘/Guardian |`);
  });
  lines.push("");
  lines.push("## 缺口与冲突");
  lines.push("");
  commonGaps.forEach((gap) => lines.push(`- ${gap}`));
  lines.push("");
  lines.push("## 来源日志");
  lines.push("");
  roster.source_log.forEach((entry) => {
    lines.push(`- ${entry.source}${entry.url ? `：${entry.url}` : ""}；captured_at=${entry.captured_at}；source_status=${entry.source_status}`);
  });
  lines.push("");
  fs.writeFileSync(mdPath, lines.join("\n"), "utf8");
}

fs.mkdirSync(path.dirname(rosterPath), { recursive: true });
fs.mkdirSync(path.dirname(statePath), { recursive: true });
fs.mkdirSync(path.dirname(mdPath), { recursive: true });
fs.writeFileSync(rosterPath, JSON.stringify(roster, null, 2), "utf8");
fs.writeFileSync(statePath, JSON.stringify(playerState, null, 2), "utf8");
writeMarkdown();

if (fs.existsSync(statusPath)) {
  let status = fs.readFileSync(statusPath, "utf8");
  status = status.replace(
    /\| 加拿大 \| canada \| `019ededd-afc1-7e50-a791-f4a4571a59bc` \| [^|]+ \|/u,
    "| 加拿大 | canada | `019ededd-afc1-7e50-a791-f4a4571a59bc` | partial_current_stage |"
  );
  const section = [
    "",
    "## 加拿大进展",
    "",
    `updated_at: ${capturedAt}`,
    "",
    "- 三件套已生成：`canada-roster.json` / `canada-player-state.json` / `队伍\\加拿大\\成员表.md`。",
    "- 26 人名单、中文名、俱乐部中文名和球员级 source_log 已补齐。",
    "- `player_state_update_status=partial`：首轮/第二轮完整逐人分钟、评分、助攻和牌仍需官方技术报告或稳定 match centre 补齐；已同步 Davies 首轮缺阵、David 戴帽、Larin/Saliba 进球和 Kone 伤情。",
    ""
  ].join("\n");
  if (/## 加拿大进展/u.test(status)) {
    status = status.replace(/## 加拿大进展[\s\S]*?(?=\n## |\s*$)/u, section.trimEnd());
  } else {
    status = `${status.trimEnd()}\n${section}`;
  }
  fs.writeFileSync(statusPath, status, "utf8");
}

console.log(JSON.stringify({
  roster_players: players.length,
  player_state_players: playerState.players.length,
  rosterPath,
  statePath,
  mdPath,
  statusPath
}, null, 2));
