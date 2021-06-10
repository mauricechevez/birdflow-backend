const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const birdSchema = new Schema({
    sciName: String,
    comName: String,
    speciesCode: {
        type: String,
        required: true,
        unique: true
    },
    category: String,
    taxonOrder: Number,
    bandingCodes:[],
    comNameCodes: [],
    sciNameCodes: [],
    order: String,
    familyComName: String,
    familySciName: String
})

const Bird = mongoose.model('Bird', birdSchema);
module.exports = Bird;
