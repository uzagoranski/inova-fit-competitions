// Repository
const leaderboardRepository = require('../repository/leaderboard');

class LeaderboardClass {

    // Reload leaderboard for selected competition
    async getLeaderboard(competitionID: string) {

        let response;
        
        try {
            let stats = await leaderboardRepository.getAllStatsForCompetition(competitionID);

            let userIDs = await leaderboardRepository.getDistinctUserIDs(competitionID);

            let responseValue = [];

            for(let i in userIDs) {

                let name = "";
                let totalTime = 0;
                let averageTime = 0;
                let totalDistance = 0;
                let numberOfRounds = 0;

                for(let j in stats) {                
                    if(stats[j].userID == userIDs[i]) {
                        numberOfRounds++;
                        totalTime += stats[j].elapsedTime;
                        totalDistance += stats[j].distance;
                        name = stats[j].name;
                    }          
                }
                averageTime = Math.round((totalTime / numberOfRounds) * 100) / 100; 
                totalDistance = Math.round(totalDistance * 100) / 100; 

                responseValue.push(
                    {
                        userID: userIDs[i],
                        name: name,
                        competitionID: competitionID,
                        averageTime: averageTime,
                        totalDistance: totalDistance,
                        numberOfRounds: numberOfRounds
                    }
                );
            }
        
            response = responseValue;     
            
        }
        catch(err) {
            response = err;
        }

        return response;

    }
}

module.exports = new LeaderboardClass();