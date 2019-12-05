const generateResponse = (error, status, message, body) => {
  const responseObject = {
    error,
    status,
    message,
    body,
  };
  return responseObject;
};
module.exports = { generateResponse };
