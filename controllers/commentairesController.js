const Commentaire = require('../models/commentaire');

const commentairesController = {
    getAllCommentaires: async (req, res) => {
        try {
            const commentaires = await Commentaire.find();
            res.json(commentaires);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getCommentaireById: async (req, res) => {
        const { id } = req.params;
        try {
            const commentaire = await Commentaire.findById(id);
            if (!commentaire) {
                return res.status(404).json({ message: "Commentaire non trouvé" });
            }
            res.json(commentaire);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    createCommentaire: async (req, res) => {
        const newCommentaire = new Commentaire(req.body);
        try {
            const savedCommentaire = await newCommentaire.save();
            res.status(201).json(savedCommentaire);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    updateCommentaire: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedCommentaire = await Commentaire.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCommentaire) {
                return res.status(404).json({ message: "Commentaire non trouvé" });
            }
            res.json(updatedCommentaire);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteCommentaire: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedCommentaire = await Commentaire.findByIdAndDelete(id);
            if (!deletedCommentaire) {
                return res.status(404).json({ message: "Commentaire non trouvé" });
            }
            res.json({ message: "Commentaire supprimé" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = commentairesController;
