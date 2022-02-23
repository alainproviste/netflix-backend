const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const WishlistsRouter = require('./Wishlists.route');

router.use('/users/', usersRouter);
router.use('/Wishlists/', WishlistsRouter);

module.exports = router;