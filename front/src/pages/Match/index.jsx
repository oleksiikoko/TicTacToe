import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { matchApi } from "utils/api";
import { matchActions } from "redux/actions";
import store from "redux/store";
import socket from "core/socket";

import { Field, GameHeader, Chat, GamesScore } from "components";

import Button from "@material-ui/core/Button";

let mapStateToProps = ({ match }) => {
  return {
    curMatch: match.match
  };
};

const Match = ({ match, curMatch, fetchMatch }) => {
  const [curGame, setCurGame] = useState(null);
  const [myState, setMyState] = useState(null);

  const [myScore, setMyScore] = useState(0);
  const [matchScore, setMatchScore] = useState(null);
  const [enemyScore, setEnemyScore] = useState(0);
  const [activeUser, setActiveUser] = useState(false);
  const [enemyId, setEnemyId] = useState("");

  const user_id = store.getState().user.data._id;

  const gameParse = game => {
    if (game) {
      const user = game.users.find(user => {
        return user.user === user_id;
      });
      if (user) {
        setMyState(user.user_type);
        setActiveUser(actionAllowed(game));
      }

      let gameRes = game;
      gameRes.field = game.field.map(item => {
        return { ...item, isMe: item.state === myState };
      });
      return gameRes;
    }
    return undefined;
  };

  const actionAllowed = game => {
    const state_o = game.field.filter(item => item.state === "o").length;
    const state_x = game.field.filter(item => item.state === "x").length;
    console.log("field :", game.field);

    console.log("state_o :", state_o);
    console.log("state_x :", state_x);

    if (state_o === state_x && myState === "x") return true;
    if (state_o === state_x - 1 && myState === "o") return true;
    return false;
  };

  useEffect(() => {
    if (curMatch) {
      const eId = curMatch.users.filter(user => {
        console.log("user :", user);
        return user !== user_id;
      });
      setEnemyId(eId[0]);
      console.log("enemyId :", eId[0]);

      let game = curMatch.games[curMatch.games.length - 1];
      setCurGame(gameParse(game));

      setMyScore(
        curMatch.games.filter(
          game => game.finished === true && game.winner === user_id
        ).length
      );
      setEnemyScore(
        curMatch.games.filter(
          game => game.finished === true && game.winner === enemyId
        ).length
      );

      const temp = curMatch.games.map(item => {
        if (item.winner === undefined) return undefined;
        if (item.winner === user_id) {
          return { winner: "1" };
        } else if (item.winner === enemyId) {
          return { winner: "2" };
        } else {
          return { winner: "3" };
        }
      });

      setMatchScore(temp);
    }
  }, [curMatch]);

  const checkField = _id => {
    const item = curGame.field.find(item => item._id === _id);
    if (item.state !== undefined) return false;

    return actionAllowed(curGame);
  };

  const onItemClick = _id => {
    if (checkField(_id)) {
      const item = curGame.field.find(item => item._id === _id);
      const position = curGame.field.indexOf(item);

      const solution = {
        x: position % 3,
        y: Math.trunc(position / 3),
        state: myState
      };
      matchApi
        .gameAction({ match_id: curMatch._id }, curGame._id, solution)
        .then(res => {
          console.log("res :", res);
        });
    }
  };

  const gameUpdate = game => {
    let curMatchUpdate = store.getState().match.match;
    curMatchUpdate.games = curMatchUpdate.games.map(gameItem => {
      if (gameItem._id === game._id) return game;
      return gameItem;
    });
    fetchMatch({ match_id: store.getState().match.match._id });
  };
  const nextGame = () => {
    fetchMatch({ match_id: store.getState().match.match._id });
  };

  const gameFinished = game => {
    setCurGame(gameParse(game));
    setMyState(myState);
  };

  useEffect(() => {
    store.dispatch(
      matchActions.fetchMatch({ match_id: match.params.match_id })
    );

    socket.on("MATCH:GAME_UPDATE", gameUpdate);
    socket.on("MATCH:GAME_FINISHED", gameFinished);
  }, []);

  return (
    curGame &&
    (curMatch.finished ? (
      <Redirect to={`/profile/${user_id}`} />
    ) : (
      <div className="game">
        <div className="game__header">
          <GameHeader
            fstPlayerImg="https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            sndPlayerImg="https://i.pinimg.com/736x/6a/f2/2e/6af22e3a7e5c4972c35500ecba2b7720.jpg"
            score={myScore + ":" + enemyScore}
            fstPlayerActive={activeUser}
          />
        </div>
        <div className="game__content">
          <GamesScore score={matchScore} />
          <Field field={curGame.field} onItemClick={onItemClick} />
          {curGame && curGame.finished && (
            <Button
              onClick={nextGame}
              className="submit-btn"
              variant="contained"
              color="primary"
            >
              Play!
            </Button>
          )}
        </div>
      </div>
    ))
  );
};

export default connect(mapStateToProps, matchActions)(Match);
