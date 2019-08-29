"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const reducers_1 = __importDefault(require("./reducers"));
const initialState = {};
const middleware = [redux_thunk_1.default];
const store = redux_1.createStore(reducers_1.default, initialState, redux_1.compose(redux_1.applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
exports.default = store;
//# sourceMappingURL=store.js.map