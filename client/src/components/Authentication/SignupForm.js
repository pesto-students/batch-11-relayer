import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Col, Button } from 'reactstrap';
import { InputRow } from '../common';

const SignupForm = (props) => {
  const { email, pass, signUp } = props;
  return (
    <Form>
      <InputRow type="email" label="Email" id="email" placeholder="username@example.com" ref={email} />
      <InputRow type="pass" label="Password" id="pass" placeholder="P@ssw0rd" ref={pass} />
      <Col>
        <Button className="mt-5 mb-1" color="primary" onClick={signUp}> Sign Up </Button>
      </Col>
      <Col>
        Already a member? &nbsp;
        <NavLink to="/signin"> Sign In </NavLink>
      </Col>
    </Form>
  );
};

SignupForm.propTypes = {
  email: PropTypes.string,
  pass: PropTypes.string,
  signUp: PropTypes.func,
}.isRequired;

export default SignupForm;
