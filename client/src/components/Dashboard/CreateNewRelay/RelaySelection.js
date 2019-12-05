import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Heading } from '../../common';
import SelectRelay from './SelectRelay';

const RelaySelection = () => {
  return (
    <>
      <Row>
        <Heading title="Create New Relay" />
      </Row>
      <SelectRelay />
      <Row className="mt-5 mb-5">
        <Col className="align-center">
          <Button outline color="primary" size="lg">Continue</Button>
        </Col>
      </Row>
    </>
  );
};

export default RelaySelection;
