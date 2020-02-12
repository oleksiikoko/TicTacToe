import React from "react";

const GameInfo = ({ games }) => {
  return games.map(item => (
    <div className="profile__games-game">
      <p>Enemy name: {item.enemyName}</p>
    </div>
  ));
};

export default GameInfo;
