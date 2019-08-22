"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const axios_1 = __importDefault(require("axios"));
// Repository
const statsRepository = require('../repository/stats');
const usersRepository = require('../repository/users');
const roundsRepository = require('../repository/rounds');
// Model
const Stats = require('../models/Stats');
// Add stats for specific segment in a competition when adding a round
module.exports.addStatsRound = function addStatsRound(competitionID, segmentID) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            let users = yield usersRepository.getStravaUsers();
            for (var i in users) {
                let user = users[i];
                if (user.accessTokenExpirationDate <= new Date()) {
                    yield axios_1.default.put(`http://localhost:5000/api/strava/refreshToken/${user._id}/${user.stravaRefreshToken}`);
                }
                let stats = yield axios_1.default.get(`https://www.strava.com/api/v3/segments/${segmentID}/all_efforts?per_page=30`, {
                    headers: {
                        "Authorization": `Bearer ${user.stravaAccessToken}`
                    }
                });
                for (var v in stats.data) {
                    if (stats.data[v] != null && stats.data[v] != "") {
                        const newStats = new Stats({
                            userID: user._id,
                            name: user.name,
                            competitionID: competitionID,
                            segmentID: segmentID,
                            elapsedTime: stats.data[v].elapsed_time,
                            distance: stats.data[v].distance
                        });
                        response = yield statsRepository.addStats(newStats);
                    }
                }
            }
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Get stats for specific segment in a competition when adding an user
module.exports.addStatsUser = function addStatsUser(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            let user = yield usersRepository.getUserByID(_id);
            let segments = yield roundsRepository.getSegmentIDs();
            for (var i in segments) {
                let segment = segments[i];
                if (user.accessTokenExpirationDate <= new Date()) {
                    yield axios_1.default.put(`http://localhost:5000/api/strava/refreshToken/${user._id}/${user.stravaRefreshToken}`);
                }
                let stats = yield axios_1.default.get(`https://www.strava.com/api/v3/segments/${segment._id}/all_efforts?per_page=30`, {
                    headers: {
                        "Authorization": `Bearer ${user.stravaAccessToken}`
                    }
                });
                for (var v in stats.data) {
                    if (stats.data[v] != null && stats.data[v] != "") {
                        const newStats = new Stats({
                            userID: user._id,
                            name: user.name,
                            competitionID: segment.competitionID,
                            segmentID: segment._id,
                            elapsedTime: stats.data[v].elapsed_time,
                            distance: stats.data[v].distance
                        });
                        response = yield statsRepository.addStats(newStats);
                    }
                }
            }
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
//# sourceMappingURL=stats.js.map