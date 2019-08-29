"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const setAuthToken_1 = __importDefault(require("./utils/setAuthToken"));
const authActions_1 = require("./actions/authActions");
const react_redux_1 = require("react-redux");
const store_1 = __importDefault(require("./store"));
const Navigation_1 = __importDefault(require("./components/layout/Navigation"));
const Footer_1 = __importDefault(require("./components/layout/Footer"));
const Landing_1 = __importDefault(require("./components/layout/Landing"));
const Register_1 = __importDefault(require("./components/auth/Register"));
const Login_1 = __importDefault(require("./components/auth/Login"));
const PrivateRoute_1 = __importDefault(require("./components/private-route/PrivateRoute"));
const CompetitionsList_1 = __importDefault(require("./components/dashboard/CompetitionsList"));
const Competition_1 = __importDefault(require("./components/dashboard/Competition"));
const AddCompetition_1 = __importDefault(require("./components/dashboard/AddCompetition"));
const AddRound_1 = __importDefault(require("./components/dashboard/AddRound"));
const Account_1 = __importDefault(require("./components/dashboard/Account"));
const ExchangeToken_1 = __importDefault(require("./components/auth/ExchangeToken"));
const DisconnectStrava_1 = __importDefault(require("./components/auth/DisconnectStrava"));
// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken_1.default(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode_1.default(token);
    // Set user and isAuthenticated
    store_1.default.dispatch(authActions_1.setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store_1.default.dispatch(authActions_1.logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}
class App extends react_1.Component {
    render() {
        return (<react_redux_1.Provider store={store_1.default}>
        <react_router_dom_1.BrowserRouter>
          <div className="App">
            <Navigation_1.default />
            <react_router_dom_1.Route exact path="/" component={Landing_1.default}/>
            <react_router_dom_1.Route exact path="/register" component={Register_1.default}/>
            <react_router_dom_1.Route exact path="/login" component={Login_1.default}/>
            <react_router_dom_1.Switch>
              <PrivateRoute_1.default exact path="/competitions" component={CompetitionsList_1.default}/>
              <PrivateRoute_1.default exact path="/competition/:_id" component={Competition_1.default}/>
              <PrivateRoute_1.default exact path="/addCompetition" component={AddCompetition_1.default}/>
              <PrivateRoute_1.default exact path="/addRound/:_id" component={AddRound_1.default}/>
              <PrivateRoute_1.default exact path="/account/:_id" component={Account_1.default}/>
              <PrivateRoute_1.default exact path="/exchange_token" component={ExchangeToken_1.default}/>
              <PrivateRoute_1.default exact path="/disconnectStrava" component={DisconnectStrava_1.default}/>
            </react_router_dom_1.Switch>
            <Footer_1.default />
          </div>
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>);
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map