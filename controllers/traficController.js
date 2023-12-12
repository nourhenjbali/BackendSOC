// controllers/traficController.js
const Trafic = require('../models/infoTrafic');

const getTraficInfo = async (req, res) => {
  try {
    const traficInfo = await Trafic.find();
    res.json(traficInfo);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des informations de trafic.' });
  }
};

const updateTraficInfo = async (req, res) => {
  try {
    // Logique pour mettre à jour les informations de trafic
    // Exemple : Mettre à jour l'état du trafic
    const { trafficState } = req.body;
    await Trafic.updateOne({}, { $set: { state: trafficState } });
    res.send('Informations de trafic mises à jour avec succès.');
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour des informations de trafic.' });
  }
};

module.exports = {
  getTraficInfo,
  updateTraficInfo,
};
