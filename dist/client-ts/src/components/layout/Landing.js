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
const react_router_dom_1 = require("react-router-dom");
const authActions_1 = require("../../actions/authActions");
const react_redux_1 = require("react-redux");
const react_media_1 = __importDefault(require("react-media"));
const strava = require("../../static/img/strava.png");
class Landing extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onLogoutClick = (e) => {
            e.preventDefault();
            this.props.logoutUser();
        };
    }
    render() {
        const { user } = this.props.auth;
        return (<div style={{ minHeight: "75vh", marginTop: "100px" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">            
            {!this.props.auth.isAuthenticated ?
            <react_1.Fragment>
              <h4>
                <b>Welcome</b> {" "}
                <span style={{ fontFamily: "monospace" }}>to the platform</span> 
              </h4>
              <p className="flow-text grey-text text-darken-1">
              Manage competitions, connect with Strava or search through data
              </p>
              <div className="col s6">
                <react_router_dom_1.Link to="/register" style={{
                width: "auto",
                borderRadius: "3px",
                letterSpacing: "1.5px"
            }} className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                  Register
                </react_router_dom_1.Link>
              </div>
              <react_media_1.default query="(max-width: 350px)">
                  {matches => matches ?
                (<div className="col s6">
                        <react_router_dom_1.Link to="/login" style={{
                    width: "auto",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    float: "right"
                }} className="btn btn-large waves-effect green hoverable accent-3">
                          Log In
                        </react_router_dom_1.Link>
                      </div>)
                :
                    (<div className="col s6">
                        <react_router_dom_1.Link to="/login" style={{
                        width: "auto",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                    }} className="btn btn-large waves-effect green hoverable accent-3">
                          Log In
                        </react_router_dom_1.Link>
                      </div>)}
              </react_media_1.default>
            </react_1.Fragment>
            :
                <react_1.Fragment>
              <h4>
                Hey there, <b>{user.name.split(" ")[0]}</b>
                <p className="flow-text grey-text text-darken-1">
                  You are logged into Inova IT competition platform.
                  Feel free to manage <a href="/competitions">competitions</a>, rounds and search through leaderboards.
                  This app was made possible by Strava.
                </p>
              </h4>
              <button style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginRight: "5px"
                }} onClick={this.onLogoutClick} className="btn btn-large waves-effect waves-light hoverable red accent-3">Logout
            </button> 
          </react_1.Fragment>}
            <br />
            <img style={{
            marginTop: "2rem",
            maxWidth: "90%"
        }} src={strava} alt="Strava"/>
          </div>
        </div>
      </div>);
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps, { logoutUser: authActions_1.logoutUser })(Landing);
//# sourceMappingURL=Landing.js.map