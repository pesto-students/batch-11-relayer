import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  Col, Button, Input, FormGroup, Label,
} from 'reactstrap';
import Form from '../common/Form/Form';

const SignupForm = (props) => {
  const { signUp } = props;
  const emailInput = {
    type: 'input',
    inputType: 'email',
    id: 'email',
    label: 'Email',
    placeholder: 'username@example.com',
  };
  const passwordInput = {
    type: 'input',
    inputType: 'password',
    id: 'pass',
    label: 'Password',
    placeholder: 'P@ssw0rd',
  };
  return (
    <Form formFields={[emailInput, passwordInput]}>
      {/*
      <FormGroup row>
        <Label for="email" sm={12} md={2}> Email </Label>
        <Col sm={12} md={5}>
          <Input type="email" name="email" id="email" placeholder="username@example.com" innerRef={email} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="pass" sm={12} md={2}> Email </Label>
        <Col sm={12} md={5}>
          <Input type="pass" name="pass" id="pass" placeholder="P@ssw0rd" innerRef={pass} />
        </Col>
      </FormGroup>
      <Col>
        <Button className="mt-5 mb-1" color="primary" onClick={(event) => signUp(event, email, pass)}> Sign Up </Button>
      </Col>
      <Col>
        Already a member? &nbsp;
        <NavLink to="/signin"> Sign In </NavLink>
      </Col>
*/}
    </Form>
  );
};

SignupForm.propTypes = {
  email: PropTypes.string,
  pass: PropTypes.string,
  signUp: PropTypes.func,
}.isRequired;

export default SignupForm;
