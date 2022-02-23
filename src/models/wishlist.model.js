const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movie: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
})

module.exports = mongoose.model('Wishlist', WishlistSchema);