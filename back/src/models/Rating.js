const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required
  },
  win: {
    type: Number,
    default: 0
  },
  lose: {
    type: Number,
    default: 0
  },
  raiting_number: {
    type: Number,
    default: 0
  }
});

const RatingModel = mongoose.model("Rait", RatingSchema);

module.exports = RatingModel;
