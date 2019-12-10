import React from 'react';
import { Col, Row, Button } from 'reactstrap';
import { Select } from '../../common';

const Filters = () => {
  return (
    <Row className="mt-3">
      <Col sm={12} md={4} lg={3} className="mt-3">
        <Select name="relay_filter" _id="relay_filter" isRequired={false} options={['name1', 'name2']} />
      </Col>
      <Col sm={12} md={4} lg={3} className="mt-3">
        <Select name="relay_status_filter" _id="relay_status_filter" isRequired={false} options={['status1', 'status2']} />
      </Col>
      <Col sm={12} md={4} lg={3} className="mt-3">
        <Button outline color="primary">Clear Filters</Button>
      </Col>
    </Row>
  );
};

export default Filters;
