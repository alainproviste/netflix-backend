const { gql } = require('apollo-server-express');

module.exports = gql`
    type Categorie {
        id: ID
        name: String
        movies: [Movie]
    }
    extend type Query {
        getCategories:[Categorie]
        getCategorie(id:ID):Categorie!
    }
    extend type Mutation {
        createCategorie(name:String!):Categorie
        updateCategorie(id:ID!,name:String!):Categorie
    }
`