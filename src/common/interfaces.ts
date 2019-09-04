// Registration form
export interface IRegistrationForm {
    name: string,
    email: string,
    password: string,
    password2: string
}

// Login form
export interface ILoginForm {
    email: string,
    password: string
}

// Add competition form
export interface IAddCompetitionForm {
    name: string
}

// Add round form
export interface IAddRoundForm {
    date: string,
    competitionId: string,
    stravaSegmentId: string
}

// Strava auth_token
export interface IStravaAuthenticate {
    data: {
        athlete: {
            id: string,
        },
        access_token: string,
        refresh_token: string
    }
}

// Strava refresh_token
export interface IStravaRefreshToken {
    data: {
        access_token: string,
        refresh_token: string
    }
}

// Leaderboard
export interface ILeaderboard {
    userID: string,
    name: string,
    competitionID: string,
    averageTime: number,
    totalDistance: number,
    numberOfRounds: number
}

// Error middleware
export interface IError {
    type: string,
    message: string,
    statusCode: number
}