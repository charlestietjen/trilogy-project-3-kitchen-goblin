const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
    {
        src: {
            type: String,
            require: true
        },
        uploadedBy: {
            type: Number,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const Image = model('Image', imageSchema);

module.exports = Image;