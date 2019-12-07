import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Form as ReactstrapForm, Input, Col, Button, FormGroup, Label,
} from 'reactstrap';

const Form = ({ action, formFields }) => {
  const refs = [];
  const ref = createRef();
  const RenderFields = () => formFields.map((field) => {
    const {
      type, label, id, placeholder, color, onClick,
    } = field;
    if (field.inputType === 'input') {
      refs.push(ref);
      return (
        <FormGroup row>
          <Label for={id} sm={12} md={2}>
            {label}
          </Label>
          <Col sm={12} md={5}>
            <Input type={type} name={id} id={id} placeholder={placeholder} innerRef={ref} />
          </Col>
        </FormGroup>
      );
    }
    return (
      <Button className="mt-5 mb-1" color={color} onClick={(event) => onClick(event, ...refs)}>
        {action}
      </Button>
    );
  });
  return (
    <ReactstrapForm>
      <RenderFields />
    </ReactstrapForm>
  );
};

Form.propTypes = {
  formFields: PropTypes.array,
}.isRequired;

export default Form;
