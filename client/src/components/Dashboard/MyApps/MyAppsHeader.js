import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Heading } from '../../common';

const MyAppsHeader = () => {
  return (
    <Row>
      <Col sm={12} md={4} lg={4}>
        <Heading title="Connected Apps" />
      </Col>
      <Col sm={12} md={4} lg={4} />
      <Col sm={12} md={4} lg={4} className="mt-5 mb-5 align-center">
        <Button outline color="primary">Connect New App</Button>
      </Col>
    </Row>
  );
};

export default MyAppsHeader;
