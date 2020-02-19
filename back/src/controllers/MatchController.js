const MatchModel = require("../models/Match");
const GameModel = require("../models/Game");

class MatchController {
  create = (req, res) => {
    const postData = {
      users: req.body.users,
      score: [
        {
          user: req.body.users[0],
          score: 0
        },
        {
          user: req.body.users[1],
          score: 0
        }
      ],
      date: new Date()
    };

    const match = new MatchModel(postData);
    match
      .save()
      .then(obj => {
        res.json(obj);
      })
      .catch(reason => {
        res.status(500).json({
          status: "error",
          message: reason
        });
      });
  };

  addGame = (req, res) => {
    const postData = {
      match: req.body._id,
      players: req.body.players,
      field: [
        { isEmpty: true },
        { isEmpty: true },
        { isEmpty: true },
        { isEmpty: true },
        { isEmpty: true },
        { isEmpty: true },
        { isEmpty: true },
        { isEmpty: true },
        { isEmpty: true }
      ],
      date: new Date(),
      finished: false
    };

    const game = new GameModel(postData);
    game
      .save()
      .then(obj => {
        res.json(obj);
      })
      .catch(reason => {
        res.status(500).json({
          status: "error",
          message: reason
        });
      });
  };

  gameFinished = field => {
    const multiField = [
      field.slice(0, 3),
      field.slice(3, 6),
      field.slice(6, 9)
    ];
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
        if (j === 2) return true;
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
        if (j === 2) return true;
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
        if (i === 2) return true;
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
        if (i === 0 && j === 2) return true;
      }
    }

    return false;
  };

  updateGame = (req, res) => {
    GameModel.findOne({ _id: req.body._id }, (err, game) => {
      if (err || !game) {
        return res.status(500).json({
          message: "game not found"
        });
      } else {
        /*solution = {x, y, type:String} type: ["x", "o"]*/
        if (!game.finished) {
          const solution = req.body.solution;
          const item_id = game.field[solution.x + solution.y * 3]._id;

          GameModel.findOneAndUpdate(
            { _id: game._id, "field._id": item_id },
            {
              $set: {
                "field.$.isEmpty": false,
                "field.$.state": solution.state
              }
            },
            { new: true },
            (err, game) => {
              if (err || !game) {
                res.status(500).json({ status: "error", message: err });
              }
              console.log("game", game);
              if (this.gameFinished(game.field)) {
                console.log("true", true);
                GameModel.findOneAndUpdate(
                  { _id: game._id },
                  { finished: true },
                  (err, game) => {
                    if (err || !game) {
                      res.status(500).json({ status: "error", message: err });
                    }
                    res.json({
                      game: game._id,
                      finished: true
                    });
                  }
                );
              }
              res.json(game);
            }
          );
        }
        res.json({
          game: game._id,
          finished: true
        });
      }
    });
  };

  updateMatch = (req, res) => {
    const _id = req.body._id;

    const match = MatchModel.findById(_id);

    user1score = GameModel.find({ match: _id, winner: match.user[0] }).length();
    user2score = GameModel.find({ match: _id, winner: match.user[1] }).length();

    const update = {
      score: [
        {
          user: match.user[0],
          score: user1score
        },
        {
          user: match.user[1],
          score: user2score
        }
      ]
    };

    MatchModel.findOneAndUpdate({ _id: _id }, { update });
  };
}

exports.MatchController = MatchController;
