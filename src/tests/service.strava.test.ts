// Sinon mock middleware
import sinon from "sinon";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Strava service & repository
const stravaService = require( "../service/strava");
const stravaRepository = require('../repository/strava');

// UsersList test object
const usersList = [
    { 
        stravaUserID: '98502547',
        stravaAccessToken: 'omqhhq23rgk9ntbinj5yymq4u50e344e6g01702u',
        stravaRefreshToken: 'zyzmprl6m8f1ha8xtjal2xlozm77b0m0pszq45hd',
        accessTokenExpirationDate: "2019-08-27T14:02:59.301Z",
        _id: "5db51fo951x1904ft30d493s",
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password:
            '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
        date: "2019-08-19T12:00:17.088Z",
        __v: 0 
    },
    { 
        stravaUserID: '87492338',
        stravaAccessToken: 'tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr',
        stravaRefreshToken: 'bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm',
        accessTokenExpirationDate: "2019-08-27T14:02:59.301Z",
        _id: "5do91f51x19db504f493st30",
        name: 'Test User',
        email: 'test@gmail.com',
        password:
            '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
        date: "2019-08-19T12:00:17.088Z",
        __v: 0 
    }
]

describe('Strava service tests', () => {
    
    test("Test connectStrava", async () => {

        let mock = new MockAdapter(axios);

        let mockResponse = { 
            data: { 
                refresh_token: 'bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm',
                access_token: 'tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr',
                athlete:
                    { 
                        id: 44733442                                
                    } 
            }
        }

        mock.onPost('https://www.strava.com/oauth/token').reply(200, mockResponse);

        sinon.stub(stravaRepository, 'connectStrava')
            .returns(Promise.resolve(usersList[1]));

        expect(await stravaService.connectStrava("authCode", usersList[1]._id)).toEqual(
            {   
                "__v": 0, 
                "_id": "5do91f51x19db504f493st30", 
                "accessTokenExpirationDate": "2019-08-27T14:02:59.301Z",
                "date": "2019-08-19T12:00:17.088Z", 
                "email": "test@gmail.com", 
                "name": "Test User", 
                "password": "$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2", 
                "stravaAccessToken": "tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr", 
                "stravaRefreshToken": "bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm", 
                "stravaUserID": "87492338"
            }
        );

    });

    test("Test refreshAuthenticationToken", async () => {

        let mock = new MockAdapter(axios);

        let mockResponse = { 
            data: { 
                refresh_token: 'bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm',
                access_token: 'tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr',
                athlete:
                    { 
                        id: 44733442                                
                    } 
            }
        }

        mock.onPost('https://www.strava.com/oauth/token').reply(200, mockResponse);

        sinon.stub(stravaRepository, 'refreshAuthenticationToken')
            .returns(Promise.resolve(usersList[1]));

        expect(await stravaService.refreshAuthenticationToken(usersList[1].stravaRefreshToken, usersList[1]._id, new Date())).toEqual(
            {   
                "__v": 0, 
                "_id": "5do91f51x19db504f493st30", 
                "accessTokenExpirationDate": "2019-08-27T14:02:59.301Z",
                "date": "2019-08-19T12:00:17.088Z", 
                "email": "test@gmail.com", 
                "name": "Test User", 
                "password": "$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2", 
                "stravaAccessToken": "tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr", 
                "stravaRefreshToken": "bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm", 
                "stravaUserID": "87492338"
            }
        );

    });

    test("Test disconnectStrava", async () => {

        let response = { success: false };

        for(let i in usersList) {
            if(usersList[i]._id == "5do91f51x19db504f493st30") {

                usersList[i].stravaAccessToken = "";
                usersList[i].stravaRefreshToken = "";
                usersList[i].accessTokenExpirationDate = "";

                response = { success: true };

                break;
            } else {
                continue;
            }
        }

        sinon.stub(stravaRepository, 'disconnectStrava')
            .returns(Promise.resolve(response));

        expect(await stravaService.disconnectStrava("5do91f51x19db504f493st30")).toEqual({ success: true });
                 
    });

});