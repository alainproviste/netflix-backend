const Categorie = require("../models/categorie.model");

exports.createCategorie = (req, res) => {
    const categorie = new Categorie({
        name: req.body.name
    });

    categorie.save()
    .then((data) => {
        res.send({
            categorie: data,
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