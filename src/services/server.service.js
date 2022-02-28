const express = require("express");
const bodyParser = require("body-parser");
const config = require("../configs");
const cors = require("cors");
const port = config.server.port;
const apiRouter = require("../routes");
const { ApolloServer, gql } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const CategorieSchema = require("../apollo/schemas/categorie.schema");
const MovieSchema = require("../apollo/schemas/movie.schema");
// const OrderSchema = require("../apollo/schemas/order.schema");

const categorieResolvers = require("../apollo/resolvers/categorie.resolver");
const movieResolvers = require("../apollo/resolvers/movie.resolver");
// const orderResolvers = require("../apollo/resolvers/order.resolver");

const app = express();

const graphQlServer = new ApolloServer({
  typeDefs: [CategorieSchema, MovieSchema],
  resolvers: [categorieResolvers, movieResolvers],
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return {
          userId:decodedToken.id
        };        
      }
      catch (e){
        return {
          auth: false,
          token: null,
          message:"not authorized"
        };
      }
    }
    else {
      return {
        auth: false,
        token: null,
        message:"Missing token"
      }
    }
  },
});
graphQlServer.applyMiddleware({ app, path: "/graphql" });

app.use(cors());
app.use(bodyParser.json());
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