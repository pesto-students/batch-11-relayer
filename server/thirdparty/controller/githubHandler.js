import Relay from '../../models/Relays';
import AuthorizedApps from '../../models/AuthorizedApps';
import {createRepo, getAllRepo} from '../lib/githubLib';
import { postMessage } from '../lib/slackLib';
import eventEmitter from "../../lib/eventsLib";
import "../../lib/relayHistoryLib";
import {validateArgs,convertArgsStringToObject} from "../../lib/argumentProcessor";
import * as actionStatus from "../../constants/actionStatus"
const performGithubActionOnSlackTrigger = async (event, authenticatedUser) => {
  const action = convertArgsStringToObject(event.text)['_'][0].split(':')[1]
  const authorizedSlackApp = await AuthorizedApps.findOne({ appName: 'Slack', 'credentials.slackUserId': authenticatedUser[0] }).lean();
  const authorizedGithubApp = await AuthorizedApps.findOne({appName: 'Github',userId:authorizedSlackApp.userId}).lean()
  const messageConfig = {channel: event.channel,token:authorizedSlackApp.authToken}
  const foundRelay = await Relay.findOne({
      userId: authorizedSlackApp.userId,
      isRunning:true,
      isDeleted:false,
      $and:[
           {participantApps: {$elemMatch:{appName:'slack',eventType: "Trigger"}}},
           {participantApps:{$elemMatch:{appName:'github',eventType: "Action"}}}
           ]
  }).lean()
  switch (action) {
    case 'help': {
      const message = "1. `github:help` Shows the help command \n"+
                       "2. `github:allRepo` Shows all your repo"
      await postMessage({...messageConfig,text:message});
      console.log('Before event emit')
      eventEmitter.emit('relayHistory:create',{
          relayId:foundRelay.relayId,
          from:'Slack',
          to:'Github',
          action:'help command executed',
          status: actionStatus.SUCCESS})
      break;
    }
    case 'allRepo': {
      const response = await getAllRepo(authorizedGithubApp.authToken);
      await postMessage({...messageConfig,text:response.responseMessage});
        eventEmitter.emit('relayHistory:create',{
            relayId:foundRelay.relayId,
            from:'Slack',
            to:'Github',
            action:'fetch all repo',
            status:response.status,
        })
      break;
    }
    case 'createRepo': {
        const options = validateArgs(event.text,["name"]);
        let responseText = '';
        let response = {};
        if(!options) {
            responseText = `Repository name needs to be passed: \`github:createRepo --name Repo Name\` `;
        } else {
            response = await createRepo(authorizedGithubApp.authToken,options);
            responseText = response.responseMessage;
        }
        await postMessage({...messageConfig,text:responseText})
        eventEmitter.emit('relayHistory:create',{
            relayId:foundRelay.relayId,
            from:'Slack',
            to:'Github',
            action:responseText,
            status:response.status})
        break;
    }
    default: {
        const message = "*Command Not Found* \n" +
            "1. `github:help` Shows the help command \n"+
            "2. `github:allRepo` Shows all your repo"
        await postMessage({...messageConfig,text:message});
    }
  }
};
export {
  performGithubActionOnSlackTrigger,
};
