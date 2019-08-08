const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const CompetitionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Competition = mongoose.model('competition', CompetitionSchema);