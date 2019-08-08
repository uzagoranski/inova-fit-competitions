const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  stravaUserID: {
    type: String,
    default: ""
  },
  stravaAccessToken: {
    type: String,
    default: ""
  },
  stravaRefreshToken: {
    type: String,
    default: ""
  },
  accessTokenExpirationDate: {
    type: Date,
    default: ""
  }
});

module.exports = User = mongoose.model("users", UserSchema);