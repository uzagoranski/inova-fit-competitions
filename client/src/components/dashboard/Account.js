import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { getUser } from '../../actions/accountActions';
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';

class Account extends Component {

    static propTypes = {
        getUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        logoutUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params._id);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (
            <div className="container" style={{ minHeight: "70vh" }}>
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to
                        home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            Your <b>account</b> 
                        </h4>
                        <p className="grey-text text-darken-1">                
                        Manage your data and connect / disconnect Strava Account
                        </p>
                        </div>
                    </div>
                    <div style={{ marginTop: "2rem" }} className="col s8 offset-s2">
                        <div className="bordered">                                                      
                            <Avatar style={{width: "60px", height: "60px", fontSize:"30px"}} className="avatar">{this.props.auth.user.name.substr(0, 1)}</Avatar><h3 className="line">{this.props.user.users.name}</h3> 
                            <br/><hr/><br/>
                            <h6><i className="propName">EMAIL:</i> {this.props.user.users.email}</h6><br/>
                            <h6><i className="propName">DATE OF REGISTRATION:</i> {this.props.user.users.date}</h6><br/>
                            <h6><i className="propName">ID:</i> {this.props.user.users._id}</h6><br/>
                            <button
                                style={{
                                    width: "auto",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "-135px",
                                    float: "right"                                    
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable red accent-3"
                                >Logout
                            </button>                            
                            {!(this.props.user.users.stravaUserID === "") ? 
                                <a href="/disconnectStrava"
                                style={{
                                    width: "auto",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",                                    
                                    marginTop: "-60px",
                                    float: "right"                                    
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >Disconnect Strava
                                </a>
                                :
                                <a href={`http://www.strava.com/oauth/authorize?client_id=37519&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`}
                                    style={{
                                        width: "auto",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "-60px",
                                        float: "right"                                    
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable green accent-3"
                                    >Connect Strava
                                </a>                        
                            }  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser, getUser }
)(Account);