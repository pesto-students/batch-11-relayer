import makeRequest from '../../lib/requestLib';
import * as actionStatus from "../../constants/actionStatus"
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
  try {
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
    return {status:actionStatus.SUCCESS,responseMessage:responseString};
  } catch (e) {
    return {status:actionStatus.SUCCESS,responseMessage:'Failed To Fetch All Repository'};
  }
};
exports.createRepo = async (authToken,options) => {
  try {
    const requestOptions = {
      url: `https://api.github.com/user/repos`,
      method: 'POST',
      headers: {
        authorization: `Bearer ${authToken}`
      },
      json: {
        name: options.name
      }
    };
    const response = await makeRequest(requestOptions)
    const responseMessage = `Github Repository Created \n
    Name: ${response.name}
    Url: ${response.html_url}
    `
    return {status:actionStatus.SUCCESS,responseMessage:responseMessage};
  } catch (e) {
    const errObject = JSON.parse(e.message)
    return {status:actionStatus.FAILED,responseMessage: `${errObject.errors[0].message}`};
  }
}
