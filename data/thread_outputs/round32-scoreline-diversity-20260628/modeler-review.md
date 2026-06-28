# 32强 M73-M84 比分簇多样性复核

状态：completed_review_only_no_probability_change  
边界：只复核 scoreline_diversity_layer，不改变 1X2 概率，不输出投注建议。

## 触发摘要

- triggered：M73、M78、M79、M82
- near_miss：M75、M83
- 不应只写 1-1 或需要比分簇解释：M73、M75、M76、M78、M79、M82、M83、M84

## 逐场复核

| 比赛 | 状态 | xG | Top1 | 原因 | 建议 |
| --- | --- | --- | --- | --- | --- |
| M73 南非 vs 加拿大 | triggered | 1.08-1.34 | 1-1 (12.9%) | strength_gap=6 <=8; xg_gap=0.26 <=0.35; total_xg=2.42 in 2.2-3.2; top1=1-1 margin=0.95pp 1-1 overconcentration | write_double_path_or_scoreline_clusters |
| M74 德国 vs 巴拉圭 | not_triggered | 2.1-0.78 | 2-0 (12.4%) | strength_gap=18 >8 or unknown; xg_gap=1.32 >0.35; total_xg=2.88 in 2.2-3.2; top1=2-0 margin=0.59pp not 1-1 overconcentration | standard_top5_sufficient_with_cluster_optional |
| M75 荷兰 vs 摩洛哥 | near_miss | 1.48-1.12 | 1-1 (12.3%) | strength_gap=3 <=8; xg_gap=0.36 >0.35; total_xg=2.6 in 2.2-3.2; top1=1-1 margin=1.32pp 1-1 overconcentration | write_top1_caveat_and_relevant_cluster |
| M76 巴西 vs 日本 | not_triggered | 1.92-1.08 | 1-1 (10.3%) | strength_gap=11 >8 or unknown; xg_gap=0.84 >0.35; total_xg=3 in 2.2-3.2; top1=1-1 margin=0.41pp 1-1 overconcentration | write_top1_caveat_and_relevant_cluster |
| M77 法国 vs 瑞典 | not_triggered | 2.1-1.03 | 2-1 (9.9%) | strength_gap=11 >8 or unknown; xg_gap=1.07 >0.35; total_xg=3.13 in 2.2-3.2; top1=2-1 margin=0.29pp not 1-1 overconcentration | standard_top5_sufficient_with_cluster_optional |
| M78 科特迪瓦 vs 挪威 | triggered | 1.39-1.62 | 1-1 (11.1%) | strength_gap=3 <=8; xg_gap=0.23 <=0.35; total_xg=3.01 in 2.2-3.2; top1=1-1 margin=2.11pp 1-1 overconcentration | write_double_path_or_scoreline_clusters |
| M79 墨西哥 vs 厄瓜多尔 | triggered | 1.44-1.24 | 1-1 (12.2%) | strength_gap=2 <=8; xg_gap=0.2 <=0.35; total_xg=2.68 in 2.2-3.2; top1=1-1 margin=2.37pp 1-1 overconcentration | write_double_path_or_scoreline_clusters |
| M80 英格兰 vs 刚果金 | not_triggered | 2.07-0.88 | 2-0 (11.2%) | strength_gap=16 >8 or unknown; xg_gap=1.19 >0.35; total_xg=2.95 in 2.2-3.2; top1=2-0 margin=0.38pp not 1-1 overconcentration | standard_top5_sufficient_with_cluster_optional |
| M81 美国 vs 波黑 | not_triggered | 1.75-1 | 1-0 (11.2%) | strength_gap=7 <=8; xg_gap=0.75 >0.35; total_xg=2.75 in 2.2-3.2; top1=1-0 margin=0pp not 1-1 overconcentration | standard_top5_sufficient_with_cluster_optional |
| M82 比利时 vs 塞内加尔 | triggered | 1.7-1.48 | 1-1 (10.5%) | strength_gap=3 <=8; xg_gap=0.22 <=0.35; total_xg=3.18 in 2.2-3.2; top1=1-1 margin=1.57pp 1-1 overconcentration | write_double_path_or_scoreline_clusters |
| M83 葡萄牙 vs 克罗地亚 | near_miss | 1.58-1.08 | 1-1 (11.9%) | strength_gap=8 <=8; xg_gap=0.5 >0.35; total_xg=2.66 in 2.2-3.2; top1=1-1 margin=0.88pp 1-1 overconcentration | write_top1_caveat_and_relevant_cluster |
| M84 西班牙 vs 奥地利 | not_triggered | 1.92-1.05 | 1-1 (10.3%) | strength_gap=12 >8 or unknown; xg_gap=0.87 >0.35; total_xg=2.97 in 2.2-3.2; top1=1-1 margin=0.41pp 1-1 overconcentration | write_top1_caveat_and_relevant_cluster |

## 必须补的比分簇

### M73 南非 vs 加拿大

Top1 caveat：`1-1` is only the central draw slice; publish as dual-path: draw core plus one-goal edge cluster.

- low_event_draw_cluster：21.8%，0-0 8.9%、1-1 12.9%
- balanced_one_goal_cluster：37.1%，1-0 9.6%、0-1 11.9%、2-1 7.0%、1-2 8.6%
- open_draw_cluster：5.4%，2-2 4.7%、3-3 0.8%
- favorite_edge_cluster：32.4%，0-1 11.9%、1-2 8.6%、0-2 8.0%、1-3 3.9%
- underdog_edge_cluster：21.7%，1-0 9.6%、2-1 7.0%、2-0 5.2%
- volatility_tail_cluster：11.3%，3-2 1.7%、2-3 2.1%、3-1 2.5%、1-3 3.9%、4-2 0.4%、2-4 0.7%

### M75 荷兰 vs 摩洛哥

Top1 caveat：`1-1` needs a caveat because adjacent one-goal scores are close.

- low_event_draw_cluster：19.7%，0-0 7.4%、1-1 12.3%
- balanced_one_goal_cluster：35.3%，1-0 11.0%、0-1 8.3%、2-1 9.1%、1-2 6.9%
- open_draw_cluster：6.0%，2-2 5.1%、3-3 0.9%
- favorite_edge_cluster：32.7%，1-0 11.0%、2-1 9.1%、2-0 8.1%、3-1 4.5%
- underdog_edge_cluster：19.9%，0-1 8.3%、1-2 6.9%、0-2 4.7%
- volatility_tail_cluster：12.9%，3-2 2.5%、2-3 1.9%、3-1 4.5%、1-3 2.6%、4-2 0.9%、2-4 0.5%

### M76 巴西 vs 日本

Top1 caveat：`1-1` is a raw-grid artifact despite a clearer 1X2 favorite; headline should use favorite-edge cluster.

- low_event_draw_cluster：15.3%，0-0 5.0%、1-1 10.3%
- balanced_one_goal_cluster：30.4%，1-0 9.6%、0-1 5.4%、2-1 9.9%、1-2 5.6%
- open_draw_cluster：6.6%，2-2 5.3%、3-3 1.2%
- favorite_edge_cluster：35.0%，1-0 9.6%、2-1 9.9%、2-0 9.2%、3-1 6.3%
- underdog_edge_cluster：13.9%，0-1 5.4%、1-2 5.6%、0-2 2.9%
- volatility_tail_cluster：15.9%，3-2 3.4%、2-3 1.9%、3-1 6.3%、1-3 2.0%、4-2 1.6%、2-4 0.5%

### M78 科特迪瓦 vs 挪威

Top1 caveat：`1-1` is only the central draw slice; publish as dual-path: draw core plus one-goal edge cluster.

- low_event_draw_cluster：16.0%，0-0 4.9%、1-1 11.1%
- balanced_one_goal_cluster：31.5%，1-0 6.9%、0-1 8.0%、2-1 7.7%、1-2 9.0%
- open_draw_cluster：7.8%，2-2 6.3%、3-3 1.6%
- favorite_edge_cluster：28.3%，0-1 8.0%、1-2 9.0%、0-2 6.5%、1-3 4.9%
- underdog_edge_cluster：19.3%，1-0 6.9%、2-1 7.7%、2-0 4.8%
- volatility_tail_cluster：17.1%，3-2 2.9%、2-3 3.4%、3-1 3.6%、1-3 4.9%、4-2 1.0%、2-4 1.4%

### M79 墨西哥 vs 厄瓜多尔

Top1 caveat：`1-1` is only the central draw slice; publish as dual-path: draw core plus one-goal edge cluster.

- low_event_draw_cluster：19.1%，0-0 6.9%、1-1 12.2%
- balanced_one_goal_cluster：34.8%，1-0 9.9%、0-1 8.5%、2-1 8.8%、1-2 7.6%
- open_draw_cluster：6.6%，2-2 5.5%、3-3 1.1%
- favorite_edge_cluster：30.0%，1-0 9.9%、2-1 8.8%、2-0 7.1%、3-1 4.2%
- underdog_edge_cluster：21.4%，0-1 8.5%、1-2 7.6%、0-2 5.3%
- volatility_tail_cluster：13.9%，3-2 2.6%、2-3 2.3%、3-1 4.2%、1-3 3.1%、4-2 0.9%、2-4 0.7%

### M82 比利时 vs 塞内加尔

Top1 caveat：`1-1` is only the central draw slice; publish as dual-path: draw core plus one-goal edge cluster.

- low_event_draw_cluster：14.6%，0-0 4.2%、1-1 10.5%
- balanced_one_goal_cluster：29.9%，1-0 7.1%、0-1 6.2%、2-1 8.9%、1-2 7.7%
- open_draw_cluster：8.4%，2-2 6.6%、3-3 1.8%
- favorite_edge_cluster：27.0%，1-0 7.1%、2-1 8.9%、2-0 6.0%、3-1 5.0%
- underdog_edge_cluster：18.5%，0-1 6.2%、1-2 7.7%、0-2 4.6%
- volatility_tail_cluster：18.6%，3-2 3.7%、2-3 3.2%、3-1 5.0%、1-3 3.8%、4-2 1.6%、2-4 1.2%

### M83 葡萄牙 vs 克罗地亚

Top1 caveat：`1-1` is a raw-grid artifact despite a clearer 1X2 favorite; headline should use favorite-edge cluster.

- low_event_draw_cluster：18.9%，0-0 7.0%、1-1 11.9%
- balanced_one_goal_cluster：34.5%，1-0 11.1%、0-1 7.6%、2-1 9.4%、1-2 6.4%
- open_draw_cluster：6.1%，2-2 5.1%、3-3 1.0%
- favorite_edge_cluster：34.2%，1-0 11.1%、2-1 9.4%、2-0 8.7%、3-1 5.0%
- underdog_edge_cluster：18.1%，0-1 7.6%、1-2 6.4%、0-2 4.1%
- volatility_tail_cluster：13.4%，3-2 2.7%、2-3 1.8%、3-1 5.0%、1-3 2.3%、4-2 1.1%、2-4 0.5%

### M84 西班牙 vs 奥地利

Top1 caveat：`1-1` is a raw-grid artifact despite a clearer 1X2 favorite; headline should use favorite-edge cluster.

- low_event_draw_cluster：15.5%，0-0 5.1%、1-1 10.3%
- balanced_one_goal_cluster：30.6%，1-0 9.9%、0-1 5.4%、2-1 9.9%、1-2 5.4%
- open_draw_cluster：6.4%，2-2 5.2%、3-3 1.2%
- favorite_edge_cluster：35.6%，1-0 9.9%、2-1 9.9%、2-0 9.5%、3-1 6.4%
- underdog_edge_cluster：13.6%，0-1 5.4%、1-2 5.4%、0-2 2.8%
- volatility_tail_cluster：15.5%，3-2 3.3%、2-3 1.8%、3-1 6.4%、1-3 1.9%、4-2 1.6%、2-4 0.5%

## 算法建议

1. `scoreline_diversity_layer` 只改变展示和比分簇，不改 1X2 概率。
2. 触发场次不要把 `1-1` 当作唯一主比分，应写“双路径”：平局核心 + 一球差/开放比赛簇。
3. Top1 为 `1-1` 但强弱差明显的场次，应标注 raw Poisson grid artifact，并用热门边际簇解释。
4. 后续正式 Markdown 应新增 `scoreline_clusters`、`top1_scoreline_caveat`、`publication_recommendation` 三个展示字段。
