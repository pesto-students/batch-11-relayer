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
import { CustomModal } from '../../common';
import callAPI from '../../../utils/apiCaller';
import * as env from '../../../utils/url.config';

const Relay = ({ relay, fetchRelays }) => {
  const [dropdown, toggleDropdown] = useState(false);
  const [stateModal, toggleStateModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const toggleRelayState = () => toggleStateModal(!stateModal);
  const toggleDelete = () => toggleDeleteModal(!deleteModal);
  const onSuccess = () => {
    toggleRelayState();
    callAPI(`${env.BASE_URL}${env.GET_RELAY}/status/toggle?relayId=${relay.relayId}`, 'GET')
      .then(() => fetchRelays())
      .catch(err => console.log(err));
  };
  const onDelete = () => {
    toggleDelete();
    callAPI(`${env.BASE_URL}${env.GET_ALL_RELAYS}/${relay.relayId}`, 'DELETE')
      .then((res) => {
        console.log(res);
        fetchRelays();
      })
      .catch(err => console.log(err));
  };
  const relayAction = relay.isRunning ? 'Pause' : 'Run';
  return (
    <InputGroup>
      <InputGroupButtonDropdown className="mb-3" direction="right" addonType="append" isOpen={dropdown} toggle={() => toggleDropdown(!dropdown)}>
        <Button color="primary" className="rounded-left">
          {relay.relayName}
        </Button>
        <DropdownToggle color="primary" outline split />
        <DropdownMenu>
          <DropdownItem onClick={toggleRelayState}> {relayAction} </DropdownItem>
          <DropdownItem onClick={toggleDelete}> Delete </DropdownItem>
          <CustomModal
            _modal={stateModal}
            _toggle={toggleRelayState}
            _error="No"
            _success="Yes"
            _onSuccess={onSuccess}
            _modalTitle="Confirmatoin"
            _modalBody={`Are you sure you want to ${relayAction} this relay ?`}
            _successColor="primary"
          />
          <CustomModal
            _modal={deleteModal}
            _toggle={toggleDelete}
            _error="No"
            _success="Yes"
            _onSuccess={onDelete}
            _modalTitle="Confirmatoin"
            _modalBody="Are you sure you want to delete this relay ?"
            _successColor="primary"
          />
        </DropdownMenu>
      </InputGroupButtonDropdown>
    </InputGroup>
  );
};

Relay.propTypes = {
  relay: PropTypes.instanceOf(Object).isRequired,
};

export default Relay;
