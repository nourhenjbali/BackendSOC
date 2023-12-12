// controllers/utilisateursController.js
const Utilisateur = require('../models/utilisateur');

const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find();
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

const createUtilisateur = async (req, res) => {
  try {
    const { nom, prenom, email } = req.body;
    const nouvelUtilisateur = new Utilisateur({ nom, prenom, email });
    await nouvelUtilisateur.save();
    res.json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
  }
};

module.exports = {
  getUtilisateurs,
  createUtilisateur,
};
