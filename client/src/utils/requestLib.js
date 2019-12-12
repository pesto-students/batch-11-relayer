import qs from 'qs';
import request from 'request';

const makeRequest = async (options) => {
  const {
    url, method, headers, body, query,
  } = options;
  const authToken = await localStorage.getItem('authtoken');
  const queryString = qs.stringify(query);
  const requestOptions = {
    url: `${url}?${queryString}`,
    method: method || 'GET',
    headers: {
      ...headers,
      authorization: `Bearer ${authToken}`,
    },
  };
  if (body) {
    requestOptions.json = body;
  }
  await request(requestOptions, (err, response, responseBody) => {
    if (err) return err;
    if (response.statusCode === 200) {
      return JSON.parse(responseBody);
    }
    return new Error('Request Crashed');
  });
};

export default makeRequest;
