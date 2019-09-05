// Dependencies
import axios from 'axios';

// Repository
const statsRepository = require('../repository/stats');
const usersRepository = require('../repository/users');
const roundsRepository = require('../repository/rounds');

class StatsClass {

    // Add stats for specific segment in a competition when adding a round
    async addStatsRound(competitionID: string, segmentID: string) {

        let response;

        let users = await usersRepository.getStravaUsers();

        for (var i in users) {
    
            let user = users[i];
    
            if (user.accessTokenExpirationDate <= new Date()) {
    
                await axios.put(`http://localhost:5000/api/strava/refreshToken/${user._id}/${user.stravaRefreshToken}`);
    
            }
    
            let stats = await axios.get(`https://www.strava.com/api/v3/segments/${segmentID}/all_efforts?per_page=30`,
                {
                    headers: {
                        "Authorization": `Bearer ${user.stravaAccessToken}`
                    }
                });
    
            for (var v in stats.data) {
                if (stats.data[v] != null && stats.data[v] != "") {
                    const newStats = {
                        userID: user._id,
                        name: user.name,
                        competitionID: competitionID,
                        segmentID: segmentID,
                        elapsedTime: stats.data[v].elapsed_time,
                        distance: stats.data[v].distance         
                    }
    
                    response = await statsRepository.addStats(newStats.userID, newStats.name, newStats.competitionID, newStats.segmentID, newStats.elapsedTime, newStats.distance);
                }
            }  
        }
        return response;  
    }

    // Get stats for specific segment in a competition when adding an user
    async addStatsUser(_id: string) {

        let response;
        
        let user = await usersRepository.getUserByID(_id);

        let segments = await roundsRepository.getSegmentIDs();

        for (var i in segments) {

            let segment = segments[i];

            if (user.accessTokenExpirationDate <= new Date()) {

                await axios.put(`http://localhost:5000/api/strava/refreshToken/${user._id}/${user.stravaRefreshToken}`);

            }

            let stats = await axios.get(`https://www.strava.com/api/v3/segments/${segment.stravaSegmentID}/all_efforts?per_page=30`,
                {
                    headers: {
                        "Authorization": `Bearer ${user.stravaAccessToken}`
                    }
                });

            for (var v in stats.data) {
                if (stats.data[v] != null && stats.data[v] != "") {
                    const newStats = {
                        userID: user._id,
                        name: user.name,
                        competitionID: segment.competitionID,
                        segmentID: segment._id,
                        elapsedTime: stats.data[v].elapsed_time,
                        distance: stats.data[v].distance         
                    }

                    response = await statsRepository.addStats(newStats.userID, newStats.name, newStats.competitionID, newStats.segmentID, newStats.elapsedTime, newStats.distance);
                }
            }  
        }
        return response;
    }
}

module.exports = new StatsClass();