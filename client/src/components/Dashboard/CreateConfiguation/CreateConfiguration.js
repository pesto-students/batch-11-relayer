import React from 'react';
import { Container } from 'reactstrap';
import { Heading } from '../../common';
import UseRelay from './UseRelay';
import ConfigurationOptions from './ConfigurationOptions';

const CreateConfiguration = () => {
  return (
    <>
      <Container>
        <Heading title="Configure Relay" />
        <ConfigurationOptions />
        <UseRelay />
      </Container>
    </>
  );
};

export default CreateConfiguration;
