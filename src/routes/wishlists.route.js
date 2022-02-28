const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');
const verifyToken = require('../helpers/verifyToken');

router.post('/wishlist', wishlistController.getWishlist);
router.post('/addWishlist', verifyToken, wishlistController.addWishlist);
router.put('/wishlist', verifyToken, wishlistController.removeWish);
router.delete('/wishlist', verifyToken, wishlistController.deleteWishlist);
router.post('/inWishlist', verifyToken, wishlistController.inWishlist);

module.exports = router;