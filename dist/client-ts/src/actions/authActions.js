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
const axios_1 = __importDefault(require("axios"));
const setAuthToken_1 = __importDefault(require("../utils/setAuthToken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const types_1 = require("./types");
// Register User
exports.registerUser = (userData, history) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield axios_1.default.post("/api/users/register", userData);
        history.push("/login"); // re-direct to login on successful register
    }
    catch (err) {
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    }
});
// Login - get user token
exports.loginUser = (userData) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        let res = yield axios_1.default.post("/api/users/login", userData);
        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken_1.default(token);
        // Decode token to get user data
        const decoded = jwt_decode_1.default(token);
        // Set current user
        dispatch(exports.setCurrentUser(decoded));
    }
    catch (err) {
        dispatch({
            type: types_1.GET_ERRORS,
            payload: err.response.data
        });
    }
});
// Set logged in user
exports.setCurrentUser = (decoded) => {
    return {
        type: types_1.SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
exports.setUserLoading = () => {
    return {
        type: types_1.USER_LOADING
    };
};
// Log user out
exports.logoutUser = () => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken_1.default(null);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(exports.setCurrentUser(null));
};
//# sourceMappingURL=authActions.js.map