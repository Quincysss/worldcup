phase: group_stage_round3_data_collection
team/group/match: H组第三轮
status: partial
created_at: 2026-06-25T14:50:06+08:00
updated_at: 2026-06-25T14:53:49+08:00
owner: worldcup-data-collector
scope: H组第三轮两场赛前事实采集；仅提供积分、赛程、出线语境、竞彩快照、来源与数据缺口，不做比分预测或投注建议
missing_fields:
- FIFA官方可直接访问的完整第三轮赛前伤停公告
- 四队T-75官方首发
- 新浪同市场结构化竞彩赔率
source_log:
- https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_H
- https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
- https://sports.sina.com.cn/global/worldcup/
notes:
- skeleton_created_first
- local_h_group_files_read
- member_tables_read
- separate_injury_tables_missing

# 本地读取状态

- 已完成比赛复盘已读取：
  - `比赛/已完成比赛/小组赛/H组/2026-06-15_沙特_1-1_乌拉圭_复盘.md`
  - `比赛/已完成比赛/小组赛/H组/2026-06-15_西班牙_0-0_佛得角_复盘.md`
  - `比赛/已完成比赛/小组赛/H组/2026-06-21_乌拉圭_2-2_佛得角_复盘.md`
  - `比赛/已完成比赛/小组赛/H组/2026-06-21_西班牙_4-0_沙特_复盘.md`
  - `比赛/已完成比赛/小组赛/H组/H组第一轮复盘.md`
  - `比赛/已完成比赛/小组赛/H组/H组第二轮复盘.md`
- 第二轮预测/复盘 JSON 已读取：
  - `data/outputs/match_predictions/h-group-round2-postmortem-20260622.json`
  - `data/outputs/match_predictions/h-group-round2-predictions.json`
  - `data/outputs/match_predictions/h-group-round2-quant-revision-20260621.json`
- 成员表已读取：
  - `队伍/西班牙/成员表.md`
  - `队伍/乌拉圭/成员表.md`
  - `队伍/佛得角/成员表.md`
  - `队伍/沙特/成员表.md`
- 独立伤停表读取结果：
  - `队伍/西班牙/伤停表.md` 不存在
  - `队伍/乌拉圭/伤停表.md` 不存在
  - `队伍/佛得角/伤停表.md` 不存在
  - `队伍/沙特/伤停表.md` 不存在

# 已核验基线

## 前两轮赛果

- 2026-06-15 沙特 1比1 乌拉圭
- 2026-06-15 西班牙 0比0 佛得角
- 2026-06-21 乌拉圭 2比2 佛得角
- 2026-06-21 西班牙 4比0 沙特

## 当前积分表

来源：Wikipedia Group H 页面，采集时间 `2026-06-25T14:27:19+08:00`，`source_status=secondary_verified`

| 排名 | 球队 | 场次 | 胜 | 平 | 负 | 进球 | 失球 | 净胜球 | 积分 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 西班牙 | 2 | 1 | 1 | 0 | 4 | 0 | +4 | 4 |
| 2 | 乌拉圭 | 2 | 0 | 2 | 0 | 3 | 3 | 0 | 2 |
| 3 | 佛得角 | 2 | 0 | 2 | 0 | 2 | 2 | 0 | 2 |
| 4 | 沙特 | 2 | 0 | 1 | 1 | 1 | 5 | -4 | 1 |

## 第三轮赛程

- 2026-06-27 08:00（北京时间）佛得角 vs 沙特
- 2026-06-27 08:00（北京时间）乌拉圭 vs 西班牙
- 同组同时开球：是

## 出线语境

- 西班牙：`draw_enough`、`first_place_race`
- 乌拉圭：`qualification_live`、`first_place_race`
- 佛得角：`qualification_live`、`first_place_race`
- 沙特：`must_win`
- 以上标签为积分表推导，`source_status=derived_from_current_table`

## 淘汰赛路径摘要

- H组第一：对阵 J组第二
- H组第二：对阵 J组第一
- H组第三：若进入最佳第三名，可能对阵 A/G/I/L 组第一
- 路径信息来源为二级页面摘要，建议模型侧仅作为赛前动机与轮换背景，不作为硬编码结果

# 竞彩同源赔率快照

主来源：中国足彩网竞彩混合页  
URL：`https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini`  
页面 `systemTime=2026-06-25 14:27:19`

## 周五063 佛得角 vs 沙特

- 普通胜平负：`2.40 / 3.05 / 2.60`
- 让球胜平负：`-1`，`5.55 / 4.00 / 1.43`
- 是否未开售：否
- 参考展示欧赔：`2.83 / 2.43 / 3.38`
- 可入模边界：竞彩 SP 与去水概率可入模；参考欧赔仅作旁注，不当作竞彩 SP 使用

去水后概率：

| 市场 | 主胜 | 平 | 客胜 |
| --- | --- | --- | --- |
| 普通胜平负 | 0.3690 | 0.2903 | 0.3407 |
| 让球胜平负（-1） | 0.1595 | 0.2213 | 0.6192 |

## 周五064 乌拉圭 vs 西班牙

- 普通胜平负：`6.85 / 4.22 / 1.34`
- 让球胜平负：`+1`，`2.65 / 3.35 / 2.21`
- 是否未开售：否
- 参考展示欧赔：`1.49 / 6.78 / 4.18`
- 可入模边界：竞彩 SP 与去水概率可入模；参考欧赔仅作旁注，不当作竞彩 SP 使用

去水后概率：

| 市场 | 主胜 | 平 | 客胜 |
| --- | --- | --- | --- |
| 普通胜平负 | 0.1293 | 0.2098 | 0.6609 |
| 让球胜平负（+1） | 0.3345 | 0.2646 | 0.4009 |

## 新浪交叉验证

- 新浪体育当前表面可核到 2026-06-27 两场赛程存在
- 未稳定抓到同市场结构化竞彩赔率
- 记录状态：`fixture_verified_no_structured_odds_from_sina_in_current_surface`

# 阵容与动态字段现状

- 四队成员表已存在，可供模型读取基础人员结构
- 独立伤停表当前未发现本地文件，需继续以成员表内状态字段或赛前外部公告补充
- T-75 官方首发尚未发布；按项目规则记为“未公布”，不是错误

# 数据缺口

- FIFA 官方可直接访问的 H 组第三轮赛前完整伤停与停赛通告仍未在当前闭环中补齐
- 四队累计黄牌导致的停赛风险，当前仅有局部成员表线索，未形成统一结构表
- 赛前 24 小时最终天气、草皮与临场场地维护状态未核验
- 新浪未提供稳定结构化同市场竞彩赔率，无法做同源复核

# 给模型线程的可用字段

- 当前积分、净胜球、进失球、同组同时开球关系
- 资格状态标签：`must_win` / `qualification_live` / `draw_enough` / `first_place_race`
- 竞彩普通胜平负与让球胜平负快照
- 竞彩去水概率
- 本地成员表存在性与独立伤停表缺失状态

# 备注

- `factor_inputs_ready=true`
- 当前包可进入模型，但需将伤停、黄牌风险、T-75首发作为赛前刷新项
