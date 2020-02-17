const MatchModel = require("../models/Match");
const UserModel = require("../models/User");

class MatchController {
  create = (req, res) => {
    const postData = {
      users: req.body.users,
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
}

exports.MatchController = MatchController;
