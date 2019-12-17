import Relay from '../../models/Relays'
import AuthorizedApps from "../../models/AuthorizedApps";
const performGithubActionOnSlackTrigger = async(event,authenticatedUser)  => {
    const action = event.text.split(':')[1]
    const authorizedSlackApp = await AuthorizedApps.findOne({appName:'Slack',"credentials.slackUserId":authenticatedUser[0]})
    const findRelay = await Relay.findOne({
        userId: authorizedSlackApp.userId,
        isRunning:true,
        $and:[
             {participantApps: {$elemMatch:{appName:'slack',eventType: "Trigger"}}},
             {participantApps:{$elemMatch:{appName:'github',eventType: "Action"}}}
             ]
    })
}
export {
    performGithubActionOnSlackTrigger,
}
