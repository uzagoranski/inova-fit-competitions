"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
const competitionsRepository = require('../repository/competitions');
module.exports = function validateAddCompetitionInput(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find competition by name
        let competition = yield competitionsRepository.getCompetitionByName(data.name);
        // Convert empty fields to an empty string so we can use validator functions
        data.name = !is_empty_1.default(data.name) ? data.name : "";
        // Name checks
        if (validator_1.default.isEmpty(data.name)) {
            try {
                throw new errors_1.default("NameEmpty");
            }
            catch (err) {
                return err;
            }
            // Competition checks
        }
        else if (competition[0]) {
            try {
                throw new errors_1.default("NameAlreadyExists");
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
//# sourceMappingURL=addCompetition.js.map