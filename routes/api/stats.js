const express = require("express");
const router = express.Router();
const axios = require('axios');

// Load User model
const User = require("../../models/User");

// Load Stats model
const Stats = require("../../models/Stats");

// @route GET api/stats
// @desc Get all users with Strava connection within "New Round" method
// @access Private
router.get("/:competitionID/:segmentID", (req, res) => {
    User.where("stravaUserID").ne("")
    .then(users => {
        for(var i in users) {
            if(users[i].accessTokenExpirationDate <= new Date()) {
                axios.put(`http://localhost:5000/api/strava/refreshToken/${users[i]._id}/${users[i].stravaRefreshToken}`)
                    .then(accessToken => { 
                        axios.get(`https://www.strava.com/api/v3/segments/${req.params.segmentID}/all_efforts?per_page=30`,
                        {
                            headers: {
                                "Authorization": `Bearer ${accessToken.data}`
                            }
                        })
                        .then(response => {                                
                            for(var v in response.data) {
                                if(response.data[v] != null && response.data[v] != "") {
                                    const newStats = new Stats({
                                        userID: users[i]._id,
                                        name: users[i].name,
                                        competitionID: req.params.competitionID,
                                        segmentID: req.params.segmentID,
                                        elapsedTime: response.data[v].elapsed_time,
                                        distance: response.data[v].distance         
                                    });
                                    newStats.save()
                                        .then(stats => res.json(stats));
                                }
                            }                          
                        });
                    })
            } else {
                axios.get(`https://www.strava.com/api/v3/segments/${req.params.segmentID}/all_efforts?per_page=30`,
                    {
                        headers: {
                            "Authorization": `Bearer ${users[i].stravaAccessToken}`
                        }
                    })
                    .then(response => {                                
                        for(var v in response.data) {
                            if(response.data[v] != null && response.data[v] != "") {
                                const newStats = new Stats({
                                    userID: users[i]._id,
                                    name: users[i].name,
                                    competitionID: req.params.competitionID,
                                    segmentID: req.params.segmentID,
                                    elapsedTime: response.data[v].elapsed_time,
                                    distance: response.data[v].distance     
                                });
                                newStats.save()
                                    .then(stats => res.json(stats));
                            }
                        }                          
                    }
                );
            }
        }
    }); 
});

module.exports = router;