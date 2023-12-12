// routes/commentairesRoutes.js
const express = require('express');
const router = express.Router();
const commentairesController = require('../controllers/commentairesController');

router.get('/', commentairesController.getCommentaires);
router.post('/', commentairesController.createCommentaire);

module.exports = router;
