# M77-M80 v3 预测链红队最终复审

red_team_status: complete_red_team_review_after_final_model_fill  
upstream_status: present_partial_source_limited_data_and_tactics_absorbed_by_modeler  
overall_verdict: hold  
betting_gate: hold_not_executable  
betting_language_blocked: true  
created_at: 2026-06-28T22:20:00+08:00

## 上游状态

- `data-collector.json`: 22:08:44, `partial_source_limited`
- `tactics-coach.json`: 22:09:02, `partial_source_limited`
- `modeler.json`: 22:11:42, `completed_partial_source_limited_data_and_tactics_absorbed`

本次已基于最终模型重跑红队。上一版“模型未吸收当前 data/tactics”的阻断已关闭；当前阻断集中在 T-75 官方首发、最终伤停/分钟限制、官方中国竞彩、同源赔率和模型尾部/重复计权。

## Canonical 对阵核验

使用 2026-06-28 canonical 32强表：M77 法国 vs 瑞典、M78 科特迪瓦 vs 挪威、M79 墨西哥 vs 厄瓜多尔、M80 英格兰 vs 刚果金。M80 禁止回退到 2026-06-27 临时英格兰 vs 塞内加尔。

## 四场 verdict

| 场次 | 最终模型 90分钟概率 | verdict | 红队阻断 |
| --- | --- | --- | --- |
| M77 法国 vs 瑞典 | 法国 61.94% / 平 20.35% / 瑞典 17.71%，xG 2.10-1.03 | hold | T-75 缺失、赔率缺失；法国 4+ 尾部 16.14% 可能重复计权 4-1 挪威与 Mbappe/Dembele/Olise 状态；瑞典定位球/双前锋尾部需保留。 |
| M78 科特迪瓦 vs 挪威 | 科特迪瓦 32.92% / 平 24.08% / 挪威 43.00%，xG 1.39-1.62 | hold | Haaland/Odegaard/Nusa 分钟是主开关；BTTS 60.23% 和 over 57.9% 显示强事件波动，泊松可能低估早球/红牌/追分态。 |
| M79 墨西哥 vs 厄瓜多尔 | 墨西哥 41.73% / 平 25.78% / 厄瓜多尔 32.49%，xG 1.44-1.24 | hold | 墨西哥城主场/海拔不能与市场或战术双算；1-1 为 top score，平局底盘强；厄瓜多尔转换尾部不可压低。 |
| M80 英格兰 vs 刚果金 | 英格兰 64.90% / 平 20.10% / 刚果金 15.00%，xG 2.07-0.88 | hold | 英格兰右后卫伤情是 blocker；赔率缺失下英格兰品牌税不可审；4+ 尾部 15.57% 不能转成让球语言。 |

## 共同阻断项

- T-75 官方首发缺失。
- 最终伤停、停赛、黄牌和分钟限制仍 source-limited。
- 官方中国竞彩缺失。
- 同源 1X2 / 让球 / 大小球赔率缺失，model_market_delta 不可用。
- 天气、裁判、临场节奏信息缺失或不足。
- 淘汰赛只给 90分钟 1X2，未模拟加时/点球/晋级概率。

## 概率折扣建议

- M77：法国胜按 59-61% 审查带处理，保留瑞典非胜约 38% 和定位球尾部。
- M78：挪威胜按 40-43% 窄优势处理，若 Haaland/Odegaard 分钟不稳则下修并抬高科特迪瓦/平局。
- M79：墨西哥胜按 39-42% 审查带处理，保留平局约 26% 和厄瓜多尔约 32% 尾部。
- M80：英格兰胜按 61-64% 封顶，若右后卫危机延续则下修并降低 4+ 大胜信心。

## 回派 owner

- data owner：T-75、最终伤停/停赛/分钟限制、天气/裁判。
- market owner：官方中国竞彩、同源 1X2/让球/大小球、overround。
- model owner：赔率到位后补 model_market_delta，复核 favorite ceiling 和 draw floor。
- tactics owner：保留瑞典/科特迪瓦/厄瓜多尔/刚果金的转换、定位球和早球尾部。
- main owner：继续阻断投注化表达。

## 收口

最终 verdict：`hold`。四场均可作为赛前讨论概率分布，但不能发布为最终确定口径，更不能进入任何可执行投注语言。
