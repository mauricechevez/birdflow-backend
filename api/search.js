// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JWT_SECRET = process.env.JWT_SECRET;

// Models
const { State } = require('../models');

// Controllers
const index = async (req, res) => {

}

const showStates = async (req, res) => {
    try {
        const states = await State.find({});
        if (states){
            console.log(states)
            res.json({
                states
            })
        }else {
            res.json({message: 'NO STATES'})
        }
        
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {

}

const update = async (req, res) => {
    
}

const deleteBook = async (req, res) => {
    
}


// GET api/books/ (Public)
router.get('/', (req, res) => {
    res.json({ msg: 'State endpoint OK!'});
});
// GET api/books/states
router.get('/states', showStates);
// router.get('/books/:id', show);
// router.post('/books', passport.authenticate('jwt', { session: false }), create);
// router.put('/books/:id', passport.authenticate('jwt', { session: false }), update);
// router.delete('/books/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;