const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    unique: true
    // required
  },
  wins: {
    type: Number,
    default: 0
  },
  losing: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  }
});

const RatingModel = mongoose.model("Rating", RatingSchema);

module.exports = RatingModel;
