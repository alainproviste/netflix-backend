const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const wishlistsRouter = require('./wishlists.route');
const categorieRouter = require('./categories.route');
const checkoutRouter = require('./checkout.route');

router.use('/users/', usersRouter);
router.use('/Wishlists/', WishlistsRouter);
router.use('/categorie/', categorieRouter); 
router.use(checkoutRouter);

module.exports = router;