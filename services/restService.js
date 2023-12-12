// services/restService.js
const axios = require('axios');

const getRestData = async () => {
  // Update the URL to match your local route
  const apiUrl = 'http://localhost:3000/data';

  // Make a GET request to the specified API URL
  const response = await axios.get(apiUrl);
  
  // Return the response data
  return response.data;
};

module.exports = {
  getRestData,
};
