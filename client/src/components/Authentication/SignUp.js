import React, { createRef } from 'react';
import { Container } from 'reactstrap';
import SignupForm from './SignupForm';
import prepareRequest from '../../utils/requestEPLib';
import request from '../../utils/requestLib';
import '../../assets/styles/components/_signup.module.scss';

const SignUp = () => {
  const signUp = async (event, email, pass) => {
    event.preventDefault();
    console.log(email.current.value, pass.current.value);
    const requestObj = prepareRequest('signUp');
    requestObj.body = { email: email.current.value, password: pass.current.value };
    const response = await request(requestObj);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-5"> Sign Up </h1>
      <SignupForm signUp={signUp} />
    </Container>
  );
};

export default SignUp;
