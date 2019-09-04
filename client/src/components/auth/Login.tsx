import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { History } from "history";
import { ILoginForm } from "../../../../src/common/interfaces";
import { IAuthProp } from "../../common/interfaces";
import { AppState } from "../../reducers";
import { Input } from "reactstrap";

// Props
interface ILoginProps {

    auth: IAuthProp,
    history: History,
    errors: {
        email: string,
        password: string
    },
    loginUser: (userData: ILoginForm) => any
    
}

// State
interface ILoginState {

    email: string,
    password: string,
    errors: {
        email: string,
        password: string
    },
    [x: number]: string

}

class Login extends Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {

        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {
                email: "",
                password: ""
            }
        }
    }

    componentDidMount() {
        
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps: ILoginProps) {

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/"); 
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = (e: any) => {

        this.setState({ [e.target.id]: e.target.value });

    }

    onSubmit = (e: any) => {

        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData); 
        // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    }

    render() {

        const { errors } = this.state;
        return (
            <div className="container" style={{ minHeight: "70vh", marginTop:"130px" }}>
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <Input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                                className={classnames("", {
                                  invalid: errors.email
                                })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                            {errors.email}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <Input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password
                                })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                {errors.password}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                Login
                                </button>                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);