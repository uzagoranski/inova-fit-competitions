import express from "express";
const router = express.Router();

// Service
const leaderboardService = require('../../service/leaderboard');

// @route GET api/leaderboard/:competitionID
// @desc Reload leaderboard for selected competition
// @access Private
router.get("/:competitionID", async(req, res) => {   

    res.json(await leaderboardService.getLeaderboard(req.params.competitionID));
         
});

module.exports = router;