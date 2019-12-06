import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, FormGroup, Input, Label,
} from 'reactstrap';

const InputRow = (props) => {
  const {
    type, label, id, placeholder, ref,
  } = props;
  return (
    <FormGroup row>
      <Label for="email" sm={12} md={2}>
        {label}
      </Label>
      <Col sm={12} md={5}>
        <Input type={type} name={id} id={id} placeholder={placeholder} innerRef={ref} />
      </Col>
    </FormGroup>
  );
};

InputRow.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  ref: PropTypes.string,
}.isRequired;

export default InputRow;
