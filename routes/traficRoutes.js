const express = require('express');
const router = express.Router();
const traficController = require('../controllers/traficController');

// Get all traffic information
router.get('/', traficController.getAllInfosTrafic);
router.get('/:id', traficController.getInfoTraficById); // Add this route
router.post('/', traficController.createInfoTrafic);
router.put('/:id', traficController.updateInfoTrafic);
router.delete('/:id', traficController.deleteInfoTrafic);

module.exports = router;
