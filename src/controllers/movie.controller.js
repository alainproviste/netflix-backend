const Movie = require("../models/movie.model");

exports.createMovie = (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        img: req.body.img,
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
            message: err.message || "some error occured while creating movie"
        })
    })
}

exports.getMovies = (req, res) => {
    Movie.find().then(
        (data) => {
          res.status(200).json(data);
        }
    ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
    );
}

exports.getMovie = (req, res) => {
    var id = req.params.id;
    Movie.findById(id)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        console.log(err.message);
        res.send(err);
    })
}