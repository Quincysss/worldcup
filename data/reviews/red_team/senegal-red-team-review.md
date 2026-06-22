phase: team_profile
team: 塞内加尔
group: I 组
match: N/A
status: partial
created_at: 2026-06-10T18:00:00+08:00
updated_at: 2026-06-10T18:06:10.2852270+08:00
owner: worldcup-red-team-verifier
scope: 塞内加尔 team_profile 核验；只审查球队档案事实、伤停、战术、模型输入和市场事实，不扩展到比分预测、小组出线预测、冠军预测或投注建议
inputs_expected:
  - data\packets\teams\senegal-team-packet.json
  - data\packets\tactics\senegal-tactics-packet.json
  - data\outputs\team_reports\senegal-model-brief.json
missing_fields:
  - senegal-team-packet.json 仍为骨架，缺少 official_final_squad
  - senegal-team-packet.json 仍为骨架，缺少 injury_suspension_fitness_status
  - senegal-team-packet.json 仍为骨架，缺少 recent_match_samples
  - senegal-team-packet.json 仍为骨架，缺少 market_facts_snapshot
  - senegal-team-packet.json 仍为骨架，缺少 source_log
  - senegal-tactics-packet.json 缺少 verified structured team packet
  - senegal-tactics-packet.json 缺少完整 final 26 纯文本核对
  - senegal-tactics-packet.json 缺少 full substitution timeline by match state
  - senegal-tactics-packet.json 缺少视频级 wide defensive exposure review
  - senegal-tactics-packet.json 缺少 full set-piece taker mapping
  - senegal-model-brief.json 文件不存在
  - market calibration facts 缺少结构化沉淀
source_log:
  - local: K:\worldcup\data\packets\teams\senegal-team-packet.json，2026-06-10 读取，状态为 in_progress，仅有骨架
  - local: K:\worldcup\data\packets\tactics\senegal-tactics-packet.json，2026-06-10 读取，状态为 partial，已有初步战术内容
  - local: K:\worldcup\data\outputs\team_reports\senegal-model-brief.json，2026-06-10 检查，不存在
  - official: FSF《Mondial 2026 : Pape Thiaw publie sa liste》，2026-05-21
  - official: FSF《Liste des Lions retenus pour le Mondial 2026》，2026-06-02
  - official: FSF《Le Sénégal fait match nul blanc contre le Soudan》，2025-03-23
  - official: FSF《Les Lions étrillent les Bright Stars 5-0》，2025-10-10
  - official: FSF《Le Sénégal et l'Arabie saoudite se neutralisent 0-0》，2026-06-10
  - official: FSF category page，含 USA 3-2 Senegal friendly 与 retained squad 索引
  - official: FIFA Senegal squad page / squad-announcement search references，2026-06-10 检索
  - official: CAF《Know the coach: Pape Thiaw (Senegal)》
  - market: ESPN/FOX/SI 类世界杯 odds 页面检索快照，2026-06-10
notes:
  - 主线程已先创建骨架，本稿按 team_profile 协议继续补全。
  - 由于 model brief 文件缺失、team packet 仍为空骨架，本稿不能标记为 complete。
  - 当前阶段不生成任何比分、小组出线、冠军或投注建议。

# 塞内加尔 team_profile 核验/反方审查

## 上游状态判断

- 当前总状态：`partial`
- 原因：
  - `senegal-team-packet.json` 仍是纯骨架，几乎没有可消费事实字段。
  - `senegal-tactics-packet.json` 已有初步内容，但仍明确标记为 `partial`，且依赖未完成的数据包。
  - `senegal-model-brief.json` 目前不存在，这使“模型输入是否夸大/低估塞内加尔”的问题无法完整闭环。

结论上，这份文件是可交接的第一版红队审查，不是终版核验。

## 当前证据快照

1. 塞内加尔由 Pape Thiaw 带队，官方与 CAF 公开资料共同支持其执教画像：重纪律、重转换、并不只是“靠身体硬顶”的简单叙事。
2. FSF 在 2026-05-21 公布世界杯名单，2026-06-02 又发布 retained players article，但 final 26 的纯文本可读性仍然不足，这意味着最终完整名单仍需数据线二次核对。
3. 近阶段公开样本呈现出明显的两面性：
   - 2025-03-23 对苏丹 0 比 0，官方口径是占优但未兑现。
   - 2025-10-10 对南苏丹 5 比 0，大胜弱旅样本容易抬高表面进攻强度。
   - 2026-06-10 对沙特 0 比 0，世界杯前最后热身赛仍暴露破密防与终结效率问题。
   - FSF 类目页同时可见美国 3 比 2 塞内加尔的热身赛索引，说明塞内加尔并非没有被高节奏对攻拉开的样本。
4. 市场层面，塞内加尔在主流世界杯赔率页面中通常被放在“有存在感的黑马/次级强队”区间，而不是绝对热门。这意味着两种偏差都可能出现：
   - 普通球迷因非洲球队刻板印象而低估塞内加尔。
   - 另一部分叙事又会因为非洲冠军、大赛经验、马内/Koulibaly 光环而把他们写得过满。
5. 当前最需要警惕的，不是简单判断塞内加尔“强还是弱”，而是避免把他们写成一种单线条球队。

## Top Concerns

### 1. 塞内加尔既可能被低估，也可能被“非洲冠军/大赛经验”叙事高估

- `category`: market / data
- `severity`: high
- `confidence`: medium_high
- `evidence`:
  - 主流市场并没有把塞内加尔当成顶级热门，但也绝不是完全轻视。
  - 官方与外部叙事会反复调用塞内加尔的非洲豪强身份、强身体条件和大赛经验。
- `why_it_matters`:
  - 如果球队档案只写“他们是非洲队，所以常被低估”，会漏掉另一面：市场和媒体也常把塞内加尔包装成“最危险黑马”，从而高估其稳定性。
- `follow_up_check`:
  - summary/main 必须同时呈现“被刻板印象低估”和“被黑马叙事高估”两条风险。
- `owner`: summary

### 2. 核心球员年龄、状态、伤停、俱乐部负荷和国家队角色变化目前缺少硬核对

- `category`: availability
- `severity`: blocker
- `confidence`: high
- `evidence`:
  - team packet 当前没有任何结构化伤停与负荷字段。
  - 塞内加尔核心讨论通常围绕 Mane、Koulibaly、Edouard Mendy、Ismaila Sarr、Nicolas Jackson、Pape Matar Sarr、Idrissa Gana Gueye 展开，但这些人的年龄曲线、俱乐部出场稳定性和国家队职责并不完全一致。
- `why_it_matters`:
  - 这是球队档案层面的硬阻断。没有这层核验，就无法判断塞内加尔当前版本是“经验加成”，还是“需要靠老将维持天花板、但波动更大”。
- `follow_up_check`:
  - data 必须补齐核心球员的 `available_for_squad`、`available_to_start`、`minutes_risk`、近 30 天出场、近 14 天负荷与角色说明。
- `owner`: data

### 3. 近期样本、非洲区样本、友谊赛样本与世界杯强度极易被混权

- `category`: data
- `severity`: high
- `confidence`: high
- `evidence`:
  - 对苏丹 0 比 0 与对南苏丹 5 比 0 这类样本，环境强度差异极大。
  - 对沙特 0 比 0 的热身赛又提示：面对密防或低速节奏时，塞内加尔不一定天然有稳定解法。
- `why_it_matters`:
  - 如果把“非洲区预选赛大胜”和“世界杯级对抗能力”直接画等号，就会把塞内加尔的进攻稳定性写得过强。
- `follow_up_check`:
  - 数据线必须拆分：
    - 非洲区正式比赛样本
    - 热身赛样本
    - 对低位/密防样本
    - 对高节奏强对抗样本
- `owner`: data

### 4. 阵地战破密防能力不能被默认乐观

- `category`: tactical
- `severity`: high
- `confidence`: high
- `evidence`:
  - 对苏丹 0 比 0、对沙特 0 比 0 都指向类似问题：占优或不落下风，不等于能稳定把优势转成进球。
  - tactics packet 也把“frustrating scoreless draw”明确写进了沙特热身赛的备注。
- `why_it_matters`:
  - 这类队伍很容易在肉眼观感上显得危险，但真要落到阵地战破门时，效率未必够稳定。
- `follow_up_check`:
  - tactics 需要明确：
    - 塞内加尔面对低位 4-5-1 或 5 后卫时的主要破局路径。
    - 如果 Mane 与边锋纵深起不来，谁负责中路最后一传。
- `owner`: tactics

### 5. 中场控球稳定性与第一脚出球质量可能被低估

- `category`: tactical
- `severity`: medium_high
- `confidence`: medium
- `evidence`:
  - 外界提到塞内加尔时，往往先提冲击力、速度和对抗，而不是中场细腻控制。
  - 这意味着一旦比赛被压成需要持续控球、反复拆解的形态，他们未必处在最舒服的剧本里。
- `why_it_matters`:
  - 如果队伍档案只写“中场强硬、对抗足”，却不写“控球稳定性到底够不够”，就会把风格优势误写成全场景优势。
- `follow_up_check`:
  - tactics 需要单列：第一脚出球、二三线连接、丢球后回收站位。
- `owner`: tactics

### 6. 边后卫身后与 rest-defense 保护值得警惕

- `category`: tactical
- `severity`: medium_high
- `confidence`: medium
- `evidence`:
  - tactics packet 自己就把 “wide defensive exposure and rest-defense spacing” 放进了 missing_fields。
  - 这说明连战术线当前都还没有完成对这个薄弱点的最终核实。
- `why_it_matters`:
  - 对速度型、转换型球队来说，最大的误判之一就是以为他们只会用速度伤人，却忘了他们也可能在失位时被别人用速度打回来。
- `follow_up_check`:
  - tactics 线补视频级复核：边后卫前插后的保护、双中卫外拉后的肋部空间、边锋回防深度。
- `owner`: tactics

### 7. 定位球防守与领先后管理不应因为“硬度足”就默认安全

- `category`: tactical
- `severity`: medium
- `confidence`: medium_low
- `evidence`:
  - 当前没有完整 set-piece taker mapping，也没有领先/落后不同状态的换人与收缩时间线。
  - 但高对抗球队常被外界自动脑补成“领先后就很会守”，这是需要证据而不是靠印象成立的。
- `why_it_matters`:
  - 如果 summary/main 把“身体条件好”直接翻译成“领先后稳”，就是典型滑坡。
- `follow_up_check`:
  - tactics 补：角球防守、后点保护、二点球清理、领先后的回收高度与换人逻辑。
- `owner`: tactics

### 8. 市场对塞内加尔的认知偏差可能比价格本身更值得盯

- `category`: market
- `severity`: medium
- `confidence`: medium
- `evidence`:
  - 主流赔率通常给塞内加尔“有威胁但非头号热门”的位置。
  - 这意味着价格本身未必极端，但公众叙事可能更极端。
- `why_it_matters`:
  - 红队当前阶段不做投注建议，但需要提醒主线程：市场事实可以记录，市场价值判断要慎重，尤其别把公众情绪当成结构化证据。
- `follow_up_check`:
  - model 需要补：塞内加尔是被公众低估、被黑马叙事高估，还是两者在不同市场并存。
- `owner`: model

## 哪些结论应 `pass / revise / hold`

### `pass`

以下类型结论目前可以 `pass`：

1. “塞内加尔不是一句‘非洲球队’就能概括的队伍，他们有真实的大赛硬度和转换威胁。”
2. “塞内加尔当前档案必须同时写上限和波动，不能只写一种叙事。”
3. “塞内加尔面对低位密防时的稳定破局能力，仍应被视为待核验问题。”

### `revise`

以下类型结论目前应 `revise`：

1. “塞内加尔一定被低估。”
2. “塞内加尔有大赛经验，所以当前版本天然成熟。”
3. “非洲区样本强势，足以直接证明世界杯级对抗也会稳定强势。”
4. “身体好、速度快，所以领先后管理天然可靠。”
5. “有 Mane / Koulibaly / Mendy 这类名字，球队就一定比以前更稳。”

### `hold`

以下类型结论目前应 `hold`：

1. 关于核心球员状态、疲劳、年龄曲线和首发可用性的强结论。
2. 关于市场是否系统性高估/低估塞内加尔的模型化判断。
3. 关于其最优阵型、边路保护和定位球稳定性的定论。
4. 任何可能被下游误读成比赛预测或投注建议的话术。

## Owner 回派

### `data`

1. 把 final 26 纯文本名单核对出来，不要只依赖图片型官方发布。
2. 补 Mane、Koulibaly、Edouard Mendy、Ismaila Sarr、Nicolas Jackson、Pape Matar Sarr、Idrissa Gana Gueye 的可用性、负荷与角色变化。
3. 对近阶段样本做强度分层，禁止把非洲区样本与世界杯级对抗样本混权。
4. 补 market facts snapshot 与时间戳。

### `tactics`

1. 继续完成阵地战破密防、中场控球稳定性、边后卫身后、rest-defense、定位球防守、领先后管理。
2. 把当前 packet 里仍缺失的 substitution timeline 和视频级 wide defensive exposure review 补齐。
3. 给出塞内加尔最容易被误写的两个强点与两个薄弱点。

### `model`

1. 创建缺失的 `K:\worldcup\data\outputs\team_reports\senegal-model-brief.json`。
2. 说明模型如何处理“非洲冠军/黑马叙事偏差”。
3. 说明市场对塞内加尔的定价究竟是尊重、保守，还是叙事性高估/低估并存。

### `summary`

1. 最终球队摘要不能只写“身体、速度、冲击力”，要写清他们在破密防和控球稳定性上的疑点。
2. 不得把历史印象直接翻译成当前版本的确定性。
3. 当前阶段只准写 team_profile，不准偷渡到小组预测或冠军讨论。

### `main`

1. 禁止把塞内加尔写成“稳定黑马”这种看起来夸又看起来留余地、实则过满的句式。
2. 正确口径应是：塞内加尔上限真实存在，但兑现方式依赖对手类型与核心状态，波动同样真实。

## 可转述的球迷风格风险提示

1. 塞内加尔最容易被人看错的地方，是你以为他们只会靠身体冲，其实他们也会跟你磨；但你要是反过来把他们写成“成熟到没短板”，那又写过头了。
2. 这队的危险是真的，尤其是转换和纵深，但阵地战真要碰上密防，未必每次都有稳定钥匙。
3. 市场不算轻视塞内加尔，所以别轻易把“大家没把他们当热门”误读成“他们一定有被低估的价值”。
4. 塞内加尔档案最该保留的一句提醒是：他们的上限值得尊重，波动也必须被正视。

## Sources

1. 塞内加尔足协，2026-05-21：
   - [Mondial 2026 : Pape Thiaw publie sa liste](https://fsfoot.sn/mondial-2026-pape-thiaw-publie-sa-liste/)
2. 塞内加尔足协，2026-06-02：
   - [Liste des Lions retenus pour le Mondial 2026](https://fsfoot.sn/liste-des-lions-retenus-pour-le-mondial-2026/)
3. 塞内加尔足协，2025-03-23：
   - [Le Sénégal fait match nul blanc contre le Soudan](https://fsfoot.sn/eliminatoires-mondial-2026-le-senegal-fait-match-nul-blanc-contre-le-soudan/)
4. 塞内加尔足协，2025-10-10：
   - [Les Lions étrillent les Bright Stars 5-0](https://fsfoot.sn/match-sud-soudan-senegal-les-lions-etrillent-les-bright-stars-5-0-et-conservent-la-tete-du-groupe-b/)
5. 塞内加尔足协，2026-06-10：
   - [Le Sénégal et l'Arabie saoudite se neutralisent 0-0](https://fsfoot.sn/preparatifs-mondial-2026-le-senegal-et-larabie-saoudite-se-neutralisent-0-0/)
6. CAF：
   - [Know the coach: Pape Thiaw (Senegal)](https://www.cafonline.com/afcon2025/news/totalenergies-caf-afcon-2025-know-the-coach-pape-thiaw-senegal/)
7. FIFA：
   - [Senegal squad page](https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/teams/senegal/squad)
8. 市场检索快照，2026-06-10：
   - [Every team's championship, group odds for the 2026 World Cup](https://www.espn.com/espn/betting/story/_/id/48386952/espn-soccer-futbol-world-cup-betting-odds-championship-groups)
   - [2026 FIFA World Cup Men Odds](https://www.foxsports.com/soccer/2026-fifa-world-cup-men-odds)
