const bodyParser = require("body-parser");
const express = require("express");
const createServer = require("http").createServer;

mongoose = require("mongoose");

const UserCtrl = require("./controllers/UserController").UserController;
const MatchCtrl = require("./controllers/MatchController").MatchController;

const DB = "tictactoe";
mongoose.connect(`mongodb://localhost:27017/${DB}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const app = express();
const http = createServer(app);

const UserController = new UserCtrl();
const MatchController = new MatchCtrl();

app.use(bodyParser.json());

app.post("/user/signup", UserController.create);
app.get("/user/:id", UserController.show);

app.post("/match/init", MatchController.create);
app.post("/match/addgame", MatchController.addGame);
app.post("/match/updategame", MatchController.updateGame);

const PORT = 3002;

http.listen(PORT, function() {
  console.log(`Server: http://localhost:${PORT}`);
});
