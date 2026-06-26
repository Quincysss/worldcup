phase: match_data_collection
team/group/match: G组第三轮
status: partial
created_at: 2026-06-25T00:00:00+08:00
updated_at: 2026-06-25T12:12:50.4423921+08:00
owner: worldcup-data-collector
scope: G组第三轮两场赛前事实采集；覆盖积分榜、第三轮赛程、出线语境、竞彩快照、来源与数据缺口；不做比分预测或投注建议
missing_fields:
- FIFA 官方可读页面下的逐队黄牌累计/停赛最终确认未在当前抓取面直接取到
- 新浪体育/新浪彩票未获得可稳定复核的同场结构化赔率页
- 四队 T-75 官方首发尚未公布
- 四队赛前最后一次官方伤停通报未全部可读核验
source_log:
- source_name: 本地G组已完赛复盘
  source_url: K:\worldcup\比赛\已完成比赛\小组赛\G组
  captured_at: 2026-06-25T12:12:50.4423921+08:00
  source_status: read
  supported_fields:
  - 前两轮赛果
  - 本地积分基线
  - 球员状态与纪律线索
- source_name: Wikipedia 2026 FIFA World Cup Group G
  source_url: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_G
  captured_at: 2026-06-25T12:12:50.4423921+08:00
  source_status: read_secondary_citing_fifa
  supported_fields:
  - 小组积分榜
  - 第三轮赛程
  - 场地
  - Match 63/64 编号
  - 32强路径说明
- source_name: 中国足彩网竞彩混合页
  source_url: https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
  captured_at: 2026-06-25T12:12:50.4423921+08:00
  source_status: read
  supported_fields:
  - 比赛编号
  - 普通胜平负
  - 让球胜平负
  - 未开售状态
  - 页面 systemTime
- source_name: FIFA standings page
  source_url: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings
  captured_at: 2026-06-25T12:12:50.4423921+08:00
  source_status: attempted_unreadable_in_current_surface
  supported_fields:
  - 官方积分页 URL 已定位
- source_name: 新浪体育/新浪彩票交叉验证
  source_url: https://sports.sina.com.cn/ ; https://lottery.sina.com.cn/
  captured_at: 2026-06-25T12:12:50.4423921+08:00
  source_status: missing_or_blocked
  supported_fields:
  - 本轮未取得稳定结构化同场赔率页
notes:
- anti_disconnect_minimal_packet_written
- factor_inputs_ready_true_with_gaps
- T-75 官方首发未公布，不视为错误
- 资格标签含派生判断，已单独标注 derived

# 本地基线

已读取本地文件：

- `K:\worldcup\比赛\已完成比赛\小组赛\G组\2026-06-15_伊朗_2-2_新西兰_复盘.md`
- `K:\worldcup\比赛\已完成比赛\小组赛\G组\2026-06-15_比利时_1-1_埃及_复盘.md`
- `K:\worldcup\比赛\已完成比赛\小组赛\G组\2026-06-21_新西兰_1-3_埃及_复盘.md`
- `K:\worldcup\比赛\已完成比赛\小组赛\G组\2026-06-21_比利时_0-0_伊朗_复盘.md`
- 四队成员表：比利时、埃及、伊朗、新西兰

本地赛果基线与 Wikipedia/FIFA 引用积分表一致：

- 2026-06-15 比利时 1-1 埃及
- 2026-06-15 伊朗 2-2 新西兰
- 2026-06-21 新西兰 1-3 埃及
- 2026-06-21 比利时 0-0 伊朗

# 当前积分榜快照

captured_at: `2026-06-25T12:12:50.4423921+08:00`

| 排名 | 球队 | 场次 | 胜 | 平 | 负 | 进球 | 失球 | 净胜球 | 积分 | source_status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 埃及 | 2 | 1 | 1 | 0 | 4 | 2 | +2 | 4 | local_plus_secondary_citing_fifa |
| 2 | 伊朗 | 2 | 0 | 2 | 0 | 2 | 2 | 0 | 2 | local_plus_secondary_citing_fifa |
| 3 | 比利时 | 2 | 0 | 2 | 0 | 1 | 1 | 0 | 2 | local_plus_secondary_citing_fifa |
| 4 | 新西兰 | 2 | 0 | 1 | 1 | 3 | 5 | -2 | 1 | local_plus_secondary_citing_fifa |

官方相关规则字段：

- 当前同分：伊朗与比利时同为 2 分、净胜球 0，伊朗当前进球数 2 高于比利时 1。
- 仍需以 FIFA 官方分组排名规则最终结算；当前抓取面未直接展开官方规则全文。

# 第三轮赛程与同时开球

两场均为同组同时开球，具备明显的另一场赛果依赖：

| 比赛 | 北京时间 | 当地时间 | 场地 | 城市 | Match ID | 竞彩编号 | source_status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 埃及 vs 伊朗 | 2026-06-27 11:00 | 2026-06-26 20:00 PDT | Lumen Field | Seattle | Match 63 | 周五065 | verified_secondary_plus_market |
| 新西兰 vs 比利时 | 2026-06-27 11:00 | 2026-06-26 20:00 PDT | BC Place | Vancouver | Match 64 | 周五066 | verified_secondary_plus_market |

同组同时开球依赖：

- 埃及 vs 伊朗：埃及打平即可锁定前二；伊朗若赢球可直接冲击前二并保留小组第一路径。
- 新西兰 vs 比利时：新西兰必须争胜；比利时赢球最直接，平局大概率要依赖另一场及后续 tie-break。

# 官方/半官方路径与资格标签

32强路径（来自可读二级源，引用 FIFA 路径说明）：

- G组第一：对阵 A/E/H/I/J 组之一的最佳第三名。
- G组第二：对阵 D组第二。
- G组第三：若进入 8 个最佳第三名，可能对阵 B组第一或 I组第一。

资格状态标签（derived，供模型使用，不代替官方公告）：

| 球队 | 标签 | 原因 |
| --- | --- | --- |
| 埃及 | draw_enough; first_place_race | 4 分在手，打平即可锁定前二，赢球可锁定更优排名；输球则可能跌入第二或第三。 |
| 伊朗 | first_place_race; qualification_live | 仍保有前二和小组第一路径；平局是否足够取决于另一场与 tie-break，赢球最稳。 |
| 比利时 | first_place_race; qualification_live | 仍保有前二与头名可能；平局仅保留狭窄路径，赢球最直接。 |
| 新西兰 | must_win | 1 分垫底，只有取胜才保有现实晋级路径。 |

# 纪律/可用性线索

以下为已读本地成员表与复盘中的可用线索；未看到同窗口官方第三轮赛前纪律公报时，一律按 `monitor` 处理：

- 比利时：本地第二轮复盘/成员表记录 Nathan Ngoy 对伊朗一战出现红牌事件，第三轮可用性需以 FIFA/官方赛前名单最终确认。
- 比利时：Timothy Castagne 第一轮对埃及吃黄；Maxim De Cuyper 第一轮替补登场后吃黄。
- 埃及：Ahmed Fatouh、Marwan Ateya 第一轮各有 1 黄；当前未见本轮窗口官方新增停赛确认。
- 伊朗：本地成员表保留 Taremi 小腿、Mohebi 脚踝、Khalilzadeh/Ezatolahi 比赛中治疗信号，但未见官方赛前 `out` 确认。
- 新西兰：当前未从本地成员表与本轮可读外部源看到明确新增 `out`。
- 四队 T-75 官方首发：未公布。

# 体彩/竞彩快照

来源：`https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini`

- 页面 `systemTime`: `2026-06-25 12:00:11`
- `captured_at`: `2026-06-25T12:12:50.4423921+08:00`

## 周五065 埃及 vs 伊朗

- 普通胜平负：`2.32 / 2.50 / 3.35`
- 让球胜平负：`-1`，`5.50 / 3.80 / 1.46`
- 普通胜平负去水隐含概率：
  - 埃及胜 `0.3816`
  - 平 `0.3541`
  - 伊朗胜 `0.2643`
- 让球胜平负去水隐含概率（埃及 -1）：
  - 让胜 `0.1609`
  - 让平 `0.2329`
  - 让负 `0.6062`
- 页面欧赔/参考展示：`3.63 / 2.45 / 2.65`
  - 备注：仅作参考展示，不视为竞彩 SP，不建议与普通胜平负同口径混用。

## 周五066 新西兰 vs 比利时

- 普通胜平负：`未开售`
- 让球胜平负：`+2`，`2.30 / 3.90 / 2.28`
- 普通胜平负：当前不可入模，因同源主市场未开售。
- 让球胜平负去水隐含概率（新西兰 +2）：
  - 让胜 `0.3848`
  - 让平 `0.2270`
  - 让负 `0.3882`
- 页面欧赔/参考展示：`1.16 / 16.15 / 7.68`
  - 备注：仅作参考展示，不视为竞彩 SP。

# 新浪交叉验证

- 已尝试新浪体育/新浪彩票检索 G 组第三轮同场信息。
- 当前抓取面未返回稳定、可结构化落盘的同场竞彩赔率页。
- 记录状态：`fixture_verified_no_structured_odds_from_sina_in_current_surface`

# 数据缺口

- FIFA 官方 standings URL 已定位，但当前抓取面未直接返回可读正文，因此积分榜以本地复盘 + Wikipedia 引 FIFA 表为交叉基线。
- 官方 tiebreaker 全文、逐队黄牌累计和第三轮停赛名单未在本轮可读抓取面完整展开。
- 四队赛前最后一次官方伤停、轮换口径、发布会表态未全部补齐。
- 周五066 新西兰 vs 比利时普通胜平负未开售，因此同源主市场概率不完整。

# Recommendations To Modeler

- 可直接使用：积分榜快照、净胜球、进球数、同时开球依赖、第三轮资格标签、场地、竞彩快照。
- 比利时第三轮防线可用性应保留一层不确定性，Nathan Ngoy 红牌后续处理需等官方赛前名单/纪律确认。
- 新西兰应在模型中视为 `must_win`；埃及应视为 `draw_enough` 且仍有小组第一动机。
- 周五066 只拿到让球胜平负，普通胜平负未开售；如模型要求同源主胜平负，应将该场主市场标为 `missing_or_stale`。
