import React from 'react';
import { Container } from 'reactstrap';
import Filters from './Filters';
import RelayHistoryList from './RelayHistoryList';

const TaskHistory = () => {
  return (
    <Container>
      <Filters />
      <RelayHistoryList />
    </Container>
  );
};

export default TaskHistory;
