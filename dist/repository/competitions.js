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
const Competition_1 = __importDefault(require("../models/Competition"));
const Round_1 = __importDefault(require("../models/Round"));
const Stats_1 = __importDefault(require("../models/Stats"));
class CompetitionsClass {
    // Competitions list
    getAllCompetitions() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Competition_1.default.find().sort({ date: -1 });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Add competition
    addCompetition(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Competition_1.default.create({ name: name });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Get selected competition
    getSelectedCompetition(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Competition_1.default.findById(_id);
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Delete competition
    deleteCompetition(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([Competition_1.default.findByIdAndDelete(_id), Round_1.default.deleteMany({ "competitionID": _id }), Stats_1.default.deleteMany({ "competitionID": _id })]);
            }
            catch (err) {
                return err;
            }
            return { success: true };
        });
    }
    // Get competition by name
    getCompetitionByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield Competition_1.default.find({ "name": name });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
}
module.exports = new CompetitionsClass();
//# sourceMappingURL=competitions.js.map