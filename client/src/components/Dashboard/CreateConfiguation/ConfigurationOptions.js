import React from 'react';
import { Input } from 'reactstrap';
import { LabelItem, RowCol } from '../../common';

const CreateConfigurations = () => {
  return (
    <>
      <RowCol rowStyle="mb-5">
        <LabelItem content="Config Option 1" />
        <Input type="text" />
      </RowCol>
      <RowCol rowStyle="mb-5">
        <LabelItem content="Config Option 2" />
        <Input type="text" />
      </RowCol>
      <RowCol rowStyle="mb-5">
        <LabelItem content="Config Option 3" />
        <Input type="text" />
      </RowCol>
      <RowCol rowStyle="mb-5">
        <LabelItem content="Config Option 4" />
        <Input type="text" />
      </RowCol>
    </>
  );
};

export default CreateConfigurations;
