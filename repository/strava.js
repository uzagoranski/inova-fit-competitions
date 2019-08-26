// Models
const User = require('../models/User');
const Stats = require('../models/Stats');

// Authorize user with incoming authorization code
module.exports.connectStrava = async function connectStrava(res, _id, expiration) {

    let response;

    try {
        response = await User.findByIdAndUpdate(_id, { "stravaUserID": res.data.athlete.id, "stravaAccessToken": res.data.access_token, "stravaRefreshToken": res.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) });        
    }
    catch(err) {
        response = err;
    }

    return response;
    
}

// Deauthorize users Strava account
module.exports.disconnectStrava = async function disconnectStrava(_id) {

    let response;

    try {
        await Promise.all([User.findByIdAndUpdate(_id, { "stravaUserID": "", "stravaAccessToken": "", "stravaRefreshToken": "", "accessTokenExpirationDate": "" }), Stats.deleteMany({ "userID": _id }), Leaderboard.deleteMany({ "userID": _id })]);

        response = { success: true };          
    }
    catch(err) {
        response = err;
    }

    return response;

}

// Refresh authentication token with refresh token
module.exports.refreshAuthenticationToken = async function refreshAuthenticationToken(res, _id, expiration) {

    let response;

    try {
        let returnUser = await User.findByIdAndUpdate(_id, { "stravaAccessToken": res.data.access_token, "stravaRefreshToken": res.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) });
        
        response = returnUser.data.access_token;
        
    }
    catch(err) {
        response = err;
    }

    return response;

}