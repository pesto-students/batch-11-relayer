import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { createInputField, createButtonField } from '../../utils/formUtils';
import { Form } from '../common/Form';

const UserForm = (props) => {
  const { onSubmit, action } = props;
  const emailInput = createInputField('email', 'email', 'Email', 'username@example.com');
  const passwordInput = createInputField('password', 'pass', 'Password', 'P@ssw0rd');
  const signupButton = createButtonField('Sign Up', onSubmit, 'mt-5 mb-1');
  return (
    <>
      <Form action={action} formFields={[emailInput, passwordInput, signupButton]} />
      {action === 'Sign Up' ? (
        <p className="mt-4">
          Already a member? &nbsp;
          <NavLink to="/signin"> Sign In </NavLink>
        </p>
      ) : null}
    </>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  action: PropTypes.string,
}.isRequired;

export default UserForm;
