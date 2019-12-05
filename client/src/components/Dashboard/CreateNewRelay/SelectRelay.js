import React from 'react';
import { Row } from 'reactstrap';
import SelectApp from './SelectApp';
import SelectTrigger from './SelectTrigger';

const SelectRelay = () => {
  return (
    <>
      <Row>
        <SelectApp />
      </Row>
      <Row className="mt-5">
        <SelectTrigger />
      </Row>
    </>
  );
};

export default SelectRelay;
