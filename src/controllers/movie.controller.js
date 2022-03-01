const Movie = require("../models/movie.model");

exports.createMovie = (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        producer: req.body.producer,
        actors: req.body.actors,
        duration: req.body.duration,
        img: req.body.img,
        iframe: req.body.iframe,
        categories: req.body.categories
    });

    movie.save()
    .then((data) => {
        res.send({
            movie: data,
            created: true
        })
    })
    .catch((err) => {
        console.log(err.message);    
        res.status(500).send({
            error: 500,
            message: err.message || "some error occured while creating categorie"
        })
    })
} 