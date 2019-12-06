const baseURL = 'http://localhost:3001';
const uriObject = {
  signUp: {
    method: 'POST',
    url: `${baseURL}/user/signup`,
  },
};
const prepareRequest = (key) => {
  return uriObject[key];
};
export default prepareRequest;
