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
// Model
const Competition = require('../models/Competition');
// Full list of all competitions
module.exports.getAllCompetitions = function getAllCompetitions() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield competitionsRepository.getAllCompetitions();
    });
};
// Add competition
module.exports.addCompetition = function addCompetition(body) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            const newCompetition = new Competition({
                name: body.name
            });
            response = yield competitionsRepository.addCompetition(newCompetition);
        }
        catch (err) {
            response = err;
        }
        return response;
    });
};
// Get current competition
module.exports.getSelectedCompetition = function getSelectedCompetition(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield competitionsRepository.getSelectedCompetition(_id);
    });
};
// Delete competition
module.exports.deleteCompetition = function deleteCompetition(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield competitionsRepository.deleteCompetition(_id);
    });
};
//# sourceMappingURL=competitions.js.map