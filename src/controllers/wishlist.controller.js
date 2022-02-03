const Wishlist = require("../models/Wishlist.model");

exports.getWishlists = (req, res) => {
    Wishlist.find().then(
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