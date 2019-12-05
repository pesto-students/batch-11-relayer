import React from 'react';
import {
  Container, Form,
} from 'reactstrap';
import { Header } from '../../common';
import RelaySelection from './RelaySelection';

const CreateNewRelay = () => {
  return (
    <>
      <Header />
      <Container>
        <Form>
          <RelaySelection />
        </Form>
      </Container>
    </>
  );
};

export default CreateNewRelay;
