import React from 'react';
import {
  Container, Form,
} from 'reactstrap';
import RelaySelection from './RelaySelection';
import { Heading } from '../../common';

const CreateNewRelay = () => {
  return (
    <>
      <Container>
        <Heading styling="mt-5" title="Create New Relay" />
        <Form>
          <RelaySelection />
        </Form>
      </Container>
    </>
  );
};

export default CreateNewRelay;
