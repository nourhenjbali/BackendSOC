// routes/utilisateursRoutes.js
const express = require('express');
const router = express.Router();
const utilisateursController = require('../controllers/utilisateursController');

router.get('/', utilisateursController.getUtilisateurs);
router.post('/', utilisateursController.createUtilisateur);

module.exports = router;
