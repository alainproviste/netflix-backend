const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorie.controller');

router.get('/categorie', categorieController.getCategorie);
router.post('/categorie', categorieController.createCategorie)

module.exports = router;