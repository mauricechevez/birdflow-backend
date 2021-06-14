const mongoose = require('mongoose');


const journalSchema = new mongoose.Schema({
    name: String,
    birds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bird'}],
    entries: String,
    location: String,
    userId: String,
    // date: {
    //     type: Date,
    //     default: Date.now()
    // }
    createdAt: { type: Date, default: Date.now }
    });

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;