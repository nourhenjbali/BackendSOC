// middleware/authMiddleware.js
const authenticateUser = (req, res, next) => {
    // Logique d'authentification, par exemple, vérification du jeton JWT
    // ...
    next();
  };
  
  module.exports = {
    authenticateUser,
  };
  