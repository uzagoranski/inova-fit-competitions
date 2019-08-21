const express = require('express');
const router = express.Router();

// Load input validation
const validateAddRoundInput = require("../../validation/addRound");

// Service
const roundsService = require('../../service/rounds');

// @route   GET api/rounds/:_id
// @desc    Get all rounds from selected competition
// @access  Private
router.get('/:_id', async(req, res) => {

    res.json(await roundsService.getRounds(req.params._id));

});

// @route   POST api/rounds
// @desc    Post a new round
// @access  Private
router.post('/', async(req, res) => {

    // Form validation
    const { errors, isValid } = validateAddRoundInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    res.json(await roundsService.addRound(req.body));

});

// @route   DELETE api/rounds/:_id
// @desc    Delete a round
// @access  Private
router.delete('/:_id', async(req, res) => {
    
    res.json(await roundsService.deleteRound(req.params._id));

});

module.exports = router;