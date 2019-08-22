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
// Models
const Round_1 = __importDefault(require("../models/Round"));
const Stats_1 = __importDefault(require("../models/Stats"));
// Rounds list for selected competition
module.exports.getRounds = function getRounds(competitionID) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield Round_1.default.find({ "competitionID": competitionID }).sort({ date: 1 });
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Add round
module.exports.addRound = function addRound(newRound) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield newRound.save();
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Delete round and stats
module.exports.deleteRound = function deleteRound(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            let round = yield Round_1.default.findById(_id);
            let competitionID = round.competitionID;
            let stravaSegmentID = round.stravaSegmentID;
            yield Promise.all([round.remove(), Stats_1.default.deleteMany({ "competitionID": competitionID, "segmentID": stravaSegmentID })]);
            response = JSON.stringify({ success: true });
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Rounds list for selected competition
module.exports.getSegmentIDs = function getSegmentIDs() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            response = yield Round_1.default.find().sort({ date: 1 });
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
//# sourceMappingURL=rounds.js.map