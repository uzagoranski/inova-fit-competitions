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
// Repository
const competitionsRepository = require('../repository/competitions');
class CompetitionsClass {
    // Full list of all competitions
    getAllCompetitions() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield competitionsRepository.getAllCompetitions();
        });
    }
    // Add competition
    addCompetition(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield competitionsRepository.addCompetition(body.name);
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Get current competition
    getSelectedCompetition(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return competitionsRepository.getSelectedCompetition(_id);
        });
    }
    // Delete competition
    deleteCompetition(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return competitionsRepository.deleteCompetition(_id);
        });
    }
    // Get competition by name
    getCompetitionByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return competitionsRepository.getCompetitionByName(name);
        });
    }
}
module.exports = new CompetitionsClass();
//# sourceMappingURL=competitions.js.map