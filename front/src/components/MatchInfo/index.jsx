import React, { useState } from "react";
import format from "date-fns/format";
import classNames from "classnames";

import { Field } from "..";

import parseISOString from "../../utils/parseISOString";

// const field = [
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" },
//   { isEmpty: false, player: "1", value: "x" }
// ];

const MatchInfo = ({ matches, owner_id }) => {
  console.log("matches :", matches);
  const [showGameItemIndex, setShowGameItemIndex] = useState([]);

  const onGameItemClick = index => {
    if (!showGameItemIndex.includes(index)) {
      setShowGameItemIndex([...showGameItemIndex, index]);
    } else {
      setShowGameItemIndex(showGameItemIndex.filter(item => item !== index));
    }
  };

  const result = matches.map(match => {
    if (match.games === undefined) return {};

    const enemy = match.users.find(el => {
      return el._id !== owner_id;
    });
    if (enemy === undefined) return {};

    const myScore = match.games.filter(game => game.winner === owner_id).length;
    const enemyScore = match.games.filter(game => game.winner === enemy._id)
      .length;
    return {
      users: match.users,
      enemy: enemy,
      myScore: myScore,
      enemyScore: enemyScore,
      games: match.games,
      date: match.date
    };
  });

  return (
    result &&
    result.map((item, index) => {
      if (item === undefined) return {};
      return (
        <div
          key={index}
          className={classNames("profile__games-game", {
            "profile__games-game-win": item.myScore > item.enemyScore,
            "profile__games-game-lose": item.myScore < item.enemyScore
          })}
          onClick={() => onGameItemClick(index)}
        >
          <div className="profile__games-game--short-info">
            <p>
              {item.enemy.first_name} {item.enemy.last_name} @
              {item.enemy.username}
            </p>
            <p>
              {item.myScore} : {item.enemyScore}
            </p>
            <p>
              {item.date &&
                format(parseISOString(item.date.toString()), "dd/MM/yyyy")}
            </p>
          </div>
          {showGameItemIndex.includes(index) && (
            <div className="profile__games-game--info">
              {item.games.map((game, index) => {
                return <Field key={index} field={game.field} />;
              })}
            </div>
          )}
        </div>
      );
    })
  );
};

export default MatchInfo;
