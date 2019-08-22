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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Service
const stravaService = require('../../service/strava');
const statsService = require('../../service/stats');
// @route PUT api/strava/:_id/:code
// @desc Authorize user with incoming Strava code
// @access Private
router.put("/:_id/:code", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let response = yield stravaService.connectStrava(req.params.code, req.params._id);
    yield statsService.addStatsUser(req.params._id);
    res.json(response);
}));
// @route PUT api/strava/:_id
// @desc Deauthorize users Strava account
// @access Private
router.put("/:_id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield stravaService.disconnectStrava(req.params._id));
}));
// @route PUT api/strava/refreshToken/:_id/:refresh_token
// @desc Revive access token
// @access Private
router.put("/refreshToken/:_id/:refresh_token", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield stravaService.refreshAuthenticationToken(req.params.refresh_token, req.params._id));
}));
module.exports = router;
//# sourceMappingURL=strava.js.map