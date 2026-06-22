phase: team_profile
team: 巴西
group: C
status: partial
created_at: 2026-06-12T19:22:43+08:00
updated_at: 2026-06-12T19:33:19+08:00
owner: worldcup-red-team-verifier
scope: 球队分析审查；不做比分、胜平负、出线或投注建议。
blocked_by_missing_live_refresh: true
missing_fields:
  - T-24h injury/training refresh
  - T-75m official lineup
  - final suspension check
  - fresh odds and handicap movement
  - final set-piece taker map
source_log: data/source_logs/brazil-team-source-log.json
notes:
  - deep_partial red-team review for C 组 team_profile 审查
  - blocked by live refresh before any downstream prediction use

# 巴西红队审查

## Verdict

verdict：`revise_before_prediction`

巴西是 C 组最强没有争议，但正因为太强，模型最容易把“阵容上限”错写成“稳定兑现”。预测前必须扣住角色兼容、热门溢价和攻转守保护。

## 关键断言核验

- `pass`：巴西是 C 组纸面最强、前场个人能力和阵容深度最高，这一点成立。
- `revise`：不要把“Ancelotti + 明星前场”直接写成“天然兼容、天然稳定兑现”。
- `revise`：不要把俱乐部级个人表现直接平移成国家队的阵地战效率。
- `hold`：在 T-75m 首发未出之前，不应锁死边锋组合、后腰搭配或边后卫投入幅度。

## Top 8 Concerns

1. `tactical / high`：前场明星角色可能重叠，球权分配与回防责任未必自动清晰。
2. `model / high`：阵容价值和名气容易被重复计权，导致大胜脚本被高估。
3. `market / high`：巴西属于全球公众队，市场热门溢价和情绪溢价风险显著。
4. `availability / blocker`：Vinicius、Rodrygo、Raphinha、中场双后腰、双中卫的最终配置未锁定前，进攻结构不可写死。
5. `tactical / high`：边后卫压上后，身后空间会被摩洛哥和苏格兰的反击/传中路线测试。
6. `data / medium`：Ancelotti 国家队正式赛样本仍少，不能只拿俱乐部执教履历背书。
7. `tournament / medium`：首战强队脚本若急于展示统治力，反而会放大攻转守脆弱窗口。
8. `data / medium`：定位球主罚、第一目标和中卫组合仍需赛前确认。

## 五类风险地图

- `availability`：核心前场和中卫组合一旦轮换或带伤，进攻天花板与防守地板会同时波动。
- `tactical`：最需要警惕的是攻守平衡，不是创造力不足。
- `data`：国家队新样本不足，容易被俱乐部印象和旧巴西叙事绑架。
- `market`：公众热门标签会抬高市场信任，不等于真实价值更高。
- `tournament`：首战/首轮强队叙事往往最容易制造“看起来轻松、实际并不轻松”的误判。

## overconfidence_flags

- 把“阵容最豪华”直接写成“比赛最稳”。
- 把“个人一对一强”直接写成“阵地战必然顺畅”。
- 把“主流市场看高巴西”直接写成“市场还没跟上巴西强度”。
- 把“名帅执教”当作体系磨合已完成的证据。

## upset_or_failure_scenarios

- 对摩洛哥时，久攻不下后被边路反击和门将发挥拖入低比分僵局。
- 对低位对手时，前场急于个人解决，导致射门质量不如预期。
- 中场保护不到位，边后卫身后反复被打，迫使前场回收影响进攻层次。
- 首发过度进攻化，比赛后段需要靠防守换人止损。

## 预测前 hold 条件

- Vinicius / Rodrygo / Raphinha 的首发搭配不明。
- 后腰组合不明。
- 最新盘口明显过热但没有新的队伍利好支撑。
- T-24h 伤停和训练负荷没有最终刷新。
- 中卫与边后卫组合未确认前，不应写死巴西防守地板。

## 回派

- data：补 T-24h 伤停和 T-75m 首发。
- tactics：补 Ancelotti 首发下的 rest-defense。
- model：热门溢价与真实强度分开建模。
- summary：写巴西时必须同时写“上限”和“兼容性风险”，不能只写豪华。
- main：任何“稳赢”“天然大胜”式语气都必须降级。

## 可转述风险提示

- 巴西最容易被写过头的地方，不是实力，而是大家太容易把实力直接当成稳定兑现。
- 这队前场爆点太多，看上去全是答案，但真正的问题是这些答案能不能在同一场球里不互相抢戏。
- 市场和舆论一定会捧巴西，这不是利好本身，反而提醒我们别把热门热度误当成证据。
- 对巴西最该保持的怀疑不是“他们强不强”，而是“他们能不能每场都把强度变成高质量输出”。
