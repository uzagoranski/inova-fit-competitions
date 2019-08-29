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
const react_redux_1 = require("react-redux");
const authActions_1 = require("../../actions/authActions");
const classnames_1 = __importDefault(require("classnames"));
class Login extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onChange = (e) => {
            this.setState({ [e.target.id]: e.target.value });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            const userData = {
                email: this.state.email,
                password: this.state.password
            };
            this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
        };
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const { errors } = this.state;
        return (<div className="container" style={{ minHeight: "70vh", marginTop: "130px" }}>
            <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
                <react_router_dom_1.Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
                </react_router_dom_1.Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Login</b> below
                </h4>
                <p className="grey-text text-darken-1">
                    Don't have an account? <react_router_dom_1.Link to="/register">Register</react_router_dom_1.Link>
                </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                    <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email" className={classnames_1.default("", {
            invalid: errors.email || errors.emailnotfound
        })}/>
                    <label htmlFor="email">Email</label>
                    <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                    </span>
                </div>
                <div className="input-field col s12">
                    <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className={classnames_1.default("", {
            invalid: errors.password || errors.passwordincorrect
        })}/>
                    <label htmlFor="password">Password</label>
                    <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                    </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
        }} type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Login
                    </button>                
                </div>
                </form>
            </div>
            </div>
        </div>);
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
exports.default = react_redux_1.connect(mapStateToProps, { loginUser: authActions_1.loginUser })(Login);
//# sourceMappingURL=Login.js.map