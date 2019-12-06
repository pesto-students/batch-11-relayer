const baseURL = 'http://10.173.1.231:3001';
const uriObject = {
  signUp: {
    method: 'POST',
    url: `${baseURL}/user/signup`,
  },
  signIn: {
    method: 'POST',
    url: `${baseURL}/user/signin`,
  },
  getAllApps: {
    method: 'GET',
    url: `${baseURL}/app/get/all`,
  },
};
const prepareRequest = (key) => {
  return uriObject[key];
};
export default prepareRequest;