import eventEmitter from '../lib/eventsLib';
import slackActionPerformer from '../thirdparty/controllers/SlackActionPerformer';

const ActionPerformer = async (relay, triggerEvent) => {
  const actionsToPerform = relay.participantApps.slice(1);
  for (const action of actionsToPerform) {
    if (action.eventType === 'Action') {
      const correspondingActionPerformer = `${action.appName.toLowerCase()}ActionPerformer`;
      eventEmitter.emit(correspondingActionPerformer, relay, action, triggerEvent);
    }
  }
};

const exports = {
  ActionPerformer,
  slackActionPerformer,
};

export default exports;
