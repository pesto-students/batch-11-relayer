import React from 'react';
import { Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const TaskButton = ({ content, styling, click }) => {
  return (
    <Col sm={12} md={3} lg={3} style={styling} className="mb-3">
      <Button outline color="primary" onClick={click}>{content}</Button>
    </Col>
  );
};

TaskButton.defaultProps = {
  styling: {},
  click: null,
};

TaskButton.propTypes = {
  content: PropTypes.string.isRequired,
  styling: PropTypes.shape({ root: PropTypes.string.isRequired }),
  click: PropTypes.func,
};

export default TaskButton;
