import React from 'react';
import {
  Col, Row, Button, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

const Filters = ({ relays, onSelectRelay, onSelectStatus }) => {
  const relayNames = relays.reduce((acc, relay) => {
    acc.push(
      {
        id: relay.relayId,
        relayName: relay.relayName,
      },
    );
    return acc;
  }, []);
  relayNames.unshift('Select');

  return (
    <Row className="mt-3">
      <Col sm={12} md={4} lg={3} className="mt-3">
        <Input
          type="select"
          name="selectRelayName"
          id="select_relay_name"
          required
          onClick={onSelectRelay}
        >
          {relayNames.map((relay) => (
            <option
              key={relay.id}
              value={relay.id}
            >
              {relay.relayName}
            </option>
          ))}
        </Input>
      </Col>
      <Col sm={12} md={4} lg={3} className="mt-3">
        <Input
          type="select"
          name="selectRelayStatus"
          id="select_relay_status"
          required
          onClick={onSelectStatus}
        >
          {['Select', 'Running', 'Paused'].map((relay) => (
            <option
              key={relay}
              value={relay}
            >
              {relay}
            </option>
          ))}
        </Input>
      </Col>
      <Col sm={12} md={4} lg={3} className="mt-3">
        <Button
          outline
          color="primary"
        >
          Clear Filters
        </Button>
      </Col>
    </Row>
  );
};

Filters.propTypes = {
  onSelectRelay: PropTypes.func.isRequired,
  onSelectStatus: PropTypes.func.isRequired,
  relays: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Filters;
