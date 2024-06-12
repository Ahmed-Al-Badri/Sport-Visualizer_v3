import React from "react";
import { useState, useEffect } from "react";
import WhiteDoD from "./WhiteDoD.jsx";
import "./styles.css";

export default function Runner() {
  useEffect(() => {
    let datas = new WhiteDoD(document.getElementById("Run"));
    datas.start();
  }, []);

  return (
    <div className="backset">
      <canvas width={window.innerWidth} height={window.innerHeight} id="Run" />
    </div>
  );
}
