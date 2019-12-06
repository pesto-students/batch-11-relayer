import React from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';

const LabelItem = (props) => {
  const { content } = props;
  return <Label>{content}</Label>;
};

LabelItem.propTypes = {
  content: PropTypes.string.isRequired,
};

export default LabelItem;
