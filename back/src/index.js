const express = require("express");
const dotenv = require("dotenv");
const createServer = require("http").createServer;

dotenv.config();

const createRoutes = require("./core/routes");
const createSocket = require("./core/socket");

mongoose = require("mongoose");

const DB = "heroku_dlmt5v89";
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const app = express();
const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

http.listen(process.env.PORT || 3000, function() {
  console.log(`Server: http://localhost:${process.env.PORT}`);
});
