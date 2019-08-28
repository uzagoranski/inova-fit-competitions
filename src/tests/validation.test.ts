// Sinon mock middleware
import sinon from "sinon";

// Add competition validation & repository
const validateAddCompetitionInput = require( "../validation/addCompetition");
const competitionsRepository = require('../repository/competitions');

// Mock
competitionsRepository.getCompetitionByName = jest.fn();
// Competition test object
const competition = 
    { 
        _id: "5d5fc24b21c99613763837b6",   
        name: 'Test',  
        date: "2019-08-23T10:39:07.534Z",
        __v: 0 
    }

sinon.stub(competitionsRepository, 'getCompetitionByName')
    .returns(Promise.resolve([competition]));

describe('ValidateAddCompetitionInput tests', () => {
    
    test("Test empty name", async () => {

        expect(await validateAddCompetitionInput({ name: '' })).toEqual({"message": {"name": "Name field is required."}, "statusCode": 400});
        
    });

    test("Test taken name", async () => {

        expect(await validateAddCompetitionInput({ name: "Test" })).toEqual({"message": {"name": "Name already exists."}, "statusCode": 400});
        
    });

});

// Add round validation & repository
const validateAddRoundInput = require( "../validation/addRound");
const roundRepository = require('../repository/rounds');

// Mock
roundRepository.getRoundBySegmentId = jest.fn();
// Round test object
const round = 
    { 
        _id: "5d65117dc1a158282aefa9c5",
        date: "2019-08-07T12:22:00.000Z",
        competitionID: '5d5a8d78019db504f493407d', 
        stravaSegmentID: '1481291',     
        __v: 0 
    }

sinon.stub(roundRepository, 'getRoundBySegmentId')
    .returns(Promise.resolve([round]));

describe('ValidateAddRoundInput tests', () => {
   
    test("Test empty date", async () => {

        expect(await validateAddRoundInput({date: "", competitionId: "5d5a8d78019db504f493407d", stravaSegmentId: "444444"})).toEqual({"message": {"date": "Date field is required."}, "statusCode": 400});
        
    });

    test("Test empty Strava segment Id", async () => {

        expect(await validateAddRoundInput({date: "2019-08-06T14:22", competitionId: "5d5a8d78019db504f493407d", stravaSegmentId: ""})).toEqual({"message": {"stravaSegmentId": "Strava segment ID is required."}, "statusCode": 400});
        
    });

    test("Test taken Strava segment Id", async () => {

        expect(await validateAddRoundInput({date: "2019-08-06T14:22", competitionId: "5d5a8d78019db504f493407d", stravaSegmentId: "1481291"})).toEqual({"message": {"stravaSegmentId": "Strava segment ID already exists."}, "statusCode": 400});

    });

});

// Login validation & repository
const validateLoginInput = require( "../validation/login");
const userRepository = require('../repository/users');

// Mock
userRepository.getUserByEmail = jest.fn();
// User test object
const user = 
    { 
        stravaUserID: '42245442',
        stravaAccessToken: '5trjog2zuutjo526lvbn7pcvqssprt1f24p5xla7',
        stravaRefreshToken: '661ijndo3awyk455mcwgiawkbz6ri652rzoohyjh',
        accessTokenExpirationDate: "2019-08-27T14:02:59.301Z",
        _id: "5d5a8f51019db504f4934080",
        name: 'Test Test',
        email: 'test@gmail.com',
        password: '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
        date: "2019-08-19T12:00:17.088Z",
        __v: 0 
    }

sinon.stub(userRepository, 'getUserByEmail')
    .returns(Promise.resolve(user));

describe('ValidateLoginInput tests', () => {
   
    test("Test empty email", async () => {

        expect(await validateLoginInput({email: "", password: "123456"})).toEqual({"message": {"email": "Email field is required."}, "statusCode": 400});
        
    });

    test("Test invalid email", async () => {

        expect(await validateLoginInput({email: "test@gmail.com1", password: "123456"})).toEqual({"message": {"email": "Email is invalid."}, "statusCode": 400});
        
    });
    
    test("Test empty password", async () => {

        expect(await validateLoginInput({email: "test@gmail.com", password: ""})).toEqual({"message": {"password": "Password field is required."}, "statusCode": 400});
        
    });

    test("Test wrong password", async () => {

        expect(await validateLoginInput({email: "test@gmail.com", password: "1234561"})).toEqual({"message": {"password": "Password is incorrect."}, "statusCode": 400});
        
    });

    test("Test user data ok", async () => {

        expect(await validateLoginInput({email: "test@gmail.com", password: "123456"})).toEqual("ok");
        
    });

});

// Register validation
const validateRegisterInput = require( "../validation/register");

describe('ValidateRegisterInput tests', () => {
   
    test("Test empty name", async () => {

        expect(await validateRegisterInput({name: "", email: "", password: "", password2: ""})).toEqual({"message": {"name": "Name field is required."}, "statusCode": 400});
        
    });

    test("Test empty email", async () => {

        expect(await validateRegisterInput({name: "Test", email: "", password: "", password2: ""})).toEqual({"message": {"email": "Email field is required."}, "statusCode": 400});
        
    });

    test("Test invalid email", async () => {

        expect(await validateRegisterInput({name: "Test", email: "test1@gmail.com1", password: "", password2: ""})).toEqual({"message": {"email": "Email is invalid."}, "statusCode": 400});
        
    });

    test("Test empty password 1", async () => {

        expect(await validateRegisterInput({name: "Test", email: "test1@gmail.com", password: "", password2: ""})).toEqual({"message": {"password": "Password field is required."}, "statusCode": 400});
        
    });

    test("Test empty password 2", async () => {

        expect(await validateRegisterInput({name: "Test", email: "test1@gmail.com", password: "123456", password2: ""})).toEqual({"message": {"password": "Repeat password field is required."}, "statusCode": 400});
        
    });

    test("Test invalid password 1 (length)", async () => {

        expect(await validateRegisterInput({name: "Test", email: "test1@gmail.com", password: "1234", password2: "1234"})).toEqual({"message": {"password": "Password must be at least 6 characters long."}, "statusCode": 400});
        
    });

    test("Test password 1 & 2 dismatch", async () => {

        expect(await validateRegisterInput({name: "Test", email: "test1@gmail.com", password: "123456", password2: "1234561"})).toEqual({"message": {"password": "Passwords must match."}, "statusCode": 400});
        
    });

});