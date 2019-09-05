// Map
const map: any = {
    EmailAlreadyExists: {
        message: {
            email: "Email already exists."
        },
        statusCode: 400
    },
    EmailNotFound: {
        message: {
            email: "Email not found."
        },
        statusCode: 400
    },
    EmailEmpty: {
        message: {
            email: "Email field is required."
        },
        statusCode: 400
    },
    EmailInvalid: {
        message: {
            email: "Email is invalid."
        },
        statusCode: 400
    },
    PasswordIncorrect: {
        message: {
            password: "Password is incorrect."
        },
        statusCode: 400
    },
    PasswordEmpty: {
        message: {
            password: "Password field is required."
        },
        statusCode: 400
    },
    PasswordInvalid: {
        message: {
            password: "Password must be at least 6 characters long."
        },
        statusCode: 400
    },
    Password2Empty: {
        message: {
            password2: "Repeat password field is required."
        },
        statusCode: 400
    },
    PasswordDismatch: {
        message: {
            password2: "Passwords must match."
        },
        statusCode: 400
    },
    UserNotFound: {
        message: {
            email: "User with this email does not exist."
        },
        statusCode: 400
    },
    UserAlreadyExists: {
        message: {
            email: "User with this email already exists."
        },
        statusCode: 400
    },
    NameEmpty: {
        message: {
            name: "Name field is required."
        },
        statusCode: 400
    },
    NameAlreadyExists: {
        message: {
            name: "Name already exists."
        },
        statusCode: 400
    },
    DateEmpty: {
        message: {
            date: "Date field is required."
        },
        statusCode: 400
    },
    StravaSegmentIdEmpty: {
        message: {
            stravaSegmentId: "Strava segment ID is required."
        },
        statusCode: 400
    },
    StravaSegmentIdAlreadyExists: {
        message: {
            stravaSegmentId: "Strava segment ID already exists."
        },
        statusCode: 400
    }
}

class ValidationError extends Error {
    
    title: string;
    statusCode: number;

    constructor(errorCode: string) {
        
        super();

        this.title = errorCode;
        this.message = map[errorCode].message;
        this.statusCode = map[errorCode].statusCode;

    }
}

export default ValidationError;