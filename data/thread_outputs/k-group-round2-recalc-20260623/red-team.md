---
phase: match_prediction
group: K
match: Portugal vs Uzbekistan; Colombia vs DR Congo
status: partial
created_at: 2026-06-23T00:00:00+08:00
updated_at: 2026-06-23T01:05:00+08:00
owner: worldcup-red-team-verifier
scope: K组第二轮补充输入后复核重算红队校验；仅核验来源、逻辑、赔率、伤停与过度自信风险，不生成新预测
missing_fields:
  - China Sports Lottery / 新浪 / 懂球帝同源可比赔率快照仍缺
  - T-75 官方首发与最终分钟限制未确认
  - 官方最终伤停/停赛确认未补齐
  - data-collector recalc 仍为骨架
  - tactics-coach recalc 仍为骨架
  - modeler recalc 仍为骨架
  - 20260623 quant prediction JSON 不可机读解析
source_log:
  - data/thread_outputs/k-group-round2-recalc-20260623/data-collector.md
  - data/thread_outputs/k-group-round2-recalc-20260623/tactics-coach.md
  - data/thread_outputs/k-group-round2-recalc-20260623/modeler.md
  - data/outputs/match_predictions/k-group-round2-quant-prediction-20260623.json
  - data/outputs/match_predictions/k-group-round2-quant-prediction-20260622.json
  - data/reviews/red_team/k-group-round2-prediction-red-team-20260622.md
  - 四队 player-state JSON
notes:
  - 按抗断流流程先落文件后填充
  - 当前结论仅支持 discussion_only，不支持 full betting release
  - 已并入 2026-06-23 中国足彩网竞彩赔率补充后的红队保守校验
---

# K组第二轮补充输入后复核重算｜红队校验

status: partial
verdict: hold_for_betting_discussion_only
publish_mode: discussion_only

## pass

- 相比 20260622 版，20260623 重算没有因为 player-state 可解析而对热门做大幅上调。葡萄牙主胜约从 63.9% 升到 65.8%，哥伦比亚主胜约从 48.9% 升到 50.4%，幅度仍在可解释区间。
- 20260623 版仍保留红队降温：两场都写明 `hold_for_betting`，且发布门槛限制为 `discussion_only`，这点方向正确。
- 两场最高比分并未被改写成极端大胜，模型文本里仍保留平局和低比分风险，说明主线程没有完全被首轮结果绑架。

## fail

- `data-collector.md`、`tactics-coach.md`、`modeler.md` 在 `k-group-round2-recalc-20260623` 下仍是骨架/进行中，当前闭环不能宣称 full recalc complete。
- `k-group-round2-quant-prediction-20260623.json` 存在可见内容，但文件本体不可机读解析；这意味着模型产物不能被稳定复核、复算或程序消费，必须记为 `blocked_by_invalid_model_json`。
- 中国体彩 / 新浪 / 懂球帝同源可比赔率快照仍未补齐；即便其他输入改善，也不能移除 `hold_for_betting`。

## 体彩赔率红队校验 2026-06-23

- verdict: `hold_for_betting_discussion_only`
- 可投注性结论：保守处理。中国足彩网页面存在系统升级/暂停销售提示，这本身就足以阻止任何“可执行投注单”表述。
- 葡萄牙 vs 乌兹别克斯坦：
  - 普通胜平负未开售，不能把外部欧赔或零散海外价格当成中国竞彩 SP 使用。
  - 即便模型方向仍偏葡萄牙，也只能保留 discussion-only，不得写成可下单表达。
- 哥伦比亚 vs 民主刚果：
  - 普通 SPF `1.35 / 3.90 / 7.60` 的确推高主胜印象，但 `-1` 让球 `2.22 / 3.35 / 2.63` 并不支持“强穿盘”叙事。
  - 红队要求主线程避免把普通主胜热度直接外推成净胜两球以上把握。
- 共通限制：
  - 未获得 T-75 首发、最新官方伤停确认、稳定新浪结构化赔率前，不得生成 executable betting slip。
  - 当前最多只能写成 discussion-only，并明确 `hold_for_betting`。

## 必须保留的风险

- 中国足彩网系统升级/暂停销售提示意味着可投注性本身不稳定，任何竞彩建议都可能失去执行基础。
- 葡萄牙普通胜平负未开售，缺失中国竞彩 SP 基准，不能用欧赔代填。
- 哥伦比亚普通 SPF 与 -1 让球方向不一致，存在“主胜热、强穿弱”的盘口警报。
- 新浪结构化赔率链仍不稳定或未补齐，无法完成同源对比与时点校验。
- T-75 首发、最终伤停、分钟限制仍未官方锁定，热门队上调空间必须保守。
- 比分表达仍有过度自信风险：葡萄牙 2比0 不能强写，哥伦比亚 2比1 不能压过 1比1 风险提示。

## gaps

- player-state 虽然“可解析”，但不等于“高置信外部验证完成”。四队 player-state 仍可见大量 `coverage_incomplete`、`unavailable`、内部回填或代理评分，不能把这些更新直接当成热门加分证据。
- 伤停、分钟限制、首发可用性仍未到 T-75 官方确认阶段。葡萄牙侧尤其不能把中后场可用性不确定性视作已消除。
- 赔率层只有部分外部参考，缺少同源、同时间戳、可比盘口链，无法严肃判断市场是否继续给热门溢价或是否已修正。
- 若主线程把“首轮赛果 + player-state 更正 + tactics recalc + market adjustment”同时用于同方向修正，仍有重复计权风险。

## action

- `data`：补齐中国体彩 / 新浪 / 懂球帝同源赔率快照，写明抓取时间；补 T-75 首发、最终伤停、分钟限制。
- `model`：修复 `k-group-round2-quant-prediction-20260623.json` 编码/转义问题，保证可机读；在文档中单列“本次仅小幅上调热门”的原因，避免被误读成重估。
- `tactics`：把乌兹别克斯坦反击窗口、民主刚果二点球/转换冲击写成明确 upset path，不要只写热门一侧的执行逻辑。
- `main`：当前只能标 `partial_publish_ok` 与 `discussion_only`；不得宣称 full、不得升级为 betting-ready。

## match verdicts

### 葡萄牙 vs 乌兹别克斯坦

- verdict: `partial_publish_ok`
- red-team stance: 可保留“葡萄牙方向占优”，但不能因为 player-state 可解析就把它抬成高置信热门。
- 核验意见：
  - 2比0 只能作为讨论用主线比分，不能当强表达；1比0、1比1 仍是必须保留的真实风险路径。
  - 若 Ruben Dias 或后场保护信息仍未被最终官方确认，防线稳定性不应按“已恢复”处理。
  - 乌兹别克斯坦的低位防守、反击推进与前场个人能力仍构成爆冷或逼平路径，不能被首轮结果吞没。

### 哥伦比亚 vs 民主刚果

- verdict: `partial_publish_ok`
- red-team stance: 只能接受“哥伦比亚略占先”，不能接受“清晰强势热门”叙事。
- 核验意见：
  - 2比1 如果保留，必须同时声明 1比1 是最高单一比分风险之一；不能把 2比1写成高把握度。
  - 民主刚果的转换、冲击、二点球与定位球威胁仍在，不能因为 player-state 更正就被模型低尾化。
  - 若市场校准主要来自非同源散点赔率，应避免把 market adjustment 写成强证据。

## 必须写入主线程的核验声明

- 本次“补充输入后重算”只能认定为 `partial_thread_backed`，不能宣称 full recalc complete。
- player-state 可解析提升的是可读性，不等于外部高置信状态确认；不得据此显著上调热门。
- 中国体彩 / 新浪 / 懂球帝同源赔率链未补齐前，红队 verdict 维持 `hold_for_betting`。
- 中国足彩网若出现系统升级/暂停销售提示，且葡萄牙普通胜平负未开售，则不得把外部欧赔写成竞彩 SP 替代物。
- 哥伦比亚普通 SPF 偏热，但 -1 让球不支持强穿盘，任何“轻松净胜”或“稳让胜”措辞都应删除。
- 两场比分表达都必须降级为 discussion-only：葡萄牙 2比0 需并列保留 1比0/1比1 风险，哥伦比亚 2比1 需明确 1比1 高风险。
- 20260623 模型 JSON 当前不可机读，属于复核链条缺口，需修复后才可宣称模型产物完备。

## 最终红队结论

- 总 verdict: `hold_for_betting_discussion_only`
- 发布建议: `discussion_only`
- 当前是否允许对外表述为“已完成复核重算”：不允许
- 当前是否允许作为讨论稿继续流转：允许，但必须附带 `partial`、赔率缺口、首发未定、模型 JSON 不可机读四项声明

<!-- cp-jc-odds-20260623:start -->
## 体彩赔率红队校验 2026-06-23
verdict=hold_for_betting_discussion_only

- 页面存在系统升级/暂停销售提示，不能宣称正式可投注。
- 葡萄牙普通胜平负未开售，禁止用欧赔参考冒充竞彩SP。
- 哥伦比亚普通SPF强，但-1让球不强，不能给稳胆/穿盘结论。
- 缺T-75首发、最终伤停和稳定新浪单场赔率页，投注建议继续冻结。
<!-- cp-jc-odds-20260623:end -->
