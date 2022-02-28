const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorie.controller');
const verifyTokenAdmin = require('../helpers/verifyTokenAdmin');

router.post('/categorie', verifyTokenAdmin, categorieController.createCategorie)

module.exports = router;