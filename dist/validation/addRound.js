"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const is_empty_1 = __importDefault(require("is-empty"));
module.exports = function validateAddRoundInput(data) {
    let errors;
    // Convert empty fields to an empty string so we can use validator functions
    data.date = !is_empty_1.default(data.date) ? data.date : "";
    data.stravaSegmentId = !is_empty_1.default(data.stravaSegmentId) ? data.stravaSegmentId : "";
    // Date checks
    if (validator_1.default.isEmpty(data.date)) {
        errors.date = "Date field is required";
    }
    // Id checks
    if (validator_1.default.isEmpty(data.stravaSegmentId)) {
        errors.stravaSegmentId = "Strava Segment ID field is required";
    }
    return {
        errors,
        isValid: is_empty_1.default(errors)
    };
};
//# sourceMappingURL=addRound.js.map