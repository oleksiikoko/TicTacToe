const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  match: {
    type: Schema.Types.ObjectId,
    require: "match is require"
  },
  players: {
    type: [
      {
        user: {
          type: Schema.Types.ObjectId,
          require: "usee in type is require"
        },
        user_type: {
          type: String,
          require: "user_type is require"
        }
      }
    ],
    require: "Players type is required"
  },
  field: {
    type: [
      {
        isEmpty: Boolean,
        players: Schema.Types.ObjectId
      }
    ]
  },
  score: String,
  date: {
    type: Date,
    default: new Date()
  },
  finished: Boolean
});

const GameModel = mongoose.model("Game", GameSchema);

module.exports = GameModel;
