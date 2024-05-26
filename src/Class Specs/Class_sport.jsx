import React from "react";
import { createElement } from "react";
import axios from "axios";
import { isEqual } from "lodash";
class Sport extends React.Component {
  //this depends on the Soccer class and Graphs
  constructor(Graphs_cls) {
    super(Graphs_cls);
    this.Graphs = new Graphs_cls[0](Graphs_cls[1]);
    this.loaded = 0;

    this.sta = { loaded: 0 };

    this.current_regs = null;
    this.formatted_reg = [];

    this.ck_reg = "";
    this.search_tms = "";

    //
    this.search_cty = <></>;

    this.search_tms_ = createElement("input", {
      type: "text",
      className: "inputText cityT",
      onChange: (value_) => {
        this.search_team = value_.target.value;
      },
      onKeyPress: (key_, value = this.search_tms_.props.value) => {
        if (key_.key == "Enter") {
          this.search_team_dot(value);
        }
      },
    });

    //

    this.search_co = this.search_cty.props.value || "";

    this.teams_for_reg = [];
    this.teams_fm = [];

    this.search_team = "";
    this.all_teams_ft = [];

    this.teams_player = [];
    this.teams_py_format = [];

    this.formatted_tm_players = [];

    this.players_spec = [];
    this.load_all();
  }
  async load_all() {
    //this.data_two();
    this.loaded = 0;
    this.search_cty = createElement("input", {
      className: "inputText cityS",
      type: "text",
      onChange: (info) => {
        this.search_co = info.target.value;
        console.log(this.search_co);
      },
    });
    this.search_co = this.search_cty.props.value || "";
    await this.Graphs.Location()
      .then((result) => {
        this.current_regs = result;
        this.format_rgs();
        this.ck_reg = "USA";
        this.countries = this.search_country();
        setTimeout(() => {
          this.sta.loaded = 1;
          console.log(this.sta.loaded);
          console.log("loaded sample");
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
              console.log(id_);
              console.log(this.ck_reg);
              //this.teams_dis();
              //r
            },
          },
          `${data.name}`
        )
      );
      //console.log(this.formatted_reg[loca].props.children);
    });
    console.log(this.formatted_reg);
  }

  search_country() {
    console.log("ssaa");
    console.log(this.search_co);
    let data = this.formatted_reg.map((result) => {
      if (search_pattern(result.props.children, this.search_co)) {
        return result;
      }
    });
    return <>{data}</>;
    /*
    return this.formatted_reg.map((search) => {
      <h1>AA</h1>;
    });
    return (
      <>
        {this.formatted_reg.map((search) => {
          if (search_pattern(search.props.children, this.search_co) == true) {
            <h1>AA</h1>;
          }
        })}
        ,<h2>AR</h2>
      </>
    );
    */
  }

  teams_dis() {
    let data = null;
    if (this.ck_reg != "" || this.search_team != "") {
      if (this.search_team != "") {
        data = this.all_teams_ft.map((result) => {
          if (search_pattern(result.probs.children[0], this.search_tms)) {
            return result;
          }
        });
      } else {
        data = this.teams_for_reg.map((result, loca) => {
          if (result == this.ck_reg) {
            return this.teams_fm[loca];
          }
        });

        if (data == null) {
          data = this.Graphs.Teams_region(this.ck_reg);
          console.log("a");
          data = this.teams_for_reg.push(this.ck_reg);
          //data = //format countries /1/
          this.teams_fm.push(data);
        }
      }
    } else {
      data = (
        <>
          <h2>Search For data, by country or name</h2>
          <p>
            Searhing by name, depends on previouse result to show similar data
            while searching
          </p>
        </>
      );
    }
    console.log("check ttms");
    console.log(data);
    return data;
  }

  search_team_dot(name) {
    //enter
    let data;
    let found = 0;
    //this.Graphs.Team_find(name)
    data = this.all_teams_ft.map((result) => {
      if (result.probs.children == data) {
        found = 1;
        return result;
      }
    });
    if (found == 0) {
      data = this.Graphs.Team_find(name);
      data = this.format_teams(data);
      //  this.all_teams_ft.push this.Graphs.Team_find(name);
    }
    return data;
  }

  format_teams(datas) {
    let info = <></>;
    let data = null;
    info = (
      <>
        {datas.map((result) => {
          data = this.format_team(result);
          this.all_teams_ft.push(data);
          return data;
        })}
      </>
    );
    return info;
  }

  format_team(datas) {
    return createElement("section", { className: "format_team" }, "a");
  }
}

class fetch_cmd {
  constructor() {
    this.loaded = 0;
    this.url = "htp";
    this.sear_ = "search_history";
    this.search_history = JSON.parse(localStorage.getItem(this.sear_)) || [];
    this.datas = "data_history";
    this.data = JSON.parse(localStorage.getItem(this.datas)) || [];
    this.url_base = "";
    this.config = {
      method: "get",
      url: "",
      headers: {
        "x-rapidapi-host": "",
        "x-rapidapi-key": "",
      },
      params: {},
    };
    this.set();
  }

  set() {
    //this.url_base = set
    //this.config.url = set
    //this.config.header["x-rapidapi"] = set
    //this.config.header["x-rapidapi-host"] = set
  }

  async search_query(data_querty) {
    let data = null;
    let take_out = null;
    this.search_history.map((found, location) => {
      console.log("A");
      if (isEqual(found, data_querty)) {
        console.log("Found");
        console.log(this.data[location]);
        data = this.data[location];
        if (data[1] == 0) {
          take_out = location;
        }
      }
    });

    if (take_out != null) {
      this.search_history.pop(take_out);
      this.data.pop(take_out);
      data = null;
    }

    this.loaded = 1;
    //this.config.url = data_querty;
    if (data == null) {
      data = await axios(this.config)
        .then((result) => {
          console.log(result);
          this.search_history.push(data_querty);
          this.data.push([result.data.response, result.data.results]);
          this.loaded = 1;
          localStorage.setItem(this.sear_, JSON.stringify(this.search_history));
          //
          localStorage.setItem(this.datas, JSON.stringify(this.data));
          return [result.data.response, result.data.results];
        })
        .catch((error) => {
          this.search_history.push(data_querty);
          this.data.push(null);
          console.log(error);
          this.loaded = 0;
          return null;
        });
    }
    if (data == null) {
      data = [[], []];
    }
    //localStorage.setItem(this.sear_, await JSON.stringify(await this.search_history));
    //
    //localStorage.setItem(this.datas, await JSON.stringify(await this.data));
    console.log(data);
    console.log("info");
    return await data;
  }

  async countries() {
    this.config.url = `${this.url_base}/countries`;
    this.config.params = {};
    return await this.search_query(this.config);
    return "11";
  }

  async team_py(team_name, season) {
    this.config.url = `${this.url_base}/players`;
    this.config.params = { season: season, team: team_name };
    return await this.search_query(this.config);
    return "15";
  }

  async teams_region(region) {
    this.config.url = `${this.url_base}/teams`;
    this.config.params = { country: region };
    return await this.search_query(this.config);
    return "16";
  }

  async team_find(name_) {
    this.config.url = `${this.url_base}/teams`;
    this.config.params = { name: name_ };
    return await this.search_query(this.config);
    return "16";
  }

  async ply_stat(player_name) {
    this.config.url = `${this.url_base}/player`;
    this.config.params = { name: player_name };
    return await this.search_query(this.config);
    return "Please Wait";
  }
}

class Soccer extends fetch_cmd {
  constructor() {
    super();
    //this.url = "Soccer fetch url";
  }

  set() {
    this.url_base = "https://v3.football.api-sports.io";
    this.config.headers["x-rapidapi-host"] = "v3.football.api-sports.io";
    this.config.headers["x-rapidapi-key"] = "f19c94c79ad405132a51a7935bcba7eb";
    this.config.url = this.url_base;
  }
}

class BasketBall extends fetch_cmd {
  constructor() {
    super();
    //this.url = "Soccer fetch url";
  }

  set() {
    this.url_base = "https://v1.rugby.api-sports.io";
    this.config.headers["x-rapidapi-host"] = "v1.rugby.api-sports.io";
    this.config.headers["x-rapidapi-key"] = "f19c94c79ad405132a51a7935bcba7eb";
    this.config.url = this.url_base;
  }
}

class Graphs extends React.Component {
  constructor(type) {
    super(type);
    this.fetch_cls = new type();
    //more
    this.teams_regions = [];
    this.format_re = [];
    this.saved_teams = [];

    this.single_tm = [];
    this.older_tm = [];

    this.tm_and_pyers = [];
    this.saved_pyer = [];

    this.player = [];
    this.saved_player = [];

    this.locations = null;
    this.locations_loaded = 0;
  }

  form_into_one(data_response) {
    let data = null;
    if (data_response != null) {
      if (data_response[1] > 100) {
        data = [];
        data_response[0].map((result, location) => {
          //console.log(location);
          data.push(result);
          //result.map((info) => {
          //  data.push(info);
          //});
        });
      } else {
        data = data_response[0];
      }
    }
    console.log("lsa");
    console.log(data);
    return data;
  }

  async Location() {
    //done
    if (this.locations_loaded == 0) {
      this.locations = await this.fetch_cls.countries();
      this.locations = this.form_into_one(this.locations);
      if (this.locations) {
        this.locations_loaded = 1;
      } else {
        this.locations_loaded = 0;
      }
    }

    return await this.locations;
  }

  find_loop(find, locations) {
    //done
    locations.map((current_data, locations_ay) => {
      if (current_data == find) {
        return locations_ay;
      }
    });

    return null;
  }

  async Teams_region(Location__) {
    //done
    let found = this.find_loop(Location__, this.teams_regions);
    if (found != null) {
      return this.saved_teams[found];
    }

    found = await this.fetch_cls.teams_region(Location__);
    found = this.form_into_one(found);
    this.teams_regions.push(Location__);
    //found = this.format_teams(found);
    this.saved_teams.push(found);
    return found;
    return "one";
  }

  async Team_find(name) {
    //done
    let found = this.find_loop(name, this.single_tm);
    if (found != null) {
      return this.older_tm;
    }

    found = await this.fetch_cls.team_find(name);
    found = this.form_into_one(found);
    this.single_tm.push(name);
    this.older_tm.push(found);
    return found;
  }

  async Team_players(Name) {
    //done
    let found = this.find_loop(Name, this.tm_and_pyers);
    if (found != null) {
      return this.saved_player;
    }

    found = await this.fetch_cls.team_py(Name, "2022");
    found = this.form_into_one(found);
    this.tm_and_pyers.push(Name);
    this.saved_pyer.push(found);
    return found;
    return "found";
  }

  async Players_stat(Name) {
    //done
    let found = this.find_loop(Name, this.player);
    if (found != null) {
      return found;
    }
    found = await this.fetch_cls.ply_stat(Name);
    found = this.form_into_one(found);
    this.player.push(Name);
    this.saved_player.push(found);

    return found;
    return 15;
  }
}

function search_pattern(search, find) {
  let search_len = search.lenght;
  let find_len = find.lenght;
  let found = 0;
  let info = false;
  for (let c = 0; c < search_len; ) {
    for (found = 0; found < find_len; found += 1) {
      if (search[c + found] != find[found]) {
        found = find_len;
      }
    }
    if (found == find_len - 1) {
      c = search_len;
      info = true;
    } else {
      search_len += 1;
    }
  }

  return info;
}

export default Sport;
export { Soccer, Graphs, BasketBall };
