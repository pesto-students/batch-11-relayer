import React, { useState } from 'react';
import {
  InputGroup,
  Button,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

const Relay = ({ relay }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <InputGroup>
      <InputGroupButtonDropdown className="mb-3" direction="right" addonType="append" isOpen={isOpen} toggle={() => toggle(!isOpen)}>
        <Button color="primary" className="rounded-left">
          {relay.name}
        </Button>
        <DropdownToggle color="primary" outline split />
        <DropdownMenu>
          <DropdownItem> Pause </DropdownItem>
          <DropdownItem> Edit </DropdownItem>
          <DropdownItem> Delete </DropdownItem>
        </DropdownMenu>
      </InputGroupButtonDropdown>
    </InputGroup>
  );
};

Relay.propTypes = {
  relay: PropTypes.instanceOf(Object).isRequired,
};

export default Relay;
