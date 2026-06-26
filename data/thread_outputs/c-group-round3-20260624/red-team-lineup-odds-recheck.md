---
phase: match_prediction
group: C
match:
  - 苏格兰 vs 巴西
  - 摩洛哥 vs 海地
status: partial
created_at: 2026-06-24T18:18:12+08:00
updated_at: 2026-06-24T18:18:12+08:00
owner: red_team
scope: C组第三轮预测红队校验；聚焦赔率冲突/未开售、T-75官方首发缺失、第三轮动机误判、巴西轮换与Neymar/Raphinha变量、摩洛哥-2深盘、海地反击尾部、Poisson与人工修正双算风险
missing_fields:
  - 官方T-75首发
  - 最新官方伤停/停赛/黄牌保护确认
  - 可执行状态下的同源竞彩赔率快照
  - 数据采集线程的完整赔率/事实闭环成稿
source_log:
  - data/thread_outputs/c-group-round3-20260624/data-collector-lineup-odds-recheck.md
  - data/thread_outputs/c-group-round3-20260624/tactics-predicted-lineups.md
  - data/thread_outputs/c-group-round3-20260624/modeler-lineup-adjusted-recalc.md
  - data/outputs/match_predictions/c-group-round3-quant-prediction-20260624.json
  - data/outputs/player_state/brazil-player-state.json
  - data/packets/rosters/brazil-roster.json
  - 线程状态.md
notes:
  - tactics稿明确为estimated lineup，非confirmed lineup
  - data-collector与modeler线程文件仍是in_progress骨架，当前可依赖的主链条来自quant json与本地成员表/线程状态
  - 体彩页面提示暂停销售；摩洛哥vs海地普通SPF未开售
---

# C组第三轮预测红队校验

## 总体结论

- prediction verdict: `revise`
- betting verdict: `hold`
- publish boundary: `discussion_only`
- 红队判断：当前两场都可以保留讨论版预测，但不能包装成“临场可执行”口径，更不能把深盘或净胜球叙事写成稳态。

## 分场 verdict

- 苏格兰 vs 巴西：`revise`
- 摩洛哥 vs 海地：`revise`

## 核验主结论

- `T-75官方首发缺失` 不等于预测线程失败，但它足以阻止任何投注级输出升级为 `pass`。
- 当前本地量化文件已经形成可讨论链条，但数据采集线程仍未把赔率、销售状态、伤停与纪律做成完整闭环，因此事实链只能算 `partial_traceable`，不能宣称 `full_verified`。
- 第三轮动机已在量化稿中写入，但仍需防止把“争第一/拿1分足够/已出局荣誉战/同组同时开球”重复计进 xG、Poisson 后处理和市场解释。
- 红队接受“巴西胜、摩洛哥胜”的方向性讨论，但不接受对巴西大胜或摩洛哥强穿 `-2` 的过度自信表达。

## 关键挑战

### 1. 苏格兰 vs 巴西

- 现有量化稿已把巴西从“强压大胜”修到 `0-2`，方向比旧口径更稳，但仍需明确：巴西并非纯粹必须大胜，若另一场走势正常或本场早早领先，比赛降速和风险管理都可能抬高 `0-1 / 1-1 / 1-2` 尾部。
- `Neymar` 变量仍然敏感。本地 `brazil-player-state.json` 和 `brazil-roster.json` 仍把他标在伤后可用性不完全闭环的区间，不能把“回归威胁”直接写成“首发满负荷稳定利多”。
- `Raphinha` 缺阵/不确定与 `Neymar` 回归不能被当成线性对冲。右路纵深、反压迫和中路组织不是同一种增减项，若模型既在 xG 里做过折扣，又在手工修正里再次折扣/补偿，就有双算风险。
- 苏格兰的真实动机不是“必须压出去赢球”，而是“拿分收益高、低节奏可接受”。若主线程把苏格兰动机写成高压抢胜，会虚增巴西转换空间并高估总进球尾部。

### 2. 摩洛哥 vs 海地

- 当前量化给出 `3-0` 和摩洛哥胜方向可以讨论，但 `-2 Morocco` 只是一条暂停销售页面上的让球锚点，不能被写成已验证可执行盘口。
- 模型 Top 比分里 `2-0` 概率仍高于 `3-0`，而风险清单自己也承认 `2-0 / 3-1` 是 `-2` 最危险区间；因此任何“强穿深盘”表述都应降级。
- 摩洛哥“争榜首追净胜球”是有效变量，但若该变量已体现在 xG `2.55` 和比分再权重里，就不能在摘要文案里第三次写成独立利多，否则会把同一动机重复计权。
- 海地虽然已出局，但不能被建模成零反击尾部。量化稿保留了 `xG 0.35` 与 `2-1 / 3-1` 之类的尾部路径，这部分必须保留，不能因热门叙事被抹平。

## 必须修正项

1. 必须把两场当前口径统一标成 `prediction discussion_only / betting hold`，不能出现“可直接执行”“稳胆”“稳穿”等措辞。
2. 必须在主线程摘要中显式写明第三轮积分与净胜球背景：
   - 巴西 4分 净胜+3
   - 摩洛哥 4分 净胜+1
   - 苏格兰 3分 净胜0
   - 海地 0分 净胜-4
3. 必须把“同组同时开球导致末段策略可能随另一场比分变化”写成明确 caveat，不能只当脚注。
4. 必须把 `Neymar`、`Raphinha`、巴西轮换与苏格兰低节奏动机分开表述，避免一句“巴西阵容更强”吞掉可用性与节奏风险。
5. 必须把摩洛哥 `-2` 的风险点写清：普通SPF未开售、页面暂停销售、Top比分中 `2-0` 很高，因此只能当市场校准信号，不能当执行盘口。
6. 必须要求模型说明：哪些第三轮动机已进入基础 xG，哪些只在 Poisson 后或比分排序中体现，防止 `Poisson tail + manual adjustments` 双算。

## 风险门禁

- 以下任一项未补齐，betting verdict 继续保持 `hold`：
  - T-75官方首发未公布
  - 最新官方伤停/停赛/黄牌保护未更新
  - 体彩/同源赔率仍显示暂停销售或普通SPF未开售
  - 主线程无法说明动机修正是否与xG/Poisson后处理重复计权
- 即便预测结论继续发布，也只能是 `discussion_only`，不得升级为投注执行建议。

## Owner 回派

- `data`：补官方T-75首发、官方伤停/停赛/黄牌保护、体彩同源赔率销售状态与统一时间戳。
- `model`：明确第三轮动机、轮换、市场信号分别落在哪一层参数，避免双算；对 `Neymar` 首发不确定与摩洛哥 `-2` 穿盘风险保留更宽尾部。
- `tactics`：补巴西领先后降速与苏格兰保平节奏管理、补海地若转5后卫时摩洛哥攻坚效率下降的情景。
- `main`：对外只保留“方向可讨论、执行需等待首发与盘口确认”的红队声明。

## 可直接引用的红队声明

- 巴西胜和摩洛哥胜可以作为讨论版方向，但第三轮动机、轮换和同组同时开球的末段策略变化尚未完全锁定，不能写成高置信执行判断。
- 巴西相关结论必须继续保留 `Neymar` 可用性与 `Raphinha` 缺口的双向风险，不能把俩变量合并成单向利多。
- 摩洛哥 `-2` 目前只可视为暂停销售页面上的深盘校准信号；普通SPF未开售且Top比分仍有较高 `2-0` 权重，因此红队不接受强穿表述。
