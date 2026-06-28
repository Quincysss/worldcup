# 32强 M81-M84 v3 竞彩/赔率风控包

- 范围：M81 美国 vs 波黑；M82 比利时 vs 塞内加尔；M83 葡萄牙 vs 克罗地亚；M84 西班牙 vs 奥地利
- canonical 来源：`data/outputs/knockout/round-of-32-bracket-20260628.json`
- 状态：`hold_not_executable`
- 输出边界：仅做赔率可用性、闸门和风险观察；不提供可执行购买建议

## 本次结论

M81-M84 的 canonical 对阵已由 2026-06-28 复核表确认，但 `data/thread_outputs/round32-m81-m84-v3-20260628/` 下的 data-collector、modeler、red-team 三件套尚未落盘。官方中国竞彩赔率、同源 1X2/让球/大小球快照、比分/总进球/半全场赔率也未取得。因此四场统一保持 `hold_not_executable`，只能作为 `discussion_only` / `observation_only` 风控记录。

## Canonical 对阵确认

| 场次 | canonical 对阵 | 槽位 | 日期/场地 | 晋级路径 |
| --- | --- | --- | --- | --- |
| M81 | 美国 vs 波黑 | 1D vs 3B | 2026-07-01 / San Francisco Bay Area Stadium | M94：M81胜者 vs M82胜者 |
| M82 | 比利时 vs 塞内加尔 | 1G vs 3I | 2026-07-01 / Seattle Stadium | M94：M81胜者 vs M82胜者 |
| M83 | 葡萄牙 vs 克罗地亚 | 2K vs 2L | 2026-07-02 / Toronto Stadium | M93：M83胜者 vs M84胜者 |
| M84 | 西班牙 vs 奥地利 | 1H vs 2J | 2026-07-02 / Los Angeles Stadium | M93：M83胜者 vs M84胜者 |

## 上游依赖状态

| 依赖 | 路径 | 状态 | 影响 |
| --- | --- | --- | --- |
| 数据采集 | `data/thread_outputs/round32-m81-m84-v3-20260628/data-collector.json` | missing | 阻断 |
| 模型输出 | `data/thread_outputs/round32-m81-m84-v3-20260628/modeler.json` | missing | 阻断 |
| 红队审查 | `data/thread_outputs/round32-m81-m84-v3-20260628/red-team.json` | missing | 阻断 |

## 全局 Gate

| Gate | 状态 | 结论 |
| --- | --- | --- |
| T-75 官方首发 | not_available_from_required_upstream | 阻断 |
| 最新伤停、停赛、分钟限制 | not_available_from_required_upstream | 阻断 |
| 官方中国竞彩即时赔率 | not_captured | 阻断 |
| 同源 1X2/让球/大小球快照 | not_captured | 阻断 |
| 比分/总进球/半全场同源赔率 | not_captured | 阻断 |
| 红队 gate | missing | 阻断 |
| 模型概率包 | missing | 阻断 |

## Market Availability

| 场次 | 比赛 | 官方竞彩 | 中国足彩网 | 500 | 1X2 | 让球 | 大小球 | 比分 | 总进球 | 半全场 | 赔率校准 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M81 | 美国 vs 波黑 | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |
| M82 | 比利时 vs 塞内加尔 | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |
| M83 | 葡萄牙 vs 克罗地亚 | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |
| M84 | 西班牙 vs 奥地利 | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | not_captured | unavailable |

## 分场风控

### M81 美国 vs 波黑

- Gate：`hold_not_executable`
- 赔率校准：不可用；无官方竞彩、无同源 1X2/让球/大小球。
- 风险观察：canonical 对阵已确认，但没有 M81-M84 v3 数据、模型和红队包。主队环境叙事、让球和比分路径都不能估值。
- 删除项：可执行票据、模型市场差、比分/总进球/让球估值。
- 临场等待：data-collector、modeler、red-team、T-75 首发、最终伤停/分钟、官方竞彩、同源盘口。

### M82 比利时 vs 塞内加尔

- Gate：`hold_not_executable`
- 赔率校准：不可用；无官方竞彩、无同源 1X2/让球/大小球。
- 风险观察：canonical 对阵已确认，但缺少模型概率和红队 verdict。比利时热门框架与塞内加尔转换尾部都不能在无盘口时转成投注语言。
- 删除项：可执行票据、未定价热门表达、总进球/比分估值。
- 临场等待：data-collector、modeler、red-team、T-75 首发、最终伤停/分钟、官方竞彩、同源盘口。

### M83 葡萄牙 vs 克罗地亚

- Gate：`hold_not_executable`
- 赔率校准：不可用；无官方竞彩、无同源 1X2/让球/大小球。
- 风险观察：该场必须先区分 90 分钟结果与晋级结果。没有模型包和同源赔率时，平局、加时边界、窄胜路径与让球口径都不能校准。
- 删除项：可执行票据、无模型的 90 分钟方向表达、窄比分/让球估值。
- 临场等待：data-collector、modeler、red-team、T-75 首发、最终伤停/分钟、官方竞彩、同源盘口。

### M84 西班牙 vs 奥地利

- Gate：`hold_not_executable`
- 赔率校准：不可用；无官方竞彩、无同源 1X2/让球/大小球。
- 风险观察：西班牙控场叙事与奥地利压迫/转换抵抗都需要模型、首发和赔率同源链确认。比分、总进球、半全场玩法目前没有校准基础。
- 删除项：可执行票据、热门/让球估值、比分/总进球/半全场估值。
- 临场等待：data-collector、modeler、red-team、T-75 首发、最终伤停/分钟、官方竞彩、同源盘口。

## 收口

M81-M84 当前不是可投注化阶段。canonical 对阵已确认，但 required upstream 三件套缺失，官方中国竞彩和同源赔率链缺失，红队 gate 未开启。四场统一保持 `hold_not_executable`，所有内容仅为 `discussion_only` / `observation_only` 风控记录。
