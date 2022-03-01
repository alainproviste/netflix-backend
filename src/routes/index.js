const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const wishlistsRouter = require('./wishlists.route');
const categorieRouter = require('./categories.route');
const checkoutRouter = require('./checkout.route');
const movieRouter = require('./movie.route');

router.use('/users/', usersRouter);
router.use('/Wishlists/', wishlistsRouter);
router.use('/categorie/', categorieRouter); 
router.use(checkoutRouter);
router.use('/movie/', movieRouter);

module.exports = router;