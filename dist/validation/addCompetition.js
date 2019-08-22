"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = __importDefault(require("is-empty"));
module.exports = function validateAddCompetitionInput(data) {
    let errors;
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !is_empty_1.default(data.name) ? data.name : "";
    // Name checks
    if (validator_1.default.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    return {
        errors,
        isValid: is_empty_1.default(errors)
    };
};
//# sourceMappingURL=addCompetition.js.map