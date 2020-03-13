const bodyParser = require("body-parser");
const cors = require("cors");

const UserCtrl = require("../controllers/UserController").UserController;
const MatchCtrl = require("../controllers/MatchController").MatchController;
const ProfileCrtl = require("../controllers/ProfileController")
  .ProfileController;
const RatingCtrl = require("../controllers/RatingController").RatingController;

const checkAuth = require("../middlewares/checkAuth");

const createRoutes = (app, io) => {
  const UserController = new UserCtrl();
  const MatchController = new MatchCtrl(io);
  const ProfileController = new ProfileCrtl();
  const RatingController = new RatingCtrl();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
  });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(checkAuth);

  app.post("/user/signup", UserController.signup);
  app.post("/user/signin", UserController.login);
  app.get("/user/me", UserController.getMe);
  app.get("/user/:id", UserController.show);

  app.post("/match/init", MatchController.create);
  app.post("/match/get", MatchController.get);
  app.post("/match/addgame", MatchController.addGame);
  app.post("/match/updategame", MatchController.updateGame);
  app.post("/match/getgames", MatchController.getGames);
  app.post("/match/getmatches", MatchController.getMatches);

  app.post("/profile/info", ProfileController.getInfo);
  app.post("/profile/matches", ProfileController.getMatches);

  app.post("/rating/get", RatingController.getRating);
};

module.exports = createRoutes;
