import React from 'react';
import { Row, Input } from 'reactstrap';
import { LabelItem } from '../../common';

const CreateConfigurations = () => {
  return (
    <>
      <Row className="mb-5">
        <LabelItem content="Config Option 1" />
        <Input type="text" />
      </Row>
      <Row className="mb-5">
        <LabelItem content="Config Option 2" />
        <Input type="text" />
      </Row>
      <Row className="mb-5">
        <LabelItem content="Config Option 3" />
        <Input type="text" />
      </Row>
      <Row className="mb-5">
        <LabelItem content="Config Option 4" />
        <Input type="text" />
      </Row>
    </>
  );
};

export default CreateConfigurations;
