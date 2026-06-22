phase: team_profile
team: 法国
group: I 组
match: N/A
status: partial
created_at: 2026-06-10T17:16:20.4497734+08:00
updated_at: 2026-06-10T17:19:03.2206614+08:00
owner: red-team-verifier
scope: 法国队 team_profile 核验；只审查球队档案事实、伤停、战术、模型输入和市场事实，不扩展到比分预测、小组出线预测、冠军预测或投注建议
inputs_expected:
  - data\packets\teams\france-team-packet.json
  - data\packets\tactics\france-tactics-packet.json
  - data\outputs\team_reports\france-model-brief.json
missing_fields:
  - france-team-packet.json 缺少 official_squad
  - france-team-packet.json 缺少 recent_form
  - france-team-packet.json 缺少 injuries
  - france-team-packet.json 缺少 odds
  - france-team-packet.json 缺少 source_log
  - france-tactics-packet.json 缺少 formation
  - france-tactics-packet.json 缺少 player_roles
  - france-tactics-packet.json 缺少 defense
  - france-tactics-packet.json 缺少 set_pieces
  - france-tactics-packet.json 缺少 risk_flags
  - france-model-brief.json 缺少 baseline_strength
  - france-model-brief.json 缺少 core_player_sensitivity
  - france-model-brief.json 缺少 market_calibration
  - france-model-brief.json 缺少 uncertainty_flags
source_log:
  - local: K:\worldcup\data\packets\teams\france-team-packet.json，2026-06-10 读取，状态为 in_progress，仅有骨架
  - local: K:\worldcup\data\packets\tactics\france-tactics-packet.json，2026-06-10 读取，状态为 in_progress，仅有骨架
  - local: K:\worldcup\data\outputs\team_reports\france-model-brief.json，2026-06-10 读取，状态为 in_progress，仅有骨架
  - official: FFF《Les 26 Bleus pour le Mondial 2026》，2026-05-21
  - official: FFF《La liste pour le Mondial en stats》，2026-05-21
  - official: FFF《Trompes par les Elephants》，2026-06-04
  - official: FFF《Signe Olise》，2026-06-08
  - official: FFF《Resultats et calendrier》，2026-06-10 访问
  - market: ESPN BET World Cup futures，2026-06-10 抓取
notes:
  - 上游三个输入包均未完成，因此本稿不能标记为 complete。
  - 本稿先给出第一版 team_profile 反方审查与 owner 回派，等待 data/tactics/model/summary/main 继续补齐。
  - 当前阶段不生成任何比分、小组出线、冠军或投注建议结论。

# 法国队 team_profile 核验报告

## 上游状态判断

- 当前总状态：`partial`
- 原因：
  - `france-team-packet.json` 只有骨架，没有正式 squad、伤停、近期样本、盘口和 source log。
  - `france-tactics-packet.json` 只有骨架，没有阵型、角色、攻守、定位球和风险标记。
  - `france-model-brief.json` 只有骨架，没有基线强度、核心球员敏感度、市场校准和不确定性标记。

这意味着本次只能给出一版“基于外部官方资料与市场快照的反方初审”，不能假装已经完成完整核验。

## 当前证据快照

1. 法国在 2026-05-21 公布世界杯 26 人名单，德尚继续带队，球队骨架仍围绕迈尼昂、孔德、萨利巴、于帕梅卡诺、特奥、楚阿梅尼、拉比奥、坎特、登贝莱、姆巴佩、奥利塞等人展开。
2. 法国足协官方仍将法国置于 `FIFA 排名第 1` 的位置，这会天然放大“法国很稳”的外部叙事。
3. 最近热身与赛前样本并不全是顺风：
   - 2026-06-04 法国 1 比 2 科特迪瓦。
   - 2026-06-08 法国 3 比 1 北爱尔兰，奥利塞上演帽子戏法，但比赛并非无瑕疵。
4. 市场层面，法国在 2026-06-10 仍是世界杯冠军热门之一，价格区间大致在 `+450` 附近。这说明“法国强队叙事”已经明显写进市场，而不是便宜位置。
5. 这支法国依然天赋顶级，但当前版本不能直接沿用 2018 或 2022 的心理锚点，因为锋线组织、边路分工、老将角色和领先后管理都存在版本变化。

## Top Concerns

### 1. 法国强队叙事容易写得过满

- `category`: market / data
- `severity`: high
- `confidence`: high
- `evidence`:
  - 法国目前仍被官方和市场共同放在世界最强档。
  - 冠军热门价格本身说明公众与市场都天然愿意高看法国。
- `why_it_matters`:
  - 这类叙事最容易把“法国上限极高”偷换成“法国稳定性也同样极高”。
  - 在 `team_profile` 阶段，这会直接污染球队档案的语气，让后续 summary 或 main 在没有补充风险条款时写得过度自信。
- `follow_up_check`:
  - 任何正面表述必须把“上限”与“稳定性”拆开写。
- `owner`: main

### 2. 核心球员可用性、疲劳和角色变化不能被默认为低风险

- `category`: availability
- `severity`: blocker
- `confidence`: medium
- `evidence`:
  - 当前上游 data packet 没有填任何伤停、首发可用性或分钟负荷字段。
  - 法国核心多来自俱乐部高负荷球员池，赛季末阶段不能只看是否入选名单。
  - 当前法国版本的攻击端和组织端，明显比旧版本更依赖姆巴佩、登贝莱、奥利塞等人的状态与角色协调。
- `why_it_matters`:
  - 这不是小修小补式信息缺口，而是会直接改变对法国“成熟度”和“可复制性”的判断。
- `follow_up_check`:
  - 对姆巴佩、登贝莱、奥利塞、楚阿梅尼、坎特、萨利巴、于帕梅卡诺、迈尼昂至少补齐 `available_for_squad`、`available_to_start`、`minutes_risk`。
- `owner`: data

### 3. 国家队近期样本与历史大赛淘汰赛样本极易被混权

- `category`: data
- `severity`: high
- `confidence`: high
- `evidence`:
  - 法国外界叙事天然会调用德尚时代的历史成绩与淘汰赛记忆。
  - 但当前队伍的轮换结构、边锋组合、进攻发起点和中场年龄结构，已经不是同一版本。
  - 最近热身赛里，法国既有 3 比 1 北爱尔兰的高光，也有 1 比 2 科特迪瓦的降温样本。
- `why_it_matters`:
  - 如果把历史大赛抗压能力直接当作当前球队档案的稳定证据，就会把“老招牌”误写成“现版本已验证”。
- `follow_up_check`:
  - 样本必须拆成：
    - 当前周期正式比赛样本
    - 当前周期热身赛样本
    - 历史大赛淘汰赛样本
    - 旧版本法国样本
- `owner`: data

### 4. 热门溢价与市场共识风险客观存在

- `category`: market
- `severity`: medium
- `confidence`: high
- `evidence`:
  - 法国冠军热门价格处于最前列，说明市场早已把强队标签和公众热度吸收进去。
- `why_it_matters`:
  - 即使不进入投注建议阶段，也要在球队档案里明确：市场看高法国，并不自动等于“法国被低估”。
  - 否则后续 model 或 summary 很容易把市场同向误用成二次背书。
- `follow_up_check`:
  - 模型线必须补“市场共识”和“市场价值”之间的区分，不允许只写“市场也支持法国”。
- `owner`: model

### 5. 左右路保护与转换防守可能被法国光环遮住

- `category`: tactical
- `severity`: high
- `confidence`: medium
- `evidence`:
  - 根据法国当前常见配置推断，法国边后卫参与推进的意愿强，边锋又偏向内收或高位单打，天然会把边路回防和转换保护变成脆弱点。
  - 科特迪瓦一战输球，本身就是提醒：法国并非每次都能靠个人天赋补平攻守波动。
- `why_it_matters`:
  - 如果 summary 只写“法国边路爆点多”，不写“边路身后和回防联动是否稳定”，那就是典型的单边叙事。
- `follow_up_check`:
  - tactics 线必须单独回答：
    - 左路是否因特奥前插而暴露身后。
    - 右路在孔德与右边锋内收时，保护链条是否完整。
    - 一旦前场丢球，楚阿梅尼 / 坎特 / 拉比奥谁是第一道屏障。
- `owner`: tactics

### 6. 中场屏障与领先后管理不应自动打高分

- `category`: tactical
- `severity`: medium
- `confidence`: medium
- `evidence`:
  - 法国中场名字很硬，但当前上游战术包完全没有填写中场职责和领先后控场机制。
  - 旧印象里法国擅长大赛管理节奏，但当前版本是否仍能稳定压住比赛，需要新样本证明。
- `why_it_matters`:
  - 很多“法国很稳”的描述，本质靠的是记忆，不是现成数据。
- `follow_up_check`:
  - tactics 线补：
    - 领先后是否回收过深。
    - 是否容易给对手二次进攻和定位球机会。
    - 中场双六号 / 单六号的覆盖与传控代价。
- `owner`: tactics

### 7. 定位球攻防需要单列，不应被法国整体实力吞掉

- `category`: tactical
- `severity`: medium
- `confidence`: low
- `evidence`:
  - 当前没有上游定位球数据，战术包也空白。
  - 但法国历来高个点多，对手也会把定位球当成少数可直接挑战法国的渠道。
- `why_it_matters`:
  - 如果没有单列定位球，球队档案会默认法国“全场景都强”，这不严谨。
- `follow_up_check`:
  - tactics 补角球、任意球、前点/后点保护、二点球回收。
- `owner`: tactics

## 哪些结论应 `pass / revise / hold`

### `pass`

以下类型结论目前可以 `pass`：

1. “法国的个人天赋上限仍是世界最强档之一。”
2. “法国的公众热度和市场热度都很高，强队光环真实存在。”
3. “法国当前球队档案不能只写好处，必须同步写风险。”

### `revise`

以下类型结论目前应 `revise`：

1. “法国依然是那支天然稳定、天然成熟的法国。”
2. “只要看法国最近赢球场次，就足以证明当前版本已磨合完成。”
3. “法国边路和中场天赋太好，所以攻守转换问题可以忽略。”
4. “历史大赛淘汰赛经验足，所以当前球队档案可以默认领先后管理没问题。”
5. “市场看好法国，所以法国当前价格一定不贵。”

### `hold`

以下类型结论目前应 `hold`：

1. 关于核心球员负荷、伤停、首发可用性的强表述。
2. 关于法国当前最优防线、中场屏障和定位球稳定性的定论。
3. 关于法国市场价格是否存在真实价值的判断。
4. 任何会被下游误读成比赛预测或投注建议的强结论。

## Owner 回派

### `data`

1. 完成正式 squad 字段和 source log。
2. 补齐姆巴佩、登贝莱、奥利塞、楚阿梅尼、坎特、萨利巴、于帕梅卡诺、迈尼昂的可用性和分钟风险。
3. 拆分近期样本与历史大赛样本，禁止混权。
4. 补市场快照字段与时间戳。

### `tactics`

1. 回答左路、右路的保护链条是否稳。
2. 回答转换防守、中场第一道屏障、领先后控场机制。
3. 单列定位球攻防与风险点。
4. 说明当前法国最可能的结构性短板，而不只是优势项。

### `model`

1. 检查是否把法国品牌、FIFA 排名、市场热门和历史成绩重复计权。
2. 说明模型如何处理“强队叙事偏置”。
3. 说明法国当前市场价格反映的是实力、热度，还是两者混合。

### `summary`

1. 写法国时必须加一句反方约束，避免“法国天然稳”的语气。
2. 不得把历史冠军 / 亚军记忆直接包装成当前版本的确定性。
3. 当前阶段只准写球队档案，不得偷渡到出线、冠军或比分表述。

### `main`

1. 所有“法国很稳”“法国最完整”“法国短板不明显”之类句子必须降级。
2. 法国档案里必须同时呈现：
   - 强点：天赋、深度、上限。
   - 风险：角色变化、负荷、边路保护、转换防守、热门溢价。

## 可转述的球迷风格风险提示

1. 法国当然还是豪门，但豪门不等于这版法国就没有版本更新的磨合成本。
2. 真正该小心的，是大家太容易把德尚时代的旧记忆直接套到 2026 这支法国身上。
3. 法国的强点不用怀疑，问题是强点会不会把边路保护、转换防守和领先后管理这些细节遮住。
4. 市场很看法国，这本身就说明“法国叙事”已经不便宜了，档案里不能只写顺风话。

## Sources

1. 法国足协，2026-05-21：
   - [Les 26 Bleus pour le Mondial 2026](https://www.fff.fr/article/16790-les-26-bleus-pour-le-mondial-2026.html)
   - [La liste pour le Mondial en stats](https://www.fff.fr/article/16792-la-liste-pour-le-mondial-en-stats.html)
2. 法国足协，2026-06-05：
   - [Trompes par les Elephants](https://www.fff.fr/article/16918-trompes-par-les-elephants.html)
3. 法国足协，2026-06-08：
   - [Signe Olise](https://www.fff.fr/article/16943-signe-olise.html)
4. 法国足协国家队主页与赛历：
   - [Resultats et calendrier](https://www.fff.fr/selection/2-equipe-de-france/resultats-et-calendrier.html)
5. 市场快照，2026-06-10：
   - [Every team's championship, group odds for the 2026 World Cup](https://www.espn.com/espn/betting/story/_/id/48386952/espn-soccer-futbol-world-cup-betting-odds-championship-groups)
