const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
    {
        src: {
            type: String,
            require: true
        },
        uploadedBy: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        category: {
            type: String,
            require: true
        }
    }
);

const Image = model('Image', imageSchema);

module.exports = Image;