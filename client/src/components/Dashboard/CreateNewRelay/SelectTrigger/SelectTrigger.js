import React from 'react';
import {
  Col, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ArrowImg from '../ArrowImg';
import { Select } from '../../../common';

let defaultTrigger1 = [];
let defaultTrigger2 = [];
// const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
//         width=500,height=500,left=-100,top=-100`;

// const onValueChange1 = (e) => {
//   defaultTrigger1 = e.target.value;
// };

// const onValueChange2 = (e) => {
//   defaultTrigger2 = e.target.value;
// };

// const navigateApp1 = () => {
//   window.open(`http://localhost:3001/authorize/${defaultTrigger1}`, 'test', params);
// };

// const navigateApp2 = () => {
//   window.open(`http://localhost:3001/authorize/${defaultTrigger2}`, 'test', params);
// };

const SelectTrigger = (props) => {
  const { options } = props;
  const appTriggers = options.map((option) => option.availableTriggers);
  const triggers = appTriggers
    .map((trigger) => trigger.map((t) => t.triggerTitle));
  if (triggers[0] !== undefined && triggers[1] !== undefined) {
    [defaultTrigger1, defaultTrigger2] = triggers;
  }
  return (
    <>
      <Col sm="12" md="4">
        <Label>Select Trigger 1</Label>
        <Select name="trigger1" _id="triggerSelect1" isRequired options={defaultTrigger1} />
      </Col>
      <ArrowImg styling="align-center mt-4" />
      <Col sm="12" md="4">
        <Label>Select Trigger 2</Label>
        <Select name="trigger2" _id="triggerSelect2" isRequired options={defaultTrigger2} />
      </Col>
    </>
  );
};

SelectTrigger.defaultProps = {
  options: [],
};

SelectTrigger.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
};

export default SelectTrigger;
