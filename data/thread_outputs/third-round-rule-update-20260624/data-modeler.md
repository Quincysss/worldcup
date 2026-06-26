# 第三轮预测规则迭代确认

- phase: rule_update
- team/group/match: third_round_global_modeling_protocol
- status: complete
- created_at: 2026-06-24T00:00:00+08:00
- updated_at: 2026-06-24T00:00:00+08:00
- owner: data-modeler-agent
- scope: 仅确认第三轮预测的新建模顺序、权重边界、去重原则与必备输出字段；本文件不启动具体小组预测
- missing_fields:
  - 无
- source_log:
  - .codex/skills/worldcup-data-modeler/SKILL.md
  - .codex/skills/worldcup-data-modeler/references/model-input-contract.md
  - .codex/skills/worldcup-data-modeler/references/output-schemas.md
  - .codex/skills/worldcup-quant-prediction-system/SKILL.md
- notes:
  - 已采用第三轮独立 `third_round_context` 层
  - 后续第三轮比赛预测默认先落 JSON/Markdown 骨架，再填充

## 采用的新顺序

1. 先按原模型计算基础实力、attack/defense、player_state、injury、tactics、schedule，得到基础 xG。
2. 单独运行 `third_round_context`：
   - 读取当前积分榜、净胜球、进球数、官方 tie-break 顺序。
   - 枚举/模拟同组两场同时开球的结果树，产出 `qualification_scenarios` 与 `simulated_group_outcomes`。
   - 估算不同名次对应的 32 强潜在对手与路径强度，写入 `bracket_path_expectation`。
   - 把动机、轮换、黄牌保护、同组联动、战略节奏整理成 `motivation_profile`、`rotation_risk`、`strategic_tempo_adjustment`。
3. 仅将第三轮情景层的净效应转换为：
   - xG 微调
   - 平局概率修正
   - 大小球节奏修正
4. 再进入 Poisson 0-5 矩阵、1X2/大小球/比分分布。
5. 最后才做赔率校准与红队复核，输出 `final_probabilities`。

## 默认权重安排

- baseline strength: 22% 到 28%
- recent attack/defense signal: 18% 到 24%
- player state + injury + rotation: 18% 到 22%
- tactical matchup: 10% 到 14%
- schedule/environment: 6% 到 8%
- third_round_context: 12% 到 18%
- market calibration: 8% 到 12%

## 权重移动原则

- 出线激励很尖锐时，上调 `third_round_context`，但不替代基础实力。
- 已提前出线、存在黄牌保护或明确轮换信号时，把增量优先放入 `rotation_risk`，不要同时在 player_state 和 market 上重复扣分。
- 若市场赔率已明显计入轮换/战意，只允许保守吸收一部分，`market_adjustment` 必须写明 duplicate-count guard。

## 去重原则

- 动机不直接改基础实力，只作为第三轮情景层修正。
- 轮换不同时在 `player_state_adjustment`、`injury_adjustment`、`third_round_context_adjustment` 三处全额重复。
- 市场赔率只做校准，不把“市场已反映的战意”再次完整写入模型。
- 同组同时比赛带来的 late-game 节奏变化，只放入 `strategic_tempo_adjustment`，不额外虚增攻防基础分。

## 后续强制输出字段

- `third_round_context`
- `qualification_scenarios`
- `motivation_profile`
- `bracket_path_expectation`
- `rotation_risk`
- `strategic_tempo_adjustment`
- `simulated_group_outcomes`

## 执行备注

- 数据就绪度先按 `ready / partial / blocked` 标记。
- 若第三轮所需积分榜、黄牌、同组赔率或路径规则缺失，允许继续出 `partial`，但不得伪装完整。
- 后续第三轮任务默认按“基础模型 -> 第三轮情景模拟 -> xG 修正 -> Poisson -> 赔率校准 -> 红队复核”顺序执行。
