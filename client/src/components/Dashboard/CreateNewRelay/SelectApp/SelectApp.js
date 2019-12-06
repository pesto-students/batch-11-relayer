import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
} from 'reactstrap';
import ArrowImg from '../ArrowImg';
import { Select, LabelItem } from '../../../common';

const SelectApp = (props) => {
  const { options } = props;
  const appNames = options.map((option) => option.name);
  return (
    <>
      <Col sm="12" md="4">
        <LabelItem content="Select App 1" />
        <Select name="app1" _id="appSelect1" isRequired="true" options={appNames} />
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
