import React from "react";
import "./styles.css";
import "./Player/player.css";
import "./grid/grid.css";
import "./grid/main.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Sport from "./Class_sport";
import { Soccer } from "./class_/sports";
import Graphs from "./class_/graphs";

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
    Sport_.search_co_event(1 + "aa");
    loading_set(1);
  }, []);

  useEffect(() => {
    Co_s_set(0);
    Countries = Sport_.search_country();
  }, [Sport_.search_co]);

  useEffect(() => {
    Co_s_set(0);
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
        <h1 className="title">Soccer Players</h1>
        <div className="Sport">
          <div className="Graphs">{Player_Stat}</div>
          <div className="Players">
            <p className="title">Players</p>
            <div className="playersdis">{Players}</div>
          </div>
          <div className="Searches">
            <div>
              {Sport_.search_cty}
              <div className="regions">{Countries}</div>
            </div>
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
