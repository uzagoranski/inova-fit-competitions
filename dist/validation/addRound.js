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
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = __importDefault(require("is-empty"));
const errors_1 = __importDefault(require("../middleware/errors"));
// Repository
const roundRepository = require('../repository/rounds');
module.exports = function validateAddRoundInput(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find competition by name
        let round = yield roundRepository.getRoundBySegmentId(data.competitionId, data.stravaSegmentId);
        // Convert empty fields to an empty string so we can use validator functions
        data.date = !is_empty_1.default(data.date) ? data.date : "";
        data.stravaSegmentId = !is_empty_1.default(data.stravaSegmentId) ? data.stravaSegmentId : "";
        // Date checks
        if (validator_1.default.isEmpty(data.date)) {
            try {
                throw new errors_1.default("DateEmpty");
            }
            catch (err) {
                return err;
            }
            // Id checks
        }
        else if (validator_1.default.isEmpty(data.stravaSegmentId)) {
            try {
                throw new errors_1.default("StravaSegmentIdEmpty");
            }
            catch (err) {
                return err;
            }
        }
        else if (round[0]) {
            try {
                throw new errors_1.default("StravaSegmentIdAlreadyExists");
            }
            catch (err) {
                return err;
            }
        }
        else {
            return "ok";
        }
    });
};
//# sourceMappingURL=addRound.js.map