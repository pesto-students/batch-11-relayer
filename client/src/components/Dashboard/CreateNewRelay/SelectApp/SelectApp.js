import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Button,
} from 'reactstrap';
import ArrowImg from '../ArrowImg';
import { Select, LabelItem } from '../../../common';

let defaultApp1 = '';
let defaultApp2 = '';
const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=500,height=500,left=-100,top=-100`;

const onValueChange1 = (e) => {
  defaultApp1 = e.target.value;
};

const onValueChange2 = (e) => {
  defaultApp2 = e.target.value;
};

const navigateApp1 = () => {
  window.open(`http://localhost:3001/authorize/${defaultApp1}`, 'test', params);
};

const navigateApp2 = () => {
  window.open(`http://localhost:3001/authorize/${defaultApp2}`, 'test', params);
};

const SelectApp = (props) => {
  const { options } = props;
  const appNames = options.map((option) => option.name);
  [defaultApp1] = appNames;
  [defaultApp2] = appNames;

  return (
    <>
      <Col sm="12" md="4">
        <LabelItem content="Select App 1" />
        <Select name="app1" _id="appSelect1" isRequired="true" options={appNames} handleChange={onValueChange1} />
        <Button className="mt-3" outline color="primary" onClick={navigateApp1}>Authorize</Button>
      </Col>
      <ArrowImg />
      <Col sm="12" md="4">
        <LabelItem content="Select App 2" />
        <Select name="app2" _id="appSelect2" isRequired="true" options={appNames} handleChange={onValueChange2} />
        <Button className="mt-3" outline color="primary" onClick={navigateApp2}>Authorize</Button>
      </Col>
    </>
  );
};

SelectApp.defaultProps = {
  options: [],
};

SelectApp.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
};

export default SelectApp;
