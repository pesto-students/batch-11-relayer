import React from 'react';
import { Container, Row } from 'reactstrap';
import MyAppsHeader from './MyAppsHeader';
import { CardWithImage } from '../../common';
import TaskButton from '../TaskHistory/TaskButton';

const css = { textAlign: 'center', marginTop: '15px' };

const MyApps = () => {
  return (
    <Container>
      <MyAppsHeader />
      <Row className="mt-5">
        <CardWithImage small="12" medium="4" large="4" cardInfo={{ cardTitle: 'App Name', cardBody: 'username' }} />
        <TaskButton content="Edit" styling={css} />
        <TaskButton content="Disconnect" styling={css} />
      </Row>
    </Container>
  );
};

export default MyApps;
