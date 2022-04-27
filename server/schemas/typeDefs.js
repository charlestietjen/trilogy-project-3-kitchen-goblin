const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Upload

type Image {
    image: Upload
    uploadedBy: String
    category: String
    src: String
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
    _id: ID
    recipeName: String
    shortDescription: String
    ingredients: [ingredient]
    steps: [step]
    isPublic: Boolean
    image: String
    username: String
    cooks: [Cook]
}

type RecipeDetails {
    recipe: Recipe
    user: User
    cooks: [Cook]
}

type ingredient{
    ingredientName: String!
    quantity: String!
}

type step{
    text: String!
    image: String!
}

input stepInput {
    text: String!
    image: String
}

input ingredientInput {
    ingredientName: String!
    quantity: String!
}

type Cook {
    _id: ID!
    notes: String
    steps: [step]
    ingredients: [ingredient]
    image: String
    recipeId: String
}

type CookInput {
    _id: ID!
    notes: String
    steps: [step]
    ingredients: [ingredient]
    image: String
    recipeId: String
}

type Auth {
    token: ID!
    user: User
}

type S3 {
    signedRequest: String
    url: String
    fileName: String
}

type Query {
    images: [Image]
    users: [User]
    user(username:String!): User
    recipes(username:String): [Recipe]
    allrecipes: [Recipe]
    recipe(_id:ID!): RecipeDetails
}

type Mutation {
    imageUpload(image: Upload!, uploadedBy: String!, category: String!): Image!
    addUser(username: String!, email: String!, password: String!, avatar: String): Auth
    login(email: String!, password: String!): Auth
    addRecipe(recipeName: String!, shortDescription: String!, steps: [stepInput]!, ingredients: [ingredientInput]!, isPublic: Boolean!, image: String, username: String): Recipe
    addCook(notes: String, steps: [stepInput], ingredients: [ingredientInput], image: String, recipeId: String): Cook
    updateUser(_id: String!, username: String, email: String, password: String, avatar: String): Auth
    signS3(name: String!, type: String!, category: String!, uploadedBy: String!): S3
    updateRecipe(_id: String!, recipeName: String, image: String, shortDescription: String, steps: [stepInput], ingredients: [ingredientInput], isPublic: Boolean): Recipe
    deleteRecipe(_id: String!): Recipe
}
`

module.exports = typeDefs;