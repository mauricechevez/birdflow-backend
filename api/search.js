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
const { Bird } = require('../models');

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

const showStateBirds = async (req, res) => {
    const stateId = req.params.stateid
    try {
        const stateBirds = await State.findOne({ code: stateId });
        if (stateBirds){
            const birds = await Bird.find({speciesCode: {$in:stateBirds.birds}})
            // console.log(birds)
            res.json({
                birds
            })
        }else {
            res.json({message: 'NO STATE BIRDS'})
        }
        
    } catch (error) {
        console.log(error)
    }
}

const showBirds = async (req,res) => {
    bird = req.params.name
    if(bird){
        try {
            let birds = await Bird.find({ comName: {$regex: bird, $options: 'i'} })
            res.json({birds: birds})
        }
        catch (error) {
            console.log(error)
        }
    }
    
}

const create = async (req, res) => {

}

const update = async (req, res) => {
    
}

const deleteBook = async (req, res) => {
    
}


// GET api/search/states/ (Public)
router.get('/', (req, res) => {
    res.json({ msg: 'State endpoint OK!'});
});

// GET api/search/states
router.get('/states', showStates);

// GET api/search/states/:id
router.get('/states/:stateid', showStateBirds);

// GET api/search/birds
router.get('/birds/:name', showBirds);
// router.get('/books/:id', show);
// router.post('/books', passport.authenticate('jwt', { session: false }), create);
// router.put('/books/:id', passport.authenticate('jwt', { session: false }), update);
// router.delete('/books/:id', passport.authenticate('jwt', { session: false }), deleteBook);

module.exports = router;