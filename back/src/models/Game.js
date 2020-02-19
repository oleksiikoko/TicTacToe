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
          require: "user in type is require"
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
        state: String
      }
    ]
  },
  winner: Schema.Types.ObjectId,
  date: {
    type: Date,
    default: new Date()
  },
  finished: { type: Boolean, default: false }
});

const GameModel = mongoose.model("Game", GameSchema);

module.exports = GameModel;
