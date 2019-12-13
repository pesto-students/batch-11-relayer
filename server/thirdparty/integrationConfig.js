const IntegrationConfig = {
  Slack: {
    icon_path: 'slackIcon.png',
    Events: [{
      EventName: 'New Message Posted to Channel',
      EventType: 'Trigger',
      OutputsWeGet: {
        text: '%STRING%',
        channel: {
          url: 'https://slack.com/api/conversations.list',
          method: 'GET',
          urlParams: {
            types: 'public_channel,private_channel',
          },
        },
      },
    }, {
      EventName: 'New Direct Message Posted',
      EventType: 'Trigger',
      OutputsWeGet: {
        type: 'message',
        text: '%STRING%',
        user: '%STRING%',
        team: '%STRING%',
        channel: '%STRING%',
        channel_type: 'im',
      },
    }, {
      EventName: 'Send a Message to a Channel',
      EventType: 'Action',
      InputsWeNeed: {
        channel: {
          url: 'https://slack.com/api/conversations.list',
          method: 'GET',
          urlParams: {
            types: 'public_channel,private_channel',
          },
        },
        text: '%STRING%',
      },
      ApiToInvoke: {
        url: 'https://slack.com/api/chat.postMessage',
        method: 'POST',
      },
    }],
  },
};

export default IntegrationConfig;
