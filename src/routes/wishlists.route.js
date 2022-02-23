const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/Wishlist.controller');
const verifyToken = require('../helpers/verifyToken');

router.post('/wishlist', WishlistController.getWishlist);
router.post('/addWishlist', verifyToken, WishlistController.addWishlist);
router.put('/wishlist', verifyToken, WishlistController.deleteWishlist);

module.exports = router;