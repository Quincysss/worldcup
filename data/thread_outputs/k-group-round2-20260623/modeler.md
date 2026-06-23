# K组第二轮模型线程输出 2026-06-23

状态：partial_source_limited

## 输入文件

- data/outputs/match_predictions/k-group-round2-quant-prediction-20260622.json
- data/thread_outputs/k-group-round2-20260623/data-collector.md
- data/thread_outputs/k-group-round2-20260623/tactics-coach.md
- data/outputs/player_state/portugal-player-state.json
- data/outputs/player_state/uzbekistan-player-state.json
- data/outputs/player_state/colombia-player-state.json
- data/outputs/player_state/dr-congo-player-state.json
- data/outputs/model_backtests/model-optimization-final-20260622.json
- data/packets/model_optimization/tactical-volatility-factors-20260622.json
- 比赛/已完成比赛/小组赛/K组/2026-06-17_葡萄牙_1-1_刚果金_复盘.md
- 比赛/已完成比赛/小组赛/K组/2026-06-17_乌兹别克斯坦_1-3_哥伦比亚_复盘.md

## 上游状态

- data-collector.md：skeleton_created
- tactics-coach.md：partial
- 市场校准：不可用，缺官方中国竞彩与同源 1X2/大小球快照
- 阵容时点：缺 T-75 官方首发

## 比赛一：葡萄牙 vs 乌兹别克斯坦

### 因子链

- 基线沿用 2026-06-22 量化底稿，葡萄牙强度明显领先。
- 首轮修正：葡萄牙 1比1 刚果金后，强队上限不再外推过高，但保留控场和边路推进优势。
- 战术修正：葡萄牙边路通道、出球抗压、中路控制均占优；乌兹别克斯坦转换反击保留尾部威胁，但本方转换防守风险偏高。
- 球员状态：葡萄牙 player_state 为 updated；乌兹别克斯坦为 partial，因此仅做温和修正。
- 市场校准：null，仅 discussion_only。

### 结果

- 选定 xG：葡萄牙 2.03，乌兹别克斯坦 0.73
- Poisson 1X2：主胜 0.6779，平 0.1981，客胜 0.1239
- 大小球：大 2.5 0.5209，小 2.5 0.4791；大 3.5 0.2992，小 3.5 0.7008
- 比分 Top5：2比0 0.1304；1比0 0.1285；2比1 0.0952；1比1 0.0938；3比0 0.0882
- 0至5球矩阵外尾部：0.0178

## 比赛二：哥伦比亚 vs 刚果金

### 因子链

- 基线沿用 2026-06-22 量化底稿，哥伦比亚仍高于刚果金，但不是压倒性断层。
- 首轮修正：哥伦比亚 3比1 乌兹别克斯坦强化了边路推进、替补冲击和终结稳定性；刚果金 1比1 葡萄牙证明反击与身体对抗可持续制造事件。
- 战术修正：哥伦比亚转换进攻、边路优势、定位球占优；刚果金反击和定位球保留得分路径，但中路控制和转换防守偏弱。
- 波动控制：依据 2026-06-22 优化包，对平局底盘与事件波动做 shadow mode 温和抬升，避免过度压低平局。
- 市场校准：null，仅 discussion_only。

### 结果

- 选定 xG：哥伦比亚 1.64，刚果金 1.00
- Poisson 1X2：主胜 0.5234，平 0.2461，客胜 0.2306
- 大小球：大 2.5 0.4916，小 2.5 0.5084；大 3.5 0.2727，小 3.5 0.7273
- 比分 Top5：1比0 0.1170；1比1 0.1170；2比0 0.0960；2比1 0.0960；0比0 0.0714
- 0至5球矩阵外尾部：0.0074

## 缺口与风险

- 乌兹别克斯坦 player_state 仍为 partial，个体可用性只做保守吸收。
- data-collector 线程未完成，旅行、伤停、气象只采用已落盘摘要，未做二次拓展。
- tactics 线程为 partial，当前战术修正为可用稿，不是终版。
- 缺 T-75 官方首发，临场轮换与中锋/边锋出勤对上限仍有扰动。
- 缺官方中国竞彩与同源赔率快照，因此 market_adjustment、model_market_delta 均保持 null。

## 线程结论

- 已按抗断流流程先落可用产物。
- 当前结果可供主线程继续汇总，但应按 partial_source_limited 使用。
