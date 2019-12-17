import makeRequest from "../../lib/requestLib";


module.exports.postMessage = async(options) => {
    const requestOptions = {
        url:`https://slack.com/api/chat.postMessage`,
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:{
            token: process.env.SLACK_BOT_OAUTH_TOKEN,
            text:options.text,
            channel:options.channel
        }
    }
    const response = await makeRequest(requestOptions)
    return response;
}
