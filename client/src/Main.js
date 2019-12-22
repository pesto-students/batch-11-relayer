import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import {
  Dashboard,
  CreateNewRelay,
  TaskHistory,
  MyApps,
} from './components/Dashboard';
import TaskHistoryDetail from './components/Dashboard/TaskHistory/TaskHistoryDetail';
import { SignUp, SignIn } from './components/Authentication/UserActions';
import LandingPage from './components/LandingPage/LandingPage';
import { Header } from './components/common';

const mapStateToProps = (state) => ({ auth: state.auth });

const Main = ({ auth }) => {
  const PrivateRoute = (args) => {
    if (auth.isLoading) {
      return <Spinner className="spinner" color="primary" />;
    }
    if (auth.isAuthenticated) {
      return <Route {...args} />;
    }
    return <h1 className="error"> Sign up to have more fun </h1>;
  };

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/home" component={LandingPage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/create" component={CreateNewRelay} />
        <Route exact path="/taskhistory" component={TaskHistory} />
        <Route exact path="/taskhistory/:id" component={TaskHistoryDetail} />
        <Route exact path="/myapps" component={MyApps} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
};

Main.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Main);
