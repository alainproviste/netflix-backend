const { gql } = require('apollo-server-express');

module.exports = gql`
    type Movie {
        id: ID
        title: String
        description: String
        producer: String
        actors: [String]
        duration: String
        img: String
        iframe: String
        categories: [Categorie]
    }
    type Query {
        getMovies(limit: Int!):[Movie]
        getMovie(id:ID):Movie!
    }
    type Mutation {
        createMovie(title:String!,description: String, producer: String, actors: [String],duration:String, img:String, iframe: String, categories: [ID]):Movie
        updateMovie(id:ID!,title:String!,description: String, producer: String, actors: [String],duration:String, img:String, iframe: String, categories: [ID]):Movie
        deleteMovie(id:ID!): Movie
    }
`