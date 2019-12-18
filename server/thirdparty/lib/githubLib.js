import makeRequest from '../../lib/requestLib';
const getLoggedInUser = async(authToken) => {
  const requestOptions = {
    method: 'GET',
    url: 'https://api.github.com/user',
    headers: {
      authorization: `Bearer ${authToken}`}
  };
  const response = await makeRequest(requestOptions)
  return response
}

exports.getAllRepo = async (authToken, options = {}) => {
  const loggedInUserDetails = await getLoggedInUser(authToken)
  const requestOptions = {
    url: `https://api.github.com/users/${loggedInUserDetails.login}/repos`,
    method: 'GET',
  };
  const response = await makeRequest(requestOptions);
  if (response.length === 0) {
    return 'No Repo Found';
  }
  let responseString = '';
  response.forEach((repo, index) => {
    responseString += `${index + 1}. ${repo.name} (${repo.html_url})\n`;
  });
  return responseString;
};
