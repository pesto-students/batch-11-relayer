import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Col, FormGroup, Input, Label,
} from 'reactstrap';
import UserContext from '../../../contexts/UserContext';

const FormRow = (props) => {
  const {
    type, label, id, placeholder,
  } = props;
  const { refs, ref } = useContext(UserContext);

  React.useEffect(() => {
    refs.push(ref);
  }, [ref, refs]);

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
};

FormRow.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  ref: PropTypes.string,
}.isRequired;

export default FormRow;
