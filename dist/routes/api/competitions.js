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
const validateAddCompetitionInput = require("../../validation/addCompetition");
// Service
const competitionsService = require('../../service/competitions');
// @route   GET api/competitions
// @desc    Get all competitions
// @access  Private
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield competitionsService.getAllCompetitions());
}));
// @route   POST api/competitions
// @desc    Add a new competition
// @access  Private
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Form validation
    const { errors, isValid } = validateAddCompetitionInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    res.json(yield (competitionsService.addCompetition(req.body)));
}));
// @route   GET api/competitions/:_id
// @desc    Get selected competition
// @access  Private
router.get('/:_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield (competitionsService.getSelectedCompetition(req.params._id)));
}));
// @route   DELETE api/competitions/:_id
// @desc    Delete a competition
// @access  Private
router.delete('/:_id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.json(yield (competitionsService.deleteCompetition(req.params._id)));
}));
module.exports = router;
//# sourceMappingURL=competitions.js.map