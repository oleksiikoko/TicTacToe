const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game"
    }
  ],
  date: Date,
  finished: {
    type: Boolean,
    default: false
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const MatchModel = mongoose.model("Match", MatchSchema);

module.exports = MatchModel;
