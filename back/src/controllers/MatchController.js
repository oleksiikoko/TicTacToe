const MatchModel = require("../models/Match");
const GameModel = require("../models/Game");

const gameFinished = require("../utils/gameFinished");

const RatingController = require("./RatingController").RatingController;

class MatchController {
  constructor(io) {
    this.io = io;
    this.queue = [];
  }

  buildGame = (usersList, res) => {
    console.log("userList", usersList);
    const users = usersList.splice(0, 2);

    const gameData = {
      users: [
        { user: users[0], user_type: "x" },
        { user: users[1], user_type: "o" }
      ],
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

    const game = new GameModel(gameData);
    game
      .save()
      .then(obj => {
        console.log("obj", obj);
      })
      .catch(reason => {
        console.log("reason", reason);
      });

    const postData = {
      users: users,
      games: [game],
      date: new Date()
    };

    const match = new MatchModel(postData);

    match
      .save()
      .then(obj => {
        this.io.emit("SERVER:MATCH_BUILDED", obj);
      })
      .catch(reason => {
        res.status(500).json({
          status: "error",
          message: reason
        });
      });
  };

  create = (req, res) => {
    if (!this.queue.includes(req.body.user_id))
      this.queue.push(req.body.user_id);

    console.log("this.queue", this.queue);

    if (this.queue.length >= 2) {
      this.buildGame(this.queue, res);
    } else {
      res.json("Wait game");
    }
  };

  get = (req, res) => {
    MatchModel.findOne({ _id: req.body.match_id })
      .populate("games")
      .exec((err, match) => {
        if (err || !match) {
          return res.status(500);
        }
        console.log("match", match);
        res.json(match);
      });
  };

  addGame = (users, match_id) => {
    console.log("users", users);
    console.log("match_id", match_id);

    MatchModel.findOne({ _id: match_id })
      .populate("games")
      .exec((err, match) => {
        const user1score = match.games.filter(
          game => game.winner.toHexString() === match.users[0].toHexString()
        );
        const user2score = match.games.filter(
          game => game.winner.toHexString() === match.users[1].toHexString()
        );

        console.log("user2score", user2score.length);

        if (user1score.length >= 3) {
          console.log("user1score", user1score.length);
          MatchModel.findOneAndUpdate(
            { _id: match_id },
            {
              finished: true,
              winner: match.users[0]
            },
            { new: true },
            (err, match) => {
              if (err || !match) {
              } else {
                const winner = match.users.find(el => {
                  return el.toHexString() === match.winner.toHexString();
                });
                const loser = match.users.find(el => {
                  return el.toHexString() !== match.winner.toHexString();
                });
                new RatingController().userWin(winner);
                new RatingController().userLose(loser);
              }
            }
          );
        } else if (user2score.length >= 3) {
          MatchModel.findOneAndUpdate(
            { _id: match_id },
            {
              finished: true,
              winner: match.users[1]
            },
            (err, match) => {
              console.log("match", match);
            }
          );
        } else {
          const postData = {
            users: [
              { user: users[0].user, user_type: users[1].user_type },
              { user: users[1].user, user_type: users[0].user_type }
            ],
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
              console.log("Saved");
            })
            .catch(reason => {
              console.log("reason", reason);
            });

          MatchModel.updateOne(
            { _id: match_id },
            { $push: { games: game } },
            (err, match) => {
              if (err || !match) {
                console.log("err", err);
              }
            }
          );
        }
      });
  };

  // gameFinished = field => {
  //   const multiField = [
  //     field.slice(0, 3),
  //     field.slice(3, 6),
  //     field.slice(6, 9)
  //   ];
  //   /*
  //   x . .
  //   x . .
  //   x . .
  //   */
  //   for (let i = 0; i < 3; i++) {
  //     let state;
  //     if (multiField[0][i].isEmpty) {
  //       continue;
  //     } else {
  //       state = multiField[0][i].state;
  //     }

  //     for (let j = 1; j < 3; j++) {
  //       if (multiField[j][i].isEmpty) {
  //         break;
  //       } else {
  //         if (multiField[j][i].state !== state) {
  //           break;
  //         }
  //       }
  //       if (j === 2) return { result: true, state: state };
  //     }
  //   }
  //   /*
  //   x x x
  //   . . .
  //   . . .
  //   */
  //   for (let i = 0; i < 3; i++) {
  //     let state;
  //     if (multiField[i][0].isEmpty) {
  //       continue;
  //     } else {
  //       state = multiField[i][0].state;
  //     }

  //     for (let j = 1; j < 3; j++) {
  //       if (multiField[i][j].isEmpty) {
  //         break;
  //       } else {
  //         if (multiField[i][j].state !== state) {
  //           break;
  //         }
  //       }
  //       if (j === 2) return { result: true, state: state };
  //     }
  //   }
  //   /*
  //   x . .
  //   . x .
  //   . . x
  //   */
  //   if (!multiField[0][0].isEmpty) {
  //     for (let i = 1; i < 3; i++) {
  //       if (multiField[i][i].state !== multiField[0][0].state) {
  //         break;
  //       }
  //       if (i === 2) return { result: true, state: multiField[0][0].state };
  //     }
  //   }
  //   /*
  //   . . x
  //   . x .
  //   x . .
  //   */
  //   if (!multiField[0][2].isEmpty) {
  //     for (let i = 2, j = 0; i > 0, j < 3; i--, j++) {
  //       if (multiField[i][j].state !== multiField[0][2].state) {
  //         break;
  //       }
  //       if (i === 0 && j === 2)
  //         return { result: true, state: multiField[0][2].state };
  //     }
  //   }

  //   return false;
  // };

  updateGame = (req, res) => {
    GameModel.findOne({ _id: req.body.game_id }, (err, game) => {
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
            { new: true }
          ).exec((err, game) => {
            if (err || !game) {
              return res.status(500).json({ status: "error", message: err });
            }
            const gameFinishedRes = gameFinished(game.field);
            if (gameFinishedRes.result) {
              const winner = game.users.find(el => {
                return el.user_type === gameFinishedRes.state;
              });
              GameModel.findOneAndUpdate(
                { _id: game._id },
                {
                  finished: true,
                  winner: winner.user
                },
                (err, game) => {
                  if (err || !game) {
                    res.status(500).json({ status: "error", message: err });
                  } else {
                    res.json({
                      game: game,
                      finished: true
                    });
                    this.addGame(game.users, req.body.match_id.match_id);
                    GameModel.findOne(
                      { _id: req.body.game_id },
                      (err, game) => {
                        this.io.emit("MATCH:GAME_FINISHED", game);
                      }
                    );
                  }
                }
              );
            } else {
              res.json(game);
              GameModel.findOne({ _id: req.body.game_id }, (err, game) => {
                this.io.emit("MATCH:GAME_UPDATE", game);
              });
            }
          });
        } else {
          res.json({
            game: game,
            finished: true
          });
        }
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

  getGames = (req, res) => {
    const _id = req.body.matchId;

    const games = GameModel.find({ _id: _id });
  };

  getMatches = (req, res) => {
    const _id = req.body.userId;

    MatchModel.find({ users: mongoose.Types.ObjectId(_id) }, (err, matches) => {
      if (err || !matches) {
        res.status(500).json({ status: "error", message: err });
      }
      res.json(matches);
    });
  };
}

exports.MatchController = MatchController;
