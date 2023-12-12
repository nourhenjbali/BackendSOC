// services/soapService.js
const soap = require('soap');

const getSoapData = async () => {
  const url = 'http://exemple.com/service?wsdl';
  const client = await soap.createClientAsync(url);
  const result = await client.MyFunctionAsync({});
  return result;
};

module.exports = {
  getSoapData,
};
