
import qs from 'qs';
import request from 'request';

const makeRequest = (options) => {
  return new Promise((resolve, reject) => {
    const {
      url, method, headers, body, query,
    } = options;
    const authToken = localStorage.getItem('authtoken');
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
    request(requestOptions, (err, response, responseBody) => {
      if (err) reject(err);
      if (response.statusCode === 200) {
        resolve(JSON.parse(responseBody));
      } else reject(new Error('Request Crashed'));
    });
  });
};
export default makeRequest;
