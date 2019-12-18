const IntegrationConfig = {
  Slack: {
    icon_path: 'slackIcon.png',
    Events: [{
      EventName: 'New Message Posted to Public Channel',
      EventType: 'Trigger',
      OutputsWeGet: {
        text: '%STRING%',
        channel: {
          url: 'https://slack.com/api/conversations.list',
          method: 'GET',
          urlParams: {
            types: 'public_channel',
          },
        },
      },
    }, {
      EventName: 'New Message Posted to Private Channel',
      EventType: 'Trigger',
      OutputsWeGet: {
        text: '%STRING%',
        channel: {
          url: 'https://slack.com/api/conversations.list',
          method: 'GET',
          urlParams: {
            types: 'private_channel',
          },
        },
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
  Github: {
    icon_path: 'slackIcon.png',
    Events: [{
      EventName: 'Create a New Issue',
      EventType: 'Action',
      InputsWeNeed: {
        repo: '%STRING%',
        title: '%STRING%',
      },
      ApiToInvoke: {
        url: 'https://api.github.com/repos',
        method: 'POST',
      },
    }],
  },
};

export default IntegrationConfig;
