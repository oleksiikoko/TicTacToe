import React, { useState } from "react";
import format from "date-fns/format";
import classNames from "classnames";

import { Field } from "../";

const field = [
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" },
  { isEmpty: false, player: "1", value: "x" }
];

const GameInfo = ({ games }) => {
  const [showGameItemIndex, setShowGameItemIndex] = useState([]);

  const onGameItemClick = index => {
    if (!showGameItemIndex.includes(index)) {
      setShowGameItemIndex([...showGameItemIndex, index]);
    } else {
      setShowGameItemIndex(showGameItemIndex.filter(item => item !== index));
    }
  };

  return games.map((item, index) => (
    <div
      key={index}
      className={classNames("profile__games-game", {
        "profile__games-game-win": item.myScore > item.enemyScore,
        "profile__games-game-lose": item.myScore < item.enemyScore
      })}
      onClick={() => onGameItemClick(index)}
    >
      <div className="profile__games-game--short-info">
        <p>Enemy name: {item.enemyName}</p>
        <p>
          {item.myScore} : {item.enemyScore}
        </p>
        <p>{format(item.date, "dd/MM/yyyy")}</p>
      </div>
      {showGameItemIndex.includes(index) && (
        <div className="profile__games-game--info">
          <Field field={field} />
          <Field field={field} />
          <Field field={field} />
          <Field field={field} />
          <Field field={field} />
        </div>
      )}
    </div>
  ));
};

export default GameInfo;
