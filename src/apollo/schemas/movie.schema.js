const { gql } = require('apollo-server-express');

module.exports = gql`
    type Movie {
        id: ID
        title: String
        description: String
        duration: String
        img: String
        categories: [Categorie]
    }
    input CategorieInput {
        id: String
        name: String
    }
    type Query {
        getMovies:[Movie]
        getMovie(id:ID):Movie!
    }
    type Mutation {
        createMovie(title:String!,description: String,duration:String, img:String, categories: [CategorieInput]):Movie
        updateMovie(id:ID!,title:String!,description: String,duration:String, img:String, categories: [CategorieInput]):Movie
    }
`