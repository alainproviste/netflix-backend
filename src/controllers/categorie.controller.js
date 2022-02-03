const Categorie = require("../models/categorie.model");

exports.getCategories = (req, res) => {
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

exports.getCategorie = (req, res) => {
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

exports.createCategorie = (req, res) => {
    const categorie = new Movie({
        name: req.body.name
    });

    categorie.save()
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