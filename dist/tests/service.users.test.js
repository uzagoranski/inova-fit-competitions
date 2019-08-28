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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Users service & repository
const usersService = require("../service/users");
const usersRepository = require('../repository/users');
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
describe('Users service tests', () => {
    test("Test register", () => __awaiter(this, void 0, void 0, function* () {
        let user = {
            stravaUserID: '',
            stravaAccessToken: '',
            stravaRefreshToken: '',
            accessTokenExpirationDate: "2019-08-27T14:02:59.301Z",
            _id: "5do91f51x19db504f493st30",
            name: 'Test Registration',
            email: 'testRegistration@gmail.com',
            password: '$2a$10$oJBnfAtmu61mPmCK1jU9yeucw4Nh9KGVhGsFSkaEWjJsPaB6y6KC2',
            date: "2019-08-19T12:00:17.088Z",
            __v: 0
        };
        usersList.push(user);
        sinon_1.default.stub(usersRepository, 'register')
            .returns(Promise.resolve(user));
        expect(yield usersService.register({ name: 'Test Registration', email: 'testRegistration@gmail.com', password: '123456' })).not.toBeDefined();
    }));
    test("Test login", () => __awaiter(this, void 0, void 0, function* () {
        let user;
        for (let i in usersList) {
            if (usersList[i].email == "test@gmail.com") {
                user = usersList[i];
                break;
            }
            else {
                continue;
            }
        }
        sinon_1.default.stub(usersRepository, 'getUserByEmail')
            .returns(Promise.resolve(user));
        // Decoding JWT token
        let loginData = yield usersService.login({ email: 'test@gmail.com' });
        let token = loginData.token;
        token = token.split(" ")[1];
        let decoded = jsonwebtoken_1.default.decode(token);
        expect(decoded.name).toBe('Test User');
    }));
    test("Test getCurrentUser", () => __awaiter(this, void 0, void 0, function* () {
        let currentUser;
        for (let i in usersList) {
            if (usersList[i]._id == "5do91f51x19db504f493st30") {
                currentUser = usersList[i];
                break;
            }
            else {
                continue;
            }
        }
        sinon_1.default.stub(usersRepository, 'getUserByID')
            .returns(Promise.resolve(currentUser));
        expect(yield usersService.getCurrentUser("5do91f51x19db504f493st30")).toEqual({
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
        });
    }));
});
//# sourceMappingURL=service.users.test.js.map