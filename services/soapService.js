const http = require("http");
const soap = require("soap");
const fs = require("fs");
const path = require("path"); 

const MyFunction = async (args) => {
  console.log("MyFunction called with arguments:", args);
  return { result: "Result of MyFunction" };
};

const GetTrafficInfo = async (args) => {
  console.log("GetTrafficInfo called with arguments:", args);
  return { trafficInfo: "Traffic information" };
};

const getSoapData = async () => {
  const wsdlPath = path.join(__dirname, "soapService.wsdl"); 
  const wsdlContent = fs.readFileSync(wsdlPath, "utf8");

  try {
    const client = await soap.createClientAsync(wsdlContent);
    if (!client) {
      throw new Error("Unable to create SOAP client");
    }

    client.MyFunction = MyFunction;
    client.GetTrafficInfo = GetTrafficInfo;

    const soapserv = http.createServer(function (request, response) {
      if (request.method === "POST" && request.url === "/soap-endpoint") {
        // Handle SOAP requests
        let body = "";
        request.on("data", (chunk) => {
          body += chunk;
        });

        request.on("end", async () => {
          try {
            const soapResponse = await client.MySoapPortType.MyFunction(body);
            response.writeHead(200, { "Content-Type": "text/xml" });
            response.end(soapResponse);
          } catch (error) {
            response.writeHead(500, { "Content-Type": "text/xml" });
            response.end(`<error>${error.message}</error>`);
          }
        });
      } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("404: Not Found");
      }
    });

    soapserv.listen(3002, function () {
      console.log(
        "SOAP server listening on http://localhost:3002/soap-endpoint"
      );
    });
  } catch (error) {
    console.error("Error while setting up SOAP server:", error);
  }
};

module.exports = {
  getSoapData,
};
