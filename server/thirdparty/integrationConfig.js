const IntegrationConfig = {
  Slack: {
    icon_path: 'slackIcon.png',
    Events: [{
      EventName: 'New Message Posted to Channel',
      EventType: 'Trigger',
      OutputsWeGet: {
        type: 'message',
        text: '%STRING%',
        user: '%STRING%',
        team: '%STRING%',
        channel: '%STRING%',
        channel_type: 'channel',
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
        token: '%AUTH_TOKEN%',
        channel: '%STRING%',
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
