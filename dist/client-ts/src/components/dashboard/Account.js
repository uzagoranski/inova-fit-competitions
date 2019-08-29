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
const accountActions_1 = require("../../actions/accountActions");
const react_redux_1 = require("react-redux");
const react_media_1 = __importDefault(require("react-media"));
const Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
class Account extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onLogoutClick = (e) => {
            e.preventDefault();
            this.props.logoutUser();
        };
    }
    componentDidMount() {
        this.props.getUser(this.props.match.params._id);
    }
    render() {
        return (<div className="container" style={{ minHeight: "70vh", marginTop: "130px" }}>
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s11 offset-s1">
                        <react_router_dom_1.Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                        </react_router_dom_1.Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            Your <b>account</b> 
                        </h4>
                        <p className="grey-text text-darken-1">                
                        Manage your data and connect / disconnect Strava Account
                        </p>
                        </div>
                    </div>
                    <react_media_1.default query="(max-width: 690px)">
                    {matches => matches ?
            (<div className="col s12" style={{ marginTop: "20px" }}>                        
                            <div className="bordered">                                                      
                                <Avatar_1.default style={{ width: "50px", height: "50px", fontSize: "25px" }} className="avatar">{this.props.auth.user.name.substr(0, 1)}</Avatar_1.default>
                                <h3 className="lineMobile">{this.props.user.users.name}</h3> 
                                <br /><br /><hr /><br />
                                <h6><i className="propName">EMAIL:</i> {this.props.user.users.email}</h6><br />
                                <h6><i className="propName">DATE OF REGISTRATION:</i> {this.props.user.users.date}</h6><br />
                                <h6><i className="propName">ID:</i> {this.props.user.users._id}</h6><br />
                                <div className="centered">
                                    <button style={{
                width: "auto",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginBottom: "20px"
            }} onClick={this.onLogoutClick} className="btn btn-large waves-effect waves-light hoverable red accent-3">Logout
                                    </button> 
                                </div> 
                                <div className="centered">                    
                                    {!(this.props.user.users.stravaUserID === "") ?
                <react_router_dom_1.Link to="/disconnectStrava" style={{
                    width: "auto",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Discon. Strava
                                        </react_router_dom_1.Link>
                :
                    <a href={`http://www.strava.com/oauth/authorize?client_id=37519&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`} style={{
                        width: "auto",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                    }} className="btn btn-large waves-effect waves-light hoverable green accent-3">Connect Strava
                                        </a>}  
                                </div>                                
                            </div>
                        </div>)
            :
                (<div className="col s12" style={{ marginTop: "20px" }}>                        
                            <div className="bordered">                                                      
                                <Avatar_1.default style={{ width: "60px", height: "60px", fontSize: "30px" }} className="avatar">{this.props.auth.user.name.substr(0, 1)}</Avatar_1.default>
                                <h3 className="line">{this.props.user.users.name}</h3> 
                                <br /><hr /><br />
                                <h6><i className="propName">EMAIL:</i> {this.props.user.users.email}</h6><br />
                                <h6><i className="propName">DATE OF REGISTRATION:</i> {this.props.user.users.date}</h6><br />
                                <h6><i className="propName">ID:</i> {this.props.user.users._id}</h6><br />
                                <button style={{
                    width: "auto",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "-135px",
                    float: "right"
                }} onClick={this.onLogoutClick} className="btn btn-large waves-effect waves-light hoverable red accent-3">Logout
                                </button>                            
                                {!(this.props.user.users.stravaUserID === "") ?
                    <react_router_dom_1.Link to="/disconnectStrava" style={{
                        width: "auto",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "-60px",
                        float: "right"
                    }} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Disconnect Strava
                                    </react_router_dom_1.Link>
                    :
                        <a href={`http://www.strava.com/oauth/authorize?client_id=37519&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`} style={{
                            width: "auto",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "-60px",
                            float: "right"
                        }} className="btn btn-large waves-effect waves-light hoverable green accent-3">Connect Strava
                                    </a>}  
                            </div>
                        </div>)}
                    </react_media_1.default>                    
                </div>
            </div>);
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
});
exports.default = react_redux_1.connect(mapStateToProps, { logoutUser: authActions_1.logoutUser, getUser: accountActions_1.getUser })(Account);
//# sourceMappingURL=Account.js.map