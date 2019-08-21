// Models
const Competition = require('../models/Competition');
const Round = require('../models/Round');
const Stats = require('../models/Stats');

// Competitions list
module.exports.getAllCompetitions = async function getAllCompetitions() {

    let response;

    try {
        response = await Competition.find().sort({ date: -1 });
    }
    catch(err) {
        response = err;
    }

    return response;

}

// Add competition
module.exports.addCompetition = async function addCompetition(newCompetition) {
    
    let response;

    try {    
        response = await newCompetition.save();
    }
    catch(err) {
        response = err;
    }

    return response;

}

// Get selected competition
module.exports.getSelectedCompetition = async function getSelectedCompetition(_id) {
    
    let response;

    try {    
        response = await Competition.findById(_id);
    }
    catch(err) {
        response = err;
    }
    
    return response;

}

// Delete competition
module.exports.deleteCompetition = async function deleteCompetition(_id) { 

    try {
        await Promise.all([Competition.findByIdAndDelete(_id), Round.deleteMany({ "competitionID": _id }), Stats.deleteMany({ "competitionID": _id })])
    }
    catch(err) {
        return err;
    }

    return JSON.stringify({ success: true });
    
}