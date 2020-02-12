import React from "react";
import { Route } from "react-router-dom";

import { Auth, Game, Profile } from "pages";
// import { Field } from "./components";

import "./styles/index.scss";

function App() {
  return (
    <div className="wrapper">
      <Route exact path="/game" component={Game} />
      <Route exact path={["/", "/signin", "/signup"]} component={Auth} />
      <Route exact path="/profile" component={Profile} />
    </div>
  );
}

export default App;
