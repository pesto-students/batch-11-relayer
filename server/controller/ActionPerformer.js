import SlackActionPerformer from '../thirdparty/controllers/SlackActionPerformer';

const ActionPerformers = {};
ActionPerformers[SlackActionPerformer.appName] = SlackActionPerformer.performer;

const ActionPerformer = async (relay, triggerEvent) => {
  const actionsToPerform = relay.participantApps.slice(1);
  for (const action of actionsToPerform) {
    if (action.eventType === 'Action') {
      ActionPerformer[action.appName](relay, action, triggerEvent);
    }
  }
};

export default ActionPerformer;
