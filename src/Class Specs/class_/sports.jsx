import React from "react";
import { createElement } from "react";
import axios from "axios";
import { isEqual } from "lodash";

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
      if (isEqual(found, data_querty)) {
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

export { Soccer, BasketBall };
