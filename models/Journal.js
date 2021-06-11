const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    name: String,
    birds: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bird'}],
    entries: String,
    location: String,
    userId: String
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;