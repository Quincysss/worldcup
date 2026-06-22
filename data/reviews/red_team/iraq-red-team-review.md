phase: team_profile
team: 伊拉克
status: partial
created_at: 2026-06-11T00:45:00+08:00
updated_at: 2026-06-11T15:55:00+08:00
owner: main-thread
scope: Iraq team_profile red-team review only
missing_fields:
  - T-24h injury and training update
  - T-75m official starters and bench
  - complete last-10 structured sample
  - exact Opta rank
  - full set-piece map
source_log:
  - K:\worldcup\data\packets\teams\iraq-team-packet.json
  - K:\worldcup\data\packets\tactics\iraq-tactics-packet.json
  - K:\worldcup\data\outputs\team_reports\iraq-model-brief.json
notes:
  - 当前只审查伊拉克 team_profile，不做比分预测、小组出线预测、冠军预测或投注建议。

# 伊拉克 team_profile 核验/反方审查

## 总体 verdict

当前 verdict：`revise / partial`

伊拉克可以写成“有组织、有斗志、有低比分制造能力的长赔队”，但不能写成“热身赛逼平西班牙，所以已经具备稳定爆冷能力”。这支队最容易被写错的地方，是把精神属性和低位防守样本夸大成持续竞争力。

## 需要通过的结论

- 伊拉克是 I 组纸面弱势方，这一点不能回避。
- Graham Arnold 带来的纪律性和低位组织，会让他们比纯身价和排名看起来更麻烦。
- Aymen Hussein 是进攻端最关键的结构点，而不只是一个普通中锋。

## 必须 revise 的结论

- “伊拉克热身赛状态好，所以小组里有稳定抢分能力。”  
  需要修正。热身赛可以说明状态和信心，但世界杯强度、对手认真度和比赛语境不同。

- “伊拉克只会死守。”  
  需要修正。更准确是：他们会优先保结构，但会通过 Aymen Hussein、Ali Jasim、Zidane Iqbal 等点寻找反击和定位球机会。

- “赔率很长，所以没必要分析。”  
  需要修正。长赔说明基线弱，但低事件比赛里长赔队也会提高方差。

## 必须 hold 的结论

- 任何关于首战首发、防线站位和核心体能的强判断。
- 任何把西班牙 1-1 热身赛直接转成世界杯正赛概率的判断。
- 任何投注倾向。

## 主要风险

1. 样本高估  
   对西班牙 1-1 很提气，但需要确认这是结构强，还是热身赛语境带来的噪声。

2. 早丢球风险  
   如果伊拉克先丢球，被迫提高阵型和节奏，比赛会迅速进入他们不舒服的轨道。

3. Aymen Hussein 依赖  
   直接球、二点球、禁区落点和定位球威胁都依赖他。一旦被限制，伊拉克进攻会变窄。

4. 中场抗压  
   Zidane Iqbal 能提供连接，但面对法国、挪威、塞内加尔不同类型的压迫，伊拉克能不能持续把球带出去仍是问题。

5. 伤病与轮换  
   Ahmed Yahya 因腿筋伤退出并被替换，这说明边路/攻击线深度不是完全无风险。

## Owner 回派

- data：补完整近 10 场、T-24h 伤停、T-75m 首发、球员俱乐部出场负荷。
- tactics：补低位防守站位、边路保护、定位球主罚和被压制后的出球路径。
- model：后续预测时单独给伊拉克的低比分/低事件方差参数，不要只用身价线性压低。
- summary：正式档案可以写“麻烦”，但不要写成“黑马”。
