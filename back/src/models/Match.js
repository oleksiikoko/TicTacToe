const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  users: {
    type: [Schema.Types.ObjectId]
  },
  score: {
    type: [{ user: Schema.Types.ObjectId, point: Number }]
  },
  date: Date,
  finished: {
    type: Boolean,
    default: false
  },
  winner: Schema.Types.ObjectId
});

const MatchModel = mongoose.model("Match", MatchSchema);

module.exports = MatchModel;
