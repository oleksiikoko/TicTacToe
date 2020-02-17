const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId,
    required
  }
});

const ChatModel = mongoose.model("Chat", ChatSchema);

module.exports = ChatModel;
