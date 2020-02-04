import React, { useState } from "react";
import uniqid from "uniqid";

import { Field } from "components";

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

  return <Field field={field} onItemClick={onItemClick} />;
};

export default Game;
