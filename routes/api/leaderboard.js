const express = require("express");
const router = express.Router();

// Service
const leaderboardService = require('../../service/leaderboard');

// @route GET api/leaderboard/:competitionID/:userID
// @desc Get all stats from Leaderboard for selected competition
// @access Private
router.get("/:competitionID/:userID", async(req, res) => {

    res.json(await leaderboardService.addLeaderboard(req.params.competitionID, req.params.userID));
    
});

// @route GET api/leaderboard/:competitionID
// @desc Reload leaderboard for selected competition
// @access Private
router.get("/:competitionID", async(req, res) => {   

    res.json(await leaderboardService.reloadLeaderboard(req.params.competitionID));
         
});

module.exports = router;