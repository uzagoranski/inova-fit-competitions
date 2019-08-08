const express = require("express");
const router = express.Router();
const axios = require('axios');

// Load Stats model
const Stats = require("../../models/Stats");

// Load Leaderboard model
const Leaderboard = require("../../models/Leaderboard");

// @route GET api/leaderboard
// @desc Get all stats from Leaderboard for selected competition
// @access Private
router.get("/:competitionID/:userID", (req, res) => {
    Stats.find({ "competitionID": req.params.competitionID, "userID": req.params.userID })
        .then(data => {
            let name = "";
            let totalTime = 0;
            let averageTime = 0;
            let totalDistance = 0;
            let numberOfRounds = 0;

            for(var i in data) {
              numberOfRounds++;
              totalTime += data[i].elapsedTime;
              totalDistance += data[i].distance;
              name = data[i].name;
            }
            averageTime = Math.round((totalTime / numberOfRounds) * 100) / 100; 
            totalDistance = Math.round(totalDistance * 100) / 100; 

            const newLeaderboard = new Leaderboard({
                userID: req.params.userID,
                name: name,
                competitionID: req.params.competitionID,
                averageTime: averageTime,
                totalDistance: totalDistance,
                numberOfRounds: numberOfRounds   
            });
            newLeaderboard.save().
                then(leaderboard => res.json(leaderboard));  
        }) 
});

// @route GET api/leaderboard
// @desc Get distinct userIDs from 
// @access Private
router.get("/:competitionID", (req, res) => {   

    Leaderboard.deleteMany({ "competitionID": req.params.competitionID })
        .catch(err => console.log(err)) 

    Stats.find({ "competitionID": req.params.competitionID }) 
        .distinct("userID")
        .then(userIDs => {
            for(let i in userIDs) {
                axios.get(`http://localhost:5000/api/leaderboard/${req.params.competitionID}/${userIDs[i]}`)
                    .catch(err => console.log(err)) 
            }
        }) 
   
    setTimeout(finder, 800);

    function finder() {
        Leaderboard.find({ "competitionID": req.params.competitionID })
            .sort({ "averageTime": 1 })
            .then(leaderboards => res.json(leaderboards))
            .catch(err => console.log(err)) 
    }       
});

module.exports = router;