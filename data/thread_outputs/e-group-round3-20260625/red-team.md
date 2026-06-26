---
phase: red_team_review
group: E
round: 3
captured_at: 2026-06-25T11:06:23+08:00
status: completed
review_target: e-group-round3-quant-prediction-20260625
verdict: revise
---

# E组第三轮红队校验

```json
{
  "review_target": "K:/worldcup/data/outputs/match_predictions/e-group-round3-quant-prediction-20260625.json",
  "verdict": "revise",
  "top_concerns": [
    {
      "concern": "德国已基本锁定头名，但当前链路仍给出 50.6% 客胜和 `market_adjustment` 德国 +3，热度没有被轮换/控节奏风险充分压回去。",
      "category": "tournament",
      "severity": "high",
      "confidence": "high",
      "evidence": "战术线程明确要求把德国从“满强度压制”修正为“结构保守化”；1X2 归一概率中国足彩网为 52.7% 客胜，新浪交叉核验为 57.9% 客胜，两个来源同一抓取时点分歧明显；模型仍沿用德国正向市场修正。",
      "why_it_matters": "第三轮已出线强队最常见的误差不是输，而是胜率和净胜球被高估，首先应把概率让回给平局而不是继续追客胜热度。",
      "follow_up_check": "把德国 `market_adjustment` 从 +3 下调到 0 或 +1，并单独列出 `rotation_risk` 与 `strategic_tempo_adjustment`，重新跑 xG/Poisson。",
      "owner": "model"
    },
    {
      "concern": "厄瓜多尔“必须赢”不能被直接等价成进攻兑现，当前 1.05 xG 仍偏高，且模型有把动机上调转成主胜上调的风险。",
      "category": "data",
      "severity": "high",
      "confidence": "high",
      "evidence": "厄瓜多尔前两轮 0 进球；`E组第二轮复盘` 已明确写出“下调破低位与终结转化，射门量和控球量不能直接等价为进球概率”，并提示此前低估 0-0 尾部。",
      "why_it_matters": "如果只削德国、不保留厄瓜多尔终结惩罚，修正会误落到主胜而不是平局，这会把红队修正做反。",
      "follow_up_check": "保留厄瓜多尔终结负修正，把其中心 xG 压到 0.90-0.95 区间，而不是因 must-win 再上调主队进球。",
      "owner": "model"
    },
    {
      "concern": "科特迪瓦在“平局大概率够用”的语境下仍被建模成 2.24 xG、74.4% 客胜、`market_adjustment` +5，这个强攻斜率过陡。",
      "category": "tournament",
      "severity": "high",
      "confidence": "high",
      "evidence": "战术线程明确写出“科特迪瓦是风险管理局，不宜建模成无条件强攻”，并建议“降低无谓压迫与总进球上限”；当前 top scorelines 中 0-2 与 0-3 合计 25.1%，对 draw-enough 场景过热。",
      "why_it_matters": "同步赛况只要德国领先，科特迪瓦的最优策略就会快速转向控风险，比分尾部会先砍掉 0-3/1-3 这类大胜路径。",
      "follow_up_check": "把科特迪瓦中心 xG 下修到 1.88-1.95，`market_adjustment` 从 +5 handicap signal 下调到 +1/+2 上限，并提高 draw 权重。",
      "owner": "model"
    },
    {
      "concern": "库拉索 `+2` 让球盘对模型的反证意义比当前文案写得更强，不能只把它当作科特迪瓦强势信号。",
      "category": "market",
      "severity": "medium",
      "confidence": "high",
      "evidence": "按当前 0.62 vs 2.24 的 Poisson，库拉索 +2 的 cover/push/lose 约为 49.7% / 22.3% / 28.0%；若按红队节奏降温到 0.68 vs 1.95，则变成 58.2% / 20.9% / 20.9%。市场三项归一却给出 36.9% / 23.0% / 40.1%，明显更偏向科特迪瓦 3+ 球路线。",
      "why_it_matters": "这说明盘口本身在放大客队净胜球叙事，不能反过来再给模型一个重的正向 `market_adjustment`。",
      "follow_up_check": "在摘要里把 +2 盘解释为“对大胜路径的保护信号”，用于压低科特迪瓦净胜球尾部，而不是增强客胜强度。",
      "owner": "main"
    },
    {
      "concern": "当前预测文件缺少多个量化系统要求的显式字段，导致第三轮修正无法被逐项审计。",
      "category": "data",
      "severity": "medium",
      "confidence": "high",
      "evidence": "两场都未显式给出 `rotation_risk`、`qualification_scenarios`、`motivation_profile`、`strategic_tempo_adjustment`、`odds_implied_probability`、`model_market_delta`、`final_probabilities` 等字段，只能从 `factor_inputs` 字符串里推断。",
      "why_it_matters": "红队最需要检查的正是第三轮动机、轮换和市场是否被双重计数；字段不展开，后续很难判断修正是否落地。",
      "follow_up_check": "按 `worldcup-quant-prediction-system` 补齐显式字段，再写回红队后的 `final_probabilities`。",
      "owner": "model"
    }
  ],
  "upset_or_failure_scenarios": [
    "德国轮换 4-6 个位置后前场配合降速，比赛更长时间停留在 0-0/0-1/1-1，而不是标准强队模板下的 1-2。",
    "厄瓜多尔持续制造推进但终结继续失真，must-win 变成高压低效，平局概率抬升快于主胜概率。",
    "若德国先领先，科特迪瓦即时进入保二控盘模式，0-1、0-2、1-1 的路径权重应上升，0-3/1-3 下沉。",
    "库拉索先以 5-3-2 低位止血，哪怕最终输球，也更可能把败幅控制在 0-1、0-2 或 1-2。"
  ],
  "overconfidence_flags": [
    "厄瓜多尔 vs 德国 当前代表比分 `1-2` 偏进攻化，红队中心更接近 `0-1` 或 `1-1`。",
    "库拉索 vs 科特迪瓦 当前代表比分 `0-2` 可保留为次优，但不应再把 `0-3` 维持在 10%+ 的高位。",
    "两场都把第三轮动机写进了 `factor_inputs`，但又给了市场正向加成，存在重复强化热门方向的风险。"
  ],
  "market_flags": [
    "厄瓜多尔 vs 德国：中国足彩网归一客胜 52.7%，新浪交叉核验归一客胜 57.9%，来源差异未解释清楚前，不应给德国正向 `market_adjustment`。",
    "库拉索 vs 科特迪瓦：当前缺少同源 1X2 与 totals，只看到 `+2` 让球盘，市场信号不完整，应降级使用。",
    "两场 overround 都在 1.128 附近，边际并不低，不能把盘口方向当作强证据。"
  ],
  "quant_chain_flags": [
    "第三轮关键字段未显式展开，审计只能靠字符串备注，无法确认是否双重计数。",
    "当前文件 `red_team_status` 仍是 pending，且没有写回 `final_probabilities`，说明这版还不是可发布终稿。",
    "摘要中对盘口的表述仍偏向解释客队强势，未充分体现红队对热门过热的怀疑。"
  ],
  "recommended_probability_adjustment": {
    "厄瓜多尔_vs_德国": {
      "current": {
        "home_win": 0.2459,
        "draw": 0.2477,
        "away_win": 0.5064,
        "xg_home": 1.05,
        "xg_away": 1.62
      },
      "recommended_center": {
        "home_win": 0.2417,
        "draw": 0.2724,
        "away_win": 0.4859,
        "xg_home": 0.90,
        "xg_away": 1.40,
        "representative_score": "0-1"
      },
      "direction": "下调德国胜率约 2.0 个百分点，主要加到平局；厄瓜多尔主胜不应因为 must-win 被抬高。"
    },
    "库拉索_vs_科特迪瓦": {
      "current": {
        "home_win": 0.0874,
        "draw": 0.1691,
        "away_win": 0.7436,
        "xg_home": 0.62,
        "xg_away": 2.24
      },
      "recommended_center": {
        "home_win": 0.1211,
        "draw": 0.2044,
        "away_win": 0.6745,
        "xg_home": 0.68,
        "xg_away": 1.95,
        "representative_score": "0-1"
      },
      "direction": "下调科特迪瓦胜率约 6.9 个百分点，主要加到平局，其次给库拉索反打/守平路径。"
    }
  },
  "missing_data": [
    "T-75 官方首发与实际轮换人数。",
    "德国关键核心是否仅替补待命，以及是否存在黄牌/分钟管理。",
    "科特迪瓦 Singo 身体状态与出场强度。",
    "库拉索 vs 科特迪瓦 同源 1X2、让球、totals 的完整快照与抓取时间。",
    "显式 `final_probabilities`、`rotation_risk`、`motivation_profile`、`model_market_delta` 字段。"
  ],
  "handoff_notes": "结论为 revise。主线程摘要继续维持 discussion_only；模型线程先下调两场热门方向的 market_adjustment，再按建议中心值重跑 Poisson，并把红队后的 final_probabilities 回写到 JSON/摘要。"
}
```

## 核心落点

- 德国这场的红队修正不该把概率让给厄瓜多尔主胜，而应优先让给平局。更稳的中心是 `24.2% / 27.2% / 48.6%`，不是当前 `24.6% / 24.8% / 50.6%`。
- 厄瓜多尔“两场 0 进球”的负面约束仍然要保留。必须赢说明进攻选择会更激进，不说明终结就会自动兑现。
- 科特迪瓦 2.24 xG 和 74.4% 客胜偏热，尤其在“平局大概率够用”的第三轮背景下。更合理的中心是 `12.1% / 20.4% / 67.5%`，并把代表比分从 `0-2` 往 `0-1` 偏。
- 库拉索 `+2` 盘的意义是提醒模型防大胜路径过热。按当前 Poisson，`+2` 非输盘概率已到 72.0%；按红队修正后的节奏降温场景，非输盘概率接近 79.1%。
- `market_adjustment` 需要降级使用：德国场因中足彩网/新浪差异过大，不应继续给德国 +3；科特迪瓦场因只有 `+2` 盘、缺少同源 1X2，更不应给到 +5。
