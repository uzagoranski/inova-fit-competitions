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
// Dependencies
const axios_1 = __importDefault(require("axios"));
const stravaClientId = require("../config/keys").stravaClientId;
const stravaClientSecret = require("../config/keys").stravaClientSecret;
// Repository
const stravaRepository = require('../repository/strava');
class StravaClass {
    // Authorize user on Strava with incoming authorization code
    connectStrava(authorizationCode, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiration = new Date();
            let tokens = yield axios_1.default.post('https://www.strava.com/oauth/token', {
                client_id: stravaClientId,
                client_secret: stravaClientSecret,
                code: authorizationCode,
                grant_type: "authorization_code"
            });
            return stravaRepository.connectStrava(tokens, _id, expiration);
        });
    }
    // Remove Strava connection
    disconnectStrava(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return stravaRepository.disconnectStrava(_id);
        });
    }
    // Refresh Strava authentication token
    refreshAuthenticationToken(refresh_token, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiration = new Date();
            let tokens = yield axios_1.default.post('https://www.strava.com/oauth/token', {
                client_id: stravaClientId,
                client_secret: stravaClientSecret,
                refresh_token: refresh_token,
                grant_type: "refresh_token"
            });
            return stravaRepository.refreshAuthenticationToken(tokens, _id, expiration);
        });
    }
}
module.exports = new StravaClass();
//# sourceMappingURL=strava.js.map