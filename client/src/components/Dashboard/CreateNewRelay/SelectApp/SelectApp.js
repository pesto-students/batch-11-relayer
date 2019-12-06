import React from 'react';
import {
  Col,
} from 'reactstrap';
import ArrowImg from '../ArrowImg';
import { Select, LabelItem } from '../../../common';

const SelectApp = () => {
  return (
    <>
      <Col sm="12" md="4">
        <LabelItem content="Select App 1" />
        <Select name="app1" _id="appSelect1" isRequired="true" options={[1, 2, 3, 4, 5]} />
      </Col>
      <ArrowImg />
      <Col sm="12" md="4">
        <LabelItem content="Select App 2" />
        <Select name="app2" _id="appSelect2" isRequired="true" options={[1, 2, 3, 4, 5]} />
      </Col>
    </>
  );
};

export default SelectApp;
