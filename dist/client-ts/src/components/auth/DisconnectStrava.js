"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const strava = require("../../static/img/strava.png");
const react_redux_1 = require("react-redux");
const stravaActions_1 = require("../../actions/stravaActions");
class DisconnectStrava extends react_1.Component {
    componentDidMount() {
        this.props.disconnectStrava(this.props.auth.user.id);
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
                        <b>{user.name.split(" ")[0]}... </b> 
                        <p className="flow-text grey-text text-darken-1">
                        You have successfully disconnected your Strava Account. Return to your <react_router_dom_1.Link to={`/account/${user.id}`}>account</react_router_dom_1.Link>.
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
exports.default = react_redux_1.connect(mapStateToProps, { disconnectStrava: stravaActions_1.disconnectStrava })(DisconnectStrava);
//# sourceMappingURL=DisconnectStrava.js.map