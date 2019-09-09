// Dependencies
import axios from 'axios';
import statsRepository from '../repository/stats';
import usersRepository from '../repository/users';
import roundsRepository from '../repository/rounds';
import stravaService from './strava';

class StatsClass {

    // Add stats for specific segment in a competition when adding a round
    async addStatsRound(competitionID: string, segmentID: string) {

        const users = await usersRepository.getStravaUsers();

        await Promise.all(users.map(async ({ _id, name, stravaAccessToken, stravaRefreshToken, accessTokenExpirationDate }: any) => {

            if (accessTokenExpirationDate <= new Date()) {

                await stravaService.refreshAuthenticationToken(stravaRefreshToken, _id);

            }

            const stats = await axios.get(`https://www.strava.com/api/v3/segments/${segmentID}/all_efforts?per_page=30`,
                {
                    headers: {
                        Authorization: `Bearer ${stravaAccessToken}`
                    }
                });

            if (stats.data.length > 0) {

                const newStats = {
                    userID: _id,
                    name,
                    competitionID,
                    segmentID,
                    elapsedTime: stats.data[0].elapsed_time,
                    distance: stats.data[0].distance
                };

                await statsRepository.addStats(newStats.userID, newStats.name, newStats.competitionID, newStats.segmentID, newStats.elapsedTime, newStats.distance);
            }
        }));

        return { success: true };
    }

    // Get stats for specific segment in a competition when adding an user
    async addStatsUser(_id: string) {

        const user = await usersRepository.getUserByID(_id);

        const segments = await roundsRepository.getSegmentIDs();

        await Promise.all(segments.map(async ({ stravaSegmentID, competitionID }: any) => {

            if (user.accessTokenExpirationDate <= new Date()) {

                await stravaService.refreshAuthenticationToken(user.stravaRefreshToken, user._id);

            }

            const stats = await axios.get(`https://www.strava.com/api/v3/segments/${stravaSegmentID}/all_efforts?per_page=30`,
                {
                    headers: {
                        Authorization: `Bearer ${user.stravaAccessToken}`
                    }
                });

            if (stats.data.length > 0) {

                const newStats = {
                    userID: user._id,
                    name: user.name,
                    competitionID,
                    segmentID: stravaSegmentID,
                    elapsedTime: stats.data[0].elapsed_time,
                    distance: stats.data[0].distance
                };

                await statsRepository.addStats(newStats.userID, newStats.name, newStats.competitionID, newStats.segmentID, newStats.elapsedTime, newStats.distance);
            }
        }));

        return { success: true };
    }
}

export default new StatsClass();
