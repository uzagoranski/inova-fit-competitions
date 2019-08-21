// Dependencies
const axios = require('axios');

// Repository
const roundsRepository = require('../repository/rounds');

// Get full list of all rounds
module.exports.getRounds = async function getRounds(competitionID) {
    
    return await roundsRepository.getRounds(competitionID);

}

// Add round
module.exports.addRound = async function addRound(body) {

    let response;

    try {
        const newRound = new Round({
            date: body.date,
            competitionID: body.competitionId,
            stravaSegmentID: body.stravaSegmentId
        });
        let round = await roundsRepository.addRound(newRound);

        await axios.get(`http://localhost:5000/api/stats/${round.competitionID}/${round.stravaSegmentID}`);
            
        response = round;
    }
    catch(err) {
        response = err;
    }

    return response;  

}

// Delete round and stats
module.exports.deleteRound = async function deleteRound(_id) {

    return await roundsRepository.deleteRound(_id);

}