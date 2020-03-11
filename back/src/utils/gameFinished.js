module.exports = gameFinished = field => {
  const multiField = [field.slice(0, 3), field.slice(3, 6), field.slice(6, 9)];
  /* 
  x . .
  x . .
  x . .
  */
  for (let i = 0; i < 3; i++) {
    let state;
    if (multiField[0][i].isEmpty) {
      continue;
    } else {
      state = multiField[0][i].state;
    }

    for (let j = 1; j < 3; j++) {
      if (multiField[j][i].isEmpty) {
        break;
      } else {
        if (multiField[j][i].state !== state) {
          break;
        }
      }
      if (j === 2) return { result: true, state: state };
    }
  }
  /* 
  x x x
  . . .
  . . .
  */
  for (let i = 0; i < 3; i++) {
    let state;
    if (multiField[i][0].isEmpty) {
      continue;
    } else {
      state = multiField[i][0].state;
    }

    for (let j = 1; j < 3; j++) {
      if (multiField[i][j].isEmpty) {
        break;
      } else {
        if (multiField[i][j].state !== state) {
          break;
        }
      }
      if (j === 2) return { result: true, state: state };
    }
  }
  /* 
  x . .
  . x .
  . . x
  */
  if (!multiField[0][0].isEmpty) {
    for (let i = 1; i < 3; i++) {
      if (multiField[i][i].state !== multiField[0][0].state) {
        break;
      }
      if (i === 2) return { result: true, state: multiField[0][0].state };
    }
  }
  /* 
  . . x
  . x .
  x . .
  */
  if (!multiField[0][2].isEmpty) {
    for (let i = 2, j = 0; i > 0, j < 3; i--, j++) {
      if (multiField[i][j].state !== multiField[0][2].state) {
        break;
      }
      if (i === 0 && j === 2)
        return { result: true, state: multiField[0][2].state };
    }
  }

  return false;
};
