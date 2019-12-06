import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Button,
} from 'reactstrap';
import ArrowImg from '../ArrowImg';
import { Select, LabelItem } from '../../../common';

let defaultApp = '';

const onValueChange = (e) => {
  defaultApp = e.target.value;
};

const navigate = () => {
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=500,height=500,left=-100,top=-100`;
  console.log(defaultApp);
  window.open(`http://localhost:3001/authorize/${defaultApp}`, 'test', params);
};

const SelectApp = (props) => {
  const { options } = props;
  const appNames = options.map((option) => option.name);
  // eslint-disable-next-line prefer-destructuring
  defaultApp = appNames[0];

  return (
    <>
      <Col sm="12" md="4">
        <LabelItem content="Select App 1" />
        <Select name="app1" _id="appSelect1" isRequired="true" options={appNames} handleChange={onValueChange} />
        <Button className="mt-3" outline color="primary" onClick={navigate}>Authorize</Button>
      </Col>
      <ArrowImg />
      <Col sm="12" md="4">
        <LabelItem content="Select App 2" />
        <Select name="app2" _id="appSelect2" isRequired="true" options={appNames} />
      </Col>
    </>
  );
};

SelectApp.defaultProps = {
  options: [],
};

SelectApp.propTypes = {
  options: PropTypes.array,
};

export default SelectApp;
