# L Group Round 2 Recalc Data Collector

status: partial
phase: pre_match_recalc
group: L
created_at: 2026-06-23T17:05:00+08:00
updated_at: 2026-06-23T16:58:30.3851604+08:00
owner: worldcup-data-collector
scope: Pre-match factual refresh only for England vs Ghana and Panama vs Croatia. No score prediction, no WDL call, no betting advice.
betting_gate_status: discussion_only
betting_instruction: hold_for_betting

## Local Read Status

- `data/packets/matches/l-group-round2-data-refresh-20260622.json`: readable; used as prior baseline.
- `data/outputs/player_state/england-player-state.json`: exists, JSON parse status `partial_json_validation_failed`.
- `data/outputs/player_state/ghana-player-state.json`: exists, JSON parse status `partial_json_validation_failed`.
- `data/outputs/player_state/panama-player-state.json`: exists, JSON parse status `partial_json_validation_failed`.
- `data/outputs/player_state/croatia-player-state.json`: exists, JSON parse status `partial_json_validation_failed`.

## Match Facts

### Match 046: England vs Ghana

- kickoff_bjt: `2026-06-24 04:00`
- venue: `Boston Stadium`
- fixture_source_status: `fixture_confirmed_local_plus_user_supplied_refresh`
- weather_note:
  - about `19C`
  - possible rain
  - source_status: `probable_secondary_reporting`
- england_team_news:
  - `Declan Rice` trained and availability signal improved
  - `Bukayo Saka` completed the last two sessions but is expected to be a bench option
  - `Marcus Rashford` and `Anthony Gordon` are competing for the left-side role
  - `Thomas Tuchel` said defensive structure and transition protection must improve after round 1
  - source_status: `probable_reputable_reporting`
- ghana_team_news:
  - goalkeeper `Lawrence Ati-Zigi` has a groin issue from round 1; fitness test to decide
  - `Thomas Partey` available
  - source_status: `probable_reputable_reporting`
- expected_lineup_status:
  - england: `partial`
  - ghana: `partial`
  - note: no official T-75m lineup yet

### Match 047: Panama vs Croatia

- kickoff_bjt: `2026-06-24 07:00`
- venue: `Toronto Stadium`
- fixture_source_status: `fixture_confirmed_local_plus_user_supplied_refresh`
- panama_team_news:
  - no clear confirmed out
  - `Carrasquilla` status `doubtful_or_unknown`
  - source_status: `secondary_reporting`
- croatia_team_news:
  - no clear confirmed out or doubtful list verified in this pass
  - probable backbone includes `Livakovic, Stanisic, Sutalo/Vuskovic, Gvardiol, Modric, Kovacic, Perisic/Kramaric/Musa`
  - source_status: `secondary_reporting`
- expected_lineup_status:
  - panama: `partial`
  - croatia: `partial_probable_backbone`
  - note: media-based probable structure, not official lineup

## China Lottery Same-Source Market Signal

captured_at: `2026-06-23T16:58:30.3851604+08:00`
source_system_time: `2026-06-23 16:53:21`
source_url: <https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini>
page_status_note: `system upgrade / sales pause note visible, but odds still displayed`
source_status: `partial_current_user_supplied_verified_for_entry`

### Match 046: England vs Ghana

- match_code: `Tue046`
- standard_spf: `not_open_for_sale`
- handicap_market: `-2`
- handicap_odds:
  - win: `2.20`
  - draw: `3.80`
  - loss: `2.43`
- reference_euro_odds_on_page: `1.19 / 6.97 / 15.45`
- sale_status_note: `standard SPF not open; handicap market displayed`
- implied_probability_raw:
  - handicap_win: `0.454545`
  - handicap_draw: `0.263158`
  - handicap_loss: `0.411523`
- implied_probability_devig:
  - handicap_win: `0.402528`
  - handicap_draw: `0.233043`
  - handicap_loss: `0.364429`
- overround: `1.129226`
- model_boundary:
  - usable: `china_lottery_handicap_spf_minus2`, `standard_spf_not_open_status`
  - not_usable: `reference euro odds on page are not treated as jingcai SP`

### Match 047: Panama vs Croatia

- match_code: `Tue047`
- standard_spf:
  - home: `6.90`
  - draw: `4.20`
  - away: `1.34`
- handicap_market: `+1`
- handicap_odds:
  - win: `2.65`
  - draw: `3.60`
  - loss: `2.11`
- reference_euro_odds_on_page: `6.58 / 4.30 / 1.49`
- sale_status_note: `open`
- standard_implied_probability_raw:
  - home: `0.144928`
  - draw: `0.238095`
  - away: `0.746269`
- standard_implied_probability_devig:
  - home: `0.128335`
  - draw: `0.210836`
  - away: `0.660829`
- handicap_implied_probability_raw:
  - win: `0.377358`
  - draw: `0.277778`
  - loss: `0.473934`
- handicap_implied_probability_devig:
  - win: `0.334221`
  - draw: `0.246024`
  - loss: `0.419756`
- standard_overround: `1.129291`
- handicap_overround: `1.129070`
- model_boundary:
  - usable: `china_lottery_standard_spf`, `china_lottery_handicap_spf_plus1`
  - not_usable: `reference euro odds on page are not treated as jingcai SP`

## Model-Usable Fields

- `fixture_datetime_bjt`
- `venue`
- `market_snapshot_china_jingcai_same_source`
- `market_unopened_status`
- `implied_probability_raw`
- `implied_probability_devig`
- `weather_note_probable`
- `training_availability_flags`
- `goalkeeper_fitness_watch`
- `expected_starter_uncertainty`
- `player_state_json_parse_status`
- `discussion_only`
- `hold_for_betting`

## Gaps

- `official_t75_lineups`: not available yet for either match
- `full_england_probable_xi`: only partial position battle info available
- `ati_zigi_final_status`: fitness test pending
- `carrasquilla_final_status`: only `doubtful_or_unknown` available
- `croatia_official_injury_bulletin`: no confirmed official out/doubtful list captured in this pass
- `four_player_state_json_files`: machine parse failed; needs encoding or syntax remediation before structured reuse

## Sources

- China Lottery mirror page: <https://cp.zgzcw.com/lottery/jchtplayvsForJsp.action?lotteryId=47&type=jcmini>
  - source_system_time: `2026-06-23 16:53:21`
  - captured_at: `2026-06-23T16:58:30.3851604+08:00`
- Guardian England team news: user-supplied 2026-06-23 factual summary
  - captured_at: `2026-06-23T16:58:30.3851604+08:00`
- NST / Reuters Ghana team news: user-supplied factual summary
  - captured_at: `2026-06-23T16:58:30.3851604+08:00`
- Sports Mole / Goal Panama and Croatia team news: user-supplied factual summary
  - captured_at: `2026-06-23T16:58:30.3851604+08:00`
- Local baseline packet: `data/packets/matches/l-group-round2-data-refresh-20260622.json`
  - captured_at: `2026-06-23T16:58:30.3851604+08:00`

## Boundary

- output_mode: `discussion_only`
- betting_mode: `hold_for_betting`
- reason: official lineups not released, four local player_state JSON files are not machine-parseable, and some injury availability remains pending

<!-- l-group-round2-cp-jc-20260623:start -->
## L组第二轮事实与体彩赔率补充 2026-06-23
## 体彩同源赔率复核
- 来源：中国足彩网竞彩混合页，source systemTime=2026-06-23 16:53:21，本地整合时间=2026-06-23T17:55:00+08:00。
- 页面提示系统升级/暂停销售；因此只作为预测校准，不发布正式购彩单。
- 周二046 英格兰 vs 加纳：普通胜平负未开售；让球胜平负 -2 为 2.20/3.80/2.43，去水位约 40.25%/23.31%/36.44%。
- 周二047 巴拿马 vs 克罗地亚：普通胜平负 6.90/4.20/1.34，去水位约 12.83%/21.08%/66.09%；让球胜平负 +1 为 2.65/3.60/2.11，去水位约 33.42%/24.60%/41.97%。
- 新浪核验：当前未取得稳定结构化单场竞彩SP；不补写无法抓到的赔率。
- 红队边界：discussion_only / hold_for_betting，不能给正式投注单。

## 队情快照
- 英格兰：Tuchel强调防守结构和夺回球权后的处理；Rice已训练，Saka完整训练但仍有负荷管理，右路可能继续Madueke。
- 加纳：Ati-Zigi腹股沟伤待赛前体检；Partey可出战。
- 巴拿马：未列明确out，Carrasquilla doubtful/unknown。
- 克罗地亚：当前未列out/doubtful，预计仍以Livakovic、Gvardiol、Modric、Kovacic等核心框架出战。

## 入模边界
- 周二046普通SPF未开售，只允许用让球-2作为深盘分歧信号。
- 周二047普通SPF可入胜平负校准，但+1让球必须用于限制穿盘自信。
- 发布限制：discussion_only / hold_for_betting。
<!-- l-group-round2-cp-jc-20260623:end -->
