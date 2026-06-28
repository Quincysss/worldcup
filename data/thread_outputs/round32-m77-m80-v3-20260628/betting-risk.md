# 32强 M77-M80 v3 竞彩/赔率风控包

- 范围：M77 法国 vs 瑞典；M78 科特迪瓦 vs 挪威；M79 墨西哥 vs 厄瓜多尔；M80 英格兰 vs 刚果金
- canonical 来源：`data/outputs/knockout/round-of-32-bracket-20260628.json`
- 最终红队：`data/thread_outputs/round32-m77-m80-v3-20260628/red-team.json`，22:15:20，`overall_verdict=hold`
- 状态：`hold_not_executable`
- 输出边界：仅做赔率可用性、闸门和风险观察；不提供可执行购买建议

## 本次最终刷新结论

data/model/red-team 三件套已经齐备。最终红队确认模型已吸收 data/tactics，但整体仍是 `partial_source_limited`，并维持 `overall_verdict=hold`。当前阻断项为：T-75 官方首发未取得、最终伤停/分钟限制仍不完整、官方中国竞彩赔率未取得、同源 1X2/让球/大小球快照缺失、红队 verdict 未放行。因此 M77-M80 统一保持 `hold_not_executable`。

## Canonical 对阵确认

| 场次 | canonical 对阵 | 槽位 | 日期/场地 | 说明 |
| --- | --- | --- | --- | --- |
| M77 | 法国 vs 瑞典 | 1I vs 3F | 2026-06-30 / New York New Jersey Stadium | 使用 2026-06-28 复核表 |
| M78 | 科特迪瓦 vs 挪威 | 2E vs 2I | 2026-06-30 / Dallas Stadium | 使用 2026-06-28 复核表 |
| M79 | 墨西哥 vs 厄瓜多尔 | 1A vs 3E | 2026-06-30 / Mexico City Stadium | 使用 2026-06-28 复核表 |
| M80 | 英格兰 vs 刚果金 | 1L vs 3K | 2026-07-01 / Atlanta Stadium | 已纠正 2026-06-27 临时对阵，不使用英格兰 vs 塞内加尔 |

## 上游依赖状态

| 依赖 | 路径 | 当前状态 | 风控影响 |
| --- | --- | --- | --- |
| 数据采集 | `data/thread_outputs/round32-m77-m80-v3-20260628/data-collector.json` | present_partial_source_limited，22:08:44 | 只能讨论 |
| 模型输出 | `data/thread_outputs/round32-m77-m80-v3-20260628/modeler.json` | completed_partial_source_limited_data_and_tactics_absorbed，22:11:42 | 只能讨论 |
| 红队审查 | `data/thread_outputs/round32-m77-m80-v3-20260628/red-team.json` | complete_red_team_review_after_final_model_fill，22:15:20，verdict=`hold` | 阻断 |

## 全局 Gate

| Gate | 状态 | 结论 |
| --- | --- | --- |
| T-75 官方首发 | missing | 阻断 |
| 最新伤停、停赛、分钟限制 | partial_source_limited_not_final | 阻断 |
| 官方中国竞彩即时赔率 | missing | 阻断 |
| 同源 1X2/让球/大小球快照 | missing | 阻断 |
| 比分/总进球/半全场同源赔率 | not_captured | 阻断 |
| 天气/裁判/临场环境 | missing_or_partial | 只能讨论 |
| 红队 gate | complete_hold | 阻断 |
| 90 分钟与晋级边界 | 仅有 90 分钟 1X2，未模拟加时/点球晋级 | 只能讨论 |

## Market Availability

| 场次 | 比赛 | 官方竞彩 | 中国足彩网 | 500 | 1X2 | 让球 | 大小球 | 比分 | 总进球 | 半全场 | 赔率校准 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M77 | 法国 vs 瑞典 | missing | not_captured | not_captured | missing same-source | missing same-source | missing same-source | not_captured | not_captured | not_captured | unavailable |
| M78 | 科特迪瓦 vs 挪威 | missing | not_captured | not_captured | missing same-source | missing same-source | missing same-source | not_captured | not_captured | not_captured | unavailable |
| M79 | 墨西哥 vs 厄瓜多尔 | missing | not_captured | not_captured | missing same-source | missing same-source | missing same-source | not_captured | not_captured | not_captured | unavailable |
| M80 | 英格兰 vs 刚果金 | missing | not_captured | not_captured | missing same-source | missing same-source | missing same-source | not_captured | not_captured | not_captured | unavailable |

## 模型观察，仅限风控语境

| 场次 | 模型 90 分钟方向 | xG | 主要尾部 | 风控解释 |
| --- | --- | --- | --- | --- |
| M77 | 法国 61.94% / 平 20.35% / 瑞典 17.71% | 2.10-1.03 | 瑞典定位球、双前锋、1-1/2-1 簇 | 法国方向可见，但大胜尾部有重复计量风险 |
| M78 | 科特迪瓦 32.92% / 平 24.08% / 挪威 43.00% | 1.39-1.62 | 双向进球、哈兰德/厄德高分钟、科特迪瓦转换 | 挪威只是窄优势，科特迪瓦+平合计更大 |
| M79 | 墨西哥 41.73% / 平 25.78% / 厄瓜多尔 32.49% | 1.44-1.24 | 1-1、1-0、2-1、0-1 | 低比分和平局尾部必须保留 |
| M80 | 英格兰 64.90% / 平 20.10% / 刚果金 15.00% | 2.07-0.88 | 2-0、1-0、2-1、1-1 | 英格兰优势受右后卫伤情与刚果金转换制约 |

## 分场风控

### M77 法国 vs 瑞典

- Gate：`hold_not_executable`
- 赔率校准：不可用；官方中国竞彩与同源 1X2/让球/大小球未取得。
- 风险观察：法国优势存在，但红队提示法国 4+ 进球尾部可能受到近期大胜、球员状态和转换战术重复计量影响。瑞典定位球、制空和双前锋路径让法国 90 分钟不胜质量仍超过三分之一。
- 删除项：可执行票据、让球/比分估值、无官方同源赔率的模型市场差。
- 临场等待：T-75 首发、法国攻击线组合与楚阿梅尼分钟、瑞典双前锋形态、官方竞彩、同源盘口、红队 verdict 解除 hold。

### M78 科特迪瓦 vs 挪威

- Gate：`hold_not_executable`
- 赔率校准：不可用；官方中国竞彩与同源 1X2/让球/大小球未取得。
- 风险观察：挪威 43.00% 只是窄优势，且高度依赖哈兰德、厄德高、努萨、瑟洛特等人的首发和分钟。该场 BTTS 与事件波动最高，科特迪瓦的身体对抗、转换和定位球不能被压成普通弱势方。
- 删除项：单球员叙事票据化、方向腿执行化、无同源价格的总进球或比分映射。
- 临场等待：T-75 首发、挪威核心攻击手分钟、科特迪瓦前场配置、官方竞彩、同源盘口、红队 verdict 解除 hold。

### M79 墨西哥 vs 厄瓜多尔

- Gate：`hold_not_executable`
- 赔率校准：不可用；官方中国竞彩与同源 1X2/让球/大小球未取得。
- 风险观察：墨西哥主场/海拔是实质因素，但也容易在环境、战术和后续市场中重复计量。厄瓜多尔击败德国后的转换信号仍活跃，但也不能从单场结果过拟合。1-1 是最高比分簇，平局尾部是核心风险。
- 删除项：主场叙事票据化、排除平局的单向表达、无官方同源赔率的低比分估值。
- 临场等待：T-75 首发、墨西哥第三轮状态刷新、厄瓜多尔德国战后分钟、墨西哥城天气/海拔条件、官方竞彩、同源盘口、红队 verdict 解除 hold。

### M80 英格兰 vs 刚果金

- Gate：`hold_not_executable`
- canonical 防错：只使用英格兰 vs 刚果金，不使用 2026-06-27 临时英格兰 vs 塞内加尔。
- 赔率校准：不可用；官方中国竞彩与同源 1X2/让球/大小球未取得。
- 风险观察：英格兰模型优势较高，但右后卫伤情会显著影响刚果金左侧转换和反击路径。英格兰公众队属性、4+ 进球尾部、让球和比分簇都必须等待同源赔率与首发确认。
- 删除项：错误对阵输出、热门方向执行化、无盘口的让球/比分/总进球映射。
- 临场等待：T-75 首发、英格兰右后卫伤情、刚果金 Wissa/Mayele/Bakambu/Mbemba 状态、官方竞彩、同源盘口、红队 verdict 解除 hold。

## 收口

M77-M80 当前不是可投注化阶段。最终红队已经落盘并确认模型吸收 data/tactics，但 verdict 仍为 `hold`；T-75 官方首发、最终伤停/分钟限制、官方中国竞彩即时赔率、同源 1X2/让球/大小球快照均未闭合。四场统一保持 `hold_not_executable`，所有内容仅为 `discussion_only` / `observation_only` 风控记录。
