/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  Row, Col, Label, Button, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Heading, Select } from '../../common';
import ArrowImg from './ArrowImg';
import CreateConfiguration from '../CreateConfiguration';
import { useRelays } from '../../../shared/RelayProvider';
import { BASE_URL, GET_AUTH_APP, GET_ALL_APPS } from '../../../apiUtils/url.config';
import callAPI from '../../../apiUtils/apiCaller';

const RelaySelection = ({ appData }) => {
  const { relayData, storeRelayData } = useRelays();
  const appNames = appData.map((app) => app.AppName);
  appNames.unshift('Select');
  const [triggers, setTriggers] = useState({ slackTriggers: [], githubTriggers: [] });
  const [actions, setActions] = useState({ slackActions: [], githubActions: [] });
  const [selectedApps, setSelectedApps] = useState({ triggerApp: '', actionApp: '' });
  const [selectedTrigger, setSelectedTrigger] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [isContinue, setIsContinue] = useState(false);
  const [triggerAppAccount, setTriggerAppAccount] = useState([]);
  const [actionAppAccount, setActionAppAccount] = useState([]);

  const getAccountData = async (appName) => {
    const data = await callAPI(`${BASE_URL + GET_ALL_APPS}/${appName}/authorizedAccounts`);
    const accountData = [];
    data.map((curr) => (accountData.push({
      id: curr._id,
      teamName: curr.credentials.slackTeamName,
    })));
    return accountData;
  };

  const onTriggerHandler = async (e) => {
    const selectedApp = e.target.value || 'Slack';
    setSelectedApps({ ...selectedApps, triggerApp: selectedApp });
    if (selectedApp === 'Slack') {
      setTriggers({
        slackTriggers: appData.filter((app) => app.AppName === 'Slack')[0].Trigger,
        githubTriggers: [],
      });
    } else if (selectedApp === 'Github') {
      setTriggers({
        githubTriggers: appData.filter((app) => app.AppName === 'Github')[0].Trigger,
        slackTriggers: [],
      });
    }
    const triggerAccData = await getAccountData(selectedApp);
    setTriggerAppAccount(triggerAccData);
  };

  const onActionHandler = async (e) => {
    const selectedApp = e.target.value || 'Slack';
    setSelectedApps({ ...selectedApps, actionApp: selectedApp });
    if (selectedApp === 'Slack') {
      setActions({
        slackActions: appData.filter((app) => app.AppName === 'Slack')[0].Action,
        githubActions: [],
      });
    } else if (selectedApp === 'Github') {
      setActions({
        githubActions: appData.filter((app) => app.AppName === 'Github')[0].Action,
        slackActions: [],
      });
    }
    const actionAccData = await getAccountData(selectedApp);
    setActionAppAccount(actionAccData);
  };

  const onNameChange = (e) => {
    const relayName = e.target.value;
    storeRelayData({ ...relayData, relayName });
  };

  const isValidApp = (app) => {
    if (app !== ''
      && app !== undefined
      && app !== 'Select') {
      return true;
    }
    return false;
  };

  const authorizeTriggerApp = () => {
    if (isValidApp(selectedApps.triggerApp)) {
      window.open(BASE_URL + GET_AUTH_APP + selectedApps.triggerApp,
        `Authorize ${selectedApps.triggerApp}`);
    } else {
      alert('Select App 1');
    }
  };

  const authorizeActionApp = () => {
    if (isValidApp(selectedApps.actionApp)) {
      window.open(BASE_URL + GET_AUTH_APP + selectedApps.actionApp,
        `Authorize ${selectedApps.actionApp}`);
    } else {
      alert('Select App 2');
    }
  };

  const onTriggerSelect = (e) => {
    const trigger = e.target.value;
    setSelectedTrigger(trigger);
  };

  const onActionSelect = (e) => {
    const action = e.target.value;
    setSelectedAction(action);
  };

  const onContinue = (e) => {
    e.preventDefault();
    setIsContinue(true);
  };

  const onCancel = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <>
      {isContinue
        ? (
          <CreateConfiguration
            apps={selectedApps}
            trigger={selectedTrigger}
            action={selectedAction}
            triggerAccount={triggerAppAccount}
            actionAccount={actionAppAccount}
          />
        )
        : (
          <>
            <Row>
              <Heading title="Create New Relay" />
            </Row>
            <Row>
              <Col sm="12" md="4">
                <Label>Relay Name</Label>
                <Input type="text" name="relay-name" onChange={onNameChange} />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col sm="12" md="4">
                <Label>Select App 1</Label>
                <Select
                  name="app1"
                  _id="appSelect1"
                  isRequired
                  options={appNames}
                  onSelect={onTriggerHandler}
                />
                <Button
                  className="mt-3"
                  outline
                  color="primary"
                  onClick={authorizeTriggerApp}
                >
                  Authorize
                </Button>
              </Col>
              <ArrowImg />
              <Col sm="12" md="4">
                <Label>Select App 2</Label>
                <Select
                  name="app2"
                  _id="appSelect2"
                  isRequired
                  options={appNames}
                  onSelect={onActionHandler}
                />
                <Button
                  className="mt-3"
                  outline
                  color="primary"
                  onClick={authorizeActionApp}
                >
                  Authorize
                </Button>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col sm="12" md="4">
                <Label>Select Trigger</Label>
                <Select
                  name="trigger"
                  _id="triggerSelect"
                  isRequired
                  options={triggers.slackTriggers.length !== 0
                    ? triggers.slackTriggers
                    : triggers.githubTriggers}
                  onSelect={onTriggerSelect}
                />
              </Col>
              <ArrowImg />
              <Col sm="12" md="4">
                <Label>Select Action</Label>
                <Select
                  name="action"
                  _id="actionSelect"
                  isRequired
                  options={actions.slackActions.length !== 0
                    ? actions.slackActions
                    : actions.githubActions}
                  onSelect={onActionSelect}
                />
              </Col>
            </Row>
            <Row className="mt-5 mb-5">
              <Col className="align-center">
                <Button
                  outline
                  color="primary"
                  size="lg"
                  onClick={onContinue}
                  className="mr-2"
                >
                  Continue
                </Button>
                <Button
                  outline
                  color="danger"
                  size="lg"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </>
        )}
    </>
  );
};

RelaySelection.propTypes = {
  appData: PropTypes.arrayOf(PropTypes.shape({
    Trigger: PropTypes.array,
    Action: PropTypes.array,
    AppName: PropTypes.string,
    Icon: PropTypes.string,
  })).isRequired,
  // storeRelayData: PropTypes.func.isRequired,
};

export default RelaySelection;
