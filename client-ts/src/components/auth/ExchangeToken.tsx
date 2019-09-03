import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import queryString from 'query-string'
import { connectStrava } from "../../actions/stravaActions";
import { Location } from "history";
import { IAuthProp } from "../../common/interfaces";
import { AppState } from "../../reducers";
import strava from "../../assets/img/strava.png";

// Props
interface IExchangeTokenProps {

    auth: IAuthProp,
    location: Location,
    connectStrava: (id: string, code: string) => any

}

class ExchangeToken extends Component<IExchangeTokenProps> {

    componentDidMount() {

        const query: any = queryString.parse(this.props.location.search);
        this.props.connectStrava(this.props.auth.user.id, query.code);

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
                                {user.name.split(" ")[0]}, <b>congrats!</b> 
                                <p className="flow-text grey-text text-darken-1">
                                You have successfully connected your account with Strava.
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
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { connectStrava })(ExchangeToken);