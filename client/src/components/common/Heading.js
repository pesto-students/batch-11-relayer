import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

const Heading = (props) => {
  const { title } = props;
  return (
    <Row>
      <Col className="align-center">
        <h3 className="heading mt-5 mb-5">{title}</h3>
      </Col>
    </Row>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Heading;
