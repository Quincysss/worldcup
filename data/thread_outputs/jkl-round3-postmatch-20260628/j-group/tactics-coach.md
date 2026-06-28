---
phase: group_round3_postmatch_tactics
group: J
round: 3
status: partial_source_limited
created_at: 2026-06-28T00:00:00+08:00
updated_at: 2026-06-28T00:00:00+08:00
owner: worldcup-tactics-coach
scope: J组第三轮两场赛后战术复盘；不含比分预测、胜平负概率或投注建议
---

# J组第三轮战术复盘

## 事实状态

本地已读取项目规范、`worldcup-tactics-coach` skill、J组三轮赛前 v3 数据采集包、赛前战术包、量化预测 JSON、两场赛前 Markdown、J 组前两轮复盘和 32 强落位文件。

当前没有发现 J 组第三轮数据采集赛后事实包，也没有发现两场单场赛后复盘文件。可用的赛后线索只有：32 强落位文件将阿根廷列为 `1J`，将奥地利列为 `2J` 的 as-things-stand/落位口径。这个线索可用于小组结果方向校验，但不能替代最终比分、实际首发、阵型、换人分钟、牌面和技术统计。

因此本产物为 `partial_source_limited`。所有“实际阵型/比赛计划/换人触发”的结论都标为待数据采集确认，不把赛前预计首发冒充实际首发。

## 阿尔及利亚 vs 奥地利

### 赛前判断复核

赛前战术判断的核心是：奥地利有高压和二点回收优势，但平局管理价值高；阿尔及利亚同分但净胜球落后，若比赛进入后段仍无有利形势，会更主动打开。32 强落位显示奥地利进入 `2J`，因此“奥地利结果管理/晋级路径”这条判断暂时未被推翻。

不能确认的部分更多：阿尔及利亚是否真的后段压上、Benbouali/Amoura 是否作为冲击点触发、奥地利是否通过高压打出过程优势、Alaba/Laimer/中锋选择如何影响出球与压迫，都需要官方首发和事件流补齐。

### 战术复盘口径

- 阵型与计划：实际阵型缺失，不能把赛前阿尔及利亚 `4-3-3/4-4-2`、奥地利 `4-2-3-1` 写成已发生事实。
- 压迫与防守高度：奥地利高压仍是最优先复核变量；阿尔及利亚更可能中位防守加后段前压。
- 转换：阿尔及利亚转换攻击若未改写小组位置，模型应先冻结而非继续上修；奥地利高压身后风险仍保留。
- 定位球：双方赛前都有定位球路径，但缺次数、落点和主罚者结果。
- 关键对位：Mahrez/Ait-Nouri 对奥地利边后卫身后；Seiwald/Laimer/Sabitzer 对阿尔及利亚中场抗压；Benbouali/Gouiri 对奥地利中卫。
- 换人触发：阿尔及利亚后手中锋与速度点、奥地利 Arnautovic/Gregoritsch/Wimmer 是必查项。
- 比赛状态：若奥地利最终确认第二，优先检查 60 分钟后是否从压迫转向控风险。

### 参数更新

- 阿尔及利亚：`third_round_motivation_tactical_shift` 语境确认；`transition_attack_adjustment` 暂不继续上修，等待机会质量；`game_state_tendency` 保留后段打开。
- 奥地利：`game_state_tendency` 和 `draw_management_tendency` 确认度上修；`pressing_adjustment` 维持正向但不可与二点球/转换重复计权。

## 约旦 vs 阿根廷

### 赛前判断复核

赛前战术判断的核心是：阿根廷优势明确，但第三轮更偏保头名、控风险和管理核心负荷；约旦前段应以低位抗压为主，后段若需要结果才打开。32 强落位显示阿根廷为确认 `1J`，说明阿根廷的管理目标达成，但不能据此判断比赛是否大胜、小胜或低事件。

最关键的事实缺口是 Messi 是否首发/替补、阿根廷轮换幅度、Romero/De Paul/Enzo/Lautaro/Alvarez 的实际分钟，以及约旦是否以五后卫低位起手。

### 战术复盘口径

- 阵型与计划：实际阵型缺失，不能把赛前约旦 `5-4-1/3-4-3`、阿根廷 `4-4-2/4-3-3` 写成已发生事实。
- 压迫与防守高度：约旦低位起手仍是最合理的待确认假设；阿根廷选择性压迫不应被写成全场高压。
- 转换：约旦依赖 Al-Taamari/Olwan；阿根廷转换上限取决于约旦后段是否压出。
- 定位球：阿根廷 set-piece 优势高度依赖 Messi 出场和主罚权；约旦定位球只能作为单事件尾部。
- 关键对位：约旦禁区前保护对阿根廷中路回撤；Al-Taamari 对阿根廷边后卫身后；阿根廷轮换中场对约旦二点球。
- 换人触发：Messi 是否替补登场及时间、阿根廷是否用换人控节奏、约旦是否从低位改追分阵型。
- 比赛状态：阿根廷 `1J` 支持“第三轮控风险/保头名”口径，暂不支持无条件上修大胜尾部。

### 参数更新

- 约旦：`pressing_adjustment` 继续负向；`game_state_tendency` 保留“前段低位、后段追分”；`transition_defense_risk` 只在先丢球或后段压出时触发。
- 阿根廷：`game_state_tendency` 管理倾向确认；`third_round_motivation_tactical_shift` 继续压低无条件追大比分；`set_piece_advantage` 必须等待 Messi 实际分钟。

## 成员表与 player_state 回灌建议

- 阿尔及利亚：优先回灌 Mahrez、Gouiri、Benbouali、Ait-Nouri、Zerrouki/Bennacer/Bentaleb 的首发、分钟、事件和内部评分。
- 奥地利：优先回灌 Alaba 位置与分钟、Laimer 角色、Sabitzer 创造、Gregoritsch/Arnautovic 中锋排序、Posch/后卫牌面。
- 约旦：优先回灌 Al-Taamari、Al-Rashdan、Olwan、Abulaila、Al-Arab、Abu Dahab 的首发、分钟、牌面和反击职责。
- 阿根廷：优先回灌 Messi 实际分钟与角色、Alvarez/Lautaro 排序、De Paul/Enzo/Mac Allister 是否轮休、Romero/Medina/Paredes 牌面与伤停风险。

## 给模型线程

当前可用的赛后战术参数只能是低置信的情景校准：

- 阿根廷：已出线强队第三轮的 `game_state_management` 和 `rotation_ceiling_cap` 继续保留。
- 奥地利：同分净胜球优势下的 `draw_management_tendency` 继续保留。
- 阿尔及利亚：`late_chase_context` 语境成立，但执行质量待补。
- 约旦：`low_block_then_chase` 语境成立，但低位是否守住关键窗口待补。

缺最终比分、官方首发和事件流前，不建议把本包作为完整赛后模型回测依据。

## 回派数据采集

请数据采集线程补齐两场最终比分、半场比分、官方首发、实际阵型、换人分钟、牌面、进球助攻、技术统计、官方比赛报告，并确认 J 组最终积分榜与阿根廷 `1J`、奥地利 `2J` 是否 official confirmed。
