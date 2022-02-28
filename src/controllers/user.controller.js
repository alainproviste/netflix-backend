const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
var nodemailer = require('nodemailer');

exports.register = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    isAdmin: false,
    password: hashedPassword
  });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fullstacknetflixremi@gmail.com',
      pass: 'P@ssword1234'
    }
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      var mailOptions = {
        from: 'fullstacknetflixremi@gmail.com',
        to: data.email,
        subject: 'Created account confirmation',
        text: 'That was easy!'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).send({
            message: error || "Some error occured",
          });
        }
      });
      res.status(200).send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false,
          token: null,
        });
      }
      let userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => res.status(404).send(err));
};

exports.getUser = (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
      .then((user) => {
          console.log(user);
      res.send(user);
    })
    .catch((err) => res.status(404).send(err));
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.verifyToken = (req, res) => {
    if (req.user) {
        res.status(200).json({verify:true, admin: req.user.isAdmin})
    }
};

exports.verifyAdmin = (req, res) => {
  if (req.user) {
    res.status(200).json({admin:true})
  }
};