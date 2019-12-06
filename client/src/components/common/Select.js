import React from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

const Select = (props) => {
  const {
    name, _id, isRequired, options, handleChange,
  } = props;
  return (
    <Input type="select" name={name} id={_id} required={isRequired} onChange={handleChange}>
      {options.map((option) => <option>{option}</option>)}
    </Input>
  );
};

Select.defaultProps = {
  handleChange: () => { },
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func,
};

export default Select;
