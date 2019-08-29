"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.returnErrors = (msg, status, id = null) => {
    return {
        type: types_1.GET_ERRORS,
        payload: { msg, status, id }
    };
};
//# sourceMappingURL=errorActions.js.map