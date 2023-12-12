// server.js
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const traficRoutes = require("./routes/traficRoutes");
const authMiddleware = require("./middleware/authMiddleware");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT if specified, otherwise use 3000

// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Middleware d'authentification global
app.use(authMiddleware.authenticateUser);

// Routes
app.use("/trafic", traficRoutes);

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

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// Handle MongoDB disconnection
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

