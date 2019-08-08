const express = require('express');
const router = express.Router();
const axios = require('axios');

// Load input validation
const validateAddCompetitionInput = require("../../validation/addCompetition");

// Competition model
const Competition = require('../../models/Competition');

// Round model
const Round = require('../../models/Round');

// Stats model
const Stats = require('../../models/Stats');

// Leaderboard model
const Leaderboard = require('../../models/Leaderboard');

// @route   GET api/competitions
// @desc    Get all competitions
// @access  Private
router.get('/', (req, res) => {
    Competition.find()
        .sort({ date: -1 })
        .then(competitions => res.json(competitions))
});

// @route   POST api/competitions
// @desc    Post new competition
// @access  Private
router.post('/', (req, res) => {

    // Form validation
    const { errors, isValid } = validateAddCompetitionInput(req.body);
    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newCompetition = new Competition({
        name: req.body.name
    });
    newCompetition.save()
        .then(competition => res.json(competition));
});

// @route   GET api/competitions
// @desc    Get all competitions
// @access  Private
router.get('/:id', (req, res) => {
    Competition.findById(req.params.id)
        .then(competition => res.json(competition))
});

// @route   DELETE api/competitions
// @desc    Delete a competition
// @access  Private
router.delete('/:id', (req, res) => {
    Competition.findById(req.params.id)
        .then(competition => {

            competition.remove()
                .then(() => res.json({success: true}))
                .catch(err => res.status(404).json({success: false}));

            Round.deleteMany({ "competitionId": req.params.id })
                .catch(err => res.status(404).json({success: false}));

            Stats.deleteMany({ "competitionID": req.params.id })
                .catch(err => res.status(404).json({success: false}));

            Leaderboard.deleteMany({ "competitionID": req.params.id })
                .catch(err => res.status(404).json({success: false}));
        })
});

module.exports = router;