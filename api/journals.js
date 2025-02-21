// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const { Bird } = require('../models');
const { Journal } = require('../models');

// Controllers
const index = async (req, res) => {
    try {
        // Look for all journals owned by bird lover
        console.log(req.user.id)
        const allJournals = await Journal.find({userId: req.user.id});
        // const allJournals = await Journal.find({})
        res.json({ journal: allJournals });
    } catch (error) {
        return res.status(400).json({ message: 'Journal not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    try {
        // look for journal based on journal id and user id
        const journal = await Journal.find({$and: [{_id: id}, {userId}]});
        res.json({ journal });
    } catch (error) {
        return res.status(400).json({ message: 'Journal not found. Try again...' });
    }
}


const create = async (req, res) => {
    const { name, entries, location} = req.body;
    const userId = req.user.id
    try {
        // Create Journal user input and also the user ID
        const newJournal = await Journal.create({ name, entries, location, userId });
        res.json({ journal: newJournal });
    } catch (error) {
       return res.status(400).json({ message: 'Journal was not created. Please try again...' }); 
    }
}


const update = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id
    try {
        const updatedJournal = await Journal.findOneAndUpdate({$and:[{_id: id}, {userId}]}, { name: req.body.name, entries: req.body.entries, location: req.body.location });
        res.redirect(`/api/journals/${id}`);
    } catch (error) {
        return res.status(400).json({ message: 'Bird could not be updated in the journal. Please try again...' });
    }
}

const deleteJournal = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    try {
        const result = await Journal.deleteOne({$and:[{_id: id}, {userId}]});
        res.redirect('/api/journals');

    } catch (error){
        return res.status(400).json({ message: 'Journal was not deleted. Please try again...'});
    }
}


// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Birds endpoint OK!'});
});

// GET -> /api/journals
router.get('/', passport.authenticate('jwt', { session: false }), index);
// GET -> /api/journals/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/journals
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/journals
router.put('/:id', passport.authenticate('jwt', { session: false }), update);
// DELETE -> /api/journals/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteJournal);

module.exports = router;