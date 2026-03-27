const express = require("express");
const router = express.Router();
const commentairesController = require("../controllers/commentairesController");

router.get("/:localisation", commentairesController.getAllCommentaires);
router.get("/:id", commentairesController.getCommentaireById); 
router.post("/", commentairesController.createCommentaire);
router.put("/:id", commentairesController.updateCommentaire);
router.delete("/:id", commentairesController.deleteCommentaire);

module.exports = router;
