const express = require("express");
const router = express.Router();
const utilisateursController = require("../controllers/utilisateursController");

router.get("/", utilisateursController.getAllUtilisateurs);
router.get("/:id", utilisateursController.getUtilisateurById); // Add this route
router.post("/", utilisateursController.createUtilisateur);
router.put("/:id", utilisateursController.updateUtilisateur); // Add this route
router.delete("/:id", utilisateursController.deleteUtilisateur); // Add this route

module.exports = router;

