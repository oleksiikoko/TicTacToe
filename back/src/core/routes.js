const bodyParser = require("body-parser");

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

  app.use(bodyParser.json());
  app.use(checkAuth);

  app.post("/user/signup", UserController.create);
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
