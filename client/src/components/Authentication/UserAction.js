import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import UserForm from './UserForm';
import prepareRequest from '../../utils/requestEPLib';
// import request from '../../utils/requestLib';
import '../../assets/styles/components/_signup.module.scss';

const UserAction = (props) => {
  const { action } = props;
  const userAction = async (event, email, pass) => {
    event.preventDefault();
    const actionArray = action.split(' ');
    const requestObj = prepareRequest(actionArray[0].toLowerCase() + actionArray[1]);
    requestObj.body = { email: email.current.value, password: pass.current.value };
    // const response = await request(requestObj);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-5">
        {action}
      </h1>
      <UserForm onSubmit={userAction} action={action} />
    </Container>
  );
};

UserAction.propTypes = {
  action: PropTypes.string,
}.isRequired;

export default UserAction;
