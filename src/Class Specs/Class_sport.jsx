import React from "react";
import { createElement } from "react";
import axios from "axios";
import { isEqual } from "lodash";
import { Soccer, BasketBall } from "./class_/sports";
import Graphs from "./class_/graphs";

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
    console.log(datas);
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
    console.log(this.teams_player);
    let found = -1;

    this.teams_player[0].map((result, key_) => {
      if (result == `${this.Select_team}${this.year}`) {
        found = key_;
      }
    });

    if (found != -1) {
      let count = this.teams_player[1][found].length;
      console.log("s");
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
    return createElement("img", {
      alt: player.player.name,
      src: player.player.photo,
      className: "formatPlayer",
      onClick: (result, id_s = player.player.id) => {
        console.log(id_s + "for " + player.player.name);
        //result for other.
      },
    });
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
