const UserModel = require("../models/User");

const createJWToken = require("../utils/createJWToken");
const verifyJWToken = require("../utils/verifyJWToken");

const RatingController = require("../controllers/RatingController")
  .RatingController;

class UserController {
  show = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "User not fount"
        });
      }
      res.json(user);
    });
  };

  getMe = (req, res) => {
    const token = req.headers.token;
    verifyJWToken(token)
      .then(user => {
        console.log("user", user.data._doc);
        res.json(user);
      })
      .catch(err => {
        res.status(403).json({ message: "Invalid auth token provided." });
      });
  };

  create = (req, res) => {
    const postData = {
      email: req.body.email,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    };

    const user = new UserModel(postData);

    user
      .save()
      .then(obj => {
        new RatingController().create(obj._id);
        res.json(obj);
      })
      .catch(reason => {
        res.status(500).json({
          status: "error",
          message: reason
        });
      });
  };

  login = (req, res) => {
    const postData = {
      username: req.body.username,
      password: req.body.password
    };

    UserModel.findOne({ username: postData.username }, (err, user) => {
      if (user.password === postData.password) {
        const token = createJWToken(user);

        res.json({
          status: "success",
          token
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "Incorrect password or username"
        });
      }
    });
  };
}

exports.UserController = UserController;
