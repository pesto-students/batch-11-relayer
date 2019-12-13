/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Input, Label,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Heading } from '../../common';
import callAPI from '../../../apiUtils/apiCaller';
import {
  BASE_URL, GET_ALL_APPS, POST_APP_DETAILS, POST_CREATE_RELAY,
} from '../../../apiUtils/url.config';

const CreateConfiguration = ({
  apps, trigger, action, triggerAccount, actionAccount, storeRelayData, relayData,
}) => {
  const [triggerFields, setTriggerFields] = useState({});
  const [actionFields, setActionFields] = useState({});
  const [appKey, setAppKey] = useState({ triggerKey: '', actionKey: '' });
  const [triggerOptions, setTriggerOptions] = useState([{ id: 1, name: 'Select' }]);
  const [actionOptions, setActionsOptions] = useState([{ id: 1, name: 'Select' }]);
  const [channelIds, setChannelIds] = useState({ triggerChannelId: '', actionChannelId: '' });

  const getChannels = async (key, eventType) => {
    const isTrigger = eventType !== 'action';
    const appInfo = {
      AppName: isTrigger ? apps.triggerApp : apps.actionApp,
      EventName: isTrigger ? trigger : action,
      DetailName: key,
      AppAuthId: isTrigger ? appKey.triggerKey : appKey.actionKey,
    };
    const data = await callAPI(`${BASE_URL + POST_APP_DETAILS}`, 'POST', appInfo);
    return data;
  };

  const getConfigurationOnTrigger = async (e) => {
    const triggerKey = e.target.value;
    const data = await callAPI(`${BASE_URL + GET_ALL_APPS}/${apps.triggerApp}/?eventName=${trigger}`);
    const dynamicFields = data.OutputsWeGet;
    setAppKey({ ...appKey, triggerKey });
    setTriggerFields(dynamicFields);
  };

  const getConfigurationOnAction = async (e) => {
    const actionKey = e.target.value;
    const data = await callAPI(`${BASE_URL + GET_ALL_APPS}/${apps.actionApp}/?eventName=${action}`);
    const dynamicFields = data.InputsWeNeed;
    setAppKey({ ...appKey, actionKey });
    setActionFields({ ...dynamicFields });
  };

  const onTriggerFieldsHandler = async (e) => {
    const [key, channelId] = e.target.value.split(' ');
    const data = await getChannels(key, 'trigger');
    setTriggerOptions(data);
    setChannelIds({ ...channelIds, triggerChannelId: channelId });
  };

  const onActionFieldsHandler = async (e) => {
    const [key, channelId] = e.target.value.split(' ');
    const data = await getChannels(key, 'action');
    setActionsOptions(data);
    setChannelIds({ ...channelIds, actionChannelId: channelId });
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    await callAPI(BASE_URL + POST_CREATE_RELAY, 'POST', relayData);
    window.location.href = '/dashboard';
  };

  const onInputHandler = (e) => {
    const participantApps = [];
    const triggerApp = {
      appName: apps.triggerApp,
      event: trigger,
      eventType: 'Trigger',
      inputs: {
        channel: channelIds.triggerChannelId,
      },
      authorizedApp: appKey.triggerKey,
    };
    const actionApp = {
      appName: apps.actionApp,
      event: action,
      eventType: 'Action',
      inputs: {
        channel: channelIds.actionChannelId,
        text: e.target.value,
      },
      authorizedApp: appKey.actionKey,
    };
    participantApps.push(triggerApp);
    participantApps.push(actionApp);
    storeRelayData({ participantApps });
  };

  const onCancel = (e) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  return (
    <>
      <Container>
        <Heading styling="mt-5 mb-5" title="Configure Relay" />
        <Label>
          Configure
          {` ${apps.triggerApp}`}
        </Label>
        <Input type="select" name="triggerAcc" onClick={getConfigurationOnTrigger}>
          {triggerAccount.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.teamName}
            </option>
          ))}
        </Input>
        <Input type="select" className="mt-2" id="triggerFields" onClick={onTriggerFieldsHandler}>
          {Object.keys(triggerFields).map((key) => {
            return (typeof triggerFields[key] === 'object')
              ? triggerOptions.map((option) => {
                return (
                  <option
                    key={option.id}
                    value={`${key} ${option.id}`}
                    name={option.name}
                  >
                    {option.name}
                  </option>
                );
              })
              : null;
          })}
        </Input>
        <Label className="mt-5">
          Configure
          {` ${apps.actionApp}`}
        </Label>
        <Input type="select" name="actionAcc" onClick={getConfigurationOnAction}>
          {actionAccount.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.teamName}
            </option>
          ))}
        </Input>
        <Input type="select" className="mt-2" id="actionFields" onClick={onActionFieldsHandler}>
          {Object.keys(actionFields).map((key) => {
            return (typeof actionFields[key] === 'object')
              ? actionOptions.map((option) => {
                return (
                  <option
                    key={option.id}
                    value={`${key} ${option.id}`}
                  >
                    {option.name}
                  </option>
                );
              })
              : null;
          })}
        </Input>
        {Object.keys(actionFields).map((key) => {
          return (typeof actionFields[key] === 'string')
            ? (<Input type="text" className="mt-2" key={key} name="action" onChange={onInputHandler} />)
            : null;
        })}
        <Row>
          <Col className="mt-3 mb-5 align-center">
            <Button className="mr-2" outline color="primary" size="lg" onClick={submitDetails}>Use Relay</Button>
            <Button outline color="danger" size="lg" onClick={onCancel}>Cancel</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

CreateConfiguration.propTypes = {
  apps: PropTypes.shape({
    triggerApp: PropTypes.string,
    actionApp: PropTypes.string,
  }).isRequired,
  trigger: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  triggerAccount: PropTypes.arrayOf(PropTypes.object).isRequired,
  actionAccount: PropTypes.arrayOf(PropTypes.object).isRequired,
  storeRelayData: PropTypes.func.isRequired,
  relayData: PropTypes.shape({
    relayName: PropTypes.string,
    iSRunning: PropTypes.bool,
    participantApps: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return { relayData: state.relayData };
};

const mapDispatchToProps = (dispatch) => {
  return { storeRelayData: (value) => { dispatch({ type: 'STORE_PARTICIPANT_APP', value }); } };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateConfiguration);
