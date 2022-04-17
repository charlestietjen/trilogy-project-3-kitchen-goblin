const { Schema, model } = require('mongoose');

const cookSchema = new Schema({
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
        type: Number,
        required: true
    }
})

const Cook = model('Cook', cookSchema);

module.exports = Cook;