const Wishlist = require("../models/Wishlist.model");

exports.getWishlist = (req, res) => {
  Wishlist.findOne({ user: req.body.user })
  .populate('movies')
  .then((data) => {
      res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
        error: 500,
        message: err.message || "some error occured while getting wishlist"
    })
  })
};

exports.deleteWishlist = (req, res) => {
  Wishlist.findOneAndUpdate(
      { user: req.body.user },
      { $pull: {movies: req.body.movies }}
  )
  .then((data) => {
      res.send({
          data: data
      })
  })
  .catch((err) => {
      res.status(500).send({
          error: 500,
          message: err.message || "some error occured while creating removing a wish from wishlist"
      })
  })
};

exports.addWishlist = (req, res) => {
  Wishlist.findOne({ user: req.body.user})
  .then((data) => {
    if(!data){
      const wishlist = new Wishlist({
        user: req.body.user,
        movie: req.body.movie
      });
      console.log(req.body.movies);
      wishlist
        .save()
        .then((data) => {
          res.send({
              wishlist: data,
              created: true
          })
        })
      .catch((err) => {
          console.log(err.message);    
          res.status(500).send({
              error: 500,
              message: err.message || "some error occured while creating wishlist"
          })
      })
    }else{
      var previousMovies = data.movies;
      if(previousMovies && previousMovies.includes(req.body.movies)){
        res.send({
          message: "This movie is already in this wishlist !"
        });
      }else{
        Wishlist.findOneAndUpdate(
          { user: req.body.user },
          { movies: [...previousMovies.movies, req.body.movies] }
        )
        .then((data) => {
          res.send({
              data: data
          })
        })
        .catch((err) => {
          res.status(500).send({
            error: 500,
            message: err.message || "some error occured while adding wish in wishlist"
          })
        })
      }
    }
  })
};