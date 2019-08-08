const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StatsSchema = new Schema({
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
  segmentID: {
    type: String,
    required: true
  },
  elapsedTime: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
});

module.exports = Stats = mongoose.model("stats", StatsSchema);