import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import strava from "../../static/img/strava.png";
import { connect } from "react-redux";
import { disconnectStrava } from "../../actions/stravaActions";

class DisconnectStrava extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    disconnectStrava: PropTypes.func.isRequired,
    strava: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.disconnectStrava(this.props.auth.user.id);
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ minHeight: "75vh", marginTop: "130px" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">  
            <Link to={"/account/" + user.id } className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                account
            </Link>          
            <Fragment>
              <h4>
                <b>{user.name.split(" ")[0]}... </b> 
                <p className="flow-text grey-text text-darken-1">
                  You have successfully disconnected your Strava Account. Return to your <Link to={`/account/${user.id}`}>account</Link>.
                </p>
              </h4>              
          </Fragment>        
            <br/>
            <img style={{
              marginTop: "2rem",
              maxWidth: "90%"
            }} src={strava} alt="Strava" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    strava: state.strava
  });
  
export default connect(
mapStateToProps,
{ disconnectStrava }
)(DisconnectStrava);