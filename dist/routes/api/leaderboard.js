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
const leaderboardService = require('../../service/leaderboard');
// @route GET api/leaderboard/:competitionID/:userID
// @desc Get all stats from Leaderboard for selected competition
// @access Private
router.get("/:competitionID/:userID", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield leaderboardService.addLeaderboard(req.params.competitionID, req.params.userID));
}));
// @route GET api/leaderboard/:competitionID
// @desc Reload leaderboard for selected competition
// @access Private
router.get("/:competitionID", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield leaderboardService.reloadLeaderboard(req.params.competitionID));
}));
module.exports = router;
//# sourceMappingURL=leaderboard.js.map