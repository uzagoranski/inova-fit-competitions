// Models
const Stats = require("../models/Stats");
const Leaderboard = require("../models/Leaderboard");

// Getting stats for different users in selected competition
module.exports.getRelevantStats = async function getRelevantStats(competitionID, userID) {

    let response;
    
    try {
        response = await Stats.find({ "competitionID": competitionID, "userID": userID });
    }
    catch(err) {
        response = err;
    }

    return response;

}

// Adding leaderboard based on competition
module.exports.addLeaderboard = async function addLeaderboard(newLeaderboard) {

    let response;

    try {
        response = await newLeaderboard.save();
    }
    catch(err) {
        response = err;
    }
    
    return response;  

}

// Collecting distinct userIDs from stats to send them in getLeaderboard method
module.exports.getDistinctUserIDs = async function getDistinctUserIDs(competitionID) {
    
    let response;
    
    try {
        await Leaderboard.deleteMany({ "competitionID": competitionID });

        response = await Stats.find({ "competitionID": competitionID }).distinct("userID");
    }
    catch(err) {
        response = err;
    }

    return response;

}

// Get a generated leaderboard for selected competition
module.exports.getLeaderboard = async function getLeaderboard(competitionID) {
    
    let response;
    
    try {
        response = await Leaderboard.find({ "competitionID": competitionID });
    }
    catch(err) {
        response = err;
    }

    return response;
    
}