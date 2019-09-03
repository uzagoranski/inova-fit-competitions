import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { IAuthProp } from "../../common/interfaces";
import { AppState } from "../../reducers";

// Props
interface IFooterProps {

    auth: IAuthProp,
    logoutUser: () => any

}

class Footer extends Component<IFooterProps> {

    onLogoutClick = (e: any) => {

        e.preventDefault();
        this.props.logoutUser();

    }
    
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
                                        <Link to="/competitions">Competitions </Link>
                                    </li>
                                    <li>
                                        <Link to={"/account/" + this.props.auth.user.id}>Account</Link>
                                    </li>
                                    <li>
                                    <button
                                        style={{
                                        width: "auto",
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
                                        <Link to="/login">Login</Link>
                                    </li>                                    
                                    <li>
                                        <Link to="/register">Register</Link>
                                    </li>
                                </Fragment>                                
                                }                               
                            </ul>
                        </div> 
                    </div> 
                </div>
            </footer>
        )
    }
}
  
const mapStateToProps = (state: AppState) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Footer);