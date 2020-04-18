import React, { Component, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MainLayout from './layouts/MainLayout';
import EmptyLayout from './layouts/EmptyLayout';

import * as firebase from 'firebase';
import { config } from './config';
import { setUser } from './store/user/actions';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';

import Dashboard from './containers/Dashboard';
import Leaflet from './containers/Leaflet/Leaflet';
import OfferOverview from './containers/offerOverview/offerOverview';
import RequirementsOverview from './containers/requirementsOverview/requirementsOverview';
import AccountInformation from './containers/accountInformation/accountInformation';
import AdminPanel from './containers/adminPanel/adminPanel';
import OfferProcessing from './containers/offerProcessing/offerProcessing';
import RequirementProcessing from './containers/requirementProcessing/requirementProcessing';
import YourOffers from './containers/yourOffers/yourOffers';
import YourRequirements from './containers/yourRequirements/yourRequirements';
import Setting from './containers/Setting';
import Register from './containers/Register/Register';
import UserNotice from './components/UserNotice/UserNotice';

firebase.initializeApp(config.firebaseConfig);

const LOGIN_STATE = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    PENDING: 'PENDING',
};

const NotFound = () => {
    return <Redirect path="/login" component={LoginPage} />;
};

const DashboardRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <MainLayout>
                    <Component {...matchProps} />
                </MainLayout>
            )}
        />
    );
};

const EmptyRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <EmptyLayout>
                    <Component {...matchProps} />
                </EmptyLayout>
            )}
        />
    );
};

function onAuthStateChange(callback) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            callback({ loggedIn: LOGIN_STATE.SUCCESS });
        } else {
            callback({ loggedIn: LOGIN_STATE.FAILURE });
        }
    });
}
function App(props) {
    const [user, setUser] = useState({ loggedIn: LOGIN_STATE.PENDING });

    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
            unsubscribe();
        };
    }, []);

    if (user.loggedIn === LOGIN_STATE.PENDING) {
        return null;
    }

    return (
        <>
            {user.loggedIn === LOGIN_STATE.SUCCESS ? (
                <MuiThemeProvider>
                    <CssBaseline />
                    <div style={{ height: '100vh' }}>
                        <Router>
                            <Switch>
                                <DashboardRoute
                                    path="/register"
                                    component={Register}
                                />
                                <DashboardRoute
                                    path="/offersOverview"
                                    component={OffersOverview}
                                />
                                <DashboardRoute
                                    path="/requirementsOverview"
                                    component={RequirementsOverview}
                                />
                                <DashboardRoute
                                    path="/accountInformation"
                                    component={AccountInformation}
                                />
                                <DashboardRoute
                                    path="/adminPanel"
                                    component={AdminPanel}
                                />
                                <DashboardRoute
                                    path="/offerProcessing"
                                    component={OfferProcessing}
                                />
                                <DashboardRoute
                                    path="/requirementProcessing"
                                    component={RequirementProcessing}
                                />
                                <DashboardRoute
                                    path="/yourOffers"
                                    component={YourOffers}
                                />
                                <DashboardRoute
                                    path="/yourRequirements"
                                    component={YourRequirements}
                                />
                                <DashboardRoute
                                    exact
                                    path="/"
                                    component={Dashboard}
                                />
                                <EmptyRoute component={NotFound} />
                            </Switch>
                        </Router>
                    </div>
                    <UserNotice />
                </MuiThemeProvider>
            ) : (
                <div style={{ height: '100vh' }}>
                    <Router>
                        <Switch>
                            <DashboardRoute
                                path="/register"
                                component={Register}
                            />
                            <DashboardRoute
                                path="/offerOverview"
                                component={OfferOverview}
                            />
                            <DashboardRoute
                                path="/requirementsOverview"
                                component={RequirementsOverview}
                            />
                            <DashboardRoute
                                path="/accountInformation"
                                component={AccountInformation}
                            />
                            <DashboardRoute
                                path="/adminPanel"
                                component={AdminPanel}
                            />
                            <DashboardRoute
                                path="/offerProcessing"
                                component={OfferProcessing}
                            />
                            <DashboardRoute
                                path="/requirementProcessing"
                                component={RequirementProcessing}
                            />
                            <DashboardRoute
                                path="/yourOffers"
                                component={YourOffers}
                            />
                            <DashboardRoute
                                path="/yourRequirements"
                                component={YourRequirements}
                            />
                            <DashboardRoute
                                exact
                                path="/"
                                component={Dashboard}
                            />
                            <EmptyRoute component={NotFound} />
                        </Switch>
                    </Router>
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
    setUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
