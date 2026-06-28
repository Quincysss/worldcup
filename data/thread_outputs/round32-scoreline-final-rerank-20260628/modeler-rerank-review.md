# 32强 v3 预测比分层 final rerank 复核

状态：completed_review_only_no_main_prediction_file_change  
边界：不修改主预测文件，不改变 1X2/xG/泊松矩阵，不给投注建议。

## 结论

上一版 `scoreline_diversity_layer` 基本是解释层补充：它保留 raw Poisson，并补了比分簇/caveat，但没有给出独立的 `final_adjusted_top_scoreline` 与 `adjusted_top_scorelines`。因此正式展示层如果仍读取 raw Top1，就会继续大量显示 `1-1`。

建议主线程在正式 Markdown 中新增两层：

- `raw_poisson_top_scorelines`：保留数学原始排名，允许 `1-1` 继续是 raw Top1。
- `adjusted_top_scorelines`：用于展示层 headline，按邻近概率、1X2 主方向、xG 差、总 xG、战术波动和红队风险重排。

## 逐场建议

| 场次 | 比赛 | raw Top1 | final_adjusted_top_scoreline | adjusted top5 | 置信度 | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| M73 | 南非 vs 加拿大 | 1-1 12.87% | 0-1 | 0-1 11.92%、1-1 12.87%、1-2 8.62%、1-0 9.60%、0-0 8.89% | medium | raw 1-1 is only 0.95pp above 0-1. Canada leads 1X2 and xG, while total xG/Under profile keeps the adjusted display on a narrow away-edge path. |
| M75 | 荷兰 vs 摩洛哥 | 1-1 12.31% | 2-1 | 2-1 9.11%、1-0 10.99%、1-1 12.31%、2-0 8.13%、1-2 6.89% | medium_low | Netherlands has the 1X2 and xG edge, and near-miss status means the final display should use a one-goal favorite path rather than another 1-1 default. 2-1 keeps Morocco scoring risk visible. |
| M76 | 巴西 vs 日本 | 1-1 10.32% | 2-1 | 2-1 9.91%、2-0 9.18%、1-0 9.56%、3-1 6.34%、1-1 10.32% | medium_high | Brazil is a clearer favorite by 1X2, xG and strength. Raw 1-1 leads 2-1 by only 0.41pp, so final display should follow the favorite-edge/BTTS path. |
| M78 | 科特迪瓦 vs 挪威 | 1-1 11.10% | 1-2 | 1-2 8.99%、1-1 11.10%、2-1 7.71%、2-2 6.25%、0-1 7.99% | medium | Norway owns the narrow 1X2 and xG edge, with high total xG and BTTS. The adjusted scoreline should be an open away one-goal path, while preserving raw 1-1 as central draw slice. |
| M79 | 墨西哥 vs 厄瓜多尔 | 1-1 12.24% | 1-0 | 1-0 9.87%、2-1 8.81%、1-1 12.24%、0-1 8.50%、1-2 7.59% | medium_low | Mexico's edge is small but points in the home direction; 1-0 is the closest non-draw neighbor and fits the balanced total profile better than using 1-1 as final display again. |
| M82 | 比利时 vs 塞内加尔 | 1-1 10.46% | 2-1 | 2-1 8.89%、1-2 7.74%、2-2 6.58%、1-1 10.46%、3-1 5.04% | medium_low | Belgium's 1X2/xG edge is modest, but total xG is high and the match has transition volatility. Final display should move from 1-1 to open favorite-edge, with Senegal's 1-2 and 2-2 kept high. |
| M83 | 葡萄牙 vs 克罗地亚 | 1-1 11.94% | 1-0 | 1-0 11.05%、2-1 9.43%、2-0 8.73%、1-1 11.94%、0-1 7.55% | medium | Portugal has the stronger 1X2/xG direction but the total profile is not strongly over. 1-0 is the closest non-draw neighbor and better represents controlled favorite edge. |
| M84 | 西班牙 vs 奥地利 | 1-1 10.34% | 2-1 | 2-1 9.93%、2-0 9.46%、1-0 9.85%、3-1 6.35%、1-1 10.34% | medium_high | Spain is a clear favorite and raw 1-1 is only 0.41pp above 2-1. With total xG near 3 and Austria's pressing/transition threat, 2-1 is the better adjusted display. |

## 执行规则

1. 不得篡改 raw Poisson 矩阵；`1-1` 如果是 raw Top1，必须继续记录在 `raw_poisson_top1`。
2. 展示 headline 使用 `final_adjusted_top_scoreline`，不要继续直接读取 raw Top1。
3. close-strength 场次如果 1-1 与 1-0/0-1/2-1/1-2 差距小，应优先展示一球差或双路径，不让多场都落成 1-1。
4. 强弱差更明显但 raw Top1 为 1-1 的比赛，按 1X2 主方向和 xG 方向选择 2-1、2-0、1-0 等邻近比分。
5. 本次建议只影响比分展示层，不改变胜平负概率、大小球概率、红队状态或投注闸门。
