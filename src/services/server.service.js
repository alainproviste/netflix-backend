const express = require("express");
const bodyParser = require("body-parser");
const config = require("../configs");
const cors = require("cors");
const port = config.server.port;
const apiRouter = require("../routes");
// const { ApolloServer, gql } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

// const ProductSchema = require("../apollo/schemas/product.schema");
// const UserSchema = require("../apollo/schemas/user.schema");
// const OrderSchema = require("../apollo/schemas/order.schema");

// const productResolvers = require("../apollo/resolvers/product.resolver");
// const userResolvers = require("../apollo/resolvers/user.resolver");
// const orderResolvers = require("../apollo/resolvers/order.resolver");

const app = express();

app.use("/api/v1/", apiRouter);

exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });
};