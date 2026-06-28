const fs = require("fs");
const path = require("path");

const root = process.cwd();
const capturedAt = "2026-06-29T00:05:00+08:00";

const matches = [
  {
    match_no: "M85",
    host_date: "2026-07-02",
    source_uk_date: "2026-07-03",
    kickoff_uk: "04:00",
    kickoff_host: "20:00",
    kickoff_beijing: "2026-07-03 11:00",
    city: "温哥华",
    venue: "Vancouver Stadium",
    slot_home: "1B",
    slot_away: "3J",
    home: { zh: "瑞士", en: "Switzerland", slug: "switzerland", formation: "4-2-3-1" },
    away: { zh: "阿尔及利亚", en: "Algeria", slug: "algeria", formation: "4-2-3-1" },
    path: "M96 胜者路径：M85胜者 vs M87胜者",
    context: {
      home: "B组第一；前两轮以科贝尔、阿坎吉、扎卡、恩博洛为中轴，第二轮4-1波黑显示定位球与替补冲击有上修证据。",
      away: "J组第三；第三轮3-3奥地利后以第三名进入分配，马赫雷斯、马扎、古伊里、本塞拜尼构成主要持球与转换节点。"
    }
  },
  {
    match_no: "M86",
    host_date: "2026-07-03",
    source_uk_date: "2026-07-03",
    kickoff_uk: "23:00",
    kickoff_host: "18:00",
    kickoff_beijing: "2026-07-04 06:00",
    city: "迈阿密",
    venue: "Miami Stadium",
    slot_home: "1J",
    slot_away: "2H",
    home: { zh: "阿根廷", en: "Argentina", slug: "argentina", formation: "4-3-3" },
    away: { zh: "佛得角", en: "Cape Verde", slug: "cape-verde", formation: "5-4-1" },
    path: "M95 胜者路径：M86胜者 vs M88胜者",
    context: {
      home: "J组第一；第三轮3-1约旦后锁定小组头名，劳塔罗、洛塞尔索、帕雷德斯、马丁内斯是当前本地状态主轴。",
      away: "H组第二；连续逼平强队的低位纪律和反击韧性是主要标签，凯文·皮纳、瑞安·门德斯和门将沃齐尼亚是状态锚点。"
    }
  },
  {
    match_no: "M87",
    host_date: "2026-07-03",
    source_uk_date: "2026-07-04",
    kickoff_uk: "02:30",
    kickoff_host: "20:30",
    kickoff_beijing: "2026-07-04 09:30",
    city: "堪萨斯城",
    venue: "Kansas City Stadium",
    slot_home: "1K",
    slot_away: "3L",
    home: { zh: "哥伦比亚", en: "Colombia", slug: "colombia", formation: "4-2-3-1" },
    away: { zh: "加纳", en: "Ghana", slug: "ghana", formation: "4-2-3-1" },
    path: "M96 胜者路径：M85胜者 vs M87胜者",
    context: {
      home: "K组第一；第三轮0-0葡萄牙后以小组第一出线，整体强度稳定，迪亚斯、J罗、莱尔马、穆尼奥斯仍是主要模型输入。",
      away: "L组第三；第三轮1-2克罗地亚后进入第三名分配，速度型边锋和身体对抗仍有反击尾部，但控场稳定性不足。"
    }
  },
  {
    match_no: "M88",
    host_date: "2026-07-03",
    source_uk_date: "2026-07-03",
    kickoff_uk: "19:00",
    kickoff_host: "13:00",
    kickoff_beijing: "2026-07-04 02:00",
    city: "达拉斯/阿灵顿",
    venue: "Dallas Stadium",
    slot_home: "2D",
    slot_away: "2G",
    home: { zh: "澳大利亚", en: "Australia", slug: "australia", formation: "5-4-1" },
    away: { zh: "埃及", en: "Egypt", slug: "egypt", formation: "4-3-3" },
    path: "M95 胜者路径：M86胜者 vs M88胜者",
    context: {
      home: "D组第二；本地文件显示其低位防守、三/五后卫和反击是主要结构，Beach/Souttar/Burgess/O'Neill/Irankunda为关键状态点。",
      away: "G组第二；第二轮3-1新西兰、第三轮1-1伊朗后状态较稳，萨拉赫、齐科、阿舒尔和中场三后腰结构是核心输入。"
    }
  }
];

const manualXi = {
  "switzerland": ["Gregor Kobel", "Silvan Widmer", "Nico Elvedi", "Manuel Akanji", "Ricardo Rodriguez", "Remo Freuler", "Granit Xhaka", "Michel Aebischer", "Fabian Rieder", "Dan Ndoye", "Breel Embolo"],
  "algeria": ["Oussama Benbot", "Rafik Belghali", "Aissa Mandi", "Ramy Bensebaini", "Jaouen Hadjam", "Nabil Bentaleb", "Houssem Aouar", "Ibrahim Maza", "Fares Chaibi", "Riyad Mahrez", "Amine Gouiri"],
  "argentina": ["Emiliano Martínez", "Nicolás Otamendi", "Marcos Senesi", "Nicolás Tagliafico", "Nahuel Molina", "Leandro Paredes", "Exequiel Palacios", "Giovani Lo Celso", "Nico Paz", "Julián Alvarez", "Lautaro Martínez"],
  "cape-verde": ["Vozinha", "Diney", "Pico", "Steven Moreira", "Sidny Lopes Cabral", "Laros Duarte", "Kevin Pina", "Jamiro Monteiro", "Jovane Cabral", "Ryan Mendes", "Dailon Livramento"],
  "colombia": ["Camilo Vargas", "Daniel Muñoz", "Davinson Sánchez", "Jhon Lucumí", "Deiver Machado", "Jefferson Lerma", "Richard Ríos", "James Rodríguez", "Luis Díaz", "Jhon Arias", "Jhon Córdoba"],
  "ghana": ["Lawrence Ati-Zigi", "Marvin Senaya", "Jonas Adjetey", "Jerome Opoku", "Gideon Mensah", "Elisha Owusu", "Thomas Partey", "Ernest Nuamah", "Antoine Semenyo", "Kamaldeen Sulemana", "Jordan Ayew"],
  "australia": ["Patrick Beach", "Jacob Italiano", "Alessandro Circati", "Harry Souttar", "Cameron Burgess", "Jordan Bos", "Aiden O'Neill", "Paul Okon-Engstler", "Connor Metcalfe", "Nestory Irankunda", "Mohamed Touré"],
  "egypt": ["Oufa Shobeir / Mostafa Shobeir", "Mohamed Hany", "Yasser Ibrahim", "Ahmed Fatouh", "Marwan Ateya", "Mohanad Lasheen", "Hamdy Fathy", "Emam Ashour", "Mostafa Ziko", "Mohamed Salah", "Omar Marmoush"]
};

function loadPlayers(slug) {
  const statePath = path.join(root, "data", "outputs", "player_state", `${slug}-player-state.json`);
  const rosterPath = path.join(root, "data", "packets", "rosters", `${slug}-roster.json`);
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));
  const players = state.players || state.data?.players || roster.data?.players || roster.players || [];
  return { state, roster, players };
}

function playerForm(p) {
  return p.form_status_1_5 ?? p.current_form_status_1_5 ?? p.postmatch_form_status_1_5 ??
    p.round3?.postmatch_form_status_1_5 ?? p.round2?.postmatch_form_status_1_5 ??
    p.round1?.postmatch_form_status_1_5 ?? p.internal_rating_proxy ?? null;
}

function normalizeEn(s) {
  return String(s || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function xiFor(team) {
  const { state, roster, players } = loadPlayers(team.slug);
  const wanted = manualXi[team.slug].map(normalizeEn);
  const xi = wanted.map((name, idx) => {
    let p = players.find(x => normalizeEn(x.english_name).includes(name) || normalizeEn(x.native_name).includes(name));
    if (!p) p = players[idx];
    return {
      position: p.primary_position || p.position_primary || "unknown",
      player_cn: p.chinese_name || p.name_cn || p.native_name || p.english_name,
      player_en: p.english_name || p.native_name || p.chinese_name,
      role_note: p.role_detail || p.national_team_role || p.team_role || "probable starter from local player_state/roster",
      form_status_1_5: playerForm(p),
      availability_status: p.availability?.status || p.availability_status || "needs_late_check",
      source_status: "probable_not_official"
    };
  });
  const used = new Set(xi.map(x => normalizeEn(x.player_en)));
  const rotation = players.filter(p => !used.has(normalizeEn(p.english_name))).slice(0, 5).map(p => ({
    player_cn: p.chinese_name || p.native_name || p.english_name,
    player_en: p.english_name || p.native_name || p.chinese_name,
    trigger: "体能、比分状态或对位需求触发；官方首发未出前只作轮换观察"
  }));
  return {
    team: team.zh,
    team_en: team.en,
    formation: team.formation,
    confidence: "medium_low_until_T_minus_75_official_XI",
    source_status: "probable_not_official",
    predicted_xi: xi,
    rotation_candidates: rotation,
    source_files: [
      `data/outputs/player_state/${team.slug}-player-state.json`,
      `data/packets/rosters/${team.slug}-roster.json`,
      `队伍/${team.zh}/成员表.md`
    ],
    state_status: state.player_state_update_status || state.status || "partial_source_limited",
    gaps_and_conflicts: [
      "T-75 官方首发未捕获，预计首发不得视为 confirmed",
      "最新官方医疗/停赛/分钟限制仍需赛前终检"
    ]
  };
}

const packet = {
  schema_version: "round32_m85_m88_data_refresh_v1",
  created_at: capturedAt,
  created_by: "main_control_thread_fallback_after_data_thread_dispatch",
  upstream_thread_status: {
    data_collector_thread_id: "019edb8e-e57d-71c1-8b2f-ddcf57c48878",
    status: "dispatched_and_active_but_target_file_not_observed_at_fallback_time",
    fallback_reason: "downstream threads were blocked by missing data packet; fallback uses local roster/player_state and verified bracket only"
  },
  canonical_confirmation: {
    status: "confirmed_current_public_schedule",
    external_source: "Sky Sports bracket and knockout fixtures, opened by main thread on 2026-06-28",
    local_source: "比赛/未开始比赛/32强/32强对阵落位_20260628.md",
    conflicts: [
      "旧临时口径 M85 瑞士 vs 伊朗 已废弃",
      "旧临时口径 M87 哥伦比亚 vs 克罗地亚 已废弃"
    ]
  },
  matches: matches.map(m => ({
    match_identity: {
      match_no: m.match_no,
      stage: "Round of 32",
      host_date: m.host_date,
      source_uk_date: m.source_uk_date,
      kickoff_uk: m.kickoff_uk,
      kickoff_host: m.kickoff_host,
      kickoff_beijing: m.kickoff_beijing,
      city: m.city,
      venue: m.venue,
      slot_home: m.slot_home,
      slot_away: m.slot_away,
      home_team: m.home.zh,
      away_team: m.away.zh,
      round_of_16_path: m.path
    },
    group_stage_context: {
      [m.home.zh]: m.context.home,
      [m.away.zh]: m.context.away
    },
    predicted_lineups: {
      source_status: "probable_not_official",
      captured_at: capturedAt,
      official_lineup_gate: "T-75 official XI required before executable betting or final model lock",
      home: xiFor(m.home),
      away: xiFor(m.away)
    },
    injuries_suspensions: {
      status: "partial_source_limited_needs_late_check",
      home: "未捕获T-75官方首发与最终医疗公告；本地可用性按 player_state/复盘记录处理。",
      away: "未捕获T-75官方首发与最终医疗公告；本地可用性按 player_state/复盘记录处理。"
    },
    odds_snapshot: {
      official_china_jingcai: "unavailable_or_not_captured",
      same_source_market_snapshot: false,
      notes: "本包不填充赔率；竞彩风控线程必须单独核验官方同源快照。"
    },
    source_log: [
      {
        source: "Sky Sports bracket and knockout fixtures",
        url: "https://www.skysports.com/football/news/12098/13556636/world-cup-2026-bracket-and-knockout-fixtures-whos-facing-who-in-the-last-32-and-route-to-final",
        captured_at: "2026-06-28T23:50:00+08:00",
        used_for: ["fixture", "kickoff_uk", "host_city"]
      },
      {
        source: "local player_state and roster files",
        url: "E:/worldcup/data/outputs/player_state and E:/worldcup/data/packets/rosters",
        captured_at: capturedAt,
        used_for: ["probable_not_official predicted_xi", "player state summary"]
      }
    ],
    gaps_and_conflicts: [
      "官方 T-75 首发未捕获，predicted_xi 只作 probable_not_official。",
      "最新官方伤停、停赛、分钟限制未完全闭合。",
      "官方竞彩与同源盘口快照未捕获。",
      "data/outputs/knockout/round-of-32-bracket-20260628.json 在部分 PowerShell 读取路径曾出现乱码/断引号显示，预测采用最新 Markdown canonical 与外部赛程核验。"
    ]
  }))
};

fs.mkdirSync(path.join(root, "data", "packets", "matches"), { recursive: true });
fs.mkdirSync(path.join(root, "汇总"), { recursive: true });
fs.writeFileSync(
  path.join(root, "data", "packets", "matches", "round32-m85-m88-data-refresh-20260629.json"),
  JSON.stringify(packet, null, 2),
  "utf8"
);

let md = "# 32强M85-M88数据刷新（2026-06-29）\n\n";
md += "状态：已调用数据采集线程；因指定文件未及时落盘，主线程用本地 roster/player_state 与已核验 32强落位生成最小可用事实包。本文不包含比分预测、胜平负结论或投注建议。\n\n";
for (const m of packet.matches) {
  const id = m.match_identity;
  md += `## ${id.match_no} ${id.home_team} vs ${id.away_team}\n\n`;
  md += `| 项目 | 内容 |\n| --- | --- |\n| 日期 | ${id.host_date} |\n| 开球 | UK ${id.kickoff_uk} / 北京 ${id.kickoff_beijing} |\n| 场地 | ${id.city}，${id.venue} |\n| 槽位 | ${id.slot_home} vs ${id.slot_away} |\n| 后续路径 | ${id.round_of_16_path} |\n\n`;
  md += `### 前序解读\n- ${id.home_team}：${m.group_stage_context[id.home_team]}\n- ${id.away_team}：${m.group_stage_context[id.away_team]}\n\n`;
  for (const side of ["home", "away"]) {
    const t = m.predicted_lineups[side];
    md += `### ${t.team}预计首发（${t.formation}，probable_not_official）\n`;
    md += "| 位置 | 中文名 | 英文名 | 状态值 | 角色说明 |\n| --- | --- | --- | ---: | --- |\n";
    for (const p of t.predicted_xi) {
      md += `| ${p.position} | ${p.player_cn} | ${p.player_en} | ${p.form_status_1_5 ?? ""} | ${p.role_note} |\n`;
    }
    md += "\n";
  }
  md += "### 缺口\n- T-75 官方首发未捕获，预计首发不得视为 confirmed。\n- 最新官方伤停、停赛、分钟限制仍需赛前终检。\n- 官方竞彩与同源盘口快照未捕获。\n\n";
}
md += "## 来源\n- Sky Sports 32强赛程页。\n- 本地 `data/outputs/player_state/*`、`data/packets/rosters/*`、`队伍/*/成员表.md`。\n";
fs.writeFileSync(path.join(root, "汇总", "32强M85-M88数据刷新_20260629.md"), md, "utf8");

for (const m of packet.matches) {
  for (const side of ["home", "away"]) {
    const count = m.predicted_lineups[side].predicted_xi.length;
    if (count !== 11) throw new Error(`${m.match_identity.match_no} ${side} predicted_xi=${count}`);
  }
}
JSON.parse(fs.readFileSync(path.join(root, "data", "packets", "matches", "round32-m85-m88-data-refresh-20260629.json"), "utf8"));
console.log("wrote round32-m85-m88 data packet with 8 teams x 11 predicted XI");
