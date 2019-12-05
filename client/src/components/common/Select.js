import React from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

const Select = ({
  name, _id, isRequired, options,
}) => {
  return (
    <Input type="select" name={name} id={_id} required={isRequired}>
      {options.map((option) => <option>{option}</option>)}
    </Input>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
