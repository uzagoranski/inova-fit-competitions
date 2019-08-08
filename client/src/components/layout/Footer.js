import React, { Component, Fragment } from "react";
import '../../App.css'; 
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";

class Footer extends Component {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    
    render() {
        return (
            <footer>
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
                                { this.props.auth.isAuthenticated ?    
                                <Fragment>
                                    <li>
                                        <a href="/competitions">Competitions </a>
                                    </li>
                                    <li>
                                        <a href={"/account/" + this.props.auth.user.id}>Account</a>
                                    </li>
                                    <li>
                                    <button
                                        style={{
                                        width: "118px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem",
                                        marginRight: "5px"

                                        }}
                                        onClick={this.onLogoutClick}
                                        className="btn btn-large waves-effect waves-light hoverable red accent-3"
                                    >
                                        Logout
                                    </button>     
                                    </li> 
                                </Fragment>    
                                :
                                <Fragment>
                                    <li>
                                        <a href="/login">Login</a>
                                    </li>                                    
                                    <li>
                                        <a href="/register">Register</a>
                                    </li>
                                </Fragment>                                
                                }                               
                            </ul>
                        </div> 
                    </div> 
                </div>
            </footer>
        );
    }
}
  
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Footer);