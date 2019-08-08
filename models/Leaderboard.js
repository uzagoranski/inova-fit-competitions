const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LeaderboardSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  competitionID: {
    type: String,
    required: true
  },
  averageTime: {
    type: Number,
    required: true
  },
  totalDistance: {
    type: Number,
    required: true
  },
  numberOfRounds: {
    type: Number,
    required: true
  },
});

module.exports = Leaderboard = mongoose.model("leaderboard", LeaderboardSchema);