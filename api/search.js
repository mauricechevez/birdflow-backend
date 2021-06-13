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

// Show all states
const showStates = async (req, res) => {
    try {
        const states = await State.find({});
        if (states){
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


// Show all birds for a state
const showStateBirds = async (req, res) => {
    const stateId = req.params.stateid
    try {
        const stateBirds = await State.findOne({ code: stateId });
        if (stateBirds){
            const birds = await Bird.find({speciesCode: {$in:stateBirds.birds}})
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

// Show birds from a user search 
const showBirds = async (req,res) => {
    bird = req.params.name;

    // Search for birds using like logic and case insensitive
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

// Show birds in a state by user search
const showBirdsByState = async (req, res) => {
    const bird = req.params.name
    const stateId = req.params.state
    try {
        const stateBirds = await State.findOne({ code: stateId });
        if (stateBirds){
            const birds = await Bird.find({$and: [{speciesCode: {$in:stateBirds.birds}}, { comName: {$regex: bird, $options: 'i'} }]})
            // console.log(birds)
            res.json({
                birds
            })
        }else {
            res.json({message: 'NO STATE BIRDS'})
        }
    } catch (error) {
        
    }
}


// GET api/search/states/ (Public)
router.get('/', (req, res) => {
    res.json({ msg: 'State endpoint OK!'});
});

// GET api/search/states
router.get('/states', showStates);

// GET api/search/states/:id
router.get('/states/:stateid', showStateBirds);

// GET api/search/birds/:name
router.get('/birds/:name', showBirds);

// GET api/search/birds/:name/:state
router.get('/birds/:name/:state', showBirdsByState);


module.exports = router;