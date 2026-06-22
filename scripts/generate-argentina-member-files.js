const fs = require('fs');
const path = require('path');

const root = 'E:\\worldcup';
const capturedAt = '2026-06-20T23:20:00+08:00';

const sources = {
  fourFourTwo: {
    source: 'FourFourTwo - Argentina World Cup 2026 squad',
    url: 'https://www.fourfourtwo.com/team/argentina-world-cup-2026-squad',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['final_squad', 'coach', 'fixtures', 'injury_context'],
    source_status: 'confirmed'
  },
  transfermarkt: {
    source: 'Transfermarkt - Argentina detailed squad 2026',
    url: 'https://www.transfermarkt.com/argentinien/kader/verein/3437',
    captured_at: capturedAt,
    reliability_tier: 4,
    supports_fields: ['squad_number', 'age', 'position', 'club', 'market_value', 'squad_market_value'],
    source_status: 'confirmed'
  },
  guardian: {
    source: 'The Guardian match report - Argentina 3-0 Algeria, 2026-06-16',
    url: 'https://www.theguardian.com/football/2026/jun/16/argentina-algeria-world-cup-group-j-match-report',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['match_report', 'messi_goals', 'messi_minutes_context', 'injury_context', 'disciplinary_context'],
    source_status: 'confirmed'
  },
  barcaBlaugranes: {
    source: 'Barca Blaugranes - Argentina 3-0 Algeria report',
    url: 'https://www.barcablaugranes.com/world-cup-2026/123670/argentina-algeria-world-cup-2026-lionel-messi-makes-history-hat-trick',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['messi_hat_trick', 'team_style_summary'],
    source_status: 'confirmed'
  },
  talksportComplaint: {
    source: 'talkSPORT - Algeria complaint after Argentina match',
    url: 'https://talksport.com/football/world-cup/4349752/argentina-algeria-complaint-lionel-messi-incident/',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['disciplinary_complaint', 'messi_mac_allister_incidents'],
    source_status: 'probable'
  },
  localReview: {
    source: '本地J组首轮复盘',
    url: '比赛\\已完成比赛\\小组赛\\J组\\2026-06-16_阿根廷_3-0_阿尔及利亚_复盘.md',
    captured_at: capturedAt,
    reliability_tier: 2,
    supports_fields: ['postmatch_model_context', 'round1_state_adjustment'],
    source_status: 'confirmed'
  },
  localProfile: {
    source: '本地阿根廷正式球队档案',
    url: '队伍\\阿根廷\\正式球队档案.md',
    captured_at: capturedAt,
    reliability_tier: 2,
    supports_fields: ['coach', 'base_formation', 'style_facts'],
    source_status: 'confirmed'
  }
};

const clubMap = {
  'Aston Villa': ['阿斯顿维拉', 'Premier League', '英超', '英格兰'],
  'Olympique Marseille': ['马赛', 'Ligue 1', '法甲', '法国'],
  'Atlético de Madrid': ['马德里竞技', 'La Liga', '西甲', '西班牙'],
  'Tottenham Hotspur': ['托特纳姆热刺', 'Premier League', '英超', '英格兰'],
  'Manchester United': ['曼联', 'Premier League', '英超', '英格兰'],
  'AFC Bournemouth': ['伯恩茅斯', 'Premier League', '英超', '英格兰'],
  'SL Benfica': ['本菲卡', 'Primeira Liga', '葡超', '葡萄牙'],
  'Olympique Lyon': ['里昂', 'Ligue 1', '法甲', '法国'],
  'CA River Plate': ['河床', 'Primera División Argentina', '阿甲', '阿根廷'],
  'CA Boca Juniors': ['博卡青年', 'Primera División Argentina', '阿甲', '阿根廷'],
  'Chelsea FC': ['切尔西', 'Premier League', '英超', '英格兰'],
  'Liverpool FC': ['利物浦', 'Premier League', '英超', '英格兰'],
  'RC Strasbourg Alsace': ['斯特拉斯堡', 'Ligue 1', '法甲', '法国'],
  'Bayer 04 Leverkusen': ['勒沃库森', 'Bundesliga', '德甲', '德国'],
  'Inter Miami CF': ['迈阿密国际', 'Major League Soccer', '美职联', '美国'],
  'Como 1907': ['科莫', 'Serie A', '意甲', '意大利'],
  'Real Betis Balompié': ['皇家贝蒂斯', 'La Liga', '西甲', '西班牙'],
  'Inter Milan': ['国际米兰', 'Serie A', '意甲', '意大利'],
  'Sociedade Esportiva Palmeiras': ['帕尔梅拉斯', 'Brasileirão Série A', '巴甲', '巴西']
};

const usage = {
  'Lionel Messi': {
    starter: true, minutes: 80, goals: 3, subbed_off: 80,
    note: '首发；17、60、76分钟完成帽子戏法，约80分钟后退场。Guardian记录其赛前有肌肉伤恢复背景并首发。'
  },
  'Rodrigo De Paul': {
    starter: true, minutes: null, assists: 1,
    note: 'Guardian记录17分钟由De Paul在约40码处找到Messi，形成首球前的推进传球；官方助攻口径需复核。'
  },
  'Alexis Mac Allister': {
    starter: true, minutes: null,
    note: 'Guardian记录其60分钟远射被Zidane扑出后，Messi补射得分；talkSPORT称阿尔及利亚投诉其疑似肘击未受罚。'
  },
  'Emiliano Martínez': { starter: true, minutes: 90, note: '首轮零封门将；本地复盘上调阿根廷零封概率。' },
  'Cristian Romero': { starter: null, minutes: null, note: 'FourFourTwo称其带着上月右膝MCL高等级部分撕裂背景入选；首轮是否首发需官方阵容表复核。' },
  'Enzo Fernández': { starter: null, minutes: null, note: '本地档案列为中场出球与转换核心；首轮精确分钟未稳定取得。' },
  'Julián Alvarez': { starter: null, minutes: null, note: '本地档案列为前场压迫和纵深核心；首轮精确分钟未稳定取得。' },
  'Lautaro Martínez': { starter: null, minutes: null, note: '本地档案列为禁区终结和压迫核心；首轮精确分钟未稳定取得。' }
};

const playersBase = [
  [23, 'Emiliano Martínez', '埃米利亚诺·马丁内斯', 'GK', '门将', 'Aston Villa', 33, 12000000, 195, 'right', '主力门将/大赛心理核心'],
  [12, 'Gerónimo Rulli', '赫罗尼莫·鲁利', 'GK', '门将', 'Olympique Marseille', 34, 6000000, 189, 'right', '替补门将'],
  [1, 'Juan Musso', '胡安·穆索', 'GK', '门将', 'Atlético de Madrid', 32, 3000000, 191, 'right', '替补门将'],
  [13, 'Cristian Romero', '克里斯蒂安·罗梅罗', 'CB', '中卫', 'Tottenham Hotspur', 28, 45000000, 185, 'right', '主力中卫/对抗核心'],
  [6, 'Lisandro Martínez', '利桑德罗·马丁内斯', 'CB', '中卫/左后卫', 'Manchester United', 28, 40000000, 175, 'left', '左脚中卫轮换/主力竞争'],
  [2, 'Marcos Senesi', '马科斯·塞内西', 'CB', '中卫', 'AFC Bournemouth', 29, 25000000, 185, 'left', '中卫轮换'],
  [25, 'Facundo Medina', '法昆多·梅迪纳', 'CB', '中卫/左后卫', 'Olympique Marseille', 27, 18000000, 184, 'left', '后防多面手'],
  [19, 'Nicolás Otamendi', '尼古拉斯·奥塔门迪', 'CB', '中卫', 'SL Benfica', 38, 1000000, 183, 'right', '经验中卫/防线领袖'],
  [3, 'Nicolás Tagliafico', '尼古拉斯·塔利亚菲科', 'LB', '左后卫', 'Olympique Lyon', 33, 4000000, 172, 'left', '左后卫防守经验'],
  [26, 'Nahuel Molina', '纳韦尔·莫利纳', 'RB', '右后卫/翼卫', 'Atlético de Madrid', 28, 15000000, 175, 'right', '主力右后卫'],
  [4, 'Gonzalo Montiel', '贡萨洛·蒙铁尔', 'RB', '右后卫', 'CA River Plate', 29, 4500000, 176, 'right', '右后卫轮换'],
  [5, 'Leandro Paredes', '莱安德罗·帕雷德斯', 'DM', '后腰/中前卫', 'CA Boca Juniors', 31, 5000000, 180, 'right', '控场与替补节奏点'],
  [24, 'Enzo Fernández', '恩佐·费尔南德斯', 'CM', '中前卫/后腰', 'Chelsea FC', 25, 90000000, 178, 'right', '出球与转换核心'],
  [20, 'Alexis Mac Allister', '亚历克西斯·麦卡利斯特', 'CM', '中前卫/前腰', 'Liverpool FC', 27, 70000000, 176, 'right', '中场推进与肋部连接'],
  [8, 'Valentín Barco', '瓦伦丁·巴尔科', 'CM/LB', '中场/左后卫', 'RC Strasbourg Alsace', 21, 40000000, 172, 'left', '年轻左路多面手'],
  [14, 'Exequiel Palacios', '埃塞基耶尔·帕拉西奥斯', 'CM', '中前卫/后腰', 'Bayer 04 Leverkusen', 27, 25000000, 177, 'right', '中场轮换与覆盖'],
  [7, 'Rodrigo De Paul', '罗德里戈·德保罗', 'CM', '中前卫/右中场', 'Inter Miami CF', 32, 14000000, 180, 'right', '压迫覆盖与情绪强度'],
  [18, 'Nico Paz', '尼科·帕斯', 'AM', '前腰/右路', 'Como 1907', 21, 80000000, 186, 'left', '年轻创造力'],
  [11, 'Giovani Lo Celso', '吉奥瓦尼·洛塞尔索', 'AM', '前腰/中前卫', 'Real Betis Balompié', 30, 8000000, 177, 'left', '左脚组织轮换'],
  [15, 'Nico González', '尼科·冈萨雷斯', 'LW', '左边锋/前锋', 'Atlético de Madrid', 28, 22000000, 180, 'left', '边路冲击与防守覆盖'],
  [16, 'Thiago Almada', '蒂亚戈·阿尔马达', 'LW/AM', '边锋/前腰', 'Atlético de Madrid', 25, 15000000, 171, 'right', '肋部创造与定位球轮换'],
  [17, 'Giuliano Simeone', '朱利亚诺·西蒙尼', 'RW', '右边锋/前锋', 'Atlético de Madrid', 23, 40000000, 173, 'right', '年轻边路冲击'],
  [10, 'Lionel Messi', '利昂内尔·梅西', 'RW/AM', '右路/前腰', 'Inter Miami CF', 38, 15000000, 170, 'left', '队长/前场组织与终结核心'],
  [9, 'Julián Alvarez', '胡利安·阿尔瓦雷斯', 'ST/SS', '中锋/影锋', 'Atlético de Madrid', 26, 100000000, 170, 'right', '前场压迫与多位置终结'],
  [22, 'Lautaro Martínez', '劳塔罗·马丁内斯', 'ST', '中锋', 'Inter Milan', 28, 85000000, 174, 'right', '禁区终结/压迫'],
  [21, 'Flaco López', '何塞·曼努埃尔·洛佩斯', 'ST', '中锋', 'Sociedade Esportiva Palmeiras', 25, 25000000, 188, 'left', '替补中锋/高点']
];

const tagsByPosition = {
  GK: ['门线反应', '出球', '点球心理'],
  CB: ['对抗', '前顶', '禁区防守'],
  LB: ['左路防守', '套边', '传中'],
  RB: ['右路推进', '回追', '传中'],
  DM: ['控场', '长传转移', '节奏管理'],
  CM: ['推进', '覆盖', '二点球'],
  'CM/LB': ['左路多面性', '推进', '换位'],
  AM: ['最后一传', '肋部接应', '定位球'],
  LW: ['边路冲击', '无球前插', '防守覆盖'],
  'LW/AM': ['肋部创造', '远射', '定位球'],
  RW: ['纵深', '压迫', '边路冲击'],
  'RW/AM': ['前场组织', '内切终结', '定位球'],
  'ST/SS': ['压迫', '纵深', '多位置连接'],
  ST: ['禁区终结', '抢点', '背身']
};

function sourceLogFor(name) {
  const list = [sources.transfermarkt, sources.fourFourTwo];
  if (usage[name] || name === 'Lionel Messi' || name === 'Alexis Mac Allister') {
    list.push(sources.guardian, sources.barcaBlaugranes, sources.localReview);
  }
  if (name === 'Lionel Messi' || name === 'Alexis Mac Allister') list.push(sources.talksportComplaint);
  return list;
}

function availabilityFor(name) {
  if (name === 'Lionel Messi') {
    return {
      availability: 'available',
      injury_status: 'recent_muscle_issue_recovered_for_round1',
      minute_risk: 'managed_minutes_after_hat_trick_and_age_load',
      note: 'Guardian称其赛前数周从肌肉伤恢复，但首轮首发并约80分钟退场。'
    };
  }
  if (name === 'Cristian Romero') {
    return {
      availability: 'probable',
      injury_status: 'recent_right_knee_mcl_partial_tear_context',
      minute_risk: 'monitor_knee_load',
      note: 'FourFourTwo称其上月右膝MCL高等级部分撕裂但入选，需第二轮前继续复核。'
    };
  }
  return {
    availability: 'available',
    injury_status: 'none_confirmed_in_sources_used',
    minute_risk: usage[name] && usage[name].minutes >= 80 ? 'normal_after_heavy_round1_minutes' : (usage[name] ? 'round1_usage_uncertain_or_managed' : 'unused_or_unverified_round1_usage'),
    note: '本轮已核验来源未显示明确伤停或停赛。'
  };
}

function formFor(name, role) {
  if (name === 'Lionel Messi') return [5.0, '首轮帽子戏法，17/60/76分钟三球，终结上限和比赛决定权大幅上修，但存在年龄与分钟管理。'];
  if (name === 'Emiliano Martínez') return [3.8, '首轮零封，阿根廷防守和比赛管理兑现，本地复盘上调零封概率。'];
  if (name === 'Rodrigo De Paul') return [3.6, '首球前为Messi提供推进传球，继续承担覆盖和情绪强度。'];
  if (name === 'Alexis Mac Allister') return [3.4, '60分钟远射制造Messi补射机会，但阿尔及利亚投诉其疑似肘击未受罚，纪律风险需观察。'];
  if (name === 'Cristian Romero') return [3.0, '入选但伤情背景需要分钟管理，防线核心价值仍高。'];
  if (role.includes('核心') || role.includes('主力')) return [3.2, '首轮阿根廷3-0控局，角色重要但精确出场数据需官方阵容表复核。'];
  return [2.8, '首轮出场信息未稳定核验，当前按轮换/深度模型输入。'];
}

const players = playersBase.map((row, index) => {
  const [number, englishName, chineseName, pos, secondary, club, age, marketValue, height, foot, role] = row;
  const clubInfo = clubMap[club];
  const round = usage[englishName] || { starter: null, minutes: null, note: '首轮官方阵容/分钟未在本轮稳定取得，保留null并列入缺口。' };
  const availability = availabilityFor(englishName);
  const [form, reason] = formFor(englishName, role);
  return {
    player_id: `argentina-${String(index + 1).padStart(2, '0')}`,
    chinese_name: chineseName,
    english_name: englishName,
    native_name: englishName,
    squad_number: number,
    birth_date: null,
    age,
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
      match: 'Argentina 3-0 Algeria',
      opponent: 'Algeria',
      starter: round.starter,
      minutes: round.minutes,
      subbed_on: round.subbed_on || null,
      subbed_off: round.subbed_off || null,
      goals: round.goals || 0,
      assists: round.assists || 0,
      cards: { yellow: 0, red: 0 },
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
      roster: englishName === 'Marcos Senesi' ? 'conflicting_with_fourfourtwo_balerdi_slot' : 'confirmed_by_transfermarkt_and_or_fourfourtwo',
      market_value: 'confirmed_by_transfermarkt',
      height_preferred_foot: 'probable_from_public_player_profiles_not_rechecked_individually',
      round1_usage: usage[englishName] ? 'partial_confirmed_by_match_reports' : 'missing_or_unverified'
    },
    source_log: sourceLogFor(englishName)
  };
});

const teamStyleFacts = [
  '本地档案记录Scaloni常在4-3-3、4-4-2和4-2-3-1之间切换，核心是Messi前场组织、Mac Allister/Enzo/De Paul中场控制。',
  'Guardian记录Messi赛前从肌肉问题中恢复，但首轮首发并完成帽子戏法，约80分钟后退场。',
  'Guardian记录阿根廷在防守端表现稳定，阿尔及利亚有局部活力但终结不足。',
  '本地复盘将阿根廷终结上限和零封概率上调，同时提醒不要机械外推每场大胜。',
  'talkSPORT记录阿尔及利亚向FIFA投诉Messi疑似踩踏和Mac Allister疑似肘击未受罚，纪律/判罚争议需在后续可用性中跟踪。'
];

const roster = {
  schema_version: 'worldcup-data-collector/roster-v1',
  phase: 'team_profile',
  team: {
    team_id: 'argentina',
    fifa_name: 'Argentina',
    team_name_cn: '阿根廷',
    fifa_code: 'ARG',
    group: 'J',
    confederation: 'CONMEBOL',
    fifa_ranking: 1,
    captured_at: capturedAt
  },
  status: 'complete',
  created_at: capturedAt,
  updated_at: capturedAt,
  captured_at: capturedAt,
  owner: 'worldcup-data-collector',
  scope: 'J组阿根廷国家队成员表数据采集；不处理阿尔及利亚、奥地利、约旦；不做预测或竞彩建议。',
  source_log: Object.values(sources),
  coaches_and_staff: [
    {
      role: 'head_coach',
      chinese_name: '利昂内尔·斯卡洛尼',
      english_name: 'Lionel Scaloni',
      tenure_start: '2018-08',
      source_status: 'confirmed',
      source_log: [sources.fourFourTwo, sources.localProfile]
    },
    {
      role: 'assistant_coach',
      chinese_name: null,
      english_name: null,
      source_status: 'missing',
      notes: '本轮最小闭环未稳定核验官方完整助教名单。',
      source_log: [sources.localProfile]
    },
    {
      role: 'goalkeeper_coach',
      chinese_name: null,
      english_name: null,
      source_status: 'missing',
      notes: '本轮最小闭环未稳定核验门将教练公开名单。',
      source_log: [sources.localProfile]
    }
  ],
  team_context: {
    base_formation: '4-3-3 / 4-4-2 / 4-2-3-1',
    round1_starting_shape: '官方首发全表本轮未稳定取得；Guardian确认Messi进入Scaloni首发。常规框架按4-3-3/4-3-1-2处理。',
    team_style_facts: teamStyleFacts,
    round1_match_shape: '阿根廷3-0阿尔及利亚；Messi 17、60、76分钟进球，约80分钟后退场；球队完成零封并控制比赛节奏。',
    round1_player_usage: '本轮稳定确认Messi首发并约80分钟退场、De Paul参与首球、Mac Allister远射制造第二球；其余逐人分钟需官方match centre补核。',
    round2_availability_note: '第二轮前重点复核Messi肌肉伤后负荷、Romero膝伤背景，以及阿尔及利亚投诉是否触发纪律追加。',
    player_state_update_status: 'updated'
  },
  players,
  gaps_and_conflicts: [
    '未稳定取得AFA/FIFA官方最终名单逐项页面；名单以Transfermarkt当前26人与FourFourTwo终版名单交叉核验。',
    '名单存在冲突：FourFourTwo列Leonardo Balerdi，Transfermarkt当前26人列Marcos Senesi；本文件主表采用Transfermarkt 26人及身价口径，并保留冲突。',
    '首轮官方完整首发、换人分钟和所有助攻未稳定取得；除Messi、De Paul、Mac Allister等match report明确事件外，其余round1分钟保留null。',
    '国家队caps/goals未在本轮来源中稳定批量核验，统一保留null。',
    '多源同口径赛后评分未取得，所有round1.rating保留null。',
    '身高和惯用脚为公开球员资料常见值，未逐人打开官方/FIFA页面复核，标记probable。'
  ]
};

const playerState = {
  schema_version: 'worldcup-data-collector/player-state-v1',
  phase: 'player_state',
  team_id: 'argentina',
  team_name_cn: '阿根廷',
  group: 'J',
  status: 'complete',
  player_state_update_status: 'updated',
  created_at: capturedAt,
  updated_at: capturedAt,
  captured_at: capturedAt,
  source_log: [sources.guardian, sources.barcaBlaugranes, sources.localReview, sources.transfermarkt, sources.fourFourTwo],
  round1_summary: {
    match: 'Argentina 3-0 Algeria',
    style_fact: 'Messi帽子戏法推动阿根廷终结上限上修，球队零封使防守下限上调；但首发分钟和纪律投诉需继续跟踪。',
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

function fmt(v) { return v === null || v === undefined || v === '' ? 'null' : String(v); }
function money(v) { return v == null ? 'null' : `€${(v / 1000000).toFixed(v >= 10000000 ? 0 : 1)}m`; }

const md = [];
md.push('# 阿根廷国家队成员表');
md.push('');
md.push('phase: team_profile  ');
md.push('status: complete  ');
md.push(`captured_at: ${capturedAt}  `);
md.push('player_state_update_status: updated  ');
md.push('scope: J组阿根廷国家队成员表数据采集；不处理同组其他队，不做预测或竞彩建议。');
md.push('');
md.push('## 来源摘要');
md.push('');
md.push('- FourFourTwo：阿根廷世界杯26人名单、斯卡洛尼、赛程、Romero伤情背景。');
md.push('- Transfermarkt：当前26人号码、年龄、位置、俱乐部、身价与总身价。');
md.push('- Guardian/Barca Blaugranes：首轮3-0阿尔及利亚、Messi帽子戏法、80分钟后退场和比赛风格。');
md.push('- talkSPORT：阿尔及利亚对Messi/Mac Allister判罚争议的投诉背景。');
md.push('- 本地复盘：终结上限、零封概率和第二轮前模型状态修正。');
md.push('');
md.push('## 教练与球队事实');
md.push('');
md.push('- 主教练：利昂内尔·斯卡洛尼 / Lionel Scaloni。');
md.push('- 基础阵型：4-3-3 / 4-4-2 / 4-2-3-1，核心在Messi前场组织与Mac Allister、Enzo、De Paul中场控制。');
md.push('- 首轮风格：阿根廷3-0阿尔及利亚，Messi 17、60、76分钟进球；球队完成零封，终结上限和比赛管理上修。');
md.push('- 第二轮前可用性备注：重点复核Messi肌肉伤后负荷、Romero右膝MCL背景，以及阿尔及利亚投诉是否引发纪律追加。');
md.push('');
md.push('## 26人中文成员表');
md.push('');
md.push('| # | 中文名 | 英文/原文名 | 年龄 | 主位置 | 可客串位置 | 角色定位 | 惯用脚 | 身高/体重 | 俱乐部 | 联赛 | 俱乐部国家 | 身价 | 可用性/风险 | 首轮首发/分钟 | 首轮事件 | 状态值 | 来源 |');
md.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
players.forEach((p) => {
  const sourceNames = p.source_log.map((s) => s.source.replace(/\|/g, '/')).join('；');
  md.push(`| ${p.squad_number} | ${p.chinese_name} | ${p.english_name} | ${p.age} | ${p.primary_position} | ${p.secondary_positions} | ${p.role} | ${fmt(p.preferred_foot)} | ${fmt(p.height_cm)}cm/${fmt(p.weight_kg)}kg | ${p.club_name_cn} (${p.club_name}) | ${p.league_name_cn} (${p.league_name}) | ${p.club_country_cn} | ${money(p.market_value_eur)} | ${p.availability}/${p.minute_risk} | ${fmt(p.round1.starter)}/${fmt(p.round1.minutes)} | ${p.round1.key_stats_note} | ${p.form_status_1_5} | ${sourceNames} |`);
});
md.push('');
md.push('## 缺口与冲突');
md.push('');
roster.gaps_and_conflicts.forEach((item) => md.push(`- ${item}`));
md.push('');
md.push('## 声明');
md.push('');
md.push('- 本文件只做事实采集与结构化，不包含比分预测、出线预测或竞彩建议。');

fs.writeFileSync(path.join(root, 'data\\packets\\rosters\\argentina-roster.json'), JSON.stringify(roster, null, 2), 'utf8');
fs.writeFileSync(path.join(root, 'data\\outputs\\player_state\\argentina-player-state.json'), JSON.stringify(playerState, null, 2), 'utf8');
fs.writeFileSync(path.join(root, '队伍\\阿根廷\\成员表.md'), md.join('\r\n') + '\r\n', 'utf8');

const statusPath = path.join(root, '汇总\\J组成员表建设状态.md');
let status = fs.readFileSync(statusPath, 'utf8');
status = status.replace(/updated_at: .*/, `updated_at: ${capturedAt}`);
status = status.replace(/\| 阿根廷 \| `019ededd-afc1-7e50-a791-f4a4571a59bc` \| [^|]+ \| `argentina-roster\.json` \/ `argentina-player-state\.json` \/ `队伍\\阿根廷\\成员表\.md` \|/, '| 阿根廷 | `019ededd-afc1-7e50-a791-f4a4571a59bc` | complete | `argentina-roster.json` / `argentina-player-state.json` / `队伍\\阿根廷\\成员表.md` |');
status = status.replace(/## 阿根廷[\s\S]*?$/, '## 阿根廷\r\n\r\n- status: complete\r\n- files:\r\n  - `data\\packets\\rosters\\argentina-roster.json`\r\n  - `data\\outputs\\player_state\\argentina-player-state.json`\r\n  - `队伍\\阿根廷\\成员表.md`\r\n- validation: pending_local_self_check\r\n- player_state_update_status: updated\r\n');
fs.writeFileSync(statusPath, status, 'utf8');
