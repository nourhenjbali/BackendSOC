// controllers/commentairesController.js
const Commentaire = require('../models/commentaire');

const getCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.find();
    res.json(commentaires);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires.' });
  }
};

const createCommentaire = async (req, res) => {
  try {
    const { contenu, utilisateurId } = req.body;
    const nouveauCommentaire = new Commentaire({ contenu, utilisateurId });
    await nouveauCommentaire.save();
    res.json({ message: 'Commentaire créé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du commentaire.' });
  }
};

module.exports = {
  getCommentaires,
  createCommentaire,
};
