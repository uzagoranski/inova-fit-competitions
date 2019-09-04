import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import { Dispatch } from "redux";
import { ILoginForm, IRegistrationForm } from "../../../src/common/interfaces";
import { ITokenDecoded } from "../common/interfaces";
import { History } from "history";

// Register User
export const registerUser = (userData: IRegistrationForm, history: History) => async(dispatch: Dispatch) => {

    try {

        await axios.post("/api/users/register", userData);
        history.push("/login"); // re-direct to login on successful register

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

// Login - get user token
export const loginUser = (userData: ILoginForm) => async(dispatch: Dispatch) => {

    try {

        let res = await axios.post("/api/users/login", userData);

        // Save to localStorage
        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);

        // Set token to Auth header
        setAuthToken(token);

        // Decode token to get user data
        const decoded: ITokenDecoded = jwt_decode(token);

        // Set current user
        dispatch(setCurrentUser(decoded));

    } catch (err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

// Set logged in user
export const setCurrentUser = (decoded: (ITokenDecoded | {})) => {

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// User loading
export const setUserLoading = () => {
    
    return {
        type: USER_LOADING
    }
}

// Log user out
export const logoutUser = () : any => (dispatch: Dispatch) => {

    // Remove token from local storage
    localStorage.removeItem("jwtToken");

    // Remove auth header for future requests
    setAuthToken("");

    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}