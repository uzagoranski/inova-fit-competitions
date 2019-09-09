// Dependencies
import arraySort from 'array-sort';
import leaderboardRepository from '../repository/leaderboard';

class LeaderboardClass {

    // Reload leaderboard for selected competition
    async getLeaderboard(competitionID: string) {

        const stats = await leaderboardRepository.getAllStatsForCompetition(competitionID);

        const userIDs = await leaderboardRepository.getDistinctUserIDs(competitionID);

        const responseValue: any = [];

        userIDs.map((distinctUserID: any) => {

            let username = '';
            let totalTime = 0;
            let averageTime = 0;
            let totalDistance = 0;
            let numberOfRounds = 0;

            stats.map(async ({ name, userID, elapsedTime, distance }: any) => {
                if (userID === distinctUserID) {
                    numberOfRounds++;
                    totalTime += elapsedTime;
                    totalDistance += distance;
                    username = name;
                }
            });

            averageTime = Math.round((totalTime / numberOfRounds) * 100) / 100;
            totalDistance = Math.round(totalDistance * 100) / 100;

            responseValue.push(
                {
                    userID: distinctUserID,
                    username,
                    competitionID,
                    averageTime,
                    totalDistance,
                    numberOfRounds
                }
            );
        });

        return arraySort(responseValue, 'averageTime');

    }
}

export default new LeaderboardClass();
