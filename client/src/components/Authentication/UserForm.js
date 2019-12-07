import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { createInputField, createButtonField } from '../../utils/formUtils';
import Form from '../common/Form/Form';

const UserForm = (props) => {
  const { onSubmit, action } = props;
  const emailInput = createInputField('email', 'email', 'Email', 'username@example.com');
  const passwordInput = createInputField('password', 'pass', 'Password', 'P@ssw0rd');
  const signupButton = createButtonField('Sign Up', onSubmit);
  if (action === 'Sign Up') {
    return (
      <>
        <Form action={action} formFields={[emailInput, passwordInput, signupButton]} />
        <p className="mt-4">
          Already a member? &nbsp;
          <NavLink to="/signin"> Sign In </NavLink>
        </p>
      </>
    );
  }
  return (
    <Form action={action} formFields={[emailInput, passwordInput, signupButton]} />
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  action: PropTypes.string,
}.isRequired;

export default UserForm;
