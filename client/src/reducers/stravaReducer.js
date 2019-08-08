import { USER_LOADING, REFRESH_TOKEN, CONNECT_STRAVA, DISCONNECT_STRAVA } from '../actions/types';

const initialState = {
    strava: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {              
        case CONNECT_STRAVA:
            return {
                ...state,
                strava: action.payload,
                loading: true
            }
        case DISCONNECT_STRAVA:
            return {
                ...state,
                strava: action.payload,
                loading: true
            }
        case REFRESH_TOKEN:
            return {
                ...state,
                strava: action.payload,
                loading: true
            }
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}