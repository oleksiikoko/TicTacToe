const RatingModel = require("../models/Rating");

const UserModel = require("../models/User");
const MatchModel = require("../models/Match");
const GameModel = require("../models/Game");

class ProfileController {
  create = (req, res) => {
    const postData = {
      user: req.body._id
    };

    const rating = new RatingModel(postData);

    rating
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

  getInfo = (req, res) => {
    const _id = req.body.userId;

    console.log("_id", req.body);

    UserModel.findOne(
      { _id: _id },
      "_id first_name last_name username email"
    ).exec((err, user) => {
      if (err || !user) {
        return res.status(403).json();
      }
      return res.json(user);
    });
  };

  getMatches = async (req, res) => {
    const _id = req.body.userId;

    const matches = await MatchModel.aggregate([
      {
        $match: {
          users: mongoose.Types.ObjectId(_id)
        }
      }
    ]);

    const result = await Promise.all(
      matches.map(async match => {
        const users = await Promise.all(
          match.users.map(async user => {
            const userObj = await UserModel.aggregate([
              {
                $match: {
                  _id: user
                }
              }
            ]);
            return {
              _id: userObj[0]._id,
              first_name: userObj[0].first_name,
              last_name: userObj[0].last_name,
              username: userObj[0].username,
              email: userObj[0].email
            };
          })
        );

        // const games =
        // await GameModel.aggregate([
        //   {
        //     $match: {
        //       match: match._id
        //     }
        //   }
        // ]);
        const gamesObj = await Promise.all(
          match.games.map(async game => {
            if (!game) return {};
            const gameRes = await GameModel.aggregate([
              {
                $match: {
                  _id: game
                }
              }
            ]);
            return {
              field: gameRes[0].field,
              users: gameRes[0].users,
              winner: gameRes[0].winner
            };
          })
        );

        return {
          users: users,
          games: gamesObj,
          date: match.date
        };
      })
    );
    res.json(result);
  };
}

exports.ProfileController = ProfileController;
