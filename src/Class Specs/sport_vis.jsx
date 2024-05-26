import React from "react";
import "./styles.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "../loading";

import Sport from "./Class_sport";
import { Graphs, BasketBall, Soccer } from "./Class_sport";

function set_data() {
  let info = new BasketBall();
  let data = new Graphs(info);
  let spt = new Sport(data);
  return spt;
  //return new Sport(new Graphs(new BasketBall()));
}

export default function Sport_vis() {
  const [loading, loading_set] = useState(0);
  const [Sport_, Sport_one] = useState(new Sport([Graphs, BasketBall]));
  useEffect(() => {
    loading_set(1);
  }, []);

  if (loading != 0) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-10"></div>
            <div className="col-2">
              <div>
                {Sport_.search_cty}
                {Sport_.sta.loaded == 1 ? (
                  <div className="regions">{Sport_.search_country()}</div>
                ) : (
                  <p>Loading</p>
                )}
              </div>
              <div>{Sport_.teams_dis()}</div>
            </div>
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
