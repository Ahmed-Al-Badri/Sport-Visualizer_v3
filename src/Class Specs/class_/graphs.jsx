import React from "react";
import { createElement } from "react";
import axios from "axios";
import { isEqual } from "lodash";

import { Soccer, BasketBall } from "./sports";

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

  async Team_players(Name, year = "2022") {
    //done
    let found = this.find_loop(Name, this.tm_and_pyers);
    if (found != null) {
      return this.saved_player;
    }

    found = await this.fetch_cls.team_py(Name, year);
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

export default Graphs;
