import React, { useState } from "react";
import uniqid from "uniqid";

import {
  //  Field, GameHeader,
  Message
} from "components";

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

  return (
    <div>
      <Message isMe={true} />
      <Message isMe={false} />
    </div>
    // <GameHeader
    //   fstPlayerImg="https://lh3.googleusercontent.com/proxy/Pj5Llx4SrLiT-QKD26eF1B04ma4FBAtU1Qfk42UnJzLQeUiSUD8v0fB91XSlmymdcNHTukBYyk83pkrn6NrCYSKQzGF2uglyfgUxHDw3h0gKfiiPO5RqIqlJpbPgQ6WKfEFGzVmHjFxuqQomnOG5MGu_HXf37-WieYQXtPx8VoqWM7iX"
    //   sndPlayerImg="https://i.pinimg.com/736x/6a/f2/2e/6af22e3a7e5c4972c35500ecba2b7720.jpg"
    //   score="3:3"
    //   fstPlayerActive={true}
    // />
    // <Field field={field} onItemClick={onItemClick} />
  );
};

export default Game;
