import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';

const FormButton = (props) => {
  const {
    className, color, text,
  } = props;
  return (
    <Col>
      <Button className={className} color={color}>
        {text}
      </Button>
    </Col>
  );
};

FormButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
}.isRequired;

export default FormButton;
