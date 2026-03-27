const Utilisateur = require('../models/utilisateur');

const utilisateursController = {
    getAllUtilisateurs: async (req, res) => {
        try {
            const utilisateurs = await Utilisateur.find();
            res.json(utilisateurs);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getUtilisateurById: async (req, res) => {
        const { id } = req.params;
        try {
            const utilisateur = await Utilisateur.findById(id);
            if (!utilisateur) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.json(utilisateur);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    createUtilisateur: async (req, res) => {
        const newUtilisateur = new Utilisateur(req.body);
        try {
            const savedUtilisateur = await newUtilisateur.save();
            res.status(201).json(savedUtilisateur);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    updateUtilisateur: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedUtilisateur = await Utilisateur.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUtilisateur) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.json(updatedUtilisateur);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteUtilisateur: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedUtilisateur = await Utilisateur.findByIdAndDelete(id);
            if (!deletedUtilisateur) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.json({ message: "Utilisateur supprimé" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = utilisateursController;