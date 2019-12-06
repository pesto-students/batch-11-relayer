import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from './components/common';
import LandingPage from './components/LandingPage';
import SignUp from './components/Authentication/SignUp';
import CreateNewRelay from './components/Dashboard/CreateNewRelay';
import CreateConfiguration from './components/Dashboard/CreateConfiguation';

const Main = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/home" component={LandingPage} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/create" component={CreateNewRelay} />
      <Route path="/create/configure" component={CreateConfiguration} />
      <Redirect from="/" to="/home" />
    </Switch>
  </>
);

export default Main;
