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
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    stravaUserID: {
        type: String,
        default: ""
    },
    stravaAccessToken: {
        type: String,
        default: ""
    },
    stravaRefreshToken: {
        type: String,
        default: ""
    },
    accessTokenExpirationDate: {
        type: Date,
        default: ""
    }
});
const User = mongoose_1.default.model('users', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map