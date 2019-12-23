
const UNAUTHORIZED = 'unauthorized';

async function callAPI(url, method, data) {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response;
      }
      // error response codee by server
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }, (error) => {
      // client is unable to connect to server
      throw new Error(error.message);
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log('Error: ', error);
      return UNAUTHORIZED;
    });
}

export default callAPI;
