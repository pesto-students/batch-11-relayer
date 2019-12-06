import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Form as ReactstrapForm, Col, Button, Input, FormGroup, Label,
} from 'reactstrap';

const Form = ({ formFields }) => {
  const RenderFields = () => formFields.map(field => {
    if (field.type === 'input') {
      return (
        <FormGroup row>
          <Label for={field.id} sm={12} md={2}>
            {field.label}
          </Label>
          <Col sm={12} md={5}>
            <Input type={field.type} name={field.id} id={field.id} placeholder={field.placeholder} />
          </Col>
        </FormGroup>
      );
    }
  });
  return (
    <ReactstrapForm>
      <RenderFields />
    </ReactstrapForm>
  );
};

export default Form;
