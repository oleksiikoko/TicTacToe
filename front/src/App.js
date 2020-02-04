import React from "react";
import { Route } from "react-router-dom";

import { Game } from "pages";
// import { Field } from "./components";

import "./styles/index.scss";

function App() {
  return (
    <div className="wrapper">
      <Route exact path="/game" component={Game} />
      {/* <Field /> */}
    </div>
  );
}

export default App;
