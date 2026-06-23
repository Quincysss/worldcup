---
phase: match_prediction
group: L
match: England vs Ghana; Panama vs Croatia
status: partial
created_at: 2026-06-23T17:05:00+08:00
updated_at: 2026-06-23T17:35:00+08:00
owner: worldcup-red-team-verifier
scope: L组第二轮预测红队校验；仅核验来源、赔率、伤停、首发与量化链过度自信风险，不生成投注建议
missing_fields:
  - T-75 官方首发与最终阵型
  - 最新官方伤停/体检/分钟限制确认
  - 稳定新浪结构化赔率链
  - recalc data/tactics/model 上游正式成稿
source_log:
  - data/thread_outputs/l-group-round2-recalc-20260623/data-collector.md
  - data/thread_outputs/l-group-round2-recalc-20260623/tactics-coach.md
  - data/thread_outputs/l-group-round2-recalc-20260623/modeler.md
  - data/outputs/match_predictions/l-group-round2-quant-prediction-20260622.json
  - data/reviews/red_team/l-group-round2-prediction-red-team-20260622.json
notes:
  - 上游 recalc 文件当前仍为 skeleton_created，结论只能按 partial_thread_fallback 输出
  - 已并入中国足彩网页面系统升级/暂停销售与 SPF/让球约束
---

# L组第二轮预测红队校验

review_target: L组第二轮重算前发布门控
verdict: hold_for_betting_discussion_only
publish_mode: discussion_only
thread_status: partial_thread_fallback

## top_concerns

- concern: 上游 `data-collector.md`、`tactics-coach.md`、`modeler.md` 仍是骨架，当前不是完整 recalc 闭环
  category: data
  severity: blocker
  confidence: high
  owner: main

- concern: 页面存在系统升级/暂停销售提示，可投注性本身不稳定
  category: market
  severity: blocker
  confidence: high
  owner: main

- concern: 英格兰 vs 加纳普通 SPF 未开售，只有 `-2` 让球 `2.20/3.80/2.43`，不能把外部欧赔或旧 1X2 当中国竞彩 SP 代理
  category: market
  severity: blocker
  confidence: high
  owner: data

- concern: 巴拿马 vs 克罗地亚普通 SPF `6.90/4.20/1.34` 明确偏向克罗地亚，但 `+1` `2.65/3.60/2.11` 显示穿盘并不轻松
  category: market
  severity: high
  confidence: high
  owner: model

- concern: T-75 官方首发未到，英格兰 Saka/Rice/Rashford 负荷、Ghana Ati-Zigi 赛前体检、Partey 回归变量、Panama Carrasquilla 疑问、Croatia 老将负荷仍未锁定
  category: availability
  severity: blocker
  confidence: high
  owner: data

- concern: 旧模型对英格兰与克罗地亚已有方向性优势，若再把新赔率热度叠加到同一方向，存在热门重复计权和叙事放大风险
  category: data
  severity: high
  confidence: medium_high
  owner: model

## market_flags

- 中国足彩网页面存在系统升级/暂停销售提示，红队不接受任何“可直接执行”的竞彩表达。
- 英格兰 vs 加纳普通胜平负未开售，当前只能读取 `-2` 让球 `2.20/3.80/2.43`。
- `-2` 让球没有支持“英格兰大胜稳穿”的市场共识，反而提示深盘风险和热门税风险。
- 巴拿马 vs 克罗地亚普通 SPF `6.90/4.20/1.34` 给出克罗地亚主方向，但 `+1` `2.65/3.60/2.11` 不支持“克罗地亚轻松打穿”。
- 当前缺稳定新浪结构化赔率与同源 1X2/让球/大小球链，不能把单点中国竞彩赔率扩写为完整盘口结论。

## quant_chain_flags

- 20260622 旧量化链对英格兰给出 `64.98%`、对克罗地亚给出 `54.07%`，本身就建立在 `partial_source_limited` 前提上，不能因新赔率热度上调为更强表达。
- 英格兰链条里 `recent_round1_form`、`player_state_adjustment`、`tactical_matchup_adjustment` 都可能重复吸收首轮 4比2 的信息，若再附会热门盘，只会进一步放大偏差。
- 克罗地亚链条里 baseline、经验、控场和 Panama 低位弱进攻已在模型中表达；若看到 `1.34` 就继续上提主胜，会低估平局和 1 球胜路径。
- 独立 Poisson 仍会低估早球、红牌、点球、末段换人和深盘追分的相关性事件，深盘场景尤其不宜过度自信。

## per_match_review

### England vs Ghana

- verdict: hold_for_betting_discussion_only
- base_model_reference: 20260622 版 `England win 64.98% / draw 20.21% / Ghana win 14.80%`
- red-team read:
  - 普通 SPF 未开售，所以不能把任何外部欧赔或旧 1X2 概率包装成中国竞彩 SP。
  - 仅有 `-2` 让球 `2.20/3.80/2.43` 时，市场并未确认“英格兰至少净胜三球”的强穿盘叙事。
  - 英格兰 Saka/Rice/Rashford 负荷、Ghana 的 Ati-Zigi 赛前体检与 Partey 回归变量都直接影响节奏、压迫强度和失球尾部。
- suggested_probability_adjustment:
  - `england_win`: 维持旧红队 cap 约 `59-62%`，不接受因赔率热度再上调
  - `draw`: 相对旧模型上调 `+2 to +4 pts`
  - `ghana_win`: 相对旧模型上调 `+1 to +2 pts`
- hold_reason:
  - 无中国竞彩普通 SPF
  - 无 T-75 官方首发
  - 深盘 `-2` 只说明热门税与大胜门槛高，不足以形成投注可执行性

### Panama vs Croatia

- verdict: hold_for_betting_discussion_only
- base_model_reference: 20260622 版 `Panama win 18.83% / draw 27.11% / Croatia win 54.07%`
- red-team read:
  - 普通 SPF `6.90/4.20/1.34` 的确偏克罗地亚，但 `+1` `2.65/3.60/2.11` 明确提醒 1 球胜、平局甚至低比分缠斗仍然很重。
  - Panama 的 Carrasquilla 疑问和 Croatia 老将负荷都还没过官方门控，不能把 `1.34` 直接翻译成“稳”。
  - 若主线程写出强势净胜或让球方向确定，属于超出盘口信息本身的过度延伸。
- suggested_probability_adjustment:
  - `croatia_win`: 维持旧红队 cap 约 `49-52%`
  - `draw`: 相对旧模型上调 `+2 to +4 pts`
  - `panama_win`: 相对旧模型上调 `+1 to +2 pts`
- hold_reason:
  - `SPF` 与 `+1` 让球并不共振为强穿盘
  - 无 T-75 官方首发
  - Croatia 老将分钟与 Panama 中场核心状态仍未最终确认

## recommended_probability_adjustment

- 类型: red_team_discount_not_replacement_probability
- 英格兰方向: 不得因中国竞彩未开售的普通 SPF 空缺而擅自补全市场强信号；保持旧红队折扣带
- 克罗地亚方向: 即便普通 SPF 偏热，也必须让 `+1` 让球对冲掉一部分热门叙事
- 总体建议: 本轮只允许 `discussion_only`，不允许发布任何 betting-ready 百分比话术

## hold_conditions

- T-75 官方首发与阵型到位
- Ati-Zigi 赛前体检结果确认
- Partey 是否回归首发/分钟角色确认
- Saka/Rice/Rashford 负荷与分钟限制确认
- Carrasquilla 状态确认
- Croatia 老将分钟计划确认
- 中国竞彩页面恢复稳定且有可用市场
- 稳定新浪结构化赔率与同源 1X2/让球/大小球链补齐

## handoff_notes

- `data`: 先补官方首发、伤停、体检、分钟限制与中国竞彩页面状态，再谈市场校准
- `model`: 不要把中国竞彩新增热度与旧模型热门方向叠加；英格兰深盘、克罗地亚让球不稳都要体现在降温措辞中
- `main`: 只能写 `hold_for_betting_discussion_only`，且必须保留“系统升级/暂停销售、未到 T-75、SPF/让球不一致”三类声明

## final

- verdict: `hold_for_betting_discussion_only`
- release: `discussion_only`
- betting_advice: blocked

<!-- l-group-round2-cp-jc-20260623:start -->
## L组第二轮红队校验 2026-06-23
verdict=hold_for_betting_discussion_only

- 中国足彩网页面存在系统升级/暂停销售提示，不能宣称正式可投注。
- 英格兰场普通SPF未开售，禁止用欧赔参考冒充竞彩SP。
- 克罗地亚场普通SPF强，但+1让球仍保留巴拿马受让路径，不能给稳胆/穿盘结论。
- 缺T-75首发、最终伤停、Saka/Rice/Ati-Zigi/Carrasquilla临场确认和稳定新浪结构化赔率。
<!-- l-group-round2-cp-jc-20260623:end -->
