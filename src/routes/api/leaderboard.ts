// Dependencies
import express from 'express';
import leaderboardService from '../../service/leaderboard';

const router = express.Router();

// @route GET api/leaderboard/:competitionID
// @desc Reload leaderboard for selected competition
// @access Private
router.get('/:competitionID', async (req, res) => {

    res.json(await leaderboardService.getLeaderboard(req.params.competitionID));

});

export default router;
