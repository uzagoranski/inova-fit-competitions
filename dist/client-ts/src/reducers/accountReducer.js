"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const initialState = {
    users: [],
    loading: false
};
function default_1(state = initialState, action) {
    switch (action.type) {
        case types_1.GET_USER:
            return Object.assign({}, state, { users: action.payload, loading: false });
        case types_1.USER_LOADING:
            return Object.assign({}, state, { loading: true });
        default:
            return state;
    }
}
exports.default = default_1;
//# sourceMappingURL=accountReducer.js.map