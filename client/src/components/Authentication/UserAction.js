import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import { useUser } from '../../shared/UserProvider';
import callAPI from '../../utils/apiCaller';
import * as env from '../../utils/url.config';

const UserAction = (props) => {
  const { setUser } = useUser();
  const { action } = props;
  const userAction = async (event, email, pass) => {
    const formattedAction = action.replace(' ', '').toLowerCase();
    const data = { email: email.current.value, password: pass.current.value };
    const endpoint = formattedAction === 'signin' ? env.POST_USER_SIGN_IN : env.POST_USER_SIGN_UP;
    const url = env.BASE_URL + endpoint;
    const response = await callAPI(url, 'POST', data);
    // const { status, message, error } = response;
    setUser(response);
    console.log(response);
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

export default UserAction;
