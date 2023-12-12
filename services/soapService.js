const soap = require("soap");
const fs = require("fs");
const path = require("path");

const getSoapData = async () => {
  // Update the path to match the actual location of your soapService.wsdl file
  const wsdlPath = path.join(__dirname, "soapService.wsdl");

  try {
    // Read the WSDL content from the local file
    const wsdlContent = fs.readFileSync(wsdlPath, "utf8");

    // Create the SOAP client using the local WSDL content
    const client = await soap.createClientAsync(wsdlContent);

    if (!client) {
      throw new Error("Unable to create SOAP client");
    }

    // Call your SOAP function (MyFunctionAsync in this case)
    const result = await client.MyFunctionAsync({});
    return result;
  } catch (error) {
    console.error("Error while fetching SOAP data:", error);
    throw error;
  }
};

module.exports = {
  getSoapData,
};
