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
const User_1 = __importDefault(require("../models/User"));
const Stats_1 = __importDefault(require("../models/Stats"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
class StravaClass {
    // Authorize user with incoming authorization code
    connectStrava(res, _id, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield User_1.default.findByIdAndUpdate(_id, { "stravaUserID": res.data.athlete.id, "stravaAccessToken": res.data.access_token, "stravaRefreshToken": res.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) });
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Deauthorize users Strava account
    disconnectStrava(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                yield Promise.all([User_1.default.findByIdAndUpdate(_id, { "stravaUserID": "", "stravaAccessToken": "", "stravaRefreshToken": "", "accessTokenExpirationDate": "" }), Stats_1.default.deleteMany({ "userID": _id }), Leaderboard_1.default.deleteMany({ "userID": _id })]);
                response = { success: true };
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
    // Refresh authentication token with refresh token
    refreshAuthenticationToken(res, _id, expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                let returnUser = yield User_1.default.findByIdAndUpdate(_id, { "stravaAccessToken": res.data.access_token, "stravaRefreshToken": res.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) });
                response = returnUser.data.access_token;
            }
            catch (err) {
                response = err;
            }
            return response;
        });
    }
}
module.exports = new StravaClass();
//# sourceMappingURL=strava.js.map