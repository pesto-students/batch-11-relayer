import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Heading, CustomModal, Select } from '../../common';

const MyAppsHeader = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Row>
      <Col sm={12} md={4} lg={4}>
        <Heading title="Connected Apps" />
      </Col>
      <Col sm={12} md={4} lg={4} />
      <Col sm={12} md={4} lg={4} className="mt-5 mb-5 align-center">
        <Button outline color="primary" onClick={toggle}>Connect New App</Button>
        <CustomModal
          _toggle={toggle}
          _modal={modal}
          _error="Cancel"
          _success="Connect"
          _successColor="primary"
          _modalTitle="Connect New App"
          _modalBody={(
            <Select name="select_apps" _id="select_apps" isRequired options={['Slack', 'Github']} />
          )}
        />
      </Col>
    </Row>
  );
};

export default MyAppsHeader;
