const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const traficRoutes = require("./routes/traficRoutes");
const commentairesRoutes = require("./routes/commentairesRoutes");
const utilisateursRoutes = require("./routes/utilisateursRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const soap = require("soap");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to process JSON requests
app.use(express.json());

// Global authentication middleware
app.use(authMiddleware.authenticateUser);

// Routes
app.use("/trafic", traficRoutes);
app.use("/commentaires", commentairesRoutes);
app.use("/utilisateurs", utilisateursRoutes);

// Connection to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

// Call the connect function
connect();

// Create a SOAP server
const myService = {
  MyFunction: function (args) {
    // Implement your SOAP function logic here
    return { output: `Hello, ${args.input}!` };
  },
};

// Read the WSDL content from the local file
const wsdlPath = path.join(__dirname, "soapService.wsdl");
const wsdlContent = fs.readFileSync(wsdlPath, "utf8");

// Create the SOAP server
const soapServer = soap.listen(app, "/soapService", myService, wsdlContent);

// Launch the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Handle MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
