"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
    leaderboards: [],
    loading: false
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.GET_LEADERBOARD:
            return Object.assign({}, state, { leaderboards: action.payload, loading: false });
        case types_1.LEADERBOARD_LOADING:
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=leaderboardReducer.js.map