import React, { useState } from "react";
import uniqid from "uniqid";

import { Field, GameHeader, Chat, GamesScore } from "components";

import "./Game.scss";

const createEmptyField = () => {
  let field = new Array(9).fill(undefined);

  return field.map(item => {
    var temp = Object.assign({}, item);

    temp._id = uniqid();
    temp.isEmpty = true;

    return temp;
  });
};

const Game = () => {
  const [field, setField] = useState(createEmptyField());

  const onItemClick = _id => {
    setField(
      field.map(item => {
        var temp = Object.assign({}, item);

        if (item._id === _id) {
          temp.isEmpty = false;
          temp.player = "1";
          temp.value = "x";
        }

        return temp;
      })
    );
  };

  const date = new Date();

  return (
    <div className="game">
      <div className="game__header">
        <GameHeader
          fstPlayerImg="https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          sndPlayerImg="https://i.pinimg.com/736x/6a/f2/2e/6af22e3a7e5c4972c35500ecba2b7720.jpg"
          score="3:3"
          fstPlayerActive={true}
        />
      </div>
      <div className="game__content">
        <GamesScore
          score={[
            { winner: "1" },
            { winner: "2" },
            { winner: "2" },
            { winner: "1" },
            { winner: "1" },
            { winner: "2" }
          ]}
        />
        <Field field={field} onItemClick={onItemClick} />
        <Chat
          messages={[
            { author: "2", text: "Some text", date: date },
            { author: "1", text: "Some text", date: date },
            { author: "2", text: "Thanks text", date: date },
            { author: "1", text: "S=Nice game", date: date },
            { author: "1", text: "Some text", date: date }
          ]}
        />
      </div>
    </div>
  );
};

export default Game;
