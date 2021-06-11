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
    console.log('inside of /api/birds');
    try {
        const allBirds = await Bird.find({});

        res.json({ birds: allBirds });
    } catch (error) {
        console.log('Error inside of /api/birds');
        console.log(error);
        return res.status(400).json({ message: 'Bird not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for book based on id
        const bird = await Bird.findById(id);
        res.json({ bird });
    } catch (error) {
        console.log('Error inside of /api/birds/:id');
        console.log(error);
        return res.status(400).json({ message: 'Bird not found. Try again...' });
    }
}

const create = async (req, res) => {
    const { SCIENTIFIC_NAME, COMMON_NAME, SPECIES_CODE, CATEGORY, location } = req.body;

    try {
        const newBird = await Bird.create({ SCIENTIFIC_NAME, COMMON_NAME, SPECIES_CODE, CATEGORY, location });
        console.log('new bird created', newBird);
        res.json({ bird: newBird });
    } catch (error) {
       console.log('Error inside of POST of /api/birds');
       console.log(error);
       return res.status(400).json({ message: 'Bird was not created. Please try again...' }); 
    }
}

const update = async (req, res) => {
    console.log(req.body);
    try {
        const updatedBird = await Bird.update({ title: req.body.title }, req.body);
        const bird = await Bird.findOne({ title: req.body.title });

        console.log(updatedBird); // { n: 1, nModified: 0, ok: 1 }
        console.log(bird); // a book object 

        res.redirect(`/api/birds/${bird.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Bird could not be updated. Please try again...' });
    }
}

const deleteBird = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Bird.findByIdAndDelete(id);
        console.log(result);
        res.redirect('/api/birds');

    } catch (error){
        console.log('inside of the DELETE route');
        console.log(error)
        return res.status(400).json({ message: 'Bird was not deleted. Please try again...'});
    }
}


// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Birds endpoint OK!'});
});

// GET -> /api/books/
router.get('/', passport.authenticate('jwt', { session: false }), index); 
// GET -> /api/books/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/books
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/books
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE -> /api/books/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteBird);

module.exports = router;