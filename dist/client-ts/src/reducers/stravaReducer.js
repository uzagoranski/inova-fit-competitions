"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
    strava: [],
    loading: false
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.CONNECT_STRAVA:
            return Object.assign({}, state, { strava: action.payload, loading: true });
        case types_1.DISCONNECT_STRAVA:
            return Object.assign({}, state, { strava: action.payload, loading: true });
        case types_1.REFRESH_TOKEN:
            return Object.assign({}, state, { strava: action.payload, loading: true });
        case types_1.USER_LOADING:
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=stravaReducer.js.map