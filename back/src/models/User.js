const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      // require,
      unique: true
    },
    first_name: {
      type: String
      // required
    },
    last_name: {
      type: String
      // required
    },
    username: {
      type: String
      // required
    },
    password: {
      type: String
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date()
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
