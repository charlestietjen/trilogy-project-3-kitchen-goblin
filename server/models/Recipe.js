const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    recipeName: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    image: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    cooks: {
        type: Array,
    }
})

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;