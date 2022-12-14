const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        title: {
            required: true,
            type: String
        },
        url: {
            required: true,
            type: String
        },
        date: {
            required: true,
            type: String
        },
        categories: {
            required: true,
            type: Array
        } 
    }
)

module.exports = mongoose.model('posts', dataSchema)