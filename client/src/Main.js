import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/common';
import LandingPage from './components/LandingPage/LandingPage';
import {
  CreateNewRelay, TaskHistory, MyApps,
} from './components/Dashboard';
import TaskHistoryDetail from './components/Dashboard/TaskHistory/TaskHistoryDetail';
import Dashboard from './components/Dashboard/Dashboard';
import { SignUp, SignIn } from './components/Authentication/UserActions';

const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/home" render={LandingPage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/create" component={CreateNewRelay} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/taskhistory" component={TaskHistory} />
        <Route exact path="/myapps" component={MyApps} />
        <Route exact path="/taskhistory/:id" component={TaskHistoryDetail} />
        <Redirect from="/" to="/home" />
      </Switch>

    </>
  );
};

export default Main;
