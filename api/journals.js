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
    console.log('inside of /api/journals');
    try {
        const allJournals = await Journal.find({});
        res.json({ journal: allJournals });
    } catch (error) {
        console.log('Error inside of /api/journals');
        console.log(error);
        return res.status(400).json({ message: 'Journal not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for journal based on id
        const journal = await Journal.findById(id);
        res.json({ journal });
    } catch (error) {
        console.log('Error inside of /api/journals/:id');
        console.log(error);
        return res.status(400).json({ message: 'Journal not found. Try again...' });
    }
}


const create = async (req, res) => {
    const { name, entries, location} = req.body;
    try {
        const newJournal = await Journal.create({ name, entries, location });
        console.log('new journal created', newJournal);
        res.json({ journal: newJournal });
    } catch (error) {
       console.log('Error inside of POST of /api/journals');
       console.log(error);
       return res.status(400).json({ message: 'Journal was not created. Please try again...' }); 
    }
}


const update = async (req, res) => {
    console.log(req.params.jid);
    const jid = req.params.jid
    try {
        const updatedJournal = await Journal.findOneAndUpdate({_id: jid}, { name: req.body.name });
        console.log(updatedJournal); // { n: 1, nModified: 0, ok: 1 }
        res.redirect(`/api/journals/${jid}`);
    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Bird could not be updated in the journal. Please try again...' });
    }
}

const deleteJournal = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Journal.findByIdAndDelete(id);
        console.log(result);
        res.redirect('/api/journals');

    } catch (error){
        console.log('inside of the DELETE route');
        console.log(error)
        return res.status(400).json({ message: 'Journal was not deleted. Please try again...'});
    }
}


// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Birds endpoint OK!'});
});

// GET -> /api/journal
router.get('/', passport.authenticate('jwt', { session: false }), index); 
// GET -> /api/journals/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/journals
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/journals
router.put('/:jid', passport.authenticate('jwt', { session: false }), update);
// DELETE -> /api/journals/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteJournal);

module.exports = router;