const mongoose = require('mongoose');
const { Schema } = mongoose;

// State Schema
const stateSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    birds: [String]
})

const State = mongoose.model('State', stateSchema);
module.exports = State;
