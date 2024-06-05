import React from "react";
import "./styles.css";
import "./Player/player.css";
import "./grid/grid.css";
import "./grid/main.css";
import { createElement } from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "../loading";

import Sport from "./Class_sport";
import { Soccer, BasketBall } from "./class_/sports";
import Graphs from "./class_/graphs";

function set_data() {
  let info = new BasketBall();
  let data = new Graphs(info);
  let spt = new Sport(data);
  return spt;
  //return new Sport(new Graphs(new BasketBall()));
}

export default function Sport_vis() {
  const [loading, loading_set] = useState(0);
  const [Sport_, Sport_one] = useState(new Sport([Graphs, Soccer]));
  const [Co_s, Co_s_set] = useState(0);

  let Countries = Sport_.search_country();
  let Teams = Sport_.Teams_search();
  let Players = Sport_.Players();
  let Player_Stat = Sport_.display_ply();
  useEffect(() => {
    Sport_.search_co_event = Co_s_set;
    Sport_.s_c_e = true;
    Countries = Sport_.search_country();
    Teams = Sport_.Teams_search();
    loading_set(1);
  }, []);

  useEffect(() => {
    Co_s_set(0);
    Countries = Sport_.search_country();
    console.log("AC):");
  }, [Sport_.search_co]);

  useEffect(() => {
    Co_s_set(0);
    console.log("AS");
    Teams = Sport_.Teams_search();
  }, [Sport_.tm_ld]);

  useEffect(() => {
    Co_s_set(0);
    Players = Sport_.Players();
  }, [Sport_.Select_team]);

  useEffect(() => {
    Co_s_set(0);
    Player_Stat = Sport_.display_ply();
  }, [Sport_.check_player]);

  if (loading != 0) {
    return (
      <>
        <div className="Sport">
          <div className="Graphs">{Player_Stat}</div>
          <div className="Players">
            <p className="title">Players</p>
            <div className="playersdis">{Players}</div>
          </div>
          <div className="Searches">
            <div>
              <p className="title">Countries</p>
              {Sport_.search_cty}

              <div className="regions">{Countries}</div>
            </div>
            <p className="title">Teams</p>
            {Sport_.search_tms_}
            <div className="teams">{Teams}</div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <h1>ww</h1>
    </>
  );
}

// <div className="regions">{Sport_.search_country()}</div>
//{Sport_.teams_dis()} <h2>Found</h2>
