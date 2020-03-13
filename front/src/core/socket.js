import io from "socket.io-client";

const socket = io("https://pet-tictactoe-back.herokuapp.com");

export default socket;
