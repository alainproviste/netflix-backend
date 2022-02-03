const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const moviesRouter = require('./movies.route');
const WishlistsRouter = require('./Wishlists.route');
const categoriesRouter = require('./categories.route');

router.use('/users/', usersRouter);
router.use('/movies/', moviesRouter);
router.use('/Wishlists/', WishlistsRouter);
router.use('/categories/', categoriesRouter);

module.exports = router;