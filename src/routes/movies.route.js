const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const verifyToken = require('../helpers/verifyToken');
const verifyTokenAdmin = require('../helpers/verifyTokenAdmin');

router.get('/movie', verifyToken, movieController.getMovie);
router.post('/movie', verifyTokenAdmin, movieController.createMovie);

module.exports = router;