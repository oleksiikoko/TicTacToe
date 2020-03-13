const MatchModel = require("../models/Match");
const GameModel = require("../models/Game");
const UserModel = require("../models/User");

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

    setTimeout(() => {
      if (this.queue.length < 2) {
        UserModel.findOne({ email: "bot@mail.com" }, (err, user) => {
          if (user) {
            this.queue.push(user._id);
            this.buildGame(this.queue, res);
          } else {
            console.log("err", err);
          }
        });
      }
    }, 3000);

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
        const user1score = match.games.filter(game => {
          if (game.winner) {
            return game.winner.toHexString() === match.users[0].toHexString();
          }
          return false;
        });
        const user2score = match.games.filter(game => {
          if (game.winner) {
            return game.winner.toHexString() === match.users[1].toHexString();
          }
          return false;
        });

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
              { user: users[0].user, user_type: users[0].user_type },
              { user: users[1].user, user_type: users[1].user_type }
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

  updateGame = async (req, res) => {
    const bot = await UserModel.aggregate([
      {
        $match: {
          email: "bot@mail.com"
        }
      }
    ]);
    console.log("bot", bot);

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
              let winner = game.users.find(el => {
                return el.user_type === gameFinishedRes.state;
              });
              console.log("winner", winner);
              let update;
              if (winner === undefined) {
                update = { finished: true };
              } else {
                update = {
                  finished: true,
                  winner: winner.user
                };
              }
              GameModel.findOneAndUpdate(
                { _id: game._id },
                update,
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
              const secPlayer = game.users.find(user => {
                console.log("user", user.user);
                console.log("bot", bot[0]._id);
                return user.user.toHexString() === bot[0]._id.toHexString();
              });
              console.log("secPlayer", secPlayer);
              if (secPlayer) {
                const item = game.field.find(item => item.isEmpty);
                console.log("secPlayer", secPlayer);
                GameModel.findOneAndUpdate(
                  { _id: game._id, "field._id": item._id },
                  {
                    $set: {
                      "field.$.isEmpty": false,
                      "field.$.state": secPlayer.user_type
                    }
                  },
                  { new: true },
                  (err, game) => {
                    this.io.emit("MATCH:GAME_UPDATE", game);
                  }
                );
              } else {
                GameModel.findOne({ _id: req.body.game_id }, (err, game) => {
                  this.io.emit("MATCH:GAME_UPDATE", game);
                });
              }
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
