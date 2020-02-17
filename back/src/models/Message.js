const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    required
  },
  text: {
    type: String,
    required
  },
  sender: {
    type: Schema.Types.ObjectId,
    required
  },
  date: Date
});

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
