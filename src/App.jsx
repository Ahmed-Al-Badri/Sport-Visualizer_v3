import React from "react";
import { configDotenv } from "dotenv";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./bodystyle/styles.css";
import Nav_ from "./Nav/Nav";
import Route_ from "./Route/Route";

function App() {
  return (
    <>
      <div className="container">
        <div className="row NAV">
          <Nav_ />
        </div>
        <div className="row ROUTE">
          <Route_ />
        </div>
      </div>
    </>
  );
}

export default App;
