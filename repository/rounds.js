// Models
const Round = require('../models/Round');
const Stats = require('../models/Stats');

// Rounds list for selected competition
module.exports.getRounds = async function getRounds(competitionID) {

    let response;

    try {
        response = await Round.find({ "competitionID": competitionID }).sort({ date: 1 });
    }
    catch(err) {
        response = err;
    }

    return response;  

}

// Add round
module.exports.addRound = async function addRound(newRound) {

    let response;

    try {
        response = await newRound.save();
    }
    catch(err) {
        response = err;
    }

    return response;  

}

// Delete round and stats
module.exports.deleteRound = async function deleteRound(_id) {

    let response;

    try {
        let round = await Round.findById(_id)

        let competitionID = round.competitionID;
        let stravaSegmentID = round.stravaSegmentID;

        await Promise.all([round.remove(), Stats.deleteMany({ "competitionID": competitionID, "segmentID": stravaSegmentID })]);
     
        response = {success: true};
    }
    catch(err) {
        response = err;
    }

    return response; 

}

// Rounds list for selected competition
module.exports.getSegmentIDs = async function getSegmentIDs() {

    let response;

    try {
        response = await Round.find().sort({ date: 1 });
    }
    catch(err) {
        response = err;
    }

    return response;  

}