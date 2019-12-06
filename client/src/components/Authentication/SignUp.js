import React, { createRef } from 'react';
import { Container } from 'reactstrap';
import SignupForm from './SignupForm';
import './signup.scss';

const SignUp = () => {
  const email = createRef();
  const pass = createRef();

  const signUp = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <h1 className="mt-5 mb-5"> Sign Up </h1>
      <SignupForm email={email} pass={pass} signUp={signUp} />
    </Container>
  );
};

export default SignUp;
