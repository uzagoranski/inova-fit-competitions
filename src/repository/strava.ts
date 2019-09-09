// Models
import User from '../models/User';
import Stats from '../models/Stats';
import { IStravaRefreshToken, IStravaAuthenticate } from '../common/interfaces';

class StravaClass {

    // Authorize user with incoming authorization code
    async connectStrava(res: IStravaAuthenticate, _id: string, expiration: Date) {

        return User.findByIdAndUpdate(_id, { "stravaUserID": res.data.athlete.id, "stravaAccessToken": res.data.access_token, "stravaRefreshToken": res.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) });        
               
    }

    // Deauthorize users Strava account
    async disconnectStrava(_id: string) {

        await Promise.all([User.findByIdAndUpdate(_id, { "stravaUserID": "", "stravaAccessToken": "", "stravaRefreshToken": "", "accessTokenExpirationDate": "" }), Stats.deleteMany({ "userID": _id })]);

        return { success: true };          

    }

    // Refresh authentication token with refresh token
    async refreshAuthenticationToken(res: IStravaRefreshToken, _id: string, expiration: Date) {

        let returnUser: any = await User.findByIdAndUpdate(_id, { "stravaAccessToken": res.data.access_token, "stravaRefreshToken": res.data.refresh_token, "accessTokenExpirationDate": expiration.setHours(expiration.getHours() + 6) });
        
        return returnUser.data.access_token;
            
    }
}

export default new StravaClass();