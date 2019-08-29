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
const authActions_1 = require("../../actions/authActions");
const react_redux_1 = require("react-redux");
class Footer extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onLogoutClick = (e) => {
            e.preventDefault();
            this.props.logoutUser();
        };
    }
    render() {
        return (<footer>
                <div className="container">
                    <div className="row">        
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <span className="logo">INOVA IT competition platform</span>
                        </div>                    
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul className="menu">
                                <span>Menu</span> 
                                    <li>
                                        <a href="/">Home </a>
                                    </li>  
                                {this.props.auth.isAuthenticated ?
            <react_1.Fragment>
                                    <li>
                                        <react_router_dom_1.Link to="/competitions">Competitions </react_router_dom_1.Link>
                                    </li>
                                    <li>
                                        <react_router_dom_1.Link to={"/account/" + this.props.auth.user.id}>Account</react_router_dom_1.Link>
                                    </li>
                                    <li>
                                    <button style={{
                width: "auto",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginRight: "5px"
            }} onClick={this.onLogoutClick} className="btn btn-large waves-effect waves-light hoverable red accent-3">
                                        Logout
                                    </button>     
                                    </li> 
                                </react_1.Fragment>
            :
                <react_1.Fragment>
                                    <li>
                                        <react_router_dom_1.Link to="/login">Login</react_router_dom_1.Link>
                                    </li>                                    
                                    <li>
                                        <react_router_dom_1.Link to="/register">Register</react_router_dom_1.Link>
                                    </li>
                                </react_1.Fragment>}                               
                            </ul>
                        </div> 
                    </div> 
                </div>
            </footer>);
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});
exports.default = react_redux_1.connect(mapStateToProps, { logoutUser: authActions_1.logoutUser })(Footer);
//# sourceMappingURL=Footer.js.map