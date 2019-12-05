import React from 'react';
import { Row, Col } from 'reactstrap';
import { InfoCard } from '../../common';

const RelayHistoryList = () => {
  return (
    <Row className="mt-5">
      <Col sm={12} md={2} lg={2}>
        <img src="https://via.placeholder.com/160x140" alt="placeholder" />
      </Col>
      <Col sm={12} md={10} lg={10}>
        <InfoCard />
      </Col>
    </Row>
  );
};

export default RelayHistoryList;
