import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./bodystyle/styles.css";
import Nav_ from "./Nav/Nav";
import Route_ from "./Route/Route";

function App() {
  return (
    <>
      <div className="container">
        <div className="NAV">
          <Nav_ />
        </div>
        <div className="ROUTE">
          <Route_ />
        </div>
      </div>
    </>
  );
}

export default App;
