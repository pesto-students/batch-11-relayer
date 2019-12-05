import React from 'react';
import { Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const TaskButton = (props) => {
  const { content, styling } = props;
  return (
    <Col sm={12} md={3} lg={3} style={styling} className="mb-3">
      <Button outline color="primary">{content}</Button>
    </Col>
  );
};

TaskButton.defaultProps = {
  styling: {},
};

TaskButton.propTypes = {
  content: PropTypes.string.isRequired,
  styling: PropTypes.shape({ root: PropTypes.string.isRequired }),
};

export default TaskButton;
