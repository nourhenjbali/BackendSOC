// routes/traficRoutes.js
const express = require('express');
const router = express.Router();
const traficController = require('../controllers/traficController');

router.get('/', traficController.getTraficInfo);
router.put('/', traficController.updateTraficInfo);

module.exports = router;
