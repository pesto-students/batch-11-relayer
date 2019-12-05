import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/common';
import LandingPage from './components/LandingPage';
import SignUp from './components/Authentication/SignUp';

const Main = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/home" component={LandingPage} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="/" to="/home" />
    </Switch>
  </>
);

export default Main;