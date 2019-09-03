import React, { Component } from "react";
import './App.css'; 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import CompetitionsList from "./components/dashboard/CompetitionsList";
import Competition from "./components/dashboard/Competition";
import AddCompetition from "./components/dashboard/AddCompetition";
import AddRound from "./components/dashboard/AddRound";
import Account from "./components/dashboard/Account";
import ExchangeToken from "./components/auth/ExchangeToken";
import DisconnectStrava from "./components/auth/DisconnectStrava";
import { ITokenDecoded } from "./common/interfaces";

// Check for token to keep user logged in
if (localStorage.jwtToken) {

    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);

    // Decode token and get user info and exp
    const decoded: any = jwt_decode(token);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    
    if (decoded.exp < currentTime) {

        // Logout user
        store.dispatch(logoutUser());
        
        // Redirect to login
        window.location.href = "./login";
    }
}

class App extends Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navigation />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                        <PrivateRoute exact path="/competitions" component={CompetitionsList} />
                        <PrivateRoute exact path="/competition/:_id" component={Competition} />
                        <PrivateRoute exact path="/addCompetition" component={AddCompetition} />
                        <PrivateRoute exact path="/addRound/:_id" component={AddRound} />
                        <PrivateRoute exact path="/account/:_id" component={Account} />
                        <PrivateRoute exact path="/exchange_token" component={ExchangeToken} />
                        <PrivateRoute exact path="/disconnectStrava" component={DisconnectStrava} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;