import React from "react";
import { createElement } from "react";
import { Chart as chartjs, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

chartjs.register(ArcElement, Tooltip, Legend, Title);
//import { DonutCenter } from "@progress/kendo-react-charts";

import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import { element } from "prop-types";
import { alignPropType } from "react-bootstrap/esm/types";

class Sport extends React.Component {
  //this depends on the Soccer class and Graphs
  constructor(Graphs_cls) {
    super(Graphs_cls);
    this.Graphs = new Graphs_cls[0](Graphs_cls[1]);
    this.loaded = 0;

    this.current_regs = null;
    this.formatted_reg = [];

    this.ck_reg = "";
    this.search_tms = "";

    //
    this.s_c_e = false;
    this.search_co_event = null;
    this.search_cty = createElement("input", {
      className: "inputText cityS",
      type: "text",
      onChange: (info) => {
        this.search_co = info.target.value;
        this.search_co_event(this.search_co);
      },
    });

    this.search_tms_ = createElement("input", {
      type: "text",
      className: "inputText cityT",
      onChange: (value_) => {
        this.tm_ld = value_.target.value;
        this.search_tms = this.tm_ld;
        this.search_co_event(this.tm_ld);
      },
      onKeyPress: (key_) => {
        if (key_.key == "Enter") {
          this.search_team_dot(this.search_tms);
          this.search_co_event(1);
        }
      },
    });

    this.search_yr = createElement("input", {
      type: "number",
      min: 2015,
      max: 2023,
      className: "inputText year",
      onKeyPress: (wanted_year) => {
        if (wanted_year.key == "Enter") {
          console.log(this.search_yr.props.value);
          this.year = `${this.search_yr.props.value}`;
          this.get_players(this.Select_team);
        }
      },
    });

    //

    this.search_co = this.search_cty.props.value || "";

    this.countries_searched = [];
    this.teams_for_reg = [];
    this.teams_fm = [];

    this.tm_save = <></>;
    this.tm_ld = "";
    this.search_team = "";
    this.all_teams_ft = [];

    this.year = "2022";
    this.Select_team = "";
    this.teams_player = [[], []];
    this.teams_py_format = [];

    this.formatted_tm_players = [];

    this.players_spec = [];

    ////
    this.player_stat = [[], []];

    ////
    this.player_main = [[], []];
    this.check_player = "";

    this.load_all();
  }
  async load_all() {
    //this.data_two();
    this.loaded = 0;

    this.search_co = this.search_cty.props.value || "";
    await this.Graphs.Location()
      .then((result) => {
        this.current_regs = result;
        this.format_rgs();
        this.ck_reg = "USA";
        this.Teams_region(this.ck_reg);
        //this.tm_ld = 'USA';
        //this.Team_dis();
        //this.countries = this.search_country();
        //this.tm_save = this.teams_dis();
        setTimeout(() => {
          this.loaded = 1;
        }, 100);
      })
      .catch((error) => {
        //this.loaded = 0;
        console.log(error);
      });
  }

  format_rgs() {
    this.current_regs.map((data, loca) => {
      this.formatted_reg.push(
        createElement(
          "div",
          {
            className: "region",
            style: { backgroundImage: `url('${data.flag}')` },
            onClick: (result, id_ = data.name) => {
              this.ck_reg = id_;
              this.Teams_region(id_);
            },
          },
          `${data.name}`
        )
      );
      //console.log(this.formatted_reg[loca].props.children);
    });
  }

  search_country() {
    //return createElement("h2", {}, "ABS");
    //return this.formatted_reg[0];
    return (
      <>
        {" "}
        {this.formatted_reg.map((result) => {
          if (
            search_pattern(result.props.children, this.search_co) ||
            this.search_co == ""
          ) {
            return result;
          }
        })}{" "}
      </>
    );
  }
  Teams_search() {
    return (
      <>
        {this.all_teams_ft.map((result) => {
          if (
            search_pattern(result.props.children, this.search_tms) == true ||
            this.search_tms == ""
          ) {
            return result;
          }
        })}
      </>
    );
  }

  Teams_region(search) {
    let found = false;
    this.countries_searched.map((result, loca) => {
      if (result == search) {
        found = true;
      }
    });

    if (found == false) {
      //
      this.Graphs.Teams_region(search).then((results) => {
        this.format_teams(results);
        this.tm_ld = search;

        if (this.s_c_e) {
          this.search_co_event(search);
        }
      }); //
    }
  }

  async search_team_dot(name) {
    //enter
    let data = null;
    let found = false;
    //this.Graphs.Team_find(name)
    this.all_teams_ft.map((result) => {
      if (result.props.children == name) {
        found = true;
      }
    });
    if (found == false) {
      data = await this.Graphs.Team_find(name);
      this.format_teams(data);
      this.tm_ld = "ffs" + name;
      this.search_co_event(this.tm_ld);
      //  this.all_teams_ft.push this.Graphs.Team_find(name);
    }
  }

  format_teams(datas) {
    let info = <></>;
    let data = null;

    info = (
      <>
        {datas.map((result) => {
          data = this.format_team(result);
          return data;
        })}
      </>
    );
    return info;
  }

  format_team(datas) {
    //console.log(datas);
    let data = createElement(
      "div",
      {
        className: "formatTeam",
        onClick: (result, ids = datas.team.id) => {
          this.Select_team = ids;
          this.get_players(ids);
        },
        style: { backgroundImage: `url(${datas.team.logo})` },
      },
      `${datas.team.name}`
    );
    this.all_teams_ft.push(data);
    return data;
  }
  //teams and countries

  Players() {
    //console.log(this.teams_player);
    let found = -1;

    this.teams_player[0].map((result, key_) => {
      if (result == `${this.Select_team}${this.year}`) {
        found = key_;
      }
    });

    if (found != -1) {
      let count = this.teams_player[1][found].length;
      //console.log("s");
      return (
        <>
          {this.teams_player[1][found].map((result, value_) => {
            return (
              <div
                className="data"
                style={{
                  position: "relative",
                  left: `${-30 * value_}px`,
                  zIndex: count - value_,
                }}
              >
                {result}
              </div>
            );
          })}
        </>
      );
    }

    return <></>;
  }

  get_players(name) {
    let data = null;
    let found = false;
    this.teams_player[0].map((result) => {
      if (result == `${name}${this.year}`) {
        found = true;
      }
    });

    if (found == false) {
      this.Graphs.Team_players(name, this.year).then((result) => {
        //console.log(result);
        this.teams_player[0].push(`${name}${this.year}`);
        data = this.format_players(result);
        this.teams_player[1].push(data);
        this.Select_team = `${name}`;
        this.set_co(this.Select_team);
        console.log("done");
      });
    } else {
      if (this.s_c_e == true) {
        this.search_co_event(name);
      }
    }
  }

  set_co(value) {
    if (this.s_c_e == true) {
      this.search_co_event(value);
    }
  }

  format_players(players) {
    let data = [];
    players.map((info) => {
      data.push(this.format_player(info));
    });

    return data;
  }

  format_player(player) {
    this.player_main[0].push(player.player.id);
    let info = this.get_static(player);
    console.log(info);
    this.player_main[1].push(info);

    return createElement("img", {
      alt: player.player.name,
      src: player.player.photo,
      className: "formatPlayer",
      onClick: (result, id_s = player.player.id) => {
        console.log(id_s + "for " + player.player.name);
        this.get_static_p(id_s);
        //result for other.
      },
    });
  }

  get_static_p(name) {
    this.check_player = name;
    if (this.s_c_e == true) {
      this.search_co_event(name);
    }
  }

  display_ply() {
    let data = null;
    this.player_main[0].map((name, val) => {
      if (this.check_player == name) {
        console.log("found");
        data = this.player_main[1][val];
      }
    });
    console.log(data);
    return data;
    return <>AA</>;
  }

  get_static(player) {
    //return <h2>aa</h2>;
    let stat = player.statistics[0];
    //console.log(stat);
    let data = createElement(
      "div",
      { className: "MainData" },
      this.player_portfo(player),
      this.create_graph(
        [stat.substitutes.in, stat.substitutes.out, stat.substitutes.bench],
        ["In", "Out", "Bench"],
        "Substitutes"
      ),
      this.create_graph(
        [stat.shots.on, stat.shots.total - stat.shots.on],
        ["Scored", "Mis-Score"],
        "Goals Shot"
      ),
      this.create_graph(
        [
          stat.passes.key,
          stat.passes.accuracy,
          stat.passes.total - (stat.passes.key + stat.passes.accuracy),
        ],
        ["Key passes", "Accuracy", "Others"],
        "Passes"
      ),
      this.create_graph(
        [stat.duels.won, stat.duels.total - stat.duels.won],
        ["Won", "Lost/Or Etc"],
        "Duels"
      )
    );
    return data;
  }

  player_portfo(player) {
    return (
      <>
        <div className="InnerData PlayerCard">
          <h2> {player.player.name}</h2>
        </div>
      </>
    );
  }

  create_graph(vals, labels, name) {
    let names = this.format_name(name);
    console.log(vals);
    console.log(labels);
    let colors = ["#ff2211", "#111144", "#22aa11", "#aabbss"];

    labels.map((result, vals) => {
      colors.push(`#ff${vals + 2}${vals + 1}${vals + 1}${vals - 2}`);
    });

    let datas = {
      labels: labels,
      datasets: [
        {
          data: vals,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
      text: names,
    };

    let options = {
      legend: {
        display: false,
      },
      plugins: {
        title: {
          display: true,
          text: name,
          align: "center",
          padding: {
            top: "2px",
            bottom: "2px",
          },
        },
      },
    };
    return (
      <div className="InnerData">
        <Doughnut data={datas} options={options} />
      </div>
    );
    return <Doughnut data={datas} options={options} />;
    return <></>;

    //return createElement(Chart, { donutCenterRender: names }, "a");
    /*
    let data = createElement(
      "div",
      { className: "InnerData" },
      <>
        <Chart donutCenterRender={names}>
          <ChartSeries>
            <ChartSeriesItem
              type="donut"
              data={vals}
              categoryField="kind"
              field="share"
            />
            <ChartSeriesLabels
              color="#acb"
              background="none"
              content={labels}
            />
          </ChartSeries>
          <ChartLegend visible={true} />
        </Chart>
      </>
    );
    */
    /*
    return data;
    return <></>;
    */
  }

  format_name(name) {
    return <p className="formatname">name</p>;
  }
}

function search_pattern(search, find) {
  let search_len = search.length;
  let find_len = find.length;
  let found = 0;
  let info = false;
  for (let c = 0; c < search_len; ) {
    for (found = 0; found < find_len; found += 1) {
      if (search[c + found] != find[found]) {
        found = find_len;
      }
    }
    if (found == find_len) {
      c = search_len;
      info = true;
    } else {
      c += 1;
    }
  }

  return info;
}

export default Sport;

//export { Soccer, Graphs, BasketBall };
