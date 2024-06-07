import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Sport_vis from "../Class Specs/sport_vis";
import Home from "../Home";

export default function Route_() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Soccer" element={<Sport_vis />} />
      </Routes>
    </>
  );
}
