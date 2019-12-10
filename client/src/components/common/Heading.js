import React from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';

const Heading = ({ title }) => {
  return (
    <Col className="align-center">
      <h3 className="heading mt-5 mb-5">{title}</h3>
    </Col>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Heading;
