const express = require('express');
const router = express.Router();
const axios = require('axios');

// Load input validation
const validateAddRoundInput = require("../../validation/addRound");

// Round model
const Round = require('../../models/Round');

// Stats model
const Stats = require('../../models/Stats');

// @route   GET api/rounds
// @desc    Get all rounds from selected competition
// @access  Private
router.get('/:_id', (req, res) => {
    Round.find({ "competitionId": req.params._id })
        .then(rounds => res.json(rounds))
        .catch(err => res.status(404).json({success: false}));
});

// @route   POST api/rounds
// @desc    Post a new round
// @access  Private
router.post('/', (req, res) => {

     // Form validation
     const { errors, isValid } = validateAddRoundInput(req.body);

     // Check validation
     if (!isValid) {
       return res.status(400).json(errors);
     }

    const newRound = new Round({
        date: req.body.date,
        competitionId: req.body.competitionId,
        stravaSegmentId: req.body.stravaSegmentId
    });
    newRound.save().then(round => {
        axios.get(`http://localhost:5000/api/stats/${round.competitionId}/${round.stravaSegmentId}`)
            .catch(err => res.status(404).json({success: false}));   
            
        res.json(round)
    });
});

// @route   DELETE api/rounds
// @desc    Delete a round
// @access  Private
router.delete('/:id', (req, res) => {
    Round.findById(req.params.id)
        .then(round => {

            let competitionID = round.competitionId;
            let stravaSegmentID = round.stravaSegmentId;

            round.remove()
                .then(() => res.json({success: true}))
                .catch(err => res.status(404).json({success: false}));

            Stats.deleteMany({ "competitionID": competitionID, "segmentID": stravaSegmentID })
                .catch(err => res.status(404).json({success: false}));
        })
});

module.exports = router;