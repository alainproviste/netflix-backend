const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');
const verifyToken = require('../helpers/verifyToken');

router.post('/checkout', verifyToken, checkoutController.createSession);

module.exports = router;