const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/Wishlist.controller');

router.get('/Wishlists', WishlistController.getWishlists);

module.exports = router;