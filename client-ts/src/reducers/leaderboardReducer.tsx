import { GET_LEADERBOARD, LEADERBOARD_LOADING } from '../actions/types';
import { IReducerAction } from '../common/interfaces';

const initialState: any = {
    leaderboards: [],
    loading: false
}

export default function(state = initialState, action: any) {
    switch(action.type) {
        case GET_LEADERBOARD:
            return {
                ...state,
                leaderboards: action.payload,
                loading: false
            }
        case LEADERBOARD_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}