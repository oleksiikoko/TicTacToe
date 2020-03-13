import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import store from "redux/store";
import socket from "core/socket";
import { matchActions } from "redux/actions";
import matchApi from "utils/api/match";

import Button from "@material-ui/core/Button";

import "./StartGame.scss";

const StartGame = ({ user_id }) => {
  const history = useHistory();

  const handleSubmit = () => {
    matchApi.initMatch({ user_id: user_id });
  };

  const matchBuilded = match => {
    if (match.users.includes(store.getState().user.data._id)) {
      store.dispatch(matchActions.fetchMatch({ match_id: match._id }));

      history.push(`/match/${match._id}`);
    }
  };

  useEffect(() => {
    socket.on("SERVER:MATCH_BUILDED", matchBuilded);
  }, []);

  return (
    <div className="start-game">
      <div className="start-game__rules">
        <h2>Game rules</h2>
        <p>
          The game lasts up to three points. Each match has a different side. A
          draw does not give points to anyone, but remains in profile. If within
          30 seconds the enemy is not found, there will be a game with a bot.
          Good luck!
        </p>
      </div>
      <Button
        onClick={handleSubmit}
        className="submit-btn"
        variant="contained"
        color="primary"
      >
        Play!
      </Button>
    </div>
  );
};

export default connect(({ user }) => ({
  user_id: user.data._id
}))(StartGame);
