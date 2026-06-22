const fs = require('fs');
const path = require('path');

const root = 'E:\\worldcup';
const capturedAt = '2026-06-20T22:35:00+08:00';

const sources = {
  elPais: {
    source: 'El País - Spain 2026 World Cup squad announcement',
    url: 'https://elpais.com/deportes/mundial-futbol/2026-05-25/convocatoria-de-espana-para-el-mundial-luis-de-la-fuente-desvela-la-lista-de-26-futbolistas-de-la-seleccion-espanola.html',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['final_squad', 'coach_comments', 'fitness_context'],
    source_status: 'confirmed'
  },
  cadenaSer: {
    source: 'Cadena SER - RFEF official shirt numbers for Spain World Cup 2026',
    url: 'https://cadenaser.com/nacional/2026/06/01/estos-son-los-dorsales-de-los-26-de-luis-de-la-fuente-para-disputar-el-mundial-2026-de-estados-unidos-mexico-y-canada-cadena-ser/',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['squad_number', 'final_squad'],
    source_status: 'confirmed'
  },
  transfermarkt: {
    source: 'Transfermarkt - Spain detailed squad 2026',
    url: 'https://www.transfermarkt.com/spanien/kader/verein/3375',
    captured_at: capturedAt,
    reliability_tier: 4,
    supports_fields: ['club', 'age', 'market_value', 'position', 'squad_size', 'fifa_ranking'],
    source_status: 'confirmed'
  },
  guardian: {
    source: 'The Guardian live report - Spain 0-0 Cape Verde, 2026-06-15',
    url: 'https://www.theguardian.com/football/live/2026/jun/15/spain-v-cape-verde-world-cup-2026-live',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['round1_lineup', 'substitutions', 'cards', 'match_events'],
    source_status: 'confirmed'
  },
  sbnation: {
    source: 'SB Nation - Cape Verde held Spain 0-0, stats summary',
    url: 'https://www.sbnation.com/soccer/1118608/cabo-verde-spain-world-cup',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['round1_possession', 'shots_on_target', 'xg_summary'],
    source_status: 'confirmed'
  },
  localReview: {
    source: '本地H组首轮复盘',
    url: '比赛\\已完成比赛\\小组赛\\H组\\2026-06-15_西班牙_0-0_佛得角_复盘.md',
    captured_at: capturedAt,
    reliability_tier: 2,
    supports_fields: ['postmatch_model_context', 'round1_state_adjustment'],
    source_status: 'confirmed'
  },
  localProfile: {
    source: '本地西班牙正式球队档案',
    url: '队伍\\西班牙\\正式球队档案.md',
    captured_at: capturedAt,
    reliability_tier: 2,
    supports_fields: ['coach', 'base_formation', 'style_facts'],
    source_status: 'confirmed'
  }
};

const clubMap = {
  'FC Barcelona': ['巴塞罗那', 'La Liga', '西甲', '西班牙'],
  'Arsenal FC': ['阿森纳', 'Premier League', '英超', '英格兰'],
  'Athletic Bilbao': ['毕尔巴鄂竞技', 'La Liga', '西甲', '西班牙'],
  'Atlético de Madrid': ['马德里竞技', 'La Liga', '西甲', '西班牙'],
  'Chelsea FC': ['切尔西', 'Premier League', '英超', '英格兰'],
  'Bayer 04 Leverkusen': ['勒沃库森', 'Bundesliga', '德甲', '德国'],
  'Tottenham Hotspur': ['托特纳姆热刺', 'Premier League', '英超', '英格兰'],
  'Manchester City': ['曼城', 'Premier League', '英超', '英格兰'],
  'Paris Saint-Germain': ['巴黎圣日耳曼', 'Ligue 1', '法甲', '法国'],
  'CA Osasuna': ['奥萨苏纳', 'La Liga', '西甲', '西班牙'],
  'Crystal Palace': ['水晶宫', 'Premier League', '英超', '英格兰'],
  'Real Sociedad': ['皇家社会', 'La Liga', '西甲', '西班牙'],
  'Celta de Vigo': ['塞尔塔', 'La Liga', '西甲', '西班牙']
};

const usage = {
  'Unai Simón': { starter: true, minutes: 90, note: '首发门将；90分钟面对Borges头球机会完成正面处理，零封但进攻端无法兑现。' },
  'Marcos Llorente': { starter: true, minutes: 90, note: '首发右后卫；保持右路宽度，但身后空间在开局被Cape Verde尝试利用。' },
  'Aymeric Laporte': { starter: true, minutes: 90, note: '首发中卫；58分钟远射打高，防线转身速度被赛前报道列为Cape Verde可攻击点。' },
  'Pau Cubarsí': { starter: true, minutes: 90, note: '首发中卫；参与后场控球推进，面对低位反击保持基础防守。' },
  'Marc Cucurella': { starter: true, minutes: 90, note: '首发左后卫；83分钟后点头球被Vozinha没收，持续压上。' },
  'Rodri': { starter: true, minutes: 87, subbed_off: 87, note: '首发后腰；86分钟左脚远射高出，87分钟被Nico Williams换下。' },
  'Pedri': { starter: true, minutes: 90, cards: { yellow: 1, red: 0 }, note: '首发中场；12分钟传中制造Oyarzabal机会，56分钟送出头球机会，90+3分钟战术犯规吃黄牌。' },
  'Fabián Ruiz': { starter: true, minutes: 71, subbed_off: 71, note: '首发中场；51分钟射门偏高，56分钟头球被Vozinha没收，71分钟被Mikel Merino换下。' },
  'Ferran Torres': { starter: true, minutes: 81, subbed_off: 81, note: '首发右路；59分钟传中被门将出击化解，81分钟被Dani Olmo换下。' },
  'Mikel Oyarzabal': { starter: true, minutes: 90, note: '首发中锋；12分钟和48分钟两次接Pedri传中，88分钟射门被Pico Lopes封堵。' },
  'Gavi': { starter: true, minutes: 71, subbed_off: 71, note: '首发左路/前场；替代Yamal/Williams首发，71分钟被Lamine Yamal换下。' },
  'Lamine Yamal': { starter: false, minutes: 19, subbed_on: 71, note: '71分钟替补登场；73分钟制造回做给Llorente和Merino的机会，90+5分钟传中造成角球。' },
  'Mikel Merino': { starter: false, minutes: 19, subbed_on: 71, note: '71分钟替补登场；73分钟禁区附近射门处理不佳，83分钟前点摆渡。' },
  'Dani Olmo': { starter: false, minutes: 9, subbed_on: 81, note: '81分钟替补登场；88分钟禁区内回扫制造Oyarzabal射门。' },
  'Nico Williams': { starter: false, minutes: 3, subbed_on: 87, note: '87分钟替补登场，作为最后阶段边路冲击手。' }
};

const playersBase = [
  [1, 'David Raya', '大卫·拉亚', 'GK', '门将', 'Arsenal FC', 30, 30000000, 183, 'right', '轮换门将'],
  [2, 'Marc Pubill', '马克·普比尔', 'CB/RB', '中卫/右后卫', 'Atlético de Madrid', 23, 35000000, 190, 'right', '后防新入选轮换'],
  [3, 'Alejandro Grimaldo', '亚历杭德罗·格里马尔多', 'LB', '左后卫/翼卫', 'Bayer 04 Leverkusen', 30, 20000000, 171, 'left', '替补左路传中点'],
  [4, 'Eric García', '埃里克·加西亚', 'CB', '中卫/后腰', 'FC Barcelona', 25, 40000000, 182, 'right', '后防轮换'],
  [5, 'Marcos Llorente', '马科斯·略伦特', 'RB/CM', '右后卫/中场', 'Atlético de Madrid', 31, 20000000, 184, 'right', '首发右后卫'],
  [6, 'Mikel Merino', '米克尔·梅里诺', 'CM', '中前卫/后腰', 'Arsenal FC', 29, 25000000, 189, 'left', '替补中场高度与后插上'],
  [7, 'Ferran Torres', '费兰·托雷斯', 'RW/ST', '右边锋/中锋', 'FC Barcelona', 26, 50000000, 184, 'right', '首发边锋/锋线轮换'],
  [8, 'Fabián Ruiz', '法比安·鲁伊斯', 'CM', '中前卫/左中场', 'Paris Saint-Germain', 30, 30000000, 189, 'left', '首发中场连接'],
  [9, 'Gavi', '加维', 'CM/LW', '中前卫/左路', 'FC Barcelona', 21, 30000000, 173, 'right', '首发前场压迫与肋部冲击'],
  [10, 'Dani Olmo', '达尼·奥尔莫', 'AM', '前腰/边锋', 'FC Barcelona', 28, 60000000, 179, 'right', '前场创造力替补/主力竞争'],
  [11, 'Yéremy Pino', '耶雷米·皮诺', 'RW/LW', '边锋', 'Crystal Palace', 23, 30000000, 172, 'right', '边路轮换'],
  [12, 'Pedro Porro', '佩德罗·波罗', 'RB', '右后卫/翼卫', 'Tottenham Hotspur', 26, 35000000, 173, 'right', '右路轮换'],
  [13, 'Joan García', '霍安·加西亚', 'GK', '门将', 'FC Barcelona', 25, 45000000, 191, 'right', '替补门将'],
  [14, 'Aymeric Laporte', '艾梅里克·拉波尔特', 'CB', '中卫', 'Athletic Bilbao', 32, 8000000, 189, 'left', '首发中卫'],
  [15, 'Álex Baena', '亚历克斯·巴埃纳', 'LW/AM', '左边锋/前腰', 'Atlético de Madrid', 24, 40000000, 174, 'right', '前场轮换'],
  [16, 'Rodri', '罗德里', 'DM', '后腰', 'Manchester City', 29, 50000000, 191, 'right', '中场控制核心'],
  [17, 'Nico Williams', '尼科·威廉姆斯', 'LW', '左边锋', 'Athletic Bilbao', 23, 40000000, 181, 'right', '边路爆点/管理负荷'],
  [18, 'Martín Zubimendi', '马丁·祖比门迪', 'DM', '后腰/中前卫', 'Arsenal FC', 27, 75000000, 181, 'right', '后腰轮换'],
  [19, 'Lamine Yamal', '拉明·亚马尔', 'RW', '右边锋', 'FC Barcelona', 18, 200000000, 180, 'left', '右路爆点/管理负荷'],
  [20, 'Pedri', '佩德里', 'CM/AM', '中前卫/前腰', 'FC Barcelona', 23, 150000000, 174, 'right', '肋部组织核心'],
  [21, 'Mikel Oyarzabal', '米克尔·奥亚萨瓦尔', 'ST/LW', '中锋/左边锋', 'Real Sociedad', 29, 25000000, 181, 'left', '首发中锋/压迫支点'],
  [22, 'Pau Cubarsí', '保·库巴西', 'CB', '中卫', 'FC Barcelona', 19, 80000000, 184, 'right', '首发中卫'],
  [23, 'Unai Simón', '乌奈·西蒙', 'GK', '门将', 'Athletic Bilbao', 29, 22000000, 190, 'right', '首发门将'],
  [24, 'Marc Cucurella', '马克·库库雷利亚', 'LB', '左后卫', 'Chelsea FC', 27, 50000000, 173, 'left', '首发左后卫'],
  [25, 'Víctor Muñoz', '维克托·穆尼奥斯', 'LW', '左边锋/前锋', 'CA Osasuna', 22, 30000000, 176, null, '年轻前场轮换'],
  [26, 'Borja Iglesias', '博尔哈·伊格莱西亚斯', 'ST', '中锋', 'Celta de Vigo', 33, 2800000, 187, 'right', '替补中锋']
];

const tagsByPosition = {
  GK: ['门线反应', '出球', '高球处理'],
  'CB/RB': ['防线多面性', '右路补位', '空中对抗'],
  LB: ['边路推进', '传中', '反抢回位'],
  CB: ['出球', '禁区防守', '高位站位'],
  'RB/CM': ['右路推进', '中场覆盖', '反抢'],
  CM: ['后插上', '二点球', '空中对抗'],
  'RW/ST': ['无球跑动', '禁区接应', '边路冲击'],
  'CM/LW': ['压迫', '肋部冲击', '反抢'],
  AM: ['肋部创造', '最后一传', '二线射门'],
  'RW/LW': ['边路一对一', '反击推进', '换边适配'],
  RB: ['传中', '套边', '右路对抗'],
  'LW/AM': ['定位球', '边中切换', '最后一传'],
  DM: ['控场', '反抢保护', '出球轴心'],
  LW: ['纵深', '一对一', '左路宽度'],
  RW: ['内切', '一对一', '弱侧转移'],
  'CM/AM': ['肋部组织', '节奏变化', '最后一传'],
  'ST/LW': ['前点抢点', '压迫', '背身接应'],
  ST: ['中锋支点', '禁区终结', '高球争顶']
};

function baseSources(name) {
  const list = [sources.elPais, sources.cadenaSer, sources.transfermarkt];
  if (usage[name]) list.push(sources.guardian, sources.sbnation, sources.localReview);
  return list;
}

function statusFor(name, role) {
  if (name === 'Lamine Yamal' || name === 'Nico Williams') {
    return {
      availability: 'probable',
      injury_status: 'recent_muscle_issue_managed',
      minute_risk: 'managed_minutes_after_muscle_context',
      note: 'El País记录两人赛前有肌肉问题但预计可赶上首战；Guardian显示首轮替补出场，按管理负荷处理。'
    };
  }
  return {
    availability: 'available',
    injury_status: 'none_confirmed_in_sources_used',
    minute_risk: usage[name] && usage[name].minutes >= 87 ? 'normal_after_full_or_near_full_round1' : (usage[name] ? 'rotation_or_managed_after_round1' : 'unused_depth_or_rotation'),
    note: '本轮已核验来源未显示明确伤停或停赛。'
  };
}

function formFor(name, role) {
  if (name === 'Pedri') return [3.4, '首轮最像破局点之一，多次传中与组织制造机会，但90+3分钟吃黄且球队0进球。'];
  if (name === 'Lamine Yamal') return [3.2, '替补后提升右路威胁，但仍处管理负荷，首轮没有转化为进球。'];
  if (name === 'Nico Williams') return [2.8, '因赛前肌肉问题首轮只踢末段，冲击力仍重要但分钟风险存在。'];
  if (name === 'Rodri') return [3.0, '控制底座仍在，但球队节奏与低位拆解不足，87分钟被换下。'];
  if (name === 'Mikel Oyarzabal') return [2.8, '多次接到传中与关键射门机会但未破门，低位抢点效率待修正。'];
  if (name === 'Ferran Torres' || name === 'Gavi' || name === 'Fabián Ruiz') return [2.7, '首发但边路/肋部破局效率不足，未能替代Yamal/Williams提供足够宽度和锐度。'];
  if (usage[name]) return [3.0, '首轮完成既定职责但球队0-0反映低位破局不足。'];
  if (role.includes('首发') || role.includes('核心')) return [3.0, '未在首轮登场或未首发，状态按可用性与角色给中性模型输入。'];
  return [2.6, '首轮未出场，当前主要作为轮换/深度，需第二轮前训练和官方名单复核。'];
}

const players = playersBase.map((row, index) => {
  const [number, englishName, chineseName, pos, secondary, club, age, marketValue, height, foot, role] = row;
  const clubInfo = clubMap[club];
  const round = usage[englishName] || { starter: false, minutes: 0, note: '首轮未在Guardian首发或换人记录中出场。' };
  const availability = statusFor(englishName, role);
  const [form, reason] = formFor(englishName, role);
  return {
    player_id: `spain-${String(index + 1).padStart(2, '0')}`,
    chinese_name: chineseName,
    english_name: englishName,
    native_name: englishName,
    squad_number: number,
    age,
    birth_date: null,
    primary_position: pos,
    secondary_positions: secondary,
    role,
    preferred_foot: foot,
    height_cm: height,
    weight_kg: null,
    club_name: club,
    club_name_cn: clubInfo[0],
    league_name: clubInfo[1],
    league_name_cn: clubInfo[2],
    club_country_cn: clubInfo[3],
    market_value_eur: marketValue,
    market_value_source: sources.transfermarkt.url,
    market_value_captured_at: capturedAt,
    national_team_caps: null,
    national_team_goals: null,
    availability: availability.availability,
    injury_status: availability.injury_status,
    suspension_status: 'none_confirmed_in_sources_used',
    minute_risk: availability.minute_risk,
    availability_note: availability.note,
    round1: {
      match: 'Spain 0-0 Cape Verde',
      opponent: 'Cape Verde',
      starter: round.starter,
      minutes: round.minutes,
      subbed_on: round.subbed_on || null,
      subbed_off: round.subbed_off || null,
      goals: 0,
      assists: 0,
      cards: round.cards || { yellow: 0, red: 0 },
      rating: null,
      rating_source: null,
      rating_note: '本轮未稳定取得同源全队赛后评分，保留null。',
      key_stats_note: round.note
    },
    recent_status_note: reason,
    form_status_1_5: form,
    form_status_reason: `${reason} 状态值仅供模型输入，不是预测或投注结论。`,
    technical_tags: tagsByPosition[pos] || ['位置适配', '轮换深度'],
    source_status: {
      roster: 'confirmed',
      club_age_market: 'confirmed',
      height_preferred_foot: foot && height ? 'probable_from_public_player_profiles_not_rechecked_individually' : 'uncertain_or_missing',
      round1_usage: usage[englishName] ? 'confirmed' : 'confirmed_unused_or_not_listed_as_subbed_on'
    },
    source_log: baseSources(englishName)
  };
});

const teamStyleFacts = [
  '本地档案和Guardian均指向4-3-3底盘，Rodri/Pedri/Fabián为首轮中场组合。',
  '首轮西班牙长时间控球并持续压制，但面对Cape Verde低位/五后卫化防守，宽度、节奏和禁区内人数不足。',
  'SB Nation记录Spain约74%控球、7次射正、xG 2.29；本地复盘记录27次射门和734次传球但0进球。',
  'Guardian记录Lamine Yamal和Nico Williams因伤病恢复/保护没有首发，Ferran Torres与Gavi顶替首发边路。',
  '首轮反映过程优势与结果兑现分离，低位破局效率需要在后续模型中下修。'
];

const roster = {
  schema_version: 'worldcup-data-collector/roster-v1',
  phase: 'team_profile',
  team: {
    team_id: 'spain',
    fifa_name: 'Spain',
    team_name_cn: '西班牙',
    group: 'H',
    confederation: 'UEFA',
    fifa_ranking: 2,
    captured_at: capturedAt
  },
  status: 'complete',
  created_at: capturedAt,
  updated_at: capturedAt,
  captured_at: capturedAt,
  owner: 'worldcup-data-collector',
  scope: 'H组西班牙国家队成员表数据采集；不处理沙特、乌拉圭、佛得角；不做预测或竞彩建议。',
  source_log: Object.values(sources),
  coaches_and_staff: [
    {
      role: 'head_coach',
      chinese_name: '路易斯·德拉富恩特',
      english_name: 'Luis de la Fuente',
      tenure_start: '2022-12',
      source_status: 'confirmed',
      source_log: [sources.elPais, sources.localProfile]
    },
    {
      role: 'assistant_coach',
      chinese_name: null,
      english_name: null,
      source_status: 'missing',
      notes: '本轮最小闭环未稳定核验西班牙官方完整助教名单。',
      source_log: [sources.localProfile]
    },
    {
      role: 'goalkeeper_coach',
      chinese_name: null,
      english_name: null,
      source_status: 'missing',
      notes: '本轮最小闭环未稳定核验门将教练公开名单。',
      source_log: [sources.localProfile]
    },
    {
      role: 'fitness_medical_analysis',
      chinese_name: null,
      english_name: null,
      source_status: 'missing',
      notes: '体能、医疗和分析岗位需官方队务页后续补核。',
      source_log: [sources.localProfile]
    }
  ],
  team_context: {
    base_formation: '4-3-3',
    common_shape_note: '首轮Guardian列为Spain 4-3-3：Simón; Llorente, Laporte, Cubarsí, Cucurella; Rodri, Pedri, Fabian Ruiz; Torres, Oyarzabal, Gavi。',
    team_style_facts: teamStyleFacts,
    round1_match_shape: '4-3-3控球压制，Ferran Torres与Gavi顶替Yamal/Williams首发，Oyarzabal居中；71分钟Yamal和Merino替补，81分钟Olmo替补，87分钟Nico Williams替补。',
    round1_player_usage: '11名首发；4名替补出场；全队0进球0助攻，Pedri吃黄；未取得稳定全队评分源。',
    round2_availability_note: '第二轮前公开输入未显示新增停赛；Yamal和Nico Williams仍按赛前肌肉问题后的管理负荷处理。',
    player_state_update_status: 'updated'
  },
  players,
  gaps_and_conflicts: [
    '本轮未稳定取得FIFA官方球员逐人页面，名单以El País、Cadena SER、Transfermarkt交叉确认。',
    '身高和惯用脚为公开球员资料常见值，但未逐人打开官方/FIFA页面复核；个别字段标记probable或uncertain。',
    '体重、生日、国家队caps/goals未在本轮来源中稳定批量核验，统一保留null。',
    '多源同口径赛后评分未取得，所有round1.rating保留null并写明缺口。',
    'Transfermarkt列Marc Cucurella俱乐部为Chelsea；FourFourTwo称其已确认转会Real Madrid但小组赛后才成为西班牙名单中的皇马球员，当前俱乐部字段保留Transfermarkt采集值并在冲突中记录。'
  ]
};

const playerState = {
  schema_version: 'worldcup-data-collector/player-state-v1',
  phase: 'player_state',
  team_id: 'spain',
  team_name_cn: '西班牙',
  group: 'H',
  status: 'complete',
  player_state_update_status: 'updated',
  created_at: capturedAt,
  updated_at: capturedAt,
  captured_at: capturedAt,
  source_log: [sources.guardian, sources.sbnation, sources.localReview, sources.elPais, sources.transfermarkt],
  round1_summary: {
    match: 'Spain 0-0 Cape Verde',
    style_fact: '控球和射门优势未转化为进球，低位破局稳定性下调。',
    player_state_update_status: 'updated'
  },
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
    availability_note: p.availability_note,
    round1: p.round1,
    recent_status_note: p.recent_status_note,
    form_status_1_5: p.form_status_1_5,
    form_status_reason: p.form_status_reason,
    technical_tags: p.technical_tags,
    source_log: p.source_log
  })),
  gaps_and_conflicts: roster.gaps_and_conflicts
};

function fmt(v) {
  return v === null || v === undefined || v === '' ? 'null' : String(v);
}

function money(v) {
  return v === null || v === undefined ? 'null' : `€${(v / 1000000).toFixed(v >= 10000000 ? 0 : 1)}m`;
}

const md = [];
md.push('# 西班牙国家队成员表');
md.push('');
md.push('phase: team_profile  ');
md.push('status: complete  ');
md.push(`captured_at: ${capturedAt}  `);
md.push('player_state_update_status: updated  ');
md.push('scope: H组西班牙国家队成员表数据采集；不处理同组其他队，不做预测或竞彩建议。');
md.push('');
md.push('## 来源摘要');
md.push('');
md.push('- El País：26人名单、主教练说明、Yamal/Nico Williams赛前肌肉问题与首战可用性背景。');
md.push('- Cadena SER：RFEF公布的26人号码。');
md.push('- Transfermarkt：2026西班牙26人阵容、年龄、俱乐部、位置、身价、FIFA排名与总身价。');
md.push('- Guardian：2026-06-15 西班牙0-0佛得角首发、替补、黄牌和关键事件。');
md.push('- SB Nation与本地复盘：首轮控球、射门/xG和低位破局事实修正。');
md.push('');
md.push('## 教练与球队事实');
md.push('');
md.push('- 主教练：路易斯·德拉富恩特 / Luis de la Fuente，2022-12接手成年队。');
md.push('- 基础阵型：4-3-3；首轮为Simón; Llorente, Laporte, Cubarsí, Cucurella; Rodri, Pedri, Fabián Ruiz; Ferran Torres, Oyarzabal, Gavi。');
md.push('- 首轮风格：高控球、高射门量、低位破局效率不足；Yamal、Merino、Olmo、Nico Williams替补改变宽度和禁区高度。');
md.push('- 第二轮前可用性备注：未发现新增停赛；Yamal与Nico Williams按肌肉问题恢复后的分钟管理处理。');
md.push('');
md.push('## 26人中文成员表');
md.push('');
md.push('| # | 中文名 | 英文/原文名 | 年龄 | 主位置 | 可客串位置 | 角色定位 | 惯用脚 | 身高/体重 | 俱乐部 | 联赛 | 俱乐部国家 | 身价 | 可用性/风险 | 首轮首发/分钟 | 首轮事件 | 状态值 | 来源 |');
md.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
players.forEach((p) => {
  const sourceNames = p.source_log.map((s) => s.source.replace(/\|/g, '/')).join('；');
  md.push(`| ${p.squad_number} | ${p.chinese_name} | ${p.english_name} | ${p.age} | ${p.primary_position} | ${p.secondary_positions} | ${p.role} | ${fmt(p.preferred_foot)} | ${fmt(p.height_cm)}cm/${fmt(p.weight_kg)}kg | ${p.club_name_cn} (${p.club_name}) | ${p.league_name_cn} (${p.league_name}) | ${p.club_country_cn} | ${money(p.market_value_eur)} | ${p.availability}/${p.minute_risk} | ${p.round1.starter ? '是' : '否'}/${p.round1.minutes} | ${p.round1.key_stats_note} | ${p.form_status_1_5} | ${sourceNames} |`);
});
md.push('');
md.push('## 缺口与冲突');
md.push('');
roster.gaps_and_conflicts.forEach((item) => md.push(`- ${item}`));
md.push('');
md.push('## 声明');
md.push('');
md.push('- 本文件只做事实采集与结构化，不包含比分预测、出线预测或竞彩建议。');

fs.writeFileSync(path.join(root, 'data\\packets\\rosters\\spain-roster.json'), JSON.stringify(roster, null, 2), 'utf8');
fs.writeFileSync(path.join(root, 'data\\outputs\\player_state\\spain-player-state.json'), JSON.stringify(playerState, null, 2), 'utf8');
fs.writeFileSync(path.join(root, '队伍\\西班牙\\成员表.md'), md.join('\r\n') + '\r\n', 'utf8');

const statusPath = path.join(root, '汇总\\H组成员表建设状态.md');
let status = fs.readFileSync(statusPath, 'utf8');
status = status.replace(/updated_at: .*/, `updated_at: ${capturedAt}`);
status = status.replace(/\| 西班牙 \| `019ededd-afc1-7e50-a791-f4a4571a59bc` \| [^|]+ \| `spain-roster\.json` \/ `spain-player-state\.json` \/ `队伍\\西班牙\\成员表\.md` \|/, '| 西班牙 | `019ededd-afc1-7e50-a791-f4a4571a59bc` | complete | `spain-roster.json` / `spain-player-state.json` / `队伍\\西班牙\\成员表.md` |');
status = status.replace(/## 西班牙[\s\S]*?$/m, '## 西班牙\r\n\r\n- status: complete\r\n- files:\r\n  - `data\\packets\\rosters\\spain-roster.json`\r\n  - `data\\outputs\\player_state\\spain-player-state.json`\r\n  - `队伍\\西班牙\\成员表.md`\r\n- validation: pending_local_self_check\r\n- player_state_update_status: updated\r\n');
fs.writeFileSync(statusPath, status, 'utf8');
