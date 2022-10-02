const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    type: {
        required: true,
        type: String
    },
    style: {
        required: true,
        type: Number
    }
}
)

module.exports = mongoose.model('Post', dataSchema)