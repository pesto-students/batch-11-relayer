/* eslint-disable react/jsx-props-no-spreading */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Form as ReactstrapForm,
  Input,
  Col,
  Button,
  FormGroup,
  Label,
} from 'reactstrap';

const Form = ({ onClick, action, formFields }) => {
  const refs = [];
  const onSubmit = (event) => {
    // event.preventDefault();
    onClick(event, ...refs);
  };

  const RenderFields = () => formFields.map((field, idx) => {
    const { button, label, input } = field;
    const ref = createRef();
    const key = idx.toString();
    if (field.inputType === 'input') {
      refs.push(ref);
      return (
        <FormGroup row key={key}>
          <Label htmlFor={label.id} sm={12} md={2}>
            {label.label}
          </Label>
          <Col sm={12} md={5}>
            <Input {...input} innerRef={ref} />
          </Col>
        </FormGroup>
      );
    }
    return (
      <Button key={key} className={button.className} color={button.color}>
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
