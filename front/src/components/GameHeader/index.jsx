import React from "react";
import classNames from "classnames";

import "./GameHeader.scss";

const GameHeader = ({ fstPlayerImg, sndPlayerImg, fstPlayerActive, score }) => {
  return (
    <div className="game-header">
      <div className="game-header__cnt">
        <div
          className={classNames("game-header__cnt--img", {
            "game-header__cnt--img-active-green": fstPlayerActive
          })}
        >
          <img src={fstPlayerImg} alt="" />
        </div>
        <div className="game-header__cnt--score">
          <p>{score}</p>
        </div>
        <div
          className={classNames("game-header__cnt--img", {
            "game-header__cnt--img-active-red": !fstPlayerActive
          })}
        >
          <img src={sndPlayerImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
