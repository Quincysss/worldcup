phase: betting_input_data_collection_expanded
team/group/match: D/E/F组第三轮扩展购彩方案赔率补采
status: partial_score_market_unavailable
created_at: 2026-06-25T16:12:53.4621147+08:00
updated_at: 2026-06-25T16:12:53.4621147+08:00
owner: worldcup-data-collector
scope: 只补采中国足彩网可见的 SPF、让球SPF、总进球、半全场，以及比分市场 unavailable 状态；不输出投注建议。

sources:
- 中国足彩网竞彩混合页
  - URL: https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini
  - page_system_time: 2026-06-25 16:04:01
  - 可得: 普通SPF、让球SPF、未开售状态
- 中国足彩网总进球页
  - URL: https://cp.zgzcw.com/lottery/jcplayvsForJsp.action?lotteryId=24
  - page_system_time: 2026-06-25 15:45:40
  - 可得: 0/1/2/3/4/5/6/7+球赔率
- 中国足彩网半全场页
  - URL: https://cp.zgzcw.com/lottery/jcplayvsForJsp.action?lotteryId=25
  - page_system_time: 2026-06-25 16:07:10
  - 可得: 胜-胜 / 胜-平 / 胜-负 / 平-胜 / 平-平 / 平-负 / 负-胜 / 负-平 / 负-负
- 中国足彩网比分页
  - URL: https://cp.zgzcw.com/lottery/jcplayvsForJsp.action?lotteryId=23
  - 状态: unavailable
  - 原因: 当前网页文本抓取仅显示“展开”，未暴露结构化比分赔率行

selection_orders:
- ordinary_spf: 胜 / 平 / 负
- handicap_spf: 让胜 / 让平 / 让负
- total_goals: 0球 / 1球 / 2球 / 3球 / 4球 / 5球 / 6球 / 7+球
- half_full: 胜-胜 / 胜-平 / 胜-负 / 平-胜 / 平-平 / 平-负 / 负-胜 / 负-平 / 负-负

matches:
- 周四055｜厄瓜多尔 vs 德国
  - SPF: 5.20 / 4.95 / 1.36
  - 让球SPF: +1 -> 2.65 / 3.72 / 2.07
  - 总进球: 17.00 / 6.25 / 3.90 / 3.45 / 4.60 / 7.20 / 13.00 / 18.00
  - 半全场: 11.00 / 13.50 / 19.00 / 13.00 / 7.80 / 4.50 / 38.00 / 13.50 / 1.97
  - 比分: unavailable

- 周四056｜库拉索 vs 科特迪瓦
  - SPF: 未开售
  - 让球SPF: +2 -> 2.51 / 3.85 / 2.12
  - 总进球: 21.00 / 6.60 / 4.30 / 3.65 / 4.40 / 6.70 / 10.50 / 13.00
  - 半全场: 29.00 / 28.00 / 30.00 / 32.00 / 11.00 / 3.95 / 100.0 / 28.00 / 1.37
  - 比分: unavailable

- 周四057｜突尼斯 vs 荷兰
  - SPF: 未开售
  - 让球SPF: +2 -> 3.47 / 4.25 / 1.65
  - 总进球: 29.00 / 8.50 / 4.80 / 3.70 / 4.25 / 5.90 / 9.00 / 9.25
  - 半全场: 60.00 / 40.00 / 30.00 / 65.00 / 18.00 / 3.95 / 100.0 / 40.00 / 1.22
  - 比分: unavailable

- 周四058｜日本 vs 瑞典
  - SPF: 1.60 / 3.57 / 4.45
  - 让球SPF: -1 -> 2.80 / 3.57 / 2.03
  - 总进球: 12.00 / 5.40 / 3.70 / 3.55 / 4.95 / 8.75 / 15.00 / 20.00
  - 半全场: 2.47 / 14.50 / 35.00 / 4.60 / 6.00 / 9.40 / 20.00 / 14.50 / 7.00
  - 比分: unavailable

- 周四059｜巴拉圭 vs 澳大利亚
  - SPF: 2.68 / 2.11 / 3.55
  - 让球SPF: -1 -> 6.20 / 4.40 / 1.35
  - 总进球: 4.50 / 4.25 / 2.60 / 5.15 / 7.90 / 24.00 / 30.00 / 60.00
  - 半全场: 4.65 / 13.00 / 40.00 / 4.65 / 2.95 / 6.80 / 34.00 / 13.00 / 7.75
  - 比分: unavailable

- 周四060｜土耳其 vs 美国
  - SPF: 3.72 / 3.87 / 1.66
  - 让球SPF: +1 -> 1.92 / 3.85 / 2.87
  - 总进球: 14.00 / 5.50 / 3.70 / 3.40 / 4.90 / 8.50 / 14.00 / 23.00
  - 半全场: 6.30 / 13.00 / 23.00 / 9.60 / 6.50 / 4.65 / 30.00 / 13.00 / 2.55
  - 比分: unavailable

odds_gaps:
- 周四056、周四057 普通SPF未开售
- 六场比分市场结构化赔率未成功暴露，统一 unavailable
- 页面存在“系统升级暂停销售”提示，最终可售状态需临场再核

notes:
- 本文件只提供事实型赔率补采，不构成投注建议。
