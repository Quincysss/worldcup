---
phase: postmatch_fact_collection
group: E
match:
  - ecuador-vs-germany-2026-06-25
  - curacao-vs-ivory-coast-2026-06-25
status: partial
created_at: 2026-06-26T00:00:00+08:00
updated_at: 2026-06-26T10:08:26.0804315+08:00
owner: worldcup-data-collector
scope: e-group-round3-postmatch-facts-only
missing_fields:
  - 两场助攻链官方或同级稳定源最终确认
  - 两场完整首发与换人分钟结构化回填
  - 两场逐人评分同源结构化数据
  - 四队 2026-06-25 赛后 player_state 回灌
  - 四队 2026-06-25 赛后成员表回灌
source_log:
  - https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
  - https://www.theguardian.com/football/2026/jun/25/ecuador-germany-world-cup-match-report
  - https://www.theguardian.com/football/2026/jun/25/pepe-at-the-double-as-cote-divoire-beat-curacao-and-claim-place-in-last-32
notes:
  - 只做事实采集/校验，不做预测或投注建议。
  - 未改写四队 canonical 文件，本文件只给回灌依据和缺口。
---

# E组第三轮赛后事实包

## 总览

- 已核验赛果：厄瓜多尔 2 比 1 德国；库拉索 0 比 2 科特迪瓦。
- 已核验赔率链：周四055 有普通胜平负与让球胜平负；周四056 仅稳定拿到让球胜平负，普通胜平负记为未开售或不可得。
- 已核验读取状态：四队 `player_state` JSON 可解析，四份 `成员表.md` 可读取，但均未发现 `2026-06-25` 第三轮赛后回灌痕迹。

## 比赛 1：厄瓜多尔 2 比 1 德国

- 半场：1 比 1。
- 已核进球：
  - 2' Leroy Sane（德国）
  - 9' Nilson Angulo（厄瓜多尔）
  - 77' Gonzalo Plata（厄瓜多尔）
- 助攻链：本轮未稳定核到，保留缺口。
- 赛前赔率链：
  - 周四055 普通胜平负：4.36 / 4.05 / 1.53
  - 去水隐含概率：主 0.203，平 0.2185，客 0.5785
  - 让球胜平负：厄瓜多尔 +1，2.14 / 3.45 / 2.69
  - 结果对应：普通胜平负打出主胜，属于赛前市场视角下的冷门；让球胜平负打出主胜
- 首发/换人/牌：
  - 可从本地复盘与主流赛报继续整理
  - 当前事实包未做分钟级统一结构化，状态 `partial`
- 逐人评分：
  - 当前未取得四队同源稳定评分页，状态 `blocked_or_partial_source_limited`
- 建议回灌：
  - 厄瓜多尔：Gonzalo Plata、Nilson Angulo 更新进球、状态值、状态原因
  - 德国：Leroy Sane 更新进球、状态值、状态原因

## 比赛 2：库拉索 0 比 2 科特迪瓦

- 半场：0 比 1。
- 已核进球：
  - 7' Pepe（科特迪瓦）
  - 64' Pepe（科特迪瓦）
- 助攻链：本轮未稳定核到，保留缺口。
- 赛前赔率链：
  - 周四056 普通胜平负：未开售或未记录到结构化赔率
  - 让球胜平负：库拉索 +2，2.40 / 3.85 / 2.21
  - 去水隐含概率：主 0.3691，平 0.2301，客 0.4008
  - 结果对应：让球胜平负打出平
- 首发/换人/牌：
  - 可从本地复盘与主流赛报继续整理
  - 当前事实包未做分钟级统一结构化，状态 `partial`
- 逐人评分：
  - 当前未取得同源稳定逐人评分，状态 `blocked_or_partial_source_limited`
- 建议回灌：
  - 科特迪瓦：Pepe 更新梅开二度、状态值、状态原因
  - 库拉索：待首发和出场分钟统一核后，补防线/门将的失球与负荷信息

## Canonical 读取状态

- `K:\worldcup\data\outputs\player_state\ecuador-player-state.json`：可解析，更新时间 `2026-06-22T09:25:00+08:00`，未见第三轮回灌
- `K:\worldcup\data\outputs\player_state\germany-player-state.json`：可解析，更新时间 `2026-06-22T21:04:20+08:00`，未见第三轮回灌
- `K:\worldcup\data\outputs\player_state\curacao-player-state.json`：可解析，更新时间 `2026-06-22T09:25:00+08:00`，未见第三轮回灌
- `K:\worldcup\data\outputs\player_state\ivory-coast-player-state.json`：可解析，更新时间 `2026-06-22T21:04:20+08:00`，未见第三轮回灌
- 四份成员表：
  - `K:\worldcup\队伍\厄瓜多尔\成员表.md`
  - `K:\worldcup\队伍\德国\成员表.md`
  - `K:\worldcup\队伍\库拉索\成员表.md`
  - `K:\worldcup\队伍\科特迪瓦\成员表.md`
  - 均可读取，但未发现 `2026-06-25` 第三轮赛后内容

## 数据缺口

- 两场助攻链未稳定核到。
- 两场完整首发、换人分钟、牌数尚未做官方或同级稳定源统一结构化。
- 同源逐人评分不可得，不能编造。
- 四队 `player_state` 与 `成员表` 尚未执行第三轮赛后回灌。
