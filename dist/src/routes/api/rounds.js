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
// Load input validation
const validateAddRoundInput = require("../../validation/addRound");
// Service
const roundsService = require('../../service/rounds');
// @route   GET api/rounds/:_id
// @desc    Get all rounds from selected competition
// @access  Private
router.get('/:_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield roundsService.getRounds(req.params._id));
}));
// @route   POST api/rounds
// @desc    Post a new round
// @access  Private
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Form validation
    let validation = yield validateAddRoundInput(req.body);
    if (validation == "ok") {
        res.json(yield (roundsService.addRound(req.body)));
    }
    else {
        res.status(validation.statusCode).json(validation.message);
    }
}));
// @route   DELETE api/rounds/:_id
// @desc    Delete a round
// @access  Private
router.delete('/:_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield roundsService.deleteRound(req.params._id));
}));
module.exports = router;
//# sourceMappingURL=rounds.js.map