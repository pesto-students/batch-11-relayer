import Relay from '../../models/Relays';
import AuthorizedApps from '../../models/AuthorizedApps';
import { getAllRepo } from '../lib/githubLib';
import { postMessage } from '../lib/slackLib';

const performGithubActionOnSlackTrigger = async (event, authenticatedUser) => {
  console.log(event,authenticatedUser)
  const action = event.text.split(':')[1];
  const authorizedSlackApp = await AuthorizedApps.findOne({ appName: 'Slack', 'credentials.slackUserId': authenticatedUser[0] }).lean();
  const authorizedGithubApp = await AuthorizedApps.findOne({appName: 'Github',userId:authorizedSlackApp.userId}).lean()
  const messageConfig = {channel: event.channel,token:authorizedSlackApp.authToken}
  // const findRelay = await Relay.findOne({
  //     userId: authorizedSlackApp.userId,
  //     isRunning:true,
  //     isDeleted:false,
  //     $and:[
  //          {participantApps: {$elemMatch:{appName:'slack',eventType: "Trigger"}}},
  //          {participantApps:{$elemMatch:{appName:'github',eventType: "Action"}}}
  //          ]
  // })
  switch (action) {
    case 'help': {
      const message = "1. `github:help` Shows the help command \n"+
                       "2. `github:allRepo` Shows all your repo"
      await postMessage({...messageConfig,text:message})
      break;
    }
    case 'allRepo': {
      const response = await getAllRepo(authorizedGithubApp.authToken);
      await postMessage({...messageConfig,text:response});
      break;
    }
    case 'createRepo': {

    }
    default: {

    }
  }
};
export {
  performGithubActionOnSlackTrigger,
};
