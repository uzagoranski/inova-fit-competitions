// Dependencies
const axios = require('axios');

// Repository
const leaderboardRepository = require('../repository/leaderboard');

// Add a new leaderboard
module.exports.addLeaderboard = async function addLeaderboard(competitionID, userID) {

    let response;

    try {
        let data = await leaderboardRepository.getRelevantStats(competitionID, userID);
    
        let name = "";
        let totalTime = 0;
        let averageTime = 0;
        let totalDistance = 0;
        let numberOfRounds = 0;

        for(var i in data) {
            numberOfRounds++;
            totalTime += data[i].elapsedTime;
            totalDistance += data[i].distance;
            name = data[i].name;
        }
        averageTime = Math.round((totalTime / numberOfRounds) * 100) / 100; 
        totalDistance = Math.round(totalDistance * 100) / 100; 

        const newLeaderboard = new Leaderboard({
            userID: userID,
            name: name,
            competitionID: competitionID,
            averageTime: averageTime,
            totalDistance: totalDistance,
            numberOfRounds: numberOfRounds   
        });

        response = await leaderboardRepository.addLeaderboard(newLeaderboard);
    }
    catch(err) {
        response = err;
    }
    
    return response;    

}

// Reload leaderboard for selected competition
module.exports.reloadLeaderboard = async function reloadLeaderboard(competitionID) {

    let response;
    
    try {
        let userIDs = await leaderboardRepository.getDistinctUserIDs(competitionID);

        for(let i in userIDs) {
            await axios.get(`http://localhost:5000/api/leaderboard/${competitionID}/${userIDs[i]}`);
        }
    
        response = await leaderboardRepository.getLeaderboard(competitionID);     
        
    }
    catch(err) {
        response = err;
    }

    return response;

}