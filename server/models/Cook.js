const { Schema, model } = require('mongoose');

const cookSchema = new Schema({
    ingredients: {
        type: Array
    },
    steps: {
        type: Array
    },
    notes: {
        type: String
    },
    image: {
        type: String
    },
    recipeId: {
        type: String,
        required: true
    }
})

const Cook = model('Cook', cookSchema);

module.exports = Cook;