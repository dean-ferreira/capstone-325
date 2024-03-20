const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    diesel: {
        type: Number,
        required: true,
    },
    gasoline: {
        type: Number,
        required: true,
    },
    midGrade: {
        type: Number,
        required: true,
    },
    premium: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('State', stateSchema);
