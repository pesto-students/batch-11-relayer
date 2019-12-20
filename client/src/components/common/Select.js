import React from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';

const Select = ({
  name, _id, isRequired, options, onSelect,
}) => {
  const optionsArr = options.map((option) => <option key={option}>{option}</option>);
  return (
    <Input type="select" name={name} id={_id} required={isRequired} onClick={onSelect}>
      {optionsArr}
    </Input>
  );
};

Select.defaultProps = {
  onSelect: null,
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func,
};

export default Select;
