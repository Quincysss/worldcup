# E组第三轮数据采集摘要

- 抓取时间: 2026-06-25T11:07:45+08:00；主线程复核修正时间: 2026-06-25T11:25+08:00
- 本地核验: 已读取队伍成员表、player_state、前两轮复盘、E组第三轮预测/复盘文件；未修改主预测文件。

## 赛程确认

- 周四055 厄瓜多尔 vs 德国
  - FIFA: https://www.fifa.com/en/match-centre/match/17/285023/289273/400021466
  - FIFA 赛程交叉核验: https://fifaworldcup26.suites.fifa.com/events/Germany-vs-Ecuador-111731/
- 周四056 库拉索 vs 科特迪瓦
  - FIFA: https://www.fifa.com/en/match-centre/match/17/285023/289273/400021468
  - FIFA 预览交叉核验: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/curacao-cote-divoire-preview-live-stream-team-news-tickets

## 赔率快照

| 比赛编号 | 比赛 | 普通胜平负 | 让球胜平负 | 普通是否未开售 | 来源 |
| --- | --- | --- | --- | --- | --- |
| 周四055 | 厄瓜多尔 vs 德国 | 4.36 / 4.05 / 1.53 | +1: 2.14 / 3.45 / 2.69 | 否 | https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini |
| 周四056 | 库拉索 vs 科特迪瓦 | unavailable / 未开售 | +2: 2.40 / 3.85 / 2.21 | 是 | https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini |

## 新浪交叉验证

- 《竞彩大势：厄瓜多尔无惧德国 土耳其有望不败》  
  https://sports.sina.com.cn/l/2026-06-25/doc-inieqnaz7865631.shtml
  - 确认周四055为厄瓜多尔VS德国；主线程复核采用新浪/足彩网近同源口径 4.36 / 4.05 / 1.53。
- 《世界杯情报：库拉索大本营距比赛球场飞行2.5小时》  
  https://sports.sina.com.cn/l/2026-06-25/doc-inieqnce5833414.shtml
  - 确认周四056为库拉索VS科特迪瓦，并提供赛前情报；同样未稳定抓到同源数值赔率快照。

## 本地复盘核验

- 德国 7-1 库拉索
- 科特迪瓦 1-0 厄瓜多尔
- 德国 2-1 科特迪瓦
- 厄瓜多尔 0-0 库拉索

## 缺口

- 中国福利彩票足彩网页顶部仍显示“因系统升级，该彩种暂停销售”，页面存在时点波动；本文件原先由数据线程写入的 3.80 / 3.70 / 1.68 与后续隐藏字段复核不一致，最终预测采用 4.36 / 4.05 / 1.53。
- 周四056 普通胜平负在页面上显示 `未开售`，仅能稳定读取让球盘。
- 本次没有拿到可稳定复用的新浪同源完整赔率快照；该项记为 unavailable/missing。
