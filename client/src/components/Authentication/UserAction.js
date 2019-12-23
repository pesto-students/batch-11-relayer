import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import * as env from '../../utils/url.config';
import { loginUser, signupUser } from '../../store/AuthActionCreator';

const mapDispatchToProps = (dispatch) => ({
  loginUser: (url, creds) => dispatch(loginUser(url, creds)),
  signupUser: (url, creds) => dispatch(signupUser(url, creds)),
});

const UserAction = (props) => {
  const { action } = props;
  const userAction = async (event, email, pass) => {
    const formattedAction = action.replace(' ', '').toLowerCase();
    const creds = { email: email.current.value, password: pass.current.value };
    const endpoint = formattedAction === 'signin' ? env.POST_USER_SIGN_IN : env.POST_USER_SIGN_UP;
    const url = env.BASE_URL + endpoint;

    if (formattedAction === 'signin') {
      props.loginUser(url, creds);
    } else {
      props.signupUser(url, creds);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-5">
        {action}
      </h1>
      <UserForm onClick={userAction} action={action} />
    </Container>
  );
};

UserAction.propTypes = {
  action: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(UserAction);
