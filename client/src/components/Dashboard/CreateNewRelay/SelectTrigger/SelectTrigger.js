import React from 'react';
import {
  Col, Label,
} from 'reactstrap';
import ArrowImg from '../ArrowImg';
import { Select } from '../../../common';

const SelectTrigger = () => {
  return (
    <>
      <Col sm="12" md="4">
        <Label>Select Trigger 1</Label>
        <Select name="trigger1" _id="triggerSelect1" isRequired options={[1, 2, 3, 4, 5]} />
      </Col>
      <ArrowImg styling="align-center mt-4" />
      <Col sm="12" md="4">
        <Label>Select Trigger 2</Label>
        <Select name="trigger2" _id="triggerSelect2" isRequired options={[1, 2, 3, 4, 5]} />
      </Col>
    </>
  );
};

export default SelectTrigger;
