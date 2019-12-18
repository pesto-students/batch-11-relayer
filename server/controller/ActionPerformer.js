/* eslint-disable no-underscore-dangle */
import eventEmitter from '../lib/eventsLib';
import slackActionPerformer from '../thirdparty/controller/SlackActionPerformer';
import githubActionPerformer from '../thirdparty/controller/GithubActionPerformer';

const ActionPerformer = async (relay, triggerEvent) => {
  const actionsToPerform = relay.participantApps.slice(1);

  for (const action of actionsToPerform) {
    if (action.eventType === 'Action') {
      const correspondingActionPerformer = `${action.appName.toLowerCase()}ActionPerformer`;

      eventEmitter.emit(correspondingActionPerformer, relay._id, action, triggerEvent);
    }
  }
};

const exports = {
  ActionPerformer,
  slackActionPerformer,
  githubActionPerformer,
};

export default exports;
