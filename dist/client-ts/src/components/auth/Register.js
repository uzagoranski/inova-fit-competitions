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
class Register extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onChange = (e) => {
            this.setState({ [e.target.id]: e.target.value });
        };
        this.onSubmit = (e) => {
            e.preventDefault();
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.password2
            };
            this.props.registerUser(newUser, this.props.history);
        };
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }
    componentWillReceiveProps(nextProps) {
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
                            <b>Register</b> below
                        </h4>
                        <p className="grey-text text-darken-1">
                            Already have an account? <react_router_dom_1.Link to="/login">Log in</react_router_dom_1.Link>
                        </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                            <input onChange={this.onChange} value={this.state.name} error={errors.name} id="name" type="text" className={classnames_1.default("", {
            invalid: errors.name
        })}/>
                            <label htmlFor="name">Name</label>
                            <span className="red-text">{errors.name}</span>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email" className={classnames_1.default("", {
            invalid: errors.email
        })}/>
                            <label htmlFor="email">Email</label>
                            <span className="red-text">{errors.email}</span>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className={classnames_1.default("", {
            invalid: errors.password
        })}/>
                            <label htmlFor="password">Password</label>
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" className={classnames_1.default("", {
            invalid: errors.password2
        })}/>
                            <label htmlFor="password2">Confirm Password</label>
                            <span className="red-text">{errors.password2}</span>
                        </div>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <button style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
        }} type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                            Sign up
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
exports.default = react_redux_1.connect(mapStateToProps, { registerUser: authActions_1.registerUser })(react_router_dom_1.withRouter(Register));
//# sourceMappingURL=Register.js.map