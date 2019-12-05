import React from 'react';
import {
  Col, Label,
} from 'reactstrap';
import ArrowImg from '../ArrowImg';
import { Select } from '../../../common';

const SelectApp = () => {
  return (
    <>
      <Col sm="12" md="4">
        <Label>Select App 1</Label>
        <Select name="app1" _id="appSelect1" isRequired options={[1, 2, 3, 4, 5]} />
      </Col>
      <ArrowImg />
      <Col sm="12" md="4">
        <Label>Select App 2</Label>
        <Select name="app2" _id="appSelect2" isRequired options={[1, 2, 3, 4, 5]} />
      </Col>
    </>
  );
};

export default SelectApp;
