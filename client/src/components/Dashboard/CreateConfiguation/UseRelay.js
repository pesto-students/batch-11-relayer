import React from 'react';
import {
  Row, Col, Button,
} from 'reactstrap';

const submitDetails = (e) => {
  e.preventDefault();
};

const UseRelay = () => {
  return (
    <Row>
      <Col className="mb-5">
        <Col className="align-center">
          <Button outline color="primary" size="lg" onClick={submitDetails}>Use Relay</Button>
        </Col>
      </Col>
    </Row>
  );
};

export default UseRelay;
