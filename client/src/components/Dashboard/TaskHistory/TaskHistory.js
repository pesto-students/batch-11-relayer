import React from 'react';
import { Container, Row } from 'reactstrap';
import Filters from './Filters';
import { CardWithImage } from '../../common';

const TaskHistory = () => {
  return (
    <Container>
      <Filters />
      <Row className="mt-5">
        <CardWithImage small="12" medium="10" large="10" cardInfo={{ cardTitle: 'Relay Name', cardBody: 'Relay Info' }} />
      </Row>
    </Container>
  );
};

export default TaskHistory;
