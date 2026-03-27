// server.js
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const traficRoutes = require("./routes/traficRoutes");
const commentairesRoutes = require("./routes/commentairesRoutes");
const utilisateursRoutes = require("./routes/utilisateursRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const restService = require("./services/restService");
const bodyParser = require("body-parser");
const soapService = require('./services/soapService'); 
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

const wsdlPath = "./services/soapService.wsdl";
// Route for fetching SOAP data
app.get("/soap-data", async (req, res) => {
  try {
    const soapData = await soapService.getSoapData();
    res.json({ success: true, data: soapData });
  } catch (error) {
    console.error("Error while fetching SOAP data:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

// service REST
app.use("/utilisateurs-service", restService);
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

// Launch the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Handle MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
