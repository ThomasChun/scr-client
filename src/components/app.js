import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import {refreshAuthToken} from '../actions/auth';
import Admin from './admin';
import Baseball from './baseball/baseball';
import Baseball2019 from './baseball/baseball-2019';
import Baseball2018 from './baseball/baseball-2018';
import Baseball2017 from './baseball/baseball-2017';
import Baseball2016 from './baseball/baseball-2016';
import Baseball2015 from './baseball/baseball-2015';
import Baseball2014 from './baseball/baseball-2014';
import Baseball2013 from './baseball/baseball-2013';
import Baseball2012 from './baseball/baseball-2012';
import Baseball2011 from './baseball/baseball-2011';
import Baseball2010Older from './baseball/baseball-2010-older';
import ProductPage from './product-page';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationPage} />
                <Route exact path="/baseball" component={Baseball} />
                <Route exact path="/baseball-2019" component={Baseball2019} />
                <Route exact path="/baseball-2019/:productName" component={ProductPage} />
                <Route exact path="/baseball-2018" component={Baseball2018} />
                <Route exact path="/baseball-2017" component={Baseball2017} />
                <Route exact path="/baseball-2016" component={Baseball2016} />
                <Route exact path="/baseball-2015" component={Baseball2015} />
                <Route exact path="/baseball-2014" component={Baseball2014} />
                <Route exact path="/baseball-2013" component={Baseball2013} />
                <Route exact path="/baseball-2012" component={Baseball2012} />
                <Route exact path="/baseball-2011" component={Baseball2011} />
                <Route exact path="/baseball-2010-and-older" component={Baseball2010Older} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
