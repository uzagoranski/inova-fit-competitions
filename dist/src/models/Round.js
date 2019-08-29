"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const RoundSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    competitionID: {
        type: String,
        required: true
    },
    stravaSegmentID: {
        type: String,
        required: true
    }
});
const Round = mongoose_1.default.model('round', RoundSchema);
exports.default = Round;
//# sourceMappingURL=Round.js.map