"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Sinon mock middleware
const sinon_1 = __importDefault(require("sinon"));
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
// Strava service & repository
const stravaService = require("../service/strava");
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
        password: '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
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
        password: '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
        date: "2019-08-19T12:00:17.088Z",
        __v: 0
    }
];
describe('Strava service tests', () => {
    test("Test connectStrava", () => __awaiter(this, void 0, void 0, function* () {
        let mock = new axios_mock_adapter_1.default(axios_1.default);
        let mockResponse = {
            data: {
                refresh_token: 'bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm',
                access_token: 'tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr',
                athlete: {
                    id: 44733442
                }
            }
        };
        mock.onPost('https://www.strava.com/oauth/token').reply(200, mockResponse);
        sinon_1.default.stub(stravaRepository, 'connectStrava')
            .returns(Promise.resolve(usersList[1]));
        expect(yield stravaService.connectStrava("authCode", usersList[1]._id)).toEqual({
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
        });
    }));
    test("Test refreshAuthenticationToken", () => __awaiter(this, void 0, void 0, function* () {
        let mock = new axios_mock_adapter_1.default(axios_1.default);
        let mockResponse = {
            data: {
                refresh_token: 'bxkl0y3svkmf3w2sk696m7z65gbu840w288bxtcm',
                access_token: 'tm4ydgst21aycuzlj2ifn7xqx8tn3f6bx7snj3rr',
                athlete: {
                    id: 44733442
                }
            }
        };
        mock.onPost('https://www.strava.com/oauth/token').reply(200, mockResponse);
        sinon_1.default.stub(stravaRepository, 'refreshAuthenticationToken')
            .returns(Promise.resolve(usersList[1]));
        expect(yield stravaService.refreshAuthenticationToken(usersList[1].stravaRefreshToken, usersList[1]._id, new Date())).toEqual({
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
        });
    }));
    test("Test disconnectStrava", () => __awaiter(this, void 0, void 0, function* () {
        let response = { success: false };
        for (let i in usersList) {
            if (usersList[i]._id == "5do91f51x19db504f493st30") {
                usersList[i].stravaAccessToken = "";
                usersList[i].stravaRefreshToken = "";
                usersList[i].accessTokenExpirationDate = "";
                response = { success: true };
                break;
            }
            else {
                continue;
            }
        }
        sinon_1.default.stub(stravaRepository, 'disconnectStrava')
            .returns(Promise.resolve(response));
        expect(yield stravaService.disconnectStrava("5do91f51x19db504f493st30")).toEqual({ success: true });
    }));
});
//# sourceMappingURL=service.strava.test.js.map