import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/common';
import LandingPage from './components/LandingPage';
import SignUp from './components/Authentication/SignUp';
import CreateNewRelay from './components/Dashboard/CreateNewRelay';
import SignIn from './components/Authentication/SignIn';

const Main = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/home" component={LandingPage} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/create" component={CreateNewRelay} />
      <Redirect from="/" to="/home" />
    </Switch>
  </>
);

export default Main;
