const fs = require('fs');
const path = require('path');

const root = 'E:\\worldcup';
const capturedAt = '2026-06-20T22:20:00+08:00';
const sourceSquad = {
  name: 'FourFourTwo - Belgium World Cup 2026 squad',
  url: 'https://www.fourfourtwo.com/team/belgium-world-cup-2026-squad',
  captured_at: capturedAt,
  notes: 'used for 26-player squad, clubs and manager context'
};
const sourceMatch = {
  name: 'The Guardian live report - Belgium 1-1 Egypt, 2026-06-15',
  url: 'https://www.theguardian.com/football/live/2026/jun/15/belgium-v-egypt-world-cup-2026-live',
  captured_at: capturedAt,
  notes: 'used for first-round lineup, substitutions and key events'
};
const sourceLocalProfile = {
  name: '本地正式球队档案',
  url: '队伍\\比利时\\正式球队档案.md',
  captured_at: capturedAt,
  notes: 'used for coach, base structure and local project context'
};
const sourceLocalReview = {
  name: '本地G组第一轮复盘与比利时1-1埃及复盘',
  url: '比赛\\已完成比赛\\小组赛\\G组\\2026-06-15_比利时_1-1_埃及_复盘.md',
  captured_at: capturedAt,
  notes: 'used for player-state update linkage and post-match factual correction'
};

const clubMap = {
  'Real Madrid': ['皇家马德里', 'La Liga', '西甲', '西班牙'],
  'Manchester United': ['曼联', 'Premier League', '英超', '英格兰'],
  'Strasbourg': ['斯特拉斯堡', 'Ligue 1', '法甲', '法国'],
  'Lille': ['里尔', 'Ligue 1', '法甲', '法国'],
  'Fulham': ['富勒姆', 'Premier League', '英超', '英格兰'],
  'Eintracht Frankfurt': ['法兰克福', 'Bundesliga', '德甲', '德国'],
  'Sporting CP': ['葡萄牙体育', 'Primeira Liga', '葡超', '葡萄牙'],
  'Brighton & Hove Albion': ['布莱顿', 'Premier League', '英超', '英格兰'],
  'Club Brugge': ['布鲁日', 'Belgian Pro League', '比甲', '比利时'],
  'Milan': ['AC米兰', 'Serie A', '意甲', '意大利'],
  'Girona': ['吉罗纳', 'La Liga', '西甲', '西班牙'],
  'Napoli': ['那不勒斯', 'Serie A', '意甲', '意大利'],
  'Aston Villa': ['阿斯顿维拉', 'Premier League', '英超', '英格兰'],
  'Atalanta': ['亚特兰大', 'Serie A', '意甲', '意大利'],
  'Rangers': ['格拉斯哥流浪者', 'Scottish Premiership', '苏超', '苏格兰'],
  'Benfica': ['本菲卡', 'Primeira Liga', '葡超', '葡萄牙']
};

const usage = {
  'Thibaut Courtois': [true, 90, '首发门将；33分钟低射扑救，55分钟扑出萨拉赫头球，失1球。', 3.5],
  'Thomas Meunier': [true, 90, '首发右路；66分钟传中制造埃及乌龙。', 3.3],
  'Nathan Ngoy': [true, 90, '首发中卫；13分钟持球推进被犯规，承担高位回追。', 2.8],
  'Brandon Mechele': [true, 90, '首发中卫；82分钟头球制造机会，90分钟关键解围。', 3.4],
  'Timothy Castagne': [true, 90, '首发左/右后卫；15分钟因拉拽萨拉赫吃黄牌。', 2.8],
  'Amadou Onana': [true, 90, '首发后腰；负责中路对抗与二点保护，9分钟被萨拉赫踢到后继续比赛。', 3.0],
  'Youri Tielemans': [true, 90, '首发后腰；62分钟外围凌空偏出，定位球参与进攻。', 3.2],
  'Jeremy Doku': [true, 86, '首发边锋；多次一对一突破，45+1分钟禁区机会打高，86分钟被换下。', 3.2],
  'Kevin De Bruyne': [true, 86, '首发前腰；53分钟任意球中柱，62分钟射正，86分钟被换下。', 3.3],
  'Leandro Trossard': [true, 90, '首发边锋；38分钟门前机会踢空，和德布劳内有配合。', 2.8],
  'Charles De Ketelaere': [true, 66, '首发伪九；12分钟争顶造角球判定被VAR改判，66分钟被卢卡库换下。', 2.8],
  'Romelu Lukaku': [false, 24, '66分钟替补登场，22秒内参与迫使穆罕默德·哈尼乌龙。', 3.6],
  'Hans Vanaken': [false, 4, '86分钟替补登场控制末段二点。', 3.0],
  'Matias Fernandez-Pardo': [false, 4, '86分钟替补登场补充前场冲击。', 3.0]
};

const playersBase = [
  ['Thibaut Courtois', '蒂博·库尔图瓦', 'GK', '门将', 'Real Madrid', '1992-05-11', 34, 200, 96, 'right', '一号门将'],
  ['Senne Lammens', '塞内·拉门斯', 'GK', '门将', 'Manchester United', '2002-07-07', 23, 193, null, null, '替补门将'],
  ['Mike Penders', '迈克·彭德斯', 'GK', '门将', 'Strasbourg', '2005-07-31', 20, 200, null, null, '第三门将'],
  ['Thomas Meunier', '托马斯·穆尼耶', 'RB', '右后卫/翼卫', 'Lille', '1991-09-12', 34, 191, null, 'right', '首发边后卫'],
  ['Timothy Castagne', '蒂莫西·卡斯塔涅', 'FB', '左右后卫', 'Fulham', '1995-12-05', 30, 185, null, 'right', '主力边后卫'],
  ['Arthur Theate', '阿蒂尔·泰特', 'CB', '中卫/左后卫', 'Eintracht Frankfurt', '2000-05-25', 26, 186, null, 'left', '轮换中卫'],
  ['Zeno Debast', '泽诺·德巴斯特', 'CB', '中卫/后腰', 'Sporting CP', '2003-10-24', 22, 191, null, 'right', '轮换中卫'],
  ['Maxim De Cuyper', '马克西姆·德屈佩尔', 'LB', '左后卫/翼卫', 'Brighton & Hove Albion', '2000-12-22', 25, 182, null, 'left', '轮换左后卫'],
  ['Brandon Mechele', '布兰登·梅切勒', 'CB', '中卫', 'Club Brugge', '1993-01-28', 33, 190, null, 'right', '首发中卫'],
  ['Koni De Winter', '科尼·德温特', 'CB', '中卫/右后卫', 'Milan', '2002-06-12', 24, 191, null, 'right', '替补后卫'],
  ['Joaquin Seys', '华金·塞斯', 'FB', '边后卫', 'Club Brugge', null, null, null, null, null, '替补边后卫'],
  ['Nathan Ngoy', '内森·恩戈伊', 'CB', '中卫', 'Lille', '2003-06-10', 23, 185, null, null, '首发中卫'],
  ['Axel Witsel', '阿克塞尔·维特塞尔', 'DM', '后腰/中卫', 'Girona', '1989-01-12', 37, 186, null, 'right', '经验替补'],
  ['Kevin De Bruyne', '凯文·德布劳内', 'AM', '前腰/中前卫', 'Napoli', '1991-06-28', 34, 181, null, 'right', '核心组织者'],
  ['Youri Tielemans', '尤里·蒂勒曼斯', 'CM', '中前卫/后腰', 'Aston Villa', '1997-05-07', 29, 176, null, 'right', '队长/节奏核心'],
  ['Hans Vanaken', '汉斯·瓦纳肯', 'AM', '前腰/中前卫', 'Club Brugge', '1992-08-24', 33, 195, null, 'right', '替补组织点'],
  ['Charles De Ketelaere', '查尔斯·德凯特拉雷', 'AM', '前腰/影锋/中锋', 'Atalanta', '2001-03-10', 25, 192, null, 'left', '前场多面手'],
  ['Amadou Onana', '阿马杜·奥纳纳', 'DM', '后腰/中前卫', 'Aston Villa', '2001-08-16', 24, 195, null, 'right', '主力后腰'],
  ['Nicolas Raskin', '尼古拉斯·拉斯金', 'CM', '中前卫/后腰', 'Rangers', '2001-02-23', 25, 179, null, 'right', '轮换中场'],
  ['Diego Moreira', '迭戈·莫雷拉', 'LW', '边锋/翼卫', 'Strasbourg', '2004-08-06', 21, 179, null, 'left', '替补边路'],
  ['Romelu Lukaku', '罗梅卢·卢卡库', 'ST', '中锋', 'Napoli', '1993-05-13', 33, 191, 93, 'left', '主力中锋/冲击替补'],
  ['Leandro Trossard', '莱安德罗·特罗萨德', 'LW', '左边锋/前腰', 'Arsenal', '1994-12-04', 31, 172, null, 'right', '主力边锋'],
  ['Jeremy Doku', '杰里米·多库', 'RW', '边锋', 'Manchester City', '2002-05-27', 24, 173, null, 'right', '突破核心'],
  ['Dodi Lukebakio', '多迪·卢克巴基奥', 'RW', '右边锋/影锋', 'Benfica', '1997-09-24', 28, 187, null, 'left', '替补边锋'],
  ['Alexis Saelemaekers', '阿莱克西斯·萨勒马克尔斯', 'RW', '右边锋/翼卫', 'Milan', '1999-06-27', 26, 180, null, 'right', '边路轮换'],
  ['Matias Fernandez-Pardo', '马蒂亚斯·费尔南德斯-帕尔多', 'LW', '边锋/前锋', 'Lille', '2005-02-03', 21, 183, null, null, '年轻冲击手']
];
clubMap.Arsenal = ['阿森纳', 'Premier League', '英超', '英格兰'];
clubMap['Manchester City'] = ['曼城', 'Premier League', '英超', '英格兰'];

const technicalTags = {
  GK: ['门线反应', '高球处理', '长传出球'],
  RB: ['边路传中', '防守站位', '后插上'],
  FB: ['双边适配', '边路覆盖', '防守转换'],
  LB: ['左路推进', '传中', '回追'],
  CB: ['空中对抗', '禁区防守', '横向补位'],
  DM: ['拦截', '二点球保护', '出球连接'],
  CM: ['节奏控制', '转移球', '压迫覆盖'],
  AM: ['最后一传', '定位球', '肋部接应'],
  LW: ['内切', '禁区接应', '边路一对一'],
  RW: ['边路一对一', '内切射门', '反击推进'],
  ST: ['背身支点', '禁区冲击', '抢点']
};

function sourceLogFor(name) {
  const logs = [sourceSquad, sourceLocalProfile];
  if (usage[name]) logs.push(sourceMatch, sourceLocalReview);
  return logs;
}

function formReason(name, defaultStatus) {
  if (usage[name]) return usage[name][2] + ' 首轮状态值为模型输入，不构成预测或投注结论。';
  return '首轮未出场或未记录出场；基于名单角色和可用性给中性轮换状态，需后续训练与官方伤停更新。';
}

const players = playersBase.map((p, index) => {
  const [englishName, chineseName, pos, secondary, club, birthDate, age, height, weight, foot, role] = p;
  const [clubCn, league, leagueCn, clubCountryCn] = clubMap[club];
  const u = usage[englishName];
  const form = u ? u[3] : (role.includes('替补') || role.includes('第三') ? 2.5 : 2.8);
  return {
    player_id: `belgium-${String(index + 1).padStart(2, '0')}`,
    chinese_name: chineseName,
    english_name: englishName,
    native_name: englishName,
    squad_number: null,
    squad_number_status: 'missing_in_verified_sources_used',
    birth_date: birthDate,
    age,
    primary_position: pos,
    secondary_positions: secondary,
    role,
    preferred_foot: foot,
    height_cm: height,
    weight_kg: weight,
    club_name: club,
    club_name_cn: clubCn,
    league_name: league,
    league_name_cn: leagueCn,
    club_country_cn: clubCountryCn,
    market_value_eur: null,
    market_value_source: null,
    market_value_captured_at: capturedAt,
    national_team_caps: null,
    national_team_goals: null,
    availability: 'available',
    injury_status: 'none_confirmed_in_sources_used',
    suspension_status: 'none_confirmed_in_sources_used',
    minute_risk: u ? (u[1] >= 86 ? 'normal_workload_after_round1' : 'managed_or_rotation') : 'selection_depth_or_rotation',
    round1: {
      opponent: 'Egypt',
      result: 'Belgium 1-1 Egypt',
      starter: Boolean(u && u[0]),
      minutes: u ? u[1] : 0,
      goals: 0,
      assists: 0,
      cards: englishName === 'Timothy Castagne' ? { yellow: 1, red: 0 } : { yellow: 0, red: 0 },
      rating: null,
      rating_source: null,
      key_stats_note: u ? u[2] : '未出场或未在Guardian逐分钟记录中有出场事件。'
    },
    form_status_1_5: form,
    form_status_reason: formReason(englishName, form),
    technical_tags: technicalTags[pos] || ['位置适配', '轮换深度'],
    confidence: {
      roster_and_club: 'confirmed_by_secondary_source',
      shirt_number: 'missing',
      market_value: 'missing',
      round1_usage: u ? 'confirmed_by_live_report' : 'confirmed_as_bench_or_unused_from_live_report_when_listed'
    },
    source_log: sourceLogFor(englishName)
  };
});

const roster = {
  schema_version: 'worldcup-data-collector/roster-v1',
  team: {
    team_id: 'belgium',
    fifa_name: 'Belgium',
    team_name_cn: '比利时',
    group: 'G',
    confederation: 'UEFA',
    captured_at: capturedAt
  },
  status: 'complete_minimum_verified_closure',
  captured_at: capturedAt,
  source_summary: [sourceSquad, sourceMatch, sourceLocalProfile, sourceLocalReview],
  coaches_and_staff: [
    {
      role: 'head_coach',
      chinese_name: '鲁迪·加西亚',
      english_name: 'Rudi Garcia',
      tenure_start: '2025-01',
      status: 'confirmed',
      source_log: [sourceSquad, sourceLocalProfile]
    },
    {
      role: 'assistant_coach',
      chinese_name: null,
      english_name: null,
      tenure_start: null,
      status: 'missing',
      notes: '本轮最小闭环未找到可稳定核验的官方助教名单。',
      source_log: [sourceLocalProfile]
    },
    {
      role: 'goalkeeper_coach',
      chinese_name: null,
      english_name: null,
      tenure_start: null,
      status: 'missing',
      notes: '本轮最小闭环未找到可稳定核验的官方门将教练名单。',
      source_log: [sourceLocalProfile]
    },
    {
      role: 'fitness_medical_analysis',
      chinese_name: null,
      english_name: null,
      tenure_start: null,
      status: 'missing',
      notes: '体能、医疗和分析岗位公开来源不足，等待官方队务页补核。',
      source_log: [sourceLocalProfile]
    }
  ],
  tactical_facts: {
    base_formation: '4-2-3-1 / 4-3-3',
    common_shape_note: '本地档案记录加西亚常用4-2-3-1/4-3-3；首轮Guardian队新闻列为4-2-3-1。',
    team_style_facts: [
      '首轮比利时控球更多，但上半场没有射正，深防破局效率不足。',
      '德布劳内承担定位球和最后一传，53分钟任意球击中门柱。',
      '多库是主要一对一推进点，埃及多次对其包夹。',
      '卢卡库替补登场后立即参与制造乌龙，说明中锋支点仍是关键变化手段。',
      '埃及通过萨拉赫和马尔穆什反击多次制造威胁，比利时转身回追和禁区保护存在压力。'
    ],
    round1_match_shape: 'Belgium 4-2-3-1: Courtois; Meunier, Ngoy, Mechele, Castagne; Onana, Tielemans; Doku, De Bruyne, Trossard; De Ketelaere. Lukaku 66分钟替补登场，Vanaken与Fernandez-Pardo 86分钟登场。',
    round1_player_usage: '11人首发；Lukaku替补制造进球链，Vanaken和Fernandez-Pardo末段登场；其余替补未在Guardian逐分钟确认出场。',
    player_state_update_status: 'updated_from_round1_review_and_guardian_live_log'
  },
  players,
  gaps_and_conflicts: [
    '球衣号码未在本轮已核验来源中稳定取得，统一置为null并标记missing_in_verified_sources_used。',
    '市场身价未抓取Transfermarkt动态页，统一置为null，后续可由主线程批量补核。',
    '身高、体重、惯用脚、生日和年龄仅作基础资料整理；个别年轻球员字段为null，需官方/FIFA资料页复核。',
    'Guardian队新闻的比利时后卫行存在Ngoy重复排版，本文件按4-2-3-1结构记录为Meunier-Ngoy-Mechele-Castagne，并保留来源说明。',
    '多源赛后评分未稳定取得，round1.rating统一置为null。'
  ]
};

const playerState = {
  schema_version: 'worldcup-data-collector/player-state-v1',
  team_id: 'belgium',
  team_name_cn: '比利时',
  group: 'G',
  captured_at: capturedAt,
  player_state_update_status: 'updated_from_round1_review_and_guardian_live_log',
  source_summary: [sourceSquad, sourceMatch, sourceLocalReview],
  players: players.map((p) => ({
    player_id: p.player_id,
    chinese_name: p.chinese_name,
    english_name: p.english_name,
    club_name_cn: p.club_name_cn,
    primary_position: p.primary_position,
    availability: p.availability,
    injury_status: p.injury_status,
    suspension_status: p.suspension_status,
    minute_risk: p.minute_risk,
    round1: p.round1,
    form_status_1_5: p.form_status_1_5,
    form_status_reason: p.form_status_reason,
    technical_tags: p.technical_tags,
    source_log: p.source_log
  })),
  notes: [
    '比利时1-1埃及复盘事实已同步进player_state和成员表。',
    '状态值为后续模型输入，不是比赛预测、胜平负判断或投注建议。',
    '球衣号码、身价、caps/goals和评分在本轮最小闭环中未稳定核验，保留null。'
  ]
};

function dash(v) {
  return v === null || v === undefined || v === '' ? 'null' : String(v);
}

const mdLines = [];
mdLines.push('# 比利时国家队成员表');
mdLines.push('');
mdLines.push(`captured_at: ${capturedAt}`);
mdLines.push('player_state_update_status: updated_from_round1_review_and_guardian_live_log');
mdLines.push('');
mdLines.push('## 来源摘要');
mdLines.push('');
mdLines.push('- FourFourTwo：26人名单、俱乐部与主教练背景。');
mdLines.push('- Guardian：2026-06-15 比利时 1-1 埃及首轮队新闻、关键事件与换人。');
mdLines.push('- 本地正式球队档案与G组复盘：项目内事实联动和首轮状态修正。');
mdLines.push('');
mdLines.push('## 教练与球队事实');
mdLines.push('');
mdLines.push('- 主教练：鲁迪·加西亚 / Rudi Garcia，2025-01上任。');
mdLines.push('- 常用阵型：4-2-3-1 / 4-3-3；首轮按Guardian队新闻为4-2-3-1。');
mdLines.push('- 首轮形态：德凯特拉雷首发伪九，卢卡库66分钟替补登场后参与制造乌龙，Vanaken与Fernandez-Pardo在86分钟登场。');
mdLines.push('- 事实标签：控球占优但上半场无射正；多库为主要突破点；德布劳内负责定位球和最后一传；转身回追与反击保护被埃及多次检验。');
mdLines.push('');
mdLines.push('## 26人中文成员表');
mdLines.push('');
mdLines.push('| # | 中文名 | 英文/原文名 | 号码 | 年龄 | 主位置 | 可客串位置 | 角色 | 惯用脚 | 身高/体重 | 俱乐部 | 联赛 | 国家 | 身价 | 首轮首发/分钟 | 首轮事件 | 状态值 | 来源 |');
mdLines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
players.forEach((p, i) => {
  const htWt = `${dash(p.height_cm)}cm/${dash(p.weight_kg)}kg`;
  const firstRound = `${p.round1.starter ? '是' : '否'}/${p.round1.minutes}`;
  const sources = p.source_log.map((s) => s.name.replace(/\|/g, '/')).join('；');
  mdLines.push(`| ${i + 1} | ${p.chinese_name} | ${p.english_name} | ${dash(p.squad_number)} | ${dash(p.age)} | ${p.primary_position} | ${p.secondary_positions} | ${p.role} | ${dash(p.preferred_foot)} | ${htWt} | ${p.club_name_cn} (${p.club_name}) | ${p.league_name_cn} (${p.league_name}) | ${p.club_country_cn} | ${dash(p.market_value_eur)} | ${firstRound} | ${p.round1.key_stats_note} | ${p.form_status_1_5} | ${sources} |`);
});
mdLines.push('');
mdLines.push('## 缺口与冲突');
mdLines.push('');
roster.gaps_and_conflicts.forEach((item) => mdLines.push(`- ${item}`));
mdLines.push('');
mdLines.push('## 声明');
mdLines.push('');
mdLines.push('- 本文件只做事实采集与结构化，不包含预测、胜平负判断或竞彩建议。');

fs.writeFileSync(path.join(root, 'data\\packets\\rosters\\belgium-roster.json'), JSON.stringify(roster, null, 2), 'utf8');
fs.writeFileSync(path.join(root, 'data\\outputs\\player_state\\belgium-player-state.json'), JSON.stringify(playerState, null, 2), 'utf8');
fs.writeFileSync(path.join(root, '队伍\\比利时\\成员表.md'), mdLines.join('\r\n') + '\r\n', 'utf8');

const summaryPath = path.join(root, '汇总\\G组成员表建设状态.md');
let summary = fs.readFileSync(summaryPath, 'utf8');
summary = summary.replace(/updated_at: .*/, `updated_at: ${capturedAt}`);
summary = summary.replace(/## 比利时[\s\S]*?(?=\r?\n## 埃及)/, `## 比利时\r\n\r\n- status: complete_minimum_verified_closure\r\n- files:\r\n  - \`data\\packets\\rosters\\belgium-roster.json\`\r\n  - \`data\\outputs\\player_state\\belgium-player-state.json\`\r\n  - \`队伍\\比利时\\成员表.md\`\r\n- validation: pending_local_self_check\r\n- player_state_update_status: updated_from_round1_review_and_guardian_live_log\r\n`);
fs.writeFileSync(summaryPath, summary, 'utf8');
