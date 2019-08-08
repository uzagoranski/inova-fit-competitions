const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const RoundSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    competitionId: {
        type: String,
        required: true
    },
    stravaSegmentId: {
        type: String,
        required: true
    }
});

module.exports = Round = mongoose.model('round', RoundSchema);