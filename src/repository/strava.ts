// Models
import User from '../models/User';
import Stats from '../models/Stats';
import Leaderboard from '../models/Leaderboard';
import { IStravaRefreshToken, IStravaAuthenticate } from '../common/interfaces';

class StravaClass {

    // Authorize user with incoming authorization code
    async connectStrava(res: IStravaAuthenticate, _id: string, expiration: Date) {

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
    async disconnectStrava(_id: string) {

        let response;

        try {
            await Promise.all([User.findByIdAndUpdate(_id, { "stravaUserID": "", "stravaAccessToken": "", "stravaRefreshToken": "", "accessTokenExpirationDate": "" }), Stats.deleteMany({ "userID": _id }), Leaderboard.deleteMany({ "userID": _id })]);

            response = JSON.stringify({ success: true });          
        }
        catch(err) {
            response = err;
        }

        return response;

    }

    // Refresh authentication token with refresh token
    async refreshAuthenticationToken(res: IStravaRefreshToken, _id: string, expiration: Date) {

        let response;

        try {
            let returnUser: any = await User.findByIdAndUpdate(_id, { "stravaAccessToken": res.data.access_token, "stravaRefreshToken": res.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) });
            
            response = returnUser.data.access_token;
            
        }
        catch(err) {
            response = err;
        }

        return response;

    }
}

module.exports = new StravaClass();