"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const axios = require('axios');
// Repository
const roundsRepository = require('../repository/rounds');
class RoundsClass {
    // Get full list of all rounds
    getRounds(competitionID) {
        return __awaiter(this, void 0, void 0, function* () {
            return roundsRepository.getRounds(competitionID);
        });
    }
    // Add round
    addRound(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                const newRound = {
                    date: body.date,
                    competitionID: body.competitionId,
                    stravaSegmentID: body.stravaSegmentId
                };
                let round = yield roundsRepository.addRound(newRound.date, newRound.competitionID, newRound.stravaSegmentID);
                yield axios.get(`http://localhost:5000/api/stats/${round.competitionID}/${round.stravaSegmentID}`);
                response = round;
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Delete round and stats
    deleteRound(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return roundsRepository.deleteRound(_id);
        });
    }
    // Get round by segment id
    getRoundBySegmentId(stravaSegmentID) {
        return __awaiter(this, void 0, void 0, function* () {
            return roundsRepository.getRoundBySegmentId(stravaSegmentID);
        });
    }
}
module.exports = new RoundsClass();
//# sourceMappingURL=rounds.js.map