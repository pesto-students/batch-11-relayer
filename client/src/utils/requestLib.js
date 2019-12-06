
import qs from 'qs';

const request = async (options) => {
  const {
    url, method, headers, body, responseOptions,query
  } = options;
  const authToken = localStorage.getItem('authtoken');
  const queryString = qs.stringify(query);
  const requestOptions = {
    method: method || 'GET',
    headers: {
      ...headers,
      authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${url}?${queryString}`, requestOptions);
  const parsedResponse = responseOptions.type === 'json' ? response.json() : response;
  return parsedResponse;
};
export default request;
