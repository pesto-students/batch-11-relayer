import React from 'react';
import { Container, Row } from 'reactstrap';
import { CardWithImage, RowCol } from '../../common';
import InfoCard from '../../common/InfoCard';

const TaskHistoryDetail = () => {
  return (
    <Container>
      <Row className="mt-5">
        <CardWithImage small="12" medium="10" large="10" cardInfo={{ cardTitle: 'Relay Name', cardBody: 'Relay Info' }} />
      </Row>
      <RowCol rowStyle="mt-5 mb-5" styling={{ display: 'block' }}>
        <InfoCard cardInfo={{ cardTitle: 'Logs', cardBody: 'Hi this is a log' }} />
      </RowCol>
    </Container>
  );
};

export default TaskHistoryDetail;
