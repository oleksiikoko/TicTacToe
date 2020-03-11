import React from "react";
import { Route, Switch } from "react-router-dom";

import { Auth, Profile, StartGame, Match } from "pages";

import { userActions } from "redux/actions";
import store from "redux/store";

import "./styles/index.scss";

function App() {
  store.dispatch(userActions.fetchUserData());

  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={["/", "/signin", "/signup"]} component={Auth} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/startgame" component={StartGame} />
        <Route exact path="/match/:match_id" component={Match} />
      </Switch>
    </div>
  );
}

export default App;
