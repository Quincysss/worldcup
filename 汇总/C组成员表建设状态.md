# C组成员表建设状态

updated_at: 2026-06-19T18:20:00+08:00

## 巴西

- status: complete_minimum_current_stage
- owner: main-thread-rescue-worldcup-data-collector
- files:
  - `data\packets\rosters\brazil-roster.json`
  - `data\outputs\player_state\brazil-player-state.json`
  - `队伍\巴西\成员表.md`
- validation:
  - JSON parse: passed
  - required player fields: 26/26 populated
  - mojibake/skeleton scan: passed
- notes:
  - 按主线程救援约束完成巴西最小完整闭环；优先保证 26 人中文名单、俱乐部中文名、球员级 source_log、JSON 可解析与编码扫描通过。
  - 缺口：官方 match centre 完整分钟、评分、惯用脚、身高体重、caps/goals、完整教练组岗位仍需后续迭代。
  - 摩洛哥、海地、苏格兰均已有最小完整闭环产物；等待C组统一校验。

## 摩洛哥

- status: complete_current_stage
- owner: worldcup-data-collector-morocco-thread
- files:
  - `data\packets\rosters\morocco-roster.json`
  - `data\outputs\player_state\morocco-player-state.json`
  - `队伍\摩洛哥\成员表.md`
- validation:
  - JSON parse: passed
  - roster players: 26/26
  - player_state players: 26/26
  - required player fields: 26/26 populated
  - mojibake/skeleton scan: passed
- notes:
  - 摩洛哥专线按救援约束完成正式写入；主线程复核通过。
  - 名单冲突、伤病替换与缺口说明保留在本队 JSON/Markdown 中。

## 海地

- status: complete_minimum_viable
- owner: data-collector-agent-haiti
- outputs:
  - `data\packets\rosters\haiti-roster.json`
  - `data\outputs\player_state\haiti-player-state.json`
  - `队伍\海地\成员表.md`
- validation: local_passed
- validation_detail:
  - JSON parse: passed
  - roster players: 26/26
  - player_state players: 26/26
  - required player fields: 26/26 populated
  - mojibake/skeleton scan: passed
- notes:
  - 26/26 必填字段与球员级 source_log 已补齐；Leverton/Garven 冲突已保留。
  - 主线程复核通过；全字段完美性留待C组统一校验。

## 苏格兰

- status: complete_minimum_rescue
- owner: worldcup-data-collector-scotland
- outputs:
  - `data\packets\rosters\scotland-roster.json`
  - `data\outputs\player_state\scotland-player-state.json`
  - `队伍\苏格兰\成员表.md`
- validation: local_passed
- validation_detail:
  - JSON parse: passed
  - roster players: 26/26
  - player_state players: 26/26
  - required player fields: 26/26 populated
  - mojibake/skeleton scan: passed
- notes:
  - 按主线程救援约束完成最小完整闭环；动态字段缺口见 JSON gaps_and_conflicts。
  - Gilmour/Fletcher最终名单变更已保留为冲突说明。

## C组统一校验

- status: passed_minimum_current_stage
- checked_at: 2026-06-19T18:20:00+08:00
- teams_checked:
  - 巴西
  - 摩洛哥
  - 海地
  - 苏格兰
- validation:
  - roster JSON parse: 4/4 passed
  - player_state JSON parse: 4/4 passed
  - roster players: 26/26 for all four teams
  - player_state players: 26/26 for all four teams
  - required player fields (`chinese_name`, `club_name_cn`, player-level `source_log`): 104/104 populated
  - mojibake/skeleton scan: 0 markers
- known_gaps:
  - 部分球队仍缺官方 match centre 完整分钟、个人评分、惯用脚、身高体重、caps/goals 和完整教练组岗位。
  - 当前版本满足 C 组成员表最小建模输入，第二轮结束后应按实际出场、伤停和表现迭代 `form_status_1_5`。


