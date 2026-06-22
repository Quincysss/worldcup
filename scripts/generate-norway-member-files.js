const fs = require('fs');
const path = require('path');

const root = 'E:\\worldcup';
const capturedAt = '2026-06-20T22:45:00+08:00';

const sources = {
  nff: {
    source: 'Norges Fotballforbund - Her er Norges VM-tropp',
    url: 'https://www.fotball.no/landslag/norge-a-herrer/2026/her-er-norges-vm-tropp/',
    captured_at: capturedAt,
    reliability_tier: 1,
    supports_fields: ['final_squad', 'club', 'birth_year', 'caps', 'goals', 'coach_context'],
    source_status: 'confirmed'
  },
  transfermarkt: {
    source: 'Transfermarkt - Norway detailed squad 2026',
    url: 'https://www.transfermarkt.com/norwegen/kader/verein/3440',
    captured_at: capturedAt,
    reliability_tier: 4,
    supports_fields: ['squad_number', 'age', 'position', 'market_value', 'squad_market_value'],
    source_status: 'confirmed'
  },
  fourFourTwo: {
    source: 'FourFourTwo - Norway World Cup 2026 squad',
    url: 'https://www.fourfourtwo.com/team/norway-world-cup-2026-squad',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['squad_list', 'manager', 'fixtures', 'qualifying_context'],
    source_status: 'confirmed'
  },
  guardianLive: {
    source: 'The Guardian live report - Iraq 1-4 Norway, 2026-06-16',
    url: 'https://www.theguardian.com/football/live/2026/jun/16/iraq-v-norway-world-cup-2026-live',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['starting_lineup', 'substitutions', 'goals', 'match_events', 'xg_note'],
    source_status: 'confirmed'
  },
  vg: {
    source: 'VG - Solbakkens fulltreffere mot Irak',
    url: 'https://www.vg.no/sport/i/L4jK3x/staale-solbakkens-fulltreff-mot-irak-det-som-avgjorde-kampen',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['lineup', 'substitution_minutes', 'formation_adjustment', 'yellow_cards'],
    source_status: 'confirmed'
  },
  toi: {
    source: 'Times of India/AP match report - Norway 4-1 Iraq',
    url: 'https://timesofindia.indiatimes.com/sports/football/fifa-world-cup/norway-vs-iraq-fifa-world-cup-2026-match-result-haaland-marks-world-cup-debut-with-two-goals-in-4-1-win/articleshow/131783536.cms',
    captured_at: capturedAt,
    reliability_tier: 3,
    supports_fields: ['scorers', 'match_stats', 'xg', 'possession', 'shots'],
    source_status: 'confirmed'
  },
  localReview: {
    source: '本地I组首轮复盘',
    url: '比赛\\已完成比赛\\小组赛\\I组\\2026-06-16_伊拉克_1-4_挪威_复盘.md',
    captured_at: capturedAt,
    reliability_tier: 2,
    supports_fields: ['postmatch_model_context', 'round1_state_adjustment'],
    source_status: 'confirmed'
  },
  localProfile: {
    source: '本地挪威正式球队档案与战术分析',
    url: '队伍\\挪威\\正式球队档案.md',
    captured_at: capturedAt,
    reliability_tier: 2,
    supports_fields: ['coach', 'base_formation', 'style_facts'],
    source_status: 'confirmed'
  }
};

const clubMap = {
  'Sevilla FC': ['塞维利亚', 'La Liga', '西甲', '西班牙'],
  'Watford FC': ['沃特福德', 'EFL Championship', '英冠', '英格兰'],
  'Hamburger SV': ['汉堡', 'Bundesliga', '德甲', '德国'],
  'Brentford FC': ['布伦特福德', 'Premier League', '英超', '英格兰'],
  'Genoa CFC': ['热那亚', 'Serie A', '意甲', '意大利'],
  'Bologna FC 1909': ['博洛尼亚', 'Serie A', '意甲', '意大利'],
  'Viking FK': ['维京', 'Eliteserien', '挪超', '挪威'],
  'Derby County FC': ['德比郡', 'EFL Championship', '英冠', '英格兰'],
  'Wolverhampton Wanderers FC': ['狼队', 'Premier League', '英超', '英格兰'],
  'FK Bodø/Glimt': ['博德闪耀', 'Eliteserien', '挪超', '挪威'],
  'Borussia Dortmund': ['多特蒙德', 'Bundesliga', '德甲', '德国'],
  'Torino FC': ['都灵', 'Serie A', '意甲', '意大利'],
  'Fulham FC': ['富勒姆', 'Premier League', '英超', '英格兰'],
  'US Cremonese': ['克雷莫内塞', 'Serie A', '意甲', '意大利'],
  'SL Benfica': ['本菲卡', 'Primeira Liga', '葡超', '葡萄牙'],
  'US Sassuolo': ['萨索洛', 'Serie A', '意甲', '意大利'],
  'Rangers FC': ['格拉斯哥流浪者', 'Scottish Premiership', '苏超', '苏格兰'],
  'RB Leipzig': ['RB莱比锡', 'Bundesliga', '德甲', '德国'],
  'Arsenal FC': ['阿森纳', 'Premier League', '英超', '英格兰'],
  'Manchester City FC': ['曼城', 'Premier League', '英超', '英格兰'],
  'Crystal Palace': ['水晶宫', 'Premier League', '英超', '英格兰'],
  'Atlético de Madrid': ['马德里竞技', 'La Liga', '西甲', '西班牙']
};

const usage = {
  'Ørjan Nyland': { starter: true, minutes: 90, note: '首发门将；39分钟被Aymen Hussein头球破门，84分钟轻松处理长传，失1球。' },
  'Julian Ryerson': { starter: true, minutes: 90, note: '首发右后卫；39分钟被Jasim一对一牵制后身后传中形成失球链，57分钟主罚角球，防守端承压明显。' },
  'Kristoffer Ajer': { starter: true, minutes: 90, note: '首发中卫；57分钟角球进攻中与裁判沟通，整体参与高空对抗但防线被伊拉克多次打穿。' },
  'Torbjørn Heggem': { starter: true, minutes: 90, note: '首发中卫；13分钟对Al-Hamadi形成干扰，阻止其更从容射门，防线仍暴露转换风险。' },
  'David Møller Wolfe': { starter: true, minutes: 73, subbed_off: 73, assists: 1, note: '首发左后卫；29分钟左路精准传中助攻Haaland首开纪录，66分钟出现抽筋迹象，73分钟被Østigård换下。' },
  'Fredrik Aursnes': { starter: true, minutes: 73, subbed_off: 73, note: '首发中场/边路；19分钟被放倒，73分钟被Thorstvedt换下。' },
  'Sander Berge': { starter: true, minutes: 90, note: '首发中场；18分钟被Tahseen迟到铲抢，负责中场身体和推进连接。' },
  'Martin Ødegaard': { starter: true, minutes: 81, subbed_off: 81, assists: 1, note: '首发队长；37分钟射偏，76分钟角球助攻Østigård头球，81分钟被Patrick Berg换下。' },
  'Antonio Nusa': { starter: true, minutes: 73, subbed_off: 73, note: '首发左路推进点；73分钟被Schjelderup换下，首轮提供宽度和推进但未直接进球。' },
  'Erling Haaland': { starter: true, minutes: 90, goals: 2, note: '首发中锋；29分钟接Møller Wolfe传中破门，43分钟抢断门将失误打入第二球，83分钟险些帽子戏法。' },
  'Alexander Sørloth': { starter: true, minutes: 73, subbed_off: 73, note: '首发锋线；6分钟被吹推人，38分钟头球被没收，73分钟被Oscar Bobb换下。' },
  'Oscar Bobb': { starter: false, minutes: 17, subbed_on: 73, note: '73分钟替补登场补充右路/前场控球冲击。' },
  'Andreas Schjelderup': { starter: false, minutes: 17, subbed_on: 73, note: '73分钟替补登场；90+1分钟左路长球前插制造Thorstvedt射门，90+4分钟头部相撞后继续比赛。' },
  'Leo Østigård': { starter: false, minutes: 17, subbed_on: 73, goals: 1, note: '73分钟替补登场；76分钟接Ødegaard角球头球破门。' },
  'Kristian Thorstvedt': { starter: false, minutes: 17, subbed_on: 73, note: '73分钟替补登场；75分钟射门被封堵，90+1分钟射中边网，90+6参与制造乌龙争议。' },
  'Patrick Berg': { starter: false, minutes: 9, subbed_on: 81, note: '81分钟替补换下Ødegaard，承担末段控场与中路保护。' }
};

const playersBase = [
  [1, 'Ørjan Nyland', 'Ørjan Håskjold Nyland', '厄尔扬·尼兰德', 'GK', '门将', 'Sevilla FC', 35, 800000, 192, 'right', 1990, 72, 0, '首发门将'],
  [13, 'Egil Selvik', 'Egil Selvik', '埃吉尔·塞尔维克', 'GK', '门将', 'Watford FC', 28, 1500000, 191, 'right', 1997, 7, 0, '替补门将'],
  [12, 'Sander Tangvik', 'Sander Tangvik', '桑德尔·唐维克', 'GK', '门将', 'Hamburger SV', 23, 3000000, 192, 'right', 2002, 0, 0, '第三门将'],
  [3, 'Kristoffer Ajer', 'Kristoffer Vassbakk Köpp Ajer', '克里斯托弗·阿耶尔', 'CB', '中卫/右后卫', 'Brentford FC', 28, 18000000, 198, 'right', 1998, 53, 2, '首发中卫'],
  [4, 'Leo Østigård', 'Leo Skiri Østigård', '莱奥·奥斯蒂高', 'CB', '中卫', 'Genoa CFC', 26, 13000000, 182, 'right', 1999, 39, 2, '替补中卫/定位球高点'],
  [17, 'Torbjørn Heggem', 'Torbjørn Lysaker Heggem', '托尔比约恩·赫格姆', 'CB', '中卫/左后卫', 'Bologna FC 1909', 27, 13000000, 192, 'left', 1999, 16, 0, '首发中卫'],
  [25, 'Henrik Falchener', 'Henrik Sælebakke Falchener', '亨里克·法尔赫内尔', 'CB', '中卫', 'Viking FK', 23, 6000000, 187, null, 2003, 1, 0, '后防深度'],
  [24, 'Sondre Langås', 'Sondre Klingen Langås', '松德雷·朗奥斯', 'CB', '中卫', 'Derby County FC', 25, 4000000, 190, 'right', 2001, 3, 0, '后防深度'],
  [5, 'David Møller Wolfe', 'David Møller Wolfe', '大卫·默勒·沃尔夫', 'LB', '左后卫/翼卫', 'Wolverhampton Wanderers FC', 24, 8000000, 185, 'left', 2002, 23, 1, '首发左后卫'],
  [15, 'Fredrik Bjørkan', 'Fredrik André Bjørkan', '弗雷德里克·比约坎', 'LB', '左后卫', 'FK Bodø/Glimt', 27, 3500000, 180, 'left', 1998, 21, 1, '替补左后卫'],
  [26, 'Julian Ryerson', 'Julian Ryerson', '尤利安·里尔松', 'RB', '右后卫/左后卫', 'Borussia Dortmund', 28, 25000000, 183, 'right', 1997, 44, 1, '首发右后卫'],
  [16, 'Marcus Pedersen', 'Marcus Holmgren Pedersen', '马库斯·霍尔姆格伦·佩德森', 'RB', '右后卫/翼卫', 'Torino FC', 25, 3500000, 184, 'right', 2000, 32, 0, '右路轮换'],
  [8, 'Sander Berge', 'Sander Berge', '桑德尔·贝格', 'DM', '后腰/中前卫', 'Fulham FC', 28, 25000000, 195, 'right', 1998, 67, 1, '首发中场支撑'],
  [6, 'Patrick Berg', 'Patrick Berg', '帕特里克·贝格', 'DM', '后腰/中前卫', 'FK Bodø/Glimt', 28, 8000000, 178, 'right', 1997, 44, 0, '中场控场轮换'],
  [2, 'Morten Thorsby', 'Morten Thorsby', '莫滕·托尔斯比', 'CM', '中前卫/后腰', 'US Cremonese', 30, 2800000, 189, 'right', 1996, 31, 0, '中场硬度轮换'],
  [14, 'Fredrik Aursnes', 'Fredrik Aursnes', '弗雷德里克·奥尔斯内斯', 'CM', '中前卫/边路', 'SL Benfica', 30, 15000000, 179, 'right', 1995, 23, 1, '首发中场/边路平衡点'],
  [18, 'Kristian Thorstvedt', 'Kristian Thorstvedt', '克里斯蒂安·托尔斯特韦特', 'CM', '中前卫/前腰', 'US Sassuolo', 27, 12000000, 189, 'left', 1999, 38, 4, '替补中场冲击点'],
  [10, 'Martin Ødegaard', 'Martin Ødegaard', '马丁·厄德高', 'AM', '前腰/中前卫', 'Arsenal FC', 27, 65000000, 178, 'left', 1998, 69, 5, '队长/组织核心'],
  [19, 'Thelo Aasgaard', 'Thelonious Aasgaard', '泰洛·奥斯加德', 'AM', '前腰/中前卫', 'Rangers FC', 24, 2800000, 176, 'left', 2002, 8, 5, '前场轮换'],
  [20, 'Antonio Nusa', 'Antonio Eromonsele Nordby Nusa', '安东尼奥·努萨', 'LW', '左边锋/前腰', 'RB Leipzig', 21, 32000000, 180, 'right', 2005, 25, 8, '首发边路推进点'],
  [21, 'Andreas Schjelderup', 'Andreas Rædergård Schjelderup', '安德烈亚斯·谢尔德鲁普', 'LW', '左边锋/前腰', 'SL Benfica', 22, 30000000, 176, 'right', 2004, 13, 1, '替补边路冲击'],
  [23, 'Jens Petter Hauge', 'Jens Petter Hauge', '延斯·彼得·豪格', 'LW', '左边锋/右边锋', 'FK Bodø/Glimt', 26, 12000000, 184, 'right', 1999, 15, 1, '边路轮换'],
  [22, 'Oscar Bobb', 'Oscar Bobb', '奥斯卡·鲍勃', 'RW', '右边锋/前腰', 'Fulham FC', 22, 28000000, 175, 'left', 2003, 21, 2, '替补创造力'],
  [9, 'Erling Haaland', 'Erling Braut Haaland', '埃尔林·哈兰德', 'ST', '中锋', 'Manchester City FC', 25, 200000000, 195, 'left', 2000, 51, 57, '核心终结点'],
  [11, 'Jørgen Strand Larsen', 'Jørgen Strand Larsen', '约尔根·斯特兰德·拉尔森', 'ST', '中锋', 'Crystal Palace', 26, 40000000, 193, 'right', 2000, 28, 6, '替补中锋/支点'],
  [7, 'Alexander Sørloth', 'Alexander Sørloth', '亚历山大·瑟洛特', 'ST', '中锋/影锋', 'Atlético de Madrid', 30, 18000000, 195, 'left', 1995, 73, 26, '首发锋线搭档']
];

const tagsByPosition = {
  GK: ['门线反应', '长传出球', '禁区高球'],
  CB: ['空中对抗', '禁区防守', '后场出球'],
  LB: ['边路传中', '套边推进', '回追'],
  RB: ['右路推进', '对抗', '转换回防'],
  DM: ['拦截', '二点保护', '节奏连接'],
  CM: ['覆盖', '后插上', '身体对抗'],
  AM: ['右肋组织', '定位球', '最后一传'],
  LW: ['一对一推进', '纵深', '内切'],
  RW: ['小空间控球', '内切创造', '肋部接应'],
  ST: ['禁区终结', '高点争顶', '反越位']
};

function sourceLogFor(name) {
  const list = [sources.nff, sources.transfermarkt, sources.fourFourTwo];
  if (usage[name]) list.push(sources.guardianLive, sources.vg, sources.toi, sources.localReview);
  return list;
}

function availabilityFor(name) {
  if (name === 'Martin Ødegaard') {
    return {
      availability: 'available',
      injury_status: 'probable_fitness_monitoring_from_local_pre_tournament_context',
      minute_risk: 'managed_after_81_min_round1_and_pre_tournament_load_note',
      note: '本地档案赛前标记其节奏/负荷需观察；首轮首发81分钟并贡献角球助攻。'
    };
  }
  if (name === 'David Møller Wolfe') {
    return {
      availability: 'probable',
      injury_status: 'cramp_report_round1',
      minute_risk: 'monitor_after_cramp_and_73_min_substitution',
      note: 'Guardian记录66分钟出现抽筋，73分钟被换下；第二轮前需复核训练状态。'
    };
  }
  if (name === 'Andreas Schjelderup') {
    return {
      availability: 'probable',
      injury_status: 'minor_head_collision_continued',
      minute_risk: 'low_to_moderate_monitor_after_head_collision',
      note: 'Guardian记录90+4头部碰撞后可继续比赛。'
    };
  }
  return {
    availability: 'available',
    injury_status: 'none_confirmed_in_sources_used',
    minute_risk: usage[name] && usage[name].minutes >= 81 ? 'normal_after_heavy_round1_minutes' : (usage[name] ? 'rotation_or_managed_after_round1' : 'unused_depth_or_rotation'),
    note: '本轮已核验来源未显示明确伤停或停赛。'
  };
}

function formFor(name, role) {
  if (name === 'Erling Haaland') return [4.8, '首轮两球，29分钟抢点破门、43分钟压迫门将失误再进，终结和压迫价值显著上调。'];
  if (name === 'Martin Ødegaard') return [3.8, '首轮81分钟、角球助攻第三球，但Guardian提到失球防守回追和若干丢球/射偏，状态强但仍需负荷观察。'];
  if (name === 'Leo Østigård') return [4.0, '替补登场3分钟后头球破门，定位球高点价值明确。'];
  if (name === 'David Møller Wolfe') return [3.6, '助攻首球但出现抽筋被换下，进攻贡献与分钟风险并存。'];
  if (name === 'Kristian Thorstvedt') return [3.5, '替补登场后两次接近得分并参与补时乌龙链条，冲击力上调。'];
  if (name === 'Sander Berge') return [3.3, '首发90分钟承担中场身体和连接，帮助球队扩大优势。'];
  if (name === 'Julian Ryerson' || name === 'Torbjørn Heggem' || name === 'Kristoffer Ajer') return [2.9, '首发完成比赛但防线被伊拉克多次打穿，后续面对更强转换需下修防守确定性。'];
  if (usage[name]) return [3.2, '首轮参与4-1胜局，完成轮换或首发职责。'];
  if (role.includes('深度')) return [2.4, '首轮未出场，当前作为阵容深度，状态按中低位模型输入。'];
  return [2.7, '首轮未出场，当前作为轮换选项，需第二轮前训练和官方名单复核。'];
}

const players = playersBase.map((row, index) => {
  const [number, englishName, nativeName, chineseName, pos, secondary, club, age, marketValue, height, foot, birthYear, caps, goals, role] = row;
  const round = usage[englishName] || { starter: false, minutes: 0, note: '首轮未在Guardian/VG首发或换人记录中出场。' };
  const clubInfo = clubMap[club];
  const availability = availabilityFor(englishName);
  const [form, reason] = formFor(englishName, role);
  return {
    player_id: `norway-${String(index + 1).padStart(2, '0')}`,
    chinese_name: chineseName,
    english_name: englishName,
    native_name: nativeName,
    squad_number: number,
    birth_year: birthYear,
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
    national_team_caps: caps,
    national_team_goals: goals,
    availability: availability.availability,
    injury_status: availability.injury_status,
    suspension_status: 'none_confirmed_in_sources_used',
    minute_risk: availability.minute_risk,
    availability_note: availability.note,
    round1: {
      match: 'Iraq 1-4 Norway',
      opponent: 'Iraq',
      starter: round.starter,
      minutes: round.minutes,
      subbed_on: round.subbed_on || null,
      subbed_off: round.subbed_off || null,
      goals: round.goals || 0,
      assists: round.assists || 0,
      own_goals_forced: englishName === 'Kristian Thorstvedt' || englishName === 'Erling Haaland' ? 'involved_in_90_plus_6_own_goal_sequence_uncertain_credit' : null,
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
      roster: 'confirmed',
      club_caps_goals: 'confirmed_by_nff',
      market_value: 'confirmed_by_transfermarkt',
      height_preferred_foot: foot && height ? 'probable_from_public_player_profiles_not_rechecked_individually' : 'uncertain_or_missing',
      round1_usage: usage[englishName] ? 'confirmed_by_guardian_vg' : 'confirmed_unused_or_not_listed_as_subbed_on'
    },
    source_log: sourceLogFor(englishName)
  };
});

const teamStyleFacts = [
  '本地档案记录挪威常用4-2-3-1/4-3-3，前场依赖Haaland终结、Ødegaard输送、Nusa推进和Sørloth高点。',
  'VG记录首轮开局4-4-2不顺后，补水暂停附近调整为4-3-3，让Ødegaard更靠中路，Haaland单箭头效果提升。',
  'Guardian/TOI记录挪威63%控球、477次准确传球、xG约2.59对0.77、射正6-1、角球5-2。',
  '首轮4-1来自Haaland两球、Østigård替补头球和补时乌龙，定位球/高点与压迫误差惩罚能力上调。',
  'Guardian同时指出伊拉克在上半场末段和下半场对挪威防线制造了明显压力，防线和转换保护仍需下调确定性。'
];

const roster = {
  schema_version: 'worldcup-data-collector/roster-v1',
  phase: 'team_profile',
  team: {
    team_id: 'norway',
    fifa_name: 'Norway',
    team_name_cn: '挪威',
    fifa_code: 'NOR',
    group: 'I',
    confederation: 'UEFA',
    fifa_ranking: 31,
    captured_at: capturedAt
  },
  status: 'complete',
  created_at: capturedAt,
  updated_at: capturedAt,
  captured_at: capturedAt,
  owner: 'worldcup-data-collector',
  scope: 'I组挪威国家队成员表数据采集；不处理法国、塞内加尔、伊拉克；不做预测或竞彩建议。',
  source_log: Object.values(sources),
  coaches_and_staff: [
    {
      role: 'head_coach',
      chinese_name: '斯托勒·索尔巴肯',
      english_name: 'Ståle Solbakken',
      tenure_start: '2020-12',
      source_status: 'confirmed',
      source_log: [sources.nff, sources.fourFourTwo, sources.localProfile]
    },
    {
      role: 'assistant_coach',
      chinese_name: '肯特·贝格森',
      english_name: 'Kent Bergersen',
      source_status: 'confirmed',
      notes: 'NFF名单发布页提到发布会地点为索尔巴肯和助教Kent Bergersen的童年俱乐部Grue IL；VG也引用其对首轮调整的观点。',
      source_log: [sources.nff, sources.vg]
    },
    {
      role: 'goalkeeper_coach',
      chinese_name: null,
      english_name: null,
      source_status: 'missing',
      notes: '本轮最小闭环未稳定核验挪威官方门将教练名单。',
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
    base_formation: '4-2-3-1 / 4-3-3',
    round1_starting_shape: 'Nyland; Ryerson, Ajer, Heggem, Møller Wolfe; Aursnes, Berge, Ødegaard; Nusa, Haaland, Sørloth. Guardian列为该首发，VG记录开局4-4-2后调整为4-3-3。',
    team_style_facts: teamStyleFacts,
    round1_match_shape: '开局有4-4-2/双前锋影子，补水暂停附近改为更清晰4-3-3；73分钟四换：Bobb、Schjelderup、Østigård、Thorstvedt登场；81分钟Patrick Berg换下Ødegaard。',
    round1_player_usage: '11名首发、5名替补出场；Haaland两球，Østigård替补头球，Møller Wolfe和Ødegaard各一助攻，补时乌龙来源存在Thorstvedt/Haaland参与链条。',
    round2_availability_note: '第二轮前公开输入未显示新增停赛；重点复核Møller Wolfe抽筋、Schjelderup头部碰撞和Ødegaard负荷。',
    player_state_update_status: 'updated'
  },
  players,
  gaps_and_conflicts: [
    '身高和惯用脚为公开球员资料常见值，本轮未逐人打开官方/FIFA页面复核，标记probable或uncertain。',
    '体重和生日未在本轮官方名单中批量给出，统一保留null；NFF给出生年。',
    '多源同口径赛后评分未取得，round1.rating统一保留null。',
    '补时第四球来源存在冲突：Guardian称球场屏幕给Thorstvedt但更可能乌龙；talkSPORT称最终判为Aymen Hussein乌龙；本文件记为乌龙链条参与，不给挪威球员进球。',
    'FourFourTwo与NFF/Transfermarkt个别俱乐部命名存在简称差异，本文件优先NFF官方俱乐部和Transfermarkt结构化俱乐部。'
  ]
};

const playerState = {
  schema_version: 'worldcup-data-collector/player-state-v1',
  phase: 'player_state',
  team_id: 'norway',
  team_name_cn: '挪威',
  group: 'I',
  status: 'complete',
  player_state_update_status: 'updated',
  created_at: capturedAt,
  updated_at: capturedAt,
  captured_at: capturedAt,
  source_log: [sources.guardianLive, sources.vg, sources.toi, sources.localReview, sources.nff, sources.transfermarkt],
  round1_summary: {
    match: 'Iraq 1-4 Norway',
    style_fact: 'Haaland终结和压迫惩罚能力、Ødegaard定位球供给、替补高点均上调；防线承压和转换保护仍是风险。',
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
  if (v === null || v === undefined) return 'null';
  if (v < 1000000) return `€${Math.round(v / 1000)}k`;
  return `€${(v / 1000000).toFixed(v >= 10000000 ? 0 : 1)}m`;
}

const md = [];
md.push('# 挪威国家队成员表');
md.push('');
md.push('phase: team_profile  ');
md.push('status: complete  ');
md.push(`captured_at: ${capturedAt}  `);
md.push('player_state_update_status: updated  ');
md.push('scope: I组挪威国家队成员表数据采集；不处理同组其他队，不做预测或竞彩建议。');
md.push('');
md.push('## 来源摘要');
md.push('');
md.push('- NFF官方名单：26人、俱乐部、出生年、国家队出场与进球。');
md.push('- Transfermarkt：号码、年龄、位置、身价和阵容总身价。');
md.push('- Guardian/VG/TOI：首轮伊拉克1-4挪威首发、换人、进球、xG/控球/射门和阵型调整。');
md.push('- 本地正式档案、team-brief、球队总览、战术分析和I组首轮复盘：项目内状态联动。');
md.push('');
md.push('## 教练与球队事实');
md.push('');
md.push('- 主教练：斯托勒·索尔巴肯 / Ståle Solbakken；助教信息本轮可确认Kent Bergersen。');
md.push('- 基础阵型：4-2-3-1 / 4-3-3；首轮Guardian首发为Nyland; Ryerson, Ajer, Heggem, Møller Wolfe; Aursnes, Berge, Ødegaard; Nusa, Haaland, Sørloth。');
md.push('- 首轮变化：VG记录开局4-4-2不顺后调整为4-3-3；73分钟四换带来Østigård头球和末段冲击。');
md.push('- 第二轮前可用性备注：无新增停赛信号；Møller Wolfe抽筋、Schjelderup头部碰撞、Ødegaard负荷需复核。');
md.push('');
md.push('## 26人中文成员表');
md.push('');
md.push('| # | 中文名 | 英文/原文名 | 年龄 | 主位置 | 可客串位置 | 角色定位 | 惯用脚 | 身高/体重 | 俱乐部 | 联赛 | 俱乐部国家 | 身价 | 国家队出场/进球 | 可用性/风险 | 首轮首发/分钟 | 首轮事件 | 状态值 | 来源 |');
md.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');
players.forEach((p) => {
  const sourceNames = p.source_log.map((s) => s.source.replace(/\|/g, '/')).join('；');
  md.push(`| ${p.squad_number} | ${p.chinese_name} | ${p.native_name} | ${p.age} | ${p.primary_position} | ${p.secondary_positions} | ${p.role} | ${fmt(p.preferred_foot)} | ${fmt(p.height_cm)}cm/${fmt(p.weight_kg)}kg | ${p.club_name_cn} (${p.club_name}) | ${p.league_name_cn} (${p.league_name}) | ${p.club_country_cn} | ${money(p.market_value_eur)} | ${p.national_team_caps}/${p.national_team_goals} | ${p.availability}/${p.minute_risk} | ${p.round1.starter ? '是' : '否'}/${p.round1.minutes} | ${p.round1.key_stats_note} | ${p.form_status_1_5} | ${sourceNames} |`);
});
md.push('');
md.push('## 缺口与冲突');
md.push('');
roster.gaps_and_conflicts.forEach((item) => md.push(`- ${item}`));
md.push('');
md.push('## 声明');
md.push('');
md.push('- 本文件只做事实采集与结构化，不包含比分预测、出线预测或竞彩建议。');

fs.writeFileSync(path.join(root, 'data\\packets\\rosters\\norway-roster.json'), JSON.stringify(roster, null, 2), 'utf8');
fs.writeFileSync(path.join(root, 'data\\outputs\\player_state\\norway-player-state.json'), JSON.stringify(playerState, null, 2), 'utf8');
fs.writeFileSync(path.join(root, '队伍\\挪威\\成员表.md'), md.join('\r\n') + '\r\n', 'utf8');

const statusPath = path.join(root, '汇总\\I组成员表建设状态.md');
let status = fs.readFileSync(statusPath, 'utf8');
status = status.replace(/updated_at: .*/, `updated_at: ${capturedAt}`);
status = status.replace(/\| 挪威 \| `019ededd-afc1-7e50-a791-f4a4571a59bc` \| [^|]+ \| `norway-roster\.json` \/ `norway-player-state\.json` \/ `队伍\\挪威\\成员表\.md` \|/, '| 挪威 | `019ededd-afc1-7e50-a791-f4a4571a59bc` | complete | `norway-roster.json` / `norway-player-state.json` / `队伍\\挪威\\成员表.md` |');
status = status.replace(/## 挪威[\s\S]*?$/, '## 挪威\r\n\r\n- status: complete\r\n- files:\r\n  - `data\\packets\\rosters\\norway-roster.json`\r\n  - `data\\outputs\\player_state\\norway-player-state.json`\r\n  - `队伍\\挪威\\成员表.md`\r\n- validation: pending_local_self_check\r\n- player_state_update_status: updated\r\n');
fs.writeFileSync(statusPath, status, 'utf8');
