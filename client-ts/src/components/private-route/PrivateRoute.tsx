import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { IAuthProp } from "../../common/interfaces";
import { AppState } from "../../reducers";

interface Props {
    auth: IAuthProp;
}

const PrivateRoute = ({ component: Component, auth, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = (state: AppState) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);