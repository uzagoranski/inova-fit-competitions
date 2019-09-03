import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import Media from 'react-media';
import { IAuthProp } from "../../common/interfaces";
import { AppState } from "../../reducers";
import strava from "../../assets/img/strava.png";

// Props
interface ILandingProps {
    auth: IAuthProp;
    logoutUser: () => any;
}

class Landing extends Component<ILandingProps> {

    onLogoutClick = (e: any) => {

        e.preventDefault();
        this.props.logoutUser();

    }

    render() {

        const { user } = this.props.auth;

        return (
            <div style={{ minHeight: "75vh", marginTop:"100px"}} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">            
                        {!this.props.auth.isAuthenticated ? 
                        <Fragment>
                            <h4>
                                <b>Welcome</b> {" "}
                                <span style={{ fontFamily: "monospace" }}>to the platform</span> 
                            </h4>
                            <p className="flow-text grey-text text-darken-1">
                            Manage competitions, connect with Strava or search through data
                            </p>
                            <div className="col s6">
                                <Link
                                to="/register"
                                style={{
                                    width: "auto",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                Register
                                </Link>
                            </div>
                            <Media query="(max-width: 350px)">
                                {matches =>
                                    matches ? 
                                    (
                                    <div className="col s6">
                                        <Link
                                        to="/login"
                                        style={{
                                            width: "auto",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            float: "right"
                                        }}
                                        className="btn btn-large waves-effect green hoverable accent-3"
                                        >
                                        Log In
                                        </Link>
                                    </div>
                                    )
                                    :
                                    (
                                    <div className="col s6">
                                        <Link
                                        to="/login"
                                        style={{
                                            width: "auto",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px"
                                        }}
                                        className="btn btn-large waves-effect green hoverable accent-3"
                                        >
                                        Log In
                                        </Link>
                                    </div>
                                    )
                                }
                            </Media>
                        </Fragment>
                        : 
                        <Fragment>
                            <h4>
                                Hey there, <b>{user.name.split(" ")[0]}</b>
                                <p className="flow-text grey-text text-darken-1">
                                You are logged into Inova IT competition platform.
                                Feel free to manage <a href="/competitions">competitions</a>, rounds and search through leaderboards.
                                This app was made possible by Strava.
                                </p>
                            </h4>
                            <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                                marginRight: "5px"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable red accent-3"
                            >Logout
                            </button> 
                        </Fragment>            
                        }
                        <br/>
                        <img style={{
                        marginTop: "2rem",
                        maxWidth: "90%"
                        }} src={strava} alt="Strava" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Landing);