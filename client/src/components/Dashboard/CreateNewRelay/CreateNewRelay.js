import React from 'react';
import {
  Container, Form,
} from 'reactstrap';
import RelaySelection from './RelaySelection';

const CreateNewRelay = () => {
  return (
    <>
      <Container>
        <Form>
          <RelaySelection />
        </Form>
      </Container>
    </>
  );
};

export default CreateNewRelay;
