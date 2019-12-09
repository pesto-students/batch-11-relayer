import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Arrow from './Arrow';

const ArrowImg = (props) => {
  const { styling } = props;
  return (
    <Col className={styling}>
      <Arrow />
    </Col>
  );
};

ArrowImg.defaultProps = {
  styling: '',
};

ArrowImg.propTypes = {
  styling: PropTypes.string,
};

export default ArrowImg;
