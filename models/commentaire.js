// models/commentaire.js
const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Utilisateur' },
});

const Commentaire = mongoose.model('Commentaire', commentaireSchema);

module.exports = Commentaire;
