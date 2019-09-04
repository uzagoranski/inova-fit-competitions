// Decoded token
export interface ITokenDecoded {
    iat: number,
    exp: number,
    id: string,
    name: string
}

///////////////////////////////////////////////////////////
//                                                       //
//                REDUX   PROPS   SECTION                //
//                                                       //
///////////////////////////////////////////////////////////

// Auth props
export interface IAuthProp {
    isAuthenticated: boolean,
    user: {
        id: string,
        name: string,
        iat: number,
        exp: number
    },
    loading: boolean
}

// User props
export interface IUserProp {
    users: {
        stravaUserID: string,
        stravaAccessToken: string,
        stravaRefreshToken: string,
        accessTokenExpirationDate: string,
        _id: string,
        name: string,
        email: string,
        password: string,
        date: string,
        __v: number
    },
    loading: boolean
}

// Competition props
export interface ICompetitionProp {
    competitions: {
        _id: string,
        name: string,
        date: string,
        __v: number
    },
    loading: boolean
}

// Round props
export interface IRoundProp {
    rounds: {
        [index: number]: {
            _id: string,
            date: string,
            competitionID: string,
            stravaSegmentID: string,
            __v: number,
        }
    },
    loading: boolean
}

// Leaderboard props
export interface ILeaderboardProp {
    leaderboards: {
        [index: number]: {
            userID: string,
            name: string,
            competitionID: string,
            averageTime: number,
            totalDistance: number,
            numberOfRounds: number
        }
    },
    loading: boolean
}