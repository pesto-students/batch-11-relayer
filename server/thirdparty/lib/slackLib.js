import makeRequest from '../../lib/requestLib';


module.exports.postMessage = async (options) => {
  console.log(options)
  const requestOptions = {
    url: 'https://slack.com/api/chat.postMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      text:options.text,
      channel:options.channel,
      token:options.token,
    },
  };
  //console.log(requestOptions)
  const response = await makeRequest(requestOptions);
  return response;
};
