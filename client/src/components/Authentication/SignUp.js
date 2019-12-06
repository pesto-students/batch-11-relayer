import React, { createRef } from 'react';
import { Container } from 'reactstrap';
import SignupForm from './SignupForm';
import prepareRequest from '../../utils/requestEPLib';
import request from '../../utils/requestLib';
import '../../assets/styles/components/_signup.module.scss';

const SignUp = () => {
  const email = createRef();
  const pass = createRef();

  const signUp = async (event) => {
    event.preventDefault();
    const requestObj = prepareRequest('signUp');
    requestObj.body = { email:'email', password: 'pass' };
    const response = await request(requestObj);
    console.log(response);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-5"> Sign Up </h1>
      <SignupForm email={email} pass={pass} signUp={signUp} />
    </Container>
  );
};

export default SignUp;
