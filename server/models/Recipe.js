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
    }
})

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;