// Model
const Stats = require('../models/Stats');

// Add stats for specific segment in a competition
module.exports.addStats = async function addStats(newStats) {

    let response;

    try {
        response = await newStats.save();
    }
    catch(err) {
        response = err;
    }

    return response;

}

// Get all stats
module.exports.getStats = async function getStats() {

    let response;

    try {
        response = await Stats.find();
    }
    catch(err) {
        response = err;
    }

    return response;

}