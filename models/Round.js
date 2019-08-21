const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const RoundSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    competitionID: {
        type: String,
        required: true
    },
    stravaSegmentID: {
        type: String,
        required: true
    }
});

module.exports = Round = mongoose.model('round', RoundSchema);