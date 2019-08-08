import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import strava from "../../static/img/strava.png";
import { connect } from "react-redux";
import queryString from 'query-string'
import { connectStrava } from "../../actions/stravaActions";

class ExchangeToken extends Component {

  static propTypes = {
      auth: PropTypes.object.isRequired,
      connectStrava: PropTypes.func.isRequired,
      strava: PropTypes.object.isRequired
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    this.props.connectStrava(this.props.auth.user.id, query.code);
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ minHeight: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">  
            <Link to={"/account/" + user.id } className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                account
            </Link>          
            <Fragment>
              <h4>
                {user.name.split(" ")[0]}, <b>congrats!</b> 
                <p className="flow-text grey-text text-darken-1">
                  You have successfully connected your account with Strava.
                </p>
              </h4>              
          </Fragment>        
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
        auth: state.auth,
        strava: state.strava
    });
  
  export default connect(
  mapStateToProps,
  { connectStrava }
  )(ExchangeToken);