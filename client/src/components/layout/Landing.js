import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import strava from "../../static/img/strava.png";

class Landing extends Component {

  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ minHeight: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">            
            {!this.props.auth.isAuthenticated ? 
            <Fragment>
              <h4>
                <b>Inova IT</b> {" "}
                <span style={{ fontFamily: "monospace" }}>competition platform</span> 
              </h4>
              <p className="flow-text grey-text text-darken-1">
              Manage competitions, connect with Strava or search through data
              </p>
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect orange hoverable black-text accent-3"
                >
                  Log In
                </Link>
              </div>
            </Fragment>
            : 
            <Fragment>
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
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
              maxWidth: "1000px"
            }} src={strava} alt="Strava" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing);