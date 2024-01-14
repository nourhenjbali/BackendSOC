// services/restService.js
const express = require('express');
const bodyParser = require('body-parser');
const utilisateursController = require('../controllers/utilisateursController');

const app = express();
const port = 3001; // Choisissez un port différent de celui de votre serveur principal

// Middleware pour analyser le corps des requêtes JSON
app.use(bodyParser.json());

// Route pour obtenir tous les utilisateurs
app.get('/', async (req, res) => {
  try {
    const utilisateurs = await utilisateursController.getAllUtilisateurs();
    res.json(utilisateurs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir un utilisateur par ID
app.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const utilisateur = await utilisateursController.getUtilisateurById(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour créer un nouvel utilisateur
app.post('/', async (req, res) => {
  const utilisateurData = req.body;
  try {
    const newUtilisateur = await utilisateursController.createUtilisateur(utilisateurData);
    res.status(201).json(newUtilisateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour mettre à jour un utilisateur par ID
app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const utilisateurData = req.body;
  try {
    const updatedUtilisateur = await utilisateursController.updateUtilisateur(id, utilisateurData);
    if (!updatedUtilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(updatedUtilisateur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour supprimer un utilisateur par ID
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUtilisateur = await utilisateursController.deleteUtilisateur(id);
    if (!deletedUtilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Service REST Utilisateurs démarré sur le port ${port}`);
});

module.exports = app;
