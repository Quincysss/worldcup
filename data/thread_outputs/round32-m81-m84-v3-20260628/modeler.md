# 32强 M81-M84 v3 模型线程输出

状态：completed_partial_source_limited_data_available_tactics_older_than_data  
时间：2026-06-28T22:52:00+08:00  
边界：只输出90分钟概率模型，不给投注建议；betting_gate_status=discussion_only_hold。

## 输入就绪

- data-collector.json：available，赛程与 predicted_lineups 已吸收。
- tactics-coach.json：available_but_older_than_data_partial，按限幅战术因子吸收。
- predicted_lineups_source：data_collector_packet，每队 predicted_xi=11。
- 赔率：missing_same_source_complete_snapshot；market weight=0。
- 红队：pending。

## M81 美国 vs 波黑

赛程：2026-07-01 17:00，San Francisco Bay Area Stadium。  
战术摘要：美国4-2-3-1/4-3-3的主场压迫、宽度和运动能力，对波黑4-2-3-1/4-4-2的Dzeko支点、Pjanic节奏和定位球形成主动压制与高线反击风险并存的对位。

### 概率摘要

| 项目 | 数值 |
| --- | ---: |
| xG | 美国 1.75 - 1.00 波黑 |
| 总 xG | 2.75 |
| 美国胜 | 55.0% |
| 平局 | 23.5% |
| 波黑胜 | 21.5% |
| Over 2.5 | 51.8% |
| Under 2.5 | 48.1% |
| BTTS Yes | 52.2% |

Top5 比分：1-0 (11.2%)、1-1 (11.2%)、2-0 (9.8%)、2-1 (9.8%)、0-0 (6.4%)。

### 预计首发

来源：data_collector_packet；状态：probable_not_official；T-75 官方首发发布后必须重核。

**美国 4-2-3-1，置信度 medium**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 马特·弗里斯 Matt Freese | 一门候选，本地状态稳定 |
| RB | 亚历克斯·弗里曼 Alex Freeman | 右后卫，高状态 |
| CB | 克里斯·理查兹 Chris Richards | 中卫对抗 |
| CB | 蒂姆·里姆 Tim Ream | 中卫出球和经验 |
| LB | 安东尼·罗宾逊 Antonee Robinson | 左后卫推进 |
| DM | 泰勒·亚当斯 Tyler Adams | 后腰保护 |
| CM | 韦斯顿·麦肯尼 Weston McKennie | 中场前插 |
| AM | 马利克·蒂尔曼 Malik Tillman | 前腰连接 |
| RW | 乔瓦尼·雷纳 Giovanni Reyna | 右/中路创造 |
| LW | 亚历杭德罗·森德哈斯 Álex Zendejas | 边路内切 |
| ST | 弗拉林·巴洛贡 Folarin Balogun | 中锋终结 |

**波黑 4-2-3-1，置信度 medium_low**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 尼古拉·瓦西利 Nikola Vasilj | 门将候选 |
| RB | 阿马尔·德迪奇 Amar Dedić | 右后卫推进 |
| CB | 埃明·马赫米奇 Emin Mahmić | 中卫，本地状态高 |
| CB | 斯捷潘·拉德利奇 Stjepan Radeljić | 中卫 |
| LB | 赛德·科拉希纳茨 Sead Kolašinac | 左后卫/中卫经验 |
| DM | 阿米尔·哈季艾哈梅托维奇 Amir Hadžiahmetović | 后腰连接 |
| CM | 丹尼斯·侯赛因巴希奇 Denis Huseinbašić | 中场跑动 |
| AM | 伊万·巴希奇 Ivan Bašić | 前腰/中场 |
| RW | 伊斯梅特·巴伊拉克塔雷维奇 Esmir Bajraktarević | 边路创造 |
| LW | 凯里姆·阿拉伊贝戈维奇 Kerim Alajbegović | 边锋/二前锋 |
| ST | 卢卡·库拉希纳茨 Luka Kulenović | 中锋，高状态 |

### 因子与调整

| 因子 | 美国 | 波黑 | 说明 |
| --- | ---: | ---: | --- |
| 基础实力 | 78 | 71 | 基于 data-collector canonical bracket、晋级路径、小组赛趋势和本地 player_state。 |
| 攻击质量 | 77 | 68 | 吸收小组赛进球趋势、前场状态点和淘汰赛尾部信号。 |
| 防守稳定 | 72 | 66 | 吸收失球、门将、低位抗压和转换防守风险。 |
| 球员状态调整 | 0.04 | -0.02 | local_player_state_partial |
| 伤停/分钟调整 | 0 | -0.02 | T-75 与最新伤停仍需重核 |
| 战术对位调整 | 0.06 | -0.04 | tactics older than data, conservative cap |
| 赛程环境调整 | 0.03 | -0.01 | 赛程/场地来自 data-collector：San Francisco Bay Area Stadium。 |
| 市场调整 | 0 | 0 | odds_missing |

### 泊松矩阵

0-0 到 5-5 矩阵见 JSON；tail_probability=0.00972，matrix_sum_check=1。

### 风险与缺口

- tactics 包早于 data，若战术线程返工完成，需要再次微调。
- T-75 官方首发缺失，若核心球员或阵型变化，xG 与 Top5 比分需重算。
- 赔率缺失，odds_implied_probability 与 model_market_delta 为 null。

## M82 比利时 vs 塞内加尔

赛程：2026-07-01 13:00，Seattle Stadium。  
战术摘要：比利时4-2-3-1的De Bruyne/Lukaku/Doku纵深与塞内加尔4-2-3-1/4-3-3的身体压迫、边路速度和低位反击互相放大比赛波动。

### 概率摘要

| 项目 | 数值 |
| --- | ---: |
| xG | 比利时 1.70 - 1.48 塞内加尔 |
| 总 xG | 3.18 |
| 比利时胜 | 43.0% |
| 平局 | 23.4% |
| 塞内加尔胜 | 33.6% |
| Over 2.5 | 61.6% |
| Under 2.5 | 38.4% |
| BTTS Yes | 63.1% |

Top5 比分：1-1 (10.5%)、2-1 (8.9%)、1-2 (7.7%)、1-0 (7.1%)、2-2 (6.6%)。

### 预计首发

来源：data_collector_packet；状态：probable_not_official；T-75 官方首发发布后必须重核。

**比利时 4-2-3-1，置信度 medium_low**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 蒂博·库尔图瓦 Thibaut Courtois | 一门，队内状态最高 |
| RB | 蒂莫西·卡斯塔涅 Timothy Castagne | 右后卫 |
| CB | 泽诺·德巴斯特 Zeno Debast | 中卫 |
| CB | 阿蒂尔·泰特 Arthur Theate | 中卫/左侧防守 |
| LB | 阿莱克西斯·萨勒马克尔斯 Alexis Saelemaekers | 边后卫/翼侧候选 |
| DM | 阿马杜·奥纳纳 Amadou Onana | 后腰对抗 |
| CM | 尤里·蒂勒曼斯 Youri Tielemans | 中场传球 |
| AM | 凯文·德布劳内 Kevin De Bruyne | 核心创造 |
| RW | 杰里米·多库 Jeremy Doku | 右/左路突破 |
| LW | 莱安德罗·特罗萨德 Leandro Trossard | 左路内切 |
| ST | 查尔斯·德凯特拉雷 Charles De Ketelaere | 中锋/九号半 |

**塞内加尔 4-3-3，置信度 medium_low**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 爱德华-门迪 Édouard Mendy | 一门 |
| RB | 克雷潘-迪亚塔 Krépin Diatta | 右路往返 |
| CB | 穆萨-尼亚哈特 Moussa Niakhaté | 中卫 |
| CB | 阿卜杜拉耶-塞克 Abdoulaye Seck | 中卫防空 |
| LB | 埃尔-哈吉-马利克-迪乌夫 El Hadji Malick Diouf | 左后卫推进 |
| DM | 伊德里萨-盖耶 Idrissa Gueye | 后腰经验 |
| CM | 拉明-卡马拉 Lamine Camara | 中场推进 |
| CM | 帕普-马塔尔-萨尔 Pape Matar Sarr | 中场跑动 |
| RW | 易卜拉欣-姆巴耶 Ibrahim Mbaye | 右路高状态 |
| LW | 伊利曼-恩迪亚耶 Iliman Ndiaye | 左/中路创造 |
| ST | 尼古拉斯-杰克逊 Nicolas Jackson | 中锋冲击 |

### 因子与调整

| 因子 | 比利时 | 塞内加尔 | 说明 |
| --- | ---: | ---: | --- |
| 基础实力 | 82 | 79 | 基于 data-collector canonical bracket、晋级路径、小组赛趋势和本地 player_state。 |
| 攻击质量 | 85 | 81 | 吸收小组赛进球趋势、前场状态点和淘汰赛尾部信号。 |
| 防守稳定 | 76 | 77 | 吸收失球、门将、低位抗压和转换防守风险。 |
| 球员状态调整 | 0.04 | 0.05 | local_player_state_partial |
| 伤停/分钟调整 | 0 | 0 | T-75 与最新伤停仍需重核 |
| 战术对位调整 | 0.02 | 0.03 | tactics older than data, conservative cap |
| 赛程环境调整 | 0 | 0 | 赛程/场地来自 data-collector：Seattle Stadium。 |
| 市场调整 | 0 | 0 | odds_missing |

### 泊松矩阵

0-0 到 5-5 矩阵见 JSON；tail_probability=0.012144，matrix_sum_check=1。

### 风险与缺口

- tactics 包早于 data，若战术线程返工完成，需要再次微调。
- T-75 官方首发缺失，若核心球员或阵型变化，xG 与 Top5 比分需重算。
- 赔率缺失，odds_implied_probability 与 model_market_delta 为 null。

## M83 葡萄牙 vs 克罗地亚

赛程：2026-07-02 19:00，Toronto Stadium。  
战术摘要：葡萄牙4-3-3的高质量边锋、Bruno/Bernardo肋部创造，对克罗地亚老将中场控节奏、定位球和低位防守形成技术型淘汰赛对位。

### 概率摘要

| 项目 | 数值 |
| --- | ---: |
| xG | 葡萄牙 1.58 - 1.08 克罗地亚 |
| 总 xG | 2.66 |
| 葡萄牙胜 | 48.9% |
| 平局 | 25.1% |
| 克罗地亚胜 | 26.0% |
| Over 2.5 | 49.6% |
| Under 2.5 | 50.3% |
| BTTS Yes | 52.4% |

Top5 比分：1-1 (11.9%)、1-0 (11.1%)、2-1 (9.4%)、2-0 (8.7%)、0-1 (7.6%)。

### 预计首发

来源：data_collector_packet；状态：probable_not_official；T-75 官方首发发布后必须重核。

**葡萄牙 4-2-3-1，置信度 medium**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 迪奥戈·科斯塔 Diogo Costa | 一门，高状态 |
| RB | 迪奥戈·达洛特 Diogo Dalot | 右后卫 |
| CB | 鲁本·迪亚斯 Rúben Dias | 中卫核心 |
| CB | 雷纳托·韦加 Renato Veiga | 中卫/左脚平衡 |
| LB | 若昂·坎塞洛 João Cancelo | 边后卫组织 |
| DM | 鲁本·内维斯 Rúben Neves | 后腰传球 |
| CM | 若昂·内维斯 João Neves | 中场覆盖 |
| AM | 布鲁诺·费尔南德斯 Bruno Fernandes | 核心创造 |
| RW | 佩德罗·内托 Pedro Neto | 右路速度 |
| LW | 拉斐尔·莱奥 Rafael Leão | 左路纵深 |
| ST | 贡萨洛·拉莫斯 Gonçalo Ramos | 中锋终结 |

**克罗地亚 4-2-3-1，置信度 medium**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 多米尼克·利瓦科维奇 Dominik Livakovic | 一门 |
| RB | 约西普·斯塔尼希奇 Josip Stanisic | 右后卫 |
| CB | 约西普·舒塔洛 Josip Sutalo | 中卫 |
| CB | 约什科·格瓦迪奥尔 Josko Gvardiol | 中卫/左侧推进 |
| LB | 伊万·佩里希奇 Ivan Perisic | 左路经验与传中 |
| DM | 马特奥·科瓦契奇 Mateo Kovacic | 中场推进，80分钟下场负荷观察 |
| CM | 卢卡·莫德里奇 Luka Modric | 组织核心，第三轮角球助攻 |
| AM | 尼古拉·弗拉希奇 Nikola Vlasic | 前腰，第三轮制胜球 |
| RW | 佩塔尔·苏契奇 Petar Sucic | 右/中场攻击，第三轮进球 |
| LW | 马丁·巴图里纳 Martin Baturina | 左/中路创造 |
| ST | 安特·布迪米尔 Ante Budimir | 中锋支点 |

### 因子与调整

| 因子 | 葡萄牙 | 克罗地亚 | 说明 |
| --- | ---: | ---: | --- |
| 基础实力 | 83 | 75 | 基于 data-collector canonical bracket、晋级路径、小组赛趋势和本地 player_state。 |
| 攻击质量 | 82 | 72 | 吸收小组赛进球趋势、前场状态点和淘汰赛尾部信号。 |
| 防守稳定 | 79 | 74 | 吸收失球、门将、低位抗压和转换防守风险。 |
| 球员状态调整 | 0.03 | 0.01 | local_player_state_partial |
| 伤停/分钟调整 | 0 | -0.01 | T-75 与最新伤停仍需重核 |
| 战术对位调整 | 0.04 | 0.01 | tactics older than data, conservative cap |
| 赛程环境调整 | 0 | 0 | 赛程/场地来自 data-collector：Toronto Stadium。 |
| 市场调整 | 0 | 0 | odds_missing |

### 泊松矩阵

0-0 到 5-5 矩阵见 JSON；tail_probability=0.006573，matrix_sum_check=1。

### 风险与缺口

- tactics 包早于 data，若战术线程返工完成，需要再次微调。
- T-75 官方首发缺失，若核心球员或阵型变化，xG 与 Top5 比分需重算。
- 赔率缺失，odds_implied_probability 与 model_market_delta 为 null。

## M84 西班牙 vs 奥地利

赛程：2026-07-02 12:00，Los Angeles Stadium。  
战术摘要：西班牙4-3-3的控球、反压和边路一对一，对奥地利4-2-3-1的Rangnick式高压、纵向冲刺和定位球形成压迫互相测试。

### 概率摘要

| 项目 | 数值 |
| --- | ---: |
| xG | 西班牙 1.92 - 1.05 奥地利 |
| 总 xG | 2.97 |
| 西班牙胜 | 57.6% |
| 平局 | 22.0% |
| 奥地利胜 | 20.3% |
| Over 2.5 | 57.0% |
| Under 2.5 | 43.0% |
| BTTS Yes | 55.5% |

Top5 比分：1-1 (10.3%)、2-1 (9.9%)、1-0 (9.9%)、2-0 (9.5%)、3-1 (6.4%)。

### 预计首发

来源：data_collector_packet；状态：probable_not_official；T-75 官方首发发布后必须重核。

**西班牙 4-3-3，置信度 medium**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 乌奈·西蒙 Unai Simón | 一门候选 |
| RB | 马科斯·略伦特 Marcos Llorente | 右后卫/中场兼容 |
| CB | 保·库巴西 Pau Cubarsí | 中卫出球 |
| CB | 艾梅里克·拉波尔特 Aymeric Laporte | 中卫经验 |
| LB | 马克·库库雷利亚 Marc Cucurella | 左后卫 |
| DM | 罗德里 Rodri | 中场轴心 |
| CM | 马丁·祖比门迪 Martín Zubimendi | 中场控制 |
| CM | 佩德里 Pedri | 中场创造 |
| RW | 拉明·亚马尔 Lamine Yamal | 右路核心，肌肉问题管理 |
| LW | 尼科·威廉姆斯 Nico Williams | 左路速度，肌肉问题管理 |
| ST | 米克尔·奥亚萨瓦尔 Mikel Oyarzabal | 中锋/左路，状态最高 |

**奥地利 4-2-3-1，置信度 medium**

| 位置 | 球员 | 角色 |
| --- | --- | --- |
| GK | 亚历山大-施拉格尔 Alexander Schlager | 门将候选 |
| RB | 康拉德-莱默尔 Konrad Laimer | 右后卫/中场压迫 |
| CB | 凯文-丹索 Kevin Danso | 中卫对抗 |
| CB | 菲利普-林哈特 Philipp Lienhart | 中卫 |
| LB | 菲利普-姆韦内 Phillipp Mwene | 左后卫 |
| DM | 尼古拉斯-塞瓦尔德 Nicolas Seiwald | 后腰覆盖 |
| CM | 克萨韦尔-施拉格尔 Xaver Schlager | 中场压迫 |
| AM | 马塞尔-萨比策 Marcel Sabitzer | 中前场核心，高状态 |
| RW | 帕特里克-维默尔 Patrick Wimmer | 右路突破 |
| LW | 亚历山大-普拉斯 Alexander Prass | 左路/中场覆盖 |
| ST | 萨沙-卡拉季奇 Saša Kalajdžić | 中锋高点 |

### 因子与调整

| 因子 | 西班牙 | 奥地利 | 说明 |
| --- | ---: | ---: | --- |
| 基础实力 | 88 | 76 | 基于 data-collector canonical bracket、晋级路径、小组赛趋势和本地 player_state。 |
| 攻击质量 | 87 | 74 | 吸收小组赛进球趋势、前场状态点和淘汰赛尾部信号。 |
| 防守稳定 | 84 | 75 | 吸收失球、门将、低位抗压和转换防守风险。 |
| 球员状态调整 | 0.06 | 0.02 | local_player_state_partial |
| 伤停/分钟调整 | 0 | -0.01 | T-75 与最新伤停仍需重核 |
| 战术对位调整 | 0.07 | -0.02 | tactics older than data, conservative cap |
| 赛程环境调整 | 0 | 0 | 赛程/场地来自 data-collector：Los Angeles Stadium。 |
| 市场调整 | 0 | 0 | odds_missing |

### 泊松矩阵

0-0 到 5-5 矩阵见 JSON；tail_probability=0.014599，matrix_sum_check=1。

### 风险与缺口

- tactics 包早于 data，若战术线程返工完成，需要再次微调。
- T-75 官方首发缺失，若核心球员或阵型变化，xG 与 Top5 比分需重算。
- 赔率缺失，odds_implied_probability 与 model_market_delta 为 null。

## 文件索引

- data/thread_outputs/round32-m81-m84-v3-20260628/modeler.json
- data/thread_outputs/round32-m81-m84-v3-20260628/modeler.md
