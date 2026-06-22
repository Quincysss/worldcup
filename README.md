# 2026 世界杯分析项目迁移说明

updated_at: 2026-06-18
project_root: `K:\worldcup`
purpose: 2026 美加墨世界杯球队、球员、赛程、复盘、预测和竞彩风险分析。

## 迁移后先读

换电脑后，Codex 对话线程不会自动迁移。请在新电脑打开本项目后，先按顺序读取：

1. `README.md`
2. `线程状态.md`
3. `工作流纪律.md`
4. `项目架构.md`
5. `.codex/skills/worldcup-data-collector/SKILL.md`
6. `.codex/skills/worldcup-tactics-coach/SKILL.md`
7. `.codex/skills/worldcup-data-modeler/SKILL.md`
8. `.codex/skills/worldcup-red-team-verifier/SKILL.md`

`线程状态.md` 是当前进度的主账本。不要只凭聊天记忆继续，先读它。

## 目录结构

| 路径 | 用途 |
| --- | --- |
| `队伍/` | 各队档案、成员表、后续球员动态数据入口 |
| `比赛/未开始比赛/` | 赛前预测、分组轮次预测 |
| `比赛/已完成比赛/` | 赛后复盘；已完成小组按“每场一个 Markdown + 小组汇总”组织 |
| `data/packets/` | 标准化采集数据包，如 teams、tactics、rosters |
| `data/outputs/` | 模型输出、复盘 JSON、球员状态、投注风险文件 |
| `赔率与投注/` | 竞彩/投注候选方案和风险说明 |
| `汇总/` | 阶段汇总、建设状态 |
| `.codex/skills/` | 本项目自定义 Codex skills |
| `scripts/` | 本地辅助脚本，目前含 A 组 roster 构建/校验脚本 |

## 当前进度快照

### 赛后复盘

A-J 已完成第一轮赛后复盘的小组，目前统一为：

- 每场比赛一个单场复盘 Markdown。
- 每个小组一个汇总/索引 Markdown。
- 对应结构化 JSON 位于 `data/outputs/match_predictions/`。

K 组、L 组目前还没有赛后复盘文件，需要等赛果核验后补。

### 第二轮预测

已完成并落文件的第二轮预测包括 D/E/F/G/H 组。相关文件位于：

- `比赛/未开始比赛/小组赛/D组/`
- `比赛/未开始比赛/小组赛/E组/`
- `比赛/未开始比赛/小组赛/F组/`
- `比赛/未开始比赛/小组赛/G组/`
- `比赛/未开始比赛/小组赛/H组/`
- `data/outputs/match_predictions/*group-round2-predictions.json`

跨组竞彩候选方案：

- `赔率与投注/D-H组第二轮竞彩组合方案.md`
- `赔率与投注/d-h-round2-jingcai-combos.json`

状态是 `hold_not_executable`，不是可直接出票单。必须等 T-75m 首发、官方竞彩赔率、让球和大小球快照。

### 球员成员表

A 组已有第一版成员表和 roster/player_state 数据，但质量不达标，当前正在让数据采集 agent 返工。

已存在文件：

- `队伍/墨西哥/成员表.md`
- `队伍/南非/成员表.md`
- `队伍/韩国/成员表.md`
- `队伍/捷克/成员表.md`
- `data/packets/rosters/*-roster.json`
- `data/outputs/player_state/*-player-state.json`
- `汇总/A组成员表建设状态.md`

已发现的问题：

- 完整名单里大量中文名缺失。
- 俱乐部名未中文化。
- 身价、身高、惯用脚、联赛、分钟等字段缺失较多；外部评分不再设为硬性必填，但必须有同源评分或评分缺失说明；内部模型状态分允许 1.0-5.0 且保留一位小数。
- `technical_tags` 有队伍级描述误复制到球员的问题。
- Markdown 展示层只列关键球员，不是完整 26 人中文成员表。

返工要求：A 组每队 26 人必须 `chinese_name`、`club_name_cn`、球员级 `source_log` 100% 非空；不能进入 B 组前先放行 A 组。

## 硬性工作流

### 抗断流工作流

长任务必须遵守：

1. 每次只处理当前小组/当前轮次的最小闭环。
2. 先创建骨架文件，再逐个填充。
3. 长内容落本地文件，不贴在聊天里。
4. 子线程结果只汇总关键结论。
5. JSON、Markdown 校验通过后，聊天只输出预测表、文件路径、验证结果、关键风险。
6. 中断后先检查目标文件是否已存在；补齐，不覆盖有效内容。
7. 每次完成后更新 `线程状态.md`，并验证状态记录确实追加在末尾。

### 复盘格式

每个已完成小组应为：

- `比赛/已完成比赛/小组赛/{组}/YYYY-MM-DD_球队A_比分_球队B_复盘.md`
- `比赛/已完成比赛/小组赛/{组}/{组}第一轮复盘.md` 或 `{组}第一轮赛后汇总.md`

小组文件只做汇总/索引，不应承载两场长复盘正文。

### 投注/竞彩闸门

不要把赛前方向直接写成可执行投注建议。以下条件未满足时，状态只能是 `hold` 或 `discussion_only`：

- T-75m 官方首发。
- 最新伤停/停赛/分钟限制。
- 官方竞彩即时赔率。
- 同源 1X2、让球、大小球快照。
- 红队未给 `hold/revise`。

如果红队 `hold/revise`，禁止使用“主推”“稳胆”“可小注”。

## 线程重建建议

换电脑后建议重新创建这些线程，并把工作限定在 `K:\worldcup` 或新电脑对应路径下。

### 主线程

职责：

- 和用户聊天。
- 分配任务给子线程。
- 整合文件。
- 更新 `线程状态.md`。
- 做最终短汇报。

首条提示建议：

```text
你是 2026 世界杯项目主线程。项目根目录为当前 workspace。
请先读取 README.md、线程状态.md、工作流纪律.md、项目架构.md 和 .codex/skills 下四个 worldcup skill。
后续严格执行抗断流工作流：先落文件，后填内容；每次只处理当前小组/轮次最小闭环；长内容写文件；完成后校验 JSON/乱码/状态末尾。
```

### 数据采集 agent

职责：

- 采集球队、球员、伤停、赛后事件、同源外部评分或评分缺失说明、赔率、赛程、环境数据。
- 只做事实和结构化数据，不做预测和投注建议。
- 当前优先任务：返工 A 组成员表，完成后再 B 组。

首条提示建议：

```text
你是 2026 世界杯项目数据采集 agent。请使用 worldcup-data-collector skill。
项目根目录为当前 workspace。先读取 README.md、线程状态.md、工作流纪律.md 和 .codex/skills/worldcup-data-collector/SKILL.md。
当前任务不是继续新组，而是返工 A 组成员表：墨西哥、南非、韩国、捷克。
必须用子agent按队拆分；每队先落骨架文件，再补中文名、中文俱乐部名、身价、联赛、身高、惯用脚、杯赛动态、同源外部评分或评分缺失说明、伤停、状态值。`form_status_1_5` 为内部模型状态分，允许 1.0-5.0 的一位小数。
质量门槛：每队 26 人 chinese_name、club_name_cn、球员级 source_log 必须 100%；JSON 可解析；无乱码；Markdown 必须展示完整 26 人中文成员表。
不要输出长报告，长内容写本地文件。完成 A 组后只简短汇报完整率、缺口和文件路径。
```

### 战术教练 agent

职责：

- 根据数据包做阵型、压迫、转换、定位球、教练倾向和对位分析。
- 不采集原始事实，不给最终比分和投注建议。

### 模型 agent

职责：

- 把数据、战术和市场信号转成概率。
- 记录输入缺口、模型假设、概率、比分分布、敏感性。
- 不给投注建议。

### 红队核验 agent

职责：

- 专门挑错：热门税、平局低估、伤停、盘口缺失、首发未确认、样本偏差。
- 可给 `pass/revise/hold`。
- `hold/revise` 必须阻断主线程投注语言。

### 体彩/竞彩 agent

职责：

- 只在模型和红队后做投注候选池。
- 不能绕过 T-75m 和官方赔率闸门。
- 输出 `hold_not_executable`、`discussion_only` 或临场候选，不输出伪确定单。

## 常用校验命令

PowerShell：

```powershell
# JSON 解析
Get-Content -Raw -Encoding UTF8 path\to\file.json | ConvertFrom-Json | Out-Null

# 乱码/骨架残留
Select-String -Path $files -Pattern '锛|绋|涓|婢|宸|鍦|熻|乱码|�|status: skeleton|"status": "skeleton"' -SimpleMatch

# 状态标题末尾检查
Select-String -Path K:\worldcup\线程状态.md -Pattern '^## ' | Select-Object -Last 8
Get-Content -Tail 30 -Encoding UTF8 K:\worldcup\线程状态.md

# 已完成复盘目录格式检查
Get-ChildItem -Directory K:\worldcup\比赛\已完成比赛\小组赛 |
  ForEach-Object {
    $files = Get-ChildItem -File $_.FullName -Filter *.md
    [pscustomobject]@{ Group=$_.Name; Count=$files.Count; Files=($files.Name -join ' | ') }
  } | Format-Table -Wrap
```

## 下一步建议

1. 等数据采集 agent 完成 A 组成员表返工。
2. 校验 A 组 roster/player_state 完整率。
3. 补 K/L 组第一轮赛后复盘，如果赛果已核验。
4. 继续后续小组第二轮预测。
5. 每次赛后复盘必须同步更新球员状态值、逐场内部评分记录、同源外部评分或评分缺失说明、伤停、首发/分钟和模型备注；未更新时复盘只能标记为 `partial` 或 `blocked`，不能标记完整完成。

## 迁移注意

- zip 包只能迁移项目文件，不能迁移 Codex App 的历史对话线程。
- 新电脑需要重新打开/创建线程。
- 若新电脑项目路径不是 `K:\worldcup`，请把提示中的路径改成新路径。
- `.codex/skills` 已随项目保留，优先使用这些本地 skill。
