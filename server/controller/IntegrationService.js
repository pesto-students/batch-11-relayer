import eventEmitter from '../lib/eventsLib';
import RelayController from './RelayController';
import IntegrationConfig from '../thirdparty/integrationConfig';
import WebHookListeners from './WebHookListeners';
import ActionPerformer from './ActionPerformer';

const installedListeners = [];

const InitializeIntegrationService = async () => {
  const runningRelays = await RelayController.getRunningRelays();
  for (const relay of runningRelays) {
    for (const participantApp of relay.participantApps) {
      const { appName, event } = participantApp;
      const eventData = IntegrationConfig[appName].Events
        .find((eventInConfig) => eventInConfig.EventName === event);

      if (eventData.EventType === 'Trigger') {
        const eventEmitterName = `${appName.toLowerCase()}WebHook`;
        const correspondingListener = `${eventEmitterName}Listener`;
        if (installedListeners.indexOf(correspondingListener) === -1) {
          eventEmitter.on(eventEmitterName, WebHookListeners[correspondingListener]);
          installedListeners.push(correspondingListener);
        }
      }
      if (eventData.EventType === 'Action') {
        const ActionPerformerName = `${appName.toLowerCase()}ActionPerformer`;
        if (installedListeners.indexOf(ActionPerformerName) === -1) {
          eventEmitter.on(ActionPerformerName, ActionPerformer[ActionPerformerName]);
          installedListeners.push(ActionPerformerName);
        }
      }
    }
  }
};

const RefreshRunningRelays = (relayWhoseStateChanged) => {
  // console.log(relayWhoseStateChanged);
  for (const participantApp of relayWhoseStateChanged.participantApps) {
    const { appName, event } = participantApp;
    const eventData = IntegrationConfig[appName].Events
      .find((eventInConfig) => eventInConfig.EventName === event);

    if (eventData.EventType === 'Trigger') {
      const eventEmitterName = `${appName.toLowerCase()}WebHook`;
      const correspondingListener = `${eventEmitterName}Listener`;
      const indexOfListener = installedListeners.indexOf(correspondingListener);
      if (indexOfListener !== -1) {
        eventEmitter.removeListener(eventEmitterName, WebHookListeners[correspondingListener]);
        installedListeners.splice(indexOfListener, 1);
      }
    }
  }
};

eventEmitter.on('refreshRunningRelays', RefreshRunningRelays);

export default InitializeIntegrationService;
