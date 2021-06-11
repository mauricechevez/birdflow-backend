require('dotenv').config();
const { Strategy, ExtractJwt } = require('passport-jwt');

// Model
const { User } = require('../models');

// object made of strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const JWT_STRATEGY = new Strategy(options, async (jwtPayload, done) => {
    // check for a user by the id
    try {
        console.log(jwtPayload)
        const user = await User.findById(jwtPayload.id)
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
        
    } catch (error) {
        console.log('Error inside passport config')
        console.log(error)
    }
});

// export a function that will use strategy
module.exports = async (passport) => {
    passport.use(JWT_STRATEGY)
}