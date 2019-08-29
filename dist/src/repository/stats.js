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
// Model
const Stats_1 = __importDefault(require("../models/Stats"));
class StatsClass {
    // Add stats for specific segment in a competition
    addStats(userID, name, competitionID, segmentID, elapsedTime, distance) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Stats_1.default.create({ userID: userID, name: name, competitionID: competitionID, segmentID: segmentID, elapsedTime: elapsedTime, distance: distance });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Get all stats
    getStats() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Stats_1.default.find();
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
}
module.exports = new StatsClass();
//# sourceMappingURL=stats.js.map