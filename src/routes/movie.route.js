const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const verifyTokenAdmin = require('../helpers/verifyTokenAdmin');

router.post('/movie', verifyTokenAdmin, movieController.createMovie)

module.exports = router;