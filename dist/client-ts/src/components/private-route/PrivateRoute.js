"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const PrivateRoute = (_a) => {
    var { component: Component, auth } = _a, rest = __rest(_a, ["component", "auth"]);
    return (<react_router_dom_1.Route {...rest} render={props => auth.isAuthenticated === true ? (<Component {...props}/>) : (<react_router_dom_1.Redirect to="/login"/>)}/>);
};
const mapStateToProps = (state) => ({
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps)(PrivateRoute);
//# sourceMappingURL=PrivateRoute.js.map