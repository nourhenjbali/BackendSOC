// services/restService.js
const axios = require('axios');

const getRestData = async () => {
  const response = await axios.get('http://api.example.com/data');
  return response.data;
};

module.exports = {
  getRestData,
};
