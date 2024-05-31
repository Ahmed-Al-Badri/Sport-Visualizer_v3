import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Sport from "../Class Specs/Class_sport";
import Sport_vis from "../Class Specs/sport_vis";
import Home from "../Home";
import Loading from "../loading";

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
