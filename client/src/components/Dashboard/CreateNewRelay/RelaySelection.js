import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import SelectRelay from './SelectRelay';

const navigate = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-restricted-globals
  location.href = '/create/configure';
};

const RelaySelection = () => {
  return (
    <>
      <SelectRelay />
      <Row className="mt-5 mb-5">
        <Col className="align-center">
          <Button outline color="primary" size="lg" onClick={navigate}>Continue</Button>
        </Col>
      </Row>
    </>
  );
};

export default RelaySelection;
