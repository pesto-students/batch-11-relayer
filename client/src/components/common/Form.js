/* eslint-disable react/jsx-props-no-spreading */
import React, { createRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form as ReactstrapForm,
  Input,
  Col,
  Button,
  FormGroup,
  Label,
} from 'reactstrap';

const Form = (props) => {
  const refs = [];
  const onSubmit = (event) => {
    props.onClick(event, ...refs);
    props.history.push('/dashboard');
  };

  const RenderFields = () => props.formFields.map((field, idx) => {
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
        {props.action}
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

export default withRouter(Form);
