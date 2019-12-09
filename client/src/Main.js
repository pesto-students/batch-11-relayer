import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/common';
import LandingPage from './components/LandingPage';
import { SignUp, SignIn } from './components/Authentication';
import CreateNewRelay from './components/Dashboard/CreateNewRelay';
import TaskHistory from './components/Dashboard/TaskHistory/TaskHistory';

const Main = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/home" component={LandingPage} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/create" component={CreateNewRelay} />
      <Route exact path="/taskhistory" component={TaskHistory} />
      <Redirect from="/" to="/home" />
    </Switch>
  </>
);

export default Main;
