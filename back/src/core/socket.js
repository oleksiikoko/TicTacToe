const socket = require("socket.io");
// const http = require("http");

const createSocket = http => {
  const io = socket(http);

  io.on("connection", socket => {
    socket.on("MATCH:JOIN", matchId => {
      socket.gameId = matchId;
      socket.join(gameId);
    });

    console.log("new connection");
  });

  return io;
};

module.exports = createSocket;
