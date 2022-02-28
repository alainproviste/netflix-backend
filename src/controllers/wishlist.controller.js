const Wishlist = require("../models/Wishlist.model");

exports.getWishlist = (req, res) => {
  Wishlist.findOne({ user: req.body.user })
  .then((data) => {
    if(!data){
      res.status(500).send({
        error: 500,
        message: "Vous n'avez pas encore de film dans votre liste !"
      })
    }else{
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
    }
  }
)};

exports.inWishlist = (req, res) => {
  Wishlist.findOne({ user: req.body.user })
  .then((data) => {
    if(data){
      var previousMovies = data.movie;
      if(previousMovies && previousMovies.includes(req.body.movie)){
        res.send({
          inWishlist: true
        });
      }else{
        res.send({
          inWishlist: false
        });
      }
    }else{
      res.send({
        inWishlist: false
      });
    }
  })
};

exports.removeWish = (req, res) => {
  Wishlist.findOneAndUpdate(
      { user: req.body.user },
      { $pull: {movie: req.body.movie }}
  )
  .then((data) => {
      res.send({
        data: data
      })
  })
  .catch((err) => {
      res.status(500).send({
          error: 500,
          message: err.message || "some error occured while removing a wish from wishlist"
      })
  })
};

exports.deleteWishlist = (req, res) => {
  Wishlist.findByIdAndDelete(req.body.wishlistId)
  .then(() => {
    res.send({
        delete: true
    })
  })
  .catch((err) => {
      console.log(err.message);
      res.status(500).send({
          error: 500,
          message: err.message || "NULL"
      })
  });
}

exports.addWishlist = (req, res) => {
  Wishlist.findOne({ user: req.body.user})
  .then((data) => {
    if(!data){
      const wishlist = new Wishlist({
        user: req.body.user,
        movie: req.body.movie
      });
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
      var previousMovies = data.movie;
      if(previousMovies && previousMovies.includes(req.body.movie)){
        res.send({
          message: "This movie is already in this wishlist !"
        });
      }else{
        Wishlist.findOneAndUpdate(
          { user: req.body.user },
          { $push: { movie: req.body.movie } }
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