const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Upload

type Image {
    url: String!
}

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    recipes: [String]
    avatar: String
}

type Recipe {
    _id: ID!
    recipeName: String!
    shortDescription: String!
    steps: [step]!
    isPublic: Boolean!
    image: String
}

type step{
    text: String!
    image: String!
}

input stepInput {
    text: String!
    image: String
}

type Cook {
    _id: ID!
    notes: String
    steps: [step]
    image: String
    recipeId: ID!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    images: [Image]
    users: [User]
    user(username:String!): User
}

type Mutation {
    singleUpload(image: Upload!, uploadedBy: String!): Image!
    addUser(username: String!, email: String!, password: String!, avatar: String): Auth
    login(email: String!, password: String!): Auth
    addRecipe(recipeName: String!, shortDescription: String!, steps: [stepInput]!, isPublic: Boolean!, image: String!): Recipe
    addCook(notes: String, steps: stepInput, image: String, recipeId: ID!): Cook
}
`

module.exports = typeDefs;