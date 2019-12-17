import Relay from '../../models/Relays'
import AuthorizedApps from "../../models/AuthorizedApps";
import {getAllRepo} from "../lib/githubLib";
import {postMessage} from "../lib/slackLib"
const performGithubActionOnSlackTrigger = async(event,authenticatedUser)  => {
    const action = event.text.split(':')[1]
    const authorizedSlackApp = await AuthorizedApps.findOne({appName:'Slack',"credentials.slackUserId":authenticatedUser[0]})
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
        case "allRepo": {
            console.log((event))
            const response = await getAllRepo('souravdasslg')
            console.log(response)
            await postMessage({text:response,channel:event.channel})
        }
        default:{

        }
    }
}
export {
    performGithubActionOnSlackTrigger,
}
