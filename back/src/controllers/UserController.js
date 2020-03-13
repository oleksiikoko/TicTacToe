const UserModel = require("../models/User");

const createJWToken = require("../utils/createJWToken");
const verifyJWToken = require("../utils/verifyJWToken");

const RatingController = require("../controllers/RatingController")
  .RatingController;

class UserController {
  constructor() {
    UserModel.findOne({ email: "bot@mail.com" }, (err, user) => {
      if (!user) {
        const postData = {
          email: "bot@mail.com",
          first_name: "Bot",
          last_name: "Player",
          username: "bot",
          password: "123456789"
        };

        this.create(postData);
      }
    });
  }

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

  signup = (req, res) => {
    const postData = {
      email: req.body.email,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    };

    this.create(postData, res);
  };

  create = (postData, res) => {
    const user = new UserModel(postData);

    user
      .save()
      .then(obj => {
        new RatingController().create(obj._id);
        if (res) {
          res.json({
            status: "success",
            obj
          });
        }
      })
      .catch(reason => {
        if (res) {
          res.status(500).json({
            status: "error",
            message: reason
          });
        }
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
