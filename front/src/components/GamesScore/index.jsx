import React from "react";
import classNames from "classnames";

import "./GamesScore.scss";

const GamesScore = ({ score }) => {
  return (
    <div className="games-score">
      {score.map((item, index) => (
        <p
          // key={item._id}
          className={classNames({
            "win-result": item.winner === "1",
            "lose-result": item.winner === "2"
          })}
        >
          Game {index + 1} : {item.winner === "1" ? "win" : "lose"}
        </p>
      ))}
    </div>
  );
};

export default GamesScore;
