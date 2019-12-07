import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';
import UserContext from '../../../contexts/UserContext';

const FormButton = (props) => {
  const {
    className, color, onClick, text,
  } = props;
  const { refs } = useContext(UserContext);
  console.log(refs);
  return (
    <Col>
      <Button className={className} color={color} onClick={(event) => onClick(event, ...refs)}>
        {text}
      </Button>
    </Col>
  );
};

export default FormButton;
