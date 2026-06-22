const fs = require("fs");
const path = require("path");

const root = "E:\\worldcup";
const capturedAt = "2026-06-21T00:38:00+08:00";
const rosterPath = path.join(root, "data\\packets\\rosters\\portugal-roster.json");
const statePath = path.join(root, "data\\outputs\\player_state\\portugal-player-state.json");
const mdPath = path.join(root, "队伍\\葡萄牙\\成员表.md");
const reviewPath = path.join(root, "比赛\\已完成比赛\\小组赛\\K组\\2026-06-17_葡萄牙_1-1_刚果金_复盘.md");

const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));

const ratingNote = "未找到稳定同源赛后评分；评分缺口已同步记录，rating保留null。";

function markUpdatedPlayer(player) {
  if (player.round1) {
    player.round1.rating = null;
    player.round1.rating_note = ratingNote;
    if (player.round1.started === false && player.round1.minutes === 0) {
      player.round1.unused_sub = true;
      player.round1.source_status = player.round1.source_status === "uncertain" ? "probable" : player.round1.source_status;
    }
  }
  if (player.availability) {
    player.availability.captured_at = capturedAt;
  }
  if (Array.isArray(player.source_log)) {
    player.source_log = player.source_log.map((entry) => ({ ...entry, captured_at: capturedAt }));
  }
}

roster.updated_at = capturedAt;
roster.player_state_update_status = "updated";
roster.status = "complete";
roster.round1_match_shape.source_status = "confirmed_for_score_probable_for_full_events";
roster.gaps_and_conflicts = [
  "葡萄牙侧26名球员的首发、分钟、换人、进球、助攻、牌、伤停/可用性和评分缺口说明已同步到 roster、player_state 和成员表。",
  "未找到稳定同源球员评分和完整技术统计；rating保留null，但每名球员均有rating_note。",
  "国家队caps/goals未逐人可靠核验，保留null。",
  "FourFourTwo仍称27人预选且门将待裁，Transfermarkt列26人；本文件采用Transfermarkt 26人作为主名单，并保留冲突。",
  "Rúben Dias伤情口径冲突：Guardian赛前称其因伤缺席，但名单行又列替补；标记conflicting并建议赛前官方名单复核。",
  "刚果金本队成员表/player_state由刚果金线程负责；本文件只记录单场双方事实。"
];
roster.players.forEach(markUpdatedPlayer);

state.updated_at = capturedAt;
state.status = "complete";
state.player_state_update_status = "updated";
state.round_context = "K组第一轮 葡萄牙 1-1 刚果金；葡萄牙26名球员首发/分钟/换人/事件/伤停与评分缺口说明已同步。刚果金本队状态由刚果金线程负责。";
state.gaps_and_conflicts = roster.gaps_and_conflicts;
state.players.forEach(markUpdatedPlayer);

function tableRows(players) {
  return players.map((p) => {
    const r = p.round1;
    const used = r.started ? `首发${r.minutes}分钟` : (r.minutes > 0 ? `替补${r.minutes}分钟` : "未登场");
    const events = [
      r.subbed_on_minute ? `${r.subbed_on_minute}'上` : "",
      r.subbed_off_minute ? `${r.subbed_off_minute}'下` : "",
      r.goals ? `${r.goals}球` : "",
      r.assists ? `${r.assists}助` : "",
      r.yellow_cards ? `${r.yellow_cards}黄` : "",
    ].filter(Boolean).join("，");
    return `| ${p.squad_number} | ${p.chinese_name} | ${p.english_name} | ${p.primary_position || p.position_code} | ${p.club_name_cn} | ${used}${events ? "，" + events : ""} | ${p.form_status_1_5} | ${p.round1.rating === null ? "null；缺口已说明" : p.round1.rating} |`;
  }).join("\n");
}

const memberMd = `# 葡萄牙国家队成员表

phase: team_profile
status: complete
updated_at: ${capturedAt}
group: K组
player_state_update_status: updated

## 数据口径

- 只处理葡萄牙国家队，不处理刚果金、乌兹别克斯坦、哥伦比亚。
- 26人主名单采用 Transfermarkt 2026 葡萄牙详细名单；FourFourTwo 仍保留“27人预选/门将待裁”口径，冲突保留。
- K组第一轮葡萄牙 1-1 刚果金的赛果、首发、换人、进球链和葡萄牙球员状态已同步。评分未找到稳定同源数据，逐人保留 null 并写入缺口说明。
- \`form_status_1_5\` 是后续模型输入，不是投注结论。

## 教练与球队事实

- 主教练：罗伯托·马丁内斯（Roberto Martínez）。
- 首轮阵型：4-2-3-1。首发为 Diogo Costa；Cancelo、Araújo、Veiga、Mendes；Vitinha、João Neves；Bernardo、Bruno Fernandes、Pedro Neto；Cristiano Ronaldo。
- 首轮关键事件：João Neves 第6分钟头球破门，Pedro Neto 助攻；Yoane Wissa 在45+5分钟为刚果金扳平。
- 首轮换人：46' Francisco Conceição 换 Bernardo Silva；72' Rafael Leão 换 Pedro Neto；72' Nélson Semedo 换 Nuno Mendes；83' Gonçalo Ramos 换 Vitinha。

## 26人中文成员表

| 号 | 中文名 | 原文名 | 位置 | 俱乐部 | 首轮状态 | form | 评分 |
| --- | --- | --- | --- | --- | --- | --- | --- |
${tableRows(roster.players)}

## 缺口与冲突

${roster.gaps_and_conflicts.map((g) => `- ${g}`).join("\n")}

## 来源

${roster.source_log.map((s) => `- ${s.source}: ${s.url}`).join("\n")}
`;

const reviewMd = `# 葡萄牙 1-1 刚果金复盘

phase: post_match_review
status: complete
updated_at: ${capturedAt}
group: K组
match: Portugal 1-1 DR Congo
player_state_update_status: updated
scope: 单场复盘主责；葡萄牙球员状态同步；刚果金本队 player_state/成员表由刚果金线程负责。

## 赛果与来源

- 比赛：葡萄牙 1-1 刚果金。
- 日期：2026-06-17。
- 场地：Houston Stadium / 休斯敦。
- 葡萄牙阵型：4-2-3-1。
- 来源状态：赛果、首发、主要换人、进球链为 confirmed/probable；逐人评分和完整技术统计缺同源稳定数据，已逐人写 rating=null 与缺口说明。

## 首发与换人

### 葡萄牙首发

Diogo Costa；João Cancelo、Tomás Araújo、Renato Veiga、Nuno Mendes；Vitinha、João Neves；Bernardo Silva、Bruno Fernandes、Pedro Neto；Cristiano Ronaldo。

### 葡萄牙换人

| 分钟 | 换上 | 换下 |
| --- | --- | --- |
| 46' | Francisco Conceição | Bernardo Silva |
| 72' | Rafael Leão | Pedro Neto |
| 72' | Nélson Semedo | Nuno Mendes |
| 83' | Gonçalo Ramos | Vitinha |

## 进球、助攻与牌

| 分钟 | 球队 | 进球 | 助攻/来源 | 说明 |
| --- | --- | --- | --- | --- |
| 6' | 葡萄牙 | João Neves | Pedro Neto | 左路传中后头球破门。 |
| 45+5' | 刚果金 | Yoane Wissa | Arthur Masuaku | 角球二次进攻后头球扳平。 |

| 球员 | 球队 | 事件 |
| --- | --- | --- |
| Tomás Araújo | 葡萄牙 | 黄牌，90+2'。 |

## 比赛事实摘要

- 葡萄牙很早领先，但没有把控球和纸面优势稳定转化为第二球。
- 刚果金使用更直接的身体对抗和反击路线，依靠半场结束前的定位球/二次球机会扳平。
- 葡萄牙下半场先换下 Bernardo Silva，随后增加 Leão、Semedo、Ramos，但未改写比分。
- Ronaldo 打满全场但没有进球或助攻；João Neves 与 Pedro Neto 是葡萄牙进球链上的明确正向点。

## 赛前预测出入

赛前文件倾向葡萄牙 2-0，实际为 1-1。主要出入不是葡萄牙完全失势，而是领先后未形成持续压制，刚果金通过定位球二次进攻扳平；这验证了赛前文件提到的“热门过程优势不能自动写成深盘穿透”和“刚果金反击/定位球不是零风险”。

## 葡萄牙球员状态同步

| 号 | 球员 | 首发/分钟 | 事件 | form | 评分处理 |
| --- | --- | --- | --- | --- | --- |
${roster.players.map((p) => {
  const r = p.round1;
  const used = r.started ? `首发${r.minutes}` : (r.minutes ? `替补${r.minutes}` : "未登场");
  const ev = [r.goals ? `${r.goals}球` : "", r.assists ? `${r.assists}助` : "", r.yellow_cards ? `${r.yellow_cards}黄` : ""].filter(Boolean).join("，") || "-";
  return `| ${p.squad_number} | ${p.chinese_name} | ${used} | ${ev} | ${p.form_status_1_5} | null，缺口已说明 |`;
}).join("\n")}

## player_state_update_status

updated

葡萄牙26名球员的首发、分钟、换人、进球、助攻、牌、伤停/可用性、评分或评分缺口说明已同步到：

- data\\outputs\\player_state\\portugal-player-state.json
- 队伍\\葡萄牙\\成员表.md
- data\\packets\\rosters\\portugal-roster.json

## 缺口与冲突

${roster.gaps_and_conflicts.map((g) => `- ${g}`).join("\n")}

## source_log

${roster.source_log.map((s) => `- ${s.source} | ${s.url} | captured_at=${capturedAt}`).join("\n")}
`;

fs.mkdirSync(path.dirname(reviewPath), { recursive: true });
fs.writeFileSync(rosterPath, JSON.stringify(roster, null, 2), "utf8");
fs.writeFileSync(statePath, JSON.stringify(state, null, 2), "utf8");
fs.writeFileSync(mdPath, memberMd, "utf8");
fs.writeFileSync(reviewPath, reviewMd, "utf8");
