import React from 'react';
import UserAction from './UserAction';

const SignUp = () => {
  return (
    <UserAction action="Sign Up" />
  );
};

const SignIn = () => {
  return (
    <UserAction action="Sign In" />
  );
};

export { SignUp, SignIn };
