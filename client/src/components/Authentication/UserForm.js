import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { createInputField, createButtonField } from '../../utils/formUtils';
import { Form } from '../common';

const UserForm = (props) => {
  const { onClick, action } = props;
  const emailInput = createInputField('email', 'email', 'Email', 'username@example.com');
  const passwordInput = createInputField('password', 'pass', 'Password', 'P@ssw0rd');
  const button = createButtonField('mt-5 mb-1');
  return (
    <>
      <Form action={action} onClick={onClick} formFields={[emailInput, passwordInput, button]} />
      {action === 'Sign Up' ? (
        <p className="mt-4">
          Already a member? &nbsp;
          <NavLink to="/signin"> Sign In </NavLink>
        </p>
      ) : (
        <p className="mt-4">
          Not a member yet ? &nbsp;
          <NavLink to="/signup"> Sign Up </NavLink>
        </p>
      )}
    </>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  action: PropTypes.string,
}.isRequired;

export default UserForm;
