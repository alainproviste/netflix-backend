const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    actors: [{
        type: String
    }],
    duration: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    iframe: {
        type: String,
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    }]
})

module.exports = mongoose.model('Movie', movieSchema);