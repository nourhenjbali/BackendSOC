const InfoTrafic = require('../models/infoTrafic');

const traficController = {
    getAllInfosTrafic: async (req, res) => {
        try {
            const infosTrafic = await InfoTrafic.find();
            res.json(infosTrafic);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getInfoTraficById: async (req, res) => {
        // Récupérer l'id à partir des paramètres de la requête
        const { id } = req.params;
        try {
            const infoTrafic = await InfoTrafic.findById(id);
            if (!infoTrafic) {
                return res.status(404).json({ message: "Information de trafic non trouvée" });
            }
            res.json(infoTrafic);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    createInfoTrafic: async (req, res) => {
        const newInfoTrafic = new InfoTrafic(req.body);
        try {
            const savedInfoTrafic = await newInfoTrafic.save();
            res.status(201).json(savedInfoTrafic);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    updateInfoTrafic: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedInfoTrafic = await InfoTrafic.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedInfoTrafic) {
                return res.status(404).json({ message: "Information de trafic non trouvée" });
            }
            res.json(updatedInfoTrafic);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    deleteInfoTrafic: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedInfoTrafic = await InfoTrafic.findByIdAndDelete(id);
            if (!deletedInfoTrafic) {
                return res.status(404).json({ message: "Information de trafic non trouvée" });
            }
            res.json({ message: "Information de trafic supprimée" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = traficController;