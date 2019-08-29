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
const strava = require("../../static/img/strava.png");
const react_redux_1 = require("react-redux");
const query_string_1 = __importDefault(require("query-string"));
const stravaActions_1 = require("../../actions/stravaActions");
class ExchangeToken extends react_1.Component {
    componentDidMount() {
        const query = query_string_1.default.parse(this.props.location.search);
        this.props.connectStrava(this.props.auth.user.id, query.code);
    }
    render() {
        const { user } = this.props.auth;
        return (<div style={{ minHeight: "75vh", marginTop: "130px" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align">  
                <react_router_dom_1.Link to={"/account/" + user.id} className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to
                    account
                </react_router_dom_1.Link>          
                <react_1.Fragment>
                <h4>
                    {user.name.split(" ")[0]}, <b>congrats!</b> 
                    <p className="flow-text grey-text text-darken-1">
                    You have successfully connected your account with Strava.
                    </p>
                </h4>              
            </react_1.Fragment>        
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
exports.default = react_redux_1.connect(mapStateToProps, { connectStrava: stravaActions_1.connectStrava })(ExchangeToken);
//# sourceMappingURL=ExchangeToken.js.map