const express = require("express");
const dotenv = require("dotenv");
const createServer = require("http").createServer;

dotenv.config();

const createRoutes = require("./core/routes");
const createSocket = require("./core/socket");

mongoose = require("mongoose");

const DB = "tictactoe";
mongoose.connect(`mongodb://localhost:27017/${DB}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

const PORT = 3002;

http.listen(PORT, function() {
  console.log(`Server: http://localhost:${PORT}`);
});
