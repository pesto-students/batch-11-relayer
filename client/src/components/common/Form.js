import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Form as ReactstrapForm, Input, Col, Button, FormGroup, Label,
} from 'reactstrap';

const Form = ({ action, formFields }) => {
  const refs = [];
  const onSubmit = (event) => {
    event.preventDefault();
    formFields[formFields.length - 1].onClick(event, ...refs);
  };

  const RenderFields = () => formFields.map((field, idx) => {
    const {
      type, label, id, placeholder: filler, color, className,
    } = field;
    const ref = createRef();
    const key = idx.toString();

    if (field.inputType === 'input') {
      refs.push(ref);
      return (
        <FormGroup row key={key}>
          <Label htmlFor={id} sm={12} md={2}>
            {label}
          </Label>
          <Col sm={12} md={5}>
            <Input type={type} name={id} id={id} placeholder={filler} innerRef={ref} required />
          </Col>
        </FormGroup>
      );
    }
    return (
      <Button key={key} className={className} color={color}>
        {action}
      </Button>
    );
  });
  return (
    <ReactstrapForm onSubmit={onSubmit}>
      <RenderFields />
    </ReactstrapForm>
  );
};

Form.propTypes = {
  formFields: PropTypes.array,
}.isRequired;

export default Form;
